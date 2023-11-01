//=============================================================================
// PuzzleManager.js
//=============================================================================

/*:
 * @plugindesc Manages puzzle-related data.
 * @author Mac15001900
 *
 * @help Stores all puzzle related data, i.e.
 * - Keys for each puzzle
 * - Puzzle-specific reactions
 * - Hints for close solutions and the functions for detecting those
 * 
 * Also handles reactions to puzzles in general
 * 
 * Yes, this file is a somewhat unholy combination of both code and data, but separating
 * them would have been much more annoying.
 */

const BALLOON_ID = {
    EXCLAMATION: 1,
    QUESTION: 2,
    MUSIC_NOTE: 3,
    HEART: 4,
    ANGER: 5,
    SWEAT: 6,
    COBWEB: 7,
    SILENCE: 8,
    LIGHT_BULB: 9,
    ZZZ: 10,
    CUSTOM_1: 11,
    CUSTOM_2: 12,
    CUSTOM_3: 13,
    CUSTOM_4: 14,
    CUSTOM_5: 15,
}
/**
 * Each puzzle object contains the following properties:
 * solution: The solution to the puzzle, as a string
 * The remaining properties are optional:
 * success: A message or array of messages to be displayed upon success. See g.showMessages for formatting details. A message can just be a string; id will be set to 0, unless explicitly set to null.
 * failure: A function that evaluates a guess, and returns either a message if the guess is a near miss for this puzzle or a falsy value otherwise.
 */
const $dataPuzzles = {
    en: {

    },
    pl: [{
        solution: "otoczenie",
    }, {
        //Template
        solution: "Template",
        success: {
            string: "",
            id: 0,
        },
    }, {
        solution: "nokianazawsze",
        success: {
            string: "Zdecydowanie nie spodziewałam się, że ta umiejętność jeszcze\nkiedykolwiek mi się w życiu przyda.",
            id: 1,
        },
    }, {
        solution: "całkiemjakżycie",
    }, {
        solution: "kalkulacja",
    }, {
        solution: "charleskrum",
    }, {
        solution: "rakietakiwitęcza",
        success: {
            string: 'Z cyklu \\fi"Rzeczy, Których Zdecydowanie Się Nie Spodziewałam \nW Tym Miejscu"\\fi: emoji.',
            id: 1,
        },
    }, {
        solution: "iksytonawiasy",
    }, {
        solution: "nowesrebro",
    }, {
        solution: "deuteranopia",
    }, {
        solution: "akumulatron",
    }, {
        solution: "pierwiastekcotam",
    }, {
        solution: "powodzenia",
    }, {
        solution: "semikonteneryzacja",
    }, {
        solution: "czekoladapizzawiewiórkasparta",
        success: {
            string: "Tak patrząc po tamtej instruckji, to chyba w pewnym sensie udało\nmi się jednak zagrać w Decrypto.",
            id: 1,
        },
        failure: function (guess) {
            let keyWords = ["czekolada", "pizza", "wiewiórka", "sparta"];
            let correct = 0;
            for (let i = 0; i < keyWords.length; i++) {
                if (key.contains(keyWords[i])) correct++;
            }
            if (correct === 2) return ({ string: "Niektóre z tych słów zdecydowanie mają sens,\nno ale chyba jeszcze nie wszystkie.", id: 0 });
            else if (correct === 3) {
                let wrongPart = key;
                for (let i = 0; i < keyWords.length; i++) wrongPart = wrongPart.replace(keyWords[i], '');
                wrongPart = wrongPart[0].toUpperCase() + wrongPart.substring(1);
                return ({ string: "To musi być już blisko!\n" + wrongPart + " tu chyba najmniej pasuje.", id: 0 })
            } else return null;
        }
    }, {
        solution: "miódmalina",
        success: { string: "Trochę robię się teraz głodna przez tę zagadkę.", id: 1 },
    }, {
        solution: "delatorcukrzenia",
    }, {
        solution: "bojadrukfigahartmenuopiswiza",
    }, {
        solution: "obracańko",
    }, {
        solution: "grynszpany",
    }, {
        solution: "eulerowsko",
    }, {
        solution: "945",
    }, {
        solution: "terazmyśliszparzystością",
    }, {
        solution: "zaznaczacz",
    }, {
        solution: "banachowo",
    }, {
        solution: "wielkaunifikacjahaseł",
    }, {
        solution: "zaczynamy",
    }, {
        solution: "kjf947fosi yu094",
    }, {
        solution: "zacezarowane",
    }, {
        solution: "wykładniczowością",
    }, {
        solution: "odcyrklowywanie",
        failure: function (guess) {
            switch (guess) {
                case "jgbuśmłnzruąręf":
                    return [{ string: "Nie!? Ale przecież tu wszystko tak idealnie wskazuje na pi.", id: 3, balloon: BALLOON_ID.COBWEB },
                    { string: "Chociaż właściwie to póki co rozwiązania zawsze były raczej\njakimiś słowami. Może trzeba to zrobić jakoś odrobinę inczej?", id: 0 }];
                case "łhąźoóltuźńbklż":
                case "ódęśukrncpyśści":
                    return "Szkoda, tak ładnie ta zasada działała dla pierwszych pięciu,\nno ale chyba nie działa dalej. Czyli chodzi pewnie a coś innego.\nMoże fakt, że ten tekst jest okrągły ma jakieś znaczenie?"
                default: return null;
            }
        }
    }]
}