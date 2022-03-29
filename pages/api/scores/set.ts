import type { NextApiRequest, NextApiResponse } from "next";
import Database from "../../../src/database";
import errorCodes from "../../../src/errors";
import SportDoesNotExist from "../../../src/errors/SportDoesNotExist";
import UserDoesNotExist from "../../../src/errors/UserDoesNotExist";
import Response from "../../../src/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { sportName, userName, score },
    method,
  } = req;

  if (sportName == undefined || sportName instanceof Array) {
    res.json(Response.returnError(errorCodes.incorrectParams));
    return;
  }

  if (userName == undefined || userName instanceof Array) {
    res.json(Response.returnError(errorCodes.incorrectParams));
    return;
  }

  var scoreNum: number;

  if (score == undefined || score instanceof Array) {
    res.json(Response.returnError(errorCodes.incorrectParams));
    return;
  } else {
    scoreNum = parseInt(score);
    if (isNaN(scoreNum)) {
      res.json(Response.returnError(errorCodes.incorrectParams));
      return;
    }
  }

  try {
    await Database.setSportScoreOfUser(sportName, userName, scoreNum);
  } catch (e) {
    if (e instanceof SportDoesNotExist) {
      res.json(Response.returnError(errorCodes.sportDoesNotExist));
      return;
    }
    if (e instanceof UserDoesNotExist) {
      res.json(Response.returnError(errorCodes.userDoesNotExist));
      return;
    }
    throw e;
    return;
  }
  res.json(Response.returnSuccess());
}
