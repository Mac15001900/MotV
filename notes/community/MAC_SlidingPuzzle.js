/*:
 * @plugindesc (v1.0) Adds a sliding puzzle minigame
 * @author Mac15001900
 *
 * @param Interface
 * 
 * @param Puzzle size
 * @desc The size of the puzzle, in pixels. It's highly recommended to set it to a multiple of any used grid size.
 * @default 540
 * @parent Interface
 * 
 * @param Lines colour
 * @desc Colour of the lines in the grid (leave empty to disable grid). Uses CSS colours.
 * @type text
 * @default white
 * @parent Interface
 * 
 * @param Control Scheme
 * @desc "Cursor" allows the player to select tiles with a cursor. "Slide" moved the tiles directly with arrow keys.
 * @type select
 * @default Slide
 * @option Cursor
 * @option Slide
 * @option Slide (inverted)
 * @parent Interface
 * 
 * @param Timer
 * @desc Should a timer be shown to the player (time will be measured either way).
 * @type boolean
 * @default true
 * @on Shown
 * @off Hidden
 * @parent Interface
 * 
 * @param Move counter
 * @desc Should a move counter be shown to the player (moves will be counted either way).
 * @type boolean
 * @default false
 * @on Shown
 * @off Hidden
 * @parent Interface
 * 
 * @param Outputs
 * 
 * @param Victory
 * @text Victory switch
 * @desc Switch with this number will be set to ON if the puzzle is successfully completed, and to OFF is the player gives up.
 * @type number
 * @parent Outputs
 * @default 0
 * 
 * @param Total seconds
 * @text Total seconds variable
 * @desc Variable with this number will be set to the total amount of seconds the player spent in the puzzle.
 * @type number
 * @parent Outputs
 * @default 0
 * 
 * @param Display seconds
 * @text Display seconds variable
 * @desc Variable with this number will be set to amount of seconds on the timer (between 0 and 59) when the player finished the puzzle.
 * @type number
 * @parent Outputs
 * @default 0
 * 
 * @param Display minutes
 * @text Display minutes variable
 * @desc Variable with this number will be set to amount of minutes on the timer when the player finished the puzzle.
 * @type number
 * @parent Outputs
 * @default 0
 * 
 * @param Move count
 * @text Move count variable
 * @desc Variable with this number will be set to the amount of moves the player made in the puzzle.
 * @type number
 * @parent Outputs
 * @default 0
 * 
 * @param Text
 * 
 * @param Exit
 * @desc Label for the exit button. "Exit" by default.
 * @type text
 * @default Exit
 * @parent Text
 * 
 * @param Cancel
 * @desc Label for the cancel button. "Cancel" by default.
 * @type text
 * @default Cancel
 * @parent Text
 * 
 * @param Sounds
 * 
 * @param Cursor sound
 * @desc The sound effect that will play when moving the cursor. Set to (None) to disable.
 * @type file
 * @dir audio/se
 * @parent Sounds
 * @default Cursor1
 * 
 * @param Slide sound
 * @desc The sound effect that will play when sliding a tile. Set to (None) to disable.
 * @type file
 * @dir audio/se
 * @parent Sounds
 * @default Wind7
 * 
 * @param Victory music
 * @desc The music effect that will play upon victory. Set to (None) to disable.
 * @type file
 * @dir audio/me
 * @parent Sounds
 * @default Victory1
 * 
 * 
 * @help This plugin adds a sliding puzzle minigame.
 *
 * You can start the mingame with the "SlidingPuzzle" event command, followed by 
 * the size of the grid and the name of the image in the img/pictures folder. 
 * Grid size can be specified using a variable, e.g. "v42" to use variable 42.
 * 
 * Example: 
 * SlidingPuzzle 4 Fountain
 * It will start a puzzle on a 4x4 grid, using the "Fountain.png" image.
 * 
 * Only one image is needed - it will be automatically cut into however many pieces
 * are required. It will not be resized - it's recommended to use ones that are the
 * exact same size as the puzzle (540x540 by default), though larger ones will work
 * too (they'll be cropped down to puzzle size).
 * 
 * Time taken, moves used, and whether the player finished or gave up are saved to 
 * variables and a switch specified in the plugin parameters. 
 * 
 * ---------------------------------------------------------------------------------
 * 
 * You can also change any plugin parameters during the game by using the 
 * SlidingPuzzleParam command, followed by the name of the parameter and the new 
 * value, using '_' instead of spaces. For example:
 * 
 * SlidingPuzzleParam Lines_colour crimson
 * Changes the colour of the grid lines.
 * 
 * Important: those changes are not saved with the game - quitting and loading the
 * game with reset them. It's recommended to use SlidingPuzzleParam immidiately
 * before SlidingPuzzle.
 * 
 * ---------------------------------------------------------------------------------
 * 
 * This plugin is available under the MIT Licence. You're free to use it in any 
 * games, commercial or not, or use the code in your own plugins. Credit is 
 * appreciated, but not required. 
 */


var Imported = Imported || {}
Imported.MAC_SlidingPuzzle = "1.0";
window.MAC_SlidingPuzzle = {};


void function ($) {

    let params = PluginManager.parameters('MAC_SlidingPuzzle');
    let puzzleArguments = null;
    $.LINE_WIDTH = 4; //Width of the grid lines, in pixels
    $.VICTORY_ANIMATION_DURATION = 60 * 3; //How long the victory animation lasts, in frames 
    $.TIMER_WIDTH = 108; //Width of the timer window (and the move counter), in pixels
    $.params = params;

    void ((alias) => {
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            if (command.toLowerCase() === 'slidingpuzzle') {
                console.log("Starting sliding puzzle");
                puzzleArguments = [...args];
                if (puzzleArguments.length < 2) throw new RangeError("MAC_SlidingPuzzle: You must specify a puzzle size and an image.");
                if (!Number.isInteger(numberValue(puzzleArguments[0]))) throw new TypeError("MAC_SlidingPuzzle: The size of the puzzle must be a number or a variable identifier (e.g. v42).");
                if (numberValue(puzzleArguments[0]) < 2) throw new Error("MAC_SlidingPuzzle: The minimum size of a sliding puzzle is 2.");
                if (numberValue(puzzleArguments[0]) > 100) console.warn("MAC_SlidingPuzzle: Starting a puzzle that's larger than 100x100. Are you sure that's what you wanted to do?");
                if (puzzleArguments[1].includes(".png")) throw new Error("MAC_SlidingPuzzle: Do not include the extension in name of the image.");
                SceneManager.push(Scene_SlidingPuzzle);
            } else if (command.toLowerCase() === 'slidingpuzzleparam') {
                let name = args[0].replace(/_/g, ' ');
                if (typeof params[name] === 'undefined') console.warn(name + " is not an existing plugin parameter");
                params[name] = args[1];
            }
            alias.call(this, command, args);

        }
    })(Game_Interpreter.prototype.pluginCommand);


    //--------------------- Window_SlidingPuzzle ---------------------

    //--------- Initialisation ---------
    function Window_SlidingPuzzle() {
        this.initialize.apply(this, arguments);
    };
    Window_SlidingPuzzle.prototype = Object.create(Window_Command.prototype);
    Window_SlidingPuzzle.prototype.constructor = Window_SlidingPuzzle;
    Window_SlidingPuzzle.prototype.initialize = function (image, size) {
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.size = Number(size);
        this.cells = this.size * this.size;
        this.cellWidth = numberValue(params['Puzzle size']) / this.size;

        //Creating the board
        this.values = [...Array(this.cells).keys()];
        this.shuffleArray(this.values);
        while (this.values.filter((v, i) => v === i).length > this.cells * 0.7) this.shuffleArray(this.values); //If over 70% is already correct, reshuffle
        let zeroIndex = this.values.indexOf(0);
        this.values[zeroIndex] = this.values[0];
        this.values[0] = 0;
        this.ensureSolvability(this.values);

        //Initialising internal variables
        this.lastKeyStates = [false, false, false, false]; //Which movement keys were held on last frame [up, down, left, right]
        this.animations = {};
        this.framesPassed = 0; //How many frames passed since the puzzle started (i.e. the image has loaded)
        this.moves = 0; //Move counter
        this.victory = false; //Whether the player has won
        this.finished = false; //Whether the game is done, i.e. victory is achieved and the victory animation is done

        //Resising the window
        this.height = numberValue(params['Puzzle size']) + this.standardPadding() * 2 + $.LINE_WIDTH;
        this.x = Graphics.boxWidth / 2 - this.width / 2;
        this.y = Graphics.boxHeight / 2 - this.height / 2;
        this.refresh();
        this.activate();
        this.select(0);

        //Loading the image
        let bmp = ImageManager.loadPicture(image);
        bmp.addLoadListener(function () {
            this.image = bmp;
            this.framesPassed = 0;
            if (bmp.width < numberValue(params['Puzzle size']) || bmp.height < numberValue(params['Puzzle size'])) throw Error(`MAC_SlidingPuzzle: ${image} is too small to fill the puzzle. Use a larger image or decrease the window size.`);
            this.refresh();
        }.bind(this));
    }

    Window_SlidingPuzzle.prototype.shuffleArray = function (array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    Window_SlidingPuzzle.prototype.ensureSolvability = function (values) {
        if (this.isSolvable(values)) return;
        //If not solvable, swap tiles 1 and 2 to change polarity
        let oneIndex = values.indexOf(1);
        let twoIndex = values.indexOf(2);
        values[oneIndex] = 2;
        values[twoIndex] = 1;
    }

    //Using logic from https://www.geeksforgeeks.org/check-instance-15-puzzle-solvable/
    Window_SlidingPuzzle.prototype.isSolvable = function (values) {
        //Count inversions
        let inversions = 0;
        for (let i = 0; i < values.length - 1; i++) {
            if (values[i] === 0) continue;
            for (let j = i + 1; j < values.length; j++) {
                if (values[j] === 0) continue;
                if (values[i] > values[j]) inversions++;
            }
        }
        //Check if solvable
        if (this.size % 2 == 0) {
            if (Math.floor(values.indexOf(0) / this.size) % 2 == 0) return inversions % 2 === 0;
            else return inversions % 2 !== 0;
        } else return inversions % 2 === 0;
    }


    Window_SlidingPuzzle.prototype.makeCommandList = function () {
        for (let i = 0; i < this.cells; i++) {
            this.addCommand(i + 1, 'ok', true, i);
        }
    }

    //--------- Puzzle logic ---------
    Window_SlidingPuzzle.prototype.update = function () {
        Window_Command.prototype.update.call(this);
        this.updateAnimations();
        this.framesPassed++;
        if (this.victory && !this.finished) {
            if (this.framesPassed - this.victoryTime >= $.VICTORY_ANIMATION_DURATION) {
                this.finished = true;
                this.pause = true;
            }
            this.refresh();
        }
    }

    //Swaps the tile at the given index with the empty one.
    Window_SlidingPuzzle.prototype.swapTile = function (index) {
        let zeroIndex = this.values.indexOf(0);
        this.values[zeroIndex] = this.values[index];
        this.values[index] = 0;
        this.moves++;
        this.refresh();
        this.checkForVictory();

        this.startAnimation(index, zeroIndex);
        if (params["Slide sound"]) AudioManager.playSe({ name: params["Slide sound"], volume: 100, pitch: 100 });
    }

    Window_SlidingPuzzle.prototype.checkForVictory = function () {
        if (this.values.every((v, i) => v === i)) {
            console.log("Victory!");
            this.victory = true;
            this.victoryTime = this.framesPassed;
            this.setupOutputs();
            if (params["Victory music"].length > 0) AudioManager.playMe({ name: params["Victory music"], volume: 100, pitch: 100 });
            this.select(-1); //This effectively hides the cursor
        }
    }

    Window_SlidingPuzzle.prototype.setupOutputs = function () {
        $gameSwitches.setValue(Number(params["Victory"]), this.victory)
        let seconds = Math.floor(this.framesPassed / 60);
        $gameVariables.setValue(Number(params["Total seconds"]), seconds);
        $gameVariables.setValue(Number(params["Display seconds"]), seconds % 60);
        $gameVariables.setValue(Number(params["Display minutes"]), Math.floor(seconds / 60));
        $gameVariables.setValue(Number(params["Move count"]), this.moves);
    }

    Window_SlidingPuzzle.prototype.exit = function () {
        this.close();
        setTimeout(() => {
            SceneManager.pop();
        }, 200);
    }

    //--------- Handling input ---------
    Window_SlidingPuzzle.prototype.moveCursor = function (dx, dy) {
        if (this.victory) return;
        switch (params["Control Scheme"]) {
            case "Cursor":
                this.select(this.offsetIndex(this.index(), dx, dy));
                break;
            case "Slide":
                dx *= -1;
                dy *= -1;
            case "Slide (inverted)":
                if (dx !== 0 && dy !== 0) { //Make sure we're only moving in one dimension at a time
                    this.moveCursor(params["Control Scheme"] === "Slide" ? -dx : dx, 0);
                    dx = 0;
                }
                //Check if it'd move out of bounds
                let index = this.values.indexOf(0);
                if (index % this.size === 0 && dx < 0 || index % this.size === this.size - 1 && dx > 0 ||
                    index < this.size && dy < 0 || index >= this.cells - this.size && dy > 0) return;
                this.swapTile(this.offsetIndex(index, dx, dy));
                break;
            default: console.error("Invalid control scheme");
        }
    }

    Window_SlidingPuzzle.prototype.offsetIndex = function (index, dx, dy) {
        if (dx !== 0)
            index = Math.floor(index / this.size) * this.size + (index % this.size + dx + this.size) % this.size;
        if (dy !== 0)
            index = (this.cells + index + dy * this.size) % this.cells;
        return index;
    }

    Window_SlidingPuzzle.prototype.processCursorMove = function () {
        if (this.isCursorMovable()) {
            let lastIndex = this.index();
            let dx = 0; dy = 0;
            //RM's Input doesn't understand the concept of pressing two keys on the same frame, so we need to hack around it a bit to make diagonal movement reliable
            let doRepeats = (Input._pressedTime >= Input.keyRepeatInterval * 2 && Input._pressedTime % Input.keyRepeatInterval === 0);
            if (Input.isPressed('up') && (!this.lastKeyStates[0] || doRepeats)) dy--;
            if (Input.isPressed('down') && (!this.lastKeyStates[1] || doRepeats)) dy++;
            if (Input.isPressed('left') && (!this.lastKeyStates[2] || doRepeats)) dx--;
            if (Input.isPressed('right') && (!this.lastKeyStates[3] || doRepeats)) dx++;
            if (dx !== 0 || dy !== 0) this.moveCursor(dx, dy);
            if (this.index() !== lastIndex) {
                if (params["Cursor sound"]) AudioManager.playSe({ name: params["Cursor sound"], volume: 100, pitch: 100 });
            }
            this.lastKeyStates = ['up', 'down', 'left', 'right'].map(k => Input.isPressed(k));
        }
    };

    Window_SlidingPuzzle.prototype.processOk = function () {
        if (this._closing) return;
        if (this.finished) this.exit();
        if (this.victory) return;
        let zeroIndex = this.values.indexOf(0);
        let index = this.index();
        //Check if they're neighbours
        if (Math.abs(zeroIndex - index) === 1 && Math.floor(zeroIndex / this.size) === Math.floor(index / this.size) ||
            Math.abs(zeroIndex - index) === this.size && zeroIndex % this.size === index % this.size) {
            this.swapTile(index);
        }
    }

    Window_SlidingPuzzle.prototype.onTouch = function (triggered) {
        if (this._closing) return;
        if (this.finished) {
            this.exit();
            return;
        }
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var hitIndex = this.hitTest(x, y);
        if (hitIndex >= 0) {
            this.select(hitIndex);
            this.processOk();
        }
    }

    //--------- Graphical stuff ---------
    Window_SlidingPuzzle.prototype.maxCols = function () {
        return this.size;
    };

    Window_SlidingPuzzle.prototype.spacing = function () {
        return 1;
    };

    Window_SlidingPuzzle.prototype.itemHeight = function () {
        return numberValue(params['Puzzle size']) / this.size;
    };

    Window_SlidingPuzzle.prototype.windowWidth = function () {
        return numberValue(params['Puzzle size']) + this.standardPadding() * 2 + $.LINE_WIDTH;
    };

    Window_SlidingPuzzle.prototype.refresh = function () {
        Window_Command.prototype.refresh.call(this);
        if (this.finished) return;
        if (params["Lines colour"].length > 0) {
            let ctx = this.contents._context;
            ctx.beginPath();
            ctx.lineWidth = $.LINE_WIDTH;
            if (this.victory) ctx.globalAlpha = 1 - (this.framesPassed - this.victoryTime) / $.VICTORY_ANIMATION_DURATION;
            let cellSize = numberValue(params['Puzzle size']) / this.size;
            //Draw vertical lines
            for (let i = 0; i <= this.size; i++) {
                ctx.moveTo(i * cellSize + $.LINE_WIDTH / 2, 0);
                ctx.lineTo(i * cellSize + $.LINE_WIDTH / 2, this.height);
            }
            //Draw horizontal lines
            for (let i = 0; i <= this.size; i++) {
                ctx.moveTo(0, i * cellSize + $.LINE_WIDTH / 2);
                ctx.lineTo(this.width, i * cellSize + $.LINE_WIDTH / 2);
            }
            ctx.strokeStyle = params["Lines colour"];
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
    }

    Window_SlidingPuzzle.prototype.drawItem = function (index) {
        if (!this.image) return;
        if (this.values[index] === 0) {
            if (!this.victory) return;
            this.contents._context.globalAlpha = (this.framesPassed - this.victoryTime) / $.VICTORY_ANIMATION_DURATION;
        }

        let s = this.cellWidth; //Size of a single cell
        let xg = (index % this.size); //Positions in the grid
        let yg = Math.floor(index / this.size);
        let xi = (this.values[index] % this.size); //Positions in the source image
        let yi = Math.floor(this.values[index] / this.size);
        if (this.animations[index]) {
            xg += this.animations[index].dx;
            yg += this.animations[index].dy;
        }
        this.contents.blt(this.image, xi * s, yi * s, s, s, xg * s + $.LINE_WIDTH / 2, yg * s + $.LINE_WIDTH / 2);
        if (this.values[index] === 0) this.contents._context.globalAlpha = 1;
    };

    //--------- Handling animations ---------
    Window_SlidingPuzzle.prototype.updateAnimations = function () {
        let needsRefresh = false;
        for (let i in this.animations) {
            if (!this.animations[i]) continue;
            this.animations[i].dx *= 0.7;
            this.animations[i].dy *= 0.7;
            this.animations[i].framesLeft--;
            if (this.animations[i].framesLeft <= 0) {
                delete this.animations[i];
            }
            needsRefresh = true;
        }
        if (needsRefresh) this.refresh();
    }

    Window_SlidingPuzzle.prototype.startAnimation = function (startIndex, endIndex) {
        this.animations[endIndex] = {
            dx: (startIndex % this.size) - (endIndex % this.size),
            dy: Math.floor(startIndex / this.size) - Math.floor(endIndex / this.size),
            framesLeft: 60,
        };
    }

    Window_SlidingPuzzle.prototype.skipVictoryAnimation = function () {
        if (this.finished) return;
        this.framesPassed = this.victoryTime + $.VICTORY_ANIMATION_DURATION - 1;
    }

    //--------- Cursor tweaks ---------
    //Overwriting this to change the order parts are added and make sure the cursor is on top. Otherwise it would render below the images.
    Window_SlidingPuzzle.prototype._createAllParts = function () {
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
        if (params["Control Scheme"] === "Cursor") this.addChild(this._windowCursorSprite); //That's the only mode where we need the cursor sprite
        if (this._createColorFilter) this._createColorFilter(); //For compatibility with Window Upgrade, which calls this function in an alias of Window
    };

    Window_SlidingPuzzle.prototype.itemRect = function (index) {
        var rect = new Rectangle();
        var maxCols = this.maxCols();
        rect.width = this.itemWidth();
        rect.height = this.itemHeight();
        rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX + $.LINE_WIDTH / 2;
        rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + $.LINE_WIDTH / 2;
        return rect;
    };

    //--------------------- Exit confirmation ---------------------
    function Window_SlidingPuzzleExitConfirmation() {
        this.initialize.apply(this, arguments);
    };

    Window_SlidingPuzzleExitConfirmation.prototype = Object.create(Window_Command.prototype);
    Window_SlidingPuzzleExitConfirmation.prototype.constructor = Window_SlidingPuzzleExitConfirmation;
    Window_SlidingPuzzleExitConfirmation.prototype.initialize = function () {
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.x = Graphics.boxWidth / 2 - this.width / 2;
        this.y = Graphics.boxHeight / 2 - this.height / 2;
        this.refresh();
        this.activate();
        this.select(1);
    }

    Window_SlidingPuzzleExitConfirmation.prototype.makeCommandList = function () {
        this.addCommand(params["Exit"], "ok");
        this.addCommand(params["Cancel"], "ok");
    }

    //--------------------- Window_Timer ---------------------
    function Window_Timer() {
        this.initialize.apply(this, arguments);
    };

    Window_Timer.prototype = Object.create(Window_Base.prototype);
    Window_Timer.prototype.constructor = Window_Timer;
    Window_Timer.prototype.initialize = function (parent) {
        Window_Base.prototype.initialize.call(this, 0, 0, $.TIMER_WIDTH, this.fittingHeight(1));
        this.mainWindow = parent;
        this.refresh();
    }

    Window_Timer.prototype.refresh = function () {
        this.contents.clear();
        let totalFrames = this.mainWindow.victory ? this.mainWindow.victoryTime : this.mainWindow.framesPassed;
        let seconds = Math.floor(totalFrames / 60);
        let minutes = Math.floor(seconds / 60);
        seconds %= 60;
        let text = `${String(minutes).padZero(2)}:${String(seconds).padZero(2)}`;
        if (minutes > 99) text = `${minutes}m`;
        this.drawText(text, 0, 0, this.contentsWidth(), "center");
    }

    Window_Timer.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        this.refresh();
    }

    //--------------------- Window_MoveCounter ---------------------
    function Window_MoveCounter() {
        this.initialize.apply(this, arguments);
    };

    Window_MoveCounter.prototype = Object.create(Window_Base.prototype);
    Window_MoveCounter.prototype.constructor = Window_MoveCounter;
    Window_MoveCounter.prototype.initialize = function (parent, y) {
        Window_Base.prototype.initialize.call(this, 0, y, $.TIMER_WIDTH, this.fittingHeight(1));
        this.mainWindow = parent;
        this.refresh();
    }

    Window_MoveCounter.prototype.refresh = function () {
        this.contents.clear();
        let text = `${this.mainWindow.moves}`;
        this.drawText(text, 0, 0, this.contentsWidth(), "right");
    }

    Window_MoveCounter.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        this.refresh();
    }

    //--------------------- Scene_SlidingPuzzle ---------------------


    function Scene_SlidingPuzzle() {
        this.initialize.apply(this, arguments);
    }

    Scene_SlidingPuzzle.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_SlidingPuzzle.prototype.constructor = Scene_SlidingPuzzle;

    Scene_SlidingPuzzle.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_SlidingPuzzle.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.mainWindow = new Window_SlidingPuzzle(puzzleArguments[1], puzzleArguments[0]);
        this.mainWindow.setHandler('cancel', this.onCancelButton.bind(this));
        this.addWindow(this.mainWindow);
        $.mainWindow = this.mainWindow;
        if (params["Timer"] === "true") {
            this.timerWindow = new Window_Timer(this.mainWindow);
            $.timerWindow = this.timerWindow;
            this.addWindow(this.timerWindow);
        }
        if (params["Move counter"] === "true") {
            this.moveCounterWindow = new Window_MoveCounter(this.mainWindow, this.timerWindow ? this.timerWindow.height : 0);
            $.moveCounterWindow = this.moveCounterWindow;
            this.addWindow(this.moveCounterWindow);
        }
    };

    Scene_SlidingPuzzle.prototype.terminate = function () {
        Scene_MenuBase.prototype.terminate.call(this);
    };

    Scene_SlidingPuzzle.prototype.update = function () {
        Scene_MenuBase.prototype.update.call(this);
    }

    Scene_SlidingPuzzle.prototype.onCancelButton = function () {
        if (this.mainWindow.finished) {
            this.mainWindow.activate();
            this.mainWindow.processOk();
            return;
        }
        if (this.mainWindow.victory) {
            this.mainWindow.skipVictoryAnimation();
            this.mainWindow.activate();
            return;
        }
        this.cancelWindow = new Window_SlidingPuzzleExitConfirmation();
        this.cancelWindow.setHandler('ok', this.onCancelWindowOk.bind(this));
        this.cancelWindow.setHandler('cancel', () => { this.mainWindow.activate(); this.cancelWindow.close(); });
        this.addWindow(this.cancelWindow);
    }

    Scene_SlidingPuzzle.prototype.onCancelWindowOk = function () {
        if (this.cancelWindow.index() === 0) {
            this.mainWindow.setupOutputs();
            this.cancelWindow.close();
            this.mainWindow.exit();
        }
        else {
            this.cancelWindow.close();
            this.mainWindow.activate();
        }
    }

    //--------------------- Misc utils ---------------------

    /**
    * Converts a string (from plugin parameters or commands) to a number, regardless is that string contains a number literal of a variable indentifier
    * @param {String|Number} string A number or variable indentifier (in the form v42 or v0042)
    * @returns The string converted to a number
    */
    numberValue = function (string) {
        if (string[0] === 'v') return $gameVariables.value(Number(string.replace(/^v0*/, '')));
        else return Number(string);
    }

}(MAC_SlidingPuzzle);