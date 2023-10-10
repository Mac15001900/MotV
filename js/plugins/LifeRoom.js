//Modifying Game_Player to be a bit more responsive. This change allows for an action to get queued up while moving.
//It's a marginal improvement overall, but a huge one for the life room
Game_Player.prototype.triggerButtonAction = function () {
    if (Input.isTriggered('ok') || this.actionQueued) {
        this.actionQueued = false;
        if (this.getOnOffVehicle()) {
            return true;
        }
        this.checkEventTriggerHere([0]);
        if ($gameMap.setupStartingEvent()) {
            return true;
        }
        this.checkEventTriggerThere([0, 1, 2]);
        if ($gameMap.setupStartingEvent()) {
            return true;
        }
    }
    return false;
};

Game_Player.prototype.update = function (sceneActive) {
    var lastScrolledX = this.scrolledX();
    var lastScrolledY = this.scrolledY();
    var wasMoving = this.isMoving();
    if (wasMoving && Input.isPressed('ok')) this.actionQueued = true; //This is the only line changed here
    this.updateDashing();
    if (sceneActive) {
        this.moveByInput();
    }
    Game_Character.prototype.update.call(this);
    if ($gs[142] || true) this.updateScroll(lastScrolledX, lastScrolledY);
    this.updateVehicle();
    if (!this.isMoving()) {
        this.updateNonmoving(wasMoving);
    }
    this._followers.update();
};

//Starting map events on the floor ignores 'through' events; 'below characters' and 'through' events are effectively not triggerable with the action button
Game_Player.prototype.startMapEvent = function (x, y, triggers, normal) {
    if (!$gameMap.isEventRunning()) {
        $gameMap.eventsXy(x, y).forEach(function (event) {
            if (event.isTriggerIn(triggers) && event.isNormalPriority() === normal && (normal || !event.isThrough())) {
                event.start();
            }
        });
    }
};

// Board manager, responsible for all the cellular automata logic
function BoardManager() {
    this.initialize.apply(this, arguments);
}

BoardManager.prototype.constructor = BoardManager;

BoardManager.prototype.initialize = function (x, y, width, height, firstId) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.firstId = firstId;
    this.values = [];
    this.newValues = [];
    for (let i = 0; i < this.height; i++) {
        this.values.push(new Array(this.width).fill(false));
        this.newValues.push(new Array(this.width).fill(false));
    }
}

BoardManager.prototype.setCell = function (x, y, value) {
    this.values[y][x] = value;
}

BoardManager.prototype.setCellFromEvent = function (event, value) {
    this.setCell(event.x - this.x, event.y - this.y, value);
}

BoardManager.prototype.updateObjects = function () {
    if (!this.firstId) return; //In that case this is a virtual baord, not tied to events
    let mapId = $gameMap.mapId();
    for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            $gameSelfSwitches.setValue(mapId + "," + (y * this.width + x + this.firstId) + ",A", this.values[y][x]);
        }
    }
}

BoardManager.prototype.runStep = function (amount = 1) {
    if (amount > 1) {
        let changed = 0;
        for (let i = 0; i < amount; i++) {
            changed += this.runStep(1);
        }
        return changed;
    }
    for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            this.newValues[y][x] = this.getNeighbours(x, y) % 2 === 1;
        }
    }
    let changed = 0;
    for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            if (this.newValues[y][x] !== this.values[y][x]) changed++;
            this.values[y][x] = this.newValues[y][x];
        }
    }
    this.updateObjects();
    return changed;
}

BoardManager.prototype.getNeighbours = function (x, y) {
    let neighbours = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            if (this.values[y + j] && this.values[y + j][x + i]) neighbours++;
        }
    }
    return neighbours;
}

BoardManager.prototype.resetValues = function () {
    for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            this.values[y][x] = false;
        }
    }
    this.updateObjects();
}

//Testing functions - not used in the game, but useful for setting puzzles

BoardManager.prototype.print = function () {
    res = "";
    for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            res += this.values[y][x] ? "X" : ".";
        }
        res += "\n";
    }
    console.log(res);
}

BoardManager.prototype.anyEdgesOn = function () {
    for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            if (this.values[y][x] && (x === 0 || x === this.width - 1 || y === 0 || y === this.height - 1)) return true;
        }
    }
    return false;
}

BoardManager.prototype.setCells = function (list) {
    for (let i = 0; i < list.length; i++) {
        this.setCell(list[i][0], list[i][1], true);
    }
}

BoardManager.prototype.countCells = function () {
    let count = 0;
    for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            if (this.values[y][x]) count++;
        }
    }
    return count;
}