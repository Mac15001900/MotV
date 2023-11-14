function ToastWindow() {
    this.initialize.apply(this, arguments);
};

ToastWindow.prototype = Object.create(Window_Base.prototype);
ToastWindow.prototype.constructor = ToastWindow;

/**
 * 
 * @param {String|Object|Array<Number>|Number} position The position to display the window. Can be an object with x and y properties, an [x,y] array, an eventId, "player", or a string denoting a dynamic position, e.g. "top-right". 
 * Vertical parameters available: "top, middle, bottom, message" (message displays the toast just above the message window)
 * Horizontal parameters available: "left, middle, right".
 * @param {Number} [r] Red value of the default color. 0-255
 * @param {Number} [g] Green value of the default color. 0-255
 * @param {Number} [b] Blue value of the default color. 0-255
 */
ToastWindow.prototype.initialize = function (position, r = 0, g = 255, b = 255) {
    this.FADEOUT_START = 30; //How many frames will fading out last
    this.FADEIN_TIME = 15; //How many frames will fading in last
    this.BASIC_DURATION = 120; //How many frames will the toast last if not specified by the caller (excluding fading in and out)
    this.SCALE = $gameMap.zoom?.y ?? 1; //How much zoom do we have

    let x = 0
    let y = 0;
    this.positionType = "static";
    this.isDynamic = false; //Whether the position will change while displaying the toast
    if (typeof (position) === "number") {
        this.positionType = "event";
        this.targetEvent = $gameMap.event(position);
        this.isDynamic = true;
    } else if (position.x !== undefined && position.y !== undefined) {
        x = position.x;
        y = position.y;
    } else if (position.length === 2) {
        x = position[0];
        y = position[1];
    } else {
        this.positionType = position;
        if (position === "player") this.isDynamic = true;
    }

    Window_Base.prototype.initialize.call(this, x, y, 0, 0); //Width and height will be redone for each message

    //Remove basic padding to make positioning math simpler (the contents now fill the whole window)
    this.extraPadding = this.standardPadding();
    this.standardPadding = () => 0;
    this.updatePadding();

    this.baseColor = `rgba(${r}, ${g}, ${b}, `; //Default color base; the transparency will be appended to it
    this.queue = []; //Remaining toasts to be displayed
    this.opacity = 0; //Opacity of the window (this will be kept at 0 to not show the default skin)
    this.contentsOpacity = 0; //Opacity of the window's contents
    this.framesLeft = -1; //For how many frames should we keep displaying this toast
    this.fadeInLeft = 0; //How many frames of fading in are left
    this.closeListeners = []; //Listeners to be called whenever the window runs out of toasts
}

ToastWindow.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    if (this.framesLeft > 0) this.framesLeft--;
    else return;

    if (this.fadeInLeft > 0) {
        this.contentsOpacity = 255 * (this.FADEIN_TIME - this.fadeInLeft) / this.FADEIN_TIME;
        this.fadeInLeft--;
    }

    if (this.framesLeft === 0) {
        this.contents.clear();
        this.contentsOpacity = 0;
        if (this.queue.length > 0) this.startToast(this.queue.shift());
        else {
            this.framesLeft = -1;
            for (let listener of this.closeListeners) listener(this);
        }
    } else if (this.framesLeft < this.FADEOUT_START) {
        this.contentsOpacity = 255 * this.framesLeft / this.FADEOUT_START;
    }

    if (this.isDynamic) this.updatePosition();
}


ToastWindow.prototype.drawBackground = function (x, y, width, height) {
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
};
/**
 * Adds another toast to the queue to be displayed.
 * @param {String} text Text to display
 * @param {Number} [time] How many frames the toast should last, excluding fading in and out
 * @param {Number} [r] Red value of the background color. 0-255
 * @param {Number} [g] Green value of the background color. 0-255
 * @param {Number} [b] Blue value of the background color. 0-255
 */
ToastWindow.prototype.enqueueToast = function (text, time = this.BASIC_DURATION, r, g, b) {
    this.queue.push({
        text: text,
        time: time + this.FADEIN_TIME + this.FADEOUT_START,
        color: r === undefined ? this.baseColor : `rgba(${r}, ${g}, ${b}, `,
    });
    if (this.queue.length === 1 && this.framesLeft < 0) this.startToast(this.queue.shift());
}

ToastWindow.prototype.startToast = function (toast, instant = false) {
    this.toastColor = toast.color;
    this.text = toast.text;
    this.framesLeft = toast.time;
    if (instant) {
        this.fadeInLeft = 0;
        this.contentsOpacity = 255;
    } else {
        this.fadeInLeft = this.FADEIN_TIME;
        this.contentsOpacity = 0;
    }

    //Width and height calculations
    let lines = this.text.split("\n");
    this._width = 0;
    for (let i = 0; i < lines.length; i++) {
        this._width = Math.max(this._width, this.textWidth(g.simpleUnescape(lines[i])) + 6 * this.extraPadding);
    }
    let rows = lines.length;
    this._height = this.fittingHeight(rows) + this.textPadding() * rows + this.extraPadding;

    //Position calculations
    let outsidePadding = this.extraPadding;
    if (this.positionType.contains('-')) {
        let positionTypeX = this.positionType.split("-")[1];
        let positionTypeY = this.positionType.split("-")[0];
        switch (positionTypeX) {
            case "left":
                this.x = outsidePadding;
                break;
            case "middle":
                this.x = Graphics.width / 2 - this._width / 2;
                break;
            case "right":
                this.x = Graphics.width - this._width - outsidePadding;
        }
        switch (positionTypeY) {
            case "top":
                this.y = outsidePadding;
                break;
            case "middle":
                this.y = Graphics.height / 2 - this._height / 2;
                break;
            case "bottom":
                this.y = Graphics.height - this._height - outsidePadding;
                break;
            case "message":
                this.y = Graphics.height - SceneManager._scene._messageWindow.height - this._height - outsidePadding;
        }
    } else {
        this.updatePosition();
    }

    //Move the window, refresh the contents, create the new display
    this.move(this.x, this.y, this._width, this._height);
    this.contents = new Bitmap(this.contentsWidth(), this.contentsHeight());
    this._refreshAllParts();
    this.contents.clear();
    this.drawBackground(0, 0, this._width, this._height);
    this.drawTextEx(this.text, 3 * this.extraPadding, this.extraPadding / 2);
}

//Skip the current toast and immidiately display the next one in the queue (without fading)
ToastWindow.prototype.skipToast = function () {
    if (this.framesLeft === -1) return;
    this.startToast(this.queue.shift(), true);
}

ToastWindow.prototype.addListener = function (listener) {
    this.closeListeners.push(listener);
}

ToastWindow.prototype.hasActiveToast = function () {
    return this.framesLeft >= 0;
}

ToastWindow.prototype.hasToastWithText = function (text) {
    return this.text === text || this.queue.some(toast => toast.text === text);
}

ToastWindow.prototype._makeColor = function (transparency) {
    return this.toastColor + transparency + ")";
}

ToastWindow.prototype._isInBounds = function (x, y) {
    return x >= 0 && x <= Graphics.width - this.width && y >= 0 && y < Graphics.height - this.height;
}

ToastWindow.prototype.updatePosition = function () {
    let event = this.positionType === "player" ? $gamePlayer : this.targetEvent;
    this.x = event.screenX() * this.SCALE - this.width / 2;
    this.y = event.screenY() * this.SCALE - this.height - 32 * this.SCALE - this.extraPadding;
}