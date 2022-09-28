/*:
* @plugindesc Teleportation Plugin
*
* @author Sagi007
*
* @help 
* Teleport Name = Location shown in menu.
* Teleport Map = Mapid number for location.
* Teleport CoordsX = x-coords for location.
* Teleport CoordsY = y-coords for location.
*
* By default all locations are Invisable.
* PluginCommand: 'Show' = true, 'NoShow' = false. Example Show1, NoShow3
* true = visable, false = visable;
*
* By default all locations are enabled.
* PluginCommand: 'Act' = true, 'NoAct' = false. Example Act4, NoAct2
* Enabled = true, Disabled = false.
*
* Call Plugin : SceneManager.push(Scene_Teleport)
* Call Plugin In Yanfly's menu: this.Teleport.bind(this)
*
* @param Teleport Name 1
* @default Palet Town
*
* @param Teleport Map 1
* @default 1
*
* @param Teleport CoordsX 1
* @default 8
*
* @param Teleport CoordsY 1
* @default 9
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 2
* @default Smallville
*
* @param Teleport Map 2
* @default 2
*
* @param Teleport CoordsX 2
* @default 14
*
* @param Teleport CoordsY 2
* @default 15
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 3
* @default
*
* @param Teleport Map 3
* @default
*
* @param Teleport CoordsX 3
* @default
*
* @param Teleport CoordsY 3
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 4 
* @default
*
* @param Teleport Map 4
* @default
*
* @param Teleport CoordsX 4
* @default
*
* @param Teleport CoordsY 4
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 5
* @default
*
* @param Teleport Map 5
* @default
*
* @param Teleport CoordsX 5
* @default
*
* @param Teleport CoordsY 5
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 6
* @default
*
* @param Teleport Map 6
* @default
*
* @param Teleport CoordsX 6
* @default
*
* @param Teleport CoordsY 6
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 7
* @default
*
* @param Teleport Map 7
* @default
*
* @param Teleport CoordsX 7
* @default
*
* @param Teleport CoordsY 7
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 8
* @default
*
* @param Teleport Map 8
* @default
*
* @param Teleport CoordsX 8
* @default
*
* @param Teleport CoordsY 8
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 9
* @default
*
* @param Teleport Map 9
* @default
*
* @param Teleport CoordsX 9
* @default
*
* @param Teleport CoordsY 9
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 10
* @default
*
* @param Teleport Map 10
* @default
*
* @param Teleport CoordsX 10
* @default
*
* @param Teleport CoordsY 10
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 11
* @default
*
* @param Teleport Map 11
* @default
*
* @param Teleport CoordsX 11
* @default
*
* @param Teleport CoordsY 11
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 12
* @default
*
* @param Teleport Map 12
* @default
*
* @param Teleport CoordsX 12
* @default
*
* @param Teleport CoordsY 12
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 13
* @default
*
* @param Teleport Map 13
* @default
*
* @param Teleport CoordsX 13
* @default
*
* @param Teleport CoordsY 13
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 14
* @default
*
* @param Teleport Map 14
* @default
*
* @param Teleport CoordsX 14
* @default
*
* @param Teleport CoordsY 14
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 15
* @default
*
* @param Teleport Map 15
* @default
*
* @param Teleport CoordsX 15
* @default
*
* @param Teleport CoordsY 15
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 16
* @default
*
* @param Teleport Map 16
* @default
*
* @param Teleport CoordsX 16
* @default
*
* @param Teleport CoordsY 16
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 17
* @default
*
* @param Teleport Map 17
* @default
*
* @param Teleport CoordsX 17
* @default
*
* @param Teleport CoordsY 17
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 18
* @default
*
* @param Teleport Map 18
* @default
*
* @param Teleport CoordsX 18
* @default
*
* @param Teleport CoordsY 18
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 19
* @default
*
* @param Teleport Map 19
* @default
*
* @param Teleport CoordsX 19
* @default
*
* @param Teleport CoordsY 19
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 20
* @default
*
* @param Teleport Map 20
* @default
*
* @param Teleport CoordsX 20
* @default
*
* @param Teleport CoordsY 20
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 21
* @default
*
* @param Teleport Map 21
* @default
*
* @param Teleport CoordsX 21
* @default
*
* @param Teleport CoordsY 21
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 22
* @default
*
* @param Teleport Map 22
* @default
*
* @param Teleport CoordsX 22
* @default
*
* @param Teleport CoordsY 22
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 23
* @default
*
* @param Teleport Map 23
* @default
*
* @param Teleport CoordsX 23
* @default
*
* @param Teleport CoordsY 23
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 24
* @default
*
* @param Teleport Map 24
* @default
*
* @param Teleport CoordsX 24
* @default
*
* @param Teleport CoordsY 24
* @default
*
* @param --------------------
* @default -------------------------------
*
* @param Teleport Name 25
* @default
*
* @param Teleport Map 25
* @default
*
* @param Teleport CoordsX 25
* @default
*
* @param Teleport CoordsY 25
* @default
*
* @param --------------------
* @default -------------------------------
*
*/
//-----------------------------------------------------------------------------

var parameters = PluginManager.parameters('Teleport');

var NAME1 = parameters['Teleport Name 1'];
var NAME2 = parameters['Teleport Name 2'];
var NAME3 = parameters['Teleport Name 3'];
var NAME4 = parameters['Teleport Name 4'];
var NAME5 = parameters['Teleport Name 5'];
var NAME6 = parameters['Teleport Name 6'];
var NAME7 = parameters['Teleport Name 7'];
var NAME8 = parameters['Teleport Name 8'];
var NAME9 = parameters['Teleport Name 9'];
var NAME10 = parameters['Teleport Name 10'];
var NAME11 = parameters['Teleport Name 11'];
var NAME12 = parameters['Teleport Name 12'];
var NAME13 = parameters['Teleport Name 13'];
var NAME14 = parameters['Teleport Name 14'];
var NAME15 = parameters['Teleport Name 15'];
var NAME16 = parameters['Teleport Name 16'];
var NAME17 = parameters['Teleport Name 17'];
var NAME18 = parameters['Teleport Name 18'];
var NAME19 = parameters['Teleport Name 19'];
var NAME20 = parameters['Teleport Name 20'];
var NAME21 = parameters['Teleport Name 21'];
var NAME22 = parameters['Teleport Name 22'];
var NAME23 = parameters['Teleport Name 23'];
var NAME24 = parameters['Teleport Name 24'];
var NAME25 = parameters['Teleport Name 25'];

var Map1 = parameters['Teleport Map 1'];
var Map2 = parameters['Teleport Map 2'];
var Map3 = parameters['Teleport Map 3'];
var Map4 = parameters['Teleport Map 4'];
var Map5 = parameters['Teleport Map 5'];
var Map6 = parameters['Teleport Map 6'];
var Map7 = parameters['Teleport Map 7'];
var Map8 = parameters['Teleport Map 8'];
var Map9 = parameters['Teleport Map 9'];
var Map10 = parameters['Teleport Map 10'];
var Map11 = parameters['Teleport Map 11'];
var Map12 = parameters['Teleport Map 12'];
var Map13 = parameters['Teleport Map 13'];
var Map14 = parameters['Teleport Map 14'];
var Map15 = parameters['Teleport Map 15'];
var Map16 = parameters['Teleport Map 16'];
var Map17 = parameters['Teleport Map 17'];
var Map18 = parameters['Teleport Map 18'];
var Map19 = parameters['Teleport Map 19'];
var Map20 = parameters['Teleport Map 20'];
var Map21 = parameters['Teleport Map 21'];
var Map22 = parameters['Teleport Map 22'];
var Map23 = parameters['Teleport Map 23'];
var Map24 = parameters['Teleport Map 24'];
var Map25 = parameters['Teleport Map 25'];

var CoordsX1 = parameters['Teleport CoordsX 1'];
var CoordsX2 = parameters['Teleport CoordsX 2'];
var CoordsX3 = parameters['Teleport CoordsX 3'];
var CoordsX4 = parameters['Teleport CoordsX 4'];
var CoordsX5 = parameters['Teleport CoordsX 5'];
var CoordsX6 = parameters['Teleport CoordsX 6'];
var CoordsX7 = parameters['Teleport CoordsX 7'];
var CoordsX8 = parameters['Teleport CoordsX 8'];
var CoordsX9 = parameters['Teleport CoordsX 9'];
var CoordsX10 = parameters['Teleport CoordsX 10'];
var CoordsX11 = parameters['Teleport CoordsX 11'];
var CoordsX12 = parameters['Teleport CoordsX 12'];
var CoordsX13 = parameters['Teleport CoordsX 13'];
var CoordsX14 = parameters['Teleport CoordsX 14'];
var CoordsX15 = parameters['Teleport CoordsX 15'];
var CoordsX16 = parameters['Teleport CoordsX 16'];
var CoordsX17 = parameters['Teleport CoordsX 17'];
var CoordsX18 = parameters['Teleport CoordsX 18'];
var CoordsX19 = parameters['Teleport CoordsX 19'];
var CoordsX20 = parameters['Teleport CoordsX 20'];
var CoordsX21 = parameters['Teleport CoordsX 21'];
var CoordsX22 = parameters['Teleport CoordsX 22'];
var CoordsX23 = parameters['Teleport CoordsX 23'];
var CoordsX24 = parameters['Teleport CoordsX 24'];
var CoordsX25 = parameters['Teleport CoordsX 25'];

var CoordsY1 = parameters['Teleport CoordsY 1'];
var CoordsY2 = parameters['Teleport CoordsY 2'];
var CoordsY3 = parameters['Teleport CoordsY 3'];
var CoordsY4 = parameters['Teleport CoordsY 4'];
var CoordsY5 = parameters['Teleport CoordsY 5'];
var CoordsY6 = parameters['Teleport CoordsY 6'];
var CoordsY7 = parameters['Teleport CoordsY 7'];
var CoordsY8 = parameters['Teleport CoordsY 8'];
var CoordsY9 = parameters['Teleport CoordsY 9'];
var CoordsY10 = parameters['Teleport CoordsY 10'];
var CoordsY11 = parameters['Teleport CoordsY 11'];
var CoordsY12 = parameters['Teleport CoordsY 12'];
var CoordsY13 = parameters['Teleport CoordsY 13'];
var CoordsY14 = parameters['Teleport CoordsY 14'];
var CoordsY15 = parameters['Teleport CoordsY 15'];
var CoordsY16 = parameters['Teleport CoordsY 16'];
var CoordsY17 = parameters['Teleport CoordsY 17'];
var CoordsY18 = parameters['Teleport CoordsY 18'];
var CoordsY19 = parameters['Teleport CoordsY 19'];
var CoordsY20 = parameters['Teleport CoordsY 20'];
var CoordsY21 = parameters['Teleport CoordsY 21'];
var CoordsY22 = parameters['Teleport CoordsY 22'];
var CoordsY23 = parameters['Teleport CoordsY 23'];
var CoordsY24 = parameters['Teleport CoordsY 24'];
var CoordsY25 = parameters['Teleport CoordsY 25'];




function Scene_Teleport() {
    this.initialize.apply(this, arguments);
}

Scene_Menu.prototype.Teleport = function () {
    SceneManager.push(Scene_Teleport);
};

Scene_Teleport.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Teleport.prototype.constructor = Scene_Teleport;


Scene_Teleport.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Teleport.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this._sampleWindow = new Telbg_Window(0, 0);
    this.addWindow(this._sampleWindow);
    this.createCommandWindow();
};

Scene_Teleport.prototype.stop = function () {
    Scene_MenuBase.prototype.stop.call(this);
    this._commandWindow.close();
};

Scene_Teleport.prototype.createCommandWindow = function () {
    this._commandWindow = new Window_Teleport();
    this._commandWindow.setHandler('Teleport Name 1', this.Teleport1.bind(this));
    this._commandWindow.setHandler('Teleport Name 2', this.Teleport2.bind(this));
    this._commandWindow.setHandler('Teleport Name 3', this.Teleport3.bind(this));
    this._commandWindow.setHandler('Teleport Name 4', this.Teleport4.bind(this));
    this._commandWindow.setHandler('Teleport Name 5', this.Teleport5.bind(this));
    this._commandWindow.setHandler('Teleport Name 6', this.Teleport6.bind(this));
    this._commandWindow.setHandler('Teleport Name 7', this.Teleport7.bind(this));
    this._commandWindow.setHandler('Teleport Name 8', this.Teleport8.bind(this));
    this._commandWindow.setHandler('Teleport Name 9', this.Teleport9.bind(this));
    this._commandWindow.setHandler('Teleport Name 10', this.Teleport10.bind(this));
    this._commandWindow.setHandler('Teleport Name 11', this.Teleport11.bind(this));
    this._commandWindow.setHandler('Teleport Name 12', this.Teleport12.bind(this));
    this._commandWindow.setHandler('Teleport Name 13', this.Teleport13.bind(this));
    this._commandWindow.setHandler('Teleport Name 14', this.Teleport14.bind(this));
    this._commandWindow.setHandler('Teleport Name 15', this.Teleport15.bind(this));
    this._commandWindow.setHandler('Teleport Name 16', this.Teleport16.bind(this));
    this._commandWindow.setHandler('Teleport Name 17', this.Teleport17.bind(this));
    this._commandWindow.setHandler('Teleport Name 18', this.Teleport18.bind(this));
    this._commandWindow.setHandler('Teleport Name 19', this.Teleport19.bind(this));
    this._commandWindow.setHandler('Teleport Name 20', this.Teleport20.bind(this));
    this._commandWindow.setHandler('Teleport Name 21', this.Teleport20.bind(this));
    this._commandWindow.setHandler('Teleport Name 22', this.Teleport20.bind(this));
    this._commandWindow.setHandler('Teleport Name 23', this.Teleport20.bind(this));
    this._commandWindow.setHandler('Teleport Name 24', this.Teleport20.bind(this));
    this._commandWindow.setHandler('Teleport Name 25', this.Teleport20.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};



Scene_Teleport.prototype.Teleport1 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map1, Number(CoordsX1), Number(CoordsY1));
};
Scene_Teleport.prototype.Teleport2 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map2, Number(CoordsX2), Number(CoordsY2));
};
Scene_Teleport.prototype.Teleport3 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map3, Number(CoordsX3), Number(CoordsY3));
};
Scene_Teleport.prototype.Teleport4 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map4, Number(CoordsX4), Number(CoordsY4));
};
Scene_Teleport.prototype.Teleport5 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map5, Number(CoordsX5), Number(CoordsY5));
};
Scene_Teleport.prototype.Teleport6 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map6, Number(CoordsX6), Number(CoordsY6));
};
Scene_Teleport.prototype.Teleport7 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map7, Number(CoordsX7), Number(CoordsY7));
};
Scene_Teleport.prototype.Teleport8 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map8, Number(CoordsX8), Number(CoordsY8));
};
Scene_Teleport.prototype.Teleport9 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map9, Number(CoordsX9), Number(CoordsY9));
};
Scene_Teleport.prototype.Teleport10 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map10, Number(CoordsX10), Number(CoordsY10));
};
Scene_Teleport.prototype.Teleport11 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map11, Number(CoordsX11), Number(CoordsY11));
};
Scene_Teleport.prototype.Teleport12 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map12, Number(CoordsX12), Number(CoordsY12));
};
Scene_Teleport.prototype.Teleport13 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map13, Number(CoordsX13), Number(CoordsY13));
};
Scene_Teleport.prototype.Teleport14 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map14, Number(CoordsX14), Number(CoordsY14));
};
Scene_Teleport.prototype.Teleport15 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map15, Number(CoordsX15), Number(CoordsY15));
};
Scene_Teleport.prototype.Teleport16 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map16, Number(CoordsX16), Number(CoordsY16));
};
Scene_Teleport.prototype.Teleport17 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map17, Number(CoordsX17), Number(CoordsY17));
};
Scene_Teleport.prototype.Teleport18 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map18, Number(CoordsX18), Number(CoordsY18));
};
Scene_Teleport.prototype.Teleport19 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map19, Number(CoordsX19), Number(CoordsY19));
};
Scene_Teleport.prototype.Teleport20 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map20, Number(CoordsX20), Number(CoordsY20));
};
Scene_Teleport.prototype.Teleport21 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map21, Number(CoordsX21), Number(CoordsY21));
};
Scene_Teleport.prototype.Teleport22 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map22, Number(CoordsX22), Number(CoordsY22));
};
Scene_Teleport.prototype.Teleport23 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map23, Number(CoordsX23), Number(CoordsY23));
};
Scene_Teleport.prototype.Teleport24 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map24, Number(CoordsX24), Number(CoordsY24));
};
Scene_Teleport.prototype.Teleport25 = function () {
    SceneManager.goto(Scene_Map);
    $gamePlayer.reserveTransfer(Map25, Number(CoordsX25), Number(CoordsY25));
};

function Window_Teleport() {
    this.initialize.apply(this, arguments);
}

Window_Teleport.prototype = Object.create(Window_Command.prototype);
Window_Teleport.prototype.constructor = Window_Teleport;

Window_Teleport.prototype.initialize = function () {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
    this.open();
};

Window_Teleport.prototype.windowWidth = function () {
    return Graphics.width - 90
};

Window_Teleport.prototype.windowHeight = function () {
    return Graphics.height - 90
};

Window_Teleport.prototype.maxCols = function () {
    return 2;
};

Window_Teleport.prototype.updatePlacement = function () {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
};

Window_Teleport.prototype.makeCommandList = function () {
    if ($gameSystem.isSeen1()) {
        this.addCommand(NAME1, 'Teleport Name 1', ($gameSystem.isEnabled1()));
    }
    if ($gameSystem.isSeen2()) {
        this.addCommand(NAME2, 'Teleport Name 2', ($gameSystem.isEnabled2()));
    }
    if ($gameSystem.isSeen3()) {
        this.addCommand(NAME3, 'Teleport Name 3', ($gameSystem.isEnabled3()));
    }
    if ($gameSystem.isSeen4()) {
        this.addCommand(NAME4, 'Teleport Name 4', ($gameSystem.isEnabled4()));
    }
    if ($gameSystem.isSeen5()) {
        this.addCommand(NAME5, 'Teleport Name 5', ($gameSystem.isEnabled5()));
    }
    if ($gameSystem.isSeen6()) {
        this.addCommand(NAME6, 'Teleport Name 6', ($gameSystem.isEnabled6()));
    }
    if ($gameSystem.isSeen7()) {
        this.addCommand(NAME7, 'Teleport Name 7', ($gameSystem.isEnabled7()));
    }
    if ($gameSystem.isSeen8()) {
        this.addCommand(NAME8, 'Teleport Name 8', ($gameSystem.isEnabled8()));
    }
    if ($gameSystem.isSeen9()) {
        this.addCommand(NAME9, 'Teleport Name 9', ($gameSystem.isEnabled9()));
    }
    if ($gameSystem.isSeen10()) {
        this.addCommand(NAME10, 'Teleport Name 10', ($gameSystem.isEnabled10()));
    }
    if ($gameSystem.isSeen11()) {
        this.addCommand(NAME11, 'Teleport Name 11', ($gameSystem.isEnabled11()));
    }
    if ($gameSystem.isSeen12()) {
        this.addCommand(NAME12, 'Teleport Name 12', ($gameSystem.isEnabled12()));
    }
    if ($gameSystem.isSeen13()) {
        this.addCommand(NAME13, 'Teleport Name 13', ($gameSystem.isEnabled13()));
    }
    if ($gameSystem.isSeen14()) {
        this.addCommand(NAME14, 'Teleport Name 14', ($gameSystem.isEnabled14()));
    }
    if ($gameSystem.isSeen15()) {
        this.addCommand(NAME15, 'Teleport Name 15', ($gameSystem.isEnabled15()));
    }
    if ($gameSystem.isSeen16()) {
        this.addCommand(NAME16, 'Teleport Name 16', ($gameSystem.isEnabled16()));
    }
    if ($gameSystem.isSeen17()) {
        this.addCommand(NAME17, 'Teleport Name 17', ($gameSystem.isEnabled17()));
    }
    if ($gameSystem.isSeen18()) {
        this.addCommand(NAME18, 'Teleport Name 18', ($gameSystem.isEnabled18()));
    }
    if ($gameSystem.isSeen19()) {
        this.addCommand(NAME19, 'Teleport Name 19', ($gameSystem.isEnabled19()));
    }
    if ($gameSystem.isSeen20()) {
        this.addCommand(NAME20, 'Teleport Name 20', ($gameSystem.isEnabled20()));
    }
    if ($gameSystem.isSeen21()) {
        this.addCommand(NAME21, 'Teleport Name 21', ($gameSystem.isEnabled21()));
    }
    if ($gameSystem.isSeen22()) {
        this.addCommand(NAME22, 'Teleport Name 22', ($gameSystem.isEnabled22()));
    }
    if ($gameSystem.isSeen23()) {
        this.addCommand(NAME23, 'Teleport Name 23', ($gameSystem.isEnabled23()));
    }
    if ($gameSystem.isSeen24()) {
        this.addCommand(NAME24, 'Teleport Name 24', ($gameSystem.isEnabled24()));
    }
    if ($gameSystem.isSeen25()) {
        this.addCommand(NAME25, 'Teleport Name 25', ($gameSystem.isEnabled25()));
    }
};



function Telbg_Window() {
    this.initialize.apply(this, arguments);
}

Telbg_Window.prototype = Object.create(Window_Base.prototype);
Telbg_Window.prototype.constructor = Telbg_Window;

Telbg_Window.prototype.initialize = function (x, y) {
    var width = Graphics.width
    var height = Graphics.height
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Telbg_Window.prototype.refresh = function () {
    this.contents.clear();
};




var aliasTel = Game_Interpreter.prototype.pluginCommand

Game_Interpreter.prototype.pluginCommand = function (command, args) {
    aliasTel.call(this, command, args);


    if (command == 'NoShow1') {
        $gameSystem.blind1();
    }
    if (command == 'Show1') {
        $gameSystem.seen1();
    }

    if (command == 'NoShow2') {
        $gameSystem.blind2();
    }
    if (command == 'Show2') {
        $gameSystem.seen2();
    }

    if (command == 'NoShow3') {
        $gameSystem.blind3();
    }
    if (command == 'Show3') {
        $gameSystem.seen3();
    }

    if (command == 'NoShow4') {
        $gameSystem.blind4();
    }
    if (command == 'Show4') {
        $gameSystem.seen4();
    }

    if (command == 'NoShow5') {
        $gameSystem.blind5();
    }
    if (command == 'Show5') {
        $gameSystem.seen5();
    }

    if (command == 'NoShow6') {
        $gameSystem.blind6();
    }
    if (command == 'Show6') {
        $gameSystem.seen6();
    }

    if (command == 'NoShow7') {
        $gameSystem.blind7();
    }
    if (command == 'Show7') {
        $gameSystem.seen7();
    }

    if (command == 'NoShow8') {
        $gameSystem.blind8();
    }
    if (command == 'Show8') {
        $gameSystem.seen8();
    }

    if (command == 'NoShow9') {
        $gameSystem.blind9();
    }
    if (command == 'Show9') {
        $gameSystem.seen9();
    }

    if (command == 'NoShow10') {
        $gameSystem.blind10();
    }
    if (command == 'Show10') {
        $gameSystem.seen10();
    }

    if (command == 'NoShow11') {
        $gameSystem.blind11();
    }
    if (command == 'Show11') {
        $gameSystem.seen11();
    }

    if (command == 'NoShow12') {
        $gameSystem.blind12();
    }
    if (command == 'Show12') {
        $gameSystem.seen12();
    }

    if (command == 'NoShow13') {
        $gameSystem.blind13();
    }
    if (command == 'Show13') {
        $gameSystem.seen13();
    }

    if (command == 'NoShow14') {
        $gameSystem.blind14();
    }
    if (command == 'Show14') {
        $gameSystem.seen14();
    }

    if (command == 'NoShow15') {
        $gameSystem.blind15();
    }
    if (command == 'Show15') {
        $gameSystem.seen15();
    }

    if (command == 'NoShow16') {
        $gameSystem.blind16();
    }
    if (command == 'Show16') {
        $gameSystem.seen16();
    }

    if (command == 'NoShow17') {
        $gameSystem.blind17();
    }
    if (command == 'Show17') {
        $gameSystem.seen17();
    }

    if (command == 'NoShow18') {
        $gameSystem.blind18();
    }
    if (command == 'Show18') {
        $gameSystem.seen18();
    }

    if (command == 'NoShow19') {
        $gameSystem.blind19();
    }
    if (command == 'Show19') {
        $gameSystem.seen19();
    }

    if (command == 'NoShow20') {
        $gameSystem.blind20();
    }
    if (command == 'Show20') {
        $gameSystem.seen20();
    }

    if (command == 'NoShow21') {
        $gameSystem.blind21();
    }
    if (command == 'Show21') {
        $gameSystem.seen21();
    }

    if (command == 'NoShow22') {
        $gameSystem.blind22();
    }
    if (command == 'Show22') {
        $gameSystem.seen22();
    }

    if (command == 'NoShow23') {
        $gameSystem.blind23();
    }
    if (command == 'Show23') {
        $gameSystem.seen23();
    }

    if (command == 'NoShow24') {
        $gameSystem.blind24();
    }
    if (command == 'Show24') {
        $gameSystem.seen24();
    }

    if (command == 'NoShow25') {
        $gameSystem.blind25();
    }
    if (command == 'Show25') {
        $gameSystem.seen25();
    }





    if (command == 'NoAct1') {
        $gameSystem.disable1();
    }
    if (command == 'Act1') {
        $gameSystem.enabled1();
    }

    if (command == 'NoAct2') {
        $gameSystem.disable2();
    }
    if (command == 'Act2') {
        $gameSystem.enabled2();
    }

    if (command == 'NoAct3') {
        $gameSystem.disable3();
    }
    if (command == 'Act3') {
        $gameSystem.enabled3();
    }

    if (command == 'NoAct4') {
        $gameSystem.disable4();
    }
    if (command == 'Act4') {
        $gameSystem.enabled4();
    }

    if (command == 'NoAct5') {
        $gameSystem.disable5();
    }
    if (command == 'Act5') {
        $gameSystem.enabled5();
    }

    if (command == 'NoAct6') {
        $gameSystem.disable6();
    }
    if (command == 'Act6') {
        $gameSystem.enabled6();
    }

    if (command == 'NoAct7') {
        $gameSystem.disable7();
    }
    if (command == 'Act7') {
        $gameSystem.enabled7();
    }

    if (command == 'NoAct8') {
        $gameSystem.disable8();
    }
    if (command == 'Act8') {
        $gameSystem.enabled8();
    }

    if (command == 'NoAct9') {
        $gameSystem.disable9();
    }
    if (command == 'Act9') {
        $gameSystem.enabled9();
    }

    if (command == 'NoAct10') {
        $gameSystem.disable10();
    }
    if (command == 'Act10') {
        $gameSystem.enabled10();
    }

    if (command == 'NoAct11') {
        $gameSystem.disable11();
    }
    if (command == 'Act11') {
        $gameSystem.enabled11();
    }

    if (command == 'NoAct12') {
        $gameSystem.disable12();
    }
    if (command == 'Act12') {
        $gameSystem.enabled12();
    }

    if (command == 'NoAct13') {
        $gameSystem.disable13();
    }
    if (command == 'Act13') {
        $gameSystem.enabled13();
    }

    if (command == 'NoAct14') {
        $gameSystem.disable14();
    }
    if (command == 'Act14') {
        $gameSystem.enabled14();
    }

    if (command == 'NoAct15') {
        $gameSystem.disable15();
    }
    if (command == 'Act15') {
        $gameSystem.enabled15();
    }

    if (command == 'NoAct16') {
        $gameSystem.disable16();
    }
    if (command == 'Act16') {
        $gameSystem.enabled16();
    }

    if (command == 'NoAct17') {
        $gameSystem.disable17();
    }
    if (command == 'Act17') {
        $gameSystem.enabled17();
    }

    if (command == 'NoAct18') {
        $gameSystem.disable18();
    }
    if (command == 'Act18') {
        $gameSystem.enabled18;
    }

    if (command == 'NoAct19') {
        $gameSystem.disable19();
    }
    if (command == 'Act19') {
        $gameSystem.enabled19();
    }

    if (command == 'NoAct20') {
        $gameSystem.disable20();
    }
    if (command == 'Act20') {
        $gameSystem.enabled20();
    }

    if (command == 'NoAct21') {
        $gameSystem.disable21();
    }
    if (command == 'Act21') {
        $gameSystem.enabled21();
    }

    if (command == 'NoAct22') {
        $gameSystem.disable22();
    }
    if (command == 'Act22') {
        $gameSystem.enabled22();
    }

    if (command == 'NoAct23') {
        $gameSystem.disable23();
    }
    if (command == 'Act23') {
        $gameSystem.enabled23();
    }

    if (command == 'NoAct24') {
        $gameSystem.disable24();
    }
    if (command == 'Act24') {
        $gameSystem.enabled24();
    }

    if (command == 'NoAct25') {
        $gameSystem.disable25();
    }
    if (command == 'Act25') {
        $gameSystem.enabled25();
    }
};





Game_System.prototype.initialize = function () {
    this._enabled1 = true
    this._enabled2 = true
    this._enabled3 = true
    this._enabled4 = true
    this._enabled5 = true
    this._enabled6 = true
    this._enabled7 = true
    this._enabled8 = true
    this._enabled9 = true
    this._enabled10 = true
    this._enabled11 = true
    this._enabled12 = true
    this._enabled13 = true
    this._enabled14 = true
    this._enabled15 = true
    this._enabled16 = true
    this._enabled17 = true
    this._enabled18 = true
    this._enabled19 = true
    this._enabled20 = true
    this._enabled21 = true
    this._enabled22 = true
    this._enabled23 = true
    this._enabled24 = true
    this._enabled25 = true
    this._Seen1 = false
    this._Seen2 = false
    this._Seen3 = false
    this._Seen4 = false
    this._Seen5 = false
    this._Seen6 = false
    this._Seen7 = false
    this._Seen8 = false
    this._Seen9 = false
    this._Seen10 = false
    this._Seen11 = false
    this._Seen12 = false
    this._Seen13 = false
    this._Seen14 = false
    this._Seen15 = false
    this._Seen16 = false
    this._Seen17 = false
    this._Seen18 = false
    this._Seen19 = false
    this._Seen20 = false
    this._Seen21 = false
    this._Seen22 = false
    this._Seen23 = false
    this._Seen24 = false
    this._Seen25 = false

    this._saveEnabled = true;
    this._menuEnabled = true;
    this._encounterEnabled = true;
    this._formationEnabled = true;
    this._battleCount = 0;
    this._winCount = 0;
    this._escapeCount = 0;
    this._saveCount = 0;
    this._versionId = 0;
    this._framesOnSave = 0;
    this._bgmOnSave = null;
    this._bgsOnSave = null;
    this._windowTone = null;
    this._battleBgm = null;
    this._victoryMe = null;
    this._defeatMe = null;
    this._savedBgm = null;
    this._walkingBgm = null;
};



Game_System.prototype.isEnabled1 = function () {
    return this._Enabled1;
};
Game_System.prototype.isEnabled2 = function () {
    return this._Enabled2;
};
Game_System.prototype.isEnabled3 = function () {
    return this._Enabled3;
};
Game_System.prototype.isEnabled4 = function () {
    return this._Enabled4;
};
Game_System.prototype.isEnabled5 = function () {
    return this._Enabled5;
};
Game_System.prototype.isEnabled6 = function () {
    return this._Enabled6;
};
Game_System.prototype.isEnabled7 = function () {
    return this._Enabled7;
};
Game_System.prototype.isEnabled8 = function () {
    return this._Enabled8;
};
Game_System.prototype.isEnabled9 = function () {
    return this._Enabled9;
};
Game_System.prototype.isEnabled10 = function () {
    return this._Enabled10;
};
Game_System.prototype.isEnabled11 = function () {
    return this._Enabled11;
};
Game_System.prototype.isEnabled12 = function () {
    return this._Enabled12;
};
Game_System.prototype.isEnabled13 = function () {
    return this._Enabled13;
};
Game_System.prototype.isEnabled14 = function () {
    return this._Enabled14;
};
Game_System.prototype.isEnabled15 = function () {
    return this._Enabled15;
};
Game_System.prototype.isEnabled16 = function () {
    return this._Enabled16;
};
Game_System.prototype.isEnabled17 = function () {
    return this._Enabled17;
};
Game_System.prototype.isEnabled18 = function () {
    return this._Enabled18;
};
Game_System.prototype.isEnabled19 = function () {
    return this._Enabled19;
};
Game_System.prototype.isEnabled20 = function () {
    return this._Enabled20;
};
Game_System.prototype.isEnabled21 = function () {
    return this._Enabled21;
};
Game_System.prototype.isEnabled22 = function () {
    return this._Enabled22;
};
Game_System.prototype.isEnabled23 = function () {
    return this._Enabled23;
};
Game_System.prototype.isEnabled24 = function () {
    return this._Enabled24;
};
Game_System.prototype.isEnabled25 = function () {
    return this._Enabled25;
};


Game_System.prototype.disable1 = function () {
    this._Enabled1 = false;
};
Game_System.prototype.disable2 = function () {
    this._Enabled2 = false;
};
Game_System.prototype.disable3 = function () {
    this._Enabled3 = false;
};
Game_System.prototype.disable4 = function () {
    this._Enabled4 = false;
};
Game_System.prototype.disable5 = function () {
    this._Enabled5 = false;
};
Game_System.prototype.disable6 = function () {
    this._Enabled6 = false;
};
Game_System.prototype.disable7 = function () {
    this._Enabled7 = false;
};
Game_System.prototype.disable8 = function () {
    this._Enabled8 = false;
};
Game_System.prototype.disable9 = function () {
    this._Enabled9 = false;
};
Game_System.prototype.disable10 = function () {
    this._Enabled10 = false;
};
Game_System.prototype.disable11 = function () {
    this._Enabled11 = false;
};
Game_System.prototype.disable12 = function () {
    this._Enabled12 = false;
};
Game_System.prototype.disable13 = function () {
    this._Enabled13 = false;
};
Game_System.prototype.disable14 = function () {
    this._Enabled14 = false;
};
Game_System.prototype.disable15 = function () {
    this._Enabled15 = false;
};
Game_System.prototype.disable16 = function () {
    this._Enabled16 = false;
};
Game_System.prototype.disable17 = function () {
    this._Enabled17 = false;
};
Game_System.prototype.disable18 = function () {
    this._Enabled18 = false;
};
Game_System.prototype.disable19 = function () {
    this._Enabled19 = false;
};
Game_System.prototype.disable20 = function () {
    this._Enabled20 = false;
};
Game_System.prototype.disable21 = function () {
    this._Enabled21 = false;
};
Game_System.prototype.disable22 = function () {
    this._Enabled22 = false;
};
Game_System.prototype.disable23 = function () {
    this._Enabled23 = false;
};
Game_System.prototype.disable24 = function () {
    this._Enabled25 = false;
};


Game_System.prototype.enable1 = function () {
    this._Enabled1 = true;
};
Game_System.prototype.enable2 = function () {
    this._Enabled2 = true;
};
Game_System.prototype.enable3 = function () {
    this._Enabled3 = true;
};
Game_System.prototype.enable4 = function () {
    this._Enabled4 = true;
};
Game_System.prototype.enable5 = function () {
    this._Enabled5 = true;
};
Game_System.prototype.enable6 = function () {
    this._Enabled6 = true;
};
Game_System.prototype.enable7 = function () {
    this._Enabled7 = true;
};
Game_System.prototype.enable8 = function () {
    this._Enabled8 = true;
};
Game_System.prototype.enable9 = function () {
    this._Enabled9 = true;
};
Game_System.prototype.enable10 = function () {
    this._Enabled10 = true;
};
Game_System.prototype.enable11 = function () {
    this._Enabled11 = true;
};
Game_System.prototype.enable12 = function () {
    this._Enabled12 = true;
};
Game_System.prototype.enable13 = function () {
    this._Enabled13 = true;
};
Game_System.prototype.enable14 = function () {
    this._Enabled14 = true;
};
Game_System.prototype.enable15 = function () {
    this._Enabled15 = true;
};
Game_System.prototype.enable16 = function () {
    this._Enabled16 = true;
};
Game_System.prototype.enable17 = function () {
    this._Enabled17 = true;
};
Game_System.prototype.enable18 = function () {
    this._Enabled18 = true;
};
Game_System.prototype.enable19 = function () {
    this._Enabled19 = true;
};
Game_System.prototype.enable20 = function () {
    this._Enabled20 = true;
};
Game_System.prototype.enable21 = function () {
    this._Enabled21 = true;
};
Game_System.prototype.enable22 = function () {
    this._Enabled22 = true;
};
Game_System.prototype.enable23 = function () {
    this._Enabled23 = true;
};
Game_System.prototype.enable24 = function () {
    this._Enabled24 = true;
};
Game_System.prototype.enable25 = function () {
    this._Enabled25 = true;
};



Game_System.prototype.isSeen1 = function () {
    return this._Seen1;
};
Game_System.prototype.isSeen2 = function () {
    return this._Seen2;
};
Game_System.prototype.isSeen3 = function () {
    return this._Seen3;
};
Game_System.prototype.isSeen4 = function () {
    return this._Seen4;
};
Game_System.prototype.isSeen5 = function () {
    return this._Seen5;
};
Game_System.prototype.isSeen6 = function () {
    return this._Seen6;
};
Game_System.prototype.isSeen7 = function () {
    return this._Seen7;
};
Game_System.prototype.isSeen8 = function () {
    return this._Seen8;
};
Game_System.prototype.isSeen9 = function () {
    return this._Seen9;
};
Game_System.prototype.isSeen10 = function () {
    return this._Seen10;
};
Game_System.prototype.isSeen11 = function () {
    return this._Seen11;
};
Game_System.prototype.isSeen12 = function () {
    return this._Seen12;
};
Game_System.prototype.isSeen13 = function () {
    return this._Seen13;
};
Game_System.prototype.isSeen14 = function () {
    return this._Seen14;
};
Game_System.prototype.isSeen15 = function () {
    return this._Seen15;
};
Game_System.prototype.isSeen16 = function () {
    return this._Seen16;
};
Game_System.prototype.isSeen17 = function () {
    return this._Seen17;
};
Game_System.prototype.isSeen18 = function () {
    return this._Seen18;
};
Game_System.prototype.isSeen19 = function () {
    return this._Seen19;
};
Game_System.prototype.isSeen20 = function () {
    return this._Seen20;
};
Game_System.prototype.isSeen21 = function () {
    return this._Seen21;
};
Game_System.prototype.isSeen22 = function () {
    return this._Seen22;
};
Game_System.prototype.isSeen23 = function () {
    return this._Seen23;
};
Game_System.prototype.isSeen24 = function () {
    return this._Seen24;
};
Game_System.prototype.isSeen25 = function () {
    return this._Seen25;
};

Game_System.prototype.blind1 = function () {
    this._Seen1 = false;
};
Game_System.prototype.blind2 = function () {
    this._Seen2 = false;
};
Game_System.prototype.blind3 = function () {
    this._Seen3 = false;
};
Game_System.prototype.blind4 = function () {
    this._Seen4 = false;
};
Game_System.prototype.blind5 = function () {
    this._Seen5 = false;
};
Game_System.prototype.blind6 = function () {
    this._Seen6 = false;
};
Game_System.prototype.blind7 = function () {
    this._Seen7 = false;
};
Game_System.prototype.blind8 = function () {
    this._Seen8 = false;
};
Game_System.prototype.blind9 = function () {
    this._Seen9 = false;
};
Game_System.prototype.blind10 = function () {
    this._Seen10 = false;
};
Game_System.prototype.blind11 = function () {
    this._Seen11 = false;
};
Game_System.prototype.blind12 = function () {
    this._Seen12 = false;
};
Game_System.prototype.blind13 = function () {
    this._Seen13 = false;
};
Game_System.prototype.blind14 = function () {
    this._Seen14 = false;
};
Game_System.prototype.blind15 = function () {
    this._Seen15 = false;
};
Game_System.prototype.blind16 = function () {
    this._Seen16 = false;
};
Game_System.prototype.blind17 = function () {
    this._Seen17 = false;
};
Game_System.prototype.blind18 = function () {
    this._Seen18 = false;
};
Game_System.prototype.blind19 = function () {
    this._Seen19 = false;
};
Game_System.prototype.blind20 = function () {
    this._Seen20 = false;
};
Game_System.prototype.blind21 = function () {
    this._Seen21 = false;
};
Game_System.prototype.blind22 = function () {
    this._Seen22 = false;
};
Game_System.prototype.blind23 = function () {
    this._Seen23 = false;
};
Game_System.prototype.blind24 = function () {
    this._Seen24 = false;
};
Game_System.prototype.blind25 = function () {
    this._Seen25 = false;
};

Game_System.prototype.seen1 = function () {
    this._Seen1 = true;
};
Game_System.prototype.seen2 = function () {
    this._Seen2 = true;
};
Game_System.prototype.seen3 = function () {
    this._Seen3 = true;
};
Game_System.prototype.seen4 = function () {
    this._Seen4 = true;
};
Game_System.prototype.seen5 = function () {
    this._Seen5 = true;
};
Game_System.prototype.seen6 = function () {
    this._Seen6 = true;
};
Game_System.prototype.seen7 = function () {
    this._Seen7 = true;
};
Game_System.prototype.seen8 = function () {
    this._Seen8 = true;
};
Game_System.prototype.seen9 = function () {
    this._Seen9 = true;
};
Game_System.prototype.seen10 = function () {
    this._Seen10 = true;
};
Game_System.prototype.seen11 = function () {
    this._Seen11 = true;
};
Game_System.prototype.seen12 = function () {
    this._Seen12 = true;
};
Game_System.prototype.seen13 = function () {
    this._Seen13 = true;
};
Game_System.prototype.seen14 = function () {
    this._Seen14 = true;
};
Game_System.prototype.seen15 = function () {
    this._Seen15 = true;
};
Game_System.prototype.seen16 = function () {
    this._Seen16 = true;
};
Game_System.prototype.seen17 = function () {
    this._Seen17 = true;
};
Game_System.prototype.seen18 = function () {
    this._Seen18 = true;
};
Game_System.prototype.seen19 = function () {
    this._Seen19 = true;
};
Game_System.prototype.seen20 = function () {
    this._Seen20 = true;
};
Game_System.prototype.seen21 = function () {
    this._Seen21 = true;
};
Game_System.prototype.seen22 = function () {
    this._Seen22 = true;
};
Game_System.prototype.seen23 = function () {
    this._Seen23 = true;
};
Game_System.prototype.seen24 = function () {
    this._Seen24 = true;
};
Game_System.prototype.seen25 = function () {
    this._Seen25 = true;
};