export type GameWord = { round: number; value: string; guessCount: number };

const defaultWord: GameWord = {
  round: 0,
  value: "ایران",
  guessCount: 6,
};

export const getWordByGameId = (id: string): GameWord =>
  Words[id] || defaultWord;

const Words: { [key: string]: GameWord } = {
  "22/01/30-16:00": {
    round: 1,
    value: "بستنی",
    guessCount: 6,
  },
  "22/01/31-00:00": {
    round: 2,
    value: "باران",
    guessCount: 6,
  },
  "22/01/31-08:00": {
    round: 3,
    value: "نارنج",
    guessCount: 6,
  },
  "22/01/31-16:00": {
    round: 4,
    value: "خزنده",
    guessCount: 6,
  },
  "22/02/01-00:00": {
    round: 5,
    value: "سیلو",
    guessCount: 6,
  },
  "22/02/01-08:00": {
    round: 6,
    value: "نابغه",
    guessCount: 6,
  },
  "22/02/01-16:00": {
    round: 7,
    value: "صندلی",
    guessCount: 6,
  },
  "22/02/02-00:00": {
    round: 8,
    value: "لیوان",
    guessCount: 6,
  },
  "22/02/02-08:00": {
    round: 9,
    value: "زندگی",
    guessCount: 6,
  },
  "22/02/02-16:00": {
    round: 10,
    value: "حمایت",
    guessCount: 6,
  },
  "22/02/03-00:00": {
    round: 11,
    value: "مهندس",
    guessCount: 6,
  },
  "22/02/03-08:00": {
    round: 12,
    value: "فواره",
    guessCount: 6,
  },
  "22/02/03-16:00": {
    round: 13,
    value: "نهایت",
    guessCount: 6,
  },
  "22/02/04-00:00": {
    round: 14,
    value: "یخچال",
    guessCount: 6,
  },
  "22/02/04-08:00": {
    round: 15,
    value: "فرشته",
    guessCount: 6,
  },
  "22/02/04-16:00": {
    round: 16,
    value: "زعفران",
    guessCount: 6,
  },
  "22/02/05-00:00": {
    round: 17,
    value: "کاربن",
    guessCount: 6,
  },
  "22/02/05-08:00": {
    round: 18,
    value: "ملایر",
    guessCount: 6,
  },
  "22/02/05-16:00": {
    round: 19,
    value: "نارنج",
    guessCount: 6,
  },
  "22/02/06-00:00": {
    round: 20,
    value: "پارچه",
    guessCount: 6,
  },
  "22/02/06-08:00": {
    round: 21,
    value: "درویش",
    guessCount: 6,
  },
  "22/02/06-16:00": {
    round: 22,
    value: "نقاله",
    guessCount: 6,
  },
  "22/02/07-00:00": {
    round: 23,
    value: "ایران",
    guessCount: 6,
  },
  "22/02/07-08:00": {
    round: 24,
    value: "ایران",
    guessCount: 6,
  },
  "22/02/07-16:00": {
    round: 25,
    value: "سیاره",
    guessCount: 6,
  },
  "22/02/08-00:00": {
    round: 26,
    value: "پارچه",
    guessCount: 6,
  },
  "22/02/08-08:00": {
    round: 27,
    value: "شکلات",
    guessCount: 6,
  },
  "22/02/08-16:00": {
    round: 28,
    value: "مساحت",
    guessCount: 6,
  },
  "22/02/10-00:00": {
    round: 29,
    value: "ناهید",
    guessCount: 6,
  },
  "22/02/10-08:00": {
    round: 30,
    value: "شمشیر",
    guessCount: 6,
  },
  "22/02/10-16:00": {
    round: 31,
    value: "تمساح",
    guessCount: 6,
  },
};
