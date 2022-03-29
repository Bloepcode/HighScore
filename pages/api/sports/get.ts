// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Database from "../../../src/database";
import Response from "../../../src/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res
    .status(200)
    .json(Response.returnSuccessWithData(await Database.getSports()));
}
