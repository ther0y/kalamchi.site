import { Base64 } from "./Base64";
import { getWordByGameId } from "./words";
import { GetCurrentGameId } from "./game-utils";

const word = getWordByGameId(GetCurrentGameId());

export const CurrentWord = Base64.encode(Base64.encode(JSON.stringify(word)));
