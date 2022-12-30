import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { url } from "../common/mongoData";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db?.db("runoob");
    dbo
      ?.collection("site")
      .find({ lang: "cn" })
      .toArray(function (err, result) {
        // 返回集合中所有数据
        if (err) throw err;
        res.send(result);
        console.log(result);
        db?.close();
      });
  });
}
