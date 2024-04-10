//=============================================================================
// AKUNOU_OptionBase.js
// Version: 1.02
// ----------------------------------------------------------------------------
// 河原 つつみ
// 連絡先 ：『アクマの脳髄』http://www.akunou.com/
//=============================================================================

/*:
 * @plugindesc This is a base script for adding options.
 *Just by including it, the operability of options may be slightly improved.
 * @author Tsutumi Kawahara
 *
 * @param Window Options Width
 * @desc Options Change window width.
 * In cases where the display name and status display overlap.
 * @default 400
 *
 * @param Window Options Number
 * @desc Number of items to display on one screen of the options window.
 * @default 13
 *
 * @help
 * Plugin commands:
 *  no need
 * This is a script that is applied just by turning on the plugin.
 */

(function () {

	var parameters = PluginManager.parameters('AKUNOU_OptionBase');
	var windowOptionsWidth = Number(parameters['Window Options Width']);
	var windowOptionsNumber = Number(parameters['Window Options Number']);

	//-------------------------------------------------------------------------
	// ConfigManager
	//-------------------------------------------------------------------------

	var akunou8_makeData = ConfigManager.makeData;

	ConfigManager.makeData = function () {
		var config = akunou8_makeData.call(this);
		this.makeExtraData(config);
		return config;
	};

	ConfigManager.makeExtraData = function (config) {
		return config;
	};

	//-------------------------------------------------------------------------
	// Window_Options
	//-------------------------------------------------------------------------

	Window_Options.prototype.windowWidth = function () {
		return windowOptionsWidth;
	};

	Window_Options.prototype.windowHeight = function () {
		return this.fittingHeight(Math.min(this.numVisibleRows(), windowOptionsNumber));
	};

	var akunou8_makeCommandList = Window_Options.prototype.makeCommandList;

	Window_Options.prototype.makeCommandList = function () {
		this.addExtraOptions();
		akunou8_makeCommandList.call(this);
	}

	Window_Options.prototype.addExtraOptions = function () {
	};
	/*
		Window_Options.prototype.statusText = function (index) {
			var symbol = this.commandSymbol(index);
			var value = this.getConfigValue(symbol);
			if (this.isVolumeSymbol(symbol)) {
				return this.volumeStatusText(value);
			} else if (this.isHexSymbol(symbol)) {
				return value;
			} else if (this.isKeySymbol(symbol)) {
				return this.keyStatusText(symbol, value);
			} else {
				return this.booleanStatusText(value);
			}
		};*/

	Window_Options.prototype.isHexSymbol = function (symbol) {
		return symbol.contains('Hex');
	};

	Window_Options.prototype.isOpacitySymbol = function (symbol) {
		return symbol.contains('Opacity');
	};

	Window_Options.prototype.isColorSymbol = function (symbol) {
		return symbol.contains('Color');
	};

	Window_Options.prototype.isKeySymbol = function (symbol) {
		return symbol.contains('Key');
	};

	Window_Options.prototype.isDefaultSymbol = function (symbol) {
		return symbol.contains('default');
	};

	Window_Options.prototype.keyStatusText = function (symbol, value) {
		return null;
	};

	Window_Options.prototype.keyLength = function (symbol) {
		return null;
	};
	/*
		Window_Options.prototype.processOk = function () {
			var index = this.index();
			var symbol = this.commandSymbol(index);
			var value = this.getConfigValue(symbol);
			var lastValue = value;
			if (this.isDefaultSymbol(symbol)) {
				this.defaultAll();
				SoundManager.playOk();
			} else if (this.isVolumeSymbol(symbol)) {
				value += this.volumeOffset();
				if (lastValue < 100 && value > 100) {
					value = 100;
				}
				if (value > 100) {
					value = 0;
				}
				value = value.clamp(0, 100);
				this.changeValue(symbol, value);
			} else if (this.isOpacitySymbol(symbol)) {
				value += this.opacityOffset();
				if (lastValue < 255 && value > 255) {
					value = 255;
				}
				if (value > 255) {
					value = 0;
				}
				value = value.clamp(0, 255);
				this.changeValue(symbol, value);
			} else if (this.isColorSymbol(symbol)) {
				value += this.colorOffset();
				if (lastValue < 255 && value > 255) {
					value = 255;
				}
				if (value > 255) {
					value = -255;
				}
				value = value.clamp(-255, 255);
				this.changeValue(symbol, value);
			} else if (this.isKeySymbol(symbol)) {
				value += 1;
				if (value > this.keyLength(symbol)) {
					value = 0;
				}
				value = value.clamp(0, this.keyLength(symbol));
				this.changeValue(symbol, value);
			} else {
				this.changeValue(symbol, !value);
			}
		};*/
	/*
		Window_Options.prototype.cursorRight = function (wrap) {
			var index = this.index();
			var symbol = this.commandSymbol(index);
			var value = this.getConfigValue(symbol);
			var lastValue = value;
			if (this.isDefaultSymbol(symbol)) {
			} else if (this.isVolumeSymbol(symbol)) {
				value += this.volumeOffset();
				if (lastValue < 100 && value > 100) {
					value = 100;
				}
				if (wrap && value > 100) {
					value = 0;
				}
				value = value.clamp(0, 100);
				this.changeValue(symbol, value);
			} else if (this.isOpacitySymbol(symbol)) {
				value += this.opacityOffset();
				if (lastValue < 255 && value > 255) {
					value = 255;
				}
				if (wrap && value > 255) {
					value = 0;
				}
				value = value.clamp(0, 255);
				this.changeValue(symbol, value);
			} else if (this.isColorSymbol(symbol)) {
				value += this.colorOffset();
				if (lastValue < 255 && value > 255) {
					value = 255;
				}
				if (wrap && value > 255) {
					value = -255;
				}
				value = value.clamp(-255, 255);
				this.changeValue(symbol, value);
			} else if (this.isKeySymbol(symbol)) {
				value += 1;
				if (wrap && value > this.keyLength(symbol)) {
					value = 0;
				}
				value = value.clamp(0, this.keyLength(symbol));
				this.changeValue(symbol, value);
			} else {
				if (wrap) {
					this.changeValue(symbol, !value);
				} else {
					this.changeValue(symbol, true);
				}
			}
		};
	
		Window_Options.prototype.cursorLeft = function (wrap) {
			var index = this.index();
			var symbol = this.commandSymbol(index);
			var value = this.getConfigValue(symbol);
			var lastValue = value;
			if (this.isDefaultSymbol(symbol)) {
			} else if (this.isVolumeSymbol(symbol)) {
				value -= this.volumeOffset();
				if (lastValue > 0 && value < 0) {
					value = 0;
				}
				if (wrap && value < 0) {
					value = 100;
				}
				value = value.clamp(0, 100);
				this.changeValue(symbol, value);
			} else if (this.isOpacitySymbol(symbol)) {
				value -= this.opacityOffset();
				if (lastValue > 0 && value < 0) {
					value = 0;
				}
				if (wrap && value < 0) {
					value = 255;
				}
				value = value.clamp(0, 255);
				this.changeValue(symbol, value);
			} else if (this.isColorSymbol(symbol)) {
				value -= this.colorOffset();
				if (lastValue > -255 && value < -255) {
					value = -255;
				}
				if (wrap && value < -255) {
					value = 255;
				}
				value = value.clamp(-255, 255);
				this.changeValue(symbol, value);
			} else if (this.isKeySymbol(symbol)) {
				value -= 1;
				if (wrap && value < 0) {
					value = this.keyLength(symbol);
				}
				value = value.clamp(0, this.keyLength(symbol));
				this.changeValue(symbol, value);
			} else {
				if (wrap) {
					this.changeValue(symbol, !value);
				} else {
					this.changeValue(symbol, false);
				}
			}
		};
	*/
})();
