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
    for (let i = 0; i < 81; i++) {
        this.values[i] = Number("600000701010079603273801000800750002007018000021040008180025300030004060400307200"[i]);
    }
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
    if (this.values[index] > 0) this.drawText(this.values[index], rect.x, rect.y + (CELL_SIZE - this.standardFontSize()) / 2, rect.width, align);
};

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
    this.mainWindow.refresh();
    SoundManager.playEquip();
}

Scene_Sudoku.prototype.onNumberCancel = function () {
    this.numberInput.close();
    this.mainWindow.activate();
}