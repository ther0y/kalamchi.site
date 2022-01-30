import React, { FC, useCallback, useEffect, useState } from "react";
import { Game, GameContext } from "./game.context";
import { LsBox } from "../../utils/encryoted-localstorage";
import { LsNames } from "../../utils/ls-names";
import { GetCurrentGameId } from "../../utils/game-utils";
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
  const [won, _setWon] = useState(journeyState[GetCurrentGameId()] || false);

  const [gameOverview, setGameOverview] = useState("");

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
          [GetCurrentGameId()]: hasWon,
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

    const guessedCount = game.guesses.filter((g) => g.value).length;
    const tries = `${!won ? "X" : guessedCount}/${word.guessCount}`;
    const overview = game.guesses
      .filter((g) => g.value)
      .map((g) => {
        return Array(g.value.length)
          .fill(null)
          .map((_, index) => {
            if (g.parts[index] === word.value[index]) return "🟩";
            if (word.value.includes(g.parts[index])) return "🟨";
            return "⬛";
          })
          .join("");
      })
      .join("\n");

    setGameOverview(
      `#kalamchi ${word.round} ${tries}\n${overview}\nkalamchi.site`
    );
  }, [game, savedStateBox, setWon]);

  useEffect(() => {
    const journeyState = JSON.parse(journeyStateBox.get() || "{}");

    let games = Object.keys(journeyState).length;
    let wins = Object.values(journeyState).filter((s) => s).length;
    let winPercentage = wins ? Math.ceil(wins / games) * 100 : 0;

    setJourneySummery({ wins, games, winPercentage });
  }, [won, game]);

  return (
    <GameContext.Provider
      value={{
        game,
        setGame,
        won,
        setWon,
        journeySummery,
        gameOverview,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
