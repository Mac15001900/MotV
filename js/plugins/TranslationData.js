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
        terms: { "basic": ["Level", "Lv", "HP", "HP", "MP", "MP", "TP", "TP", "EXP", "EXP"], "commands": ["Fight", "Escape", "Attack", "Guard", "Item", "Skill", "Equip", "Status", "Formation", "Save", "Game End", "Options", "Weapon", "Armor", "Key Item", "Equip", "Optimize", "Clear", "New Game", "Continue", null, "To Title", "Cancel", null, "Buy", "Sell"], "params": ["Max HP", "Max MP", "Attack", "Defense", "M.Attack", "M.Defense", "Agility", "Luck", "Hit", "Evasion"], "messages": { "actionFailure": "There was no effect on %1!", "actorDamage": "%1 took %2 damage!", "actorDrain": "%1 was drained of %2 %3!", "actorGain": "%1 gained %2 %3!", "actorLoss": "%1 lost %2 %3!", "actorNoDamage": "%1 took no damage!", "actorNoHit": "Miss! %1 took no damage!", "actorRecovery": "%1 recovered %2 %3!", "alwaysDash": "Always Dash", "bgmVolume": "Music volume", "bgsVolume": "Ambience volume", "buffAdd": "%1's %2 went up!", "buffRemove": "%1's %2 returned to normal!", "commandRemember": "Command Remember", "counterAttack": "%1 counterattacked!", "criticalToActor": "A painful blow!!", "criticalToEnemy": "An excellent hit!!", "debuffAdd": "%1's %2 went down!", "defeat": "%1 was defeated.", "emerge": "%1 emerged!", "enemyDamage": "%1 took %2 damage!", "enemyDrain": "%1 was drained of %2 %3!", "enemyGain": "%1 gained %2 %3!", "enemyLoss": "%1 lost %2 %3!", "enemyNoDamage": "%1 took no damage!", "enemyNoHit": "Miss! %1 took no damage!", "enemyRecovery": "%1 recovered %2 %3!", "escapeFailure": "However, it was unable to escape!", "escapeStart": "%1 has started to escape!", "evasion": "%1 evaded the attack!", "expNext": "To Next %1", "expTotal": "Current %1", "file": "File", "levelUp": "%1 is now %2 %3!", "loadMessage": "Load which file?", "magicEvasion": "%1 nullified the magic!", "magicReflection": "%1 reflected the magic!", "meVolume": "Fanfare Volume", "obtainExp": "%1 %2 received!", "obtainGold": "%1\\G found!", "obtainItem": "%1 found!", "obtainSkill": "%1 learned!", "partyName": "%1's Party", "possession": "Possession", "preemptive": "%1 got the upper hand!", "saveMessage": "Save to which file?", "seVolume": "Effects volume", "substitute": "%1 protected %2!", "surprise": "%1 was surprised!", "useItem": "%1 uses %2!", "victory": "%1 was victorious!" } },
        loadingFile: "Loading",
        yes: "yes",
        no: "no",
        on: "ON",
        off: "OFF",
        credits: "Credits",
        feedback: "Feedback & bug reports",
        exit: "Exit",
        back: "Back",
        language: "Language",
        colorblindMode: "Colourblind mode",
        masterVolume: "Master volume",
        colorblindPrompt: "Would you like to enable colorblind mode?\n\nThis mode adjusts some puzzles that would othrewise require\ndistinguishing between colors in order to solve them.",
        close: "Close",
        copy: "Copy",
        clipboardMessage: "Copied to clipboard.",
        back: "Back",
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
        loadingFile: "LoadingPl",
        yes: "tak",
        no: "nie",
        on: "TAK",
        off: "NIE",
        credits: "Twórcy",
        feedback: "Feedback i zgłaszanie błędów",
        exit: "Wyjdź",
        back: "Wróć",
        language: "Język",
        colorblindMode: "Tryb dla daltonistów",
        masterVolume: "Głośność",
        colorblindPrompt: "Czy chcesz włączyć tryb dla daltonistów?\n\nZmienia nieco niektóre zagadki, tak, aby ich rozwiązanie nie\nwymagało zdolności rozróżniania kolorów.",
        close: "Zamknij",
        copy: "Kopiuj",
        clipboardMessage: "Skopiowano do schowka",
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