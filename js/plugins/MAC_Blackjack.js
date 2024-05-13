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
    $.PADDING = 4;
    $.arguments = {};
    $.colors = {
        red: -15,
        green: 110,
        blue: -23
    };
    $.cardValues = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,];
    $.aces = [0, 13, 26, 39];
    $.cardRowLength = 13;
    $.cardRows = 4;
    $.cardAmount = $.cardRows * $.cardRowLength;

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

    ////--------------------- Main window ---------------------
    function Window_BlackjackMain() {
        this.initialize.apply(this, arguments);
    };

    Window_BlackjackMain.prototype = Object.create(Window_Base.prototype);
    Window_BlackjackMain.prototype.constructor = Window_BlackjackMain;
    Window_BlackjackMain.prototype.initialize = function (x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.ready = false;

        let bmp = ImageManager.loadPicture("cards");
        bmp.addLoadListener(function () {
            this.image = bmp;
            this.framesPassed = 0;
            this.ready = true;
        }.bind(this));
        this.refresh();
    }

    Window_BlackjackMain.prototype.updateTone = function () {
        this.setTone($.colors.red, $.colors.green, $.colors.blue);
    }

    Window_BlackjackMain.prototype.refresh = function () {
        Window_Base.prototype.refresh.call(this);
        this.contents.clear();
        let grad1 = this.contents._context.createLinearGradient(0, 0, this.contentsHeight() / 4, this.contentsHeight());
        grad1.addColorStop(0, "#12991b");
        grad1.addColorStop(1, "#0c6612");
        this.contents.fillRect(0, 0, this.contentsWidth(), this.contentsHeight(), grad1);

    }

    ////--------------------- Value window ---------------------
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

    Window_BlackjackValue.prototype.updateTone = function () {
        this.setTone($.colors.red, $.colors.green, $.colors.blue);
    }

    ////--------------------- Info window ---------------------
    function Window_BlackjackInfo() {
        this.initialize.apply(this, arguments);
    };

    Window_BlackjackInfo.prototype = Object.create(Window_Base.prototype);
    Window_BlackjackInfo.prototype.constructor = Window_BlackjackInfo;
    Window_BlackjackInfo.prototype.initialize = function (x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.textRows = [];
    }

    Window_BlackjackInfo.prototype.refresh = function () {
        // Window_Base.prototype.refresh.call(this);
        this.contents.clear();
        for (let i = 0; i < this.textRows.length; i++) {
            this.drawText(this.textRows[i], 0, i * this.lineHeight(), this.contentsWidth(), 'center');
        }
    }

    Window_BlackjackInfo.prototype.setText = function (text) {
        this.textRows = text.split('\n');
        this.refresh();
    }

    Window_BlackjackInfo.prototype.updateTone = function () {
        this.setTone($.colors.red, $.colors.green, $.colors.blue);
    }

    ////--------------------- Choice window ---------------------
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

    Window_BlackjackChoice.prototype.updateTone = function () {
        this.setTone($.colors.red, $.colors.green, $.colors.blue);
    }

    ////--------------------- Scene ---------------------

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
        this.addExtraWindowLayer();
        // let basicHeight = (new Window_Base()).fittingHeight(1);

        this.helpWindow = new Window_BlackjackInfo($.PADDING, 0, Graphics.boxWidth - $.PADDING * 2, Graphics.boxHeight);
        this.helpWindow.height = this.helpWindow.fittingHeight(2);
        this.helpWindow.y = Graphics.boxHeight - this.helpWindow.height - $.PADDING;
        this.helpWindow.setText("Blackjack\nand tests");
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

    Scene_Blackjack.prototype.addExtraWindowLayer = function () {
        let width = Graphics.boxWidth;
        let height = Graphics.boxHeight;
        let x = (Graphics.width - width) / 2;
        let y = (Graphics.height - height) / 2;
        this._extraWindowLayer = new WindowLayer();
        this._extraWindowLayer.move(x, y, width, height);
        this.addChild(this._extraWindowLayer);
    }


    //--------------------- Game logic ---------------------

    const GamePhase = {
        PICK_WAGER: 0,
        FIRST_TURN: 1,
        OTHER_TURN: 2,
        END: 3
    }

    const GameResult = {
        NONE: 0, //No result yet, game still in progress
        WIN: 1, //Value higher than dealer, or dealer busts; bet doubled
        BLACKJACK: 2, //Got a blackjack (and dealer didn't); bet tripled
        LOSE: 3, //Value lower than dealer; bet lost
        BUST: 4, //Busted; bet lost
        PUSH: 5, //Tie with dealer; bet returned
    }

    let Game = {};
    $.game = Game;

    Game.initialize = function (parent) {
        this.parent = parent;
        this.tokens = $.arguments.tokens;
        this.wager = 0;
        this.playerHand = [];
        this.dealerHand = [];
        this.deck = [...Array($.cardAmount).keys()];
        this.shuffleArray(this.deck);
        this.discard = [];
        this.phase = GamePhase.PICK_WAGER;
    }

    Game.startRound = function (wager) {
        this.wager = wager;
        this.tokens -= wager;
        this.playerHand = [this.drawCard(), this.drawCard()];
        this.dealerHand = this.makeDealerHand();
        this.phase = GamePhase.FIRST_TURN;
        this.playerHand = [];
        this.dealerHand = [];
        this.dealerValue = 0;
    }

    Game.makeDealerHand = function () {
        let hand = [this.drawCard(), this.drawCard()];
        while (this.handValue(hand) < 17) {
            hand.push(this.drawCard());
        }
        this.dealerValue = this.handValue(hand);
    }

    Game.hit = function () {
        this.playerHand.push(this.drawCard());
        this.result = this.checkResult();
        if (this.result) {
            this.handleResult(this.result);
            this.phase = GamePhase.END;
        } else this.phase = GamePhase.OTHER_TURN;
        return this.result;
    }

    Game.stand = function () {
        this.phase = GamePhase.END;
        if (this.checkHitResult()) return this.checkHitResult();

        let playerValue = this.handValue(this.playerHand);
        if (this.dealerValue > 21) return GameResult.WIN;
        else if (this.dealerValue === playerValue) return GameResult.PUSH;
        else return GameResult.LOSE;
    }

    Game.checkHitResult = function () {
        let value = this.handValue(this.playerHand);
        if (value > 21) return GameResult.BUST; //Bust
        else if (this.isBlackjack(this.playerHand())) { //Got a blackjack
            if (this.isBlackjack(this.dealerHand())) return GameResult.PUSH; //And so did the dealer
            else return GameResult.BLACKJACK; //And the dealer didn't
        } else return GameResult.NONE;
    }

    Game.handleResult = function (result) {
        if (result === GameResult.NONE) return;
        this.wager = 0;
        this.discard.concat(this.playerHand);
        this.discard.concat(this.dealerHand);
        switch (result) {
            case GameResult.WIN:
                this.tokens += this.wager * 2;
                break;
            case GameResult.BLACKJACK:
                this.tokens += this.wager * 3;
                break;
            case GameResult.LOSE:
                break;
            case GameResult.BUST:
                break;
            case GameResult.PUSH:
                this.tokens += this.wager;
                break;
        }
    }

    //Point value for a given hand (using aces optimally)
    Game.handValue = function (hand) {
        let value = hand.map(c => $.cardValues[c]).reduce((a, b) => a + b, 0);
        if (this.hasAce(hand) && value <= 11) value += 10;
        return value;
    }

    //Hand value as displayed to the player
    Game.displayValue = function (hand) {
        let value = this.handValue(hand);
        if (this.hasAce(hand) && value <= 11) return `${value} / ${value + 10}`;
        else return `${value}`;
    }

    //Check if the hand contains an ace
    Game.hasAce = function (hand) {
        return hand.any(c => $.aces.includes(c));
    }

    //Check if the hand is a blackjack (natural 21)
    Game.isBlackjack = function (hand) {
        return this.handValue(hand) === 21 && hand.length === 2;
    }

    //Draw a card from the deck, reshuffling the discard pile if necassary
    Game.drawCard = function () {
        if (this.deck.length === 0) {
            this.deck = [...this.discard];
            this.shuffleArray(this.deck);
            this.discard = [];
        }
        console.assert(this.deck.length > 0, "No cards in deck");
        return this.deck.pop();
    }

    Game.shuffleArray = function (array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
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