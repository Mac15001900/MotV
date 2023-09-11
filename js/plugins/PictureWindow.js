function PictureWindow() {
    this.initialize.apply(this, arguments);
}

PictureWindow.prototype = Object.create(Window_Base.prototype);
PictureWindow.prototype.constructor = PictureWindow;

PictureWindow.prototype.initialize = function () {
    this.offsetX = 0;
    Window_Base.prototype.initialize.call(this, 0, 0, SceneManager._screenWidth, SceneManager._screenHeight);
}

g.showPictureWindow = function (imageName, independent = true, scale = 1) {
    g.pictureWindow.show(imageName, independent, scale);
}

g.hidePictureWindow = function () {
    /*if (g.pictureWindow) {
        g.pictureWindow.finish();
    }*/
    g.pictureWindow.finish();
}

//Creates a picture window, which works like the message window, only displaying an image. Can also exist alongside messages.
PictureWindow.prototype.show = function (imageName, independent = true, scale = 1) {
    if (this.isOpen()) this.finish();
    this.independent = independent;
    let bmp = ImageManager.loadPicture(imageName);
    if (independent) g.getInterpreter().setWaitMode('indefinite');
    bmp.addLoadListener(function () {
        let w = scale * bmp.width + 36;
        let h = scale * bmp.height + 36 + (independent ? 4 : 0); //If independent, add 4 pixels for the pause sign
        let fullWidth = SceneManager._screenWidth;
        let fullHeight = independent ? SceneManager._screenHeight : SceneManager._screenHeight - WINDOW_MESSAGE_HEIGHT;
        this.offsetX = 0;
        this.move((fullWidth - w) / 2, (fullHeight - h) / 2, w, h);
        this.adjustX();
        this.onPreviousPress = Input.isPressed('ok') || Input.isPressed('cancel') || TouchInput.isPressed();

        this.openness = 0;
        this.open();
        this.pause = independent; //This just displays the pause sign (small triangle at the bottom)
        SceneManager._scene.addWindow(this);

        this.contents.blt(bmp, 0, 0, bmp.width, bmp.height, 0, 0, scale * bmp.width, scale * bmp.height);
        console.log(this);
    }.bind(this));
}

PictureWindow.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    if (!this.isOpen()) return;
    if (this.independent) {
        if (Input.isPressed('ok') || Input.isPressed('cancel') || TouchInput.isPressed()) {
            if (this.onPreviousPress) return; //We're still on the keypress from last event
            this.finish();
        } else {
            this.onPreviousPress = false;
        }
    }
}

PictureWindow.prototype.finish = function () {
    Input.update();
    this.contents.clear();
    this.close();
    SceneManager._scene.removeChild(this);
    if (this.independent) g.getInterpreter().setWaitMode('');
    //g.pictureWindow = null;
}

//Adjusts X position based on the choice window
PictureWindow.prototype.adjustX = function () {
    let cw = SceneManager._scene._windowLayer.children[2];
    console.assert(cw instanceof Window_ChoiceList);
    this.recenter();
    //debugger;
    if (cw.ready && SceneManager._screenWidth - cw.width / 2 - 4) {
        this.x -= cw.width / 2;
        this.offsetX = -cw.width / 2;
    }
}

PictureWindow.prototype.recenter = function () {
    if (this.offsetX) {
        this.x -= this.offsetX;
        this.offsetX = 0;
    }
}

g.nudgePictureWindow = function (dx) {
    //Check if it overlaps the choice window
    let win = g.pictureWindow;
    if (!win) return;
    if (win.x + win.width >= SceneManager._screenWidth - dx - 4) {
        g.pictureWindow.nudge = dx / 2;
        g.pictureWindow.x -= dx / 2;
    }
}

g.unNudgePictureWindow = function () {
    if (g.pictureWindow) g.pictureWindow.x += g.pictureWindow.nudge;
    g.pictureWindow.nudge = 0;
}

Window_ChoiceList.prototype.close = function () {
    Window_Base.prototype.close.call(this);
    this.ready = false;
    g.pictureWindow.recenter(); //TODO: check next event, don't recenter if it's also a choice
}
//There's also a modification in Window_ChoiceList.prototype.start