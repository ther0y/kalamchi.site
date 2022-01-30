import { Base64 } from "./Base64";
import { getWordByGameId } from "./words";
import { CurrentGameId } from "./game-utils";

const word = getWordByGameId(CurrentGameId);

export const CurrentWord = Base64.encode(Base64.encode(JSON.stringify(word)));
