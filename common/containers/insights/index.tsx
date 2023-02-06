import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getInitialData } from "../../../common/browserapi/insights";
import { Button, Pagination } from "antd";
import { getQuery, getQueryString } from "../../until";

interface IinitialData {
  _id: string;
  pic: string;
  type: string;
  typeN: string;
  title: string;
  tags: Array<{ tag: string; filter: string }>;
}

const InsightsPage: React.FC<{ type?: string }> = (props: any) => {
  const [selectClass, setSelectClass] = useState("");
  const [pageIndex, SetPageIndex] = useState(1);
  const [initialData, setInitalData] = useState([] as any);
  const [total, setTotal] = useState(0);
  const [lang, setLang] = useState("cn");
  const [q, setQ] = useState("");

  let typeN = "全部";
  switch (props.type) {
    case "articles":
      typeN = "文章";
      break;
    case "case-studies":
      typeN = "案例研究";
      break;
    // case "videos":
    //   typeN = "视频";
    //   break;
    case "whitepapers":
      typeN = "白皮书";
      break;
    case "podcasts":
      typeN = "播客";
      break;
    default:
      typeN = "全部";
      break;
  }

  function query() {
    let queryObj = getQuery();
    let { lang } = queryObj;
    let tag = "cn";
    if ((lang && lang == "cn") || lang == "en") {
      setLang(lang);
      tag = lang;
    }
    let type = props.type ?? "";
    getInitialData(
      Object.assign(
        { lang: tag, page: 1, size: 10, q: q },
        type ? { type } : {}
      )
    ).then((res) => {
      if (res && res?.data) {
        setInitalData(res?.data);
        setTotal(res?.total);
      }
    });
  }

  useEffect(
    function () {
      let queryObj = getQuery();
      let { lang, q = "" } = queryObj;
      let tag = "cn";
      if ((lang && lang == "cn") || lang == "en") {
        setLang(lang);
        tag = lang;
      }
      let type = props.type ?? "";
      getInitialData(
        Object.assign(
          { lang: tag, page: pageIndex, size: 10, q: q },
          type ? { type } : {}
        )
      ).then((res) => {
        if (res && res?.data) {
          setInitalData(res?.data);
          setTotal(res?.total);
        }
      });
    },
    [pageIndex]
  );

  return (
    <>
      <div>
        <div className="insights-archive-banner">
          <h1 className="insights-archive-banner-title">
            {lang == "cn" ? "专家洞见" : "All Insights"}
          </h1>
          {/* <p className="insights-archive-banner-subtitle">
            的专家团拥有约 100 万名成员，涵盖所有主要行业与地区的意见领袖。
            <br />
            在此可浏览部分专家的观点。
          </p> */}
        </div>
      </div>
      <div className="block-accent"></div>
      <div className="post-archive-filter">
        <div className="d-flex w-100">
          <div
            className={`insight-type-select ${selectClass}`}
            onClick={() => {
              if (selectClass) {
                setSelectClass("");
              } else {
                setSelectClass("opened");
              }
            }}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                return;
              }}
              className="insight-type-select-display"
            >
              {lang == "cn"
                ? `按洞见类型 ${typeN}`
                : `Insight Type： ${props.type ? props.type : "All"}`}
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="angle-down"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className="icon svg-inline--fa fa-angle-down fa-w-10"
              >
                <path
                  fill="currentColor"
                  d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
                  className=""
                ></path>
              </svg>
            </a>
            <div className="insight-type-select-options">
              <a href="/insights/" className="insight-type-select-option">
                {lang == "cn" ? "全部洞见" : "All"}
              </a>
              <a href="/articles/" className="insight-type-select-option">
                {lang == "cn" ? "文章" : "Ariticles"}
              </a>
              <a href="/case-studies/" className="insight-type-select-option">
                {lang == "cn" ? "案例研究" : "Case Studies"}
              </a>
              {/* <a href="/videos/" className="insight-type-select-option">
                视频
              </a> */}
              <a href="/whitepapers/" className="insight-type-select-option">
                {lang == "cn" ? "白皮书" : "White Paper"}
              </a>
              {/* <a href="/podcasts/" className="insight-type-select-option">
                播客
              </a> */}
            </div>
          </div>
        </div>
        <button
          type="submit"
          title="Search Insights"
          className="filter-search-button"
          onClick={() => {
            let queryObj = getQuery();
            window.location.href =
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname +
              getQueryString(Object.assign(queryObj, { q: q }));
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="icon"
          >
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
          </svg>
        </button>
        <input
          type="text"
          placeholder={lang == "cn" ? "搜索" : "Search"}
          name="q"
          title="Search for:"
          value={q}
          className="filter-search-input"
          onKeyDown={(e) => {
            let theEvent: any = window.event || e;
            let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
              let queryObj = getQuery();
              window.location.href =
                window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname +
                getQueryString(Object.assign(queryObj, { q: q }));
            }
          }}
          onChange={(v) => setQ(v.target.value)}
        />
        <Button
          onClick={() => {
            let queryObj = getQuery();
            let { q, ...other } = queryObj;
            window.location.href =
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname +
              getQueryString(other);
          }}
          style={{ marginTop: 10 }}
          ghost
        >
          {lang == "cn" ? "重置" : "Reset"}
        </Button>
      </div>
      <div className="post-archive-content">
        {
          <div className="search-status">
            <p>{total} Results Found</p>
          </div>
        }
        <div className="post-archive-list">
          {initialData?.map((data: IinitialData, index: string) => {
            return (
              <div
                key={data?.title + index}
                className="post-archive-list-item-wrapper"
              >
                <div className="post-archive-list-item">
                  <a
                    href={`/${data?.type}/${data?._id}`}
                    className="post-archive-list-item-image"
                  >
                    <picture>
                      <img src={data?.pic} />
                    </picture>
                  </a>
                  <div className="post-archive-list-item-content">
                    <a
                      href={`/${data?.type}/`}
                      className="insights-list-item-type"
                    >
                      {data?.typeN}
                    </a>
                    <h2 className="post-archive-list-item-title">
                      <a href={`/${data?.type}/${data?._id}`}>
                        <span>{data?.title}</span>
                      </a>
                    </h2>
                    <div className="insights-list-item-tags">
                      {data?.tags?.map((tag, index) => {
                        return (
                          <span key={tag.tag + index}>
                            <a
                              href="#"
                              // href={`/${data.type}/${tag.filter}`}
                              className="insights-list-item-tag"
                            >
                              {tag.tag}
                            </a>
                            {index != data?.tags?.length - 1 ? (
                              <span>,&nbsp;</span>
                            ) : null}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pagination">
          <Pagination
            defaultCurrent={1}
            current={pageIndex}
            pageSize={10}
            total={total}
            onChange={(page, pageSize) => {
              SetPageIndex(page);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default InsightsPage;
