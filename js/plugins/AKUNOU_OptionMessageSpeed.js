//=============================================================================
// AKUNOU_OptionMessageSpeed.js
// Version: 1.01
// ----------------------------------------------------------------------------
// 河原 つつみ
// 連絡先 ：『アクマの脳髄』http://www.akunou.com/
//=============================================================================

/*:
 * @plugindesc Add option to change message display speed.
 *The same author's optional base script is required for operation.
 * @author Tsutumi Kawahara
 *
 * @param Message Speed Term
 * @desc Change the display name on the message display speed option screen.
 * @default message speed
 *
 * @param Message Speed List
 * @desc status list. Display name: Expressed as Speed.
 * Please do not remove "{}", etc. You can add it if you follow the format.
 * @default {"slowest": -2, "slow": -1, "standard": 0, "slightly faster": 1, "fast": 2, "faster": 4, "quite fast": 10, "very fast": 20, "moment": 100}
 *
 * @param Message Speed Default
 * @desc Default index for message display speed.
 * Count the first status in the status list as 0.
 * @default 2
 *
 * @help
 * Plugin command:
 *  no need
 * This is a script that is applied just by turning on the plugin.
 */

(function () {

	var parameters = PluginManager.parameters('AKUNOU_OptionMessageSpeed');
	var messageSpeedText = parameters['Message Speed Term'];
	var messageSpeedList = JSON.parse(parameters['Message Speed List']);
	var messageSpeedDefault = Number(parameters['Message Speed Default']);

	//-------------------------------------------------------------------------
	// ConfigManager
	//-------------------------------------------------------------------------

	ConfigManager.messageSpeedKey = messageSpeedDefault;

	var akunou4_makeExtraData = ConfigManager.makeExtraData;

	ConfigManager.makeExtraData = function (config) {
		akunou4_makeExtraData.call(this, config);
		config.messageSpeedKey = this.messageSpeedKey;
		return config;
	};

	var akunou4_applyData = ConfigManager.applyData;

	ConfigManager.applyData = function (config) {
		akunou4_applyData.call(this, config);
		this.messageSpeedKey = this.readMessageSpeed(config, 'messageSpeedKey');
	};

	ConfigManager.readMessageSpeed = function (config, name) {
		var value = config[name];
		if (value !== undefined) {
			return Number(value).clamp(0, Object.keys(messageSpeedList).length - 1);
		} else {
			return messageSpeedDefault;
		}
	};

	//-------------------------------------------------------------------------
	// Window_Options
	//-------------------------------------------------------------------------

	var akunou4_addExtraOptions = Window_Options.prototype.addExtraOptions;

	Window_Options.prototype.addExtraOptions = function () {
		this.addCommand(messageSpeedText, 'messageSpeedKey');
		akunou4_addExtraOptions.call(this);
	};

	var akunou4_keyStatusText = Window_Options.prototype.keyStatusText;

	Window_Options.prototype.keyStatusText = function (symbol, value) {
		if (symbol === 'messageSpeedKey') {
			return String(Object.keys(messageSpeedList)[Number(value)]);
		} else {
			return akunou4_keyStatusText.call(this, symbol, value);
		}
	};

	var akunou4_keyLength = Window_Options.prototype.keyLength;

	Window_Options.prototype.keyLength = function (symbol) {
		if (symbol === 'messageSpeedKey') {
			return Number(Object.keys(messageSpeedList).length) - 1;
		} else {
			return akunou4_keyLength.call(this, symbol);
		}
	};

	var akunou4_defaultAll = Window_Options.prototype.defaultAll;

	Window_Options.prototype.defaultAll = function () {
		akunou4_defaultAll.call(this);
		this.changeValue('messageSpeedKey', messageSpeedDefault);
	};

	//-------------------------------------------------------------------------
	// Window_Message
	//-------------------------------------------------------------------------

	var akunou4_processNormalCharacter = Window_Message.prototype.processNormalCharacter;

	Window_Message.prototype.processNormalCharacter = function (textState) {
		akunou4_processNormalCharacter.call(this, textState);
		this._speedCount--;
		if (this._showFast || this._lineShowFast) {
			return;
		}
		this._waitCount = this._speedWait;
	};

	var akunou4_initMembers = Window_Message.prototype.initMembers;

	Window_Message.prototype.initMembers = function () {
		this._speedWait = 0;
		this._speedCount = 0;
		akunou4_initMembers.call(this);
	};

	Window_Message.prototype.updateMessage = function () {
		if (this._textState) {
			if (messageSpeedList[Object.keys(messageSpeedList)[ConfigManager['messageSpeedKey']]] < 0) {
				this._speedWait = Math.abs(messageSpeedList[Object.keys(messageSpeedList)[ConfigManager['messageSpeedKey']]]);
				this._speedCount = 0;
			} else {
				this._speedWait = 0;
				this._speedCount = messageSpeedList[Object.keys(messageSpeedList)[ConfigManager['messageSpeedKey']]] + 1;
			}
			while (!this.isEndOfText(this._textState)) {
				if (this.needsNewPage(this._textState)) {
					this.newPage(this._textState);
				}
				this.updateShowFast();
				this.processCharacter(this._textState);
				if (this._speedCount <= 0 && !this._showFast && !this._lineShowFast) {
					break;
				}
				if (this.pause || this._waitCount > 0) {
					break;
				}
			}
			if (this.isEndOfText(this._textState)) {
				this.onEndOfText();
			}
			return true;
		} else {
			return false;
		}
	};

})();
