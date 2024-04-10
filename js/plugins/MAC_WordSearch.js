/*:
 * @plugindesc Adds a simple word search minigame
 * @author Mac15001900
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
 * @help TODO
 */

var Imported = Imported || {}
Imported.MAC_WordSearch = "1.0";


var params = PluginManager.parameters('MAC_WordSearch');
const VICTORY_DURATION = 60 * 6; //How long to keep the puzzle open after victory, in frames



var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (['wordsearch'].includes(command.toLowerCase())) {
        if (args.length === 0) throw new Error("MAC_WordSearch: At least one argument is required.");
        puzzleArgument = args[0];
        SceneManager.push(Scene_WordSearch);

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

function Scene_WordSearch() {
    this.initialize.apply(this, arguments);
}

Scene_WordSearch.prototype = Object.create(Scene_MenuBase.prototype);
Scene_WordSearch.prototype.constructor = Scene_WordSearch;

Scene_WordSearch.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_WordSearch.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.mainWindow = new Window_Sudoku(puzzleArgument);
    this.mainWindow.setHandler('ok', this.onOkButton.bind(this));
    this.mainWindow.setHandler('cancel', this.onCancelButton.bind(this));
    this.addWindow(this.mainWindow);
};

Scene_WordSearch.prototype.terminate = function () {
    Scene_MenuBase.prototype.terminate.call(this);
};

Scene_WordSearch.prototype.update = function () {
    Scene_MenuBase.prototype.update.call(this);
}


Scene_WordSearch.prototype.onOkButton = function () {
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

Scene_WordSearch.prototype.onCancelButton = function () {
    if (this.mainWindow.victory) return; //We will exit in a moment anyway
    this.cancelWindow = new Window_SudokuExitConfirmation();
    this.cancelWindow.setHandler('ok', this.onCancelWindowOk.bind(this));
    this.cancelWindow.setHandler('cancel', () => { this.mainWindow.activate(); this.cancelWindow.close(); });
    this.addWindow(this.cancelWindow);
}

Scene_WordSearch.prototype.onCancelWindowOk = function () {
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

Scene_WordSearch.prototype.onNumberOk = function () {
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

Scene_WordSearch.prototype.onNumberCancel = function () {
    this.numberInput.close();
    this.mainWindow.values[this.mainWindow.index()] = 0;
    this.mainWindow.activate();
    this.mainWindow.refresh();
    SoundManager.playCancel();
}

