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
};
