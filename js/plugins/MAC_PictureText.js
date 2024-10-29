/*:
 * @plugindesc Shows text similarly to the "Show Picture" command
 * @author Mac15001900
 * 
 * @param Smooth movement
 * @desc When moving images, should they use linear or smoother movement?
 * @type boolean
 * @default true
 * @on Smooth
 * @off Linear
 * 
 * @param Erase on map change
 * @desc Should all images be erased when the map changes?
 * @type boolean
 * @default true
 * @on yes
 * @off no
 * 
 * @help
 * 
 * This plugin allows you to show text on the screen, in a way that's similar to
 * using the Show Picture command.
 * 
 * It uses 3 plugin commands:
 * ShowPictureText id x y text
 * MovePictureText id x y time
 * ErasePictureText id
 * 
 * Ids can be numbers or words, as long as they don't have spaces.
 * Text can include '\n' for new lines.
 * Time for movement is specified in frames.
 * k
 */

var Imported = Imported || {}
Imported.MAC_PictureText = "1.0";
window.MAC_PictureText = {};

// void function ($) {

let $ = MAC_PictureText

let params = PluginManager.parameters('MAC_PictureText');
$.params = params;
$.smooth = booleanValue(params["Smooth movement"]);
$.lastMapId = null;
$.pictures = {};

void ((alias) => {
    Scene_Title.prototype.start = function () {
        alias.call(this);
        $.lastMapId = null;
    }
})(Scene_Title.prototype.start);

void ((alias) => {
    Scene_Map.prototype.onMapLoaded = function () {
        alias.call(this);
        if (!$.all) $.all = new PIXI.Container();
        if ($gameMap.mapId() !== $.lastMapId && booleanValue(params["Erase on map change"])) {
            $.lastMapId = $gameMap.mapId();
            $.all.removeChildren().forEach(c => c.destroy());
            $.pictures = {};
        }
        this.addChild($.all);
    }
})(Scene_Map.prototype.onMapLoaded);

void ((alias) => {
    Scene_Map.prototype.update = function () {
        alias.call(this);
        $.all.children.forEach(c => c.update());
    }
})(Scene_Map.prototype.update);

void ((alias) => {
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        alias.call(this, command, args);
        switch (command.toLowerCase()) {
            case 'showpicturetext':
                let pic = new Window_PictureText(args.splice(3, args.length).join(' '), numberValue(args[1]), numberValue(args[2]));
                $.erasePicture(args[0]);
                $.pictures[args[0]] = pic;
                $.all.addChild(pic);
                break;
            case 'erasepicturetext':
                $.erasePicture(args[0]);
                break;
            case 'movepicturetext':
                let pictureToMove = $.pictures[args[0]]
                if (pictureToMove) pictureToMove.moveTo(numberValue(args[1]), numberValue(args[2]), numberValue(args[3]));
                break;
        }
    }
})(Game_Interpreter.prototype.pluginCommand);

$.erasePicture = function (id) {
    let pictureToErase = $.pictures[id]
    if (pictureToErase) {
        $.all.removeChild(pictureToErase);
        pictureToErase.destroy();
        delete $.pictures[id];
    }

}

//Removes or converts some special escape characters, for saving strings as plain text. Might not handle everything
simpleUnescape = function (string) {
    return Window_Base.prototype.convertEscapeCharacters(string)
        .replace(/\x1bMSGCORE\[(\d+)\]/g, '') //replaces Yanfly MessageCore codes
        .replace(/\x1bfn<(\w+)>/g, '') //replaces \fn<Fontname>
        .replace(/\x1b((Shake|Slide|Wave)(<.*?>)?|Circle|ResetShake)/g, '') //Replaces codes from SRD_ShakingText
        .replace(/\x1b\w\[(\d+)\]/g, '') //Replaces single-character \x[n] codes
        .replace(/\x1b\S/g, ''); //Replaces single-character \x codes
}

/**
* Converts a string (from plugin parameters or commands) to a number, regardless if that string contains a number literal of a variable indentifier
* @param {String|Number} string A number or variable indentifier (in the form v42 or v0042)
* @returns The string converted to a number
*/
numberValue = function (string) {
    if (!string) return 0;
    if (string[0] === 'v') return $gameVariables.value(Number(string.replace(/^v0*/, '')));
    else return Number(string);
}

/**
* Converts a string (from plugin parameters or commands) to a boolean, regardless if that string contains a boolean literal of a switch indentifier
* @param {String|Boolean} string A boolean or switch indentifier (in the form s42 or s0042)
* @returns The string converted to a boolean
*/
booleanValue = function (string) {
    if (typeof string === "boolean") return string;
    if (!string || string.length === 0) return false;
    if (string[0] === 's') return $gameSwitches.value(Number(string.replace(/^s0*/, '')));
    else return ["true", "t", "on", "yes", "y"].includes(string.toLocaleLowerCase());
}



function Window_PictureText() {
    this.initialize.apply(this, arguments);
};

Window_PictureText.prototype = Object.create(Window_Base.prototype);
Window_PictureText.prototype.constructor = Window_PictureText;
Window_PictureText.prototype.initialize = function (text, x, y, fontSize) {
    Window_Base.prototype.initialize.call(this, 0, 0);
    this.extraPadding = this.standardPadding();
    this.standardPadding = () => 0;
    this.updatePadding();
    this.opacity = 0;

    this.text = text;
    let lines = this.text.split("\n");
    this._width = 0;
    for (let i = 0; i < lines.length; i++) {
        this._width = Math.max(this._width, this.textWidth(simpleUnescape(lines[i])) + 6 * this.extraPadding);
    }
    let rows = lines.length;
    this._height = this.fittingHeight(rows) + this.textPadding() * rows + this.extraPadding;

    //To account for various text-effect shenanigans, let's just double these
    this._width *= 2;
    this._height *= 2;

    this.move(x, y, this._width, this._height);
    this.contents = new Bitmap(this.contentsWidth(), this.contentsHeight());
    this.refresh();
}

Window_PictureText.prototype.refresh = function () {
    this.contents.clear();
    this.drawTextEx(this.text, 0, 0);
}

Window_PictureText.prototype.moveTo = function (x, y, time) {
    if (!time) {
        this.x = x;
        this.y = y;
    } else {
        this.startPos = [this.x, this.y];
        this.targetPos = [x, y];
        this.moveTime = time;
        this.timeLeft = time + 1;
    }
}

Window_PictureText.prototype.update = function () {
    if (this.timeLeft > 0) {
        this.timeLeft--;
        let progress = 1 - this.timeLeft / this.moveTime;
        if ($.smooth) progress = easeInOutSine(progress);
        this.x = this.startPos[0] + (this.targetPos[0] - this.startPos[0]) * progress;
        this.y = this.startPos[1] + (this.targetPos[1] - this.startPos[1]) * progress;
    }
}

function easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
}


// }(MAC_PictureText);