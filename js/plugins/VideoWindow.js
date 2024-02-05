//=============================================================================
// VideoWindow.js
//=============================================================================

/*:
 * @plugindesc Adds a VideoWindow for displaying non-fullscreen videos nicely
 * @author Mac15001900
 *
 * @help Use g.showVideoWindow(filename, independent, loop, scale) to show the window.
 * Independent decides whether it exists on its own (and blocks the interpreter)
 * or as part of a message. If the latter, close it with g.hideVideoWindow().
 */

function VideoWindow() {
    this.initialize.apply(this, arguments);
}

VideoWindow.prototype = Object.create(Window_Base.prototype);
VideoWindow.prototype.constructor = VideoWindow;
VideoWindow.prototype.initialize = function () {
    Window_Base.prototype.initialize.call(this, 0, 0, SceneManager._screenWidth, SceneManager._screenHeight);
}

g.showVideoWindow = function (filename, independent = true, loop = true, scale = 1) {
    g.videoWindow.show(filename, independent, loop, scale);
}

g.hideVideoWindow = function () {
    g.videoWindow.finish();
}

VideoWindow.prototype.show = function (filename, independent = true, loop = true, scale = 1) { //TODO refactor to use setIndependent
    if (this.isOpen()) this.finish();
    const DIMENSIONS = { "seal-reversed.webm": [640, 360], "testVideo.webm": [1920, 937], "loading.webm": [200, 200] }; //This is rather hacky, but much simpler than waiting until a file is loaded to know what its dimentions will be
    this.independent = independent;
    this.loop = loop;

    let video = document.createElement('video');
    video.src = 'movies/' + filename;
    video.loop = loop;
    video.autoplay = true;
    if (DIMENSIONS[filename]) {
        video.width = DIMENSIONS[filename][0] * scale;
        video.height = DIMENSIONS[filename][1] * scale;
        this.width = video.width + this.standardPadding() * 2;
        this.height = video.height + this.standardPadding() * 2;
        this.x = Graphics.boxWidth / 2 - this.width / 2;
        this.y = (Graphics.boxHeight - (independent ? 0 : SceneManager._scene._messageWindow.height)) / 2 - this.height / 2;
        if (this.y < 0 || this.x < 0) console.warn("The video doesn't fit on screen. Consider using a smaller scale.");
    } else {
        console.warn("No dimensions found for " + filename + " in VideoWindow.js");
    }
    video.style.zIndex = 3
    video.style.display = 'none'; //Start with the video hidden
    video.setAttribute('playsinline', '');
    Graphics._centerElement(video);
    if (!independent) video.style.marginTop = ((this.y + this.standardPadding()) * Graphics._realScale + Graphics._canvas.offsetTop) + "px";
    makeVideoPlayableInline(video);
    document.body.appendChild(video);
    this.video = video;

    //Block the interpreter if independent
    if (independent) g.getInterpreter().setWaitMode('indefinite');

    this.lastScale = Graphics._realScale;
    this.lastOffset = Graphics._canvas.offsetTop;
    this.onPreviousPress = Input.isPressed('ok') || Input.isPressed('cancel') || TouchInput.isPressed();

    //Open the back window
    this.openness = 0;
    this.pause = independent;
    this.open();
    SceneManager._scene.addWindow(this);
}

VideoWindow.prototype.printDimensions = function () {
    console.log([this.video.videoWidth, this.video.videoHeight]);
}

VideoWindow.prototype.setIndependent = function (independent, updatePosition = true) {
    this.independent = independent;
    this.pause = independent;
    this.onPreviousPress = Input.isPressed('ok') || Input.isPressed('cancel') || TouchInput.isPressed();

    if (independent) g.getInterpreter().setWaitMode('indefinite');
    else if (g.getInterpreter()._waitMode === 'indefinite') g.getInterpreter().setWaitMode(''); //If we're blocking the interpreter, let's stop

    if (updatePosition) {
        this.y = (Graphics.boxHeight - (independent ? 0 : SceneManager._scene._messageWindow.height)) / 2 - this.height / 2;
        Graphics._centerElement(this.video);
        if (!independent) this.video.style.marginTop = ((this.y + this.standardPadding()) * Graphics._realScale + Graphics._canvas.offsetTop) + "px";
    }
}

VideoWindow.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    if (!this.isOpen()) return;
    if (this.openness >= 255 && this.video.style.display === 'none') this.video.style.display = '';
    if (Graphics._realScale !== this.lastScale || this.lastOffset !== Graphics._canvas.offsetTop) {
        this.lastScale = Graphics._realScale;
        this.lastOffset = Graphics._canvas.offsetTop;
        Graphics._centerElement(this.video);
        if (!this.independent) this.video.style.marginTop = ((this.y + this.standardPadding()) * Graphics._realScale + Graphics._canvas.offsetTop) + "px";
    }

    if (this.independent) {
        if (Input.isPressed('ok') || Input.isPressed('cancel') || TouchInput.isPressed()) {
            if (this.onPreviousPress) return; //We're still on the keypress from last event
            this.finish();
        } else {
            this.onPreviousPress = false;
        }
    }
}

VideoWindow.prototype.finish = function () {
    Input.update();
    this.close();
    if (this.video) {
        this.video.pause();
        this.video.removeAttribute('src'); // empty source
        this.video.load(); //This will 'load' and empty video, effectively removing the existing one from memory
    }
    SceneManager._scene._windowLayer.removeChild(this);
    if (this.independent) g.getInterpreter().setWaitMode('');
}

/*
Required to get a video to play: (we might want to add playInLine stuff from screenshot just in case of iPhones)
let video = document.createElement('video'); document.body.appendChild(video);
<video>​</video>​
video.setAttribute('playsinline','');
makeVideoPlayableInline(video);
video.width = 640; video.height = 360;
video.style.zIndex = 3
Graphics._centerElement(video)
video.src = `movies/seal-reversed.webm`
*/

/*Graphics._centerElement = function (element) {
    var width = element.width * this._realScale;
    var height = element.height * this._realScale;
    element.style.position = 'absolute';
    element.style.margin = 'auto';
    element.style.top = 0;
    element.style.left = 0;
    element.style.right = 0;
    element.style.bottom = 0;
    element.style.width = width + 'px';
    element.style.height = height + 'px';
};*/