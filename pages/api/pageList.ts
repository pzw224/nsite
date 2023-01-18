import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import url from "../../common/mongoData";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let pageIndex = Number.isNaN(Number(req?.query?.page))
    ? 1
    : Number(req?.query?.page);
  let pageSize = Number.isNaN(Number(req?.query?.size))
    ? 30
    : Number(req?.query?.size);
  MongoClient.connect(url, async function (err, db) {
    if (err) throw err;
    const lang = req.query.lang ?? "cn";
    let dbo = db?.db("runoob")?.collection("page");
    let totalCount = await dbo?.find({ lang: lang }).count();
    let type = req.query.type ?? "";
    dbo
      ?.find(Object.assign({ lang: lang }, type ? { type } : {}))
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
