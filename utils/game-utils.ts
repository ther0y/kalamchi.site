import { addHours, format, getHours, set } from "date-fns";
import { convertToTimeZone } from "date-fns-timezone";

const eachGameHour = 8;
const gameIdFormat = `yyyy-MM-dd'T'HH:00`;

export const timeToGameId = (time: number) => format(time, gameIdFormat);

const roundHourDown = (hour: number, roundBy: number) => {
  return roundBy * Math.floor(hour / roundBy);
};

export const GetCurrentGameTime = () => {
  const now = convertToTimeZone(Date.now(), {
    timeZone: "Asia/Tehran",
  }).getTime();

  const currentGameHour = roundHourDown(getHours(now), eachGameHour);

  return set(now, {
    hours: currentGameHour,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  }).getTime();
};

export const GetNextGameTime = () => {
  return set(addHours(GetCurrentGameTime(), eachGameHour).getTime(), {
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  }).getTime();
};

export const GetCurrentGameId = () => {
  return timeToGameId(GetCurrentGameTime());
};
