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
    this.offsetX = 0;
    Window_Base.prototype.initialize.call(this, 0, 0, SceneManager._screenWidth, SceneManager._screenHeight);
}

VideoWindow.prototype.show = function (filename, independent = true, loop = false, scale = 1) {
    // if (this.isOpen()) this.finish();
    const DIMENSIONS = { "seal-reversed.webm": [640, 360], "testVideo.webm": [1920, 937] }; //This is rather hacky, but much simpler than waiting until a file is loaded to know what its dimentions will be
    this.independent = independent;
    this.loop = loop;
    this.scale = scale;
    this.contents.clear();

    let video = document.createElement('video');
    video.src = 'movies/' + filename;
    video.loop = loop;
    video.autoplay = true;
    if (DIMENSIONS[filename]) {
        video.width = DIMENSIONS[filename][0] * scale;
        video.height = DIMENSIONS[filename][1] * scale;
    }
    video.style.zIndex = 3
    video.setAttribute('playsinline', '');
    Graphics._centerElement(video);
    makeVideoPlayableInline(video);
    document.body.appendChild(video);
    this.video = video;

    if (independent) g.getInterpreter().setWaitMode('indefinite');
    this.openness = 0;
    this.open();

    this.lastScale = Graphics._realScale;
    this.onPreviousPress = Input.isPressed('ok') || Input.isPressed('cancel') || TouchInput.isPressed();
}

VideoWindow.prototype.printDimensions = function () {
    console.log([this.video.videoWidth, this.video.videoHeight]);
}

VideoWindow.prototype.update = function () {
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

VideoWindow.prototype.finish = function () {
    Input.update();
    this.close();
    this.video.pause();
    this.video.removeAttribute('src'); // empty source
    this.video.load(); //This will 'load' and empty video, effectively removing the existing one from memory
    // SceneManager._scene.removeChild(this);
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