import React from "react";

export type Guess = { value: string; parts: string[] };

export type Game = {
  id: string;
  state: string;
  word: string;
  guesses: Guess[];
  guessIndex: number;
};

export type GameManager = {
  game: Game;
  setGame: (game: Game) => void;
};

export const GameContext = React.createContext<GameManager>({} as GameManager);
