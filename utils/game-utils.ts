import { addHours, format, getHours, set } from "date-fns";
import { convertToTimeZone } from "date-fns-timezone";

const eachGameHour = 8;
const gameIdFormat = `yy/MM/dd-HH:00`;

export const timeToGameId = (time: number) => format(time, gameIdFormat);

const roundHourDown = (hour: number, roundBy: number) => {
  return roundBy * Math.floor(hour / roundBy);
};

const now = convertToTimeZone(Date.now(), {
  timeZone: "Asia/Tehran",
}).getTime();

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
