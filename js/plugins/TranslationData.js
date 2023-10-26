/*:
 * @plugindesc Stores all translation-related data
 * @author Mac15001900
 */


langData = {
    list: ["en", "pl"],
    dict: { 'en': "English", 'pl': "Polski" },
    switches: { 'en': 11, 'pl': 12 },
    next: function () {
        let index = langData.list.indexOf(g.lang);
        if (index < 0) index = 0;
        return langData.list[(index + 1) % (langData.list.length)]
    },
    previous: function () {
        let index = langData.list.indexOf(g.lang);
        if (index < 0) index = 0;

        if (index === 0) return langData.list[langData.list.length - 1]
        else return langData.list[(index - 1) % (langData.list.length)]
    },
}

wordBank = {
    en: {
        terms: { "basic": ["Level", "Lv", "HP", "HP", "MP", "MP", "TP", "TP", "EXP", "EXP"], "commands": ["Fight", "Escape", "Attack", "Guard", "Item", "Skill", "Equip", "Status", "Formation", "Save", "Game End", "Options", "Weapon", "Armor", "Key Item", "Equip", "Optimize", "Clear", "New Game", "Continue", null, "To Title", "Cancel", null, "Buy", "Sell"], "params": ["Max HP", "Max MP", "Attack", "Defense", "M.Attack", "M.Defense", "Agility", "Luck", "Hit", "Evasion"], "messages": { "actionFailure": "There was no effect on %1!", "actorDamage": "%1 took %2 damage!", "actorDrain": "%1 was drained of %2 %3!", "actorGain": "%1 gained %2 %3!", "actorLoss": "%1 lost %2 %3!", "actorNoDamage": "%1 took no damage!", "actorNoHit": "Miss! %1 took no damage!", "actorRecovery": "%1 recovered %2 %3!", "alwaysDash": "Dash by default", "bgmVolume": "Music volume", "bgsVolume": "Ambience volume", "buffAdd": "%1's %2 went up!", "buffRemove": "%1's %2 returned to normal!", "commandRemember": "Command Remember", "counterAttack": "%1 counterattacked!", "criticalToActor": "A painful blow!!", "criticalToEnemy": "An excellent hit!!", "debuffAdd": "%1's %2 went down!", "defeat": "%1 was defeated.", "emerge": "%1 emerged!", "enemyDamage": "%1 took %2 damage!", "enemyDrain": "%1 was drained of %2 %3!", "enemyGain": "%1 gained %2 %3!", "enemyLoss": "%1 lost %2 %3!", "enemyNoDamage": "%1 took no damage!", "enemyNoHit": "Miss! %1 took no damage!", "enemyRecovery": "%1 recovered %2 %3!", "escapeFailure": "However, it was unable to escape!", "escapeStart": "%1 has started to escape!", "evasion": "%1 evaded the attack!", "expNext": "To Next %1", "expTotal": "Current %1", "file": "File", "levelUp": "%1 is now %2 %3!", "loadMessage": "Load which file?", "magicEvasion": "%1 nullified the magic!", "magicReflection": "%1 reflected the magic!", "meVolume": "Fanfare Volume", "obtainExp": "%1 %2 received!", "obtainGold": "%1\\G found!", "obtainItem": "%1 found!", "obtainSkill": "%1 learned!", "partyName": "%1's Party", "possession": "Possession", "preemptive": "%1 got the upper hand!", "saveMessage": "Save to which file?", "seVolume": "Effects volume", "substitute": "%1 protected %2!", "surprise": "%1 was surprised!", "useItem": "%1 uses %2!", "victory": "%1 was victorious!" } },
        optionDescriptions: {
            cancel: "",
            alwaysDash: "When enabled, you will run by default and walk when holding the dash button.",
            fullscreen: "Toggles between fullscreen and winowed mode.",
            keyConfig: "Allows you to customise the game's controls.",
            lang: "Sets the language of the game.\nCan only be changed in the main menu.",
            cBlind: "This option adjusts some puzzles that would othrewise require distinguishing between colors in order to solve them.",
            masterVolume: "The overall volume of all audio in the game.",
            bgmVolume: "Individual volume for music.",
            bgsVolume: "Individual volume for ambience.",
            meVolume: "Individual volume for fanfare sounds.",
            seVolume: "Individual volume for sound effects.",
        },
        controls: {
            //Actions in Window_KeyAction
            clearText: "Unbind key",
            okText: "Confirm / Interact",
            escapeText: "Cancel / Open Menu",
            cancelText: "Cancel",
            menuText: "Menu",
            shiftText: "Dash",
            pageupText: "-",
            pagedownText: "-",
            upText: "Move Up ↑",
            leftText: "Move Left ←",
            rightText: "Move Right →",
            downText: "Move Down ↓",
            fullscreenText: "Toggle fulscreen mode on/off",
            fastForwardText: "Skip through text",
            fpsText: "Toggle WebGL FPS counter on/off",

            //Actions as displayed on top of keys
            okKey: "OK",
            escKey: "Esc",
            cancelKey: "Cancel",
            menuKey: "Menu",
            shiftKey: "Dash",
            pageUpKey: "-",
            pageDnKey: "-",
            upKey: "↑",
            leftKey: "←",
            rightKey: "→",
            downKey: "↓",
            fastForwardKey: "Skip",
            fullscreenKey: "⛶",
            fpsKey: "FPS",

            //Text that appears in the help window
            keyNewHelp: "Bind an action to ",
            keyHelp: "Change the action bound to ",
            defaultHelp: "Revert your keyboard setting to the default configuration.",
            discardHelp: "Discard all changes you've made since opening this screen.",
            finishHelp: "Apply your changes to the keyboard configuration.",
            notRebindable: "This key is not rebindable.",

            //Names of keys, used in the help window (and displayed on space)
            space: "Space",
            upArrow: "Up arrow",
            leftArrow: "Left arrow",
            rightArrow: "Right arrow",
            downArrow: "Down arrow",

            //Text on the bottom 3 buttons
            defaultText: "Revert to default settings",
            discardText: "Discard changes",
            finishText: "Apply changes",

            //Other
            invalidConfigSingular: "This configuration cannot be saved, because the following \nrequired action does not have a keybinding: ",
            invalidConfigPlural: "This configuration cannot be saved, because the following \nrequired actions do not have a keybinding:\n\n",
            discardChanges: "Discard changes",
            saveChanges: "Save changes",
            cancelPrompt: "You have unsaved changes. \nWould you like to save them before quitting?\n",
        },
        controlsScreen: `Go up:    W or Up Arrow\nGo down:  S or Down Arrow\nGo left:  A or Left Arrow\nGo right: D or Right Arrow\nDash:     Shift\n\nInteract/confirm:  Space, Enter or Z\nCancel/open menu:  Escape or X\nToogle fullscreen: F4\n\nThere are no rebindable keys in this version, but they are coming at some point in the future.\nIf this feature is important to you do let me know, and it will be done faster ;)\n`,
        loadingFile: "Loading",
        yes: "yes",
        no: "no",
        on: "ON",
        off: "OFF",
        cancel: "Cancel",
        credits: "Credits",
        feedback: "Feedback & bug reports",
        exit: "Exit",
        back: "Back",
        language: "Language",
        colorblindMode: "Colourblind mode",
        controlsOption: "Controls",
        masterVolume: "Master volume",
        colorblindPrompt: "Would you like to enable colorblind mode?\n\nThis mode adjusts some puzzles that would othrewise require\ndistinguishing between colors in order to solve them.",
        close: "Close",
        copy: "Copy",
        clipboardMessage: "Copied to clipboard.",
        resume: "Resume",
        displayNavigation: ["Left arrow", "Right arrow", "Up arrow", "Down arrow", "Leave"],
        noData: "No data",
        newEntry: "New entry",
        history: "History",
        leave: "Leave",
        fullScreen: "Fullscreen",
        autosave: "Autosave",
        autosaving: "Autosaving...",
        autosaved: "Autosaved!",
        autosavingFailed: "Autosaving failed :(",
        encryptList: "abcdefghijklmnopqrstuvwxyz[]",
        maximumLengthIs: "Maximum length is",
        characters: "characters",
        allowedCharactersAre: "Only the following characters are allowed",
    },
    pl: {
        terms: { "basic": ["Level", "Lv", "HP", "HP", "MP", "MP", "TP", "TP", "EXP", "EXP"], "commands": ["Fight", "Escape", "Attack", "Guard", "Item", "Skill", "Equip", "Status", "Formation", "Zapisz", "Wyjdź", "Opcje", "Weapon", "Armor", "Key Item", "Equip", "Optimize", "Clear", "Nowa gra", "Kontynuacja", null, "Do menu głównego", "Anuluj", null, "Buy", "Sell"], "params": ["Max HP", "Max MP", "Attack", "Defense", "M.Attack", "M.Defense", "Agility", "Luck", "Hit", "Evasion"], "messages": { "actionFailure": "There was no effect on %1!", "actorDamage": "%1 took %2 damage!", "actorDrain": "%1 was drained of %2 %3!", "actorGain": "%1 gained %2 %3!", "actorLoss": "%1 lost %2 %3!", "actorNoDamage": "%1 took no damage!", "actorNoHit": "Miss! %1 took no damage!", "actorRecovery": "%1 recovered %2 %3!", "alwaysDash": "Biegnij domyślnie", "bgmVolume": "Głośność muzyki", "bgsVolume": "Głośność dźwięków tła", "buffAdd": "%1's %2 went up!", "buffRemove": "%1's %2 returned to normal!", "commandRemember": "Don't mind this", "counterAttack": "%1 counterattacked!", "criticalToActor": "A painful blow!!", "criticalToEnemy": "An excellent hit!!", "debuffAdd": "%1's %2 went down!", "defeat": "%1 was defeated.", "emerge": "%1 emerged!", "enemyDamage": "%1 took %2 damage!", "enemyDrain": "%1 was drained of %2 %3!", "enemyGain": "%1 gained %2 %3!", "enemyLoss": "%1 lost %2 %3!", "enemyNoDamage": "%1 took no damage!", "enemyNoHit": "Miss! %1 took no damage!", "enemyRecovery": "%1 recovered %2 %3!", "escapeFailure": "However, it was unable to escape!", "escapeStart": "%1 has started to escape!", "evasion": "%1 evaded the attack!", "expNext": "To Next %1", "expTotal": "Current %1", "file": "Plik", "levelUp": "%1 is now %2 %3!", "loadMessage": "Który plik wczytać?", "magicEvasion": "%1 nullified the magic!", "magicReflection": "%1 reflected the magic!", "meVolume": "Głośność efektów muzycznych", "obtainExp": "%1 %2 received!", "obtainGold": "znaleziono %1\\G!", "obtainItem": "znaleziono %1!", "obtainSkill": "%1 learned!", "partyName": "%1's Party", "possession": "Possession", "preemptive": "%1 got the upper hand!", "saveMessage": "Do którego pliku zapisać?", "seVolume": "Głośność efektów", "substitute": "%1 protected %2!", "surprise": "%1 was surprised!", "useItem": "%1 uses %2!", "victory": "%1 was victorious!" } },
        optionDescriptions: {
            cancel: "",
            alwaysDash: "Z tą opcją będziesz biec domyślnie, a iść normalnie tylko przy wciśniętym klawiszu biegu.",
            fullscreen: "Przełącza pomiędzy trybem pełnoekranowym a oknem.",
            keyConfig: "Pozawala na zmianę ustawień sterowania.",
            lang: "Zmienia język gry.\nTą opcję można zmienić tylko w menu głównym.",
            cBlind: "Zmienia nieco niektóre zagadki, tak, aby ich rozwiązanie nie wymagało zdolności rozróżniania kolorów.",
            masterVolume: "Ogólny poziom głośności dla całej gry.",
            bgmVolume: "Poziom głośności muzyki.",
            bgsVolume: "Poziom głośności dźwięków otoczenia.",
            meVolume: "Poziom głośności efektów muzycznych.",
            seVolume: "Poziom głośności efektów dźwiekowych.",
        },
        controls: {
            //Actions in Window_KeyAction
            clearText: "Usuń akckję przypisaną do tego klawisza",  //"Unbind key",
            okText: "Interakcja/potwierdzenie",  //"Confirm / Interact",
            escapeText: "Anulowanie/menu",  //"Cancel / Open Menu",
            cancelText: "Anulowanie",  //"Cancel",
            menuText: "Otwieranie menu",  //"Menu",
            shiftText: "Bieg",  //"Dash",
            pageupText: "-",  //"-",
            pagedownText: "-",  //"-",
            upText: "Idź w górę ↑",  //"Move Up ↑",
            leftText: "Idź w lewo ←",  //"Move Left ←",
            rightText: "Idź w prawo →",  //"Move Right →",
            downText: "Idź w dół ↓",  //"Move Down ↓",
            fullscreenText: "Wł/wył. pełny ekran",  //"Toggle fulscreen mode on/off",
            fastForwardText: "Przewijanie tekstu",  //"Skip through text",
            fpsText: "Licznik FPS",  //"Toggle WebGL FPS counter on/off",

            //Actions as displayed on top of keys
            okKey: "OK",  //"OK",
            escKey: "Esc",  //"Esc",
            cancelKey: "Anuluj",  //"Cancel",
            menuKey: "Menu",  //"Menu",
            shiftKey: "Bieg",  //"Dash",
            pageUpKey: "-",  //"-",
            pageDnKey: "-",  //"-",
            upKey: "↑",  //"↑",
            leftKey: "←",  //"←",
            rightKey: "→",  //"→",
            downKey: "↓",  //"↓",
            fastForwardKey: ">>",  //"Skip",
            fullscreenKey: "⛶",  //"FullScr",
            fpsKey: "FPS",  //"FPS",

            //Text that appears in the help window
            keyNewHelp: "Przypisz akcję do klawisza ",  //"Bind an action to ",
            keyHelp: "Zmień akcję przypisaną do klawisza ",  //"Change the action bound to ",
            defaultHelp: "Przywróć domyślne ustawienia klawiatury",  //"Revert your keyboard setting to the default configuration.",
            discardHelp: "Cofnij wszystkie zmiany dokonane od otwarcia tego menu.",  //"Discard all changes you've made since opening this screen.",
            finishHelp: "Zapisz wszystkie dokanane tu zmiany.",  //"Apply your changes to the keyboard configuration.",
            notRebindable: "Nie możesz zmienić akcji przypisanej do tego klawisza.",  //"This key is not rebindable.",

            //Names of keys, used in the help window (and displayed on space)
            space: "Spacja",  //"Space",
            upArrow: "Strzałka w górę",  //"Up arrow",
            leftArrow: "Strzałka w lewo",  //"Left arrow",
            rightArrow: "Strzałka w prawo",  //"Right arrow",
            downArrow: "Strzałka w dół",  //"Down arrow",

            //Text on the bottom 3 buttons
            defaultText: "Przywróć domyślne",  //"Revert to default settings",
            discardText: "Odrzuć zmiany",  //"Discard changes",
            finishText: "Zapisz zmiany",  //"Apply changes",

            //Other
            invalidConfigSingular: "Nie można zapisać zmian, ponieważ następująca \nwymagana akcja nie ma przypisanego klawisza: ",  //"This configuration cannot be saved, because the following \nrequired action does not have a keybinding: ",
            invalidConfigPlural: "Nie można zapisać zmian, ponieważ następujące \nwymagane akcje nie mają przypisanych klawiszy:\n\n",  //"This configuration cannot be saved, because the following \nrequired actions do not have a keybinding:\n",
            discardChanges: "Odrzuć zmiany",  //"Discard changes",
            saveChanges: "Zapisz zmiany",  //"Save changes",
            cancelPrompt: "Masz niezapisane zmiany.\nCzy chcesz je zapisać przed wyjściem?\n",  //"You have unsaved changes. \nWould you like to save them before quitting?\n",
        },
        controlsScreen: `Idź w górę:  W lub Strzałka w górę\nIdź w dół:   S lub Strzałka w dół\nIdź w lewo:  A lub Strzałka w lewo\nIdź w prawo: D lub Strzałka w prawo\nBiegnij:     Shift\n\nInterakcja/potwierdzenie: Spacja, Enter lub Z\nAnulowanie/menu:          Escape lub X\nWł./wył. pełny ekran:     F4\n\nW tej wersji niestety nie da się jeszcze zmieniać ustawień klawiszy.\nJeśli ta funkcja jest dla Ciebie ważna to daj mi znać, a zostanie zrobiona szybciej ;)\n`,
        loadingFile: "LoadingPl",
        yes: "tak",
        no: "nie",
        on: "TAK",
        off: "NIE",
        cancel: "Anuluj",
        credits: "Twórcy",
        feedback: "Feedback i zgłaszanie błędów",
        exit: "Wyjdź",
        back: "Wróć",
        language: "Język",
        colorblindMode: "Tryb dla daltonistów",
        controlsOption: "Sterowanie",
        masterVolume: "Głośność",
        colorblindPrompt: "Czy chcesz włączyć tryb dla daltonistów?\n\nZmienia nieco niektóre zagadki, tak, aby ich rozwiązanie nie\nwymagało zdolności rozróżniania kolorów.",
        close: "Zamknij",
        copy: "Kopiuj",
        clipboardMessage: "Skopiowano do schowka.",
        back: "Wróć",
        resume: "Wznów",
        displayNavigation: ["Strzałka w lewo", "Strzałka w prawo", "Strzałka w górę", "Strzałka w dół", "Odejdź"],
        noData: "Brak danych",
        newEntry: "Nowy tekst",
        history: "Historia",
        leave: "Odejdź",
        fullScreen: "Pełny ekran",
        autosave: "Autozapis",
        autosaving: "Autozapisywanie...",
        autosaved: "Autozapisano",
        autosavingFailed: "Autozapis nieudany :(",
        encryptList: "aąbcćdeęfghijklłmnńoóprsśtuwyzźż[]",
        maximumLengthIs: "Maksymalna długość to",
        characters: "znaków",
        allowedCharactersAre: "Dozwolone znaki to",
    }
}