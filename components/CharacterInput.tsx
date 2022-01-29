import { FC, useEffect, useState } from "react";
import { inspect } from "util";
import styles from "./CharacterInput.module.css";

type props = {
  sample?: boolean;
  char?: string;
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
    const remainings = word
      .split("")
      .map((w, index) => {
        if (w === guess[index]) return "/";
        return w;
      })
      .join("");

    let correct =
      (sample && status === "correct") ||
      (disabled && char && word?.includes(char) && shouldBe === char);

    let contains =
      (sample && status === "contains") ||
      (disabled &&
        char &&
        shouldBe !== char &&
        remainings.includes(char) &&
        guess.indexOf(char) === index);

    setCorrect(!!correct);
    setContains(!!contains);
  }, [char, disabled, sample, status, word]);

  if (sample) classes += ` ${styles.sample}`;
  if (disabled) classes += ` ${styles.disabled}`;
  if (correct) classes += ` ${styles.correct}`;
  if (contains) classes += ` ${styles.contains}`;
  if (!sample && !!char) classes += ` ${styles.bang}`;

  return <div className={classes + " duration-800"}>{char || "‌ "}</div>;
};

export default CharacterInput;
