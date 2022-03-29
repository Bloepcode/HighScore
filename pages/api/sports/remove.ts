import type { NextApiRequest, NextApiResponse } from "next";
import Database from "../../../src/database";
import errorCodes from "../../../src/errors";
import SportDoesNotExist from "../../../src/errors/SportDoesNotExist";
import Response from "../../../src/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { name },
    method,
  } = req;

  if (name == undefined || name instanceof Array) {
    res.json(Response.returnError(errorCodes.incorrectParams));
    return;
  }

  try {
    await Database.removeSport(name);
  } catch (e) {
    if (e instanceof SportDoesNotExist) {
      res.json(Response.returnError(errorCodes.sportDoesNotExist));
      return;
    }
    throw e;
    return;
  }
  res.json(Response.returnSuccess());
}
