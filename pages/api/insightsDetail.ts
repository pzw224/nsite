import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { url } from "../common/mongoData";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let id = req.query["_id"];
  
}
