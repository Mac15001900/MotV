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
 * solution: The solution to the puzzle, as a string without the required part (i.e. "945", not "nexus[945]")
 *
 * The remaining properties are optional, and include messages to be sent when various things happen.
 * Each message can be a string, a message object or an array of message objects (see g.showMessages for specifications of message objects).
 * FaceId will be set to 0 if not specified, unless explicitly set to null
 *
 * success: A message to be displayed upon successfully completing the puzzle
 * failure: A function that evaluates a guess, and returns either a message if the guess is a near miss for this puzzle or a falsy value otherwise.
 * lastRemaining: A message to be displayed when this puzzle is the last one remaining.
 */
const $dataPuzzles = {
    en: {

    },
    pl: [{
        name: "tutorial-2",
        solution: "otoczenie",
    }, {
        name: "nokia",
        solution: "nokianazawsze",
        success: {
            string: "Zdecydowanie nie spodziewałam się, że ta umiejętność jeszcze\nkiedykolwiek mi się w życiu przyda.",
            id: 1,
        },
    }, {
        name: "game of life",
        solution: "całkiemjakżycie",
    }, {
        name: "kalkulacja",
        solution: "kalkulacja",
    }, {
        name: "klawiaturowa",
        solution: "charleskrum",
    }, {
        name: "komunikacja",
        solution: "rakietakiwitęcza",
        success: {
            string: 'Z cyklu \\fi"Rzeczy, Których Zdecydowanie Się Nie Spodziewałam \nW Tym Miejscu"\\fi: emoji.',
            id: 1,
        },
    }, {
        name: "mors",
        solution: "iksytonawiasy",
        lastRemaining: {
            string: "No dobra, tylko gdzie niby jest ten jeden pozostały klucz?\nChyba musi być ukryty inaczej niż pozostałe.",
            id: 0,
            balloon: BALLOON_ID.QUESTION,
        }
    }, {
        name: "alpaka",
        solution: "nowesrebro",
    }, {
        name: "dalton",
        solution: "deuteranopia",
    }, {
        name: "sekwencja",
        solution: "akumulatron",
    }, {
        name: "pierwiastki",
        solution: "pierwiastekcotam",
    }, {
        name: "urodziny",
        solution: "powodzenia",
    }, {
        name: "brakujące",
        solution: "semikonteneryzacja",
    }, {
        name: "decrypto",
        solution: "czekoladapizzawiewiórkasparta",
        success: {
            string: "Tak patrząc po tamtej instruckji, to chyba w pewnym sensie udało\nmi się jednak zagrać w Decrypto.",
            id: 1,
        },
        failure: function (guess) {
            let keyWords = ["czekolada", "pizza", "wiewiórka", "sparta"];
            let correct = 0;
            for (let i = 0; i < keyWords.length; i++) {
                if (guess.contains(keyWords[i])) correct++;
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
        name: "kolory",
        solution: "miódmalina",
        success: { string: "Trochę robię się teraz głodna przez tę zagadkę.", id: 1 },
        failure: function (guess) {
            if (guess === "miżdmalina") return "To musi być jakoś blisko. Może trzeba po prostu potraktować\ntamtą spację jak zwykły znak?"
        }
    }, {
        name: "grobowiec-1",
        solution: "delatorcukrzenia",
    }, {
        name: "grobowiec-2",
        solution: "bojadrukfigahartmenuopiswiza",
    }, {
        name: "rotowanie",
        solution: "obracańko",
    }, {
        name: "liczby pierwsze",
        solution: "eulerowsko",
    }, {
        name: "blok liczb",
        solution: "945",
    }, {
        name: "parzystość",
        solution: "terazmyśliszparzystością",
    }, {
        name: "sudoku",
        solution: "zaznaczacz",
    }, {
        name: "gradient",
        solution: "banachowo",
    }, {
        name: "nakładanie",
        solution: "wielkaunifikacjahaseł",
    }, {
        name: "tutorial-1",
        solution: "zaczynamy",
    }, {
        name: "interaktywne-zaszyftowywacz",
        solution: "zacezarowane",
    }, {
        name: "interaktywne-obliczacz",
        solution: "wykładniczowością",
    }, {
        name: "podłoga",
        solution: "krynszpany",
    }, {
        name: "framuga",
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
    }],
    get: function (puzzleName) {
        switch (g.lang) {
            case "pl":
                return $dataPuzzles.pl.find(p => p.name === puzzleName);
            case "en":
                return $dataPuzzles.en.find(p => p.name === puzzleName);

        }
    }
}