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
    if (this.isOpen()) this.finish();
    this.independent = independent;
    this.loop = loop;
    this.scale = scale;
    this.contents.clear();

    let video = document.createElement('video');
    video.src = 'movies/' + filename;
    video.loop = loop;
    video.autoplay = true;
    video.style.width = (video.videoWidth * scale) + 'px';
    video.style.height = (video.videoHeight * scale) + 'px';
    video.style.objectFit = 'contain';
    video.style.objectPosition = 'center';
    this.contents.appendChild(video);

    if (independent) g.getInterpreter().setWaitMode('indefinite');
    this.recenter();
    this.openness = 0;
    this.open();


    this.open();


}
/*
Required to get a video to play: (we might want to add playInLine stuff from screenshot just in case of iPhones)
let video = document.createElement('video'); document.body.appendChild(video);
<video>​</video>​
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