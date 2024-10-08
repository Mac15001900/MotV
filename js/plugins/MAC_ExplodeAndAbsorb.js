/*:
 * @plugindesc Adds an effect with resources that explode out and are then collected
 * @author Mac15001900, comissioned by TheAM-Dol
 * 
 * @help
 * 
 */


// import { * as PIXI } from 'pixi.js'
let rawParams = PluginManager.parameters('MAC_ExplodeAndAbsorb');

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
    minDistance: 5,
    maxDistance: 10,
    idleAmplitude: 0.5,
    chaseAcceleration: 0.02,
    absordRange: 0.5,
}

const AnimationStage = {
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

const BACK_EASE_FRACTION = 0.629846;
const BACK_EASE_DERIVATIVE = 1.07173;

//----------------------------------------------------
//---------------- Particle container ----------------
//----------------------------------------------------

class ResourceEmitter extends PIXI.ParticleContainer {
    constructor(amount, icon, origin, target, config = defaultConfig) {
        super(amount + 32, { vertices: true, position: true, tint: true });
        this.config = config;
        this.target = target;
        this.createParticles(icon, amount, origin);
    }

    createParticles(icon, amount, origin) {
        for (let i = 0; i < amount; i++) {
            this.addChild(new Sprite_ResourceP(icon, origin, this.config));
        }
    }

    update() {
        this.targetPosition = getEventPosition(this.target);
        this.children.forEach(c => c.update());
    }

    getTargetPosition() {
        return this.targetPosition;
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

Sprite_ResourceP.prototype.initialize = function (iconIndex, origin, config = defaultConfig) {
    Sprite.prototype.initialize.call(this);
    this.iconIndex = iconIndex;
    this.config = config;
    this.initMembers(origin);
    this.loadBitmap();
    this.setupExplode();
};

Sprite_ResourceP._iconWidth = 32;
Sprite_ResourceP._iconHeight = 32;

Sprite_ResourceP.prototype.initMembers = function (origin) {
    this.stage = AnimationStage.EXPLODE;
    this.animationStart = Date.now();
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.worldPos = getEventPosition(origin);
    this.startPos = [...this.worldPos];
    [this.x, this.y] = worldToScreen(this.worldX, this.worldY);
    this.isDone = false;
    this.scaling = 1;
    this.lastScaling = 1;
};

Sprite_ResourceP.prototype.loadBitmap = function () {
    this.bitmap = ImageManager.loadSystem('IconSet');
    this.setFrame(0, 0, 0, 0);
    this.updateFrame();
};

Sprite_ResourceP.prototype.setup = function () { //Not yet sure if this function is required
};

Sprite_ResourceP.prototype.update = function () {
    Sprite.prototype.update.call(this);
    switch (this.stage) {
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

    if (Graphics.frameCount >= this.animationEnd) {
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

    [this.x, this.y] = worldToScreen(...this.worldPos);
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


//Animation logic

//----- Exploding -----
Sprite_ResourceP.prototype.setupExplode = function () {
    this.stage = AnimationStage.EXPLODE;
    this.animationStart = Graphics.frameCount;
    let explosionTime = Math.floor(this.config.timing[AnimationStage.EXPLODE] * (1 + Math.random() * this.config.explodeTimeVariance * 2 - this.config.explodeTimeVariance));
    this.animationEnd = this.animationStart + explosionTime;

    let direction = Math.random() * Math.PI * 2;
    let distance = this.config.minDistance + Math.random() * (this.config.maxDistance - this.config.minDistance)
    this.targetPos = [];
    this.targetPos[0] = this.startPos[0] + Math.cos(direction) * distance;
    this.targetPos[1] = this.startPos[1] + Math.sin(direction) * distance;
};

Sprite_ResourceP.prototype.updateExplode = function () {
    let progress = (Graphics.frameCount - this.animationStart) / (this.animationEnd - this.animationStart);
    if (progress >= 1) {
        this.worldPos = [...this.targetPos];
    } else {
        this.worldPos = posBetween(this.startPos, this.targetPos, easeOutBack(progress));
    }
};

//----- Idling -----
Sprite_ResourceP.prototype.setupIdle = function () {
    this.stage = AnimationStage.IDLE;
    this.animationStart = Graphics.frameCount;
    let idleTime = Math.floor(this.config.timing[AnimationStage.IDLE] * (1 + Math.random() * this.config.idleTimeVariance * 2 - this.config.idleTimeVariance));
    this.animationEnd = this.animationStart + this.config.timing[AnimationStage.IDLE];
    this.idleStartFrame = Graphics.frameCount % this.config.speed[AnimationStage.IDLE];
    this.startPos = [...this.worldPos];
    this.targetPos = [this.startPos[0], this.startPos[1] + this.config.idleAmplitude];
};

Sprite_ResourceP.prototype.updateIdle = function () {
    let speed = this.config.speed[AnimationStage.IDLE];
    let offsetProgress = ((Graphics.frameCount - this.idleStartFrame) % speed) / speed; //At what point in time is the animation (from 0 to 1)
    let smoothProgress = (Math.sin(offsetProgress * Math.PI * 2)) / 2; //Vertical position in the animation, from 0 to 1
    this.worldPos[1] = this.startPos[1] - (this.targetPos[1] - this.startPos[1]) * smoothProgress;
}

//----- Ease for chasing -----

Sprite_ResourceP.prototype.setupEaseForChase = function () {
    this.stage = AnimationStage.EASE_FOR_CHASE;
    this.animationStart = Graphics.frameCount;
    this.animationEnd = this.animationStart + this.config.timing[AnimationStage.EASE_FOR_CHASE];
    this.startPos = [...this.worldPos];
    this.targetPos = this.parent.getTargetPosition();
};

Sprite_ResourceP.prototype.updateEaseForChase = function () {
    let progress = (Graphics.frameCount - this.animationStart) / (this.animationEnd - this.animationStart);
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


    // let velX = BACK_EASE_DERIVATIVE * (this.targetPos[0] - this.startPos[0]) / time;
    // let velY = BACK_EASE_DERIVATIVE * (this.targetPos[1] - this.startPos[1]) / time;

    this.animationStart = Graphics.frameCount;
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

    if (sDistance < Math.pow(this.config.absordRange, 2) && this.stage === AnimationStage.CHASE) {
        this.setupFade();
        // this.setupDone();
    }
}

//----- Fading -----
Sprite_ResourceP.prototype.setupFade = function () {
    this.stage = AnimationStage.FADE;
    this.animationStart = Graphics.frameCount;
    this.animationEnd = this.animationStart + this.config.timing[AnimationStage.FADE];
};

Sprite_ResourceP.prototype.updateFade = function () {
    // this.worldPos = [...this.parent.getTargetPosition()];
    // this.updateChase();
    let progress = (Graphics.frameCount - this.animationStart) / (this.animationEnd - this.animationStart);
    // this.opacity = 255 * (1 - progress);
    this.scaling = 1 - progress;
}

Sprite_ResourceP.prototype.setupDone = function () {
    this.isDone = true;
    this.destroy();
}

//Utility functions

function getEventPosition(event) {
    if (event === -1) return [$gamePlayer._realX, $gamePlayer._realY];
    else {
        let e = $gameMap.event(event);
        return [e._realX, e._realY];
    }
}

function worldToScreen(x, y) { //TODO account for zooming
    let tw = $gameMap.tileWidth();
    return [Math.round($gameMap.adjustX(x) * tw + tw / 2), Math.round($gameMap.adjustY(y) * tw + tw / 2)];
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

//Easing functions, powered by https://easings.net
function easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

//Return 0 for x=0 and x = 85079/135079 (0.629846). Derivative at that point is 1.07173
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