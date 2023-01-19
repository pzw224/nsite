import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectID } from "mongodb";
import url from "../../common/mongoData";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (!req.body?.subTitle) {
    res.status(200).json({ data: "添加失败" });
  }
  if (req.method == "POST") {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db?.db("runoob").collection("subModule");
      dbo?.insertOne(req.body, {}, function (err: any, data: any) {
        if (err) throw err;
        db?.close();
        res.status(200).json(data);
      });
    });
  } else {
    res.status(200).json({ data: "error method" });
  }
}
