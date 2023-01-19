import { useRouter } from "next/router";
import react, { useEffect, useState } from "react";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";

function objToQuery(obj: any) {
  if (!obj) return "";
  let q = "";
  for (let i in obj) {
    q += i + "=" + obj[i] + "&";
  }
  return q.substring(0, q?.length - 1);
}
const Pagenation = (props: any): any => {
  let { data, total } = props;
  const router = useRouter();
  const { page, size } = router.query;
  useEffect(() => {
    console.log("xxx:", page);
  }, [page]);
  if (!data || !total) return null;
  let pageI = Number.isNaN(Number(page)) ? 1 : Number(page);
  let pageSize = Number.isNaN(Number(size)) ? 10 : Number(size);
  const totalPage = Math.ceil(total / pageSize);
  let pageArr = [];
  for (let i = 1; i <= totalPage; i++) {
    pageArr.push(i);
  }

  if (totalPage <= 5) {
    return (
      <div className="pagination">
        {pageI > 1 ? (
          <a
            className="page-numbers"
            href={
              router.pathname +
              "?" +
              objToQuery(Object.assign(router.query, { page: pageI - 1 }))
            }
          >
            <CaretLeftOutlined />
          </a>
        ) : null}
        {pageArr?.map((p, index) => {
          console.log(pageI, p);
          return (
            <a
              key={`pagination${p}`}
              aria-current={pageI == index + 1 ? true : false}
              className="page-numbers"
              href={
                router.pathname +
                "?" +
                objToQuery(Object.assign(router.query, { page: p }))
              }
            >
              {p}
            </a>
          );
        })}
        {pageI < totalPage ? (
          <a
            className="page-numbers"
            href={
              router.pathname +
              "?" +
              objToQuery(Object.assign(router.query, { page: pageI + 1 }))
            }
          >
            <CaretRightOutlined />
          </a>
        ) : null}
      </div>
    );
  }
  return null;
};

export { Pagenation };
