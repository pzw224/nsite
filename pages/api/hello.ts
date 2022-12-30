// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var url = "mongodb://127.0.0.1:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db?.db("runoob");
    let arrs = [
      {
        id: 1,
        pic: "https://assets.glginsights.com/wp-content/uploads/2022/12/D1_SustainabilityStrategyImplementation_Image-420x420.jpg.webp",
        type: "articles",
        lang:'cn',
        typeN: "文章",
        title: "Sustainability Strategy Implementation",
        tags: [
          { tag: "Environmental Social Governance (ESG)", filter: "esg" },
          { tag: "Corporate Responsibility", filter: "responsibility" },
        ],
      },
      {
        id: 2,
        pic: "https://assets.glginsights.com/wp-content/uploads/2022/12/D1_OceanSustainability_Image-420x420.jpg.webp",
        type: "articles",
        lang:'cn',
        typeN: "文章",
        title: "Survey | CFO Perspectives on the Global Economy",
        tags: [
          { tag: "CFO", filter: "cfo" },
          { tag: "Global Economy", filter: "economy" },
          { tag: "Network Surveys", filter: "surveys" },
        ],
      },
      {
        id: 3,
        pic: "https://assets.glginsights.com/wp-content/uploads/2022/10/D1_ResponsibleCorporateBrandsESG_Image-420x420.jpg.webp",
        type: "articles",
        lang:'cn',
        typeN: "文章",
        title: "Survey | Hotel Operators: COVID Impact and Recovery",
        tags: [
          { tag: "Coronavirus", filter: "coronavirus" },
          { tag: "Hotels and Hospitality Industry", filter: "industry" },
          { tag: "Network Surveys", filter: "surveys" },
        ],
      },
      {
        id: 4,
        pic: "https://assets.glginsights.com/wp-content/uploads/2022/12/D1_ANZTeachers_Image-420x420.jpg.webp",
        type: "case-studies",
        lang:'cn',
        typeN: "案例研究",
        title:
          "Understanding Usage of Alternate Certification Providers for Teaching Qualifications in the U.S.",
        tags: [],
      },
    ];
    // var myobj = { name: "菜鸟教程", url: "www.runoob" };
    dbo?.collection("site").insertMany(arrs, function (err: any, res: any) {
      if (err) throw err;
      console.log("文档插入成功");
      db?.close();
    });
  });
  res.status(200).json({ name: "John Doe" });
}
