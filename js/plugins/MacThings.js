//=============================================================================
// MacThings.js
//=============================================================================

/*:
 * @plugindesc Various misc things
 * @author Mac15001900
 *
 * @help This plugin does things. Hopefully.
 */

//===================================== JavaScript upgrades =====================================

String.prototype.replaceAll = function (pattern, value) {
    return this.split(pattern).join(value);
}

//===================================== Initialisation =====================================

//Make sure we have a modern enough version of JavaScript
try {
    let test = BigInt(1);
} catch (e) {
    throw "The JavaScript version is too old.";
}

const MAC_DEBUG = false;
const DEBUG_STAGE = 10;
window.g = window.g || {}
g.gameInitialised = false;
//Shorhands for $gameVariables and $gameSwitches
let $gv;
let $gs;

const SECRET_KEYS = ["otoczenie", "nokianazawsze", "całkiemjakżycie", "kalkulacja", "charleskrum", "rakietapizzatęcza", "iksytonawiasy", "nowesrebro", "deuteranopia", "akumulatron", "pierwiastekcotam", "powodzenia", "semikonteneryzacja", "czekoladapizzawiewiórkasparta", "miódmalina", "ognisko", "delatorcukrzenia", "bojadrukfigahartmenuopiswiza", "obracańko", "grynszpany", "eulerowsko", "945", "terazmyśliszparzystością", "zaznaczacz", "banachowo", "wielkaunifikacjahaseł", "zaczynamy", "kjf947fosi yu094", "zacezarowane", "wykładniczowością", "odcyrklowywanie"]
const VOLUME_INCREMENT = 5;
const ENCRYPT_LIST = "aąbcćdeęfghijklłmnńoóprsśtuwyzźż[]"
const PRIMES = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n, 43n, 47n, 53n, 59n, 61n, 67n, 71n, 73n, 79n, 83n, 89n, 97n, 101n, 103n, 107n, 109n, 113n, 127n, 131n, 137n, 139n, 149n, 151n, 157n, 163n, 167n, 173n, 179n, 181n, 191n, 193n, 197n, 199n, 211n, 223n, 227n, 229n, 233n, 239n, 241n, 251n, 257n, 263n, 269n, 271n, 277n, 281n, 283n, 293n, 307n, 311n, 313n, 317n, 331n, 337n, 347n, 349n, 353n, 359n, 367n, 373n, 379n, 383n, 389n, 397n, 401n, 409n, 419n, 421n, 431n, 433n, 439n, 443n, 449n, 457n, 461n, 463n, 467n, 479n, 487n, 491n, 499n, 503n, 509n, 521n, 523n, 541n];


var _Scene_Map_loaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function () {
    _Scene_Map_loaded.call(this);
    console.log("Map loaded!");
    if (!g.gameInitialised) macThingsInit();
    macUpdateForeground();
};

macUpdateForeground = function () {
    let foregroundName = $gameMap._parallaxName + '-F';
    if (foregroundName === "-F") return; //We're in testland
    if ($gameMap._parallaxName && g.ocramLayers[0]._imgName !== foregroundName || !g.gameInitialised) {
        console.log("Loading new foreground: " + foregroundName);
        g.interpteter.pluginCommand('oc_layer', ['0', foregroundName]);
    } else {
        console.log(foregroundName + " already correct");
    }
}

macThingsInit = function () {
    $gv = new Proxy($gameVariables._data, {
        get: function (target, name) {
            return $gameVariables.value(name);
        },
        set: function (obj, prop, value) {
            $gameVariables.setValue(prop, value);
        }
    });
    $gs = new Proxy($gameSwitches._data, {
        get: function (target, name) {
            return $gameSwitches.value(name);
        },
        set: function (obj, prop, value) {
            $gameSwitches.setValue(prop, value);
        }
    });

    $gs[1] = true; //Set the 'True' switch to always be true

    if ($gv[1] === 0) {
        g.data = g.data || initialiseGData();
        $gv[1] = g.data;
    } else {
        g.data = $gv[1];
    }
    if (MAC_DEBUG) {
        $gs[2] = true; //Set the debug switch
        $gv[41] = DEBUG_STAGE;
    }
    g.interpteter = new Game_Interpreter();
    g.gameInitialised = true;
    console.log("MacThings init complete", $gv[1]);
}

initialiseGData = function () {
    let res = { keysCurrent: 0, keysTotal: 0, test: "TOAST!" };
    res.keysCollected = {};
    for (let i = 0; i < SECRET_KEYS.length; i++) {
        res.keysCollected[SECRET_KEYS[i]] = false;
    }
    return res;
}


//=====================================Puzzle logic=====================================

checkKey = function (input) {
    if (input.substr(0, 6) !== "klucz[" || input[input.length - 1] !== ']') return 0; //Invalid format
    let key = input.substr(6, input.length - 7);
    if (!(key in g.data.keysCollected)) return 1; //There is no such key
    if (g.data.keysCollected[key]) return 2; //Correct, but already collected
    if (!g.data.keysCollected[key]) {
        g.data.keysCollected[key] = true;
        g.data.keysCurrent += 1;
        g.data.keysTotal += 1;
        switch (g.data.keysTotal) {
            case 1: $gv[41] = 1; break;
            case 2: $gv[41] = 2; break;
            case 3: $gv[41] = 3; break;
        }
        return 3; //Correct, and not collected yet!
    }
}

function displayKeys(amount) {
    let name = "klucze";
    if (amount === 1) name = "klucz";
    else if (useDopełniacz(amount)) name = "kluczy";
    return amount + " " + name;
}

function useDopełniacz(amount) {
    if (amount % 100 - amount % 10 === 10) return true;
    if ([2, 3, 4].includes(amount % 10)) return false;
    return true;
}

g.encrypterPuzzle = function (text) {
    text = text + "";
    if (text.length > 100) return "Maksymalna długość to 100 znaków";
    if (Array.from(text).find(c => !ENCRYPT_LIST.includes(c))) return "Dozwolone znaki to: " + ENCRYPT_LIST;


    let values = text.split("").map(c => ENCRYPT_LIST.indexOf(c) + 1);
    let sum = values.reduce((a, b) => a + b, 0);
    let encrypted = [];
    for (let i = 0; i < values.length; i++) {
        encrypted[i] = ENCRYPT_LIST[(values[i] - 1 + sum * (i + 1)) % (ENCRYPT_LIST.length)];
    }
    return encrypted.join("") + "-" + sum;
}

g.calculatorPuzzle = function (text) { //For testing: https://www.alpertron.com.ar/ECM.HTM
    text = text + "";
    if (text.length > 50) return "Maksymalna długość to 50 znaków";
    if (Array.from(text).find(c => !ENCRYPT_LIST.includes(c))) return "Dozwolone znaki to: " + ENCRYPT_LIST;

    let values = text.split("").map(c => ENCRYPT_LIST.indexOf(c) + 1);
    let sum = 1n;
    for (let i = 0; i < values.length; i++) {
        sum = sum * PRIMES[i] ** BigInt(values[i]);
    }
    return g.breakString(sum + "", 125);
}


//===================================== Event functions =====================================

runNearbyEvent = function (interpreter, dx, dy) {
    let events = $gameMap._events;
    let { x, y } = events[interpreter.eventId()];
    let res = events.filter(e => e.x === x + dx && e.y === y + dy);
    if (res.length > 0) interpreter.setupChild(res[0].list(), res[0].eventId());
    else console.warn(`No event found at x:${x + dx}, y:${y + dy}`);
}

runEvent = function (interpreter, eventId) {
    let event = $gameMap._events[eventId];
    if (event) interpreter.setupChild(event.list(), eventId);
    else console.warn(`No event with id ${eventId} found.`);
}

//===================================== Multi image display =====================================

g.MultiDisplay = function (rows, columns, wrap, filename, description, text) {
    let self = this;
    text = text || ["Strzałka w lewo", "Strzałka w prawo", "Strzałka w górę", "Strzałka w dół", "Odejdź"];
    let x = 0;
    let y = 0;
    let imageTexts = {};
    $gv[3] = 0; //Clear player choice

    this.moveUp = function (amount = 1) {
        if (y + amount < columns && y + amount >= 0) y += amount;
        else if (wrap) y = (y + amount) % columns;
        else console.error("Invalid operation at MultiDisplay");
    };
    this.moveDown = (amount = 1) => self.moveUp(-amount);
    this.moveRight = function (amount = 1) {
        if (x + amount < rows && x + amount >= 0) x += amount;
        else if (wrap) x = (x + amount) % rows;
        else debugger; // console.error("Invalid operation at MultiDisplay");
    };
    this.moveLeft = (amount = 1) => self.moveRight(-amount);

    this.showChoices = function (interpreter) {
        let choices = [];

        if (wrap || y < columns - 1) choices.push(2); //Up
        if (wrap || x > 0) choices.push(0); //Left
        if (wrap || x < rows - 1) choices.push(1); //Right
        if (wrap || y > 0) choices.push(3); //Down

        textOptions = choices.map(n => text[n]);

        if (imageTexts[x + "-" + y]) {
            textOptions.push("Kopiuj");
            choices.push(-1);
        }

        textOptions.push(text[text.length - 1]);
        choices.push(-2); //The cancel option

        let startingOption = choices.indexOf($gv[3]); //If previously chosen option is available, it will start selected
        if (startingOption < 0) startingOption = 0; //Otheriwse use the first option

        $gameMessage.setChoices(textOptions, startingOption, choices.length - 1);
        $gameMessage.setChoiceBackground(0);
        $gameMessage.setChoicePositionType(2);
        $gameMessage.setChoiceCallback(n => $gv[3] = choices[n]);
        if (description) $gameMessage.add(description);
        interpreter.setWaitMode('message');
    };

    this.processResponse = function (interpreter) {
        let choice = $gv[3];
        switch (choice) {
            case -2: break;
            case -1:
                copyTextToClipboard(imageTexts[x + "-" + y]);
                $gameMessage.add("Skopiowano do schowka.");
                interpreter.setWaitMode('message');
                break;
            case 0: self.moveLeft(); break;
            case 1: self.moveRight(); break;
            case 2: self.moveUp(); break;
            case 3: self.moveDown(); break;
            default: console.error("Invalid player input for MultiDisplay: ", choice);
        }
    };

    this.showImage = function (size = 100) {
        $gameScreen.erasePicture(1);
        $gameScreen.showPicture(1, `${filename}/${filename}-${x}-${y}`, 1, 960, 375, size, size, 255, 0);
    }

    this.getCoords = () => console.log(x, y);

    this.setOptions = function (options) { text = options; };
    this.setDescription = function (desc) { description = "\\>" + desc.replaceAll('\n', '\n\\>'); };

    this.addImageText = function (x, y, text) {
        imageTexts[x + "-" + y] = text;
    }
}

//=====================================Misc utility functions=====================================

g.getInterpreter = function () {
    let res = $gameMap._interpreter;
    while (res._childInterpreter && res._childInterpreter.isRunning()) res = res._childInterpreter;
    return res;
}

g.screenWidth = function () {
    return Number(document.querySelector("#GameCanvas").style.width.slice(0, -2));
}

g.screenHeight = function () {
    return Number(document.querySelector("#GameCanvas").style.height.slice(0, -2));
}

g.showPicture = function (name, id = 1, scale = 100, x = 960, y = 375) {
    $gameScreen.showPicture(id, name, 1, x, y, scale, scale, 255, 0);
}

g.padToLength = function (string, targetLength, side = 'both') {
    let lines = string.split('\n');
    let maxLength = lines.map(g.simpleUnescape).map(l => l.length).reduce((a, b) => a > b ? a : b);
    if (maxLength >= targetLength) return string;
    let padding = ' '.repeat(Math.ceil((targetLength - maxLength) / 2));
    switch (side) {
        case 'both':
        case 'center': return lines.map(l => padding + l + padding).join('\n');
        case 'left': return lines.map(l => padding + padding + l).join('\n');
        case 'right': return lines.map(l => l + padding + padding).join('\n');
    }
}

//Breaks up a string into multiple lines. Rather crude, does not look at spaces
g.breakString = function (string, length = 100) {
    if (string.length <= length) return string;

    let res = [];
    let resLine = "";
    let j = 0;
    for (let i = 0; i < string.length; i++) {
        resLine += string[i];
        if (resLine.length >= length) {
            res.push(resLine);
            resLine = "";
        }
    }
    if (resLine.length > 0) res.push(resLine);

    return res.join('\n');
}

//Removes or converts some special escape characters, for saving strings as plain text. Might not handle everything
//TODO: remove text shaking stuff as well
g.simpleUnescape = function (string) {
    return Window_Base.prototype.convertEscapeCharacters(string).replace(/\x1b\w\[(\d+)\]/g, '').replace(/\x1b\w/g, '');
}

//Text to clipboard, function by Dean Taylor taken from https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    //Some styling shenanigans in case the element renders for some reason
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';

    textArea.value = g.simpleUnescape(text);
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        var success = document.execCommand('copy');
        //console.log('Copying text to clipboard was ' + (success ? 'successful' : 'unsuccessful'));
    } catch (err) {
        console.warn('Failed to copy to clipboard');
    }
    document.body.removeChild(textArea);
}

//=====================================Various engine changes=====================================

var _Scene_Title_start = Scene_Title.prototype.start;
Scene_Title.prototype.start = function () {
    _Scene_Title_start.call(this);
    console.log("Scene title started");
    if (g) g.gameInitialised = false;
};

Window_Options.prototype.volumeOffset = () => VOLUME_INCREMENT;

var _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
DataManager.makeSavefileInfo = function () {
    var res = _DataManager_makeSavefileInfo.call(this);
    if (g.data.keysTotal === 0) res.title = "Początek";
    else res.title = displayKeys(g.data.keysTotal);
    return res;
};

var _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function () {
    if (this._waitMode === 'indefinite') {
        return true;
    }
    return _Game_Interpreter_updateWaitMode.apply(this, arguments);
};

Scene_Title.prototype.commandExit = function () {
    this._commandWindow.close();
    SceneManager.exit();
};

var _Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function (code, textState) {
    switch (code) {
        case ',': this.startWait(7); break;
        default: _Window_Message_processEscapeCharacter.call(this, code, textState);
    }
}

//From https://forums.rpgmakerweb.com/index.php?threads/how-to-remove-blur.47504/
ImageManager.loadBitmap = function (folder, filename, hue, smooth) {
    //let doSmoothing = false;
    //if (["img/faces/", "img/pictures/"].indexOf(folder) >= 0) doSmoothing = true;

    if (filename) {
        var path = folder + encodeURIComponent(filename) + '.png';
        var bitmap = this.loadNormalBitmap(path, hue || 0);
        //console.log("disabling smoothing for " + path);
        bitmap.smooth = false; //TODO: choose when to smooth
        return bitmap;
    } else {
        return this.loadEmptyBitmap();
    }
}
