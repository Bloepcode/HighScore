import type { NextApiRequest, NextApiResponse } from "next";
import Database from "../../../src/database";
import errorCodes from "../../../src/errors";
import SportAlreadyExists from "../../../src/errors/SportAlreadyExists";
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
    await Database.addSport(name);
  } catch (e) {
    if (e instanceof SportAlreadyExists) {
      res.json(Response.returnError(errorCodes.sportAlreadyExists));
      return;
    }
    throw e;
    return;
  }
  res.json(Response.returnSuccess());
}
