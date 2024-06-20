class MarkerManager extends Window_Base {
    constructor(newMarker, oldMarker) {
        let padding = Window_Base.prototype.standardPadding();
        super(0, 0, Graphics.width + padding * 2, Graphics.height + padding * 2);
        this.standardPadding = () => 0;
        this.move(0, 0, Graphics.width, Graphics.height);
        this.enabled = false;
        this.watchedKey = null;
        this.validEvents = [];
        this.screenScale = $gameMap.zoom?.y ?? 1;
        this.ready = false;
        this.open();
        this.opacity = 0;
        this.contentsOpacity = 0;
        this.MAX_VERTICAL_OFFSET = 16;
        this.FADE_SPEED = 48;
        this.markerRegions = {}; //For each region event stores the list of map coordinates its synchronised with

        let bmp = ImageManager.loadPicture(newMarker);
        bmp.addLoadListener(function () {
            this.newMarker = bmp;
            if (this.oldMarker) this.ready = true;
        }.bind(this));

        let bmp2 = ImageManager.loadPicture(oldMarker);
        bmp2.addLoadListener(function () {
            this.oldMarker = bmp2;
            if (this.newMarker) this.ready = true;
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
        if (g.getInterpreter().isRunning() && !g.getInterpreter().event().event().meta?.MarkerNoHide && this.contentsOpacity > 0 && !this.hiding) this.hiding = true;
        if (!Input.isPressed(this.watchedKey) && !ConfigManager.markerMode) this.disable();
        if (this.contentsOpacity > 0) this.refresh();
    }
    refresh() {
        this.contents.clear();
        if (!this.enabled || !this.ready) return;
        let events = this.validEvents.filter(e => e.isNearTheScreen(this.screenScale) || e.event().meta.MarkerRegion);
        let verticalOffset = Math.floor(this.MAX_VERTICAL_OFFSET * 2 * (Graphics.frameCount % 120) / 120);
        if (verticalOffset > this.MAX_VERTICAL_OFFSET) verticalOffset = this.MAX_VERTICAL_OFFSET - (verticalOffset - this.MAX_VERTICAL_OFFSET);
        for (let event of events) {
            let x = event.screenX() * this.screenScale - 28; //28 was found experimentally, I'm not sure why it's offset by that
            let y = event.screenY() * this.screenScale - $gameMap.tileHeight() * this.screenScale - verticalOffset;

            if (event.event().meta?.MarkerOffset) {
                let [dx, dy] = event.event().meta?.MarkerOffset.split(',').map(Number);
                x += dx * $gameMap.tileWidth() * this.screenScale;
                y += dy * $gameMap.tileHeight() * this.screenScale;
            }

            //Draw the marker
            let isActive = !$es[event._eventId];
            if (event.event().meta?.MarkerSync) isActive = !$es[parseInt(event.event().meta.MarkerSync)];
            this.drawMarker(x, y, isActive);
        }
    }
    drawMarker(screenX, screenY, active) {
        let bmp = active ? this.newMarker : this.oldMarker;
        this.contents.blt(bmp, 0, 0, bmp.width, bmp.height, screenX, screenY, bmp.width, bmp.height);
    }
    enable(key) {
        if (!this.ready) return;
        this.enabled = true;
        this.unhiding = true;
        this.hiding = false;
        this.disableOnHide = false;
        this.watchedKey = key;
        this.updateEvents();
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
                let regionId = event.event().meta.MarkerRegion;
                regionsNeeded[regionId] = event.eventId();
                this.markerRegions[event.eventId()] = [];
            }
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
    isEventValid(event) {
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
        if (event.isThrough() && event._priorityType !== 1 || event.event().meta && event.event().meta.NoTrigger) return false; //It has a disabled trigger

        return true;
    }
}



