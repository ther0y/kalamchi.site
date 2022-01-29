import { fetchWordMeanings } from "../../../services/vajeyab";
import { NextApiRequest, NextApiResponse } from "next";

const wordsCache: any = {};

export default async function handler(
  { query }: NextApiRequest,
  res: NextApiResponse<any>
) {
  const word = query.word as string;
  try {
    if (!wordsCache[word]) {
      const { response, status } = (await fetchWordMeanings(word)) as {
        response: unknown;
        status: number;
      };

      wordsCache[word] = {
        status,
        body: response,
      };
    }

    res.status(200).send(wordsCache[word]);
  } catch ({ message, status }) {
    res.status(status as number).json({
      status,
      body: message,
    });
  }
}
