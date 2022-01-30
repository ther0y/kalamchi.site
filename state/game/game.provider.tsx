import React, { FC, useCallback, useEffect, useState } from "react";
import { Game, GameContext } from "./game.context";
import { LsBox } from "../../utils/encryoted-localstorage";
import { LsNames } from "../../utils/ls-names";
import { CurrentGameId } from "../../utils/game-utils";
import { Base64 } from "../../utils/Base64";
import { GameWord } from "../../utils/words";
import { GameState } from "../../utils/game-state";

type props = {
  initialState: Game;
};

const GameProvider: FC<props> = ({ initialState, children }) => {
  const savedStateBox = LsBox(LsNames.STATE);
  const savedState = JSON.parse(savedStateBox.get() || "{}");

  const journeyStateBox = LsBox(LsNames.JOURNEY);
  const journeyState = JSON.parse(journeyStateBox.get() || "{}");

  let gameState =
    initialState.id === savedState.id
      ? { ...initialState, ...savedState }
      : initialState;

  //TODO: check game id before merging state
  const [game, setGame] = useState<Game>(gameState);
  const [won, _setWon] = useState(journeyState[CurrentGameId] || false);

  let games = Object.keys(journeyState).length;
  let wins = Object.values(journeyState).filter((s) => s).length;
  let winPercentage = wins ? Math.ceil(wins / games) * 100 : 0;
  const [journeySummery, setJourneySummery] = useState({
    wins,
    games,
    winPercentage,
  });

  const setWon = useCallback(
    (hasWon: boolean) => {
      _setWon(hasWon);
      journeyStateBox.set(
        JSON.stringify({
          ...journeyState,
          [CurrentGameId]: hasWon,
        })
      );
    },
    [journeyState, journeyStateBox]
  );

  useEffect(() => {
    const word: GameWord = JSON.parse(Base64.decode(Base64.decode(game.word)));

    savedStateBox.set(JSON.stringify(game));

    if (game.state === GameState.FINISHED) {
      setWon(game.guesses.some((g) => g.value === word.value));
    }
  }, [game, savedStateBox, setWon]);

  useEffect(() => {
    const journeyState = JSON.parse(journeyStateBox.get() || "{}");

    let games = Object.keys(journeyState).length;
    let wins = Object.values(journeyState).filter((s) => s).length;
    let winPercentage = wins ? Math.ceil(wins / games) * 100 : 0;

    setJourneySummery({ wins, games, winPercentage });
  }, [won]);

  return (
    <GameContext.Provider
      value={{
        game,
        setGame,
        won,
        setWon,
        journeySummery,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
