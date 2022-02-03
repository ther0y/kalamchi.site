import React, { FC, useContext, useEffect, useState } from "react";
import { GameContext } from "../state/game/game.context";
import JSConfetti from "js-confetti";
import { Notyf } from "notyf";
import CharacterInput from "./CharacterInput";
import { Base64 } from "../utils/Base64";
import { GameWord } from "../utils/words";
import Spinner from "./Spinner";
import { GameState } from "../utils/game-state";
import { CharacterState } from "../utils/character-state";

let jsConfetti: JSConfetti;
let notyf: any;

if (typeof window !== "undefined") {
  jsConfetti = new JSConfetti();
  // @ts-ignore
  notyf = new Notyf({
    duration: 800,
    ripple: false,
    position: {
      x: "center",
      y: "center",
    },
    types: [
      {
        type: "success",
        icon: false,
        background: "#fff",
        className: "success-notyf",
      },
    ],
    dismissible: false,
  });
}

type props = {};

const Board: FC<props> = ({}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { game, setGame: _setGame } = useContext(GameContext);
  const [showIndicators, setShowIndicators] = useState(false);

  const gameStateRef = React.useRef(game);
  const setGame = (data: any) => {
    gameStateRef.current = data;
    _setGame(data);
  };

  useEffect(() => {
    setShowIndicators(true);
  }, [game]);

  let word: GameWord = JSON.parse(Base64.decode(Base64.decode(game.word)));

  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasGuessedWrong, setHasGuessedWrong] = useState(false);
  const [wordChars, setWordChars] = useState(
    word.value.split("").map((char, id) => ({
      id,
      char,
    }))
  );

  function setCharacterStates(currentGuess: {
    parts: { char: string; state: string }[];
    value: string;
  }) {
    for (let c of wordChars) {
      const guessedCharIndex = currentGuess.parts.findIndex(
        (p) => p.char === c.char && p.state === CharacterState.NONE
      );

      if (guessedCharIndex >= 0) {
        if (c.id === guessedCharIndex) {
          currentGuess.parts[guessedCharIndex].state = CharacterState.CORRECT;
        } else {
          currentGuess.parts[guessedCharIndex].state = CharacterState.MISPLACED;
        }
      }
    }
  }

  const handleKeydown = async (e: any) => {
    const game = gameStateRef.current;
    const word = JSON.parse(Base64.decode(Base64.decode(game.word)));

    const cg = game.guesses[game.guessIndex];
    const currentGuess = {
      value: cg.value,
      parts: [...cg.parts],
    };

    if (game.state !== GameState.FINISHED) {
      const key = e.key;

      const isGuessFilled = currentGuess.value.length === word.value.length;

      if (!isProcessing && key === "Enter") {
        setIsProcessing(true);

        try {
          if (isGuessFilled) {
            if (word.value === currentGuess.value) {
              inputRef?.current?.blur();
              jsConfetti.addConfetti().then();
              setCharacterStates(currentGuess);
              setGame({
                ...game,
                state: GameState.FINISHED,
              });
              return setIsProcessing(false);
            } else {
              const hasMoreGuess = game.guessIndex < word.guessCount - 1;
              setIsLoading(true);
              const response = await fetch(`/api/word/${currentGuess.value}`);
              const json = await response.json();
              setIsLoading(false);

              if (json?.body?.count) {
                if (hasMoreGuess) {
                  await shake();
                  setIsProcessing(false);

                  setCharacterStates(currentGuess);

                  return setGame({
                    ...game,
                    guessIndex: game.guessIndex + 1,
                  });
                } else {
                  setGame({
                    ...game,
                    state: GameState.FINISHED,
                  });

                  setCharacterStates(currentGuess);
                  return setIsProcessing(false);
                }
              } else {
                notyf.success("همچین کلمه‌ای نداریم!");
                await shake();
                setIsProcessing(false);
              }
            }
          } else {
            await shake();
            setIsProcessing(false);
          }
        } catch (e) {
          console.error(e);
          setIsProcessing(false);
        }
      }

      if (!isGuessFilled && key.length === 1) {
        currentGuess.value = currentGuess.value + key;
        currentGuess.parts = currentGuess.value.split("").map((c, index) => ({
          state: CharacterState.NONE,
          char: c,
        }));
      }

      if (key === "Backspace") {
        currentGuess.value = currentGuess.value.slice(0, -1);
        currentGuess.parts = currentGuess.parts.slice(0, -1);
      }

      setGame({
        ...game,
        guesses: game.guesses.map((g, i) => {
          if (i === game.guessIndex) return currentGuess;
          return g;
        }),
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeydown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  useEffect(() => {
    setWordChars(
      word.value.split("").map((char, id) => ({
        id,
        char,
      }))
    );
  }, [game]);

  const shake = () => {
    return new Promise((resolve) => {
      setHasGuessedWrong(true);

      setTimeout(() => {
        setHasGuessedWrong(false);
        resolve(null);
      }, 250);
    });
  };

  const openVirtualKeyboard = () => {
    game.state !== GameState.FINISHED && inputRef?.current?.focus();
  };

  return (
    <>
      <input
        type="text"
        className="fixed"
        style={{ opacity: 0 }}
        ref={inputRef}
      />
      <div className="my-8">
        {game.guesses.map((ag, index) => {
          return (
            <div className="flex items-center justify-center gap-4" key={index}>
              <div
                className={
                  "text-[1.25rem] md:text-[1.625rem] " +
                  (showIndicators &&
                  index === game.guessIndex &&
                  game.state !== GameState.FINISHED
                    ? "visible"
                    : "invisible")
                }
              >
                🥦
              </div>
              <div
                className={
                  "flex gap-2 my-1" +
                  (hasGuessedWrong && game.guessIndex === index
                    ? " animate-shake"
                    : "")
                }
                onClick={openVirtualKeyboard}
              >
                {wordChars.map((w, charIndex) => {
                  return (
                    <span key={charIndex}>
                      <CharacterInput
                        char={showIndicators ? ag.parts[w.id]?.char : "‌ "}
                        state={
                          showIndicators
                            ? ag.parts[w.id]?.state
                            : CharacterState.NONE
                        }
                        word={word.value}
                        disabled={
                          !showIndicators ||
                          index < game.guessIndex ||
                          game.state === GameState.FINISHED
                        }
                      />
                    </span>
                  );
                })}
              </div>
              <Spinner show={isLoading && index === game.guessIndex} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default React.memo(Board);
