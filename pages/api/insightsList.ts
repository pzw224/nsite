import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { url } from "../common/mongoData";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let pageIndex = (req?.query?.page as unknown as number) ?? 1;
  let pageSize = (req?.query.size as unknown as number) ?? 10;
  MongoClient.connect(url, async function (err, db) {
    if (err) throw err;
    const lang = req.query.lang ?? "cn";
    let dbo = db?.db("runoob")?.collection("site");
    let totalCount = await dbo?.find({ lang: lang }).count();
    dbo
      ?.find({ lang: lang })
      .limit(pageSize)
      .skip((pageIndex - 1) * pageSize)
      .sort({ _id: -1 })
      .toArray(function (err, result) {
        // 返回集合中所有数据
        if (err) throw err;
        res.status(200).send({ data: result, total: totalCount });
        db?.close();
      });
  });
}
