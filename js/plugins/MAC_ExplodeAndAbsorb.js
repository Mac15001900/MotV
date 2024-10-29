/*:
 * @plugindesc (v0.6)Adds an effect with resources that explode out and are then collected.
 * @author Mac15001900, commissioned by TheAM-Dol
 * 
 * @param Templates
 * @desc Templates for the TemplateExplode command
 * @type struct<ExplosionTemplate>[]
 * @default []
 * 
 * @param Max particle variable
 * @desc The maximum number of particles from a single effect will be capped at the value of this variable.
 * @type variable
 * @default 0
 * 
 * @param Player vertical offset
 * @desc How far above the centre of a tile is the centre of the player, in pixels
 * @type number
 * @default 16
 * 
 * @param Font digit width
 * @desc The width of the widest digit in the default font, in pixels
 * @type number
 * @default 16
 * 
 * @param Plus/minus sign width
 * @desc The width of the plus or minus sign in the default font, in pixels
 * @parent Font digit width
 * @type number
 * @default 10
 * 
 * @help
 * RC version (v0.6)
 * 
 * Creates fancy effects for visually collecting resources.
 * 
 * To create a quick effect use the plugin command:
 * 
 * IconExplode iconId, amount, source, target, absorption wait time, 
 * number ticker on/off, Explode SFX, Absorb SFX, [advanced physics], [direction]
 * 
 * Example:
 * IconExplode 56 100 0 -1 60 on Flash1 ExplodePickup true
 * 
 * Arguments in [brackets] are optional
 * The amount can be negative (which replaces the '+' with a '-' in the counter)
 * Source and target can be either event ids, 0 for the current event or
 * -1 for the player
 * Wait time is specified in frames.
 * "Advanced physics" refers to particles having a limited ability to change
 * their flight direction.
 * 
 * Direction can be used to limit directions where the particles will fly. Use 
 * two angle values, separated by a hyphen, to specify the range. Angle 0
 * represents going to the right, with angles increasing counter-clockwise. E.g.
 * 0-90 will only go towards the top-right quadrant
 * 180-270 will only got towards the bottom-left quadrant
 * 89-91 will make all particles fly in a line upwards
 * 0-360 has the same effect as not including this argument
 * 
 * Use can also create reusable templates in plugin parameters that allow for 
 * more customisation. To use them, use the plugin command:
 * 
 * TemplateExplode name value source target [direction]
 * 
 * Example:
 * TemplateExplode Basic 1000 2 -1 90-180
 * 
 * To wait for all currently active effects to end, use the 
 * "WaitForExplosions" command.
 * 
 * ------------------------ Using variables and switches ------------------------
 *
 * All numerical values in the plugin commands and plugin parameters can be
 * replaced with a variable, by using the letter "v" followed by its id,
 * e.g. "v42". This will use whatever the value of that variable is when the
 * effect is started.
 *
 * Similarly, all boolean values (true or false) can be replaced with a switch,
 * e.g. "s42".
 *
 * When using them in plugin parameters, you'll have to select the "Text" tab,
 * so that the editor will let you enter a letter.
 * 
 * 
 */

/*~struct~ExplosionTemplate:
 * @param Name
 * @desc Name that you'll use in the plugin command to select this template
 *
 * @param Icons
 * @desc What icons should this effect use
 * @type struct<IconValue>[]
 * @default [] 
 *
 * @param Min radius
 * @desc Minimum radius of the explosion (in tiles)
 * @type number
 * @decimals 4
 * @default 3
 * 
 * @param Max radius
 * @desc Maximum radius of the explosion (in tiles)
 * @type number
 * @decimals 4
 * @default 7
 * 
 * @param Absorption wait time
 * @desc How long will the particles spend "idling", in frames. I'd highly recommend to make it a multiple of 10.
 * @type number
 * @default 60
 * 
 * @param Wait time variance
 * @desc How much should the wait time vary by, as fraction of total.
 * @type number
 * @decimals 4
 * @default 0.33
 * 
 * @param Acceleration
 * @desc Particle acceleration when moving towards the player, in tiles per frame squared.
 * @type number
 * @decimals 4
 * @default 0.002
 * 
 * @param Target size
 * @desc What distance from target's centre is considered to be "touching" the target, in tiles.
 * @type number
 * @decimals 4
 * @default 1
 * 
 * @param Maximum particles
 * @desc The cap on the number of particles. Leave as 0 to use the default.
 * @type number
 * @default 0
 * 
 * @param Explode sound
 * @desc Sound that will play when an explosion starts
 * @type file
 * @require 1
 * @dir audio/se/
 * 
 * @param Explode sound volume
 * @desc Volume for the explode sound (from 0 to 100)
 * @type number
 * @default 50
 * 
 * @param Absorb sound
 * @desc Sound that will play whenever a particle is absorbed
 * @type file
 * @dir audio/se/
 * @require 1
 * @default ExplodePickup
 * 
 * @param Absord sound volume
 * @desc Volume for the absorption sound (from 0 to 100)
 * @type number
 * @default 50
 * 
 * @param Volume variance
 * @desc How much should the absorption sound volume vary by, as fraction of total.
 * @type number
 * @decimals 4
 * @default 0.1
 * 
 * @param Pitch variance
 * @desc How much should the absorption sound pitch vary by, as fraction of total.
 * @type number
 * @decimals 4
 * @default 0.25
 * 
 * @param Use counter
 * @desc Whether the resource counter should be shown.
 * @type boolean
 * @default true
 * @on shown
 * @off hidden
 * 
 * @param Counter background color
 * @desc The color of the counter background, in hex format.
 * @default #ffffff
 * 
 * @param Counter text color
 * @desc The color of the counter text, as a message color index (the same you'd use in \c[x] in a message).
 * @type number
 * @default 1
 * 
 * @param Physics mode
 * @desc In simple mode particles will fly straight towards the target. In advanced mode they have a limited turning radius. 
 * @type boolean
 * @default true
 * @on Simple
 * @off Advanced
 * 
 * @param Advanced mode options
 * @desc Options for customising the advanced physics mode. They won't have any effect in simple mode.
 * @type struct<AdvancedOptions>
 * @default {"Turning speed":"0","Turning acceleration":"0.05","Max speed":"0.25","Targeting offset":"4"}
 * 
 * 
 * 
*/

/*~struct~IconValue:
 * 
 * @param Icon id
 * @desc Index of the icon.
 * @type number
 * @default 1
 * 
 * @param Value
 * @desc How many resources should this icon be worth.
 * @type number
 * @default 1
 *
 *  
*/

/*~struct~AdvancedOptions:
 * 
 * @param Starting turning speed
 * @desc How fast should the particles turn when they start flying towards the player, in degrees per frame.
 * @decimals 4
 * @type number
 * @default 0
 * 
 * @param Turning acceleration
 * @desc How fast should the particles increase their turning speed, in degrees per frame squared.
 * @decimals 4
 * @type number
 * @default 0.05
 * 
 * @param Max speed
 * @desc Maximum speed particles should be flying at, in tiles per frame
 * @decimals 4
 * @type number
 * @default 0.25
 * 
 * @param Targeting offset
 * @desc When particles start flying towards the player, they'll start by flying towards a random tile up to this many tiles away from the player.
 * @decimals 4
 * @type number
 * @default 4
 *
 *  
*/

/* * @param Icon
 * @desc Icon index for the effect
 * @type number
*/

var Imported = Imported || {}
Imported.MAC_ExplodeAndAbsorb = "0.4";
window.MAC_ExplodeAndAbsorb = {};

void function ($) {

    const TILE_HEIGHT = 48;
    let rawParams = PluginManager.parameters('MAC_ExplodeAndAbsorb');
    const π = Math.PI;

    $.effects = [];
    $.counters = [];
    $.lastMapId = null;
    $.templates = {};
    JsonEx.parse(rawParams.Templates).map(t => JsonEx.parse(t)).forEach(t => {
        $.templates[t.Name] = t;
        t.Icons = JsonEx.parse(t.Icons).map(v => JsonEx.parse(v));
        t["Advanced mode options"] = JsonEx.parse(t["Advanced mode options"]);
    });

    $.maxParticlesVariable = numberValue(rawParams["Max particle variable"]);
    $.fontWidth = numberValue(rawParams["Font digit width"]);
    $.plusWidth = numberValue(rawParams["Plus/minus sign width"]);
    $.playerOffset = numberValue(rawParams["Player vertical offset"]) / TILE_HEIGHT;

    void ((alias) => {
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            alias.call(this, command, args);
            let idParser = raw => numberValue(raw) || this.eventId();
            switch (command.toLowerCase()) {
                case 'explodetest':
                    window.test = new ResourceEmitter(...args.map(numberValue));
                    addBelowWindowLayer(test);
                    break;
                case 'iconexplode': {//icon id, value (particle number), source, target, absorption wait time, number ticker on/off, Explode SFX, Absorb SFX, physics mode, direction
                    let config = JsonEx.makeDeepCopy(defaultConfig);
                    config.timing[AnimationStage.IDLE] = numberValue(args[4]) || 60;
                    config.useCounter = booleanValue(args[5]) || false;
                    config.explosionSound = args[6] || '';
                    config.pickupSound = args[7] || '';
                    config.simpleMode = !booleanValue(args[8]);
                    let emitter = new ResourceEmitter(numberValue(args[1]), numberValue(args[0]), idParser(args[2]), idParser(args[3]), config, rangeValue(args[9]));
                    addBelowWindowLayer(emitter);
                    break;
                }
                case 'templateexplode': { //Template name, amount, source, target, direction
                    let config = JsonEx.makeDeepCopy(defaultConfig);
                    let template = $.templates[args[0]];
                    if (!template) throw new Error(`ExplodeAndAbsorb: Template ${args[0]} not found`);

                    let iconData = template["Icons"].map(i => ({ id: numberValue(i["Icon id"]), value: numberValue(i["Value"]) }));

                    config.minDistance = numberValue(template["Min radius"]);
                    config.maxDistance = numberValue(template["Max radius"]);
                    config.timing[AnimationStage.IDLE] = numberValue(template["Absorption wait time"]);
                    config.idleTimeVariance = numberValue(template["Wait time variance"]);
                    config.chaseAcceleration = numberValue(template["Acceleration"]);
                    config.absordRange = numberValue(template["Target size"]);
                    config.explosionSound = template["Explode sound"];
                    config.explosionVolume = numberValue(template["Explode sound volume"]);
                    config.pickupSound = template["Absorb sound"];
                    config.pickupVolume = numberValue(template["Absord sound volume"]);
                    config.volumeVariance = numberValue(template["Volume variance"]);
                    config.pitchVariance = numberValue(template["Pitch variance"]);
                    config.useCounter = booleanValue(template["Use counter"]);
                    config.counterBackground = hexToRgb(template["Counter background color"]);
                    config.counterColor = numberValue(template["Counter text color"]);
                    config.particleCap = numberValue(template["Maximum particles"]) || Infinity;

                    config.simpleMode = booleanValue(template["Physics mode"]);
                    config.turningSpeed = numberValue(template["Advanced mode options"]["Turning speed"]) * π / 180;
                    config.turningAcceleration = numberValue(template["Advanced mode options"]["Turning acceleration"]) * π / 180;
                    config.maxSpeed = numberValue(template["Advanced mode options"]["Max speed"]);
                    config.targetingOffset = numberValue(template["Advanced mode options"]["Targeting offset"]);

                    let emitter = new ResourceEmitter(numberValue(args[1]), iconData, idParser(args[2]), idParser(args[3]), config, rangeValue(args[4]));
                    addBelowWindowLayer(emitter);
                    break;
                }
                case 'waitforexplosions':
                    this.setWaitMode('explodeEffect');
                    break;
            }

        }
    })(Game_Interpreter.prototype.pluginCommand);


    let defaultConfig = {
        //The default configuration for particles
        timing: {
            0: 30,
            1: 60,
            2: 30,
            4: 5,
        },
        explodeTimeVariance: 0.5,
        idleTimeVariance: 0.33,
        speed: {
            1: 90,
            2: 10,
        },
        minDistance: 3,
        maxDistance: 7,
        idleAmplitude: 0.5,
        chaseAcceleration: 0.002,
        simpleMode: true,
        turningSpeed: 0, //Turning speed while chasing, in radians per frame
        turningAcceleration: 0.05 * π / 180, //How much does turning speed increase per frame
        maxSpeed: 0.25,
        absordRange: 1,
        targetingOffset: 4,

        explosionSound: "Flash1",
        pickupSound: "ExplodePickup",
        volumeVariance: 0.1,
        pitchVariance: 0.25,
        explosionVolume: 50,
        pickupVolume: 50,

        useCounter: true,
        counterColor: 8,
        counterBackground: [255, 255, 255],
    }

    const AnimationStage = {
        LOADING: -1,
        EXPLODE: 0,
        IDLE: 1,
        EASE_FOR_CHASE: 2,
        CHASE: 3,
        FADE: 4,
        DONE: 5
    }

    const BACK_EASE_OUT_PEAK = 0.58
    const BACK_EASE_FRACTION = 0.629846;
    const BACK_EASE_DERIVATIVE = 1.07173;

    //Interpreter: waiting for effects to end 
    void ((alias) => {
        Game_Interpreter.prototype.updateWaitMode = function () {
            if (this._waitMode === 'explodeEffect') return $.effects.length > 0;
            else return alias.call(this);
        }
    })(Game_Interpreter.prototype.updateWaitMode);


    //----------------------------------------------------
    //---------------- Particle container ----------------
    //----------------------------------------------------

    class ResourceEmitter extends PIXI.particles.ParticleContainer {
        constructor(amount, icons, origin, target, config = defaultConfig, directionRange = [0, 360]) {
            let targetAmount = Math.abs(amount);
            let particleSet = buildParticleSet(targetAmount, icons, config.particleCap);
            let particleAmount = particleSet.map((i) => i.amount).reduce((a, b) => a + b);
            super(particleAmount, { vertices: particleAmount <= 1000, position: true, tint: true });
            this.invisibleValue = targetAmount - particleSet.map((i) => i.amount * i.icon.value).reduce((a, b) => a + b);
            this.config = config;
            this.target = target;
            this.framesToRender = -1;
            this.counterShown = false;
            this.createParticles(particleSet, origin, directionRange);

            if (config.useCounter)
                this.counter = new Window_ResourceCounter(config.counterColor, amount, target, ...config.counterBackground);

            $.effects.push(this);
        }

        createParticles(particleSet, origin, directionRange) {
            let bitmap = ImageManager.loadSystem('IconSet');

            for (let i = 0; i < particleSet.length; i++) {
                const particle = particleSet[i];
                for (let j = 0; j < particle.amount; j++) {
                    this.addChild(new Sprite_ResourceP(particle.icon.id, origin, bitmap, this.config, particle.icon.value, directionRange));
                }
            }

            this.framesToRender = 2;
            if (this.config.explosionSound) {
                AudioManager.playSe({
                    name: this.config.explosionSound,
                    volume: this.config.explosionVolume,
                    pitch: 100,
                });
            }
        }

        update() {
            this.targetPosition = getEventPosition(this.target);
            this.fasterFade = this.children.length > 100;
            this.children.forEach(c => c.update());
            this.framesToRender--;
            this.soundPlayed = false; //Did we already play a pickup sound on this frame?
            if (this.framesToRender === 0) {
                this.children.forEach(c => c.start());
            }
            if (this.children.length === 0) {
                if (this.counter) {
                    if (this.invisibleValue) this.counter.increment(this.invisibleValue);
                    this.invisibleValue = 0;
                    this.counter.finish();
                }
                this.terminate();
            }
        }

        /**
         * @returns The current position of the effect's target
         */
        getTargetPosition(value) {
            return this.targetPosition;
        }

        /**
        * Checks if particles should use the faster fading method (true if there is a large enough quantity of them)
        */
        shouldFadeFaster() {
            return this.fasterFade;
        }

        reportCompletion(value = 1) { //Called by particles when they're finished
            //Update the counter
            if (this.counter) {
                if (!this.counterShown) {
                    addBelowWindowLayer(this.counter);
                    $.counters.push(this.counter);
                    this.counter.show();
                    this.counterShown = true;
                }
                this.counter.increment(value);
                if (this.invisibleValue > 0) {
                    let change = stochasticRound(this.invisibleValue / (this.children.length || 1));
                    this.counter.increment(change);
                    this.invisibleValue -= change;
                }
            }
            //Play the absorb sound
            if (!this.soundPlayed && this.config.pickupSound) {
                AudioManager.playSe({
                    name: this.config.pickupSound,
                    volume: addVariance(this.config.pickupVolume, this.config.volumeVariance),
                    pitch: addVariance(100, this.config.pitchVariance),
                });
                this.soundPlayed = true;
            }
        }

        terminate() {
            let index = $.effects.indexOf(this);
            if (index >= 0) $.effects.splice(index, 1);
            this.children.forEach(c => c.destroy());
            this.destroy();
        }
    }

    void ((alias) => {
        Scene_Map.prototype.onMapLoaded = function () {
            alias.call(this);
            if ($.lastMapId === $gameMap.mapId()) {
                $.effects.filter(e => e.transform).forEach(e => this.addChild(e));
                $.counters.filter(e => e.transform).forEach(e => this.addChild(e));
            } else {
                $.cleanup();
            }
            $.lastMapId = $gameMap.mapId();
        }
    })(Scene_Map.prototype.onMapLoaded);

    //These might be overkill, but should ensure that the container definitely get cleaned up, regardless of how we leave the map scene
    void ((alias) => {
        Scene_Gameover.prototype.start = function () {
            alias.call(this);
            $.cleanup();
        }
    })(Scene_Gameover.prototype.start);

    void ((alias) => {
        Scene_Title.prototype.start = function () {
            alias.call(this);
            $.cleanup();
        }
    })(Scene_Title.prototype.start);

    $.cleanup = function () {
        while ($.effects.length > 0) {
            let effect = $.effects.shift();
            if (effect) effect.terminate();
        }
        while ($.counters.length > 0) {
            let counter = $.counters.shift();
            if (counter) counter.destroy();
        }
    }

    //----------------------------------------------------
    //------------------ Counter window ------------------
    //----------------------------------------------------

    function Window_ResourceCounter() {
        this.initialize.apply(this, arguments);
    };

    Window_ResourceCounter.prototype = Object.create(Window_Base.prototype);
    Window_ResourceCounter.prototype.constructor = Window_ResourceCounter;
    Window_ResourceCounter.prototype.initialize = function (textColor, maxValue, target, r, g, b) {
        Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
        this.extraPadding = this.standardPadding();
        this.standardPadding = () => 0;
        this.updatePadding();
        this._textColor = textColor;
        this.maxValue = Math.abs(maxValue);
        this.signChar = maxValue < 0 ? '-' : '+';
        this.target = target;
        this.showing = false;
        this.opacity = 0;
        this.contentsOpacity = 0;
        this.currentValue = 0;
        this.basicColor = `rgba(${r}, ${g}, ${b}, `;

        //Calculate proper width
        // this._width = this.textWidth(this.signChar + Array((String(maxValue)).length).fill('0').join('')) + 2 * this.extraPadding;
        this._width = this.approximateTextWidth(maxValue) + 2 * this.extraPadding;
        this._height = this.fittingHeight(1) + this.textPadding() + this.extraPadding;
        this.contents = new Bitmap(this.contentsWidth(), this.contentsHeight());
    }

    Window_ResourceCounter.prototype.approximateTextWidth = function (maxValue) {
        return $.plusWidth + String(maxValue).length * $.fontWidth;
    }

    Window_ResourceCounter.prototype.show = function () {
        this.showing = true;
    }

    Window_ResourceCounter.prototype.refresh = function () {
        if (this.contentsOpacity <= 0) return;
        this.contents.clear();

        this.drawBackground(0, 0, this._width, this._height);
        this.drawTextEx(`\\c[${this._textColor}]${this.signChar}${this.currentValue}`, 1 * this.extraPadding, this.extraPadding / 2);
    }

    Window_ResourceCounter.prototype.drawBackground = function (x, y, width, height) {
        //Basic linear gradient. Increases more sharply near the edges
        let grad1 = this.contents._context.createLinearGradient(0, 0, width, 0);
        grad1.addColorStop(0, this._makeColor(0));
        grad1.addColorStop(0.1, this._makeColor(0.5));
        grad1.addColorStop(0.5, this._makeColor(0.8));
        grad1.addColorStop(0.9, this._makeColor(0.5));
        grad1.addColorStop(1, this._makeColor(0));
        this.contents.fillRect(x, y, width, height, grad1);

        //Additional radial gradient, to make the texture slightly more interesting
        let grad2 = this.contents._context.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, height * 2);
        grad2.addColorStop(0, this._makeColor(0.6));
        grad2.addColorStop(0.5, this._makeColor(0.3));
        grad2.addColorStop(1, this._makeColor(0));
        this.contents.fillRect(x, y, width, height, grad2);
    }

    Window_ResourceCounter.prototype._makeColor = function (transparency) {
        return this.basicColor + transparency + ")";
    }

    Window_ResourceCounter.prototype.increment = function (value = 1) {
        this.currentValue += value;
    }

    Window_ResourceCounter.prototype.setValue = function (value) {
        this.currentValue = value;
    }

    Window_ResourceCounter.prototype.update = function () {
        if (this.showing && this.contentsOpacity < 255) {
            this.contentsOpacity += 50;
            if (this.contentsOpacity >= 255) this.showing = false;
        }

        if (this.contentsOpacity > 0) {
            let targetPos = worldToScreen(getEventPosition(this.target));
            this.refresh();
            this.x = targetPos[0] + $gameScreen._zoomScale * $gameMap.tileWidth() / 2;
            if (this.x + this._width > Graphics.boxWidth) this.x = targetPos[0] - $gameScreen._zoomScale * $gameMap.tileWidth() * 1.5 - this._width;
            this.y = targetPos[1] - this._height / 2;
        }

        if (!this.showing && this.fadeOutOn && this.fadeOutOn < Graphics.frameCount) {
            this.contentsOpacity -= 12;
        }

        if (this.finished && this.contentsOpacity <= 0) {
            let index = $.counters.indexOf(this);
            if (index >= 0) $.counters.splice(index, 1);
            this.destroy();
        }
    }

    Window_ResourceCounter.prototype.finish = function () {
        this.fadeOutOn = Graphics.frameCount + 60;
        this.finished = true;
    }




    //----------------------------------------------------
    //----------------- Particle sprite ------------------
    //----------------------------------------------------


    function Sprite_ResourceP() {
        this.initialize.apply(this, arguments);
    }

    Sprite_ResourceP.prototype = Object.create(Sprite.prototype);
    Sprite_ResourceP.prototype.constructor = Sprite_ResourceP;

    Sprite_ResourceP.prototype.initialize = function (iconIndex, origin, bitmap, config = defaultConfig, value = 1, directionRange) {
        Sprite.prototype.initialize.call(this);
        this.iconIndex = iconIndex;
        this.config = config;
        this.resourceValue = value;
        this.directionRange = directionRange;
        this.initMembers(origin);
        this.loadBitmap(bitmap);
    };

    Sprite_ResourceP._iconWidth = 32;
    Sprite_ResourceP._iconHeight = 32;

    Sprite_ResourceP.prototype.initMembers = function (origin) {
        this.stage = AnimationStage.LOADING;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.worldPos = getEventPosition(origin);
        this.startPos = [...this.worldPos];
        [this.x, this.y] = worldToScreen(this.worldPos);
        this.turningSpeed = this.config.turningSpeed;
        this.isDone = false;
        this.scaling = 1;
        this.lastScaling = 1;
        this.frameCount = 0; //We're making our own frame count, with blackjack and hookers (so it doesn't tick when paused)
    };

    Sprite_ResourceP.prototype.loadBitmap = function (bitmap) {
        this.bitmap = bitmap;
        this.updateFrame();
    };

    Sprite_ResourceP.prototype.setup = function () { //Not yet sure if this function is required
    };

    Sprite_ResourceP.prototype.start = function () {
        this.setupExplode();
    };

    Sprite_ResourceP.prototype.update = function () {
        Sprite.prototype.update.call(this);
        this.frameCount++;
        if (this.scaling !== $gameScreen._zoomScale) this.scaling = $gameScreen._zoomScale;
        switch (this.stage) {
            case AnimationStage.LOADING:
                return;
            case AnimationStage.EXPLODE:
                this.updateExplode();
                break;
            case AnimationStage.IDLE:
                this.updateIdle();
                break;
            case AnimationStage.EASE_FOR_CHASE:
                this.updateEaseForChase();
                break;
            case AnimationStage.CHASE:
                this.updateChase();
                break;
            case AnimationStage.FADE:
                this.updateFade();
                break;
        }

        if (this.frameCount >= this.animationEnd) {
            switch (this.stage) {
                case AnimationStage.EXPLODE:
                    this.setupIdle();
                    break;
                case AnimationStage.IDLE:
                    this.setupEaseForChase();
                    break;
                case AnimationStage.EASE_FOR_CHASE:
                    this.setupChase();
                    break;
                case AnimationStage.CHASE:
                    this.setupFade();
                    break;
                case AnimationStage.FADE:
                    this.setupDone();
                    break;
            }
        }

        if (!this || this.isDone) return;

        [this.x, this.y] = worldToScreen(this.worldPos);
        if (this.scaling !== this.lastScaling) {
            this.scale.set(this.scaling, this.scaling);
            this.lastScaling = this.scaling;
        }
    };

    Sprite_ResourceP.prototype.updateFrame = function () {
        var pw = Sprite_ResourceP._iconWidth;
        var ph = Sprite_ResourceP._iconHeight;
        var sx = this.iconIndex % 16 * pw;
        var sy = Math.floor(this.iconIndex / 16) * ph;
        this.setFrame(sx, sy, pw, ph);
    };


    //---------- Animation logic ----------

    //----- Exploding -----

    Sprite_ResourceP.prototype.setupExplode = function () {
        this.stage = AnimationStage.EXPLODE;
        this.animationStart = this.frameCount;
        let explosionTime = Math.floor(this.config.timing[AnimationStage.EXPLODE] * (1 + Math.random() * this.config.explodeTimeVariance * 2 - this.config.explodeTimeVariance));
        this.animationEnd = this.animationStart + explosionTime;

        // let direction = Math.random() * Math.PI * 2;
        let [minAngle, maxAngle] = this.directionRange;
        let direction = (minAngle + Math.random() * (maxAngle - minAngle)) * π / 180;
        let distance = this.config.minDistance + Math.random() * (this.config.maxDistance - this.config.minDistance)
        this.targetPos = [];
        this.targetPos[0] = this.startPos[0] + Math.cos(direction) * distance;
        this.targetPos[1] = this.startPos[1] - Math.sin(direction) * distance;
    };

    Sprite_ResourceP.prototype.updateExplode = function () {
        let progress = (this.frameCount - this.animationStart) / (this.animationEnd - this.animationStart);
        if (progress >= 1) {
            // this.worldPos = [...this.targetPos];
        } else {
            this.worldPos = posBetween(this.startPos, this.targetPos, easeOutBack(progress * BACK_EASE_OUT_PEAK));
        }
    };

    //----- Idling -----

    Sprite_ResourceP.prototype.setupIdle = function () {
        this.stage = AnimationStage.IDLE;
        //Setting up side-fumbling (sideways motion that attenuates the movement from the explosion)
        //Sine to implement: (1/(1+(x-0.5)/2)) * sin((x-0.15)*4)/10+1
        this.sideFumblingPeriod = 2 * π * ((this.animationEnd - this.animationStart) / BACK_EASE_OUT_PEAK) / 4;
        let amplitude = distanceBetween(this.startPos, this.targetPos) / 10;
        let directionVector = [this.startPos[0] - this.targetPos[0], this.startPos[1] - this.targetPos[1]];
        //Normalise the vector and multiply by amplitude
        let vectorLength = distanceBetween([0, 0], directionVector)
        this.sideFumblingDisplacement = [directionVector[0] / vectorLength * amplitude, directionVector[1] / vectorLength * amplitude];

        //Regular idle setup
        this.animationStart = this.frameCount;
        let idleTime = Math.floor(this.config.timing[AnimationStage.IDLE] * (1 + Math.random() * this.config.idleTimeVariance * 2 - this.config.idleTimeVariance));
        this.animationEnd = this.animationStart + idleTime;
        this.idleStartFrame = this.frameCount % this.config.speed[AnimationStage.IDLE];
        this.startPos = [...this.worldPos];
        this.targetPos = [this.startPos[0], this.startPos[1] + this.config.idleAmplitude];
    };

    Sprite_ResourceP.prototype.updateIdle = function () {
        //Regular idle animation (bobbing up and down)
        let speed = this.config.speed[AnimationStage.IDLE];
        let offsetProgress = ((this.frameCount - this.idleStartFrame) % speed) / speed; //At what point in time is the animation (from 0 to 1)
        let smoothProgress = (Math.sin(offsetProgress * 2 * π)) / 2; //Vertical position in the animation, from 0 to 1
        this.worldPos[0] = this.startPos[0]
        this.worldPos[1] = this.startPos[1] - (this.targetPos[1] - this.startPos[1]) * smoothProgress;

        //Adding side-fumbling
        let overallProgress = (this.frameCount - this.animationStart) / (this.animationEnd - this.animationStart);
        let sideFumblingProgress = ((this.frameCount - this.animationStart) % this.sideFumblingPeriod) / this.sideFumblingPeriod;
        this.worldPos = addVectors(this.worldPos, multiplyVector(this.sideFumblingDisplacement, 1 + (Math.max(0, 1 - overallProgress * 1)) * Math.sin(sideFumblingProgress * 2 * Math.PI - 0.5 * Math.PI)));
    }

    //----- Ease for chasing -----

    Sprite_ResourceP.prototype.setupEaseForChase = function () {
        this.stage = AnimationStage.EASE_FOR_CHASE;
        this.animationStart = this.frameCount;
        this.animationEnd = this.animationStart + this.config.timing[AnimationStage.EASE_FOR_CHASE];
        this.startPos = [...this.worldPos];
        this.targetPos = this.parent.getTargetPosition()
        if (!this.config.simpleMode) this.targetPos = this.targetPos.map(v => v + this.config.targetingOffset * (2 * Math.random() - 1));
    };

    Sprite_ResourceP.prototype.updateEaseForChase = function () {
        let progress = (this.frameCount - this.animationStart) / (this.animationEnd - this.animationStart);
        this.worldPos = posBetween(this.startPos, this.targetPos, easeInBack(progress * BACK_EASE_FRACTION));
    };

    //----- Chasing -----

    Sprite_ResourceP.prototype.setupChase = function () {
        this.stage = AnimationStage.CHASE;
        //Calculating current speed
        let distance = distanceBetween(this.startPos, this.targetPos);
        let time = this.animationEnd - this.animationStart;
        this.speed = BACK_EASE_DERIVATIVE * distance / time;
        let dx = this.targetPos[0] - this.startPos[0];
        let dy = this.targetPos[1] - this.startPos[1];
        this.moveDirection = Math.atan2(dy, dx);

        this.animationStart = this.frameCount;
        this.animationEnd = Infinity;
    }

    Sprite_ResourceP.prototype.updateChase = function () {
        //Modify velocity towards the target
        let targetPos = this.parent.getTargetPosition();
        let dx = targetPos[0] - this.worldPos[0];
        let dy = targetPos[1] - this.worldPos[1];
        let targetDirection = Math.atan2(dy, dx);
        let sDistance = squareDistanceBetween(this.worldPos, targetPos);

        if (this.config.simpleMode) {
            this.moveDirection = targetDirection;
            this.speed += this.config.chaseAcceleration;
        } else {
            this.moveDirection = turnTowards(this.moveDirection, targetDirection, this.turningSpeed);
            this.turningSpeed += this.config.turningAcceleration;

            if (sDistance > Math.pow(this.config.absordRange, 2) * 16 || this.speed < this.config.maxSpeed / 4) {
                this.speed += this.config.chaseAcceleration;
                this.speed = Math.min(this.speed, this.config.maxSpeed);
            }
        }

        if (sDistance < this.speed * this.speed) this.worldPos = [...targetPos];
        else {
            this.worldPos[0] += Math.cos(this.moveDirection) * this.speed;
            this.worldPos[1] += Math.sin(this.moveDirection) * this.speed;
        }

        if (squareDistanceBetween(this.worldPos, targetPos) < Math.pow(this.config.absordRange, 2) && this.stage === AnimationStage.CHASE) {
            this.setupFade();
        }
    }

    /*
    Sprite_ResourceP.prototype.turnTowards = function (targetDirection) {
        let turningSpeed = this.config.turningSpeed;
        let currentDirection = this.moveDirection;
        let pi = Math.PI
        let tau = 2 * pi;
        let distance = angleDistance(currentDirection, targetDirection); //((targetDirection - currentDirection + pi) % tau + tau) % tau - pi;
        if (distance < turningSpeed) {
            this.moveDirection = targetDirection;
            return;
        }
    
        let overflow = Math.min(currentDirection, targetDirection) + 180 < Math.max(currentDirection, targetDirection); //Is it faster to go across the 2pi point?
        let positive = (targetDirection > currentDirection) !== overflow;
    
        this.moveDirection += turningSpeed * (positive ? 1 : -1);
        this.moveDirection = fixAngle(this.moveDirection);
        console.assert(angleDistance(this.moveDirection, currentDirection) <= turningSpeed + 0.01);
    }*/

    /*Sprite_ResourceP.prototype.updateChase = function () {
        //Modify velocity towards the target
        let targetPos = this.parent.getTargetPosition();
        let dx = targetPos[0] - this.worldPos[0];
        let dy = targetPos[1] - this.worldPos[1];
        this.moveDirection = Math.atan2(dy, dx);
        this.speed += this.config.chaseAcceleration;
     
        let sDistance = squareDistanceBetween(this.worldPos, targetPos);
        if (sDistance < this.speed * this.speed) this.worldPos = [...targetPos];
        else {
            this.worldPos[0] += Math.cos(this.moveDirection) * this.speed;
            this.worldPos[1] += Math.sin(this.moveDirection) * this.speed;
        }
     
        if (squareDistanceBetween(this.worldPos, targetPos) < Math.pow(this.config.absordRange, 2) && this.stage === AnimationStage.CHASE) {
            this.setupFade();
        }
    }*/

    //----- Fading -----

    Sprite_ResourceP.prototype.setupFade = function () {
        this.stage = AnimationStage.FADE;
        this.animationStart = this.frameCount;
        this.animationEnd = this.animationStart + this.config.timing[AnimationStage.FADE];
    };

    Sprite_ResourceP.prototype.updateFade = function () {
        // this.worldPos = [...this.parent.getTargetPosition()];
        this.updateChase();
        let progress = (this.frameCount - this.animationStart) / (this.animationEnd - this.animationStart);
        // this.opacity = 255 * (1 - progress);
        if (this.parent.shouldFadeFaster()) this.scaling = 1 - progress;
        else this.scaling = 1 - Math.sqrt(progress);
    }

    Sprite_ResourceP.prototype.setupDone = function () {
        this.parent.reportCompletion(this.resourceValue);
        this.isDone = true;
        this.destroy();
    }

    //----------------------------------------------------
    //---------------- Utility functions -----------------
    //----------------------------------------------------

    /**
     * 
     * @param {Number} event Event id, or -1 for the player
     * @returns The position of a given event's center, in tiles
     */
    function getEventPosition(event) {
        if (event === -1) return [$gamePlayer._realX + 0.5, $gamePlayer._realY + 0.5 - $.playerOffset];
        else {
            let e = $gameMap.event(event);
            return [e._realX + 0.5, e._realY + 0.5];
        }
    }

    function worldToScreen(pos) {
        let tw = $gameMap.tileWidth();
        let scale = $gameScreen.zoomScale();
        if ((Imported["SumRndmDde Camera Core"] || Imported.Galv_ScreenZoom || Imported.Eli_Zoom) && scale !== 1) {
            let screenWidthInTiles = Graphics.boxWidth / tw;
            let screenHeightInTiles = Graphics.boxHeight / tw;
            let screenCenterX = $gameMap._displayX + screenWidthInTiles / 2; //The tile coordinates of the screen center
            let screenCenterY = $gameMap._displayY + screenHeightInTiles / 2;
            let dx = screenCenterX - pos[0];
            let dy = screenCenterY - pos[1];
            return [Math.round(Graphics.boxWidth / 2 - dx * scale * tw), Math.round(Graphics.boxHeight / 2 - dy * scale * tw)];
        } else if (Imported.MBS_MapZoom) { //One of two zoom plugins that do things in a sensible way
            return [Math.round($gameMap.adjustX(pos[0]) * $gameMap.zoom.x * tw), Math.round($gameMap.adjustY(pos[1]) * $gameMap.zoom.y * tw)];
        } else if (Imported["CT_Bolt Zoom"]) { //And the second one
            return [Math.round($gameMap.adjustX(pos[0]) * $gameMap.zoomData.scale.x * tw), Math.round($gameMap.adjustY(pos[1]) * $gameMap.zoomData.scale.y * tw)];
        } else {
            return [Math.round($gameMap.adjustX(pos[0]) * scale * tw), Math.round($gameMap.adjustY(pos[1]) * scale * tw)];
        }
    }

    function posBetween(start, end, progress) {
        return [start[0] + (end[0] - start[0]) * progress, start[1] + (end[1] - start[1]) * progress];
    }

    function distanceBetween(pos1, pos2) {
        return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
    }

    function squareDistanceBetween(pos1, pos2) {
        return Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    }

    function addVectors(v1, v2) {
        return [v1[0] + v2[0], v1[1] + v2[1]];
    }

    function multiplyVector(v1, scalar) {
        return [v1[0] * scalar, v1[1] * scalar];
    }

    function addVariance(value, variance) {
        return value * (1 - variance + 2 * Math.random() * variance);
    }

    //Function adapted from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb#5624139
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) throw new Error("ExplodeAndAbsorb: Invalid hex color " + hex);
        result.shift();
        return result.map(v => parseInt(v, 16));
    }

    //Easing functions from https://easings.net

    //For wolfram: 1 + 2.70158 * (x - 1)^3 + 1.70158 *(x - 1)^ 2
    //Derivative at 0.8: -0.356442
    //Peak at x = 235079/405237 (x=0.58)
    //Sine that matches it: (1/(1+(x-0.5)/2))*sin((x-0.15)*4)/10+1
    function easeOutBack(x) {
        const c1 = 1.70158;
        const c3 = c1 + 1;

        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }

    //Returns 0 for x=0 and x = 85079/135079 (0.629846). Derivative at that point is 1.07173
    function easeInBack(x) {
        const c1 = 1.70158;
        const c3 = c1 + 1;

        return c3 * x * x * x - c1 * x * x;
    }
    /**
     * 
     * @returns The index of the WindowLayer object in the list of current scene's children, or -1 if not found.
     */
    function windowLayerIndex() {
        let objects = SceneManager._scene.children;
        for (let i = 0; i < objects.length; i++) {
            if (objects[i] instanceof WindowLayer) return i;
        }
        return -1;
    }

    /**
     * Adds an object to the scene just below the WindowLayer (or on top if it's not found)
     * @param {Sprite} object Object to be added
     */
    function addBelowWindowLayer(object) {
        let index = windowLayerIndex();
        if (index === -1) SceneManager._scene.addChild(object);
        else SceneManager._scene.addChildAt(object, index);
    }

    /**
         * Creates the set of particles to represent a certain value.
         * 
         * @param {Number} totalValue What value should be represented
         * @param {[Object]|Number} icons The set of icons to use, or icon id if only using one icon with value 1
         * @param {number} icons[].id The id of the icon
         * @param {number} icons[].value What value does this icon represent
         * @param {Number} [cap] Maximum number of particles we can use
         * @returns Array of {icon, amount} objects
         */
    function buildParticleSet(totalValue, icons, cap = Infinity) {
        //You might wonder why this function is here and not as part of ResourceEmitter. That's because we need its result before the super constructor.
        if ($.maxParticlesVariable && $gameVariables.value($.maxParticlesVariable) > 0) cap = Math.min(cap, $gameVariables.value($.maxParticlesVariable));
        if (typeof icons === 'number') icons = [{ id: icons, value: 1 }];
        else icons.sort((i1, i2) => i1.value - i2.value);

        //Check if we can only use the lowest value
        let amountWithOnlyLowest = totalValue / icons[0].value;
        if (amountWithOnlyLowest < cap) return [{ icon: icons[0], amount: Math.floor(amountWithOnlyLowest) }];

        //Try mixes of two different values
        for (let i = 1; i < icons.length; i++) {
            if (totalValue / icons[i].value < cap) { //If we only used these, do we make it below the cap?
                let valueWithOnlyLower = icons[i - 1].value * cap;
                let targetDifference = totalValue - valueWithOnlyLower;
                let valueDifference = icons[i].value - icons[i - 1].value;

                let higherAmount = Math.floor(targetDifference / valueDifference);
                let lowerGenerator = higher => Math.floor((totalValue - higher * icons[i].value) / icons[i - 1].value);
                let lowerAmount = lowerGenerator(higherAmount);

                while (higherAmount + lowerAmount > cap) { //This should only happen a few times (to correct rounding problems)
                    higherAmount++;
                    lowerAmount = lowerGenerator(higherAmount);
                }
                if (lowerAmount < 0) { //This means perfect accuracy is not possible - we'll settle on the cloests we can get to it
                    higherAmount--;
                    lowerAmount = cap - higherAmount;
                }

                return [{ icon: icons[i - 1], amount: lowerAmount }, { icon: icons[i], amount: higherAmount }];
            }
        }

        //Even the highest wasn't enough - so just use as many highest-value particles as we can
        return [{ icon: icons[icons.length - 1], amount: cap }];
    }

    function stochasticRound(value) {
        return Math.floor(value) + (Math.random() < value % 1 ? 1 : 0);
    }

    /**
     * Keeps an angle between -π and π
     * @param {Number} angle
     */
    function fixAngle(angle) {
        while (angle < -π) angle += 2 * π;
        while (angle > π) angle -= 2 * π;
        return angle;
    }

    /**
     * @returns The radial distance between two angles
     */
    function angleDistance(angle1, angle2) {
        return Math.abs(fixAngle(angle1 - angle2));
    }

    function turnTowards(startAngle, targetAngle, speed) {
        let difference = fixAngle(targetAngle - startAngle);
        if (Math.abs(difference) <= speed) return targetAngle;
        else return fixAngle(startAngle + Math.sign(difference) * speed);
    }

    //Testing fucntions

    function testingOne() {
        let test = new ResourceEmitter(0, 3, -1, -1);
        window.test2 = new Sprite_ResourceP(2, -1);
        test.addChild(test2);
        g.scene().addChild(test);
    }

    function testingOld(n) {
        for (let i = 0; i < n; i++) {
            let test2 = new Sprite_ResourceP(87, -1); g.scene().addChild(test2);
        }
    }

    function testing(n) {
        window.test = new ResourceEmitter(n, 87, -1, -1); g.scene().addChild(test);
    }

    function idleTesting(n) {
        window.test = new ResourceEmitter(n, 87, -1, -1, idleConfig); g.scene().addChild(test);
    }

    function wTest(value = 1000) {
        window.testW = new Window_ResourceCounter(1, value, -1, 0, 225, 225);
        g.scene().addChild(window.testW);
        testW.show()
    }

    function positionTest(dx, dy) {
        window.testP = new Sprite_ResourceP(88, -1, ImageManager.loadSystem('IconSet'));
        testP.offset = [dx, dy];
        testP.updateExplode = function () {
            this.worldPos = addVectors(getEventPosition(-1), this.offset);
            this.animationEnd = Infinity;
        }
        testP.start();
        g.scene().addChild(testP);
    }

    function spreadTest() {
        positionTest(1, 1);
        positionTest(1, -1);
        positionTest(-1, 1);
        positionTest(-1, -1);

        positionTest(2, 2);
        positionTest(2, -2);
        positionTest(-2, 2);
        positionTest(-2, -2);
        positionTest(0, 0);
    }

    function zoomTest(amount) {
        if (amount > 1) g.getInterpreter().pluginCommand("Zoomin", [String(amount)])
        else g.getInterpreter().pluginCommand("ZoomOut", String(1 / amount))
    }

    function centerTest() {
        let s3 = new PIXI.Sprite.fromImage("img/pictures/bc.png"); g.scene().addChild(s3)
        s3.anchor.x = 0.5;
        s3.anchor.y = 0.5;
        s3.x = Graphics.boxWidth / 2;
        s3.y = Graphics.boxHeight / 2;
    }

    //--------------------- Misc utils ---------------------

    /**
    * Converts a string (from plugin parameters or commands) to a number, regardless if that string contains a number literal of a variable indentifier
    * @param {String|Number} string A number or variable indentifier (in the form v42 or v0042)
    * @returns The string converted to a number
    */
    function numberValue(string) {
        if (!string) return 0;
        if (string[0] === 'v') return $gameVariables.value(Number(string.replace(/^v0*/, '')));
        else return Number(string);
    }

    /**
    * Converts a string (from plugin parameters or commands) to a boolean, regardless if that string contains a boolean literal of a switch indentifier
    * @param {String|Boolean} string A boolean or switch indentifier (in the form s42 or s0042)
    * @returns The string converted to a boolean
    */
    function booleanValue(string) {
        if (typeof string === "boolean") return string;
        if (!string || string.length === 0) return false;
        if (string[0] === 's') return $gameSwitches.value(Number(string.replace(/^s0*/, '')));
        else return ["true", "t", "on", "yes", "y"].includes(string.toLocaleLowerCase());
    }

    /**
    * Converts a string (from plugin parameters or commands) to a list of numbers. 
    * @param {String} string A list of comma-separated numbers. Whitespace, as well as "[" and "]" characters are ignored.
    * @returns The string converted to a list of numbers
    */
    function numberListValue(string) {
        if (!string) return [];
        return string.replace(/[\[\]\s\n]/g, "").split(",").filter(s => s.length > 0).map(numberValue);
    }

    /**
    * Converts a string (from plugin parameters or commands) to a list of two values.
    * @param {String} string Two numeric values, seprated by '-'. If the argument is not a string, it's returned unchanged.
    * @returns The string converted to a list of numbers
    */
    function rangeValue(string) {
        if (!string) return undefined;
        if (typeof string !== "string") return string;
        return string.split("-").map(numberValue);
    }

    function idValue(inp, string) {
        let id = numberValue(string);
        if (id === 0) return inp.eventId();
        else return id;
    }

}(MAC_ExplodeAndAbsorb);