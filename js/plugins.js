// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"Window_Options","status":true,"description":"","parameters":{}},
{"name":"TranslationData","status":true,"description":"","parameters":{}},
{"name":"CollisionData","status":true,"description":"","parameters":{}},
{"name":"MacThings","status":true,"description":"Various misc things","parameters":{}},
{"name":"PictureWindow","status":true,"description":"Adds a PictureWindow, for displaying images nicely","parameters":{}},
{"name":"Community_Basic","status":true,"description":"Plugin used to set basic parameters.","parameters":{"cacheLimit":"20","screenWidth":"1920","screenHeight":"1080","changeWindowWidthTo":"1280","changeWindowHeightTo":"720","renderingMode":"auto","alwaysDash":"off"}},
{"name":"ChangeTileSize","status":true,"description":"Allows maps based on a grid size other than 48x48\r\n<ChangeTileSize> v1.1","parameters":{"Tile Size":"32","Tileset Image Folder":"img/tilesets/","Parallax Image Folder":"img/parallaxes32/"}},
{"name":"OcRam_Layers","status":true,"description":"v2.05 Display up to 3 layers which can be inherited to battle screen. You may also use sprites/pics bound to map. PLUGIN NAME MUST BE OcRam_Layers.js","parameters":{"Layer image directory":"img/parallaxes32/","Sprite image directory":"img/pictures/","Default values":"","Default sprite align":"5","Default scroll-x":"0.000","Default scroll-y":"0.000","Default opacity":"1.00","Default fixed to map":"true","Default loop-x":"0.000","Default loop-y":"0.000","Default fade time":"255.00","Layer zIndexes":"","Layer 0 zIndex":"3","Layer 1 zIndex":"3","Layer 2 zIndex":"3","Battle layers":"","Layer 0":"false","Layer 1":"false","Layer 2":"false","Template layers":"[]","Use only parallax mapping":"true","Debug mode":"false"}},
{"name":"MBS_MapZoom","status":true,"description":"Makes it possible to zoom in and out the game map\n\n<MBS MapZoom>","parameters":{"Reset on map change":"true","Default zoom":"3"}},
{"name":"OverpassTile","status":true,"description":"Settings for bridges which characters can pass through.","parameters":{"Overpass Region ID":"255","Gateway Region ID":"254"}},
{"name":"----------------------------------------------","status":false,"description":"","parameters":{}},
{"name":"QPlus","status":true,"description":"<QPlus> (Should go above all Q Plugins)\nSome small changes to MV for easier plugin development.","parameters":{"Quick Test":"true","Default Enabled Switches":"[]","Ignore Mouse when inactive":"false"}},
{"name":"QInput","status":false,"description":"<QInput>\nAdds additional keys to Input class, and allows remapping keys.","parameters":{"Threshold":"0.5","Input Remap":"","Ok":"[\"#enter\",\"#space\",\"#z\",\"$A\",\"#e\"]","Escape / Cancel":"[\"#esc\", \"#insert\", \"#x\", \"#num0\", \"$B\"]","Menu":"[\"#esc\", \"$Y\"]","Shift":"[\"#shift\", \"#cancel\", \"$X\"]","Control":"[\"#ctrl\", \"#alt\"]","Tab":"[\"#tab\"]","Pageup":"[\"#pageup\", \"#q\", \"$L1\"]","Pagedown":"[\"#pagedown\",\"#w\",\"$R1\",\"#r\"]","Left":"[\"#left\",\"#num4\",\"$LEFT\",\"#a\"]","Right":"[\"#right\",\"#num6\",\"$RIGHT\",\"#d\"]","Up":"[\"#up\",\"#num8\",\"$UP\",\"#w\"]","Down":"[\"#down\",\"#num2\",\"$DOWN\",\"#s\"]","Debug":"[\"#f9\"]","ControlKeys Remap":"","FPS":"f2","Streched":"f3","FullScreen":"f4","Restart":"f5","Console":"f8"}},
{"name":"QInput+Remap","status":false,"description":"<QInputRemap>\nQInput Addon: Adds Key remapping to Options menu","parameters":{"Hide Keys":"[]","Disable Keys":"[\"ok\", \"escape\"]","Vocab":"","Vocab: Ok":"Action","Vocab: Escape":"Cancel","Vocab: Shift":"Run","Vocab: Control":"Control","Vocab: Tab":"Tab","Vocab: Pageup":"Next","Vocab: Pagedown":"Prev","Vocab: Up":"Up","Vocab: Down":"Down","Vocab: Left":"Left","Vocab: Right":"Right"}},
{"name":"CmdInp","status":false,"description":"v1.1.2 CmdInp Enables a Command Input system.","parameters":{"Text Variable":"3","Max Characters":"20","Use Image":"false","Image Name":"ClipComputer","Default Header":"\"This is a Input Window\"","Default InputText":"\"\""}},
{"name":"YEP_KeyboardConfig","status":true,"description":"v1.04 Allows players to adjust their button configuration\nfor keyboards.","parameters":{"---General---":"","Command Name":"Keyboard Config","Button Events":"1 2 3","Button Events List":"[]","---Help Text---":"","Key Help":"Change the configuration of this key?","Default Layout":"Default Keyboard Layout","Default Help":"Reverts your keyboard setting to the default setup.","WASD Layout":"WASD Movement Layout","WASD Help":"Changes your keyboard to WASD movement.","Finish Config":"Finish Configuration","Finish Help":"Are you done configuring your keyboard?","Assigned Color":"21","Action Color":"4","Clear Text":"Clear","---Key Names---":"","OK Key":"OK","OK Text":"OK / Talk","Escape Key":"X","Escape Text":"Cancel / Menu","Cancel Key":"Cancel","Cancel Text":"Cancel","Menu Key":"Menu","Menu Text":"Menu","Shift Key":"Dash","Shift Text":"Dash","PageUp Key":"PgUp","PageUp Text":"Page Up","PageDown Key":"PgDn","PageDown Text":"Page Down","Left Key":"◄","Left Text":"Move ◄ Left","Up Key":"▲","Up Text":"Move ▲ Up","Right Key":"►","Right Text":"Move ► Right","Down Key":"▼","Down Text":"Move ▼ Down"}},
{"name":"SRD_FullscreenToggleOption","status":true,"description":"Adds a Fullscreen Toggle to the Options Window","parameters":{"Option Name":"Pełny ekran","Position":"Middle","Default Value":"true","Persist Default?":"false"}},
{"name":"SRD_MasterVolume","status":true,"description":"Adds an option in the Options menu to change the game's master volume.","parameters":{"Option Name":"Głośność","Default Value":"100","Option Position":"AboveVol"}},
{"name":"SRD_AudioFader","status":true,"description":"Gives the developer more control over the volume fading of BGM, BGS, and ME.","parameters":{"Replay Fade Time":"30","Auto-BGM Fade In":"0"}},
{"name":"RS_InputDialog","status":true,"description":"This plugin allows you to display Text Edit Box on the screen. <RS_InputDialog>","parameters":{"textBox Width":"976","textBox Height":"72","variable ID":"3","debug":"true","Text Hint":"If you're reading this something went wrong.","direction":"ltr","Max Length":"100","Style":"","CSS":"\"#inputDialog-CancelBtn{\\n    display: none;\\n}\\n\\n#inputDialog-OkBtn{\\n    height: 48px;\\n    width: 128px;\\n}\"","Button Name":"","Ok":"OK","Cancel":"Anuluj","Position":"center"}},
{"name":"----------------------------------------------","status":false,"description":"","parameters":{}},
{"name":"YEP_MessageCore","status":true,"description":"v1.11 Adds more features to the Message Window to customized\nthe way your messages appear and functions.","parameters":{"---General---":"","Default Rows":"4","Default Width":"Graphics.boxWidth","Face Indent":"Window_Base._faceWidth + 32","Fast Forward Key":"pagedown","Enable Fast Forward":"true","Word Wrapping":"false","Description Wrap":"false","Word Wrap Space":"false","---Font---":"","Font Name":"GameFont","Font Size":"48","Font Size Change":"12","Font Changed Max":"96","Font Changed Min":"12","Font Outline":"4","---Name Box---":"","Name Box Buffer X":"-28","Name Box Buffer Y":"0","Name Box Padding":"this.standardPadding() * 4","Name Box Color":"0","Name Box Clear":"false","Name Box Added Text":"\\c[6]"}},
{"name":"SRD_WindowUpgrade","status":true,"description":"Upgrades and adds various features to the existing window system within one's game.","parameters":{"Info Windows":"[\"{\\\"Text\\\":\\\"\\\\\\\"This is a test\\\\\\\"\\\",\\\"Width\\\":\\\"600\\\",\\\"Line Height\\\":\\\"32\\\",\\\"Default Font Size\\\":\\\"28\\\"}\"]","Mutliple Layers":"false","Window Defaults":"{\"Standard Font Size\":\"28\",\"Standard Padding\":\"18\",\"Text Padding\":\"12\",\"Standard Back Opacity\":\"255\",\"Translucent Opacity\":\"160\",\"Opening Speed\":\"32\",\"Closing Speed\":\"32\"}","Stretch Options":"{\"Background\":\"true\",\"Foreground\":\"false\",\"Frame\":\"true\"}","Tone Options":"{\"Background\":\"true\",\"Frame\":\"false\",\"Cursor\":\"false\"}","Game Colors":"{\"Normal Color\":\"\",\"System Color\":\"\",\"Crisis Color\":\"\",\"Death Color\":\"\",\"Gauge Back Color\":\"\",\"HP Gauge Color 1\":\"\",\"HP Gauge Color 2\":\"\",\"MP Gauge Color 1\":\"\",\"MP Gauge Color 2\":\"\",\"MP Cost Color\":\"\",\"Power Up Color\":\"\",\"Power Down Color\":\"\",\"TP Gauge Color 1\":\"\",\"TP Gauge Color 2\":\"\",\"TP Cost Color\":\"\"}","Text Colors":"{\"Allow Manual Colors\":\"true\",\"Text Color 0\":\"#ffffff\",\"Text Color 1\":\"#20a0d6\",\"Text Color 2\":\"#ff784c\",\"Text Color 3\":\"#66cc40\",\"Text Color 4\":\"#99ccff\",\"Text Color 5\":\"#ccc0ff\",\"Text Color 6\":\"#ffffa0\",\"Text Color 7\":\"#808080\",\"Text Color 8\":\"#c0c0c0\",\"Text Color 9\":\"#2080cc\",\"Text Color 10\":\"#ff3810\",\"Text Color 11\":\"#00a010\",\"Text Color 12\":\"#3e9ade\",\"Text Color 13\":\"#a098ff\",\"Text Color 14\":\"#ffcc20\",\"Text Color 15\":\"#000000\",\"Text Color 16\":\"#84aaff\",\"Text Color 17\":\"#ffff40\",\"Text Color 18\":\"#ff2020\",\"Text Color 19\":\"#202040\",\"Text Color 20\":\"#e08040\",\"Text Color 21\":\"#f0c040\",\"Text Color 22\":\"#4080c0\",\"Text Color 23\":\"#40c0f0\",\"Text Color 24\":\"#80ff80\",\"Text Color 25\":\"#c08080\",\"Text Color 26\":\"#8080ff\",\"Text Color 27\":\"#ff80ff\",\"Text Color 28\":\"#00a040\",\"Text Color 29\":\"#00e060\",\"Text Color 30\":\"#a060e0\",\"Text Color 31\":\"#c080ff\",\"Text Color 32\":\"\",\"Text Color 33\":\"\",\"Text Color 34\":\"\",\"Text Color 35\":\"\",\"Text Color 36\":\"\",\"Text Color 37\":\"\",\"Text Color 38\":\"\",\"Text Color 39\":\"\",\"Text Color 40\":\"\",\"Text Color 41\":\"\",\"Text Color 42\":\"\",\"Text Color 43\":\"\",\"Text Color 44\":\"\",\"Text Color 45\":\"\",\"Text Color 46\":\"\",\"Text Color 47\":\"\",\"Text Color 48\":\"\",\"Text Color 49\":\"\",\"Text Color 50\":\"\"}"}},
{"name":"WindowManager","status":true,"description":"Window Manager plugin","parameters":{}},
{"name":"GraphicalDesignMode","status":true,"description":"GUI screen design mode-\nTo save changes \"Save Project\" (Ctrl + S)","parameters":{"Design mode":"false","Autosave":"false","Mobile make":"false","Fake mobile":"false","Window through":"false","Grid size":"32","Padding":"0","Font size":"0","Line height":"0","Background transparency":"0","Icon size scale":"false","Background fixed":"false","Right click hide":"false","Ignore message window":"false"}},
{"name":"SRD_ShakingText","status":true,"description":"Allows you to add Shaking Text to your Show Text events!","parameters":{"Reset Shaking per Box":"true","Default Shaking Power":"$.randomNum(1.0, 1.1)","Default Shaking Max":"2","Default Wave Power":"0.5","Default Wave Max":"4","Default Slide Power":"0.5","Default Slide Max":"4","Copy Outline":"true"}},
{"name":"SRD_AutoNameBox","status":true,"description":"Requires YEP_MessageCore. Name Boxes can automatically have a name based off of the Face image used.","parameters":{"== Auto Name 1 ==":"","Text Code 1":"\\N<Harold>","File 1":"Actor1","Indexes 1":"0, 1, 2, 3","== Auto Name 2 ==":"","Text Code 2":"","File 2":"","Indexes 2":"","== Auto Name 3 ==":"","Text Code 3":"","File 3":"","Indexes 3":"","== Auto Name 4 ==":"","Text Code 4":"","File 4":"","Indexes 4":"","== Auto Name 5 ==":"","Text Code 5":"","File 5":"","Indexes 5":"","== Auto Name 6 ==":"","Text Code 6":"","File 6":"","Indexes 6":"","== Auto Name 7 ==":"","Text Code 7":"","File 7":"","Indexes 7":"","== Auto Name 8 ==":"","Text Code 8":"","File 8":"","Indexes 8":"","== Auto Name 9 ==":"","Text Code 9":"","File 9":"","Indexes 9":"","== Auto Name 10 ==":"","Text Code 10":"","File 10":"","Indexes 10":"","== Auto Name 11 ==":"","Text Code 11":"","File 11":"","Indexes 11":"","== Auto Name 12 ==":"","Text Code 12":"","File 12":"","Indexes 12":"","== Auto Name 13 ==":"","Text Code 13":"","File 13":"","Indexes 13":"","== Auto Name 14 ==":"","Text Code 14":"","File 14":"","Indexes 14":"","== Auto Name 15 ==":"","Text Code 15":"","File 15":"","Indexes 15":"","== Auto Name 16 ==":"","Text Code 16":"","File 16":"","Indexes 16":"","== Auto Name 17 ==":"","Text Code 17":"","File 17":"","Indexes 17":"","== Auto Name 18 ==":"","Text Code 18":"","File 18":"","Indexes 18":"","== Auto Name 19 ==":"","Text Code 19":"","File 19":"","Indexes 19":"","== Auto Name 20 ==":"","Text Code 20":"","File 20":"","Indexes 20":"","== Auto Name 21 ==":"","Text Code 21":"","File 21":"","Indexes 21":"","== Auto Name 22 ==":"","Text Code 22":"","File 22":"","Indexes 22":"","== Auto Name 23 ==":"","Text Code 23":"","File 23":"","Indexes 23":"","== Auto Name 24 ==":"","Text Code 24":"","File 24":"","Indexes 24":"","== Auto Name 25 ==":"","Text Code 25":"","File 25":"","Indexes 25":"","== Auto Name 26 ==":"","Text Code 26":"","File 26":"","Indexes 26":"","== Auto Name 27 ==":"","Text Code 27":"","File 27":"","Indexes 27":"","== Auto Name 28 ==":"","Text Code 28":"","File 28":"","Indexes 28":"","== Auto Name 29 ==":"","Text Code 29":"","File 29":"","Indexes 29":"","== Auto Name 30 ==":"","Text Code 30":"","File 30":"","Indexes 30":"","== Auto Name 31 ==":"","Text Code 31":"","File 31":"","Indexes 31":"","== Auto Name 32 ==":"","Text Code 32":"","File 32":"","Indexes 32":"","== Auto Name 33 ==":"","Text Code 33":"","File 33":"","Indexes 33":"","== Auto Name 34 ==":"","Text Code 34":"","File 34":"","Indexes 34":"","== Auto Name 35 ==":"","Text Code 35":"","File 35":"","Indexes 35":"","== Auto Name 36 ==":"","Text Code 36":"","File 36":"","Indexes 36":"","== Auto Name 37 ==":"","Text Code 37":"","File 37":"","Indexes 37":"","== Auto Name 38 ==":"","Text Code 38":"","File 38":"","Indexes 38":"","== Auto Name 39 ==":"","Text Code 39":"","File 39":"","Indexes 39":"","== Auto Name 40 ==":"","Text Code 40":"","File 40":"","Indexes 40":"","== Auto Name 41 ==":"","Text Code 41":"","File 41":"","Indexes 41":"","== Auto Name 42 ==":"","Text Code 42":"","File 42":"","Indexes 42":"","== Auto Name 43 ==":"","Text Code 43":"","File 43":"","Indexes 43":"","== Auto Name 44 ==":"","Text Code 44":"","File 44":"","Indexes 44":"","== Auto Name 45 ==":"","Text Code 45":"","File 45":"","Indexes 45":"","== Auto Name 46 ==":"","Text Code 46":"","File 46":"","Indexes 46":"","== Auto Name 47 ==":"","Text Code 47":"","File 47":"","Indexes 47":"","== Auto Name 48 ==":"","Text Code 48":"","File 48":"","Indexes 48":"","== Auto Name 49 ==":"","Text Code 49":"","File 49":"","Indexes 49":"","== Auto Name 50 ==":"","Text Code 50":"","File 50":"","Indexes 50":"","== Auto Name 51 ==":"","Text Code 51":"","File 51":"","Indexes 51":"","== Auto Name 52 ==":"","Text Code 52":"","File 52":"","Indexes 52":"","== Auto Name 53 ==":"","Text Code 53":"","File 53":"","Indexes 53":"","== Auto Name 54 ==":"","Text Code 54":"","File 54":"","Indexes 54":"","== Auto Name 55 ==":"","Text Code 55":"","File 55":"","Indexes 55":"","== Auto Name 56 ==":"","Text Code 56":"","File 56":"","Indexes 56":"","== Auto Name 57 ==":"","Text Code 57":"","File 57":"","Indexes 57":"","== Auto Name 58 ==":"","Text Code 58":"","File 58":"","Indexes 58":"","== Auto Name 59 ==":"","Text Code 59":"","File 59":"","Indexes 59":"","== Auto Name 60 ==":"","Text Code 60":"","File 60":"","Indexes 60":"","== Auto Name 61 ==":"","Text Code 61":"","File 61":"","Indexes 61":"","== Auto Name 62 ==":"","Text Code 62":"","File 62":"","Indexes 62":"","== Auto Name 63 ==":"","Text Code 63":"","File 63":"","Indexes 63":"","== Auto Name 64 ==":"","Text Code 64":"","File 64":"","Indexes 64":"","== Auto Name 65 ==":"","Text Code 65":"","File 65":"","Indexes 65":"","== Auto Name 66 ==":"","Text Code 66":"","File 66":"","Indexes 66":"","== Auto Name 67 ==":"","Text Code 67":"","File 67":"","Indexes 67":"","== Auto Name 68 ==":"","Text Code 68":"","File 68":"","Indexes 68":"","== Auto Name 69 ==":"","Text Code 69":"","File 69":"","Indexes 69":"","== Auto Name 70 ==":"","Text Code 70":"","File 70":"","Indexes 70":"","== Auto Name 71 ==":"","Text Code 71":"","File 71":"","Indexes 71":"","== Auto Name 72 ==":"","Text Code 72":"","File 72":"","Indexes 72":"","== Auto Name 73 ==":"","Text Code 73":"","File 73":"","Indexes 73":"","== Auto Name 74 ==":"","Text Code 74":"","File 74":"","Indexes 74":"","== Auto Name 75 ==":"","Text Code 75":"","File 75":"","Indexes 75":"","== Auto Name 76 ==":"","Text Code 76":"","File 76":"","Indexes 76":"","== Auto Name 77 ==":"","Text Code 77":"","File 77":"","Indexes 77":"","== Auto Name 78 ==":"","Text Code 78":"","File 78":"","Indexes 78":"","== Auto Name 79 ==":"","Text Code 79":"","File 79":"","Indexes 79":"","== Auto Name 80 ==":"","Text Code 80":"","File 80":"","Indexes 80":"","== Auto Name 81 ==":"","Text Code 81":"","File 81":"","Indexes 81":"","== Auto Name 82 ==":"","Text Code 82":"","File 82":"","Indexes 82":"","== Auto Name 83 ==":"","Text Code 83":"","File 83":"","Indexes 83":"","== Auto Name 84 ==":"","Text Code 84":"","File 84":"","Indexes 84":"","== Auto Name 85 ==":"","Text Code 85":"","File 85":"","Indexes 85":"","== Auto Name 86 ==":"","Text Code 86":"","File 86":"","Indexes 86":"","== Auto Name 87 ==":"","Text Code 87":"","File 87":"","Indexes 87":"","== Auto Name 88 ==":"","Text Code 88":"","File 88":"","Indexes 88":"","== Auto Name 89 ==":"","Text Code 89":"","File 89":"","Indexes 89":"","== Auto Name 90 ==":"","Text Code 90":"","File 90":"","Indexes 90":"","== Auto Name 91 ==":"","Text Code 91":"","File 91":"","Indexes 91":"","== Auto Name 92 ==":"","Text Code 92":"","File 92":"","Indexes 92":"","== Auto Name 93 ==":"","Text Code 93":"","File 93":"","Indexes 93":"","== Auto Name 94 ==":"","Text Code 94":"","File 94":"","Indexes 94":"","== Auto Name 95 ==":"","Text Code 95":"","File 95":"","Indexes 95":"","== Auto Name 96 ==":"","Text Code 96":"","File 96":"","Indexes 96":"","== Auto Name 97 ==":"","Text Code 97":"","File 97":"","Indexes 97":"","== Auto Name 98 ==":"","Text Code 98":"","File 98":"","Indexes 98":"","== Auto Name 99 ==":"","Text Code 99":"","File 99":"","Indexes 99":"","== Auto Name 100 ==":"","Text Code 100":"","File 100":"","Indexes 100":""}},
{"name":"GALV_RollCredits","status":true,"description":"(v.1.5) A plugin that calls a new scene to display scrolling information located in an external text file.","parameters":{"Folder":"cdata","Skippable":"true","Block Skipping":"true","Title Menu":"Twórcy","Title Credits Music":""}},
{"name":"WindowIdentifier","status":true,"description":"Shows the name of the windows while holding CTRL.","parameters":{"Font Size":"28","Font Color":"6"}},
{"name":"----------------------------------------------","status":false,"description":"","parameters":{}},
{"name":"KoTC Optimized Dynamic Music System","status":true,"description":"v1 Allows one to have a Dynamic Music System\r\nfor their game, allowing multiple songs per map.","parameters":{"Music List Config":"[\"{\\\"List Name\\\":\\\"Main\\\",\\\"Music Contained\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"Music Name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Cosmic-Puzzle\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Volume\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Fadeout Time\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Loop Amount\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch Variance\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"Music Name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Dreaming-in-Puzzles\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Volume\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Fadeout Time\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Loop Amount\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch Variance\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"Music Name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Numbers\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Volume\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"90\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Fadeout Time\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Loop Amount\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch Variance\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"Music Name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Puzzle-Game\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Volume\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Fadeout Time\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Loop Amount\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch Variance\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"Music Name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Puzzle-Game-2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Volume\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Fadeout Time\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Loop Amount\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch Variance\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"Music Name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Puzzle-Game-3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Volume\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Fadeout Time\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Loop Amount\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch Variance\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"Music Name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Puzzle-Game-5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Volume\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Fadeout Time\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Loop Amount\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch Variance\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"Music Name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Puzzles-on-Alien-Worlds\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Volume\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Fadeout Time\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Loop Amount\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch Variance\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"Music Name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Mysterious-Puzzle_Looping\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Volume\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Fadeout Time\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Loop Amount\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch Variance\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"Music Name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Thought-Puzzles\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Volume\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Fadeout Time\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Loop Amount\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch Variance\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"Music Name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Future-Puzzler\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Volume\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Fadeout Time\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Loop Amount\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch Variance\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"List Name\\\":\\\"Test\\\",\\\"Music Contained\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"Music Name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Musical1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Volume\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Fadeout Time\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Loop Amount\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch Variance\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"Music Name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Musical2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Volume\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Fadeout Time\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Loop Amount\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch Variance\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"Music Name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Musical3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Volume\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Fadeout Time\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Loop Amount\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Music Pitch Variance\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\"]"}},
{"name":"MAC_Extended_Loading_Screens","status":false,"description":"This plugin will make loading screens last longer, so that you can take a good look at them.","parameters":{"Time":"5"}},
{"name":"ToastWindow","status":true,"description":"","parameters":{}},
{"name":"LifeRoom","status":true,"description":"","parameters":{}}
];
