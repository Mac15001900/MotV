/*---------------------------------------------------------------------------*
 * 2017/07/14 kido0617
 * http://kido0617.github.io/
 * Public Domain
 * Please use freely, credit not necessary
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc Window Manager plugin
 * @author kido0617
 * @help
 *     Plugin that shows text window
 *     How to use: 
 *        WindowManager.show(0, 10, 10,180, 80);    //show(window#, x, y, width, height)
 *        
 *        Text output: WindowManager.drawText(0, "あいうえお");    //drawText(window#, text displayed)
 *        Show picture: WindowManager.drawPicture(0, "cat");        //drawPicture(window#, picture name)
 *        Delete: WindowManager.hide(0);                                    //hide(window#)
 *        Delete all: WindowManager.hideAll();
 */

(function () {
    window.WindowManager = {};
    WindowManager.windows = [];

    WindowManager.show = function (n, x, y, width, height) {
        var w = new Window_Base(x, y, width, height);
        w.openness = 0;
        w.open();
        if (this.windows[n]) this.hide(n);
        this.windows[n] = w;
        SceneManager._scene.addWindow(w);
    };
    WindowManager.drawText = function (n, text) {
        if (!this.windows[n]) return;
        this.windows[n].contents.clear();
        this.windows[n].drawTextAutoWrap(text, 0, 0, this.windows[n].contentsWidth());
    };
    WindowManager.drawPicture = function (n, pic) {
        if (!this.windows[n]) return;
        var bmp = ImageManager.loadPicture(pic);
        this.windows[n].contents.clear();
        bmp.addLoadListener(function () {
            this.windows[n].contents.blt(bmp, 0, 0, bmp.width, bmp.height, 0, 0);
        }.bind(this));
    }
    WindowManager.hide = function (n) {
        if (!this.windows[n]) return;
        this.windows[n].close();
        this.windows[n] = null;
    };
    WindowManager.hideAll = function () {
        for (var i = 0; i < this.windows.length; i++) {
            this.hide(i);
        }
    };
    WindowManager.destroy = function () {
        this.windows = [];
    };

    //Change: Custom function
    WindowManager.showPictureWindow = function (name, n = 1) {
        let bmp = ImageManager.loadPicture(name);
        let self = this;
        bmp.addLoadListener(function () {
            let w = bmp.width + 36;
            let h = bmp.height + 36;
            let fullWidth = SceneManager._screenWidth;
            let fullHeight = SceneManager._screenHeight;
            var win = new Window_Base((fullWidth - w) / 2, (fullHeight - h) / 2, bmp.width + 36, bmp.height + 36);

            win.openness = 0;
            win.open();
            if (self.windows[n]) self.hide(n);
            self.windows[n] = win;
            SceneManager._scene.addWindow(win);

            self.windows[n].contents.blt(bmp, 0, 0, bmp.width, bmp.height, 0, 0);
        }.bind(this));
    }











    var _terminate = Scene_Base.prototype.terminate;
    Scene_Base.prototype.terminate = function () {
        _terminate.call(this);
        WindowManager.destroy();
    };


    Window_Base.prototype.drawTextAutoWrap = function (text, x, y, width) {
        var textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
        textState.height = this.calcTextHeight(textState, false);
        this.resetFontSettings();
        while (textState.index < textState.text.length) {
            this.processCharacter(textState);
            console.assert(this.calcCharacterWidth(textState.text[textState.index]) >= width);
            if (textState.x + this.calcCharacterWidth(textState.text[textState.index]) >= width) {
                textState.text = textState.text.slice(0, textState.index) + '\n' +
                    textState.text.slice(textState.index, textState.text.length);
            }
        }
    };

    Window_Base.prototype.calcCharacterWidth = function (c) {
        switch (c) {
            case '\n':
                return 0;
            case '\f':
                return 0;
            case '\x1b':
                return 0;
            default:
                return this.textWidth(c);
        }
    };


})();