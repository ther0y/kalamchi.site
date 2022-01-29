import React, { FC, useCallback, useEffect, useState } from "react";
import { Game, GameContext, Guess } from "./game.context";
import { Base64 } from "../../utils/Base64";
import { GameState } from "../../utils/game-utils";

type props = {
  initialState: Game;
};

const GameProvider: FC<props> = ({ initialState, children }) => {
  const [game, setGame] = useState<Game>(initialState);

  return (
    <GameContext.Provider
      value={{
        game,
        setGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
