import React, { FC, useContext } from "react";
import { resultTitle } from "../../utils/result-helper";
import { GameContext } from "../../state/game/game.context";
import { GameState } from "../../utils/game-utils";

const Modal: FC = () => {
  const { game } = useContext(GameContext);

  let titleId = game.guessIndex;

  if (game.state !== GameState.FINISHED) return null;

  return (
    <div className="fixed w-full h-full bg-[#ffffff05] z-10 top-0 left-0 flex items-start justify-center pt-48 animate-bgFadeIn">
      <div className="text-[#3a3a3c] text-2xl font-bold bg-white rounded-md animate-slideUp max-w-[30rem] w-11/12 md:w-10/12">
        <h2>{resultTitle[titleId]}!</h2>
      </div>
    </div>
  );
};

export default React.memo(Modal);
