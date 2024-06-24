/*:
 * @plugindesc (v1.0) Adds a blackjack minigame
 * @author Mac15001900
 * 
 * @param Mechanics
 * 
 * @param Default wager options
 * @parent Mechanics
 * @desc Default options for wager amounts, comma separated.
 * @type text
 * @default 10, 20, 50, 100
 * 
 * @param Enable side strategies
 * @parent Mechanics
 * @desc Enable the "double" and "surrender" options. If disabling them, it's recommended to increase base luck to compensate.
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @default true 
 * 
 * @param Default luck
 * @parent Mechanics
 * @type number
 * @desc Default value for luck, from -100 to 100. 0 is neutral, behaving like a real game would.
 * @default 10
 * @max 100
 * @min -100
 * 
 * @param Show luck events
 * @parent Mechanics
 * @type boolean
 * @desc Whenever luck is triggered, print what the card choices were in the console.
 * @on Enabled
 * @off Disabled
 * @default false
 * 
 * @param Always reveal dealer's hand
 * @parent Mechanics
 * @type boolean
 * @desc Always reveal what the dealer's hand was, even if the player went bust or surrendered.
 * @on Enabled
 * @off Disabled
 * @default false
 * 
 * @param Outputs
 * @desc What variables will the results of the game be written to.
 * 
 * @param Token amount
 * @parent Outputs
 * @type number
 * @desc This variable will be set to the total amount of tokens at the end of the game.
 * @default 0
 * 
 * @param Token change
 * @parent Outputs
 * @type number
 * @desc This variable will be set to the change in tokens after the game (this value can be positive or negative).
 * @default 0
 * 
 * @param Number of rounds
 * @parent Outputs
 * @type number
 * @desc This variable will be set to the total number of rounds passed.
 * @default 0
 * 
 * @param Time spent
 * @parent Outputs
 * @type number
 * @desc This variable will be set to the time spent in the game in seconds. Based on frame count.
 * @default 0
 * 
 * @param Number of rounds won
 * @parent Outputs
 * @type number
 * @desc This variable will be set to the number of rounds won.
 * @default 0
 * 
 * @param Number of blackjacks
 * @parent Outputs
 * @type number
 * @desc This variable will be set to the number of blackjacks the player got.
 * @default 0
 * 
 * @param Number of rounds lost
 * @parent Outputs
 * @type number
 * @desc This variable will be set to the number of rounds lost.
 * @default 0
 * 
 * @param Number of rounds bust
 * @parent Outputs
 * @type number
 * @desc This variable will be set to the number of rounds where the player went bust (they're also included in rounds lost).
 * @default 0
 * 
 * @param Number of rounds tied
 * @parent Outputs
 * @type number
 * @desc This variable will be set to the number of rounds that ended with a tie.
 * @default 0
 * 
 * @param Number of rounds surrendered
 * @parent Outputs
 * @type number
 * @desc This variable will be set to the number of rounds the player surrendered (those are *not* counted in any of the above).
 * @default 0
 * 
 * @param Graphics
 * 
 * @param Animation length scale
 * @parent Graphics
 * @type number
 * @desc Changes how long all animations are, as percentage of default. 50 is twice as fast, 200 is twice as slow.
 * @default 100
 * 
 * @param Layout
 * @parent Graphics
 * 
 * @param Window padding
 * @parent Layout
 * @type number
 * @default 4
 * @desc Spacing between windows, in pixels.
 * 
 * @param Card padding
 * @parent Layout
 * @type number
 * @default 16
 * @desc How many pixels from the edge of the window's contents are cards drawn.
 *  
 * @param Info window line height
 * @parent Layout
 * @type number
 * @desc Line height in the info window.
 * @default 32
 * 
 * @param Info window font size
 * @parent Layout
 * @type number
 * @desc Font size in the info window.
 * @default 24
 * 
 * @param Main window line height
 * @parent Layout
 * @type number
 * @desc Base line height in the main game's window, determining how much vertical space will text take up.
 * @default 32
 * 
 * @param Use a custom window colour
 * @parent Graphics
 * @type boolean
 * @desc Should the game's windows use a custom tint colour instead of the default.
 * @default true
 * 
 * @param Window red value
 * @parent Graphics
 * @parent Use a custom window colour
 * @type number
 * @desc The red tint of the game's windows. These work the same as the window colour you can specify in the System tab.
 * @default -15
 * @max 255
 * @min -255
 * 
 * @param Window green value
 * @parent Graphics
 * @parent Use a custom window colour
 * @type number
 * @desc The green tint of the game's windows. These work the same as the window colour you can specify in the System tab.
 * @default 110
 * @max 255
 * @min -255
 * 
 * @param Window blue value
 * @parent Graphics
 * @parent Use a custom window colour
 * @type number
 * @desc The blue tint of the game's windows. These work the same as the window colour you can specify in the System tab.
 * @default -23
 * @max 255
 * @min -255
 * 
 * @param Background
 * @parent Graphics
 * @type select
 * @option None
 * @option Gradient
 * @option Image
 * @desc What should be in the background of the main window.
 * @default Gradient
 * 
 * @param Background colour 1
 * @parent Background
 * @type text
 * @desc If using a gradient background, this is the colour in the top-left.
 * @default #12991b
 * 
 * @param Background colour 2
 * @parent Background
 * @type text
 * @desc If using a gradient background, this is the colour in the bottom-right.
 * @default #0c6612
 * 
 * @param Background image
 * @parent Background
 * @desc If using an image background, the image that will appear there.
 * @type file
 * @dir img/pictures
 * 
 * @param Colours
 * 
 * @param Value 21 colour
 * @parent Colours
 * @type text
 * @desc Colour that values will change to when they're exactly 21.
 * @default #2196F3
 * 
 * @param Bust colour
 * @parent Colours
 * @type text
 * @desc Colour that values will change to when they're above 21.
 * @default #B71C1C
 * 
 * //Round end text colours
 * 
 * @param Round lost colour
 * @parent Colours
 * @desc Colour of the title text when a round is lost.
 * @type text
 * @default #CE0400
 * 
 * @param Round won colour
 * @parent Colours
 * @type text
 * @desc Colour of the title text when a round is won.
 * @default #8EFF3C
 * 
 * @param Round won with Blackjack colour
 * @parent Colours
 * @type text
 * @desc Colour of the title text when a round is won with a Blackjack.
 * @default rainbow
 * 
 * @param Cards
 * 
 * @param Cards file
 * @parent Cards
 * @type file
 * @dir img/pictures
 * @default cards
 * @desc File with the card images. Formatting details are available in the help file.
 * 
 * @param Card values
 * @parent Cards
 * @type note
 * @default "1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,\n1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,\n1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,\n1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,\n"
 * @desc Values for each card, going from left to right, then top to bottom, comma separated.
 * 
 * @param Aces
 * @parent Cards
 * @type text
 * @default 1, 14, 27, 40
 * @desc Indexes of cards that are aces (i.e. cards that are optionally +10). Starting from 1.
 * 
 * @param Card row length
 * @parent Cards
 * @type number
 * @default 13
 * @desc How many cards are there is a single row.
 * 
 * @param Card rows
 * @parent Cards
 * @type number
 * @default 4
 * @desc How many rows of cards are there
 * 
 * @param Sounds
 * 
 * @param Sound for drawing a card
 * @parent Sounds
 * @type file
 * @dir audio/se
 * @desc Sound that will play when a card is drawn.
 * @default cardPlace
 * 
 * @param Sound for flipping a card
 * @parent Sounds
 * @type file
 * @dir audio/se
 * @desc Sound that will play when a card is flipped.
 * @default cardFlip
 * 
 * @param Sound for placing a wager
 * @parent Sounds
 * @type file
 * @dir audio/se
 * @desc Sound that will play when a wager is placed.
 * @default placeWager
 * 
 * @param Sound for collecting cards
 * @parent Sounds
 * @type file
 * @dir audio/se
 * @desc Sound that will play when all cards are collected at the end of a round.
 * @default collectCards
 * 
 * @param Sound for round won
 * @parent Sounds
 * @type file
 * @dir audio/se
 * @desc Sound that will play when a round ends with a victory.
 * @default victoryJingle
 * 
 * @param Sound for round won with blackjack
 * @parent Sounds
 * @type file
 * @dir audio/se
 * @desc Sound that will play when a round ends with a blackjack.
 * @default blackjackJingle
 * 
 * @param Sound for round lost
 * @parent Sounds
 * @type file
 * @dir audio/se
 * @desc Sound that will play when a round ends with a loss (but not from going bust).
 * @default losingJingle
 * 
 * @param Sound for round bust
 * @parent Sounds
 * @type file
 * @dir audio/se
 * @desc Sound that will play when a round ends with a bust (going over 21).
 * @default losingJingle
 * 
 * @param Sound for round push
 * @parent Sounds
 * @type file
 * @dir audio/se
 * @desc Sound that will play when a round ends with a draw.
 * @default tieJingle
 * 
 * @param Sound for round surrender
 * @parent Sounds
 * @type file
 * @dir audio/se
 * @desc Sound that will play when a round ends with a surrender.
 * @default tieJingle
 *  
 * @param Text 
 * 
 * @param Buttons
 * @parent Text
 * @desc What the text on various buttons says.
 * 
 * @param Quit button
 * @parent Buttons
 * @type text
 * @desc Text on the Quit button.
 * @default Quit
 * 
 * @param Hit button
 * @parent Buttons
 * @type text
 * @desc Text on the Hit button.
 * @default Hit
 * 
 * @param Stand button
 * @parent Buttons
 * @type text
 * @desc Text on the Stand button.
 * @default Stand
 * 
 * @param Double button
 * @parent Buttons
 * @type text
 * @desc Text on the Double button.
 * @default Double
 * 
 * @param Surrender button
 * @parent Buttons
 * @type text
 * @desc Text on the Surrender button.
 * @default Surrender 
 * 
 * @param Info window text
 * @parent Text
 * @desc Texts that will appear in the info window, describing various options
 * 
 * @param Wager description part 1
 * @parent Info window text
 * @desc Text in the info window that describes what the wager option does, appearing before the wager amount.
 * @type note
 * @default "Wager "
 * 
 * @param Wager description part 2
 * @parent Info window text
 * @desc Text in the info window that describes what the wager option does, appearing after the wager amount.
 * @type note
 * @default " tokens and start a new round"
 * 
 * @param Exit description
 * @parent Info window text
 * @desc Text in the info window that describes what the "Exit" option does.
 * @type note
 * @default "Leave the game"
 * 
 * @param Hit description
 * @parent Info window text
 * @desc Text in the info window that describes what the "Hit" option does.
 * @type note
 * @default "Draw another card"
 * 
 * @param Stand description
 * @parent Info window text
 * @desc Text in the info window that describes what the "Stand" option does.
 * @type note
 * @default "Finish the round"
 * 
 * @param Double description
 * @parent Info window text
 * @desc Text in the info window that describes what the "Double" option does.
 * @type note
 * @default "Double your wager and draw one more card.\nYou won't be able to draw more cards after that."
 * 
 * @param Surrender description
 * @parent Info window text
 * @desc Text in the info window that describes what the "Surrender" option does.
 * @type note
 * @default "Give up on this round and get half of your wager back."
 * 
 * @param Counters
 * @parent Text
 * @desc Text on the side counters.
 * 
 * @param Tokens counter text
 * @parent Counters
 * @desc Text on the counter showing the current amount of tokens.
 * @type text
 * @default Tokens: 
 * 
 * @param Wager counter text
 * @parent Counters
 * @desc Text on the counter showing the current wager size
 * @type text
 * @default Wager: 
 * 
 * @param Round end text
 * @parent Text
 * @desc Texts that are displayed at the end of a round, depending on its result.
 * 
 * @param Round end text for win
 * @parent Round end text
 * @type note
 * @desc Text that will be displayed if the round ends with a win.
 * @default "Round won\nWager doubled"
 * 
 * @param Round end text for blackjack
 * @parent Round end text
 * @type note
 * @desc Text that will be displayed if the round ends with a blackjack.
 * @default "Blackjack!\nWager doubled and Blackjack bonus added"
 * 
 * @param Round end text for lose
 * @parent Round end text
 * @type note
 * @desc Text that will be displayed if the round ends with a lose.
 * @default "Round lost\nDealer had a higher value"
 * 
 * @param Round end text for bust
 * @parent Round end text
 * @type note
 * @desc Text that will be displayed if the round ends with a bust.
 * @default "Round lost\nYou went over 21"
 * 
 * @param Round end text for push
 * @parent Round end text
 * @type note
 * @desc Text that will be displayed if the round ends with a push.
 * @default "It's a draw\nWager returned"
 * 
 * @param Round end text for surrender
 * @parent Round end text
 * @type note
 * @desc Text that will be displayed if the round ends with a surrender.
 * @default "Round surrendered\nHalf of the wager returned"
 * 
 * nice greenish colour - 0f7d17
 * Blackjack guide: https://www.officialgamerules.org/card-games/blackjack
 * ------------------------------------------------------------------------------
 * @help
 * This plugin adds a Blackjack minigame. It can be launched with a "Blackjack"
 * plugin command, which will start it using the party's gold.
 *
 * When customising the plugin, it's highly recommended that you're faimilar with
 * the rules of Blackjack. If you're not, you might find this guide helpful:
 * https://www.officialgamerules.org/card-games/blackjack
 *
 * ------------------------ Using variables and switches ------------------------
 *
 * All numerical values in the plugin commands and plugin parameters can be
 * replaced with a variable, by using the letter "v" followed by its id,
 * e.g. "v42". This will use whatever the value of that variable is when the
 * minigame is started.
 *
 * Similarly, all boolean values (true or false) can be replaced with a switch,
 * e.g. "s42".
 *
 * When using them in plugin parameters, you'll have to select the "Text" tab,
 * so that the editor will let you enter a letter.
 *
 * ----------------------------- The plugin command -----------------------------
 *
 * The Blackjack command can take 3 optional parameters:
 *
 * 1. The amount of tokens to start the game with. When using that, you'd
 * probably also want to also setup the Outputs parameters to write the new
 * amount of tokens to a variable, and deal with that after the game is done.
 * If not specified, party gold will be used, and automatically changed after.
 *
 * 2. The level of luck. It's a number from -100 to 100, determining how "lucky"
 * the player should be.
 *
 * 0 is the neutral value, behaving the same as a real game would. Note that this
 * means the player will, on average, lose money over time.
 *
 * Values above 0 represent a percentage chance that, when drawing a card, the
 * game will instead draw two cards and pick the better one (this effect is not
 * visible to the player; they only see one card being drawn). This only happens
 * with the Hit action, so starting hands keep the same chance of appearing.
 *
 * Values below 0 likewise represent the chance that, instead of drawing a card,
 * the game will draw two cards and pick the worse one.
 *
 * It's recommended to use a value slightly above 0 (e.g. 10) if you don't want
 * the player to lose money over time. You can also enable the "Show luck events"
 * parameter to have the cards are being decided between printed in console.
 *
 * 3. Wager options, or a wager multiplier. This is a list of wager sizes the
 * player will be able to choose in the game. A list should be enclosed in
 * [brackets], and separated by commas, e.g. [10,20,50,100]. Do not add spaces
 * between the values.
 * You can also use a single number (e.g. 10). This will use the default wager
 * amounts, multiplied by that number.
 *
 * All parameters are optional, but must be supplied in the order specified above
 * You can skip a parameter by replacing it with "-".
 *
 * Examples:
 * Blackjack
 * Blackjack 500
 * Blackjack v70 15 [10,100,1000]
 * Blackjack - v77 10
 * Blackjack - - [v81,v82,v83,v84]
 * Blackjack - 33
 *
 * ---------------------- Changing plugin parameters in-game --------------------
 *
 * You can change any plugin parameters during the game by using the
 * BlackjackParam command, followed by the name of the parameter and the new
 * value, using '_'  instead of spaces.
 *
 * Any parameters that use the Note format (allowing you to type multiple lines)
 * must be enclosed in "quotation marks".
 * Use can use "\n" in those parameters to add a new line.
 *
 * You can also use "color" instead of "colour" if you're used to that spelling.
 *
 * For example:
 *
 * BlackjackParam Window_red_value 75
 * BlackjackParam Enable_side_strategies false
 * BlackjackParam Enable_side_strategies s17
 * BlackjackParam Surrender_description "Give_up_on_this_round.\nYou_coward."
 * BlackjackParam Aces 1,2,3,4,5,6,7,8,9
 * BlackjackParam Background_color_1 #3344DD
 * BlackjackParam Background_colour_2 blue
 *
 * The possibilities for what you can use this for are endless. Different tables
 * with different backgrounds. Dealers with personalities that change how
 * descriptions  look like, how fast the animations are and what sounds play.
 * Or even swap between the regular deck and a completely custom one.
 *
 * Note that those changes are *not* permanent and will reset upon closing and
 * reopening the game. It's recommended to use BlackjackParam commands
 * immediately before a Blackjack command.
 *
 * ---------------------------------- Colours -----------------------------------
 *
 * All plugin parameters that require colours use CSS colours. This means that
 * you can use the #RRGGBB hex format (e.g. "#B71C1C"), common English names
 * (e.g. "white"  or "DarkSlateGray"), 0-255 RGB (e.g. "rgb(127,255,0)") etc.
 *
 * Additionally, for the text at the end of a round, "rainbow" will create an
 * animated rainbowy gradient.
 *
 * -------------------------------- Custom cards --------------------------------
 *
 * This section will describe how to customise the cards used in the game.
 *
 * The simplest way to do so is to edit the provided card image files, e.g. by
 * replacing jacks, queens and kings with characters from your world. You can
 * also make your own file, using the provided ones as reference - it can be of
 * any size,  and will automatically get "sliced" into cards, similar to
 * character sheets in the base engine.
 *
 * You can also create a completely unique fantasy/sci-fi deck that's vastly
 * different than the regular one. The "Card row length" plugin parameter decides
 * how many cards are in a single row, which "Card rows" decides how many rows
 * there are. "Card values" lists the values each card has, while "Aces" lists
 * the indexes of cards that have an optional +10 to value. These allow you to
 * create some really weird cards, like cards with a negative value, value above
 * 21, or with a value of either 5 or 15.
 *
 * Note that the total amount of columns in a file must always be one higher that
 * row length, since the last column contains the empty card and the card back
 * (jokers are currently unused).
 *
 * ----------------------------------- Terms ------------------------------------
 *
 * This plugin is available under the MIT Licence. You're free to use it in any
 * games, commercial or not, or use the code in your own plugins. Credit is
 * appreciated, but not required. If your credits include links, please link to
 * https://mac15001900.itch.io/
 * 
 * The attached asset pack is avaibale under the Creative Commons 0 licence, and
 * is free to use for any purpose with no credit. If you wish to include credits
 * for it, credit "Kenney" or "www.kenney.nl".
 *
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

    const SoundType = { //GameResult is used to identify sounds for round ending
        DRAW_CARD: 11,
        COLLECT_CARDS: 12,
        PLACE_WAGER: 13,
        FLIP_CARD: 14,
    }

    let params = PluginManager.parameters('MAC_Blackjack');
    $.params = params;
    $.arguments = {};

    void ((alias) => {
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            alias.call(this, command, args);
            if (command.toLowerCase() === 'blackjack') {
                //Set tokens
                if (args[0] === undefined || Number.isNaN(numberValue(args[0]))) {
                    $.arguments.tokens = $gameParty.gold();
                    $.usingGold = true;
                } else {
                    $.arguments.tokens = numberValue(args[0]);
                    $.usingGold = false;
                }

                //Set luck
                let luck = numberValue(args[1]);
                if (args[1] === undefined || Number.isNaN(luck)) $.arguments.luck = null;
                else $.arguments.luck = luck;

                //Set wagers
                let wagers = args[2];
                if (wagers === undefined || wagers === "-") $.arguments.wagerOptions = null;
                else {
                    console.assert(typeof wagers === 'string');
                    if (wagers[0] === '[') $.arguments.wagerOptions = numberListValue(wagers);
                    else $.arguments.wagerOptions = numberValue(wagers);
                }

                //Start the minigame
                SceneManager.push(Scene_Blackjack);

            } else if (command.toLowerCase() === 'blackjackparam') {
                let name = args[0].replace(/_/g, ' ').replace(/color/g, 'colour');
                if (typeof params[name] === 'undefined') console.warn(name + " is not an existing plugin parameter");
                params[name] = args[1].replace(/_/g, ' ');
            }
        }
    })(Game_Interpreter.prototype.pluginCommand);

    $.updateParams = function () {
        $.PADDING = numberValue(params["Window padding"]); //Padding between windows

        $.windowColors = null;
        if (booleanValue(params["Use a custom window colour"])) {
            $.windowColors = {
                red: numberValue(params["Window red value"]),
                green: numberValue(params["Window green value"]),
                blue: numberValue(params["Window blue value"]),
            };
        }

        $.infoWindowLineHeight = numberValue(params["Info window line height"]); //36 by default
        $.infoWindowFontSize = numberValue(params["Info window font size"]); //28 by default
        $.mainWindowLineHeight = numberValue(params["Main window line height"]);

        $.cardsFile = params["Cards file"];
        $.cardValues = numberListValue(JSON.parse(params["Card values"]));
        $.aces = numberListValue(params["Aces"]).map(c => c - 1); //Indexes of cards that are aces (i.e. cards that are optionally +10)
        $.cardRowLength = numberValue(params["Card row length"]);
        $.cardRows = numberValue(params["Card rows"]);
        $.cardAmount = $.cardRows * $.cardRowLength;
        $.cardPadding = numberValue(params["Card padding"]); //How many pixels from the edge are cards drawn

        $.roundEndTexts = {}
        $.roundEndTexts[GameResult.WIN] = JSON.parse(params["Round end text for win"]);
        $.roundEndTexts[GameResult.BLACKJACK] = JSON.parse(params["Round end text for blackjack"]);
        $.roundEndTexts[GameResult.LOSE] = JSON.parse(params["Round end text for lose"]);
        $.roundEndTexts[GameResult.BUST] = JSON.parse(params["Round end text for bust"]);
        $.roundEndTexts[GameResult.PUSH] = JSON.parse(params["Round end text for push"]);
        $.roundEndTexts[GameResult.SURRENDER] = JSON.parse(params["Round end text for surrender"]);

        $.infoTexts = {};
        $.infoTexts.wager = w => JSON.parse(params["Wager description part 1"]) + w + JSON.parse(params["Wager description part 2"]);
        $.infoTexts.exit = JSON.parse(params["Exit description"]);
        $.infoTexts.hit = JSON.parse(params["Hit description"]);
        $.infoTexts.stand = JSON.parse(params["Stand description"]);
        $.infoTexts.double = JSON.parse(params["Double description"]);
        $.infoTexts.surrender = JSON.parse(params["Surrender description"]);

        $.terms = {};
        $.terms.quit = params["Quit button"];
        $.terms.hit = params["Hit button"];
        $.terms.stand = params["Stand button"];
        $.terms.double = params["Double button"];
        $.terms.surrender = params["Surrender button"];
        $.terms.tokensCounter = params["Tokens counter text"];
        $.terms.wagerCounter = params["Wager counter text"];

        if ($.arguments.wagerOptions === null) $.wagerOptions = numberListValue(params["Default wager options"]);
        else if (Array.isArray($.arguments.wagerOptions)) $.wagerOptions = $.arguments.wagerOptions;
        else $.wagerOptions = numberListValue(params["Default wager options"]).map(w => w * $.arguments.wagerOptions);

        if ($.arguments.luck === null) $.luck = numberValue(params["Default luck"]);
        else $.luck = $.arguments.luck;

        $.sideStrategies = booleanValue(params["Enable side strategies"]);
        $.alwaysRevealDealer = booleanValue(params["Always reveal dealer's hand"]);
        $.showLuckEvents = booleanValue(params["Show luck events"]);

        //Value colors
        $.colorBest = params["Value 21 colour"];
        $.colorBust = params["Bust colour"];
        //Round end text colors
        $.colorLose = params["Round lost colour"];
        $.colorWin = params["Round won colour"];
        $.colorBlackjack = params["Round won with Blackjack colour"];

        $.sounds = {};
        $.sounds[SoundType.DRAW_CARD] = params["Sound for drawing a card"];
        $.sounds[SoundType.FLIP_CARD] = params["Sound for flipping a card"];
        $.sounds[SoundType.PLACE_WAGER] = params["Sound for placing a wager"];
        $.sounds[SoundType.COLLECT_CARDS] = params["Sound for collecting cards"];
        $.sounds[GameResult.WIN] = params["Sound for round won"];
        $.sounds[GameResult.BLACKJACK] = params["Sound for round won with blackjack"];
        $.sounds[GameResult.LOSE] = params["Sound for round lost"];
        $.sounds[GameResult.BUST] = params["Sound for round bust"];
        $.sounds[GameResult.PUSH] = params["Sound for round push"];
        $.sounds[GameResult.SURRENDER] = params["Sound for round surrender"];

        $.animationLength = numberValue(params["Animation length scale"]);

        $.background = params["Background"];
        $.backgroundColor1 = params["Background colour 1"];
        $.backgroundColor2 = params["Background colour 2"];
        $.backgroundImage = params["Background image"];

    }

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
        this.roundResult = GameResult.NONE;

        // this.contents.fontSize = 24;
        this.lineHeight = () => $.mainWindowLineHeight;

        let bmp = ImageManager.loadPicture($.cardsFile);
        bmp.addLoadListener(function () {
            this.image = bmp;
            this.framesPassed = 0;
            this.cardWidth = this.image.width / ($.cardRowLength + 1);
            this.cardHeight = this.image.height / $.cardRows;
            this.tokenCounter = new Value_Component($.cardPadding, this.contentsHeight() - this.cardHeight - $.cardPadding * 2 - this.lineHeight(), $.terms.tokensCounter, game.tokens, true, true);
            this.wagerCounter = new Value_Component($.cardPadding, this.contentsHeight() - this.cardHeight - $.cardPadding * 2 - this.lineHeight() * 2, $.terms.wagerCounter, 0, true, false);
            this.ready = true;
            this.refresh();
        }.bind(this));
        if ($.background === "Image") {
            let bmp2 = ImageManager.loadPicture($.backgroundImage);
            bmp2.addLoadListener(function () {
                this.backgroundImage = bmp2;
                this.refresh();
            }.bind(this));
        }
        this.refresh();
    }

    Window_BlackjackMain.prototype.refresh = function () {
        this.contents.clear();
        let ctx = this.contents._context;

        //Draw the background
        switch ($.background) {
            case "Gradient":
                let gradient = ctx.createLinearGradient(0, 0, this.contentsHeight() / 4, this.contentsHeight());
                gradient.addColorStop(0, $.backgroundColor1);
                gradient.addColorStop(1, $.backgroundColor2);
                this.contents.fillRect(0, 0, this.contentsWidth(), this.contentsHeight(), gradient);
                break;
            case "Image":
                if (!this.backgroundImage) return;
                this.contents.blt(this.backgroundImage, 0, 0, Math.min(this.contentsWidth(), this.backgroundImage.width), Math.min(this.contentsHeight(), this.backgroundImage.height), 0, 0);
                break;
            case "None":
                break;
        }

        if (!this.image) return; //We're not ready to draw anything else yet
        //Draw the player's hand
        for (let i = 0; i < this.playerHand.length; i++) {
            let handSize = this.playerHand.length
            if (this.inAnimation(AnimationType.ADD_PLAYER_CARD)) handSize = this.between(handSize, handSize + 1);
            let y = this.contentsHeight() - this.cardHeight - $.cardPadding;
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
        let shiftRight = false;
        let toastHeight = this.lineHeight() * 4;
        let valuesNewX = null;
        if (this.roundEndTextShown) { //If the round end text covers the values, shift them right
            shiftRight = this.cardHeight + $.cardPadding * 2 + this.lineHeight() > (this.contentsHeight() - toastHeight) / 2;
            if (shiftRight) {
                valuesNewX = (this.contentsWidth() + Math.max(400, this.contents.measureTextWidth(this.roundEndText.split('\n')[1] || "") + this.lineHeight() * 2)) / 2 + this.lineHeight() / 2;
            }
        }
        let oldColor = this.contents.textColor;
        if (this.playerHand.length > 0) {
            this.contents.textColor = this.valueColor(this.game.handValue(this.playerHand), oldColor);
            let y = this.contentsHeight() - this.cardHeight - $.cardPadding * 2 - this.lineHeight();
            if (shiftRight) this.drawText(this.game.displayValue(this.playerHand), valuesNewX, y, this.contentsWidth() - valuesNewX, "left");
            else this.drawText(this.game.displayValue(this.playerHand), 0, y, this.contentsWidth(), "center");
        }
        if (this.dealerHand.length > 0) {
            let drawnValue;
            if (this.dealerCardRevealed) {
                this.contents.textColor = this.valueColor(this.game.handValue(this.dealerHand), oldColor);
                drawnValue = this.game.displayValue(this.dealerHand);
            }
            else {
                this.contents.textColor = oldColor;
                drawnValue = this.game.displayValue([this.dealerHand[0]]) + " + ?";
            }
            if (shiftRight) this.drawText(drawnValue, valuesNewX, this.cardHeight + $.cardPadding * 2, this.contentsWidth() - valuesNewX, "left");
            else this.drawText(drawnValue, 0, this.cardHeight + $.cardPadding * 2, this.contentsWidth(), "center");
        }
        this.contents.textColor = oldColor;

        //Draw tokens and wager
        this.tokenCounter.refresh(this, this.contents);
        this.wagerCounter.refresh(this, this.contents);

        //Draw the round end text (if present)
        if (this.roundEndTextShown) {
            let title = this.roundEndText.split('\n')[0];
            let subtitle = this.roundEndText.split('\n')[1] || "";
            let toastWidth = Math.max(400, this.contents.measureTextWidth(subtitle) + this.lineHeight() * 2);
            let opacity = 1;
            // let rectOpacity = shiftRight ? 0.8 : 0.5; //If the round end text covers the values, make it less transparent to be more readable. No longer used, since we just move the values to the side.
            let rectOpacity = 0.5;

            if (this.inAnimation(AnimationType.SHOW_RESULT)) opacity = this.between(0, 1);
            else if (this.inAnimation(AnimationType.HIDE_RESULT)) opacity = this.between(1, 0);

            //Drawing the black background
            this.contents.fillRect((this.contentsWidth() - toastWidth) / 2, (this.contentsHeight() - toastHeight) / 2, toastWidth, toastHeight, `rgba(0,0,0,${opacity * rectOpacity})`);

            //Drawing text. Default drawText doesn't support a custom opacity, so we need to do it ourselves
            ctx.save();

            //Drawing title text
            let oldFontSize = this.contents.fontSize;
            this.contents.fontSize = oldFontSize * 1.5;
            this.contents.fontBold = true;
            ctx.font = this.contents._makeFontNameText();
            let titleLength = this.contents.measureTextWidth(title);
            let titleX = this.contentsWidth() / 2; //Those coordinates are for the *center* of text, since that's what lower-level functions expect
            let titleY = this.contentsHeight() / 2 - this.lineHeight() / 4;
            let titleColor = this.roundEndTextColor(this.roundResult, oldColor);
            if (titleColor === 'rainbow') {
                let gradient = ctx.createLinearGradient(titleX - titleLength / 2, titleY - this.lineHeight() * 0.75, titleX + titleLength / 2, titleY + this.lineHeight() * 0.75);
                this.makeRainbowGradient(gradient);
                this.contents.textColor = gradient;
                this.hasAnimatedText = true;
            } else this.contents.textColor = titleColor;
            ctx.textAlign = "center";
            ctx.textBaseline = 'alphabetic';
            ctx.globalAlpha = opacity;
            this.contents._drawTextOutline(title, titleX, titleY, this.contentsWidth());
            this.contents._drawTextBody(title, titleX, titleY, this.contentsWidth());

            //Drawing the subtitle
            this.contents.textColor = oldColor;
            this.contents.fontSize = oldFontSize;
            this.contents.fontBold = false;
            if (subtitle) {
                ctx.font = this.contents._makeFontNameText();
                this.contents._drawTextOutline(subtitle, titleX, this.contentsHeight() / 2 + this.lineHeight() * 1.25, this.contentsWidth());
                this.contents._drawTextBody(subtitle, titleX, this.contentsHeight() / 2 + this.lineHeight() * 1.25, this.contentsWidth());
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

    Window_BlackjackMain.prototype.roundEndTextColor = function (result, defaultValue) {
        switch (result) {
            case GameResult.WIN: return $.colorWin;
            case GameResult.BLACKJACK: return $.colorBlackjack;
            case GameResult.LOSE:
            case GameResult.BUST: return $.colorLose;
            case GameResult.PUSH:
            case GameResult.SURRENDER: return defaultValue;
        }
    }


    /**
     * Calculates the X position of a card held in a hand (either the player's or the dealer's).
     * @param {Number} index Index of the card in a hand
     * @param {Number} amount How many cards are in the hand
     */
    Window_BlackjackMain.prototype.cardX = function (index, amount) {
        let x0 = this.contentsWidth() / 2 - (amount * this.cardWidth) / 2;
        let cardSpacing = this.cardWidth;
        if (x0 + amount * this.cardWidth > this.contentsWidth()) {
            x0 = 0;
            cardSpacing = (this.contentsWidth() - this.cardWidth) / (amount - 1);
        }
        let res = x0 + index * cardSpacing
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
            needsRefresh = true;
        }
        if (this.inAnimation() && this.animationFramesLeft === 0) {
            this.handleAnimationEnd(this.currentAnimation);
            if (this.animationQueue.length > 0) this.startAnimation(this.animationQueue.shift());
            else this.currentAnimation = null;
            needsRefresh = true;
        }
        if (this.hasAnimatedText) needsRefresh = true;
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
     * - AnimationType.SHOW_RESULT: shows the result of the game. Requires field 'text', a string with the result text, and 'type' with the result type
     * - AnimationType.REMOVE_CARDS: removes all cards from the table.
     * - AnimationType.DELAY: does nothing, used to wait for the specified amount of frames
     */
    Window_BlackjackMain.prototype.addAnimation = function (animation) {
        if (this.currentAnimation === null) {
            this.startAnimation(animation);
        } else this.animationQueue.push(animation);
    }

    Window_BlackjackMain.prototype.startAnimation = function (animation) {
        animation.frames = Math.round(animation.frames * $.animationLength / 100);
        this.currentAnimation = animation;
        this.animationFramesLeft = animation.frames;
        switch (animation.type) {
            case AnimationType.SHOW_RESULT:
                this.roundEndTextShown = true;
                this.roundEndText = animation.text;
                this.roundResult = animation.resultType;
                this.playSound(animation.resultType);
                break;
            case AnimationType.ADD_DEALER_CARD:
            case AnimationType.ADD_PLAYER_CARD:
                this.playSound(SoundType.DRAW_CARD);
                break;
            case AnimationType.REVEAL_DEALER_CARD:
                this.playSound(SoundType.FLIP_CARD);
                break;
            case AnimationType.REMOVE_CARDS:
                this.playSound(SoundType.COLLECT_CARDS);
                break;
        }
    }

    /**
    * Handles custom logic at the end of some animations
    * @param {Animation} animation The ending animation
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
                this.hasAnimatedText = false;
                this.roundResult = GameResult.NONE;
                break;
        }
    }

    Window_BlackjackMain.prototype.playSound = function (soundType) {
        let soundName = $.sounds[soundType];
        if (!soundName) return;
        if (Array.isArray(soundName)) soundName = soundName[Math.floor(Math.random() * soundName.length)];
        AudioManager.playSe({ name: soundName, volume: 70, pitch: 100 });
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
     * Checks if an animation (of a specified type if supplied, otherwise any) is currently playing
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
        if (this.currentAnimation.frames === 0) return end;
        return start + (end - start) * (1 - this.animationFramesLeft / this.currentAnimation.frames);
    }

    Window_BlackjackMain.prototype.makeRainbowGradient = function (gradient) {
        //Colours from https://stackoverflow.com/a/63302468
        gradient.addColorStop(((Graphics.frameCount + 60 * 0.10) % 60) / 60, "rgba(255, 154, 0, 1)");
        gradient.addColorStop(((Graphics.frameCount + 60 * 0.0) % 60) / 60, "rgba(255, 0, 0, 1)");
        gradient.addColorStop(((Graphics.frameCount + 60 * 0.20) % 60) / 60, "rgba(208, 222, 33, 1)");
        gradient.addColorStop(((Graphics.frameCount + 60 * 0.30) % 60) / 60, "rgba(79, 220, 74, 1)");
        gradient.addColorStop(((Graphics.frameCount + 60 * 0.40) % 60) / 60, "rgba(63, 218, 216, 1)");
        gradient.addColorStop(((Graphics.frameCount + 60 * 0.50) % 60) / 60, "rgba(47, 201, 226, 1)");
        gradient.addColorStop(((Graphics.frameCount + 60 * 0.60) % 60) / 60, "rgba(28, 127, 238, 1)");
        gradient.addColorStop(((Graphics.frameCount + 60 * 0.70) % 60) / 60, "rgba(95, 21, 242, 1)");
        gradient.addColorStop(((Graphics.frameCount + 60 * 0.80) % 60) / 60, "rgba(186, 12, 248, 1)");
        gradient.addColorStop(((Graphics.frameCount + 60 * 0.90) % 60) / 60, "rgba(251, 7, 217, 1)");
        gradient.addColorStop(((Graphics.frameCount + 60 * 1) % 60) / 60, "rgba(255, 0, 0, 1)");
    }

    Window_BlackjackMain.prototype.brightenColor = function (colorHex, multiplier = 1) {
        console.assert(colorHex.length === 7 && colorHex[0] === '#');
        let values = [colorHex.substring(1, 3), colorHex.substring(3, 5), colorHex.substring(5, 7)].map(v => Number.parseInt(v, 16));
        let max = Math.max(...values);
        if (max * multiplier > 255) multiplier = 255 / max;
        return "#" + values.map(v => Math.floor(v * multiplier)).map(v => v.toString(16).padZero(2)).join("");
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
        this.name = name + " ";
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
        this.contents.fontSize = $.infoWindowFontSize;
        this.textRows = [];
    }

    Window_BlackjackInfo.prototype.refresh = function () {
        this.contents.clear();
        for (let i = 0; i < this.textRows.length; i++) {
            this.drawText(this.textRows[i], 0, i * this.lineHeight(), this.contentsWidth(), 'center');
        }
    }

    Window_BlackjackInfo.prototype.lineHeight = function () {
        return $.infoWindowLineHeight;
    }

    Window_BlackjackInfo.prototype.setText = function (text) {
        this.textRows = text.split('\n');
        this.refresh();
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
        this.refresh();
    }

    Window_BlackjackChoice.prototype.makeCommandList = function () {
        for (let i = 0; i < this.options.length; i++) {
            this.addCommand(this.options[i], 'ok', this.enabledOptions[i]);
        }
    }

    Window_BlackjackChoice.prototype.maxCols = function () {
        return this.options.length || 1; //Things break a bit if this ever returns 0
    }

    /**
     * Sets the options for the player to choose from.
     * @param {Array<String>} newOptions List of options the player can choose from
     * @param {Number} disableAbove A number such that all numerical options above it will be disabled
     * @param {Array<Number>} disableOptions A list of indices of options to disable
     */
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

    ////--------------------- Setting updateTone ---------------------

    let customUpdateTone = function () {
        if ($.windowColors) this.setTone($.windowColors.red, $.windowColors.green, $.windowColors.blue);
        else this.setTone($gameSystem.windowTone()[0], $gameSystem.windowTone()[1], $gameSystem.windowTone()[2]);
    }

    Window_BlackjackMain.prototype.updateTone = customUpdateTone;
    Window_BlackjackChoice.prototype.updateTone = customUpdateTone;
    Window_BlackjackInfo.prototype.updateTone = customUpdateTone;

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
        $.updateParams();
        this.stats = {
            rounds: 0,
            startTime: Graphics.frameCount,
            roundResults: [],
        };
        Scene_MenuBase.prototype.create.call(this);
        this.game = Game;
        this.game.initialize($.luck);
        this.inAnimation = false;

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

        this.updateInfo();

        this.mainWindow = new Window_BlackjackMain($.PADDING, $.PADDING, Graphics.boxWidth - $.PADDING * 2,
            Graphics.boxHeight - this.helpWindow.height - this.choiceWindow.height - $.PADDING * 4, this.game);

        this.addWindow(this.mainWindow);
        this.addWindow(this.choiceWindow);
        this.addWindow(this.helpWindow);

        this.choiceWindow.activate();
    }

    Scene_Blackjack.prototype.setupChoices = function () {
        switch (this.game.phase) {
            case GamePhase.PICK_WAGER:
                if ($.wagerOptions.length === 1) this.choiceWindow.setOptions([String($.wagerOptions[0]), $.terms.quit], this.game.tokens);
                else if ($.wagerOptions.length > 1) this.choiceWindow.setOptions($.wagerOptions.map(String).concat($.terms.quit), this.game.tokens);
                else console.error("MAC_Blackjack: No wager options found");
                break;
            case GamePhase.FIRST_TURN:
                if ($.sideStrategies) {
                    let canDouble = this.game.tokens >= this.game.wager;
                    this.choiceWindow.setOptions([$.terms.hit, $.terms.stand, $.terms.double, $.terms.surrender], null, canDouble ? [] : [2]);
                } else {
                    this.choiceWindow.setOptions([$.terms.hit, $.terms.stand]);
                }
                break;
            case GamePhase.OTHER_TURN:
                this.choiceWindow.setOptions([$.terms.hit, $.terms.stand]);
                break;
            case GamePhase.END:
                this.choiceWindow.options = []; //Just wait for the animation here
                break;
        }
        if (this.choiceWindow.options.length <= this.choiceWindow.index()) this.choiceWindow._index = 0;
        this.choiceWindow.refresh();
        this.choiceWindow.activate();
        this.updateInfo();
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
                    this.setupOutputs();
                    if ($.usingGold) $gameParty.gainGold(this.game.tokens - $.arguments.tokens);
                    this.popScene();
                }
                else {
                    let wager = $.wagerOptions[index];
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
                    this.mainWindow.addAnimation({ type: AnimationType.ADD_DEALER_CARD, frames: 10, card: this.game.dealerHand[0] });
                    this.mainWindow.addAnimation({ type: AnimationType.DELAY, frames: 5 }); //Since dealer's animations are shorter, we wait to make sure the sound has the same delay
                    this.mainWindow.addAnimation({ type: AnimationType.ADD_DEALER_CARD, frames: 10, card: this.game.dealerHand[1] });
                    this.lastSelectedBidIndex = index;
                    this.choiceWindow._index = 0;
                    this.updateInfo();
                }
                break;
            case GamePhase.FIRST_TURN:
            case GamePhase.OTHER_TURN:
                switch (index) {
                    case 0: //Hit
                        result = this.game.hit();
                        this.mainWindow.addAnimation({ type: AnimationType.ADD_PLAYER_CARD, frames: 15, card: this.game.playerHand[this.game.playerHand.length - 1] });
                        break;
                    case 1: //Stand
                        result = this.game.stand();
                        break;
                    case 2: //Double
                        this.mainWindow.setTokenAmount(this.game.tokens - this.game.wager);
                        this.mainWindow.setWagerAmount(this.game.wager * 2);
                        result = this.game.double();
                        this.mainWindow.addAnimation({ type: AnimationType.DELAY, frames: 30, card: this.game.playerHand[this.game.playerHand.length - 1] });
                        this.mainWindow.addAnimation({ type: AnimationType.ADD_PLAYER_CARD, frames: 15, card: this.game.playerHand[this.game.playerHand.length - 1] });
                        this.mainWindow.addAnimation({ type: AnimationType.DELAY, frames: 15, card: this.game.playerHand[this.game.playerHand.length - 1] });
                        break;
                    case 3: //Surrender
                        result = this.game.surrender();
                        break;
                }
                break;
            default:
                console.error("No buttons should be pressed in this phase");
        }
        if (result) this.handleRoundEnd(result);
        else this.setupChoices();
    }

    Scene_Blackjack.prototype.handleRoundEnd = function (result) {
        this.stats.rounds++;
        if (!this.stats.roundResults[result]) this.stats.roundResults[result] = 1;
        else this.stats.roundResults[result]++;

        if (result !== GameResult.BUST && result !== GameResult.SURRENDER || $.alwaysRevealDealer) { //Reveal dealer's hand (unless the player went bust or surrendered)
            this.mainWindow.addAnimation({ type: AnimationType.REVEAL_DEALER_CARD, frames: 15 });
            for (let i = 2; i < this.game.dealerHand.length; i++) {
                this.mainWindow.addAnimation({ type: AnimationType.DELAY, frames: 15 });
                this.mainWindow.addAnimation({ type: AnimationType.ADD_DEALER_CARD, frames: 15, card: this.game.dealerHand[i] });
            }
        }
        this.mainWindow.addAnimation({ type: AnimationType.DELAY, frames: 5 });
        this.mainWindow.addAnimation({ type: AnimationType.SHOW_RESULT, frames: 10, text: $.roundEndTexts[result], resultType: result });
    }

    Scene_Blackjack.prototype.update = function () {
        let lastCursorIndex = this.choiceWindow.index();
        Scene_MenuBase.prototype.update.call(this);
        if (this.game.phase === GamePhase.END && !this.mainWindow.inAnimation()) { //Phase finished, move on to the next round
            this.mainWindow.setTokenAmount(this.game.tokens);
            this.mainWindow.setWagerAmount(0);
            this.game.phase = GamePhase.PICK_WAGER;
            this.choiceWindow._index = this.lastSelectedBidIndex;
            this.setupChoices();
            this.updateInfo();
        } else if (this.choiceWindow.index() !== lastCursorIndex) this.updateInfo();
    }

    Scene_Blackjack.prototype.updateInfo = function () {
        this.helpWindow.setText(this.getHelpText(this.choiceWindow.index(), this.game.phase));
    }

    Scene_Blackjack.prototype.getHelpText = function (optionIndex, gamePhase) {
        switch (gamePhase) {
            case GamePhase.PICK_WAGER:
                if (optionIndex === $.wagerOptions.length) return $.infoTexts.exit;
                else return $.infoTexts.wager($.wagerOptions[optionIndex]);
            case GamePhase.FIRST_TURN:
            case GamePhase.OTHER_TURN:
                switch (optionIndex) {
                    case 0: return $.infoTexts.hit;
                    case 1: return $.infoTexts.stand;
                    case 2: return $.infoTexts.double;
                    case 3: return $.infoTexts.surrender;
                }
            default: return "";
        }
    }

    Scene_Blackjack.prototype.setupOutputs = function () {
        let results = this.stats.roundResults;
        let outputs = [
            ["Token amount", this.game.tokens],
            ["Token change", this.game.tokens - $.arguments.tokens],
            ["Number of rounds", this.stats.rounds],
            ["Time spent", Math.floor((Graphics.frameCount - this.stats.startTime) / 60)],
            ["Number of rounds won", results[GameResult.WIN] + results[GameResult.BLACKJACK]],
            ["Number of blackjacks", results[GameResult.BLACKJACK]],
            ["Number of rounds lost", results[GameResult.LOSE] + results[GameResult.BUST]],
            ["Number of rounds bust", results[GameResult.BUST]],
            ["Number of rounds tied", results[GameResult.PUSH]],
            ["Number of rounds surrendered", results[GameResult.SURRENDER]],
        ];
        for (let i = 0; i < outputs.length; i++) {
            let variableIndex = numberValue(params[outputs[i][0]]);
            if (variableIndex > 0) $gameVariables.setValue(variableIndex, outputs[i][1] || 0);
        }
    }


    //--------------------- Game logic ---------------------

    const GamePhase = {
        PICK_WAGER: 0,
        FIRST_TURN: 1, //The first turn, when picking a side strategy is still possible
        OTHER_TURN: 2, //Any other turn after the first one
        END: 3
    }

    let Game = {};
    $.game = Game;

    Game.initialize = function (luck = 0) {
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
        return GameResult.SURRENDER;
    }

    Game.double = function () {
        this.tokens -= this.wager;
        this.wager *= 2;
        let res = this.hit();
        if (res) return res;
        else return this.stand();
    }

    Game.hit = function () {
        let newCard = this.drawCard();
        //Handle the luck system
        if (Math.abs(this.luck) > Math.random() * 100 && this.deck.length > 0) { //If luck triggers, draw another card, and swap to it if it's better (or if it's worse on negative luck)
            let index = Math.floor(Math.random() * this.deck.length);
            if ($.showLuckEvents) console.log(`${this.luck > 0 ? "Good" : "Bad"} luck triggered! Deciding between ${this.printCard(newCard)} and ${this.printCard(this.deck[index])}`);
            if (this.isCardBetter(this.deck[index], newCard, this.playerHand) === this.luck > 0) {
                let otherCard = this.deck.splice(index, 1)[0];
                this.shuffleInto(newCard, this.deck);
                newCard = otherCard;
            }
        }
        //Process the result
        this.playerHand.push(newCard);
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

    //Checks if adding card1 to a given hand is better than adding card2 ("better" meaning simply that hand value would be larger, without going bust)
    Game.isCardBetter = function (card1, card2, hand) {
        let value1 = this.handValue([...hand, card1]);
        let value2 = this.handValue([...hand, card2]);
        if (value1 > 21) return false;
        else if (value2 > 21) return true;
        else return value1 > value2;
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

    //Check if a hand contains an ace
    Game.hasAce = function (hand) {
        return hand.some(c => $.aces.includes(c));
    }

    //Check if a hand is a blackjack (natural 21)
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

    //Inserts a card into a random spot in the deck
    Game.shuffleInto = function (card, array) {
        let index = Math.floor(Math.random() * array.length);
        array.splice(index, 0, card);
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

    /**
    * Converts a string (from plugin parameters or commands) to a boolean, regardless if that string contains a boolean literal of a switch indentifier
    * @param {String|Boolean} string A boolean or switch indentifier (in the form s42 or s0042)
    * @returns The string converted to a boolean
    */
    booleanValue = function (string) {
        if (typeof string === "boolean") return string;
        if (!string || string.length === 0) return false;
        if (string[0] === 's') return $gameSwitches.value(Number(string.replace(/^s0*/, '')));
        else return string === "true";
    }

    /**
    * Converts a string (from plugin parameters or commands) to a list of numbers. 
    * @param {String} string A list of comma-separated numbers. Whitespace, as well as "[" and "]" characters are ignored.
    * @returns The string converted to a list of numbers
    */
    numberListValue = function (string) {
        if (!string) return [];
        return string.replace(/[\[\]\s\n]/g, "").split(",").filter(s => s.length > 0).map(numberValue);
    }


}(MAC_Blackjack);