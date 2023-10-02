/*Game_Player.prototype.moveByInput = function () {
    if (!this.isMoving() && this.canMove()) {
        if (this.actionQueued) {
            // this.actionQueued = false;
            if (this.triggerAction(true)) {
                console.log("Action triggered");
                return;
            }
        }
        var direction = this.getInputDirection();
        if (direction > 0) {
            $gameTemp.clearDestination();
        } else if ($gameTemp.isDestinationValid()) {
            var x = $gameTemp.destinationX();
            var y = $gameTemp.destinationY();
            direction = this.findDirectionTo(x, y);
        }
        if (direction > 0) {
            this.executeMove(direction);
        }
    }
};*/

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
    if (wasMoving && Input.isPressed('ok')) this.actionQueued = true;
    this.updateDashing();
    if (sceneActive) {
        this.moveByInput();
    }
    Game_Character.prototype.update.call(this);
    this.updateScroll(lastScrolledX, lastScrolledY);
    this.updateVehicle();
    if (!this.isMoving()) {
        this.updateNonmoving(wasMoving);
    }
    this._followers.update();
};


function BoardManager() {
    this.initialize.apply(this, arguments);
}

BoardManager.prototype.constructor = BoardManager;

BoardManager.prototype.initialize = function (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.values = [];
    for (let i = 0; i < this.height; i++) {
        this.push(new Array(this.width).fill(false));
    }
}

BoardManager.prototype.setCell = function (x, y, value) {
    this.values[y][x] = value;
}

BoardManager.prototype.setCellFromEvent = function (event, value) {
    this.setCell(event.x - this.x, event.y - this.y, value);
}

BoardManager.prototype.updateObjects = function () {
    let mapId = $gameMap.mapId();
    for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
            $gameSelfSwitches.setValue(mapId + "," + (i * this.width + j) + ",A", this.values[i][j]);
        }
    }
}

BoardManager.prototype.runStep = function () {
    for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
            this.values[i][j] = this.getNeighbours(j, i) % 2 == 1;
        }
    }
}

BoardManager.prototype.getNeighbours = function (x, y) {
    let neighbours = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) continue;
            if (this.values[y + j][x + i]) neighbours++;
        }
    }
    return neighbours;
}