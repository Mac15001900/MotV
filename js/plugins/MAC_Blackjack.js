/*:
 * NOTE: This plugin is a work in progress. The basic functionality is done, but many essential features are still missing.
 *
 * @plugindesc (v0.1) Adds a blackjack minigame
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
 * 
 * 
 * nice greenish colour - 0f7d17
 * Blackjack guide: https://www.officialgamerules.org/card-games/blackjack
 * @help
 * NOTE: This plugin is a work in progress. The basic functionality is done, but many essential features are still missing.
 */


var Imported = Imported || {}
Imported.MAC_Blackjack = "1.0";
window.MAC_Blackjack = {};

void function ($) {

    const GameResult = {
        NONE: 0, //No result yet, game still in progress
        WIN: 1, //Value higher than dealer, or dealer busts; bet doubled
        BLACKJACK: 2, //Got a blackjack (and dealer didn't); bet doubled + bonus
        LOSE: 3, //Value lower than dealer; bet lost
        BUST: 4, //Busted; bet lost
        PUSH: 5, //Tie with dealer; bet returned
        SURRENDER: 6, //The player surrendered, half of the bet returned
    }

    const AnimationType = {
        ADD_PLAYER_CARD: 1,
        ADD_DEALER_CARD: 2,
        REVEAL_DEALER_CARD: 3,
        SHOW_RESULT: 4,
        HIDE_RESULT: 5,
        REMOVE_CARDS: 6,
        DELAY: 7,
    }

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
    $.aces = [0, 13, 26, 39]; //Indexes of cards that are aces (i.e. cards that are optionally +10)
    $.cardRowLength = 13;
    $.cardRows = 4;
    $.cardAmount = $.cardRows * $.cardRowLength;
    $.cardPadding = 16; //How many pixels from the edge are cards drawn

    $.roundEndTexts = {}
    $.roundEndTexts[GameResult.WIN] = "Round won\nWager doubled";
    $.roundEndTexts[GameResult.BLACKJACK] = "Blackjack!\nWager doubled and Blackjack bonus added";
    $.roundEndTexts[GameResult.LOSE] = "Round lost\nDealer had a higher value";
    $.roundEndTexts[GameResult.BUST] = "Round lost\nYou went over 21";
    $.roundEndTexts[GameResult.PUSH] = "It's a draw\nWager returned";
    $.roundEndTexts[GameResult.SURRENDER] = "Round surrendered\nHalf of the wager returned";

    $.infoTexts = {};
    $.infoTexts.wager = w => `Wager ${w} and start a new round`;
    $.infoTexts.exit = "Leave the game";
    $.infoTexts.hit = "Draw another card";
    $.infoTexts.stand = "Finish the round";
    $.infoTexts.double = "Double your wager and draw one more card.\nYou won't be able to draw more cards after that.";
    $.infoTexts.surrender = "Give up on this round and get half of your wager back.";

    $.wagerOptions = [1, 10, 50, 250];

    $.colorBest = "#2196F3";
    $.colorBust = "#B71C1C";


    void ((alias) => {
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            alias.call(this, command, args);
            if (command.toLowerCase() === 'blackjack') {
                $.arguments.tokens = numberValue(args[0]) || $gameParty.gold();
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
    Window_BlackjackMain.prototype.initialize = function (x, y, width, height, game) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.game = game;
        this.playerHand = [];
        this.dealerHand = [];
        this.ready = false; //Are card images loaded
        this.animationQueue = []; //Queue of animations to be played
        this.currentAnimation = null;
        this.animationFramesLeft = 0; //How many frames are left in the current animation
        this.dealerCardRevealed = false;
        this.roundEndTextShown = false;
        this.roundEndText = "";

        let bmp = ImageManager.loadPicture("cards");
        bmp.addLoadListener(function () {
            this.image = bmp;
            this.framesPassed = 0;
            this.cardWidth = this.image.width / ($.cardRowLength + 1);
            this.cardHeight = this.image.height / $.cardRows;
            this.tokenCounter = new Value_Component($.cardPadding, this.contentsHeight() - this.cardHeight - $.cardPadding * 2 - this.lineHeight(), "Tokens: ", game.tokens, true, true);
            this.wagerCounter = new Value_Component($.cardPadding, this.contentsHeight() - this.cardHeight - $.cardPadding * 2 - this.lineHeight() * 2, "Wager: ", 0, true, false);
            this.ready = true;
            this.refresh();
        }.bind(this));
        this.refresh();
    }

    Window_BlackjackMain.prototype.updateTone = function () {
        this.setTone($.colors.red, $.colors.green, $.colors.blue);
    }

    Window_BlackjackMain.prototype.refresh = function () {
        Window_Base.prototype.refresh.call(this);
        this.contents.clear();
        let ctx = this.contents._context;

        //Draw the background
        let gradient = ctx.createLinearGradient(0, 0, this.contentsHeight() / 4, this.contentsHeight());
        gradient.addColorStop(0, "#12991b");
        gradient.addColorStop(1, "#0c6612");
        this.contents.fillRect(0, 0, this.contentsWidth(), this.contentsHeight(), gradient);
        if (!this.image) return; //We're not ready to draw anything else yet

        //Draw the player's hand
        for (let i = 0; i < this.playerHand.length; i++) {
            let handSize = this.playerHand.length
            if (this.inAnimation(AnimationType.ADD_PLAYER_CARD)) handSize = this.between(handSize, handSize + 1);
            let y = this.contentsHeight() - this.cardHeight - $.cardPadding;
            // if (this.inAnimation(AnimationType.REMOVE_CARDS)) y = this.between(y, this.contentsHeight() + this.cardHeight * 2);
            if (this.inAnimation(AnimationType.REMOVE_CARDS)) y = this.between(y, -this.cardHeight * 2);
            this.drawCard(this.playerHand[i], this.cardX(i, handSize), y);
        }

        //Draw the dealer's hand
        for (let i = 0; i < this.dealerHand.length; i++) {
            if (i === 1 && this.inAnimation(AnimationType.REVEAL_DEALER_CARD)) continue;
            let handSize = this.dealerHand.length;
            if (this.inAnimation(AnimationType.ADD_DEALER_CARD)) handSize = this.between(handSize, handSize + 1);
            let showCard = i !== 1 || this.dealerCardRevealed;
            let y = $.cardPadding;
            if (this.inAnimation(AnimationType.REMOVE_CARDS)) y = this.between(y, -this.cardHeight * 2);
            this.drawCard(this.dealerHand[i], this.cardX(i, handSize), y, showCard);
        }

        //Draw hand values
        let oldColor = this.contents.textColor;
        if (this.playerHand.length > 0) {
            this.contents.textColor = this.valueColor(this.game.handValue(this.playerHand), oldColor);
            this.drawText(this.game.displayValue(this.playerHand), 0, this.contentsHeight() - this.cardHeight - $.cardPadding * 2 - this.lineHeight(), this.contentsWidth(), "center");
        }
        if (this.dealerHand.length > 0) {
            if (this.dealerCardRevealed) {
                this.contents.textColor = this.valueColor(this.game.handValue(this.dealerHand), oldColor);
                this.drawText(this.game.displayValue(this.dealerHand), 0, this.cardHeight + $.cardPadding * 2, this.contentsWidth(), "center");
            }
            else {
                this.contents.textColor = oldColor;
                this.drawText(this.game.displayValue([this.dealerHand[0]]) + " + ?", 0, this.cardHeight + $.cardPadding * 2, this.contentsWidth(), "center");
            }
        }
        this.contents.textColor = oldColor;

        //Draw tokens and wager
        this.tokenCounter.refresh(this, this.contents);
        this.wagerCounter.refresh(this, this.contents);

        //Draw the round end text (if present)
        if (this.roundEndTextShown) {
            let title = this.roundEndText.split('\n')[0];
            let subtitle = this.roundEndText.split('\n')[1];
            let toastWidth = Math.max(400, this.contents.measureTextWidth(subtitle) + this.lineHeight() * 2);
            let toastHeight = this.lineHeight() * 4;
            let opacity = 1;
            if (this.inAnimation(AnimationType.SHOW_RESULT)) opacity = this.between(0, 1);
            else if (this.inAnimation(AnimationType.HIDE_RESULT)) opacity = this.between(1, 0);
            // if (progress < 0.1) opacity = progress / 0.1; //Fade in
            // else if (progress > 0.85) opacity = 1 - (progress - 0.85) / 0.15; //Fade out

            //Drawing background
            this.contents.fillRect((this.contentsWidth() - toastWidth) / 2, (this.contentsHeight() - toastHeight) / 2, toastWidth, toastHeight, `rgba(0,0,0,${opacity * 0.5})`);

            //Drawing text. Default drawText doesn't support a custom opacity, so we need to do it ourselves
            ctx.save();
            let oldFontSize = this.contents.fontSize;
            this.contents.fontSize = oldFontSize * 1.5;
            this.contents.fontBold = true;
            ctx.font = this.contents._makeFontNameText();
            ctx.textAlign = "center";
            ctx.textBaseline = 'alphabetic'; //Workaround for Firefox bug 737852
            ctx.globalAlpha = opacity;
            this.contents._drawTextOutline(title, this.contentsWidth() / 2, (this.contentsHeight()) / 2 - this.lineHeight() / 4, this.contentsWidth());
            this.contents._drawTextBody(title, this.contentsWidth() / 2, (this.contentsHeight()) / 2 - this.lineHeight() / 4, this.contentsWidth());

            this.contents.fontSize = oldFontSize;
            this.contents.fontBold = false;
            if (subtitle) {
                ctx.font = this.contents._makeFontNameText();
                this.contents._drawTextOutline(subtitle, this.contentsWidth() / 2, this.contentsHeight() / 2 + this.lineHeight() * 1.25, this.contentsWidth());
                this.contents._drawTextBody(subtitle, this.contentsWidth() / 2, this.contentsHeight() / 2 + this.lineHeight() * 1.25, this.contentsWidth());
            }
            ctx.restore();
            this.contents._setDirty();
        }


        //Handle the animation (if one is active)
        if (!this.currentAnimation) return;
        switch (this.currentAnimation.type) {
            case AnimationType.ADD_PLAYER_CARD: {
                let x = this.between(this.contentsWidth() / 2, this.cardX(this.playerHand.length, this.playerHand.length + 1));
                let y = this.between(0 - this.cardHeight, this.contentsHeight() - this.cardHeight - $.cardPadding);
                let flipProgress = this.between(0, 2);
                this.drawCard(this.currentAnimation.card, x, y, flipProgress > 1, Math.abs(1 - flipProgress));
                break;
            }
            case AnimationType.ADD_DEALER_CARD: {
                let x = this.between(this.contentsWidth() / 2, this.cardX(this.dealerHand.length, this.dealerHand.length + 1));
                let y = this.between(0 - this.cardHeight, $.cardPadding);
                let flipProgress = this.dealerHand.length === 1 ? 0 : this.between(0, 2); //If it's the second card, we don't show it at all
                this.drawCard(this.currentAnimation.card, x, y, flipProgress > 1, Math.abs(1 - flipProgress));
                break;
            }
            case AnimationType.REVEAL_DEALER_CARD: {
                let flipProgress = this.between(0, 2);
                this.drawCard(this.dealerHand[1], this.cardX(1, this.dealerHand.length), $.cardPadding, flipProgress > 1, Math.abs(1 - flipProgress));
                break;
            }

        }
    }

    Window_BlackjackMain.prototype.drawCard = function (index, x, y, revealed = true, width = 1) {
        if (width * this.cardWidth < 1) return; //No need to draw it if the width is less than a pixel (and blt wouldn't like that anyway)
        let cardX = index % $.cardRowLength;
        let cardY = Math.floor(index / $.cardRowLength);
        if (!revealed) {
            cardX = $.cardRowLength;
            cardY = 1;
        }
        this.contents.blt(this.image, cardX * this.cardWidth, cardY * this.cardHeight, this.cardWidth, this.cardHeight,
            x + (1 - width) * this.cardWidth / 2, y, this.cardWidth * width);
    }

    Window_BlackjackMain.prototype.valueColor = function (value, defaultValue) {
        if (value === 21) return $.colorBest;
        if (value > 21) return $.colorBust;
        else return defaultValue;
    }

    /**
     * Calculates the X position of a card held in a hand (either the player's or the dealer's).
     * @param {Number} index Index of the card in a hand
     * @param {Number} amount How many cards are in the hand
     */
    Window_BlackjackMain.prototype.cardX = function (index, amount) {
        let x0 = this.contentsWidth() / 2 - (amount * this.cardWidth) / 2;
        let res = x0 + index * this.cardWidth;
        if (this.inAnimation(AnimationType.REMOVE_CARDS)) return this.between(res, (this.contentsWidth() - this.cardWidth) / 2);
        else return res;
    }

    Window_BlackjackMain.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        let needsRefresh = false;
        //Update counters
        if (this.tokenCounter.needsUpdate() || this.wagerCounter.needsUpdate()) {
            this.tokenCounter.update();
            this.wagerCounter.update();
            needsRefresh = true;
        }
        //Update animations
        if (this.animationFramesLeft > 0) {
            this.animationFramesLeft--;
            if (this.animationFramesLeft === 0) {
                this.handleAnimationEnd(this.currentAnimation);
                if (this.animationQueue.length > 0) this.startAnimation(this.animationQueue.shift());
                else this.currentAnimation = null;
            }
            needsRefresh = true;
        }
        //Refresh if needed
        if (needsRefresh) this.refresh();
    }

    /**
     * Enqueues a new animation to be played. An animation is an object with (at least) a 'type' and 'frames' fields.
     * Each animation will be played for the specified amount of frames, and only one will play at a time.
     * Possible 'field' values:
     * - AnimationType.ADD_PLAYER_CARD: adds a new card for the player. Requires field 'card', an integer with the card value
     * - AnimationType.ADD_DEALER_CARD: adds a new card for the dealer. Requires field 'card', an integer with the card value
     * - AnimationType.REVEAL_DEALER_CARD: reveals the dealer's second card.
     * - AnimationType.SHOW_RESULT: shows the result of the game. Requires field 'text', a string with the result text
     * - AnimationType.REMOVE_CARDS: removes all cards from the table.
     * - AnimationType.DELAY: waits for the specified amount of frames
     */
    Window_BlackjackMain.prototype.addAnimation = function (animation) {
        if (this.currentAnimation === null) {
            this.startAnimation(animation);
        } else this.animationQueue.push(animation);
    }

    Window_BlackjackMain.prototype.startAnimation = function (animation) {
        this.currentAnimation = animation;
        this.animationFramesLeft = animation.frames;
        if (animation.type === AnimationType.SHOW_RESULT) {
            this.roundEndTextShown = true;
            this.roundEndText = animation.text;
        }
    }

    /**
    * Handles custom logic at the end of some animations
    * @param {Animation} animation 
    */
    Window_BlackjackMain.prototype.handleAnimationEnd = function (animation) {
        switch (animation.type) {
            case AnimationType.ADD_PLAYER_CARD:
                this.playerHand.push(animation.card);
                break;
            case AnimationType.ADD_DEALER_CARD:
                this.dealerHand.push(animation.card);
                break;
            case AnimationType.REVEAL_DEALER_CARD:
                this.dealerCardRevealed = true;
                break;
            case AnimationType.REMOVE_CARDS:
                this.playerHand = [];
                this.dealerHand = [];
                this.dealerCardRevealed = false;
                break;
            case AnimationType.HIDE_RESULT:
                this.roundEndTextShown = false;
                this.roundEndText = "";
                break;
        }
    }

    Window_BlackjackMain.prototype.setTokenAmount = function (amount) {
        this.tokenCounter.setValue(amount)
    }

    Window_BlackjackMain.prototype.setWagerAmount = function (amount) {
        this.wagerCounter.setValue(amount)
    }

    Window_BlackjackMain.prototype.areAnimationsFinished = function () {
        return this.currentAnimation === null;
    }
    /**
     * Checks if an animation (optionally of a specified type) is currently playing
     */
    Window_BlackjackMain.prototype.inAnimation = function (type) {
        if (type === undefined) return !!this.currentAnimation;
        else return this.currentAnimation && this.currentAnimation.type === type;
    }

    /**
     * Calculates a position between a start and end value, depending on the progress of the currently active animation
     * @param {Number} start Postion at the start of the animation
     * @param {Number} end Position at the end of the animation
     */
    Window_BlackjackMain.prototype.between = function (start, end) {
        return start + (end - start) * (1 - this.animationFramesLeft / this.currentAnimation.frames);
    }

    ////--------------------- Value component ---------------------
    /**
     * Component for displaying a value, with an animation for it changing. Used for the current amount of tokens and wager size.
     */
    function Value_Component() {
        this.initialize.apply(this, arguments);
    };

    // Value_Component.prototype = Object.create(Window_Base.prototype);
    Value_Component.prototype.constructor = Value_Component;
    Value_Component.prototype.initialize = function (x, y, name, value, doAnimations = true, showChange = false) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.value = value;
        this.displayValue = value;
        this.doAnimations = doAnimations;
        this.showChange = showChange;
        this.change = 0;
    }

    Value_Component.prototype.needsUpdate = function () {
        return this.displayValue !== this.value;
    }

    Value_Component.prototype.refresh = function (parent, contents) {
        let changeDisplay = (this.change > 0 ? "+" : "") + this.change;
        if (this.change === 0) changeDisplay = "";
        parent.drawText(this.name + this.displayValue + (this.showChange ? " " + changeDisplay : ""), this.x, this.y, parent.contentsWidth(), 'left');
    }

    Value_Component.prototype.setValue = function (newValue) {
        this.change = newValue - this.value;
        this.value = newValue;
    }

    Value_Component.prototype.update = function () {
        if (this.doAnimations && this.displayValue !== this.value) {
            if (Math.abs(this.displayValue - this.value) > 20) this.displayValue += Math.round((this.value - this.displayValue) / 20);
            else this.displayValue += Math.sign(this.value - this.displayValue);

            if (this.displayValue === this.value) this.change = 0;
        }
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
        this.options = []; //A list of strings, each representing an option for the user to choose from
        this.enabledOptions = []; //A list of booleans for each options, indicating whether it's enabled
        Window_HorzCommand.prototype.initialize.call(this, x, y);
        this.maxCols = () => 6;
        this.refresh();
    }

    Window_BlackjackChoice.prototype.makeCommandList = function () {
        for (let i = 0; i < this.options.length; i++) {
            this.addCommand(this.options[i], 'ok', this.enabledOptions[i]);
        }
    }

    Window_BlackjackChoice.prototype.setOptions = function (newOptions, disableAbove, disableOptions) {
        this.options = newOptions;
        this.enabledOptions = Array(this.options.length).fill(true);
        if (Number.isInteger(disableAbove)) {
            for (let i = 0; i < this.options.length; i++) {
                this.enabledOptions[i] = !(Number(this.options[i]) > disableAbove);
            }
        }
        if (Array.isArray(disableOptions)) {
            disableOptions.forEach(i => this.enabledOptions[i] = false);
        }
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
        // this.addExtraWindowLayer();
        this.game = Game;
        this.game.initialize();
        this.inAnimation = false;
        // let basicHeight = (new Window_Base()).fittingHeight(1);

        this.helpWindow = new Window_BlackjackInfo($.PADDING, 0, Graphics.boxWidth - $.PADDING * 2, Graphics.boxHeight);
        this.helpWindow.height = this.helpWindow.fittingHeight(2);
        this.helpWindow.y = Graphics.boxHeight - this.helpWindow.height - $.PADDING;
        this.helpWindow.setText("You shouldn't see this");
        this.helpWindow.refresh();

        this.choiceWindow = new Window_BlackjackChoice($.PADDING, 0, Graphics.boxWidth - $.PADDING * 2);
        this.choiceWindow.width = Graphics.boxWidth - $.PADDING * 2;
        this.choiceWindow.y = Graphics.boxHeight - this.helpWindow.height - this.choiceWindow.height - $.PADDING * 2;
        this.choiceWindow.setHandler('ok', this.buttonSelected.bind(this));
        this.setupChoices();

        this.updateInfo()

        this.mainWindow = new Window_BlackjackMain($.PADDING, $.PADDING, Graphics.boxWidth - $.PADDING * 2,
            Graphics.boxHeight - this.helpWindow.height - this.choiceWindow.height - $.PADDING * 4, this.game);

        /*this.tokenWindow = new Value_Component($.PADDING, Graphics.boxHeight - $.PADDING - basicHeight,
            (Graphics.boxWidth - this.mainWindow.width) / 2 - $.PADDING / 2, basicHeight, "Tokens: ", 1000);
        this.wagerWindow = new Value_Component($.PADDING, Graphics.boxHeight - $.PADDING * 2 - basicHeight * 2,
            (Graphics.boxWidth - this.mainWindow.width) / 2 - $.PADDING / 2, basicHeight, "Wager: ", 0);*/

        this.addWindow(this.mainWindow);
        /*this._extraWindowLayer.addChild(this.tokenWindow);
        this._extraWindowLayer.addChild(this.wagerWindow);*/
        this.addWindow(this.choiceWindow);

        this.addWindow(this.helpWindow);


        this.choiceWindow.activate();
    }

    Scene_Blackjack.prototype.setupChoices = function () {
        switch (this.game.phase) {
            case GamePhase.PICK_WAGER:
                this.choiceWindow.setOptions($.wagerOptions.map(String).concat("Quit"), this.game.tokens);
                break;
            case GamePhase.FIRST_TURN:
                let canDouble = this.game.tokens >= this.game.wager;
                this.choiceWindow.setOptions(["Hit", "Stand", "Double", "Surrender"], null, canDouble ? [] : [2]);
                break;
            case GamePhase.OTHER_TURN:
                this.choiceWindow.setOptions(["Hit", "Stand"]);
                break;
            case GamePhase.END:
                this.choiceWindow.options = []; //Just wait for the animation here
                break;
        }
        if (this.choiceWindow.options.length <= this.choiceWindow.index()) this.choiceWindow._index = 0;
        this.choiceWindow.refresh();
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

    Scene_Blackjack.prototype.buttonSelected = function () {
        let index = this.choiceWindow.index();
        let result = null;
        switch (this.game.phase) {
            case GamePhase.PICK_WAGER:
                if (index === $.wagerOptions.length) {
                    this.popScene();
                    this.setupOutputs();
                }
                else {
                    let wager = $.wagerOptions[index]; //TODO do this properly
                    this.game.startRound(wager);
                    this.mainWindow.setWagerAmount(wager);
                    this.mainWindow.setTokenAmount(this.game.tokens);
                    if (this.mainWindow.roundEndTextShown) {
                        this.mainWindow.addAnimation({ type: AnimationType.HIDE_RESULT, frames: 10 });
                        this.mainWindow.addAnimation({ type: AnimationType.REMOVE_CARDS, frames: 20 });
                        this.mainWindow.addAnimation({ type: AnimationType.DELAY, frames: 15 });
                    }
                    for (let i = 0; i < this.game.playerHand.length; i++) {
                        this.mainWindow.addAnimation({ type: AnimationType.ADD_PLAYER_CARD, frames: 15, card: this.game.playerHand[i] });
                    }
                    for (let i = 0; i <= 1; i++) {
                        this.mainWindow.addAnimation({ type: AnimationType.ADD_DEALER_CARD, frames: 10, card: this.game.dealerHand[i] });
                    }
                    this.updateInfo();
                }
                break;
            case GamePhase.FIRST_TURN:
                if (index === 2) { //Doubling
                    this.mainWindow.setTokenAmount(this.game.tokens - this.game.wager);
                    this.mainWindow.setWagerAmount(this.game.wager * 2);
                    result = this.game.double();
                    this.mainWindow.addAnimation({ type: AnimationType.DELAY, frames: 30, card: this.game.playerHand[this.game.playerHand.length - 1] });
                    this.mainWindow.addAnimation({ type: AnimationType.ADD_PLAYER_CARD, frames: 15, card: this.game.playerHand[this.game.playerHand.length - 1] });
                    this.mainWindow.addAnimation({ type: AnimationType.DELAY, frames: 30, card: this.game.playerHand[this.game.playerHand.length - 1] });
                } else if (index === 3) {
                    this.game.surrender();
                    // this.mainWindow.setWagerAmount(this.game.wager);
                    // this.mainWindow.setTokenAmount(this.game.tokens);
                    this.mainWindow.addAnimation({ type: AnimationType.SHOW_RESULT, frames: 10, text: $.roundEndTexts[GameResult.SURRENDER] });
                }
            case GamePhase.OTHER_TURN:
                if (index === 0) {
                    result = this.game.hit();
                    this.mainWindow.addAnimation({ type: AnimationType.ADD_PLAYER_CARD, frames: 15, card: this.game.playerHand[this.game.playerHand.length - 1] });
                }
                else if (index === 1) result = this.game.stand();
                break;
            default:
                console.error("No buttons should be pressed in this phase");
        }
        if (result) this.handleRoundEnd(result);
        else this.setupChoices();
    }

    Scene_Blackjack.prototype.handleRoundEnd = function (result) {
        if (result !== GameResult.BUST) { //Reveal dealer's hand (unless the player went bust)
            this.mainWindow.addAnimation({ type: AnimationType.REVEAL_DEALER_CARD, frames: 15 });
            for (let i = 2; i < this.game.dealerHand.length; i++) {
                this.mainWindow.addAnimation({ type: AnimationType.DELAY, frames: 15 });
                this.mainWindow.addAnimation({ type: AnimationType.ADD_DEALER_CARD, frames: 15, card: this.game.dealerHand[i] });
            }
        }
        this.mainWindow.addAnimation({ type: AnimationType.DELAY, frames: 5 });
        this.mainWindow.addAnimation({ type: AnimationType.SHOW_RESULT, frames: 10, text: $.roundEndTexts[result] });
    }

    Scene_Blackjack.prototype.update = function () {
        let lastCursorIndex = this.choiceWindow.index();
        Scene_MenuBase.prototype.update.call(this);
        if (this.game.phase === GamePhase.END && !this.mainWindow.inAnimation()) { //Phase finished, move on the next round
            this.mainWindow.setTokenAmount(this.game.tokens);
            this.mainWindow.setWagerAmount(0);
            this.game.phase = GamePhase.PICK_WAGER;
            this.setupChoices();
            this.updateInfo();
        } else if (this.choiceWindow.index() !== lastCursorIndex) this.updateInfo();
    }

    Scene_Blackjack.prototype.updateInfo = function () {
        let index = this.choiceWindow.index();
        switch (this.game.phase) {
            case GamePhase.PICK_WAGER:
                if (index === $.wagerOptions.length) this.helpWindow.setText($.infoTexts.exit);
                else this.helpWindow.setText($.infoTexts.wager($.wagerOptions[index]));
                break;
            case GamePhase.FIRST_TURN:
            case GamePhase.OTHER_TURN:
                switch (index) {
                    case 0: this.helpWindow.setText($.infoTexts.hit); break;
                    case 1: this.helpWindow.setText($.infoTexts.stand); break;
                    case 2: this.helpWindow.setText($.infoTexts.double); break;
                    case 3: this.helpWindow.setText($.infoTexts.surrender); break;
                }
                break;
            default:
                this.helpWindow.setText("");
        }
    }

    Scene_Blackjack.prototype.setupOutputs = function () {

    }


    //--------------------- Game logic ---------------------

    const GamePhase = {
        PICK_WAGER: 0,
        FIRST_TURN: 1,
        OTHER_TURN: 2,
        END: 3
    }

    let Game = {};
    $.game = Game;

    Game.initialize = function (parent, luck = 0) {
        this.parent = parent;
        this.luck = luck;
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
    }

    //Triggered after all animation for the end phase are done
    Game.endRound = function () {
        this.phase = GamePhase.PICK_WAGER;

    }

    Game.makeDealerHand = function () {
        let hand = [this.drawCard(), this.drawCard()];
        while (this.handValue(hand) < 17) {
            hand.push(this.drawCard());
        }
        this.dealerValue = this.handValue(hand);
        return hand;
    }

    Game.surrender = function () {
        this.handleResult(GameResult.SURRENDER);
        this.phase = GamePhase.END;
    }

    Game.double = function () {
        this.tokens -= this.wager;
        this.wager *= 2;
        let res = this.hit();
        if (res) return res;
        else return this.stand();
    }

    Game.hit = function () {
        this.playerHand.push(this.drawCard());
        //Handle the luck system
        if (this.luck > Math.random() * 100 && this.handValue(this.playerHand) > 21 ||
            this.luck < -Math.random() * 100 && this.handValue(this.playerHand) <= 21) {
            this.deck.push(this.playerHand.pop());
            this.playerHand.push(this.deck.splice(Math.floor(Math.random() * this.deck.length), 1)[0]);
        }
        //Process the result
        this.result = this.checkHitResult();
        if (this.result) {
            this.handleResult(this.result);
            this.phase = GamePhase.END;
        } else this.phase = GamePhase.OTHER_TURN;
        return this.result;
    }

    Game.stand = function () {
        this.phase = GamePhase.END;
        let res = GameResult.NONE;
        if (this.checkHitResult()) res = this.checkHitResult();
        else {
            let playerValue = this.handValue(this.playerHand);
            if (this.dealerValue > 21) res = GameResult.WIN;
            else if (playerValue > this.dealerValue) res = GameResult.WIN;
            else if (this.dealerValue === playerValue) res = GameResult.PUSH;
            else res = GameResult.LOSE;
        }
        this.handleResult(res);
        return res;
    }

    Game.checkHitResult = function () {
        let value = this.handValue(this.playerHand);
        if (value > 21) return GameResult.BUST; //Bust
        else if (this.isBlackjack(this.playerHand)) { //Got a blackjack
            if (this.isBlackjack(this.dealerHand)) return GameResult.PUSH; //And so did the dealer
            else return GameResult.BLACKJACK; //And the dealer didn't
        } else return GameResult.NONE;
    }

    Game.handleResult = function (result) {
        if (result === GameResult.NONE) return;
        this.discard.push(...this.playerHand);
        this.discard.push(...this.dealerHand);
        switch (result) {
            case GameResult.WIN:
                this.tokens += this.wager * 2;
                break;
            case GameResult.BLACKJACK:
                this.tokens += Math.floor(this.wager * 2.5);
                break;
            case GameResult.LOSE:
                break;
            case GameResult.BUST:
                break;
            case GameResult.PUSH:
                this.tokens += this.wager;
                break;
            case GameResult.SURRENDER:
                this.tokens += Math.floor(this.wager / 2);
                break;
        }
        this.wager = 0;
    }

    //Returns the value of a hand, counting aces as their base value
    Game.baseValue = function (hand) {
        if (!hand) return 0;
        return hand.map(c => $.cardValues[c]).reduce((a, b) => a + b, 0);
    }

    //Point value for a given hand (using aces optimally)
    Game.handValue = function (hand) {
        let value = this.baseValue(hand);
        if (this.hasAce(hand) && value <= 11) value += 10;
        return value;
    }

    //Hand value as displayed to the player
    Game.displayValue = function (hand) {
        if (!hand) return "0";
        let value = this.baseValue(hand);
        if (this.hasAce(hand) && value <= 11) return `${value} / ${value + 10}`;
        else return `${value}`;
    }

    //Check if the hand contains an ace
    Game.hasAce = function (hand) {
        return hand.some(c => $.aces.includes(c));
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

    Game.printCard = function (card) {
        let number = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'][card % $.cardRowLength];
        let suit = "♥♦♣♠"[Math.floor(card / $.cardRowLength)];
        return `${number}${suit}`;
    }

    Game.printCards = function (cards) {
        return cards.map(c => this.printCard(c)).join(" ");
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