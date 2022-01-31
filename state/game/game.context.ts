import React from "react";
import { CharacterState } from "../../utils/character-state";
import { string } from "prop-types";

export type Guess = { value: string; parts: { char: string; state: string }[] };

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
  won: boolean;
  setWon: (hasWon: boolean) => void;
  journeySummery: { wins: number; games: number; winPercentage: number };
  gameOverview: string;
};

export const GameContext = React.createContext<GameManager>({} as GameManager);
