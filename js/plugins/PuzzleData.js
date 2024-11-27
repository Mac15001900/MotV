//=============================================================================
// PuzzleData.js
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
 * name: The name of the puzzle, used to identify it. Same as the name of the corresponding notes file if possible.
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
    en: [
        //Tutorial puzzles
        {
            name: "tutorial_1",
            solution: "beginning",
        }, {
            name: "tutorial_2",
            solution: "aroundyou",
        }, {
            name: "urodziny",
            solution: "goodluck",

        },

        //Living room
        {
            name: "brakujące",
            solution: "codeclination",
        }, {
            name: "decrypto",
            solution: "chocolate pizza squirrel Sparta",
            success: {
                string: "Well, from having a look through its manual, it seems like in\na way I did kind of manage to play some Decrypto.",
                id: 1,
            },
            failure: function (guess) {
                let keyWords = ["chocolate", "pizza", "squirrel", "sparta"];
                let correct = 0;
                for (let i = 0; i < keyWords.length; i++) {
                    if (guess.contains(keyWords[i])) correct++;
                }
                if (correct === 2) return ({ string: "I think some of these words should be correct, though apprently\nnot all of them are.", id: 0 });
                else if (correct === 3) {
                    let wrongPart = guess;
                    for (let i = 0; i < keyWords.length; i++) wrongPart = wrongPart.replace(keyWords[i], '');
                    wrongPart = wrongPart[0].toUpperCase() + wrongPart.substring(1);
                    return ({ string: `Ah, not yet, but this has got to be close! Out of these, I think\n"${wrongPart}" is the worst fit.`, id: 0 })
                } else return null;
            }
        }, {
            name: "kolory",
            solution: "deliciousness",
            success: { string: "Well, I certainly did't expect to learn some fun new colour\nnames here.", id: 1 },
        }, {
            name: "rotowanie",
            solution: "rotatious",
        },

        //Laboratory
        {
            name: "dalton",
            solution: "deuteranopia",
            success: "Phew, that one was quite a journey.",
        }, {
            name: "sekwencja",
            solution: "accumulatron",
            success: "This was certainly a welcomed break from those more complex one.",
        }, {
            name: "pierwiastki",
            solution: "periodycalness",
            success: "I guess I should have expected something like this given \nthe theme of that room.",
        },

        //Bedroom
        {
            name: "liczby pierwsze",
            solution: "eulerishness",
            success: { string: "This puzzle was nice, but the best thing about it was \ndefinitely the cool hideout hidden under the bed!", id: 1 },
        }, {
            name: "parzystość",
            solution: "now you're thinking with parity",
            failure: function (guess) {
                if (guess === "nowyou'reth") return "That appears to look like something, but the closing bracket\ndoesn't really fit properly here. There must be something I'm\nmissing...";
                else if (guess === "nowthu'rety") return [{ string: "Well, that's clearly not it." }, { string: "I think I might have slightly messed up around those spaces...", id: 1 }];
            }
        }, {
            name: "sudoku",
            solution: "reverseness",
        }, {
            name: "framuga",
            solution: "antepenultima",
            failure: function (guess) {
                switch (guess) {
                    case "nul": return "That's a shame, I really hoped that would do something.\nLooks like there are no fragments within fragments in this one.";
                    case "trscrhosnnhnf":
                        return [{ string: "No? Oh come on, everything here was pointing to pi!", id: 3, balloon: BALLOON_ID.COBWEB },
                        { string: "Well, alright, to think about it, most codes so far turned out\nto be some kind of words, even if they were a bit weird.\nMaybe I just need to do this a little bit differently?", id: 0 }];
                    case "wsrgmlnakvzow":
                    case "wsrgmlnauvjog":
                    case "wsrgmlnatviof":
                    case "bnxatevstmjeh":
                    case "bnxatevstwjoh":
                    case "bnxatevstvjnh":
                        return "Ah, so it's not going to be so easy.\\. The pattern held up for\nthe first 5, but I guess it doesn't really hold for the rest,\nso it has to be something different\\.. Maybe the fact that the\nwhole thing is circular is somehow relevant?";
                    default: return null;
                }
            }
        },

        //Computer room
        {
            name: "zaszyftowywacz", //File: interaktywne
            solution: "overcezared",
        }, {
            name: "obliczacz", //File: interaktywne
            solution: "exponentialisness",
        }, {
            name: "kalkulacja",
            solution: "sequenceness",
        }, {
            name: "klawiaturowa",
            solution: "charles krum",
        }, {
            name: "kalibracja",
            solution: "interspace",
        }, {
            name: "komunikacja",
            solution: "rocket kiwi rainbow",
            failure: function (guess) {
                if (guess === "🚀🥝🌈") return "Well, I did have to convert that X emoji earlier\\..\\..\\..\nI guess I need to somehow do the same for the others?"
            },
            success: {
                string: 'Well, emojis are certainly a one of the things I really did\nnot expect to see here.',
                id: 1,
            },
        },

        //Landing pad
        {
            name: "blok_liczb",
            solution: "945",
            success: {
                string: "This one really takes the crown in terms for the best ratio\nbetween how difficult it looks like versus how difficult the\nactual solution is.",
                id: 1,
            },
        }, {
            name: "gradient", //No notes file for this one. See the gimp and tiled image files
            solution: "newtonish",
            success: ""
        }, {
            name: "nakładanie",
            solution: "First Great Unification",
        }, {
            name: "nokia",
            solution: "indestructible",
            success: {
                string: "I really didn't expect that particular ability to ever be\nuseful again.",
                id: 1,
            },
        },

        //Other
        {
            name: "game_of_life",
            solution: "is this life",
            success: [{
                string: "Well, dear puzlle, you ask an interesting question.",
                id: 1,
            }, {
                string: "We typically only defined life in the \ncontext of biology, but various virtual processes can often \nexhibit very similar properties.",
                id: 0,
            }, {
                string: `But can you call them "life" because of that? That would mostly \ndepend on your exact definition of that word.`,
                id: 0,
            }, {
                string: '...',
                id: 4,
            }, {
                string: `I wish this Vault teleported someone else in here already. \nI'm starting to talk to puzzle solutions.`,
                id: 1,
            }]
        }, {
            name: "podłoga",
            success: "I got a bit of a headache from looking at that floor so much,\nbut at least it's over now.",
            solution: "turquooise",
        }, {
            name: "grobowiec_1",
            solution: "jazz flux band cork vest whip game",
            success: {
                string: "I certainly didn't expect to have to deal with rebuses here.",
                id: 1,
            },
        }, {
            name: "grobowiec_2",
            solution: "activized ballistocardiogram",
            success: {
                string: "And apparently that \\fiis\\fi a real word. I really didn't expect it \nto be.",
                id: 1,
            }


        }, {
            name: "mors",
            solution: "ideas to worlds",
            success: "Well, that was fun to spot.\nAnd I really didn't expect to learn more about Morse code of\nall things, but now I know that '-.--.' can be stand for any\ntype of bracket. The more you know.",
            lastRemaining: {
                string: "Alright, but where is that one remaining fragment?\nEverything seems to be accounted for already\\..\\..\\..\nMaybe this one is hidden in a different way?",
                id: 0,
                balloon: BALLOON_ID.QUESTION,
            }
        }],
    pl: [
        //Tutorial puzzles
        {
            name: "tutorial_1",
            solution: "zaczynamy",
        }, {
            name: "tutorial_2",
            solution: "otoczenie",
        }, {
            name: "urodziny",
            solution: "powodzenia",

        },

        //Living room
        {
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
                    let wrongPart = guess;
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
            name: "rotowanie",
            solution: "obracańko",
        },

        //Laboratory
        {
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
        },

        //Bedroom
        {
            name: "liczby pierwsze",
            solution: "eulerowsko",
        }, {
            name: "parzystość",
            solution: "terazmyśliszparzystością",
            failure: function (guess) {
                if (guess === "terazmyśli" || guess === "terazmyśl") return "Wydaje się to działać, no ale nijak ten końcowy nawias tu nie\npasuje. Może jednak trzeba tu zrobić coś więcej?";
                else if (guess === "terazścią") return [{ string: "Czyli nie o to chodziło." }, { string: "Chyba jendak powinnam potraktować tą drugą spację tak samo\njak pierwszą\\..\\..\\.. tylko co dalej?", id: 4, balloon: BALLOON_ID.SILENCE }];
            }
        }, {
            name: "sudoku",
            solution: "zaznaczacz",
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
        },

        //Computer room
        {
            name: "zaszyftowywacz", //File: interaktywne
            solution: "zacezarowane",
        }, {
            name: "obliczacz", //File: interaktywne
            solution: "wykładniczowością",
        }, {
            name: "kalkulacja",
            solution: "kalkulacja",
        }, {
            name: "klawiaturowa",
            solution: "charleskrum",
        }, {
            name: "kalibracja",
            solution: "międzyprzestrzeń",
        }, {
            name: "komunikacja",
            solution: "rakietakiwitęcza",
            success: {
                string: 'Z cyklu \\fi"Rzeczy, Których Zdecydowanie Się Nie Spodziewałam \nW Tym Miejscu"\\fi: emoji.',
                id: 1,
            },
        },

        //Landing pad
        {
            name: "blok_liczb",
            solution: "945",
            success: {
                string: "Ta zdecydowanie wygrywywa jeśli chodzi o stosunek pomiędzy tym,\nna jak trudną ta zagadka wyglądała, a tym, jak trudna\nfaktycznie była.",
                id: 1,
            },
        }, {
            name: "gradient",
            solution: "banachowo",
        }, {
            name: "nakładanie",
            solution: "wielkaunifikacjahaseł",
        }, {
            name: "nokia",
            solution: "niezniszczalne",
            success: {
                string: "Zdecydowanie nie spodziewałam się, że ta umiejętność jeszcze\nkiedykolwiek mi się w życiu przyda.",
                id: 1,
            },
        },

        //Other
        {
            name: "game_of_life",
            solution: "czy to życie",
            success: [{
                string: "Ciekawe pytanie zadajesz, zagadko.",
                id: 1,
            }, {
                string: "Zazwyczaj definiujemy życie tylko w kontekście biologii, ale \nwirtualne procesy potrafią mieć z nim wiele wspólnych cech.",
                id: 0,
            }, {
                string: `Czy jednak można je przez to nazwać "życiem"? No cóż, droga \nzagadko, zależy to głównie od twojej definicji życia.`,
                id: 0,
            }, {
                string: '...',
                id: 4,
            }, {
                string: 'Mógłby ten cały skarbiec przyteleportować tu jeszcze kogoś.\nZaczynam rozmawiać z rozwiązaniami zagadek.',
                id: 1,
            }]
        }, {
            name: "podłoga",
            success: "Trochę mnie boli głowa od patrzenia się w tą podłogę, ale na \nszczęście to już za mną.",
            solution: "krynszpany",
        }, {
            name: "grobowiec_1",
            solution: "boja druk figa hart menu opis wiza",
            success: {
                string: "Rozwiązałam tu już dość dużo różnego rodzaju zagadek, ale nie\nspodziewałam się \firebusów\fi.",
                id: 1,
            },
        }, {
            name: "grobowiec_2",
            solution: "delator cukrzenia",
        }, {
            name: "mors",
            solution: "iksytonawiasy",
            success: "Well, that was fun to spot.\nAnd I really didn't expect to learn more about Morse code of\nall things, but now I know that '-.--.' can be stand for any\ntype of bracket. The more you know.",
            lastRemaining: {
                string: "No dobra, tylko gdzie niby jest ten jeden pozostały klucz?\nChyba musi być ukryty inaczej niż pozostałe.",
                id: 0,
                balloon: BALLOON_ID.QUESTION,
            }
        }],
    get: function (puzzleName) {
        return $dataPuzzles[g.lang].find(p => p.name === puzzleName);
    },
    getBySolution: function (solution) {
        return $dataPuzzles[g.lang].find(p => p.solution.toLocaleLowerCase().replaceAll(' ', '') === solution);
    },
    getAmount: function () {
        return $dataPuzzles[g.lang].length;
    },
    getRemaining: function () {
        return $dataPuzzles[g.lang].filter(p => !g.data.solved[p.name]);
    },
    getRemainingAmount: function () {
        return this.getRemaining().length;
    }
}