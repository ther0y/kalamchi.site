import React, { FC, useContext, useEffect, useState } from "react";
import { resultTitle } from "../../utils/result-helper";
import { GameContext } from "../../state/game/game.context";
import { NextGameTime } from "../../utils/game-utils";
import Countdown from "react-countdown";
import { GameState } from "../../utils/game-state";

const Modal: FC = () => {
  const { game, won, journeySummery } = useContext(GameContext);
  const [isVisible, setIsVisible] = useState(false);

  let titleId = game.guessIndex;

  useEffect(() => {
    setIsVisible(game.state === GameState.FINISHED);
  }, [game]);

  if (!isVisible) return null;

  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return null;
    } else {
      // Render a countdown
      return (
        <div className="text-center my-4">
          <span className="text-4xl md:text-3xl">
            {hours >= 10 ? hours : "0" + hours}:
            {minutes >= 10 ? minutes : "0" + minutes}:
            {seconds >= 10 ? seconds : "0" + seconds}
          </span>
          <h1>تا بازی بعد</h1>
        </div>
      );
    }
  };

  return (
    <div className="fixed w-full h-full bg-[#ffffff05] z-10 top-0 left-0 flex items-start justify-center pt-48 animate-bgFadeIn select-none">
      <div className="text-[#3a3a3c] text-2xl font-bold bg-white rounded-md animate-slideUp max-w-[30rem] w-11/12 md:w-10/12 p-4">
        <div className="flex justify-center items-center flex-col gap-2">
          <h2 className="text-3xl mb-4">
            {won ? resultTitle[titleId] : "نشد"}!
          </h2>
          <div className="flex gap-4 text-xl">
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl">{journeySummery.wins}</div>
              <div className="text-lg">برد</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl">{journeySummery.games}</div>
              <div className="text-lg">بازی</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl">{journeySummery.winPercentage}</div>
              <div className="text-lg ">درصد برد</div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-around w-full my-4 max-w-sm">
            <Countdown date={NextGameTime} renderer={renderer} />
            {won && (
              <span className="text-xl mt-4 md:mt-0 px-4 py-2 rounded-md bg-green-500 text-indigo-50 font-semibold cursor-pointer text-white bg-secondary-500 select-none">
                به اشتراک گذاری 🎉
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Modal);
