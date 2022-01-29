import { format, getHours, addHours, set } from "date-fns";
import { getWordByGameId } from "./words";
import { Base64 } from "./Base64";

export const GameState = {
  PENDING: "PENDING",
  LOADING: "LOADING",
  IN_PROGRESS: "IN_PROGRESS",
  FINISHED: "FINISHED",
};

const eachGameHour = 8;
const gameIdFormat = `yy/MM/dd-HH:00`;

export const timeToGameId = (time: number) => format(time, gameIdFormat);

const roundHourDown = (hour: number, roundBy: number) => {
  return roundBy * Math.floor(hour / roundBy);
};

const now = Date.now();
const currentGameHour = roundHourDown(getHours(now), eachGameHour);

export const CurrentGameTime = set(now, {
  hours: currentGameHour,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
}).getTime();
export const NextGameTime = set(
  addHours(CurrentGameTime, eachGameHour).getTime(),
  {
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  }
).getTime();
export const CurrentGameId = timeToGameId(CurrentGameTime);

const word = getWordByGameId(CurrentGameId);

export const CurrentWord = Base64.encode(Base64.encode(JSON.stringify(word)));
