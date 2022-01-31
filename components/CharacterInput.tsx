import { FC, useEffect, useState } from "react";
import styles from "./CharacterInput.module.css";
import { CharacterState } from "../utils/character-state";

type props = {
  sample?: boolean;
  char?: string;
  state?: string;
  disabled?: boolean;
  index?: number;
  guess?: string;
  shouldBe?: string;
  status?: "correct" | "contains";
  word?: string;
};

const CharacterInput: FC<props> = ({
  sample,
  char,
  state,
  disabled,
  status,
  word = "",
  guess = "",
  shouldBe,
  index,
}) => {
  const [correct, setCorrect] = useState(false);
  const [contains, setContains] = useState(false);
  let classes = styles.block;

  useEffect(() => {
    const remaining = word
      .split("")
      .map((w, index) => {
        if (w === guess[index]) return "/";
        return w;
      })
      .join("");

    let correct =
      (sample && state === CharacterState.CORRECT) ||
      (disabled && char && state === CharacterState.CORRECT);

    let contains =
      (sample && state === CharacterState.MISPLACED) ||
      (disabled && char && state === CharacterState.MISPLACED);

    setCorrect(!!correct);
    setContains(!!contains);
  }, [char, disabled, sample, status, word]);

  if (sample) classes += ` ${styles.sample}`;
  if (correct) classes += ` ${styles.correct}`;
  if (contains) classes += ` ${styles.contains}`;
  if (!sample && !!char) classes += ` ${styles.bang}`;
  if (disabled) classes += ` ${styles.disabled}`;

  return <div className={classes + " duration-800"}>{char || "‌ "}</div>;
};

export default CharacterInput;
