
/*:
 * @target MZ
 * @plugindesc v1 Allows one to have a Dynamic Music System
 * for their game, allowing multiple songs per map.
 * @Author Knight of the Celestial Developer Team.
 *
 *
 * @command EnableKoTCDynamicMusic
 * @desc Enables Dynamic Music System, interupting the
 * current BGM if one is active.
 * @text Enable Dynamic Music
 *
 *
 * @command DisableKoTCDynamicMusic
 * @desc Disables the Dynamic Music System, interupting the
 * current BGM if one is active.
 * @text Disable Dynamic Music
 *
 *
 *
 *
 *
 * @help
 * Allows one to have a playlist of songs that is reusable
 * for multiple maps, and designated through the map notes.
 * 
 * If you add a music list with the name Plains then you would
 * use this map note to designate a map that plays a random
 * song from that music list upon entry.
 * For example:
 * 
 * <KoTC Music List: Plains>
 * 
 * 
 *
 * Plugin Command: EnableKoTCDynamicMusic
 * Script Call: EnableKoTCDynamicMusic();
 * 
 * Interupts the current BGM if one is active, and if the map
 * has a designated music list, begins to play music from it.
 * 
 * 
 * 
 * Plugin Command: DisableKoTCDynamicMusic
 * Script Call: DisableKoTCDynamicMusic();
 *
 * Interupts the current BGM if one is active, and prevents
 * dynamic music from activating until enabled.
 *
 *
 *
 *
 * @param Music List Config
 * @desc Configure what maps have what view distance.
 * @parent Map Settings
 * @default []
 * @type struct<KoTCDynamicMusicSettings>[]
 *
 *
 */
/*~struct~KoTCDynamicMusicSettings:
 * @param List Name
 * @desc Name of list for usage in notetags. Use a single word.
 * Example: Mountains1, Desert, Houses, Plains
 * @type string
 *
 * @param Music Contained
 * @desc Names of music the list contains.
 * @parent Map Settings
 * @default []
 * @type struct<KoTCMusicData>[]
 *
 */
/*~struct~KoTCMusicData:
 * @param Music Name
 * @desc Case sensitive, name of song file without extension.
 * Example: Combat1
 * @type string
 *
 * @param Music Pitch
 * @default 100
 * @type number
 * 
 * @param Music Volume
 * @default 100
 * @type number
 * 
 * @param Fadeout Time
 * @desc Seconds to fadeout song after song is done playing.
 * Or after all loops are finished playing.
 * @default 5
 * @type number
 * 
 * @param Music Loop Amount
 * @desc Amount of times to repeat the song before the next.
 * @default 0
 * @type number
 * 
 * @param Music Pitch Variance
 * @desc Amount the pitch can vary from the set value.
 * Example: 100 pitch with 20 variance is 80-120 pitch.
 * @default 0
 * @type number
 */

(function () {
    var KOTCDynamicMusicINIT = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        KOTCDynamicMusicINIT.call(this); // Makes sure to do the stuff that was in the function before
        $KDMS = {
            Parameters: PluginManager.parameters('KoTC Optimized Dynamic Music System'),
            NextSongReadyToPlay: true,
            MusicPool: {},
            RegExMusicCode: new RegExp(/<KoTC Music List: (\S+)>/i),
            LastSong: null,
        };

        var mainparse = JSON.parse($KDMS.Parameters['Music List Config']);
        for (var g = 0; g < mainparse.length; g++) {
            var listparse = JSON.parse(mainparse[g]);
            var listname = listparse["List Name"];
            $KDMS.MusicPool[listname] = JSON.parse(listparse["Music Contained"]);
            var length2 = $KDMS.MusicPool[listname].length;
            for (var p = 0; p < length2; p++) {
                $KDMS.MusicPool[listname][p] = JSON.parse($KDMS.MusicPool[listname][p]);
            }
        }

        if (Utils.RPGMAKER_NAME == "MZ") {
            PluginManager.registerCommand('KoTC Optimized Dynamic Music System', "EnableKoTCDynamicMusic", data => {
                EnableKoTCDynamicMusic();
            });
            PluginManager.registerCommand('KoTC Optimized Dynamic Music System', "DisableKoTCDynamicMusic", data => {
                DisableKoTCDynamicMusic();
            });

        } else {
            var kotcmapplugin = Game_Interpreter.prototype.pluginCommand;
            Game_Interpreter.prototype.pluginCommand = function (command, args) {
                kotcmapplugin.call(this, command, args);
                if (command.includes("KoTCDynamicMusic")) {
                    switch (command) {
                        case 'EnableKoTCDynamicMusic':
                            EnableKoTCDynamicMusic();
                            break;
                        case 'DisableKoTCDynamicMusic':
                            DisableKoTCDynamicMusic();
                            break;
                    };
                }
            };
        };
    }
}());


var KOTCDynamicMusicTransfer = Game_Player.prototype.performTransfer;
Game_Player.prototype.performTransfer = function () {
    //$KDMS.NextSongReadyToPlay = true;
    KOTCDynamicMusicTransfer.call(this);
}


var KOTCWayDynMusTransCompleted = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function () {
    KOTCWayDynMusTransCompleted.call(this);
    if ($KDMS.RegExMusicCode.exec($dataMap.note) !== null && !$KDMS.DynamicMusicDisabled) {
        setTimeout(() => {
            KoTCDynamicMusic()
        }, 100); //Sus

    } else {
        KoTCDStopMusic();
    }

};

function DisableKoTCDynamicMusic() {
    $KDMS.DynamicMusicDisabled = true; //Change: 1 -> true
    KoTCDStopMusic();
}

function EnableKoTCDynamicMusic() {
    $KDMS.DynamicMusicDisabled = false; //Change: undefined -> false
    AudioManager.stopBgm();
    KoTCDynamicMusic(true); //Change: 1 -> true
}

function KoTCDStopMusic() {
    AudioManager.stopBgm()
    clearTimeout($KDMS.NextSongTimeout);
    clearTimeout($KDMS.NextSongTimeout2);
    clearTimeout($KDMS.NextSongTimeout3);
}

function KoTCDPickSong(list) {
    console.assert(Array.isArray(list) && list.length > 0);
    let res = null;
    if (list.length === 1) res = list[0];
    else {
        let newList = list.filter(m => m['Music Name'] !== $KDMS.LastSong);
        res = newList[Math.randomInt(newList.length)];
    }
    $KDMS.LastSong = res['Music Name'];
    return res;
}

function KoTCDynamicMusic(forceplay, musiclistname) {
    if ($KDMS.DynamicMusicDisabled || $dataMap === null) return;

    let note = $KDMS.RegExMusicCode.exec($dataMap.note);
    if ((note !== null || musiclistname !== undefined) && ($KDMS.PreviousMusicList !== RegExp.$1 || $KDMS.NextSongReadyToPlay || forceplay)) {
        if ($KDMS.NextSongReadyToPlay) $KDMS.NextSongReadyToPlay = false;
        else KoTCDStopMusic();

        if (forceplay) KoTCDStopMusic();

        if (musiclistname !== undefined) {
            $KDMS.CurrentMusicList = musiclistname;
            KoTCDStopMusic();
            var musictarget = KoTCDPickSong($KDMS.MusicPool[musiclistname]);
        } else {
            AudioManager.stopBgm()
            $KDMS.CurrentMusicList = RegExp.$1;
            var musictarget = KoTCDPickSong($KDMS.MusicPool[RegExp.$1]);
        }

        if (musictarget["Music Pitch Variance"] > 0) {
            var pitchvarianceaddition = (Math.random() * (Number(musictarget["Music Pitch Variance"]) * 2));
        } else {
            var pitchvarianceaddition = 0;
        }

        if (MUSIC_DEBUG) console.log("Now playing: " + musictarget["Music Name"]);
        var timesToPlay = Number(musictarget["Music Loop Amount"]) + 1;
        let pitch = Number(musictarget["Music Pitch"]) - Number(musictarget["Music Pitch Variance"]) + pitchvarianceaddition;
        AudioManager.playBgm({
            name: musictarget["Music Name"],
            volume: musictarget["Music Volume"],
            pitch: pitch,
            pan: 0
        });

        $KDMS.PreviousMusicList = $KDMS.CurrentMusicList;
        $KDMS.NextSongTimeout3 = setTimeout(function () {
            var timetonextsong = Math.round(AudioManager._bgmBuffer._totalTime * (pitch / 100) * timesToPlay * 1000);
            if (MUSIC_DEBUG) {
                console.log(`${timetonextsong / 1000}s to next song. We will repeat this one ${timesToPlay - 1} times.`);
                setTimeout(() => console.log("We should start a new song now"), timetonextsong);
            }
            $KDMS.NextSongTimeout = setTimeout(function () {
                if (MUSIC_DEBUG) console.log("About to play the next song");
                $KDMS.NextSongReadyToPlay = true;
                KoTCDynamicMusic();
            }, timetonextsong)
            $KDMS.NextSongTimeout2 = setTimeout(function () {
                if (MUSIC_DEBUG) console.log("Fading out...");
                AudioManager.fadeOutBgm(Number(musictarget["Fadeout Time"]))
            }, timetonextsong - (Number(musictarget["Fadeout Time"]) * 1000))
        }, 1000); //Also sus
    };
};
