import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectID } from "mongodb";
import url from "../../common/mongoData";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  MongoClient.connect(url, async function (err, db) {
    if (err) throw err;
    let dbo = db?.db("runoob")?.collection("page");
    var whereStr = Object.assign(
      req.query["id"]
        ? { _id: new ObjectID(req.query["id"] as string) }
        : { path: "home" }
    ); // 查询条件
    let pageInfo = await dbo?.findOne(whereStr);
    if (pageInfo && pageInfo.moduleList) {
      let finalModule = await db
        ?.db("runoob")
        ?.collection("module")
        .aggregate([
          {
            $match: {
              _id: {
                $in: pageInfo?.moduleList?.map(
                  (m: any) => new ObjectID(m.value)
                ),
              },
            },
          },
          { $addFields: { id: { $toString: "$_id" } } },
          {
            $lookup: {
              from: "subModule", // 右集合
              localField: "id", // 左集合 join 字段
              foreignField: "parentId", // 右集合 join 字段
              as: "moduleInfo", // 新生成字段（类型array）
            },
          },
        ])
        .toArray();
      pageInfo.finalModule = finalModule;
    }

    res.status(200).send({ data: pageInfo });
  });
}
