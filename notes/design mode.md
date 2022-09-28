Drag and drop: Grab windows and images and rearrange them where you want.
Ctrl + mouse: The window or image snaps to the grid. (Option key on Mac)
Shift + mouse: Windows and images will not snap to objects or screen edge.
If you type "changePos(x, y);" (x: X coordinate, y: Y coordinate) in the console, you can change window position.
Ctrl + S: Save all changes.
Ctrl + C: Copies the coordinates into a clipboard.
Ctrl + Z: Undo the last operation.
Ctrl + Shift + Enter: Resets all screen layouts and reloads.
Right-click: Displays / hides the window frame (or the entire window).
Number key: When pressed within the window, the corresponding properties can be changed as follows.
1. Window width (※1)
2. Window height (directly specified) (※1)
3. Window margin (※2)
4. Window font size (※2)
5. Height per line of the window (※2)
6. Window background transparency (※2)
7. Number of lines in the window (※2)
8. Window background image filename
9. Window font name (※3)

※1 JS calculation formula can be applied. The calculation formula is evaluated once on the spot you enter.
※2 JS calculation formula can be applied. The formula is saved and re-evaluated when displayed on the screen.
If you want to know, you can set the value like before.
※3 Fonts must be loaded. Please use "Font Load Plugin".
Download: raw.githubusercontent.com/triacontane/RPGMakerMV/master/FontLoad.js
※4 For Mac, use the option key instead of Ctrl key. (The command key does not respond)3