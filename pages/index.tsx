import type { NextPage } from "next";
import Board from "../components/Board";
import CharacterInput from "../components/CharacterInput";
import Header from "../components/header/Header";
import GameProvider from "../state/game/game.provider";
import {
  GetCurrentGameId,
  GetCurrentGameTime,
  GetNextGameTime,
} from "../utils/game-utils";
import { Game } from "../state/game/game.context";
import { Base64 } from "../utils/Base64";
import Modal from "../components/header/Modal";
import { GameState } from "../utils/game-state";
import { GetCurrentWord } from "../utils/word-utils";
import { CharacterState } from "../utils/character-state";
import client from "../apollo-client";
import { gql } from "@apollo/client";

type props = {
  currentGameTime: number;
  nextGameTime: number;
  game: Game;
};

const Home: NextPage<props> = ({ game, currentGameTime, nextGameTime }) => {
  return (
    <GameProvider initialState={game}>
      <Modal />
      <div className="m-auto max-w-xs sm:max-w-[360px] md:max-w-[480px] ">
        <Header />
        <Board />
        <div className="divider" />
        <article className="my-4">
          <p>
            🥦 ‌{" "}
            <a
              href="https://www.vajehyab.com/dehkhoda/%DA%A9%D9%84%D9%85%DA%86%DB%8C"
              target="_blank"
              rel="noreferrer"
            >
              کلمچی{" "}
            </a>
            یک{" "}
            <a
              href="https://www.powerlanguage.co.uk/wordle/"
              target="_blank"
              rel="noreferrer"
            >
              Wordle
            </a>{" "}
            فارسی دیگه!
            <br />
            🎮‌ ‌ به قند پارسی تایپ کن تهش Enter بزن.
            <br />
            ⏰‌ ‌ هر ۸ ساعت یک کلمه جدید فعال میشه!
          </p>
        </article>
        <div className="divider" />
        <section className="my-4">
          <h4 className="mb-4 font-bold">🎲 ‌ قوانین بازی:</h4>
          <ul className="list-disc pr-10">
            <li className="pb-2">
              <CharacterInput
                sample
                state={CharacterState.MISPLACED}
                char="ش"
                disabled
              />{" "}
              یعنی تو کلمه «ش» هست ولی جاش اشتباهه!
            </li>
            <li className="pb-2">
              <CharacterInput
                sample
                state={CharacterState.CORRECT}
                char="ل"
                disabled
              />{" "}
              یعنی دقیقا همینجای کلمه «ل» داره!
            </li>
            <li>
              <CharacterInput sample char="ه" disabled /> یعنی «ه» نداره!
            </li>
          </ul>
        </section>
        <div className="divider" />
        <footer className="mt-2 mr-2 mb-12">
          <div className="flex gap-1">
            <a href="https://masood.dev" target="_blank" rel="noreferrer">
              مسعود
            </a>
            ،
            <a
              href="https://github.com/ther0y/kalamchi.site"
              target="_blank"
              rel="noreferrer"
            >
              گیتهاب
            </a>
          </div>
        </footer>
      </div>
    </GameProvider>
  );
};

async function getGameById(id: string) {
  const { data } = await client.query({
    query: gql`
      query Games($id: String!) {
        gameById(id: $id) {
          id
          date
          round
          word
          guess_count
        }
      }
    `,
    variables: {
      id,
    },
    fetchPolicy: "no-cache",
  });

  return data.gameById;
}

export async function getServerSideProps(): Promise<{
  props: props;
}> {
  const { data } = await client.query({
    query: gql`
      query Games {
        games(where: { date: { _eq: "${GetCurrentGameId()}" } }) {
          id
        }
      }
    `,
    fetchPolicy: "no-cache",
  });

  const [{ id }] =
    Array.isArray(data?.games) && data.games.length
      ? data.games
      : [{ id: "9dd281d2-8012-4c84-968f-782750b30dec" }];

  const game = await getGameById(id);

  const word = Base64.decode(Base64.decode(game.word));

  return {
    props: {
      currentGameTime: GetCurrentGameTime(),
      nextGameTime: GetNextGameTime(),
      game: {
        id: game.id,
        state: GameState.IN_PROGRESS,
        word: Base64.encode(
          Base64.encode(
            JSON.stringify({
              round: game.round,
              value: word,
              guessCount: game.guess_count,
            })
          )
        ),
        guesses: Array(game.guess_count)
          .fill(null)
          .map(() => ({
            state: CharacterState.NONE,
            value: "",
            parts: [],
          })),
        guessIndex: 0,
      },
    },
  };
}

export default Home;
