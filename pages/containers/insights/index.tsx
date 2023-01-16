import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getInitialData } from "../../../common/browserapi/insights";

// async function getInitialData(query: any) {
//   let data = await fetch("/api/insightsList", query);
//   return data.json();
// }

interface IinitialData {
  _id: string;
  pic: string;
  type: string;
  typeN: string;
  title: string;
  tags: Array<{ tag: string; filter: string }>;
}

const InsightsPage: React.FC = () => {
  const [selectClass, setSelectClass] = useState("");
  const [initialData, setInitalData] = useState([] as any);
  const router = useRouter();
  const { lang } = router.query;
  useEffect(
    function () {
      getInitialData({ lang: lang }).then((res) => {
        if (res && res?.data) {
          setInitalData(res?.data);
        }
      });
    },
    [lang]
  );

  return (
    <>
      <div>
        <div className="insights-archive-banner">
          <h1 className="insights-archive-banner-title">专家洞见</h1>
          <p className="insights-archive-banner-subtitle">
            GLG的专家团拥有约 100 万名成员，涵盖所有主要行业与地区的意见领袖。
            <br />
            在此可浏览部分专家的观点。
          </p>
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
              按洞见类型 全部
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
                全部
              </a>
              <a href="/articles/" className="insight-type-select-option">
                文章
              </a>
              <a href="/case-studies/" className="insight-type-select-option">
                案例研究
              </a>
              <a href="/videos/" className="insight-type-select-option">
                视频
              </a>
              <a href="/whitepapers/" className="insight-type-select-option">
                白皮书
              </a>
              <a href="/podcasts/" className="insight-type-select-option">
                播客
              </a>
            </div>
          </div>
        </div>
        <form role="search" method="get" className="filter-search">
          <button
            type="submit"
            title="Search Insights"
            className="filter-search-button"
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
            type="search"
            placeholder="搜索"
            name="s"
            title="Search for:"
            value=""
            className="filter-search-input"
          />
          <a title="Clear Search Term" href="#" className="filter-search-clear">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 352 512"
              className="icon"
            >
              <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
            </svg>
          </a>
          <div className="filter-search-results">
            <span className="filter-search-no-results">No Search Results</span>
          </div>
        </form>
      </div>
      <div className="post-archive-content">
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
                              href={`/${data.type}/${tag.filter}`}
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
      </div>
    </>
  );
};

export default InsightsPage;
