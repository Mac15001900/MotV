/*:
 * @plugindesc Adds an effect with resources that explode out and are then collected
 * @author Mac15001900, comissioned by TheAM-Dol
 * 
 * @help
 * 
 */


// import { * as PIXI } from 'pixi.js'
let rawParams = PluginManager.parameters('MAC_ExplodeAndAbsorb');

let $ = {};
$.effects = [];
$.lastMapId = null;

let defaultConfig = {
    //The default configuration for particles
    timing: {
        0: 30,
        1: 60,
        2: 30,
        3: 60,
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
    chaseAcceleration: 0.02,
    absordRange: 0.5,
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

let idleConfig = {
    //The default configuration for particles
    timing: {
        0: 30,
        1: 600000,
        2: 30,
        3: 60,
        4: 5,
    },
    explodeTimeVariance: 0.5,
    idleTimeVariance: 0.33,
    speed: {
        1: 90,
        2: 10,
    },
    minDistance: 5,
    maxDistance: 10,
    idleAmplitude: 0.5,
    chaseAcceleration: 0.02,
    absordRange: 0.5,
}

const BACK_EASE_OUT_PEAK = 0.58
const BACK_EASE_FRACTION = 0.629846;
const BACK_EASE_DERIVATIVE = 1.07173;

//----------------------------------------------------
//---------------- Particle container ----------------
//----------------------------------------------------

class ResourceEmitter extends PIXI.particles.ParticleContainer {
    constructor(amount, icon, origin, target, config = defaultConfig) {
        super(amount + 32, { vertices: amount <= 1000, position: true, tint: true });
        this.config = config;
        this.target = target;
        this.framesToRender = -1;
        this.createParticles(icon, amount, origin);
        $.effects.push(this);
    }

    createParticles(icon, amount, origin) {
        let bitmap = ImageManager.loadSystem('IconSet');
        for (let i = 0; i < amount; i++) {
            this.addChild(new Sprite_ResourceP(icon, origin, bitmap, this.config));
        }
        this.framesToRender = 2;
    }

    update() {
        this.targetPosition = getEventPosition(this.target);
        this.children.forEach(c => c.update());
        this.framesToRender--;
        if (this.framesToRender === 0) {
            this.children.forEach(c => c.start());
        }
    }

    getTargetPosition() {
        return this.targetPosition;
    }

    terminate() {
        $.effects.splice($.effects.indexOf(this), 1);
        this.children.forEach(c => c.destroy());
        this.destroy();
    }
}

/*
void ((alias) => {
    Scene_Map.prototype.stop = function () {
        // if (!SceneManager.isNextScene(Scene_Menu)) this.children.forEach(c => { if (c instanceof ResourceEmitter) c.terminate(); });
        console.log("scene stopped");
        alias.call(this);
    }
})(Scene_Map.prototype.stop);*/

void ((alias) => {
    Scene_Map.prototype.onMapLoaded = function () {
        alias.call(this);
        if ($.lastMapId === $gameMap.mapId()) {
            $.effects.forEach(e => this.addChild(e));
        } else {
            while ($.effects.length > 0) $.effects.shift().terminate();
        }
        $.lastMapId = $gameMap.mapId();
    }
})(Scene_Map.prototype.onMapLoaded);

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
    this.shown = false;
    this.opacity = 0;
    this.contentsOpacity = 0;
    this.currentValue = 0;
    this.basicColor = `rgba(${r}, ${g}, ${b}, `;

    //Calculate proper width
    this._width = this.textWidth(this.signChar + Array((String(maxValue)).length).fill('0').join('')) + 2 * this.extraPadding;
    this._height = this.fittingHeight(1) + this.textPadding() + this.extraPadding;
    this.contents = new Bitmap(this.contentsWidth(), this.contentsHeight());
}

Window_ResourceCounter.prototype.show = function () {
    this.shown = true;
}

Window_ResourceCounter.prototype.hide = function () {
    this.shown = false;
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
    grad1.addColorStop(0.1, this._makeColor(0.25));
    grad1.addColorStop(0.5, this._makeColor(0.8));
    grad1.addColorStop(0.9, this._makeColor(0.25));
    grad1.addColorStop(1, this._makeColor(0));
    this.contents.fillRect(x, y, width, height, grad1);

    //Additional radial gradient, to make the texture slightly more interesting
    let grad2 = this.contents._context.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, height * 2);
    grad2.addColorStop(0, this._makeColor(0.3));
    grad2.addColorStop(0.5, this._makeColor(0.15));
    grad2.addColorStop(1, this._makeColor(0));
    this.contents.fillRect(x, y, width, height, grad2);
}

Window_ResourceCounter.prototype._makeColor = function (transparency) {
    return this.basicColor + transparency + ")";
}

Window_ResourceCounter.prototype.increment = function (value = 1) {
    this.currentValue += value;
}

Window_ResourceCounter.prototype.update = function () {
    if (this.shown && this.contentsOpacity < 255) this.contentsOpacity += 50;
    if (!this.shown && this.contentsOpacity > 0) this.contentsOpacity -= 50;

    if (this.contentsOpacity > 0) {
        let targetPos = worldToScreen(getEventPosition(this.target));
        this.refresh();
        this.x = targetPos[0] + $gameMap.tileWidth();
        this.y = targetPos[1] - this._height / 2 //+ $gameMap.tileWidth() / 2;
    }
}





//----------------------------------------------------
//----------------- Particle sprite ------------------
//----------------------------------------------------


function Sprite_ResourceP() {
    this.initialize.apply(this, arguments);
}

Sprite_ResourceP.prototype = Object.create(Sprite.prototype);
Sprite_ResourceP.prototype.constructor = Sprite_ResourceP;

Sprite_ResourceP.prototype.initialize = function (iconIndex, origin, bitmap, config = defaultConfig) {
    Sprite.prototype.initialize.call(this);
    this.iconIndex = iconIndex;
    this.config = config;
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

    let direction = Math.random() * Math.PI * 2;
    let distance = this.config.minDistance + Math.random() * (this.config.maxDistance - this.config.minDistance)
    this.targetPos = [];
    this.targetPos[0] = this.startPos[0] + Math.cos(direction) * distance;
    this.targetPos[1] = this.startPos[1] + Math.sin(direction) * distance;
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
    //Setting up side-fumbling
    //Sine to implement: (1/(1+(x-0.5)/2)) * sin((x-0.15)*4)/10+1
    this.sideFumblingPeriod = 2 * Math.PI * ((this.animationEnd - this.animationStart) / BACK_EASE_OUT_PEAK) / 4;
    let amplitude = distanceBetween(this.startPos, this.targetPos) / 10;
    let directionVector = [this.startPos[0] - this.targetPos[0], this.startPos[1] - this.targetPos[1]];
    //Normalise the vector and multiply by amplitude
    // amplitude = 0; //TEMP
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
    let speed = this.config.speed[AnimationStage.IDLE];
    let offsetProgress = ((this.frameCount - this.idleStartFrame) % speed) / speed; //At what point in time is the animation (from 0 to 1)
    let smoothProgress = (Math.sin(offsetProgress * Math.PI * 2)) / 2; //Vertical position in the animation, from 0 to 1
    this.worldPos[0] = this.startPos[0]
    this.worldPos[1] = this.startPos[1] - (this.targetPos[1] - this.startPos[1]) * smoothProgress;

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
    this.targetPos = this.parent.getTargetPosition();
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
        // this.setupDone();
    }
}

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
    this.scaling = 1 - progress;
}

Sprite_ResourceP.prototype.setupDone = function () {
    this.isDone = true;
    this.destroy();
}

//Utility functions

/**
 * 
 * @param {Number} event Event id, or -1 for the player
 * @returns The position of a given event's center, in tiles
 */
function getEventPosition(event) {
    if (event === -1) return [$gamePlayer._realX + 0.5, $gamePlayer._realY + 0.5];
    else {
        let e = $gameMap.event(event);
        return [e._realX + 0.5, e._realY + 0.5];
    }
}

function worldToScreen(pos) {
    let tw = $gameMap.tileWidth();
    if ($gameScreen._zoomScale !== 1) {
        let scale = $gameScreen._zoomScale;
        let screenWidthInTiles = Graphics.boxWidth / tw;
        let screenHeightInTiles = Graphics.boxHeight / tw;
        let screenCenterX = $gameMap._displayX + screenWidthInTiles / 2; //The tile coordinates of the screen center
        let screenCenterY = $gameMap._displayY + screenHeightInTiles / 2;
        let dx = screenCenterX - pos[0];
        let dy = screenCenterY - pos[1];
        return [Math.round(Graphics.boxWidth / 2 - dx * scale * tw), Math.round(Graphics.boxHeight / 2 - dy * scale * tw)];
    } else {
        return [Math.round($gameMap.adjustX(pos[0]) * tw), Math.round($gameMap.adjustY(pos[1]) * tw)];
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

//Easing functions, powered by https://easings.net

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