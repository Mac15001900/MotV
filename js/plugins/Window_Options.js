//-----------------------------------------------------------------------------
// OptionDescriptionWindow
//
// The window for displaying the description of an option.

function OptionDescriptionWindow() {
    this.initialize.apply(this, arguments);
};

OptionDescriptionWindow.prototype = Object.create(Window_Base.prototype);
OptionDescriptionWindow.prototype.constructor = OptionDescriptionWindow;

OptionDescriptionWindow.prototype.initialize = function (optionsWindow) {
    const ROW_AMOUNT = 2;
    let height = this.fittingHeight(ROW_AMOUNT) + this.textPadding() * ROW_AMOUNT;
    this.optionsWindow = optionsWindow;
    Window_Base.prototype.initialize.call(this, 0, Graphics.height - height, Graphics.width, height);
}

OptionDescriptionWindow.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    this.contents.clear();
    this.drawTextEx(s.optionDescriptions[this.optionsWindow.commandSymbol(this.optionsWindow.index())], this.textPadding(), 0, Graphics.width, 'center');
}


//-----------------------------------------------------------------------------
// Window_Options
//
//The window for changing various settings on the options screen.

function Window_Options() {
    this.initialize.apply(this, arguments);
}

Window_Options.prototype = Object.create(Window_Command.prototype);
Window_Options.prototype.constructor = Window_Options;

Window_Options.prototype.initialize = function () {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
};

Window_Options.prototype.update = function () {
    Window_Command.prototype.update.call(this);
    if (!g.getInterpreter()._waitMode) this.active = true; //This ensures we re-activate this window when the controls window is closed
}

Window_Options.prototype.windowWidth = function () {
    return 400;
};

Window_Options.prototype.windowHeight = function () {
    return this.fittingHeight(Math.min(this.numVisibleRows(), 12));
};

Window_Options.prototype.updatePlacement = function () {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
};

Window_Options.prototype.makeCommandList = function () {
    this.addCommand(s.back, 'cancel');
    this.addCommand(TextManager.alwaysDash, 'alwaysDash');
    this.addCommand(s.fullScreen, 'fullscreen');
    this.addVolumeOptions();
    this.addCommand(s.language, 'lang', g.topLevelScene() === 'Scene_Title' || MAC_DEBUG); //We really don't want the language to change mid-game
    this.addCommand(s.colorblindMode, 'cBlind');
    this.addCommand(s.controls, 'controls');
};

//Window_Options.prototype.addGeneralOptions = function () {};

Window_Options.prototype.addVolumeOptions = function () {
    this.addCommand(TextManager.bgmVolume, 'bgmVolume');
    //this.addCommand(TextManager.bgsVolume, 'bgsVolume'); // We're not using background sounds (yet xD)
    //this.addCommand(TextManager.meVolume, 'meVolume'); //Removed ME volume option (it will be set by SE volume)
    this.addCommand(TextManager.seVolume, 'seVolume');
};

Window_Options.prototype.drawItem = function (index) {
    var rect = this.itemRectForText(index);
    var statusWidth = this.statusWidth();
    var titleWidth = rect.width - statusWidth;
    this.resetTextColor();
    //if (!this.isCommandEnabled(index)) debugger;
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, 'left');
    this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'right');
};

Window_Options.prototype.statusWidth = function () {
    return 120;
};

Window_Options.prototype.statusText = function (index) {
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        return this.volumeStatusText(value);
    } else if (symbol === "cancel" || symbol === "controls") {
        return "";  //Change: not doing anything for ON/OFF
    } else if (symbol === "lang") {
        return langData.dict[value];
    } else {
        return this.booleanStatusText(value);
    }
};

Window_Options.prototype.isVolumeSymbol = function (symbol) {
    return symbol.contains('Volume');
};

Window_Options.prototype.booleanStatusText = function (value) {
    //return value ? 'ON' : 'OFF'; 
    return value ? s.on : s.off;  //Change: Translation
};

Window_Options.prototype.volumeStatusText = function (value) {
    return value + '%';
};

Window_Options.prototype.processOk = function () {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (!this.isCommandEnabled(index)) { //Change: Handle disabled fields
        this.processDisabledOption(symbol);
        return;
    }
    if (symbol === "cancel") {
        SceneManager.pop(); //Change: special case for going back
        SoundManager.playOk();
        return;
    }
    if (symbol === "controls") this.showControlsScreen();
    if (symbol === 'lang') {
        this.changeValue(symbol, langData.next());
        return;
    }
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        value += this.volumeOffset();
        if (value > 100) {
            value = 0;
        }
        value = value.clamp(0, 100);
        this.changeValue(symbol, value);
    } else {
        this.changeValue(symbol, !value);
    }
};

Window_Options.prototype.cursorRight = function (wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (!this.isCommandEnabled(index)) { //Change: Handle disabled fields
        this.processDisabledOption(symbol);
        return;
    }
    if (symbol === "cancel" || symbol === "controls") return; //Change: special case for going back, controls and language
    if (symbol === 'lang') {
        this.changeValue(symbol, langData.next());
        return;
    }
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        value += this.volumeOffset();
        value = value.clamp(0, 100);
        this.changeValue(symbol, value);
    } else {
        this.changeValue(symbol, true);
    }
};

Window_Options.prototype.cursorLeft = function (wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (!this.isCommandEnabled(index)) { //Change: Handle disabled fields
        this.processDisabledOption(symbol);
        return;
    }
    if (symbol === "cancel" || symbol === "controls") return; //Change: special case for going back, controls and language
    if (symbol === 'lang') {
        this.changeValue(symbol, langData.previous());
        return;
    }
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        value -= this.volumeOffset();
        value = value.clamp(0, 100);
        this.changeValue(symbol, value);
    } else {
        this.changeValue(symbol, false);
    }
};

Window_Options.prototype.processDisabledOption = function (symbol) {
    //TODO: make a sound?
}

Window_Options.prototype.showControlsScreen = function () {
    let inp = g.getInterpreter();
    this.active = false;
    inp.pluginCommand('SetQuestionWindowData', ['1', '1', 'center']);
    inp.pluginCommand('SetQuestionWindowChoices', ['OK']);
    inp.pluginCommand('CreateQuestionWindow', ['3', s.controlsScreen]);
    //TODO re-activate it when the question window is done
}

Window_Options.prototype.volumeOffset = function () {
    return 5;
};

Window_Options.prototype.changeValue = function (symbol, value) {
    var lastValue = this.getConfigValue(symbol);
    if (lastValue !== value) {
        this.setConfigValue(symbol, value);
        this.redrawItem(this.findSymbol(symbol));
        SoundManager.playCursor();
    }
};

Window_Options.prototype.getConfigValue = function (symbol) {
    return ConfigManager[symbol];
};

Window_Options.prototype.setConfigValue = function (symbol, volume) {
    ConfigManager[symbol] = volume;
};