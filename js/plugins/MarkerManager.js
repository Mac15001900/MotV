/**
 * Manages markers that indicate an event can be interacted with.
 * 
 * Markers are automatically shown for events that both:
 * - Have an active page with at least one command (which is *not* running a nearby event)
 * - Have an Action Button trigger; "No trigger" events (with through enabled and below/above priority) will not get a marker either
 * 
 * There are various event notetags that modify this behaviour:
 * <Marker> - draws a marker ignoring most conditions (except not having an empty page). AHK: "<mar"
 * <NoMarker> - prevents a marker from being drawn. AHK: "<mno"
 * <MarkerNoHide> - All markers are usually hidden while an event is running, except when said event has this notetag. AHK: "<mhi"
 * <MarkerSync:ID> - Synchronises the marker (whether it's enabled and its colour) with that of another event with the given ID. AHK: "<msy"
 * <MarkerOffset:X,Y> - Draw the marker with some offset from where it would normally be drawn. The offset is specified in tiles. AHK: "<mof"
 * <MarkerRegion> - For region events, it will draw markers over every tile from their region. Do NOT use this tag on the main map (for performance reasons).
 * 
 * 
 * By default markers are blue (indicating an event has not yet been interacted with). After the player interacts with one (and its $es[] is set to true) it will change colour to white.
 * There are a few exceptions to this:
 * - When the event's interpreter's "skipEventSeen" property is set to true, it will not be marked as seen.
 * - Tranfer commands set skipEventSeen to true. This is to avoid potentially setting an event as seen when on the new map.
 * - Exit event processing and Erase event will skip running "g.onEventEnd", and therefore marking an event as seen. This is intentional behaviour and is often used to skip marking an event.
 * 
 * To override the above behaviours when needed, set the value of "$es[this.eventId()]" directly.
 * Additionally, in debug mode a red marker will always be shown over every event with the <TODO> tag, regardless of the above conditions.
 * 
 * ConfigManager.markerMode dictates whether markers are shown when an assigned key is held (when false) or are toggled by that key (when true)
 */
class MarkerManager extends Window_Base {
    constructor(newMarker, oldMarker, colorblindMarker, todoMarker) {
        let padding = Window_Base.prototype.standardPadding();
        super(0, 0, Graphics.width + padding * 2, Graphics.height + padding * 2);
        this.standardPadding = () => 0;
        this.padding = 0;
        this.move(0, 0, Graphics.width, Graphics.height);
        this.enabled = false;
        this.watchedKey = null;
        this.validEvents = [];
        this.screenScale = $gameMap.zoom?.y ?? 1;
        this.ready = false;
        this.open();
        this.opacity = 0;
        this.contentsOpacity = 0;
        this.markerRegions = {}; //For each region event stores the list of map coordinates its synchronised with

        this.MIN_VERTICAL_OFFSET = 0; //Markers will animate between their min and max offset from basic position, over the course of 1 second (or 2 both ways).
        this.MAX_VERTICAL_OFFSET = 16;
        this.FADE_SPEED = 48; //How much should opacity change by in a single frame when fading in/out. Opacity has values 0-255.

        let bmp = ImageManager.loadPicture(newMarker);
        bmp.addLoadListener(function () {
            this.newMarker = bmp;
            if (this.oldMarker && this.colorblindMarker && this.todoMarker) this.ready = true;
        }.bind(this));

        let bmp2 = ImageManager.loadPicture(oldMarker);
        bmp2.addLoadListener(function () {
            this.oldMarker = bmp2;
            if (this.newMarker && this.colorblindMarker && this.todoMarker) this.ready = true;
        }.bind(this));

        let bmp3 = ImageManager.loadPicture(colorblindMarker);
        bmp3.addLoadListener(function () {
            this.colorblindMarker = bmp3;
            if (this.oldMarker && this.newMarker && this.todoMarker) this.ready = true;
        }.bind(this));

        let bmp4 = ImageManager.loadPicture(todoMarker);
        bmp4.addLoadListener(function () {
            this.todoMarker = bmp4;
            if (this.newMarker && this.oldMarker && this.colorblindMarker) this.ready = true;
        }.bind(this));
    }
    update() {
        if (!this.enabled || !this.ready) return;
        if (!g.getInterpreter().isRunning() && this.contentsOpacity < 255 && !this.unhiding && !this.disableOnHide) {
            this.hiding = false;
            this.unhiding = true;
            this.updateEvents();
        }
        if (this.hiding) {
            this.contentsOpacity -= this.FADE_SPEED;
            if (this.contentsOpacity <= 0) {
                this.contentsOpacity = 0;
                this.hiding = false;
                if (this.disableOnHide) this.enabled = false;
                this.disableOnHide = false;
                return;
            }
        } else if (this.unhiding) {
            this.contentsOpacity += this.FADE_SPEED;
            if (this.contentsOpacity >= 255) {
                this.contentsOpacity = 255;
                this.unhiding = false;
            }
        }
        if (g.getInterpreter().isRunning() && !g.getInterpreter().event()?.event()?.meta?.MarkerNoHide && this.contentsOpacity > 0 && !this.hiding) {
            this.hiding = true;
            this.unhiding = false;
        }
        if (!Input.isPressed(this.watchedKey) && !ConfigManager.markerMode) this.disable();
        if (this.contentsOpacity > 0) this.refresh();
    }
    refresh() {
        this.contents.clear();
        if (!this.enabled || !this.ready) return;
        let events = this.validEvents.filter(e => e.isNearTheScreen(this.screenScale) || e.event().meta.MarkerRegion);
        let offsetProgress = (Graphics.frameCount % 120) / 120; //At what point in time is the animation (from 0 to 1)
        let smoothProgress = (Math.sin(offsetProgress * Math.PI * 2) + 1) / 2; //Vertical position in the animation, from 0 to 1
        let range = this.MAX_VERTICAL_OFFSET - this.MIN_VERTICAL_OFFSET;
        let verticalOffset = this.MIN_VERTICAL_OFFSET + range * smoothProgress;
        for (let event of events) {
            let x = event.screenX() * this.screenScale;
            let y = (event.screenY() + event.shiftY()) * this.screenScale - $gameMap.tileHeight() * this.screenScale + verticalOffset;

            if (event.event().meta?.MarkerOffset) {
                let [dx, dy] = event.event().meta?.MarkerOffset.split(',').map(Number);
                x += dx * $gameMap.tileWidth() * this.screenScale;
                y += dy * $gameMap.tileHeight() * this.screenScale;
            }

            //Draw the marker
            let isActive = !$es[event._eventId];
            if (event.event().meta?.MarkerSync) isActive = !$es[parseInt(event.event().meta.MarkerSync)];
            this.drawMarker(x, y, isActive, MAC_DEBUG && event.event().meta?.TODO);

            //Draw region markers
            if (event.event().meta?.MarkerRegion) {
                for (let [x, y] of this.markerRegions[event.eventId()]) {
                    this.drawMarker(
                        ($gameMap.adjustX(x) + 0.5) * $gameMap.tileWidth() * this.screenScale,
                        $gameMap.adjustY(y) * $gameMap.tileHeight() * this.screenScale + verticalOffset,
                        isActive, MAC_DEBUG && event.event().meta?.TODO);
                }
            }
        }
    }
    /**
     * Draws a marker at the given screen position. Coordinates given specify the centre X and bottom Y of the marker.
     * @param {Number} screenX Screen position of the centre of the marker
     * @param {Number} screenY Screen position of the bottom of the marker
     * @param {Boolean} active Whether the "active" sprite (indicating a new event) should be used
     */
    drawMarker(screenX, screenY, active, isTodo) {
        let sprite = this.oldMarker;
        if (isTodo) sprite = this.todoMarker;
        else if (active) sprite = g.isColorblind ? this.colorblindMarker : this.newMarker;
        this.contents.blt(sprite, 0, 0, sprite.width, sprite.height, screenX - sprite.width / 2, screenY - sprite.height, sprite.width, sprite.height);
    }
    /**
     * Shows event markers. If done by holding down a key, specify it as an argument, and MarkerManager will watch for it being unpressed. 
     * Otherwise it will stay enabled until disable() is called.
     * If done by toggle, call toggle() instead.
     * @param {Number} [key] Keycode, if enabled by holding a key
     */
    enable(key) {
        if (!this.ready) return;
        this.enabled = true;
        this.hiding = false;
        this.disableOnHide = false;
        this.watchedKey = key;
        this.updateEvents();
        if (!g.getInterpreter().isRunning()) this.unhiding = true;
    }
    disable() {
        this.unhiding = false;
        this.hiding = true;
        this.disableOnHide = true;
    }
    toggle() {
        if (!this.enabled || this.hiding) this.enable();
        else this.disable();
    }
    updateEvents() {
        if (this.enabled) {
            this.validEvents = $gameMap.events().filter(this.isEventValid.bind(this));
            let regionEvents = this.validEvents.filter(e => e.event().meta?.MarkerRegion);
            let regionsNeeded = {}; //For each region id, stores the event id that needs it
            this.markerRegions = {};
            for (let event of regionEvents) {
                let regionId = Number(event.event().meta.Region);
                regionsNeeded[regionId] = event.eventId();
                this.markerRegions[event.eventId()] = [];
            }
            if (regionEvents.length > 0) {
                //Iterate over every tile in the map, and add to region events if its region id matches a needed one
                for (let x = 0; x < $gameMap.width(); x++) {
                    for (let y = 0; y < $gameMap.height(); y++) {
                        let regionId = $gameMap.regionId(x, y);
                        if (regionsNeeded[regionId]) {
                            this.markerRegions[regionsNeeded[regionId]].push([x, y]);
                        }
                    }
                }
            }
        }
    }
    isEventValid(event) {
        if (MAC_DEBUG && event?.meta?.TODO) return true; //If we need to show a to do marker, ignore all other conditions
        let page = event.page();
        if (!page) return false; //The event has no active page
        if (event.event().meta?.NoMarker) return false; //It has a <noMarker> tag
        let list = page.list;
        if (list.length <= 1) return false; //It's active page is empty
        if (event.event().meta?.Marker) return true; //It has a <Marker> tag
        if (event.event().meta?.MarkerSync) return this.isEventValid($gameMap._events[parseInt(event.event().meta.MarkerSync)]); //It has a <MarkerSync> tag
        if (list.length === 2 && list[0].code === 355 && list[0].parameters[0].substr(0, 14) === 'runNearbyEvent') return false; //It runs a nearby event (script)
        if (list.length === 2 && list[0].code === 356 && list[0].parameters[0].substr(0, 8).toLowerCase() === 'runevent') return false; //It runs a nearby event (plugin command)
        if (event._trigger > 0) return false; //Different trigger than the action key
        if (event.isThrough() && event._priorityType !== 1 || event.event().meta?.NoTrigger) return false; //It has a disabled trigger

        return true;
    }
}


