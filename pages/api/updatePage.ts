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
      let data = req.body?.data;
      var dbo = db?.db("runoob");
      var whereStr = { _id: new ObjectID(data._id) }; // 查询条件
      let updateInfo = Object.assign({}, data);
      delete updateInfo._id;
      dbo
        ?.collection("page")
        .updateOne(
          whereStr,
          { $set: updateInfo },
          function (err: any, obj: any) {
            if (err) throw err;
            db?.close();
            res.status(200).json({ data: "done" });
          }
        );
    });
  } else {
    res.status(200).json({ data: "error method" });
  }
}
