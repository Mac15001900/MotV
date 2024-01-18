/*:
 * @plugindesc Adds a simple sudoku minigame
 * @author Plugin by Mac15001900, puzzle generator by Mucahidyazar
 * 
 * 
 * @param Outputs
 * 
 * @param Victory
 * @desc Switch with this number will be set to ON if the puzzle is successfully completed, and to OFF is the player gives up.
 * @type number
 * @parent Outputs
 * @default 0
 * 
 * @param Total seconds
 * @desc Variable with this number will be set to the total amount of seconds the player spent in the puzzle.
 * @type number
 * @parent Outputs
 * @default 0
 * 
 * @param Display seconds
 * @desc Variable with this number will be set to amount of seconds on the clock (between 0 and 59) when the player finished the puzzle.
 * @type number
 * @parent Outputs
 * @default 0
 * 
 * @param Display minutes
 * @desc Variable with this number will be set to amount of minutes on the clock (between 0 and 59) when the player finished the puzzle.
 * @type number
 * @parent Outputs
 * @default 0
 * 
 * @param Display hours
 * @desc Variable with this number will be set to amount of hours it took  the player to finish the puzzle.
 * @type number
 * @parent Outputs
 * @default 0
 * 
 * @param Display
 * 
 * @param Draw window
 * @desc Whether to draw a regular window behind the puzzle.
 * @type boolean
 * @default true
 * @on yes
 * @off no
 * @parent Display
 * 
 * @param Background image
 * @desc Name of the image in the pictures folder to use as a background. Leave empty to not use any.
 * @type text
 * @default 
 * @parent Display
 * 
 * @param Cell size
 * @desc The width (and height) of a single cell in the grid, in pixels. The entire grid will be 9 times larger.
 * @type number
 * @default 64
 * @parent Display
 * 
 * @param Colours
 * 
 * @param Player digits
 * @desc Default colour of digits inserted by the player
 * @type text
 * @parent Colours
 * @default white
 * 
 * @param Clue digits
 * @desc Default colour of given clue digits
 * @type text
 * @parent Colours
 * @default aqua 
 * 
 * @param Icorrect player digits
 * @desc Colour of player-inserted digits that conflict with other digits
 * @type text
 * @parent Colours
 * @default red
 * 
 * @param Icorrect clue digits
 * @desc Colour of given clue digits that conflict with player's digits
 * @type text
 * @parent Colours
 * @default chocolate
 * 
 * @param Victory digits
 * @desc All digits will change their colour into this one when the puzzle is solved
 * @type text
 * @parent Colours
 * @default chartreuse 
 * 
 * @param Lines
 * @desc Colour of the lines that make of the sudoku grid
 * @type text
 * @parent Colours
 * @default white 
 * 
 * @param Other
 * 
  * @param Exit text
 * @desc Text on the exit button
 * @type text
 * @default Exit
 * @parent Other
 * 
 * @param Cancel text
 * @desc Text on the button to cancel leaving the puzzle
 * @type text
 * @default Cancel
 * @parent Other
 * 
 * @param Use number keys
 * @desc Should the plugin allow regular number keys to be used to input digits
 * @type boolean
 * @default true
 * @on Yes
 * @off No 
 * @parent Other
 * 
 * @param Use numpad keys
 * @desc Should the plugin allow numpad number keys to  be used to input digits
 * @type boolean
 * @default true
 * @on Yes
 * @off No
 * @parent Other
 * 
 * @param Victory music
 * @desc The music effect that will play upon victory
 * @type text
 * @default Victory1
 * @parent Other
 * 
 * 
 * @help
 * This plugin adds a simple sudoku minigame.                                      
 * To start it, simply use the plugin command SimpleSudoku, followed by either a
 * difficulty to generate a puzzle for or a puzzle to use.
 * 
 * If you want a puzzle to be generated, use a number between 1 and 5 to indicate
 * the difficulty. Higher numbers produce higher puzzles. Recommended values are
 * between 1 and 3. 4 and 5 take considerably longer to generate, and solving such
 * difficult puzzles with such a simple interface without pencil marks might be
 * somewhat annoying for the players.
 * 
 * Example: SimpleSudoku 2
 * 
 * To use an existing puzzle, specify it using a string of 81 characters, 
 * representing all sudoku cells, going from left to right, and then top to bottom 
 * (i.e. the first 9 characters represent the first row, then 10-18 the second row).
 * You can use any character other than space to represent empty cells.
 * 
 * Examples: 
 * SimpleSudoku 2.7....8693.1.6......2.79.5..9.53.61.5.8614.9.6142..5.3.2594..8.9...837...8.7..9.
 * SimpleSudoku 001000400352400891407090050903025604005674903004000025000230700030706518740010009
 * 
 * Both a difficulty level and a puzzle can instead be specified with a variable,
 * using the letter 'v' and its id. The value of that variable will then be
 * used as the argument.
 * 
 * Example: SimpleSudoku v42
 * 
 * 
 * After the player either gives up or solves the puzzle, the results are stored
 * in variables and a switch that you need to choose in the plugin options.
 * 
 * Notably, total seconds is the total amount of seconds spent on the puzzle
 * (e.g. 900 if the player spent 15 minutes), and is useful for conditional branches,
 * e.g. if that value is less than 900, the puzzle was completed in under 15 minutes.
 * Display seconds is the amount you might want to display to the player, and only
 * has values between 0 and 59 - to tell the player what their time was, you'll
 * need both display minutes and seconds (and potentially hours).
 * 
 * -----------------------------------------------------------------------------------
 * 
 * Dynamic puzzle generation in this plugin is powered by the node-sudoku package, 
 * created by Mucahidyazar and available under the MIT Licence.
 * You can learn more about it here: https://www.npmjs.com/package/node-sudoku
 * 
 * This plugin is available under the MIT Licence. You're free to use it in any 
 * games, commercial or not, or use the code in your own plugins. Credit is 
 * appreciated, but not required. If including credits, please remember to also
 * credit Mucahidyazar for making the puzzle generator!
 * 
 */

var Imported = Imported || {}
Imported.MAC_SimpleSudoku = "1.0";

/**
 * The global object MAC_SimpleSudoku can be used by other plugins to access various things.
 * It contains the following properties:
 * currentWindow - the currently active Window_Sudoku window, or null if no puzzle is currently active
 * scene - the last active Scene_Sudoku scene
 * sudokuJs - sudoku generator, created by Mucahidyazar. More info here https://www.npmjs.com/package/node-sudoku
 * solve - Show the solution to a provided puzzle (same format as for the plugin, but it must use '.' for empty cells)
 * printSolution - Shows the solution to the currently active puzzle
 * getPuzzle - Returns the current puzzle
 * printPuzzle - Nicely prints the current puzzle
 */
window.MAC_SimpleSudoku = {
    currentWindow: null,
    scene: null,
    sudokuJs: null,
}

void function () {

    var params = PluginManager.parameters('MAC_SimpleSudoku');
    var currentWindow = null;
    var puzzleArgument = null;
    const VICTORY_DURATION = 60 * 6; //How long to keep the puzzle open after victory, in frames

    //Adding things to the interface object
    window.MAC_SimpleSudoku.sudokuJs = sudokuJs;
    window.MAC_SimpleSudoku.solve = function (puzzle) {
        console.log(solve(puzzle, { strict: true, emptyHoleChar: '.', as: 'string' }).replace(/(.........)/g, "$1\n"));
    }
    window.MAC_SimpleSudoku.printSolution = function () {
        if (currentWindow) console.log(solve(currentWindow.values.map((v, i) => currentWindow.givens[i] ? v : 0), { strict: true, emptyHoleChar: '0', as: 'string' }).replace(/(.........)/g, "$1\n"));
        else console.warn("No window active");
    }
    window.MAC_SimpleSudoku.getPuzzle = function () {
        if (this.currentWindow) return this.currentWindow.values.map((x, index) => this.currentWindow.givens[index] ? x : 0).map(x => x === 0 ? '.' : x + "").join("")
        else console.warn("No window active");
    }
    window.MAC_SimpleSudoku.printPuzzle = function () {
        if (this.currentWindow) console.log(this.getPuzzle().replace(/(.........)/g, "$1\n"));
        else console.warn("No window active");
    }

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (['simplesudoku'].includes(command.toLowerCase())) {
            console.log("MAC_SimpleSudoku: Sudoku command detected.");
            if (args.length === 0) throw new Error("MAC_SimpleSudoku: At least one argument is required.");
            puzzleArgument = args[0];
            SceneManager.push(Scene_Sudoku);

        }
    };

    //Listening for keypresses
    if (params["Use number keys"] || params["Use numpad keys"]) {
        document.addEventListener('keydown', function (event) {
            if (!currentWindow) return;
            if (params["Use number keys"] === "true" && event.code.substring(0, 5) === "Digit") {
                currentWindow.inputDigit(Number(event.code.substring(5)));
            } else if (params["Use numpad keys"] === "true" && event.code.substring(0, 6) === "Numpad") {
                currentWindow.inputDigit(Number(event.code.substring(6)));
            }
        });
    }


    //Sudoku window
    function Window_Sudoku() {
        this.initialize.apply(this, arguments);
    };

    const CELL_SIZE = Number(params["Cell size"]);

    Window_Sudoku.prototype = Object.create(Window_Command.prototype);
    Window_Sudoku.prototype.constructor = Window_Sudoku;
    Window_Sudoku.prototype.initialize = function (puzzle) {
        //Initialise some values
        this.values = Array(81).fill(0);
        this.givens = Array(81).fill(true); //We start with everything being a given, so the player can't change the board before it's generated
        this.generated = false;
        this.sudoku = null; //If it's null then it hasn't finished generating yet
        this.framesPassed = 0;

        //Parse or generate a puzzle
        if (puzzle[0] === 'v' && puzzle.length <= 10) puzzle = $gameVariables.value(Number(puzzle.substr(1))); //If the argument is a variable, get its value
        if (puzzle.length > 10) {
            if (puzzle.length !== 81) throw new Error("MAC_SimpleSudoku: Puzzle must be exactly 81 characters long. " + puzzle.length + " characters were provided.");
            for (let i = 0; i < 81; i++) {
                if (!"123456789".includes(puzzle[i])) {
                    this.values[i] = 0;
                    this.givens[i] = false;
                }
                else this.values[i] = Number(puzzle[i]);

            }
        } else if ("12345".includes(puzzle)) {
            let self = this; //Evil reference hack
            sudokuJs({ level: Number(puzzle) }).then(sudoku => { self.sudoku = sudoku });
        } else {
            throw new Error(`MAC_SimpleSudoku: Invalid puzzle argument ${puzzle}. Must be a either a number 1-5, a string of length 81, or a variable ID.`);

        }

        Window_Command.prototype.initialize.call(this, 0, 0);
        this.height = CELL_SIZE * 9 + this.standardPadding() * 2;
        this.x = Graphics.boxWidth / 2 - this.width / 2;
        this.y = Graphics.boxHeight / 2 - this.height / 2;

        if (params["Draw window"] === "false") {
            this.opacity = 0;
            this.contentsOpacity = 255;
        }

        this.refresh();
        this.activate();
        this.select(0);
        if (params["Background image"].length > 0) {
            let bmp = ImageManager.loadPicture(params["Background image"]);
            bmp.addLoadListener(function () {
                this.image = bmp;
                this.refresh();
            }.bind(this));
        }
        currentWindow = this;
        window.MAC_SimpleSudoku.currentWindow = this;
        window.MAC_SimpleSudoku.scene = SceneManager._scene;
    };

    //All commands call the same handler - we're using index() to tell which cell was picked
    Window_Sudoku.prototype.makeCommandList = function () {
        for (let i = 0; i < 81; i++) {
            this.addCommand(i + 1, 'ok', true, i);
        }
    }

    //Simple layout changes
    Window_Sudoku.prototype.maxCols = function () {
        return 9;
    };

    Window_Sudoku.prototype.spacing = function () {
        return 1;
    };

    Window_Sudoku.prototype.itemTextAlign = function () {
        return 'center';
    };

    Window_Sudoku.prototype.itemHeight = function () {
        return CELL_SIZE;
    };

    Window_Sudoku.prototype.windowWidth = function () {
        return CELL_SIZE * 9 + this.standardPadding() * 2;
    };

    Window_Sudoku.prototype.update = function () {
        Window_Command.prototype.update.call(this);
        this.framesPassed++;
        if (!this.generated && this.sudoku) { //If the puzzle just finished generating
            this.values = this.sudoku.board.map(x => x === '.' ? 0 : x);
            this.givens = this.sudoku.board.map(x => x !== '.');
            this.generated = true;
            this.refresh();
        }
        if (this.victory) { //After victory, increment victorySteps for the final animation
            if (!this.victorySteps) this.victorySteps = 0;
            this.victorySteps++;
            if (this.victorySteps === VICTORY_DURATION) {
                setTimeout(() => SceneManager.pop(), 200); //Only quit the scene after the window had the chance to play the closing animation
                currentWindow = null;
                this.close();
            }
            else this.refresh();
        }
    }

    //Not calling super here because we want to change the order things are drawn in - clear first, then draw the background, only then default elements and later custom lines.
    //Super bundles clearing and drawing default elements, so instead it's just reimplemented here.
    Window_Sudoku.prototype.refresh = function () {
        //Reimplementing super
        this.clearCommandList();
        this.makeCommandList();
        this.createContents();
        if (!this.contents) return;
        this.contents.clear();
        //Drawing the background
        if (this.image) {
            this.contents.blt(this.image, 0, 0, this.image.width, this.image.height, 0, 0, this.image.width, this.image.height);
        }
        //Drawing default items (digits is our case)
        this.drawAllItems();

        //Drawing the lines between cells and boxes
        let ctx = this.contents._context;
        ctx.beginPath();
        ctx.lineWidth = 2;
        //Draw vertical lines
        for (let i = 0; i <= 9; i++) {
            ctx.moveTo(i * CELL_SIZE, 0);
            ctx.lineTo(i * CELL_SIZE, this.height);
        }
        //Draw horizontal lines
        for (let i = 0; i <= 9; i++) {
            ctx.moveTo(0, i * CELL_SIZE);
            ctx.lineTo(this.width, i * CELL_SIZE);
        }
        ctx.strokeStyle = params["Lines"];
        ctx.stroke();
        //Draw thicker lines between boxes
        ctx.beginPath();
        ctx.lineWidth = 5;
        for (let i = 0; i <= 3; i++) {
            ctx.moveTo(i * CELL_SIZE * 3, 0);
            ctx.lineTo(i * CELL_SIZE * 3, this.height);
        }
        for (let i = 0; i <= 3; i++) {
            ctx.moveTo(0, i * CELL_SIZE * 3);
            ctx.lineTo(this.width, i * CELL_SIZE * 3);
        }
        ctx.stroke();
    }

    //Overwriting drawItem to change text colour and position it in the centre of a cell
    Window_Sudoku.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        if (this.checkForConflicts(index) === true)
            this.contents.textColor = this.givens[index] ? params["Icorrect clue digits"] : params["Icorrect player digits"];
        else
            this.contents.textColor = this.givens[index] ? params["Clue digits"] : params["Player digits"];

        if (this.victory && this.victorySteps / 15 > index % 9 + Math.floor(index / 9)) this.contents.textColor = params["Victory digits"];
        if (this.values[index] > 0) this.drawText(this.values[index], rect.x, rect.y + (CELL_SIZE - this.standardFontSize()) / 2, rect.width, align);
    };

    //Overwriting this to change the order parts are added and make sure the cursor is on top. Otherwise it would render below the background.
    Window_Sudoku.prototype._createAllParts = function () {
        this._windowSpriteContainer = new PIXI.Container();
        this._windowBackSprite = new Sprite();
        this._windowCursorSprite = new Sprite();
        this._windowFrameSprite = new Sprite();
        this._windowContentsSprite = new Sprite();
        this._downArrowSprite = new Sprite();
        this._upArrowSprite = new Sprite();
        this._windowPauseSignSprite = new Sprite();
        this._windowBackSprite.bitmap = new Bitmap(1, 1);
        this._windowBackSprite.alpha = 192 / 255;
        this.addChild(this._windowSpriteContainer);
        this._windowSpriteContainer.addChild(this._windowBackSprite);
        this._windowSpriteContainer.addChild(this._windowFrameSprite);
        this.addChild(this._windowContentsSprite);
        this.addChild(this._downArrowSprite);
        this.addChild(this._upArrowSprite);
        this.addChild(this._windowPauseSignSprite);
        this.addChild(this._windowCursorSprite);
        if (this._createColorFilter) this._createColorFilter(); //For compatibility with Window Upgrade, which calls this function in an alias of Window
    };

    //Changing cursor movement to jump across edges like you'd expect it to
    Window_Sudoku.prototype.cursorRight = function (wrap) {
        let index = this.index();
        if (index % 9 === 8) this.select(Math.floor(index / 9) * 9);
        else this.select(index + 1);
    }

    Window_Sudoku.prototype.cursorLeft = function (wrap) {
        let index = this.index();
        if (index % 9 === 0) this.select(Math.floor(index / 9) * 9 + 8);
        else this.select(index - 1);
    }

    Window_Sudoku.prototype.cursorUp = function (wrap) {
        let index = this.index();
        if (index < 9) this.select(index + 72);
        else this.select(index - 9);
    }

    Window_Sudoku.prototype.cursorDown = function (wrap) {
        let index = this.index();
        if (index >= 72) this.select(index - 72);
        else this.select(index + 9);
    }

    /**
     * Sets the value of the currently selected digit to the argument provided, and checks if it leads to conflicts or winning the game
     * @param {Number} value 
     */
    Window_Sudoku.prototype.inputDigit = function (value) {
        if (this.givens[this.index()]) {
            SoundManager.playBuzzer();
            return;
        }
        this.values[this.index()] = value;
        SoundManager.playEquip();
        this.refresh(); //This is both to show the new value and check for conflicts
        if (this.checkForVictory()) {
            AudioManager.playMe({ name: params["Victory music"], volume: 100, pitch: 100 });
            this.victory = true;
            this.setupOutputs();
        }
    }

    /**
     * Called when the puzzle is completed or given up on, sets the output switches and variables to the results
     */
    Window_Sudoku.prototype.setupOutputs = function () {
        $gameSwitches.setValue(Number(params["Victory"]), this.victory)
        let seconds = Math.floor(this.framesPassed / 60);
        $gameVariables.setValue(Number(params["Total seconds"]), seconds);
        $gameVariables.setValue(Number(params["Display seconds"]), seconds % 60);
        $gameVariables.setValue(Number(params["Display minutes"]), Math.floor((seconds % 3600) / 60));
        $gameVariables.setValue(Number(params["Display hours"]), Math.floor(seconds / 3600));
    }

    /**
     * Checks if the digit at given index has any conflicts, i.e. if it sees the same digit in its row, column or box
     * @param {Number} index 
     * @returns True if the digit has at least one conflict, false if it has none or if there's no digit at this index
     */
    Window_Sudoku.prototype.checkForConflicts = function (index) {
        let value = this.values[index];
        if (value === 0 || this.victory) return false;
        let indexesToCheck = [];

        //Check the row and column
        let rowStart = Math.floor(index / 9) * 9;
        let columnStart = index % 9;
        for (let i = 0; i < 9; i++) {
            indexesToCheck.push(rowStart + i);
            indexesToCheck.push(columnStart + i * 9);
        }
        //Check the box
        let boxStart = Math.floor(index / 3) * 3 - (Math.floor(index / 9) % 3) * 9;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                indexesToCheck.push(boxStart + i * 9 + j);
            }
        }

        //See if any of those indexes have the same value
        for (let i = 0; i < indexesToCheck.length; i++) {
            if (indexesToCheck[i] !== index && this.values[indexesToCheck[i]] === value) return true;
        }
        return false;
    }
    /**
     * 
     * @returns True iff the grid is entirely filled and there are no conflicts
     */
    Window_Sudoku.prototype.checkForVictory = function () {
        if (this.values.some(x => x === 0)) return false;
        for (let i = 0; i < 81; i++) {
            if (this.checkForConflicts(i)) return false;
        }
        return true;
    }

    //Number selection

    function Window_NumberSelect() {
        this.initialize.apply(this, arguments);
    };

    Window_NumberSelect.prototype = Object.create(Window_Command.prototype);
    Window_NumberSelect.prototype.constructor = Window_NumberSelect;
    Window_NumberSelect.prototype.initialize = function (currentValue) {
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.currentValue = currentValue;
        this.height = CELL_SIZE * 3 + this.standardPadding() * 2;
        this.x = Graphics.boxWidth / 2 - this.width / 2;
        this.y = Graphics.boxHeight / 2 - this.height / 2;
        this.refresh();
        this.activate();
        this.select(4);
    };

    Window_NumberSelect.prototype.windowWidth = function () {
        return CELL_SIZE * 3 + this.standardPadding() * 2;
    };

    Window_NumberSelect.prototype.makeCommandList = function () {
        for (let i = 1; i <= 9; i++) {
            this.addCommand(i, 'ok', true, i);
        }
    }

    Window_NumberSelect.prototype.spacing = function () {
        return 1;
    };

    Window_NumberSelect.prototype.itemTextAlign = function () {
        return 'center';
    };

    Window_NumberSelect.prototype.itemHeight = function () {
        return CELL_SIZE;
    };

    Window_NumberSelect.prototype.maxCols = function () {
        return 3;
    }

    Window_NumberSelect.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.contents.textColor = this.currentValue === index + 1 ? "aqua" : "#ffffff";
        this.drawText(index + 1, rect.x, rect.y + (CELL_SIZE - this.standardFontSize()) / 2, rect.width, align);
    };

    //Exit confirmation
    function Window_SudokuExitConfirmation() {
        this.initialize.apply(this, arguments);
    };

    Window_SudokuExitConfirmation.prototype = Object.create(Window_Command.prototype);
    Window_SudokuExitConfirmation.prototype.constructor = Window_SudokuExitConfirmation;
    Window_SudokuExitConfirmation.prototype.initialize = function (currentValue) {
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.x = Graphics.boxWidth / 2 - this.width / 2;
        this.y = Graphics.boxHeight / 2 - this.height / 2;
        this.refresh();
        this.activate();
        this.select(1);
    }

    Window_SudokuExitConfirmation.prototype.makeCommandList = function () {
        this.addCommand("Exit", "ok");
        this.addCommand("Cancel", "ok");
    }



    //Sudoku scene

    function Scene_Sudoku() {
        this.initialize.apply(this, arguments);
    }

    Scene_Sudoku.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Sudoku.prototype.constructor = Scene_Sudoku;

    Scene_Sudoku.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_Sudoku.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.mainWindow = new Window_Sudoku(puzzleArgument);
        this.mainWindow.setHandler('ok', this.onOkButton.bind(this));
        this.mainWindow.setHandler('cancel', this.onCancelButton.bind(this));
        this.addWindow(this.mainWindow);
    };

    Scene_Sudoku.prototype.terminate = function () {
        Scene_MenuBase.prototype.terminate.call(this);
    };

    Scene_Sudoku.prototype.update = function () {
        Scene_MenuBase.prototype.update.call(this);
    }


    Scene_Sudoku.prototype.onOkButton = function () {
        if (this.mainWindow.givens[this.mainWindow.index()]) { //We can't modify this one
            SoundManager.playBuzzer();
            this.mainWindow.activate();
            return;
        }
        if (this.mainWindow.victory) { //No more modifications after victory
            this.mainWindow.activate();
            return;
        }
        this.numberInput = new Window_NumberSelect(this.mainWindow.values[this.mainWindow.index()]);
        this.numberInput.setHandler('ok', this.onNumberOk.bind(this));
        this.numberInput.setHandler('cancel', this.onNumberCancel.bind(this));
        this.addWindow(this.numberInput);
    }

    Scene_Sudoku.prototype.onCancelButton = function () {
        if (this.mainWindow.victory) return; //We will exit in a moment anyway
        this.cancelWindow = new Window_SudokuExitConfirmation();
        this.cancelWindow.setHandler('ok', this.onCancelWindowOk.bind(this));
        this.cancelWindow.setHandler('cancel', () => { this.mainWindow.activate(); this.cancelWindow.close(); });
        this.addWindow(this.cancelWindow);
    }

    Scene_Sudoku.prototype.onCancelWindowOk = function () {
        if (this.cancelWindow.index() === 0) {
            currentWindow = null;
            this.mainWindow.setupOutputs();
            this.popScene();
        }
        else {
            this.cancelWindow.close();
            this.mainWindow.activate();
        }
    }

    Scene_Sudoku.prototype.onNumberOk = function () {
        this.numberInput.close();
        this.mainWindow.activate();
        this.mainWindow.inputDigit(this.numberInput.currentExt());
        /*this.mainWindow.values[this.mainWindow.index()] = this.numberInput.currentExt();
        this.mainWindow.refresh();
        SoundManager.playEquip();
        if (this.mainWindow.checkForVictory()) {
            AudioManager.playMe({ name: params["Victory music"], volume: 100, pitch: 100 });
            this.mainWindow.victory = true;
        }*/
    }

    Scene_Sudoku.prototype.onNumberCancel = function () {
        this.numberInput.close();
        this.mainWindow.values[this.mainWindow.index()] = 0;
        this.mainWindow.activate();
        this.mainWindow.refresh();
        SoundManager.playCancel();
    }


    //***************************************************************************
    // ---------------------------- Sudoku generator ----------------------------
    //***************************************************************************

    //The following sudoku generator is adapted from MIT-licenced code by mucahidyazar, available here https://www.npmjs.com/package/node-sudoku

    "use strict"
    //Constants
    const EMPTY_HOLE_CHAR = '.';
    //Helpers
    function convertBoard(board, args) {
        let convertedBoard = board;
        if (typeof board === 'string') {
            const { as = 'array' } = args !== null && args !== void 0 ? args : {};
            if (as === "array") {
                convertedBoard = board.split('');
            }
            else if (as === "array2d") {
                convertedBoard = boardStringToGrid(board);
            }
        }
        else if (Array.isArray(board[0])) {
            const { as = 'string' } = args !== null && args !== void 0 ? args : {};
            if (as === "string") {
                convertedBoard = boardGridToString(board);
            }
            else if (as === "array") {
                convertedBoard = board.map((row) => row.join(''));
            }
        }
        else if (Array.isArray(board)) {
            const { as = 'string' } = args !== null && args !== void 0 ? args : {};
            if (as === "string") {
                convertedBoard = board.join('');
            }
            else if (as === "array2d") {
                convertedBoard = boardArrayToGrid(board);
            }
        }
        return convertedBoard;
    }
    function boardStringToGrid(boardString) {
        /* Convert a board string to a two-dimensional array
         */
        const rows = [];
        let curRow = [];
        for (let i = 0; i < boardString.length; ++i) {
            curRow.push(boardString[i]);
            if (Number(i) % 9 === 8) {
                rows.push(curRow);
                curRow = [];
            }
        }
        return rows;
    }
    function boardArrayToGrid(boardArray) {
        /* Convert a board array to a two-dimensional array
         */
        // example
        // boardArray === ["123", "456", "789"]
        // should be === [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]]
        const rows = [];
        boardArray.forEach((row, index) => {
            const curRow = [];
            for (let i = 0; i < row.length; ++i) {
                curRow.push(row[i]);
            }
            rows.push(curRow);
        });
        return rows;
    }
    function boardGridToString(board) {
        /* Convert a board grid to a string
         */
        let boardString = '';
        for (let r = 0; r < 9; ++r) {
            for (let c = 0; c < 9; ++c) {
                boardString += board[r][c];
            }
        }
        return boardString;
    }
    function findEmptyHoleChar(board) {
        var _a;
        if (board.length > 9) {
            throw new Error(`Your input ${JSON.stringify(board)} is not a valid board`);
        }
        const boardArray = convertBoard(board, { as: "array" });
        const emptyHoles = {};
        boardArray.forEach((item) => {
            const isStringAndZero = typeof item === 'string' && Number(item) === 0;
            const isStringAndNotANumber = typeof item === 'string' && Number.isNaN(Number(item));
            if (isStringAndZero || isStringAndNotANumber) {
                emptyHoles[item] = emptyHoles[item] ? emptyHoles[item] + 1 : 1;
            }
        });
        const emptyHolesKeys = Object.entries(emptyHoles);
        const emptyHoleChar = (_a = emptyHolesKeys === null || emptyHolesKeys === void 0 ? void 0 : emptyHolesKeys[0]) === null || _a === void 0 ? void 0 : _a[0];
        if ((emptyHoleChar === null || emptyHoleChar === void 0 ? void 0 : emptyHoleChar.length) !== 1) {
            throw new Error("emptyHoleChar should be 1 char");
        }
        return emptyHoleChar;
    }
    const backtrackCalculate = (answer, rows, cols, zones, index, traceBackNums, emptyHoleChar) => {
        // console.log({ index });
        const row = matrix.getRow(index);
        const col = matrix.getCol(index);
        const zone = matrix.getZone(index);
        if (index >= 81) {
            return true;
        }
        if (answer[index] !== emptyHoleChar) {
            return backtrackCalculate(answer, rows, cols, zones, index + 1, traceBackNums, emptyHoleChar);
        }
        let num;
        // eslint-disable-next-line @typescript-eslint/no-for-in-array
        for (const n in traceBackNums) {
            num = traceBackNums[n];
            if (!rows[row][num] && !cols[col][num] && !zones[zone][num]) {
                answer[index] = num;
                rows[row][num] = true;
                cols[col][num] = true;
                zones[zone][num] = true;
                if (backtrackCalculate(answer, rows, cols, zones, index + 1, traceBackNums, emptyHoleChar)) {
                    return true;
                }
                else {
                    answer[index] = emptyHoleChar;
                    rows[row][num] = false;
                    cols[col][num] = false;
                    zones[zone][num] = false;
                }
            }
        }
        return false;
    };
    const dsfOneSolutionCalculate = (answer, rows, cols, zones, index, traceBackNums, mark, emptyHoleChar) => {
        if (mark.finishes > 1) {
            return;
        }
        if (index >= 81) {
            for (let i = 0; i < answer.length; ++i) {
                if (String(answer[i]) === emptyHoleChar) {
                    return;
                }
            }
            mark.finishes++;
            mark.answer = answer;
            return;
        }
        const row = matrix.getRow(index);
        const col = matrix.getCol(index);
        const zone = matrix.getZone(index);
        if (String(answer[index]) !== emptyHoleChar) {
            dsfOneSolutionCalculate(answer, rows, cols, zones, index + 1, traceBackNums, mark, emptyHoleChar);
            return;
        }
        traceBackNums.forEach(num => {
            if (!rows[row][num] && !cols[col][num] && !zones[zone][num]) {
                answer[index] = num;
                rows[row][num] = true;
                cols[col][num] = true;
                zones[zone][num] = true;
                dsfOneSolutionCalculate([...answer], [...rows], [...cols], [...zones], index + 1, traceBackNums, mark, emptyHoleChar);
                answer[index] = emptyHoleChar;
                rows[row][num] = false;
                cols[col][num] = false;
                zones[zone][num] = false;
            }
        });
    };
    /**
     * @param digHoleBoard dig hole board
     * @param digHoleCount dig hole count mean empty hole count for setting the difficulty
     * @author mucahidyazar
     */
    const internalGenerate = (digHoleBoard, digHoleCount, emptyHoleChar) => {
        // random candidate indexes each try dig hole operation
        const fixedPositions = (0, range)(9, (num) => matrix.getZoneIndexs(num)[Math.random() * 9]).sort((a, b) => a - b);
        const arr = [];
        digHoleBoard.forEach((_, index) => {
            if (fixedPositions.length > 0 && fixedPositions[0] === index) {
                fixedPositions.splice(0, 1);
                return;
            }
            arr.push(index);
        });
        const candidateHoles = (0, shuffle)(arr);
        // each dig hole operation will use strict sudoku to solve make sure is one solution
        // cycle done when dig hole enough , one solution sudoku is generated
        let digHoleFulfill = 0;
        candidateHoles.forEach(position => {
            if (digHoleFulfill >= digHoleCount) {
                return;
            }
            if (String(digHoleBoard[position]) !== emptyHoleChar) {
                const old = digHoleBoard[position];
                digHoleBoard[position] = emptyHoleChar;
                // use sudoku solver to solve with strict , that will make sure one solution
                try {
                    digHoleFulfill++;
                    // eslint-disable-next-line no-new
                    new Sudoku(digHoleBoard, true, emptyHoleChar);
                }
                catch (_a) {
                    digHoleBoard[position] = old;
                    digHoleFulfill--;
                }
            }
        });
        if (digHoleFulfill === digHoleCount) {
            return digHoleBoard;
        }
        return [];
    };

    //Methods
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    const NUMS = (0, range)(9, (num) => num + 1);
    // generator max job limit
    const MAX_JOB_COUNT_LIMIT = 6;
    /**
     * @param digHoleCount empty hole count for setting the difficulty
     * @param jobCount generator job count. If generator fails, will try again with jobCount + 1
     * @author mucahidyazar
     */
    function generate(digHoleCount, jobCount = 1) {
        if (jobCount >= MAX_JOB_COUNT_LIMIT) {
            // internal generate do many times , reduce the difficulty
            // console.log(`reduce the difficulty : ${digHoleCount} -> ${digHoleCount - 2}`);
            jobCount = 1;
            digHoleCount -= 2;
        }
        // create center zone board to make simple board
        // let p = 0;
        // const shuffleNums = shuffle(range(9, (num) => num));
        // const simpleBoard = range(81, (index) => {
        //   if (matrix.getZone(index % 9, index / 9) === 4) {
        //     return shuffleNums[p++] + 1;
        //   }
        //   return EMPTY_HOLE_CHAR;
        // });
        const simpleBoard = ".".repeat(81).split("");
        // solve the base board with normal sudoku
        const baseAnswer = solve(simpleBoard, { emptyHoleChar: EMPTY_HOLE_CHAR, as: "array" });
        const board = (0, internalGenerate)(baseAnswer, digHoleCount, EMPTY_HOLE_CHAR);
        if (!board.length) {
            return generate(digHoleCount, jobCount + 1);
        }
        return board;
    }
    ;
    /**
     * @param digHoleCount empty hole count for setting the difficulty
     * @param jobCount generator job count. If generator fails, will try again with jobCount + 1
     * @author mucahidyazar
     */
    function generateAsync(digHoleCount, jobCount = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                try {
                    const board = generate(digHoleCount, jobCount);
                    if (board === null || board === void 0 ? void 0 : board.length) {
                        resolve(board);
                    }
                    else {
                        // If the board is not valid for some reason, you can handle the condition here
                        reject(new Error("Failed to generate a valid board."));
                    }
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }
    ;
    /**
     * @param level 0 - 4 (changed to 1-5, since 0 broke the "if(level)" check)
     * @author mucahidyazar
     */
    function generateByLevel(level = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            // level to make dig hold count
            let digHoleCount = 40;
            switch (level) {
                case 1:
                    digHoleCount = 40;
                    break;
                case 2:
                    digHoleCount = 45;
                    break;
                case 3:
                    digHoleCount = 50;
                    break;
                case 4:
                    digHoleCount = 54;
                    break;
                case 5:
                    digHoleCount = 58;
                    break;
                default:
                    throw new Error(`please input level [0 - 4]`);
            }
            return yield generateAsync(digHoleCount, 1);
        });
    }
    ;
    /**
     * @param board board to solve
     * @param args strict: just one solution
     * @param args emptyHoleChar: empty hole char
     * @param args as: return type
     * @author mucahidyazar
     */
    function solve(board, args) {
        const { strict = false, emptyHoleChar, as = "array" } = args;
        const convertedBoard = (0, convertBoard)(board, { as: "array" });
        let answer = [];
        const rows = (0, range)(9, () => (0, range)(10, () => false));
        const cols = (0, range)(9, () => (0, range)(10, () => false));
        const zones = (0, range)(9, () => (0, range)(10, () => false));
        let row, col, zone;
        // console.log({ convertedBoard });
        convertedBoard.forEach((num, index) => {
            row = matrix.getRow(index);
            col = matrix.getCol(index);
            zone = matrix.getZone(index);
            if (String(num) !== emptyHoleChar) {
                rows[row][num] = true;
                cols[col][num] = true;
                zones[zone][num] = true;
            }
            answer.push(num);
        });
        let isSuccess = false;
        const traceBackNums = (0, shuffle)(NUMS);
        let firstCheckPoint = 0;
        for (let index = 0; index < 81; ++index) {
            if (String(answer[index]) === emptyHoleChar) {
                firstCheckPoint = index;
                break;
            }
        }
        if (strict) {
            const mark = {
                count: 0,
                finishes: 0,
                answer: []
            };
            (0, dsfOneSolutionCalculate)(answer, rows, cols, zones, firstCheckPoint, traceBackNums, mark, emptyHoleChar);
            if (mark.finishes > 1) {
                throw new Error("MAC_SimpleSudoku: This board has more than one solution");
            }
            else if (mark.finishes === 0) {
                isSuccess = false;
            }
            else {
                answer = mark.answer;
                isSuccess = true;
            }
        }
        else {
            isSuccess = (0, backtrackCalculate)(answer, rows, cols, zones, firstCheckPoint, traceBackNums, emptyHoleChar);
        }
        if (!isSuccess) {
            throw new Error("MAC_SimpleSudoku: this board has no valid solutions");
        }
        return (0, convertBoard)(answer, { as });
    }


    //Sudoku
    class Sudoku {
        constructor(board, strict = false, emptyHoleChar = EMPTY_HOLE_CHAR) {
            this.board = board;
            this.emptyHoleChar = emptyHoleChar;
            if (!board || board.length !== 81) {
                throw new Error("MAC_SimpleSudoku: invalid board.");
            }
            const timeBegin = new Date().getTime();
            this.answer = (0, solve)(this.board, { strict, emptyHoleChar });
            this.timecount = new Date().getTime() - timeBegin;
        }
        getBoard(as) {
            return (0, convertBoard)(this.board, { as });
        }
        getAnswer(as) {
            return (0, convertBoard)(this.answer, { as });
        }
        getEmptyHoleChar() {
            return this.emptyHoleChar;
        }
        debug() {
            // console.log("--- debug info | start ---");
            // console.log("board");
            (0, formatPrint)(this.getBoard("array"));
            // console.log("answer");
            (0, formatPrint)(this.getAnswer("array"));
            // console.log(`solve board total time : ${this.timecount}'ms`);
            const boardString = this.getBoard("string");
            // console.log("board string");
            // console.log(boardString);
            // console.log("--- debug info | end ---");
        }
    }

    //Utils
    function range(max, cb) {
        return [...Array(max).keys()].map((num) => cb(num));
    }
    const matrix = {
        getRow: (index) => {
            return index % 9;
        },
        getCol: (index) => {
            return parseInt(String(index / 9));
        },
        getZone: (row, col) => {
            let index;
            if (!col) {
                index = row;
            }
            else {
                index = col * 9 + row;
            }
            row = matrix.getRow(index);
            col = matrix.getCol(index);
            const x = parseInt(String(col / 3));
            const y = parseInt(String(row / 3));
            return y * 3 + x;
        },
        getIndex: (row, col) => {
            return col * 9 + row;
        },
        getZoneIndexs: (zone = 0) => {
            const rows = [0, 1, 2];
            const cols = [0, 1, 2];
            const indexs = [];
            cols.forEach((col) => {
                rows.forEach((row) => {
                    indexs.push(((col + parseInt(String(zone / 3)) * 3) * 9) + (row + (zone % 3) * 3));
                });
            });
            return indexs;
        }
    };
    /**
     * Creates an array of shuffled values, using a version of the
     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     *
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to shuffle.
     * @returns {Array} Returns the new shuffled array.
     * @example
     *
     * shuffle([1, 2, 3, 4])
     * // => [4, 1, 3, 2]
     */
    function shuffle(array) {
        const length = array == null ? 0 : array.length;
        if (!length) {
            return [];
        }
        let index = -1;
        const lastIndex = length - 1;
        const result = copyArray(array);
        while (++index < length) {
            const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
            const value = result[rand];
            result[rand] = result[index];
            result[index] = value;
        }
        return result;
    }
    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
        let index = -1;
        const length = source.length;
        if (!(array === null || array === void 0 ? void 0 : array.length)) {
            array = new Array(length);
        }
        while (++index < length) {
            array[index] = source[index];
        }
        return array;
    }
    function formatPrint(arr) {
        const matrix = [];
        let rows = [];
        arr.forEach((num, index) => {
            if (index % 9 === 0) {
                rows = [];
            }
            rows.push(num);
            if (rows.length === 9) {
                matrix.push(rows);
            }
        });
    }

    //Index
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    function sudokuJs({ level, emptyHoleCount, strict = true }) {
        return __awaiter(this, void 0, void 0, function* () {
            let board;
            if (level) {
                board = yield (0, generateByLevel)(level);
            }
            else if (emptyHoleCount) {
                board = yield (0, generateAsync)(emptyHoleCount, 1);
            }
            else {
                throw new Error('Missing level or emptyHoleCount');
            }
            const sudoku = new Sudoku(board, strict);
            return sudoku;
        });
    }
}();