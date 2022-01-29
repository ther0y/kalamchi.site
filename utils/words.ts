export type GameWord = {value: string, guessCount: number};

const defaultWord: GameWord = {
    value: "ایران",
      guessCount: 6
};

export const getWordByGameId = (id: string): GameWord => Words[id] || defaultWord;

const Words: {[key: string]: GameWord} = {
    "22/01/28-16:00": {
        value: "ریاضی",
        guessCount: 6
    },
    "22/01/29-00:00": {
        value: "دهقان",
        guessCount: 6
    },
    "22/01/29-08:00": {
        value: "کبوتر",
        guessCount: 6
    },
    "22/01/29-16:00": {
        value: "شربت",
        guessCount: 6
    },
    "22/01/30-00:00": {
        value: "نسترن",
        guessCount: 6
    },
    "22/01/30-08:00": {
        value: "پلیور",
        guessCount: 6
    },
    "22/01/30-16:00": {
        value: "صنعت",
        guessCount: 6
    },
    "22/01/31-00:00": {
        value: "باران",
        guessCount: 6
    },
    "22/01/31-08:00": {
        value: "گلدان",
        guessCount: 6
    },
    "22/01/31-16:00": {
        value: "خزنده",
        guessCount: 6
    },
    "22/02/01-00:00": {
        value: "سیلو",
        guessCount: 6
    },
    "22/02/01-08:00": {
        value: "نابغه",
        guessCount: 6
    },
    "22/02/01-16:00": {
        value: "پیشه",
        guessCount: 6
    },
    "22/02/02-00:00": {
        value: "محبت",
        guessCount: 6
    },
    "22/02/02-08:00": {
        value: "حافظ",
        guessCount: 6
    },
    "22/02/02-16:00": {
        value: "لانه",
        guessCount: 6
    },
}