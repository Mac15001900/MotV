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

String.prototype.capitalise = function () {
    return this[0].toUpperCase() + this.substring(1);
}

//===================================== Initialisation =====================================

//Make sure we have a modern enough version of JavaScript (tbh I'm not sure if this test will even run on an older version, but it won't hurt)
try {
    let test = BigInt(1);
} catch (e) {
    throw "The JavaScript version is too old.";
}

const MAC_DEBUG = true;
const VERBOSE_LOGS = false;
const DEBUG_STAGE = 10; //If debug is on, game stage will be set to this
const DEBUG_SWITCHES = [141]; //Switches that will be turned on when debug mode is on 
const MUSIC_DEBUG = false;
window.g = window.g || {}
window.s = wordBank.en; //This should change once the config gets loaded
g.gameInitialised = false;
g.persistentWindows = [];
//Shorhands for $gameVariables, $gameSwitches and $gameSelfSwitches, as well as seen events. Filled in by macThingsInit
let $gv;
let $gs;
let $ss;
let $es;

const GAME_VERSION = "Alpha 1.0.0";
const SECRET_KEYS = ["otoczenie", "nokianazawsze", "całkiemjakżycie", "kalkulacja", "charleskrum", "rakietakiwitęcza", "iksytonawiasy", "nowesrebro", "deuteranopia", "akumulatron", "pierwiastekcotam", "powodzenia", "semikonteneryzacja", "czekoladapizzawiewiórkasparta", "miódmalina", "delatorcukrzenia", "bojadrukfigahartmenuopiswiza", "obracańko", "grynszpany", "eulerowsko", "945", "terazmyśliszparzystością", "zaznaczacz", "banachowo", "wielkaunifikacjahaseł", "zaczynamy", "kjf947fosi yu094", "zacezarowane", "wykładniczowością", "odcyrklowywanie"]
const AUTOSAVE_DELAY = 300 * 1000; //How often to autosave (in miliseconds)
const AUTOSAVE_RETRY = 5 * 1000; //If autosave fails, wait this long to try again
const VOLUME_INCREMENT = 5; //How many % to change the volume by from one button-press
const ROOM_UNCLOKS = [1, 2, 3, 5, 7, 10, 13, 16, 19, 22]; //How many keys are needed for each unlock stage
const PRIMES = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n, 43n, 47n, 53n, 59n, 61n, 67n, 71n, 73n, 79n, 83n, 89n, 97n, 101n, 103n, 107n, 109n, 113n, 127n, 131n, 137n, 139n, 149n, 151n, 157n, 163n, 167n, 173n, 179n, 181n, 191n, 193n, 197n, 199n, 211n, 223n, 227n, 229n, 233n, 239n, 241n, 251n, 257n, 263n, 269n, 271n, 277n, 281n, 283n, 293n, 307n, 311n, 313n, 317n, 331n, 337n, 347n, 349n, 353n, 359n, 367n, 373n, 379n, 383n, 389n, 397n, 401n, 409n, 419n, 421n, 431n, 433n, 439n, 443n, 449n, 457n, 461n, 463n, 467n, 479n, 487n, 491n, 499n, 503n, 509n, 521n, 523n, 541n];
const WINDOW_MESSAGE_HEIGHT = 336; //This is only descriptive, doesn't actually influence Window_Message

var _Scene_Map_loaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function () {
    _Scene_Map_loaded.call(this);
    if (VERBOSE_LOGS) console.log("Map loaded!");
    if (!g.gameInitialised) macThingsInit();
    macUpdateForeground();
    //Re-add any windows we want to keep around pernamently
    for (let i = 0; i < g.persistentWindows.length; i++) {
        this.addWindow(g.persistentWindows[i]);
    };
}

macUpdateForeground = function () {
    if (!g.ocramLayers || !$gameMap._parallaxName) return;
    let foregroundName = g.translateMapName($gameMap._parallaxName) + '-F';
    if (foregroundName === "-F") return; //We're in testland
    if (g.ocramLayers[0]._imgName !== foregroundName) {
        if (VERBOSE_LOGS) console.log("Loading new foreground: " + foregroundName);
        g.getInterpreter().pluginCommand('oc_layer', ['0', foregroundName]);
    } else {
        if (VERBOSE_LOGS) console.log(foregroundName + " already correct");
    }
}

macThingsInit = function () {
    //Setting up variable and switch proxies
    $gv = new Proxy($gameVariables._data, {
        get: function (target, name) {
            return $gameVariables.value(name);
        },
        set: function (obj, prop, value) {
            $gameVariables.setValue(prop, value);
            return true;
        }
    });
    $gs = new Proxy($gameSwitches._data, {
        get: function (target, name) {
            return $gameSwitches.value(name);
        },
        set: function (obj, prop, value) {
            $gameSwitches.setValue(prop, value);
            return true;
        }
    });
    $ss = new Proxy($gameSelfSwitches._data, {
        get: function (target, name) {
            let inp = g.getInterpreter();
            if (inp.commonEventId) return $gameSelfSwitches.value('-,' + inp.commonEventId + ',' + name.toUpperCase());
            else return $gameSelfSwitches.value(inp._mapId + ',' + inp._eventId + ',' + name.toUpperCase());
        },
        set: function (obj, name, value) {
            let inp = g.getInterpreter();
            if (inp.commonEventId) $gameSelfSwitches.setValue('-,' + inp.commonEventId + ',' + name.toUpperCase(), value);
            else $gameSelfSwitches.setValue(inp._mapId + ',' + inp._eventId + ',' + name.toUpperCase(), value);
            return true;
        }
    });

    $gs[1] = true; //Set the 'True' switch to always be true

    //Loading or initialising gData
    if ($gv[1] === 0) {
        g.data = initialiseGData();
        $gv[1] = g.data;
    } else {
        g.data = $gv[1];
    }

    //Setting up the $es proxy
    if (!g.data.seenEvents) g.data.seenEvents = [];
    $es = new Proxy(g.data.seenEvents, {
        get: function (target, name) {
            return !!(g.data.seenEvents[$gameMap.mapId()] || {})[name];
        },
        set: function (obj, eventId, value) {
            let mapId = $gameMap.mapId();
            if (!g.data.seenEvents[mapId]) g.data.seenEvents[mapId] = {};
            g.data.seenEvents[mapId][eventId] = value;
            return true;
        }
    });

    //Movespeed and debug stuff
    $gamePlayer.setMoveSpeed(4.5);
    if (MAC_DEBUG) {
        $gs[2] = true; //Set the debug switch
        $gv[41] = DEBUG_STAGE;
        $gamePlayer.setMoveSpeed(5);
    }

    //Setting language and colourblind switches
    console.assert(g.lang !== 'none');
    for (const key in langData.switches) {
        if (Object.hasOwnProperty.call(langData.switches, key)) {
            $gs[langData.switches[key]] = false;
        }
    }
    $gs[langData.switches[g.lang]] = true
    $gs[10] = g.isColorblind;

    //Toast window (for music and autosave displays)
    g.topRightToast = new ToastWindow("top-right");
    g.persistentWindows.push(g.topRightToast);
    //It will be added to the scene later on in the onMapLoaded alias

    //Other init stuff
    g.gameInitialised = true;
    g.saveWorker = new Worker("./js/plugins/compressor.js");
    scheduleAutosave(true);
    console.log("MacThings init complete", $gv[1]);
    g.pictureWindow = new PictureWindow();
}

initialiseGData = function () {
    let res = { keysCurrent: 0, keysTotal: 0, test: "TOAST!", gameVersion: GAME_VERSION, seenEvents: [] };
    res.keysCollected = {};
    for (let i = 0; i < SECRET_KEYS.length; i++) {
        res.keysCollected[SECRET_KEYS[i]] = false;
        //$gv[11]++; //TODO: I'm fairly sure this line isn't needed, but not 100% sure
    }
    res.lastCollected = null;
    res.lifeManager = new BoardManager(4, 9, 11, 9, 3); //Values depend on the layout of Map 6. Update them is resizeing that map.
    return res;
}


//=====================================Puzzle logic=====================================

checkKey = function (input) {
    if (input === 0) return 0;
    console.assert(typeof input === 'string' || input instanceof String, input);
    if (MAC_DEBUG && input === 'k') {
        g.data.keysTotal += 1;
        return 3;
    }

    let lowered = input.toLowerCase().replaceAll(' ', '');
    if (lowered.substr(0, 6) !== "klucz[" || lowered[lowered.length - 1] !== ']') return 0; //Invalid format
    let key = lowered.substr(6, lowered.length - 7);
    $gv[11] = key;
    if (!(key in g.data.keysCollected)) return 1; //There is no such key
    if (g.data.keysCollected[key]) return 2; //Correct, but already collected
    if (!g.data.keysCollected[key]) {
        g.data.keysCollected[key] = true;
        g.data.keysCurrent += 1;
        g.data.keysTotal += 1;
        g.data.lastCollected = key;
        return 3; //Correct, and not collected yet!
    }
}

processNewKey = function (inp) {
    let currentKeys = g.data.keysTotal;
    let newStage = ROOM_UNCLOKS.indexOf(currentKeys) + 1;
    if (newStage > 0) {
        $gv[41] = newStage;
        let message = "Nowy obszar odbklowowany."
        if (newStage > 2) AudioManager.playSe({ name: "Ice2", volume: 100, pitch: 90 });
        else AudioManager.playSe({ name: "Darkness1", volume: 100, pitch: 100 });
        g.showMessage(inp, message);
    }
    if ($gv[41] < ROOM_UNCLOKS.length) {
        g.showMessage(inp, "Do odblokowania kolejnego obszaru zdobyć trzeba jeszcze " + displayKeys(ROOM_UNCLOKS[$gv[41]] - currentKeys) + ".");
    } else if (currentKeys === SECRET_KEYS.length) {
        AudioManager.playMe({ name: "Victory1", volume: 100, pitch: 100 });
        g.showMessage(inp, "Udało Ci się zdobyć wszystkie klucze dostępne w tej wersji gry.\n\\c[4]Gratulacje!");
        //TODO: rolls credits?
    } else {
        g.showMessage(inp, "Do zdobycia jeszcze " + displayKeys(SECRET_KEYS.length - currentKeys) + ".");
    }
}

keyReactions = function (inp) {
    let currentKeys = g.data.keysTotal;
    let newStage = ROOM_UNCLOKS.indexOf(currentKeys) + 1;
    let keyName = g.data.lastCollected;
    let randomMessages = [
        "Kolejny klucz do kolekcji.",
        "I kolejny!",
        "Ładna się robi ta moja mała kolekcja kluczy.",
        "Zostało o jeden mniej.",
        `${currentKeys} to ładna liczba. Ale ${currentKeys + 1} będzie lepszą!`,
        "Tak!",
        "Ha, mam cię!",
        "Ta zagadka nie była taka zła.",
        "Zaczyna mi to iść coraz lepiej.",
    ];

    if ($gv[41] < ROOM_UNCLOKS.length) randomMessages.push("Ciekawe, ile ich tu jeszcze jest.\\.\nPrzynajmniej teraz na pewno o jeden mniej!");
    else if (currentKeys < SECRET_KEYS.length) randomMessages.push(`Jakoś powinno mi się udać zdobyć te pozostałe ${SECRET_KEYS.length - currentKeys}.`);
    else {
        //Just one left
        if (g.data.keysCollected["iksytonawiasy"]) g.showMessage(inp, "Jeszcze tylko ten ostatni. Idę po ciebie!.", 0);
        else g.showMessage(inp, "No dobra, tylko gdzie niby jest ten jeden pozostały klucz?\nChyba musi być ukryty inaczej niż pozostałe.", 0);
        return;
    }

    switch (newStage) {
        case 1: g.showMessage(inp, "O, to brzmi przydatnie. Zobaczmy, co tu teraz mamy.", 0); break;
        case 2: g.showMessage(inp, "Ha, to chyba koniec potencjalnie zabójczych laserów!", 0); break;
        case 3:
            //TODO: Support for multiple messages from a script. Temporarily, this message is in the event
            //g.showMessage(inp, "\\{AAA!\\.\\.\\.", 3);
            //g.showMessage(inp, "Ok, w sumie to nie wiem, czego dokładnie się spodziewałam\\..\nAle raczej nie tego, że ściana obok mnie sobie nagle zniknie.", 0);
            break;
        case 6: g.showMessage(inp, `W sumie to ciekawe, do czego te klucze właściwie służą.\nTych zagadek rozwiązałam już ${ROOM_UNCLOKS[5]}, ale dalej jak nie miałam, tak \nw dalszym ciągu nie mam zielonego pojęcia, czym jest to miejsce. \nMam nadzieję, że gdzieś dalej będzie jakaś odpowiedź.`, 0); break;
        default: switch (keyName) {
            case "czekoladapizzawiewiórkasparta": g.showMessage(inp, "No, w pewnym sensie udało mi się zagrać w Decrypto.", 1); break;
            case "miódmalina": g.showMessage(inp, "Trochę robię się teraz głodna przez tę zagadkę.", 1); break;
            case "nokianazawsze": g.showMessage(inp, "Zdecydowanie nie spodziewałam się, że ta umiejętność jeszcze\nkiedykolwiek mi się w życiu przyda.", 1); break;
            case "rakietakiwitęcza": g.showMessage(inp, 'Z cyklu \\fi"Rzeczy, Których Zdecydowanie Się Nie Spodziewałam \nW Tym Miejscu"\\fi: emoji.', 1); break;
            default: g.showMessage(inp, randomMessages[Math.floor(Math.random() * randomMessages.length)], Math.random() < 0.66 ? 0 : 1);
        }
    }
}

wrongKeyReactions = function (inp, key) {
    //Decrypto partial hints
    let keyWords = ["czekolada", "pizza", "wiewiórka", "sparta"];
    let correct = 0;
    for (let i = 0; i < keyWords.length; i++) {
        if (key.contains(keyWords[i])) correct++;
    }
    if (correct === 2) g.showMessage(inp, "Niektóre z tych słów zdecydowanie mają sens,\nno ale chyba jeszcze nie wszystkie.", 0);
    else if (correct === 3) {
        let wrongPart = key;
        for (let i = 0; i < keyWords.length; i++) wrongPart = wrongPart.replace(keyWords[i], '');
        wrongPart = wrongPart[0].toUpperCase() + wrongPart.substring(1);
        g.showMessage(inp, "To musi być już blisko!\n" + wrongPart + " tu chyba najmniej pasuje.", 0);
    }

}

function displayKeys(amount, color = false) {
    let name = "klucze";
    if (amount === 1) name = "klucz";
    else if (useDopełniacz(amount)) name = "kluczy";
    return (color ? "\\c[4]" : "") + amount + (color ? "\\c[0] " : " ") + name;
}

function useDopełniacz(amount) {
    if (amount % 100 - amount % 10 === 10) return true;
    if ([2, 3, 4].includes(amount % 10)) return false;
    return true;
}

function displayKeysEN(amount) {
    return amount + " key" + (amount === 1 ? "" : "s");
}

function displayKeysPL(amount) {
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
    if (text.length > 100) return s.maximumLengthIs + ' 100 ' + s.characters;
    if (Array.from(text).find(c => !s.encryptList.includes(c))) return s.allowedCharactersAre + ": " + s.encryptList;

    let values = text.split("").map(c => s.encryptList.indexOf(c) + 1);
    let sum = values.reduce((a, b) => a + b, 0);
    let encrypted = [];
    for (let i = 0; i < values.length; i++) {
        encrypted[i] = s.encryptList[(values[i] - 1 + sum * (i + 1)) % (s.encryptList.length)];
    }
    return encrypted.join("") + "-" + sum;
}

g.calculatorPuzzle = function (text) { //Factorisation for testing: https://www.alpertron.com.ar/ECM.HTM
    text = text + "";
    if (text.length > 50) return s.maximumLengthIs + ' 50 ' + s.characters;
    if (Array.from(text).find(c => !s.encryptList.includes(c))) return s.allowedCharactersAre + ": " + s.encryptList;

    let values = text.split("").map(c => s.encryptList.indexOf(c) + 1);
    let sum = 1n;
    for (let i = 0; i < values.length; i++) {
        sum = sum * PRIMES[i] ** BigInt(values[i]);
    }
    return g.breakString(sum + "", 125);
}


//===================================== Event functions =====================================

runNearbyEvent = function (inp, dx, dy) {
    let events = $gameMap._events;
    let { x, y } = events[inp.eventId()];
    let targetId = $gameMap.eventIdXy(x + dx, y + dy);
    if (targetId === 0) throw new Error(`No event found at x:${x + dx}, y:${y + dy}.`);
    else {
        let targetEvent = $gameMap._events[targetId];
        inp.setupChild(targetEvent.list(), targetEvent.eventId());
    }
}

runEvent = function (inp, eventId) {
    let event = $gameMap._events[eventId];
    if (event) inp.setupChild(event.list(), eventId);
    else console.warn(`No event with id ${eventId} found.`);
}

rumble = function (duration, strength) {
    let pad = navigator.getGamepads()[0];
    if (pad && pad.vibrationActuator && pad.vibrationActuator.playEffect) pad.vibrationActuator.playEffect("dual-rumble", { duration: duration, strongMagnitude: strength, weakMagnitude: strength });
}

//===================================== Autosave system =====================================

/*
Will attempt to autosave. Successful or not, it will then schedule the next autosave based on configured delay.
The synchronous parameter dictates whether to hand over the task of compressing data to a worker or do it synchronously
If synchronous is false, it will only save if we're on the map and not in an event.
If it is true, it will save immidiately (blocking the main thread). We assume the caller ensured this is a good moment to autosave
*/
autosaveAttempt = function (synchronous = false) {
    if (SceneManager.getSceneName && SceneManager.getSceneName() === 'Scene_Map' && !g.getInterpreter().isRunning() || synchronous) {
        if (VERBOSE_LOGS) console.log("Starting save at " + new Date().getSeconds());
        /*g.topRightToast.enqueueToast(s.autosaving, Infinity);
        g.topRightToast.fadeInLeft = 0;*/ //Removed the autosaving... toast, since it only appeared for a fraction of a second, and had weird behaviour if there was already another toast present
        $gameSystem.onBeforeSave();
        if (synchronous) autosave(LZString.compressToBase64(JsonEx.stringify(DataManager.makeSaveContents())), true);
        else {
            g.saveWorker.addEventListener('message', autosave);
            g.saveWorker.postMessage({ saveData: JsonEx.stringify(DataManager.makeSaveContents()) })
        }
    } else {
        scheduleAutosave(false);
    }
}

//Schedules an autosave to happen a configurable amount of time from now. Parameters indicate if previous attempt was successful.
scheduleAutosave = function (wasSuccess = true) {
    if (g.autosaveTimeout) clearTimeout(g.autosaveTimeout); //In case we end up with two of them
    if (wasSuccess) g.autosaveTimeout = setTimeout(autosaveAttempt, AUTOSAVE_DELAY);
    else g.autosaveTimeout = setTimeout(autosaveAttempt, AUTOSAVE_RETRY);
}

//Will autosave the game, and call scheduleAutosave afterwards to schedule the next one
autosave = function (message, synchronous = false, index = 1) {
    if (DataManager.saveGame(index, message.data)) {
        StorageManager.cleanBackup(index);
        if (VERBOSE_LOGS) console.log("Saved at " + new Date().getSeconds());
        scheduleAutosave(true);
        if (!g.topRightToast.hasToastWithText(s.autosaved)) g.topRightToast.enqueueToast(s.autosaved, 120);
    } else {
        console.warn("Saving failed");
        scheduleAutosave(false);
        g.topRightToast.enqueueToast(s.autosavingFailed, 120);
    }
    //g.topRightToast.skipToast(); //Re-enable this line if bringing back "Autosaving..." toast
}

//Will attempt to autosave on window close.
window.onunload = () => {
    if (!g.getInterpreter().isRunning()) {
        g.data.test = "On unload!";
        autosaveAttempt(true);
    }
};

//===================================== Space Panic minigame =====================================

testPanic = function (inp) {
    inp.setWaitMode('indefinite'); //this.setWaitMode(''); to end this
    document.getElementById("GameCanvas").style.visibility = 'hidden';
    document.getElementById("GameCanvas").style.display = 'none';
    let frame = document.createElement('iframe');
    frame.id = 'testFrame';
    frame.src = "spacePanic/index.html";
    frame.style = "width: 1920px; height: 1080px; border: none; z-index: 9005, ";
    //let canvas = frame.contentWindow.document.getElementById();
    frame.style.visibility = 'visible'; //TODO toggle 'display' instead?
    frame.onload = "this.focus()";
    document.body.appendChild(frame);

    let gameElements = ["GameCanvas", "GameVideo", "UpperCanvas", "modeTextBack", "ErrorPrinter"]
    for (let i = 0; i < gameElements.length; i++) {
        const element = document.getElementById(gameElements[i]);
        element.style.pointerEvents = "none";
    }
    document.body.style.margin = "-8px"; //It's 8px by default

    //this._centerElement(this._video);
}

testPanic2 = function () {
    let frame = document.getElementById("testFrame");
    let nodes = frame.contentDocument.body.childNodes; //TODO this is a bit janky
    let canvas = nodes[nodes.length - 1];
    canvas.width = this._width;
    canvas.height = this._height;
    canvas.style.zIndex = 2;
}




//===================================== Multi image display =====================================

g.MultiDisplay = function (rows, columns, wrap, filename, description, text) {
    let self = this;
    text = text || s.displayNavigation;
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
        else console.error("Invalid operation at MultiDisplay");
    };
    this.moveLeft = (amount = 1) => self.moveRight(-amount);

    this.showChoices = function (inp) {
        let choices = [];

        if (wrap || y < columns - 1) choices.push(2); //Up
        if (wrap || x > 0) choices.push(0); //Left
        if (wrap || x < rows - 1) choices.push(1); //Right
        if (wrap || y > 0) choices.push(3); //Down

        textOptions = choices.map(n => text[n]);

        if (imageTexts[x + "-" + y]) {
            textOptions.push(s.copy);
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
        inp.setWaitMode('message');
    };

    this.processResponse = function (inp) {
        let choice = $gv[3];
        switch (choice) {
            case -2: break;
            case -1:
                copyTextToClipboard(imageTexts[x + "-" + y]);
                g.showMessage(inp, s.clipboardMessage);
                break;
            case 0: self.moveLeft(); break;
            case 1: self.moveRight(); break;
            case 2: self.moveUp(); break;
            case 3: self.moveDown(); break;
            default: console.error("Invalid player input for MultiDisplay: ", choice);
        }
    };

    this.showImage = function (scale = 1) {
        /*$gameScreen.erasePicture(1);
        $gameScreen.showPicture(1, `${filename}/${filename}-${x}-${y}`, 1, 960, 375, size, size, 255, 0);*/
        g.showPictureWindow(`${filename}/${filename}-${x}-${y}`, false, scale);
    }

    this.getCoords = () => console.log(x, y);

    this.setOptions = function (options) { text = options; };
    this.setDescription = function (desc) { description = "\\>" + desc.replaceAll('\n', '\n\\>'); };

    this.addImageText = function (x, y, text) {
        imageTexts[x + "-" + y] = text;
    }
}

//=====================================Misc utility functions=====================================

//Gets the currently active interpreter (or the map's default if none are active)
g.getInterpreter = function () {
    let res = $gameMap._interpreter;
    while (res._childInterpreter && res._childInterpreter.isRunning()) res = res._childInterpreter;
    return res;
}

//Gets the name of the current top-level scene in the stack
g.topLevelScene = function () {
    if (SceneManager._stack.length > 0) return SceneManager._stack[0].toString().split(' ')[1].split('(')[0]
    else return SceneManager.getSceneName();
}

//Creates a single use toast window at target location
//TODO

//Finds the width of the canvas (in pixels)
g.screenWidth = function () {
    //return Number(document.querySelector("#GameCanvas").style.width.slice(0, -2));
    return Graphics.width;
}

//Finds the height of the canvas (in pixels)
g.screenHeight = function () {
    //return Number(document.querySelector("#GameCanvas").style.height.slice(0, -2));
    return Graphics.height;
}

//Calls showPicture with some parameters filled in with reasonable defaults
g.showPicture = function (name, id = 1, scale = 100, x = 960, y = 375) {
    $gameScreen.showPicture(id, name, 1, x, y, scale, scale, 255, 0);
}

g.niceShowPicture = function (name, id = 1, scale = 100, x = 960, y = 375) {
    WindowManager.show(1,)
}

//Shows a single message, with a face if one is specified. Will not queue up multiple messages
g.showMessage = function (inp, message, face, faceFile = 'mc') {
    if (face !== undefined) $gameMessage.setFaceImage(faceFile, face);
    $gameMessage.setBackground(0);
    $gameMessage.setPositionType(2);
    $gameMessage.add(message);
    inp.setWaitMode('message');
}

//Adds extra spaces to make sure the text is of certain width
g.padToLength = function (string, targetLength, side = 'both') {
    console.assert(typeof string === 'string', "padToLength: string must be a string");
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

//Checks if two arrays are equal
g.arraysEqual = function (a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}


/*var _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function (text) {
    _Window_Base_convertEscapeCharacters.call(this, eval('`' + text + '`'));
}*/

//Removes or converts some special escape characters, for saving strings as plain text. Might not handle everything
//TODO: remove text shaking stuff as well
g.simpleUnescape = function (string) {
    return Window_Base.prototype.convertEscapeCharacters(string)
        .replace(/\x1bMSGCORE\[(\d+)\]/g, '') //replaces Yanfly MessageCore codes
        .replace(/\x1b\w\[(\d+)\]/g, '') //Replaces single-letter \x[n] codes
        .replace(/\x1b\w/g, ''); //Replaces single-letter \x codes
}

//Text to clipboard, function by Dean Taylor taken from https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function copyTextToClipboard(text, escapeSpecial = true) {
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

    textArea.value = escapeSpecial ? g.simpleUnescape(text) : text;
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

//=====================================  Translation system (and colorblindness) =====================================

/*SceneManager.push(Scene_MenuBase)
g.getInterpreter().pluginCommand('CreateQuestionWindow', ['3', '<WordWrap>'+g.padToLength("hello", 40, 'right')]);
SceneManager.pop()*/

//Saving to global data: makeSavefileInfo, inside saveGameWithoutRescue

//ConfigManager.makeData = function () { - returns config
//ConfigManager.applyData = function (config) { - loads everything from that config

g.setLanguage = function (lang) {
    g.lang = lang;
    s = wordBank[lang];
    if ($dataSystem) $dataSystem.terms = s.terms;
    if ($gs) { //If switches exist, set the correct language one
        for (const key in langData.switches) {
            if (Object.hasOwnProperty.call(langData.switches, key)) {
                $gs[langData.switches[key]] = false;
            }
        }
        $gs[langData.switches[lang]] = true
    }
    Graphics.setLoadingImage(`img/system/${s.loadingFile}.png`);
}

g.translateMapName = function (filename) {
    if (filename.indexOf('-lang') > -1) filename = filename.replace('-lang', '-' + g.lang);
    return filename;
}

Object.defineProperty(ConfigManager, 'lang', {
    get: function () {
        return g.lang;
    },
    set: function (value) {
        g.setLanguage(value);
    },
    configurable: true
});

Object.defineProperty(ConfigManager, 'cBlind', {
    get: function () {
        return g.isColorblind;
    },
    set: function (value) {
        g.isColorblind = value;
        if ($gs) $gs[10] = value;
    },
    configurable: true
});

var _ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function () {
    var config = _ConfigManager_makeData.call(this);
    config.lang = g.lang;
    config.isColorblind = g.isColorblind;
    return config;
};

var _ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function (config) {
    _ConfigManager_applyData.call(this, config);
    if (config.lang && config.lang !== "none") g.setLanguage(config.lang);
    else g.lang = "none";
    if (config.isColorblind !== undefined) g.isColorblind = config.isColorblind;
};

var _DataManager_onLoad = DataManager.onLoad;
DataManager.onLoad = function (object) {
    if (object === $dataSystem) if (g.lang !== "none") $dataSystem.terms = s.terms;
    _DataManager_onLoad.call(this, object);
}

var _Window_Options_addVolumeOptions = Window_Options.prototype.addVolumeOptions;
Window_Options.prototype.addVolumeOptions = function () {
    _Window_Options_addVolumeOptions.call(this);
    this.addCommand(s.language, 'lang', g.topLevelScene() === 'Scene_Title'); //We really don't want the language to change mid-game
    this.addCommand(s.colorblindMode, 'cBlind');
    this.addCommand(s.controls, 'controls');
};

//First-launch scene
function Scene_LangugeChoice() {
    this.initialize.apply(this, arguments);
}

Scene_LangugeChoice.prototype = Object.create(Scene_MenuBase.prototype);
Scene_LangugeChoice.prototype.constructor = Scene_LangugeChoice;

Scene_LangugeChoice.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_LangugeChoice.prototype.start = function () {
    console.log("Starting lang scene");
    Scene_MenuBase.prototype.start.call(this);
    let inp = g.getInterpreter();
    inp.pluginCommand('SetQuestionWindowData', ['2', '1', 'center']);
    inp.pluginCommand('SetQuestionWindowChoices', ['English,', 'Polski']);
    inp.pluginCommand('CreateQuestionWindow', ['3', g.padToLength("Choose your preferred language\n      Wybierz język gry\n", 50)]);
    this.stage = 1;
};

Scene_LangugeChoice.prototype.update = function () {
    Scene_MenuBase.prototype.update.call(this);
    let inp = g.getInterpreter();
    if (this.stage === 1 && !inp._waitMode) {
        g.setLanguage(langData.list[$gameVariables.value(3)]);
        inp.pluginCommand('SetQuestionWindowChoices', [s.yes.capitalise() + ',', s.no.capitalise()]);
        inp.pluginCommand('CreateQuestionWindow', ['3', g.padToLength(s.colorblindPrompt + '\n', 50)]);
        this.stage = 2;
    } else if (this.stage === 2 && !inp._waitMode) {
        g.isColorblind = $gameVariables.value(3) === 0;
        ConfigManager.save();
        this.popScene()
    }
}

//===================================== Custom windows =====================================

//Option description
function OptionDescriptionWindow() {
    this.initialize.apply(this, arguments);
};

OptionDescriptionWindow.prototype = Object.create(Window_Base.prototype);
OptionDescriptionWindow.prototype.constructor = OptionDescriptionWindow;

OptionDescriptionWindow.prototype.initialize = function (optionsWindow) {
    const ROW_AMOUNT = 2;
    let height = this.fittingHeight(ROW_AMOUNT) + this.textPadding() * ROW_AMOUNT;// + this.standardPadding();
    this.optionsWindow = optionsWindow;
    Window_Base.prototype.initialize.call(this, 0, Graphics.height - height, Graphics.width, height);
}

OptionDescriptionWindow.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    this.contents.clear();
    this.drawTextEx(s.optionDescriptions[this.optionsWindow.commandSymbol(this.optionsWindow.index())], this.textPadding(), 0, Graphics.width, 'center');
}

Window_Options.prototype.showControlsScreen = function () {
    let inp = g.getInterpreter();
    this.active = false;
    inp.pluginCommand('SetQuestionWindowData', ['1', '1', 'center']);
    inp.pluginCommand('SetQuestionWindowChoices', ['OK']);
    inp.pluginCommand('CreateQuestionWindow', ['3', "Hello there"]);
    //TODO re-activate it when the question window is done
}



//===================================== Loading spinner =====================================

//Creating the spinnder
Graphics._createLoadingSpinner = function () {
    const loadingSpinner = document.createElement("div");
    const loadingSpinnerImage = document.createElement("div");
    loadingSpinner.id = "loadingSpinner";
    // loadingSpinnerImage.id = "loadingSpinnerImage";
    // loadingSpinner.appendChild(loadingSpinnerImage);
    this._loadingSpinner = loadingSpinner;
};

let _Graphics_createAllElements = Graphics._createAllElements;
Graphics._createAllElements = function () {
    _Graphics_createAllElements.call(this);
    this._createLoadingSpinner();
}

//Hide it when it ends
Graphics.endLoading = function () {
    this._clearUpperCanvas();
    this._upperCanvas.style.opacity = 0;
    if (document.getElementById("loadingSpinner")) {
        document.body.removeChild(this._loadingSpinner);
    }
};

//=====================================Various engine changes=====================================

//TODO overwrite Game_Map.prototype.setup = function (mapId) {, change $dataMap.data dynamically if $dataMap.meta.dynamicCollisions is true

let _Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function (mapId) {
    _Game_Map_setup.call(this, mapId);
    if ($dataMap.meta.dynamicCollisions) {
        $dataMap.data = CollisionData[g.lang][$gameMap.mapId()];
    }
}

//Clears up things when going back to main menu
var _Scene_Title_start = Scene_Title.prototype.start;
Scene_Title.prototype.start = function () {
    _Scene_Title_start.call(this);
    if (VERBOSE_LOGS) console.log("Scene title started");
    if (g) {
        g.gameInitialised = false;
        if (g.autosaveTimeout) clearTimeout(g.autosaveTimeout);
    }
    //Language stuff
    if (g.lang === "none") {
        console.log("Starting lang selection");
        SceneManager.push(Scene_LangugeChoice);
    }
};

//Adding unpressed key support

/**
 * Checks whether a key was just released.
 * @param {String} keyName The mapped name of the key
 * @returns {Number} If the key was just released, the amount of frames it was held for. 0 otherwise.
 */
Input.isReleased = function (keyName) {
    if (this._justReleased.includes(keyName)) return Graphics.frameCount - this._pressedStartTimes[keyName];
    else return 0;
}

void ((alias) => {
    Input.initialize = function () {
        alias.call(this);
        this._pressedStartTimes = {};
    }
})(Input.initialize);

Input.update = function () {
    this._pollGamepads();
    this._justReleased = [];
    if (this._currentState[this._latestButton]) {
        this._pressedTime++;
    } else {
        this._latestButton = null;
    }
    for (var name in this._currentState) {
        if (this._currentState[name] && !this._previousState[name]) {
            this._latestButton = name;
            this._pressedTime = 0;
            this._date = Date.now();
            this._pressedStartTimes[name] = Graphics.frameCount;
        } else if (!this._currentState[name] && this._previousState[name]) {
            this._justReleased.push(name);
        }
        this._previousState[name] = this._currentState[name];
    }
    this._updateDirection();
};

//Marks the event as seen whenever it's launched
var _Game_Interpreter_setup = Game_Interpreter.prototype.setup;
Game_Interpreter.prototype.setup = function (list, eventId) {
    if (eventId) $es[eventId] = true;
    _Game_Interpreter_setup.call(this, list, eventId);
}

//Debug thingy for quitting the game with Q
Input.keyMapper["81"] = "quit"; //Setting for the 'q' key
var _Scene_Base_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function () {
    _Scene_Base_update.apply(this);
    if (MAC_DEBUG && Input.isTriggered("quit")) SceneManager.exit(); //TODO QInpit prevents this, find out why
}

//Volume settings increment change
Window_Options.prototype.volumeOffset = () => VOLUME_INCREMENT;

//Creates save titles when saving
var _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
DataManager.makeSavefileInfo = function () {
    var res = _DataManager_makeSavefileInfo.call(this);
    res.title = "";
    if (g.data.keysTotal === 0) res.title += "Początek";
    else if (g.data.keysTotal === SECRET_KEYS.length) res.title += "Wszystkie klucze!";
    else res.title += displayKeys(g.data.keysTotal);
    res.title += " | " + (new Date()).toLocaleString();
    return res;
};

//Sets the number of available saves to (effectively) 10
DataManager.maxSavefiles = () => 11;

//Hack for stopping the game interpreter from processing unless we tell it to. Required by SRD_WindowUpgrade
var _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function () {
    if (this._waitMode === 'indefinite') {
        return true;
    }
    return _Game_Interpreter_updateWaitMode.apply(this, arguments);
};

//Adds an exit command to the main menu 
Scene_Title.prototype.commandExit = function () {
    this._commandWindow.close();
    SceneManager.exit();
};

Scene_Title.prototype.commandFeedback = function () {
    switch (g.lang) {
        case "en":
            window.open("https://www.google.com"); //TODO eng feedback form
            break;
        case "pl":
            window.open("https://forums.rpgmakerweb.com/");
            break;
        default: console.error("Language is not set, but the feedback form was requested.");
    }

}


//Eval expressions inside ${}
_Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function (text, x, y) {
    const pattern = /\${([^}]*)}/; //This will match template-like strings, i.e. ${expression}
    let res = text;
    let match = res.match(pattern);
    while (match) {
        res = res.replace(pattern, eval(match[1]));
        match = res.match(pattern);
    }
    return _Window_Base_convertEscapeCharacters.call(this, res, x, y);
}

//New delay character: in messages \, works like \. but for half the time
var _Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function (code, textState) {
    switch (code) {
        case ',': this.startWait(7); break;
        default: _Window_Message_processEscapeCharacter.call(this, code, textState);
    }
}

//Allows game variables to return "" or false
Game_Variables.prototype.value = function (variableId) {
    let res = this._data[variableId];
    if (res == null) return 0;
    else return res;
};

//To be used in route commands, keeps repeating until character reaches x,y
//Function and idea by orphalese, https://forums.rpgmakerweb.com/index.php?threads/js-snippets-thread.92501/page-2
Game_Character.prototype.goto = function (x, y) {
    if (!((this.x == x) && (this.y == y))) {
        let direction = this.findDirectionTo(x, y);
        this.setDirection(direction);
        this.moveForward()
        if (this.isMovementSucceeded()) {
            this._moveRouteIndex = this._moveRouteIndex - 1;
        }
    }
}


//===================================== Engine fixes =====================================

//Fixes the blurring when going fullscreen, by KisaiTenshi. From https://forums.rpgmakerweb.com/index.php?threads/how-to-remove-blur.47504/
ImageManager.loadBitmap = function (folder, filename, hue, smooth) {
    //let doSmoothing = false;
    //if (["img/faces/", "img/pictures/"].indexOf(folder) >= 0) doSmoothing = true;

    if (filename) {
        var path = folder + encodeURIComponent(filename) + '.png';
        var bitmap = this.loadNormalBitmap(path, hue || 0);
        //if(VERBOSE_LOGS) console.log("disabling smoothing for " + path);
        bitmap.smooth = false; //TODO: choose when to smooth
        return bitmap;
    } else {
        return this.loadEmptyBitmap();
    }
}

//Fix for a rare freeze on high-refresh displays, by Kido. From https://forums.rpgmakerweb.com/index.php?threads/rpg-maker-games-graphics-will-freeze-but-sound-keeps-playing-the-problem-the-solution.151887/
//Added directly to Graphics.render

//Fix for inaccurate playtime on high-refresh displays, by Caethyril. From: https://forums.rpgmakerweb.com/index.php?threads/using-gamesystem-playtimetext-for-accurate-playtime.131810/
//Added directly to Graphics.render and SceneManager.updateScene


//===================================== Optimisations =====================================

//Always return GameFont (instead of checking for other locales we don't use)
Window_Base.prototype.standardFontFace = function () {
    return 'GameFont';
}

//Cache the mobile safari querry
Utils._mobileSafari = Utils.isMobileSafari();
Utils.isMobileSafari = function () {
    return Utils._mobileSafari;
}

//Cache the mobile device querry
Utils._mobileDevice = Utils.isMobileDevice();
Utils.isMobileDevice = function () {
    return Utils._mobileDevice;
}


/**
 * Returns the width of the specified text.
 *
 * @method measureTextWidth
 * @param {String} text The text to be measured
 * @return {Number} The width of the text in pixels
 */
/*
Bitmap.prototype.measureTextWidth = function (text) {
    var context = this._context;
    context.save();
    context.font = this._makeFontNameText();
    var width = context.measureText(text).width;
    context.restore();
    return width;
};*/

//===================================== Dev tools =====================================

//Finds the differences between two objects
g.compareObjects = function (obj1, obj2) {
    var res = {};
    for (var key in obj1) {
        if (obj1[key] !== obj2[key]) {
            res[key] = [obj1[key], obj2[key]];
        }
    }
    for (var key in obj2) {
        if (obj1[key] === undefined) {
            res[key] = [obj1[key], obj2[key]];
        }
    }
    return res;

}




//===================================== Temp experiments =====================================

/*
//Script for larger icons:
var _ImageManager_reserveSystem = ImageManager.reserveSystem;
ImageManager.reserveSystem = function(filename, hue, reservationId) {
    if(filename === "IconSet") filename = "IconSet-big";
    _ImageManager_reserveSystem.call(this, filename, hue, reservationId);
};
 
var _ImageManager_loadSystem = ImageManager.loadSystem;
ImageManager.loadSystem = function(filename, hue) {
    if(filename === "IconSet") filename = "IconSet-big";
    _ImageManager_loadSystem(this, filename, hue);
};
/*
/*Game_CharacterBase.prototype.resetPattern = function () {
    return;
};
 
Game_Event.prototype.resetPattern = function () {
    return;
};*/
/*
var _Window_Base_drawText = Window_Base.prototype.drawTextEx;
Window_Base.prototype.drawTextEx = function (text, x, y) {
    let newText = text;
    console.log("replacing 'word' with 'dorw'");
    if ($gameSwitches.value(20)) {
        console.log("replacing 'word' with 'dorw'");
        newText = newText.replace(/(?<!\w)word(?!\w)/g, "dorw");
    }
    _Window_Base_drawTextEx.call(this, newText, x, y);
}*/
/*
let _Game_Message_add = Game_Message.prototype.add;
Game_Message.prototype.add = function (text) {
    let newText = text;
    if ($gameSwitches.value(20)) {
        newText = newText.replace(/(?<!\w)word(?!\w)/g, "dorw");
    }
    _Game_Message_add.call(this, newText);
};*/

PluginManager.loadScript = () => false;