import type { NextApiRequest, NextApiResponse } from "next";
import Database from "../../../src/database";
import errorCodes from "../../../src/errors";
import UserDoesNotExist from "../../../src/errors/UserDoesNotExist";
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
    await Database.removeUser(name);
  } catch (e) {
    if (e instanceof UserDoesNotExist) {
      res.json(Response.returnError(errorCodes.userDoesNotExist));
      return;
    }
    throw e;
    return;
  }
  res.json(Response.returnSuccess());
}
