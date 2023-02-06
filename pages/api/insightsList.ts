import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectID } from "mongodb";
import url from "../../common/mongoData";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let ids = (req?.query?.ids as string) ?? "";
  let pageIndex = Number.isNaN(Number(req?.query?.page))
    ? 1
    : Number(req?.query?.page);
  let pageSize = Number.isNaN(Number(req?.query?.size))
    ? 10
    : Number(req?.query?.size);
  MongoClient.connect(url, async function (err, db) {
    if (err) throw err;
    const lang = req.query.lang ?? "cn";
    let dbo = db?.db("runoob")?.collection("site");
    let type = req.query.type ?? "";
    let q: any = req.query.q ?? "";
    let totalCount = await dbo
      ?.find(
        Object.assign(
          { lang: lang },
          type ? { type } : {},
          ids
            ? { _id: { $in: ids?.split(",")?.map((i) => new ObjectID(i)) } }
            : {},
          q ? { title: { $regex: new RegExp(q, "i") } } : {}
        )
      )
      .count();
    dbo
      ?.find(
        Object.assign(
          { lang: lang },
          type ? { type } : {},
          ids
            ? { _id: { $in: ids?.split(",")?.map((i) => new ObjectID(i)) } }
            : {},
          q ? { title: { $regex: new RegExp(q, "i") } } : {}
        )
      )
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
