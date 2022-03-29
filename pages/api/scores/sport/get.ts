import type { NextApiRequest, NextApiResponse } from "next";
import Database from "../../../../src/database";
import errorCodes from "../../../../src/errors";
import SportDoesNotExist from "../../../../src/errors/SportDoesNotExist";
import Response from "../../../../src/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { sportName },
    method,
  } = req;

  if (sportName == undefined || sportName instanceof Array) {
    res.json(Response.returnError(errorCodes.incorrectParams));
    return;
  }

  try {
    res.json(
      Response.returnSuccessWithData(
        await Database.getSportHighScores(sportName)
      )
    );
  } catch (e) {
    if (e instanceof SportDoesNotExist) {
      res.json(Response.returnError(errorCodes.sportDoesNotExist));
      return;
    }
    throw e;
    return;
  }
}
