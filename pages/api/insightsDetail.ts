import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectID } from "mongodb";
import url from "../../common/mongoData";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let id = req.query["id"] as string;
  MongoClient.connect(url, function async(err, db) {
    if (err) throw err;
    let dbo = db?.db("runoob")?.collection("site");
    var whereStr = { _id: new ObjectID(id) }; // 查询条件
    dbo?.findOne(whereStr).then((result) => {
      // 返回集合中所有数据
      if (err) throw err;
      res.status(200).send({ data: result });
      db?.close();
    });
  });
}
