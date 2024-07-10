/*:
 * @plugindesc Adds a Fullscreen Toggle to the Options Window. Also now used to add other config options.
 * @author SumRndmDde
 *
 * @param Option Name
 * @desc The name used by the Fullscreen Toggle option.
 * @default Fullscreen
 *
 * @param Position
 * @desc The position of the option in the Options Window.
 * Choices are: Top, Middle, Bottom
 * @default Middle
 *
 * @param Default Value
 * @desc The default value of the option first time playing.
 * true = on    false = off
 * @default false
 *
 * @param Persist Default?
 * @desc If set to true, then the game will always start with the Default Value.  (Choices are: true, false)
 * @default false
 *
 * @help
 *
 * Fullscreen Toggle Option
 * Version 1.00
 * SumRndmDde
 *
 *
 * Important Notes:
 * This plugin does not have any plugin commands.
 * All functions are aliased.
 *
 *
 * How to Use:
 *
 * Adds a Fullscreen Toggle to the Options Window.
 *
 * 
 * Plugin Commands:
 *
 * ToggleScreenType
 * Switches between fullscreen mode and windowed mode.
 *
 *
 * Thanks for reading!
 * If you have questions, please do not hesitate to ask on my YouTube channel:
 * https://www.youtube.com/SumRndmDde
 *
 * Until next time,
 *   ~ SumRndmDde
 */

(function () {

	var parameters = PluginManager.parameters('SRD_FullscreenToggleOption');

	var optionName = String(parameters['Option Name']);
	var defaultValue = String(parameters['Default Value']).trim().toLowerCase() === 'true';
	var position = String(parameters['Position']).toLowerCase();
	var persist = String(parameters['Persist Default?']).trim().toLowerCase() === 'true';

	defaultStretchValue = function () { //Checks if screen stretching should be enabled by default (depends on user's screen resolution)
		const TARGET_WIDTH = 1920, TARGET_HEIGHT = 1080;
		let w = screen.width, h = screen.height;
		if (w < TARGET_WIDTH || h < TARGET_HEIGHT) return true; //1080p won't fit on this screen, so we must (regretably) stretch
		return Number.isInteger(w / TARGET_WIDTH) && Number.isInteger(h / TARGET_HEIGHT); //Also stretch if we can safely do so, because the screen is a multiple of 1080p
	}


	ConfigManager.fullscreen = defaultValue;
	ConfigManager.stretchMode = defaultStretchValue();
	ConfigManager.markerMode = false; //True when toggling, false when holding

	const PREFERRED_WINDOW_SIZES = [[1920, 1080], [1280, 720], [640, 360]];
	const ADJUST_WINDOW_SIZE = true;

	Object.defineProperty(ConfigManager, 'fullscreen', {
		get: function () {
			return g.fullScreen;
		},
		set: function (value) {
			if (value) {
				g.fullScreen = true;
				Graphics._requestFullScreen();
				if (!g.stretchMode) {
					Graphics._stretchEnabled = false;
					Graphics._updateAllElements();
				}
			} else {
				g.fullScreen = false;
				Graphics._cancelFullScreen();
				if (!Graphics._stretchEnabled) {
					Graphics._stretchEnabled = true;
					Graphics._updateAllElements();
				}
			}
		},
		configurable: true
	});

	onFullscreenFinish = function () {
		if (!g.fullScreen && ADJUST_WINDOW_SIZE) g.resizeTo(...getBestWindowSize());
	};

	getBestWindowSize = function () {
		for (let i = 0; i < PREFERRED_WINDOW_SIZES.length - 1; i++) {
			const [x, y] = PREFERRED_WINDOW_SIZES[i];
			if (x <= screen.availWidth && y <= screen.availHeight) return PREFERRED_WINDOW_SIZES[i];
		}
		return PREFERRED_WINDOW_SIZES.at(-1);
	};

	if (Utils.isNwjs()) document.addEventListener("webkitfullscreenchange", onFullscreenFinish, false);

	Object.defineProperty(ConfigManager, 'stretchMode', {
		get: function () {
			return g.stretchMode;
		},
		set: function (value) {
			g.stretchMode = value;
			if (g.fullScreen) {
				Graphics._stretchEnabled = value;
				Graphics._updateAllElements();
			}
		},
		configurable: true
	});

	var _ConfigManager_makeData = ConfigManager.makeData;
	ConfigManager.makeData = function () {
		var config = _ConfigManager_makeData.call(this);
		config.fullscreen = this.fullscreen;
		config.stretchMode = this.stretchMode;
		config.markerMode = this.markerMode;
		return config;
	};

	var _ConfigManager_applyData = ConfigManager.applyData;
	ConfigManager.applyData = function (config) {
		_ConfigManager_applyData.call(this, config);
		let fullScreenValue = this.readFullscreen(config, 'fullscreen');
		this.fullscreen = Utils.isNwjs() ? fullScreenValue : false; //We can't start full-screen in browsers, so we won't try to
		g.fullScreen = fullScreenValue;

		let stretchModeValue = config['stretchMode'];
		if (stretchModeValue === undefined) stretchModeValue = defaultStretchValue();
		this.stretchMode = stretchModeValue;
		g.stretchMode = stretchModeValue;

		this.markerMode = config['markerMode'] ?? false;
	};

	ConfigManager.readFullscreen = function (config, name) {
		var value = config[name];
		if (!persist) {
			if (value !== undefined) {
				return value;
			} else {
				return defaultValue;
			}
		} else {
			return defaultValue;
		}
	};
	/*
		var _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
		Window_Options.prototype.addGeneralOptions = function () {
			_Window_Options_addGeneralOptions.call(this);
			if (position === 'middle') {
				this.addCommand(s.fullScreen, 'fullscreen');
			}
		};*/
	/*
		var _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
		Window_Options.prototype.makeCommandList = function () {
			if (position === 'top') {
				this.addCommand(optionName, 'fullscreen');
			}
			_Window_Options_makeCommandList.call(this);
		};
	
		var _Window_Options_addVolumeOptions = Window_Options.prototype.addVolumeOptions;
		Window_Options.prototype.addVolumeOptions = function () {
			_Window_Options_addVolumeOptions.call(this);
			if (position === 'bottom') {
				this.addCommand(optionName, 'fullscreen');
			}
		};*/

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);

		if (command.toLowerCase() === 'togglescreentype') {
			Graphics._switchFullScreen();
		}
	};

})();