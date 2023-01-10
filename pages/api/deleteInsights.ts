import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectID } from "mongodb";
import url from "../../common/mongoData";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method == "POST") {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let id = req.body?.id;
      var dbo = db?.db("runoob");
      var whereStr = { _id: new ObjectID(id) }; // 查询条件
      dbo?.collection("site").deleteOne(whereStr, function (err, obj) {
        if (err) throw err;
        console.log("文档删除成功");
        db?.close();
        res.status(200).json({ data: "done" });
      });
    });
  } else {
    res.status(200).json({ data: "error method" });
  }
}
