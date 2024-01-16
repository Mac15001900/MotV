/*:
 * @plugindesc Adds a simple sudoku minigame
 * @author Mac15001900
 * 
 * @help
 * 
 */


var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (['sudoku'].includes(command.toLowerCase())) {
        console.log("MAC_SimpleSudoku: Sudoku command detected.");
        if (args.length === 0) throw new Error("MAC_SimpleSudoku: At least one argument is required.");
        SceneManager.push(Scene_Sudoku);

    }
};

//Sudoku window

function Window_Sudoku() {
    this.initialize.apply(this, arguments);
};

const CELL_SIZE = 64;

Window_Sudoku.prototype = Object.create(Window_Command.prototype);
Window_Sudoku.prototype.constructor = Window_Sudoku;
Window_Sudoku.prototype.initialize = function () {
    this.values = Array(81).fill(0);
    this.givens = Array(81).fill(true); //We start with everything being a given, so the player can't change the board before it's generated
    this.generated = false;
    this.sudoku = null; //If it's null then it hasn't generated yet
    let self = this;
    sudokuJs({ level: 2 }).then(sudoku => { self.sudoku = sudoku });

    Window_Command.prototype.initialize.call(this, 0, 0);
    this.height = CELL_SIZE * 9 + this.standardPadding() * 2;
    this.x = Graphics.boxWidth / 2 - this.width / 2;
    this.y = Graphics.boxHeight / 2 - this.height / 2;
    this.refresh();
    this.activate();
    this.select(0);
};

Window_Sudoku.prototype.windowWidth = function () {
    return CELL_SIZE * 9 + this.standardPadding() * 2;
};

Window_Sudoku.prototype.makeCommandList = function () {
    for (let i = 0; i < 81; i++) {
        this.addCommand(i + 1, 'ok', true, i);
    }
}

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

Window_Sudoku.prototype.update = function () {
    Window_Command.prototype.update.call(this);
    if (!this.generated && this.sudoku) {
        this.values = this.sudoku.board.map(x => x === '.' ? 0 : x);
        this.givens = this.sudoku.board.map(x => x !== '.');
        this.generated = true;
        this.refresh();
    }
}


Window_Sudoku.prototype.refresh = function () {
    Window_Command.prototype.refresh.call(this);
    let ctx = this.contents._context;
    let x = this.itemWidth();

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
    ctx.strokeStyle = "white";
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

Window_Sudoku.prototype.drawItem = function (index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.contents.textColor = this.givens[index] ? "aqua" : "#ffffff";
    if (this.checkForConflicts(index) === true) this.contents.textColor = this.givens[index] ? "chocolate" : "red";
    if (this.values[index] > 0) this.drawText(this.values[index], rect.x, rect.y + (CELL_SIZE - this.standardFontSize()) / 2, rect.width, align);
};

Window_Sudoku.prototype.checkForConflicts = function (index) {
    let value = this.values[index];
    if (value === 0) return -1;
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
    if (this.values.any(x => x === 0)) return false;
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
Window_NumberSelect.prototype.initialize = function () {
    Window_Command.prototype.initialize.call(this, 0, 0);
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
    this.drawText(index + 1, rect.x, rect.y + (CELL_SIZE - this.standardFontSize()) / 2, rect.width, align);
};

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
    this.mainWindow = new Window_Sudoku();
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
    this.numberInput = new Window_NumberSelect();
    this.numberInput.setHandler('ok', this.onNumberOk.bind(this));
    this.numberInput.setHandler('cancel', this.onNumberCancel.bind(this));
    this.addWindow(this.numberInput);
}

Scene_Sudoku.prototype.onCancelButton = function () {
    this.popScene();
}

Scene_Sudoku.prototype.onNumberOk = function () {
    this.numberInput.close();
    this.mainWindow.values[this.mainWindow.index()] = this.numberInput.currentExt();
    this.mainWindow.activate();
    // if(this.mainWindow.checkForConflicts(this.mainWindow.index()))
    this.mainWindow.refresh();
    SoundManager.playEquip();
}

Scene_Sudoku.prototype.onNumberCancel = function () {
    this.numberInput.close();
    this.mainWindow.activate();
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
 * @param digHoleCount dig hole count mean empty hole count for setting the difficulty
 * @param jobCount generator job count , if generator fail , will try again with jobCount + 1
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
 * @param digHoleCount dig hole count mean empty hole count for setting the difficulty
 * @param jobCount generator job count , if generator fail , will try again with jobCount + 1
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
 * @param level 0 - 4
 * @author mucahidyazar
 */
function generateByLevel(level = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        // level to make dig hold count
        let digHoleCount = 40;
        switch (level) {
            case 0:
                digHoleCount = 40;
                break;
            case 1:
                digHoleCount = 45;
                break;
            case 2:
                digHoleCount = 50;
                break;
            case 3:
                digHoleCount = 54;
                break;
            case 4:
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
            throw new Error("board is not one-solution sudoku");
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
        throw new Error("not found the solution. is that you give me the board with mistake?");
    }
    return (0, convertBoard)(answer, { as });
}


//Sudoku
class Sudoku {
    constructor(board, strict = false, emptyHoleChar = EMPTY_HOLE_CHAR) {
        this.board = board;
        this.emptyHoleChar = emptyHoleChar;
        if (!board || board.length !== 81) {
            throw new Error("is not a 9 * 9 matrix sudoku board");
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
