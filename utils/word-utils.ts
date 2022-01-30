import { Base64 } from "./Base64";
import { getWordByGameId } from "./words";
import { GetCurrentGameId } from "./game-utils";

export const GetCurrentWord = () => {
  const word = getWordByGameId(GetCurrentGameId());
  return Base64.encode(Base64.encode(JSON.stringify(word)));
};
