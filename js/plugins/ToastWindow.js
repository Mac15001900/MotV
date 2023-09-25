function ToastWindow() {
    this.initialize.apply(this, arguments);
};

ToastWindow.prototype = Object.create(Window_Base.prototype);
ToastWindow.prototype.constructor = ToastWindow;


ToastWindow.prototype.initialize = function (x, y, width, height) {
    this.FADEOUT_START = 30; //How many frames will fading out last
    this.FADEIN_TIME = 15; //How many frames will fading in last
    this.BASIC_DURATION = 120; //How many frames will the toast last if not specified by caller (excluding fade in and out)
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.extraPadding = this.standardPadding();
    this.standardPadding = () => 0;
    this.updatePadding();
    this.centerColor = "rgba(0, 255, 255, 0.6)";
    this.edgeColor = "rgba(0, 255, 255, 0)";
    this.queue = []; //Remaining toasts to be displayed
    this.opacity = 0; //Opacity of the window (this will be kept at 0 to not show the default skin)
    this.contentsOpacity = 0; //Opacity of the window's contents
    this.framesLeft = -1; //For how many frames should we keep displaying this toast
    this.fadeInLeft = 0; //How many frames of fading in are left
}

ToastWindow.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    if (this.framesLeft > 0) this.framesLeft--;
    else return;

    if (this.fadeInLeft > 0) {
        this.contentsOpacity = 255 * (this.FADEIN_TIME - this.fadeInLeft) / this.FADEIN_TIME;
        this.fadeInLeft--;
    }

    if (this.framesLeft == 0) {
        this.contents.clear();
        this.contentsOpacity = 0;
        if (this.queue.length > 0) this.startToast(this.queue.shift());
        else this.framesLeft = -1;
    } else if (this.framesLeft < this.FADEOUT_START) {
        this.contentsOpacity = 255 * this.framesLeft / this.FADEOUT_START;
    }
}

ToastWindow.prototype.drawBackground = function (x, y, width, height) {
    //Basic linear gradient. Increases more sharply near the edges
    let grad1 = this.contents._context.createLinearGradient(0, 0, width, 0);
    grad1.addColorStop(0, "rgba(0, 255, 255, 0)");
    grad1.addColorStop(0.1, "rgba(0, 255, 255, 0.25)");
    grad1.addColorStop(0.5, "rgba(0, 255,  255, 0.8)");
    grad1.addColorStop(0.9, "rgba(0, 255, 255, 0.25)");
    grad1.addColorStop(1, "rgba(0, 255, 255, 0)");
    this.contents.fillRect(x, y, width, height, grad1);

    //Additional radial gradient, to make the texture slightly more interesting
    let grad2 = this.contents._context.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, height * 2);
    grad2.addColorStop(0, "rgba(0, 255, 255, 0.3)");
    grad2.addColorStop(0.5, "rgba(0, 255, 255, 0.15)");
    grad2.addColorStop(1, "rgba(0, 255, 255, 0)");
    this.contents.fillRect(x, y, width, height, grad2);
};

ToastWindow.prototype.enqueueToast = function (text, time = this.BASIC_DURATION, centerColor, edgeColor) {
    this.queue.push({
        text: text,
        time: time + this.FADEIN_TIME + this.FADEOUT_START,
        centerColor: centerColor,
        edgeColor: edgeColor
    });
    if (this.queue.length === 1 && this.framesLeft < 0) this.startToast(this.queue.shift());
}

ToastWindow.prototype.startToast = function (toast, instant = false) {
    this.centerColor = toast.centerColor || this.centerColor;
    this.edgeColor = toast.edgeColor || this.edgeColor;
    this.text = toast.text;
    this.framesLeft = toast.time;
    if (instant) {
        this.fadeInLeft = 0;
        this.contentsOpacity = 255;
    } else {
        this.fadeInLeft = this.FADEIN_TIME;
        this.contentsOpacity = 0;
    }

    this._width = this.textWidth(this.text) + 6 * this.extraPadding;
    let rows = (this.text.match(/\n/g) || []).length + 1;
    this._height = this.fittingHeight(rows) + this.textPadding() * rows + this.extraPadding;
    this.move((Graphics.width - this._width) / 2, this.y, this._width, this._height);
    this.contents = new Bitmap(this.contentsWidth(), this.contentsHeight());
    this._refreshAllParts();
    this.contents.clear();
    this.drawBackground(0, 0, this._width, this._height);
    this.drawTextEx(this.text, 3 * this.extraPadding, this.extraPadding / 2);
}

ToastWindow.prototype.skipToast = function () {
    if (this.framesLeft === -1) return;
    this.startToast(this.queue.shift(), true);
}

