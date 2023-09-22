function ToastWindow() {
    this.initialize.apply(this, arguments);
};

ToastWindow.prototype = Object.create(Window_Base.prototype);
ToastWindow.prototype.constructor = ToastWindow;


ToastWindow.prototype.initialize = function (x, y, width, height) {
    height = height || this.fittingHeight(1);
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.centerColor = rgba(0, 255, 0, 0.8);
    this.edgeColor = rgba(0, 255, 0, 0.2);
    this.queue = []; //Remaining toasts to be displayed
    this.opacity = 0; //Opacity of the window (this will be kept at 0 to not show the default skin)
    this.contentsOpacity = 0; //Opacity of the window's contents
    this.framesLeft = -1; //For how many frames should we keep displaying this toast
}

ToastWindow.prototype.update = function () {
    Window_Base.prototype.update.call(this);

}

ToastWindow.prototype.drawBackground = function (x, y, width, height) {
    this.contents.gradientFillRect(x, y, width / 2, height, this.edgeColor, this.centerColor);
    this.contents.gradientFillRect(x + width / 2, y, width / 2, height, this.centerColor, this.edgeColor);
};

ToastWindow.prototype.enqueueToast = function (text, time, centerColor, edgeColor) {
    this.queue.push({
        text: text,
        time: time,
        centerColor: centerColor,
        edgeColor: edgeColor
    });
    if (this.queue.length == 1) this.startToast(this.queue[0]);
}

ToastWindow.prototype.startToast = function (toast) {
    this.centerColor = toast.centerColor;
    this.edgeColor = toast.edgeColor;
    this.text = toast.text;
    this.framesLeft = toast.time;
    this.contentsOpacity = 255;

    this._width = this.textWidth(this.text) + 2 * this.standardPadding();
    this._refreshAllParts();
    this.move((Graphics.width - this._width) / 2, this.y, this._width, this._height);
    this.drawBackground(0, 0, this._width, this._height);
    this.drawTextEx()

}


