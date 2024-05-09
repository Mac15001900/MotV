/*:
 * @plugindesc (v1.0) Adds a blackjack minigame
 * @author Mac15001900
 * 
 * @param Layout
 * 
 * @param Main window width
 * @desc Width of the main window, which includes the cards. It's recommended to make it at least as wide as 4 cards.
 * @type number
 * @default 400
 * 
 * @param Main window height
 * @desc Height of the main window, which includes the cards
 * @type number
 * @default 608
 * 
 * @
 * 
 * greenish colour - 0f7d17
 * @help
 * 
 */


var Imported = Imported || {}
Imported.MAC_Blackjack = "1.0";
window.MAC_Blackjack = {};

void function ($) {

    let params = PluginManager.parameters('MAC_Blackjack');
    $.params = params;
    $.PADDING = 8;
    $.arguments = {};

    void ((alias) => {
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            alias.call(this, command, args);
            if (command.toLowerCase() === 'blackjack') {
                console.log("Blackjack command");
                $.arguments.tokens = numberValue(args[1]) || $gameParty.gold();
                SceneManager.push(Scene_Blackjack);
            }
        }
    })(Game_Interpreter.prototype.pluginCommand);

    function Window_BlackjackMain() {
        this.initialize.apply(this, arguments);
    };

    Window_BlackjackMain.prototype = Object.create(Window_Base.prototype);
    Window_BlackjackMain.prototype.constructor = Window_BlackjackMain;
    Window_BlackjackMain.prototype.initialize = function (x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
    }

    /**
     * Window for displaying the current amount of tokens or wager size
     */
    function Window_BlackjackValue() {
        this.initialize.apply(this, arguments);
    };

    Window_BlackjackValue.prototype = Object.create(Window_Base.prototype);
    Window_BlackjackValue.prototype.constructor = Window_BlackjackValue;
    Window_BlackjackValue.prototype.initialize = function (x, y, width, height, name, value, doAnimations = true) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.name = name;
        this.value = value;
        this.displayValue = value;
        this.doAnimations = doAnimations;
        this.refresh();
    }

    Window_BlackjackValue.prototype.refresh = function () {
        this.contents.clear();
        this.drawText(this.name + this.displayValue, 0, 0, this.contentsWidth(), 'center');
        Window_Base.prototype.refresh.call(this);
    }

    Window_BlackjackValue.prototype.changeTokens = function (newValue) {
        this.tokens = newValue;
        this.refresh();
    }

    Window_BlackjackValue.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        if (this.doAnimations && this.displayValue !== this.value) {
            if (Math.abs(this.displayValue - this.value) > 10) this.displayValue += (this.value - this.displayValue) / 10;
            else this.displayValue += Math.sign(this.value - this.displayValue);
            this.refresh();
        }
    }



    function Window_BlackjackInfo() {
        this.initialize.apply(this, arguments);
    };

    Window_BlackjackInfo.prototype = Object.create(Window_Base.prototype);
    Window_BlackjackInfo.prototype.constructor = Window_BlackjackInfo;
    Window_BlackjackInfo.prototype.initialize = function (x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.text = "";
    }

    Window_BlackjackInfo.prototype.refresh = function () {
        // Window_Base.prototype.refresh.call(this);
        this.contents.clear();
        console.log("Drawing " + this.text);
        this.drawText(this.text, 0, 0, this.contentsWidth(), 'center');
    }

    Window_BlackjackInfo.prototype.setText = function (text) {
        this.text = text;
        this.refresh();
    }

    Window_BlackjackInfo.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        this.refresh();
    }

    function Window_BlackjackChoice() {
        this.initialize.apply(this, arguments);
    };

    Window_BlackjackChoice.prototype = Object.create(Window_HorzCommand.prototype);
    Window_BlackjackChoice.prototype.constructor = Window_BlackjackChoice;
    Window_BlackjackChoice.prototype.initialize = function (x, y) {
        Window_HorzCommand.prototype.initialize.call(this, x, y);
        this.maxCols = () => 6;
        this.refresh();
    }

    Window_BlackjackChoice.prototype.makeCommandList = function () {
        this.addCommand("Hit", "hit");
        this.addCommand("Stand", "stand");
    }

    function Scene_Blackjack() {
        this.initialize.apply(this, arguments);
    }

    Scene_Blackjack.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Blackjack.prototype.constructor = Scene_Blackjack;

    Scene_Blackjack.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_Blackjack.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        // let basicHeight = (new Window_Base()).fittingHeight(1);

        this.helpWindow = new Window_BlackjackInfo($.PADDING, 0, Graphics.boxWidth - $.PADDING * 2, Graphics.boxHeight);
        this.helpWindow.height = this.helpWindow.fittingHeight(4);
        this.helpWindow.y = Graphics.boxHeight - this.helpWindow.height - $.PADDING;
        this.helpWindow.setText("Blackjack");
        this.helpWindow.refresh();


        this.choiceWindow = new Window_BlackjackChoice($.PADDING, 0, Graphics.boxWidth - $.PADDING * 2);
        this.choiceWindow.width = Graphics.boxWidth - $.PADDING * 2;
        this.choiceWindow.y = Graphics.boxHeight - this.helpWindow.height - this.choiceWindow.height - $.PADDING * 2;
        this.choiceWindow.refresh();

        this.mainWindow = new Window_BlackjackMain($.PADDING, $.PADDING, Graphics.boxWidth - $.PADDING * 2,
            Graphics.boxHeight - this.helpWindow.height - this.choiceWindow.height - $.PADDING * 4);
        /*this.tokenWindow = new Window_BlackjackValue($.PADDING, Graphics.boxHeight - $.PADDING - basicHeight,
            (Graphics.boxWidth - this.mainWindow.width) / 2 - $.PADDING / 2, basicHeight, "Tokens: ", 1000);
        this.wagerWindow = new Window_BlackjackValue($.PADDING, Graphics.boxHeight - $.PADDING * 2 - basicHeight * 2,
            (Graphics.boxWidth - this.mainWindow.width) / 2 - $.PADDING / 2, basicHeight, "Wager: ", 0);*/

        this.addWindow(this.mainWindow);
        // this.addWindow(this.tokenWindow);
        // this.addWindow(this.wagerWindow);
        this.addWindow(this.choiceWindow);
        this.addWindow(this.helpWindow);

        this.choiceWindow.activate();
    }


























    //--------------------- Misc utils ---------------------

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


}(MAC_Blackjack);