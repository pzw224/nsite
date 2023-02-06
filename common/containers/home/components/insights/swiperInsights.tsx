import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getInitialData } from "../../../../browserapi/insights";
const SwiperInsights = ({
  type,
  insights,
  title,
}: {
  type: string;
  insights: any;
  title: string;
}) => {
  const [slidePage, setSlidePage] = useState(1);
  const router = useRouter();
  const { lang = "cn" } = router.query;
  const [data, setData] = useState([]);

  useEffect(() => {
    getInitialData({
      lang: lang ?? "cn",
      ids: insights?.map((i: any) => i.value)?.join(","),
      page: 1,
      // size: 3,
      type: type,
    }).then((res) => {
      setData(res?.data);
    });
  }, []);

  if (!insights || insights?.length <= 0 || !data) return null;
  return (
    <div className="glg-block glg-block-case-studies-slider scroll-transitions align--left color--pearl logos--show scroll-transitions--enabled scroll-transitions--active">
      <h2>{title}</h2>
      <div className="case-studies-slider">
        <div className="case-studies-slider-images">
          {data?.map((d: any, index: number) => {
            return (
              <img
                key={"img" + d?._id}
                width="1024"
                height="1024"
                src={d?.pic}
                title={d?.title}
                className={`case-studies-slider-image transition-in-left ${
                  slidePage == index + 1 ? "active" : ""
                }`}
              />
            );
          })}
        </div>
        <div className="case-studies-slider-content">
          <div className="case-studies-slider-content-list">
            {data?.map((d: any, index: number) => {
              return (
                <div
                  key={"content" + d?._id}
                  className={`case-studies-slider-content-item ${
                    slidePage == index + 1 ? "active" : ""
                  }`}
                >
                  <h3 className="title">{d?.title}</h3>
                  <p className="category">
                    {lang == "cn" ? d?.typeN : d?.type}
                  </p>
                  <div className="description">
                    <p>{d?.description}</p>
                  </div>
                  <a
                    className="link glg-button-v2 style--default color--default"
                    href={`/${d?.type}/${d?._id}`}
                  >
                    {lang == "cn"
                      ? d?.type == "articles"
                        ? "阅读原文"
                        : "阅读案例"
                      : d?.type == "articles"
                      ? "Read the article"
                      : "View Spotlight"}
                  </a>
                </div>
              );
            })}
          </div>
          {data?.length > 1 ? (
            <div className="case-studies-slider-controls">
              <button
                onClick={() => {
                  if (slidePage == 1) {
                    setSlidePage(data?.length);
                    return;
                  }
                  setSlidePage(slidePage - 1);
                }}
                className="slider-button slider-button--prev"
              ></button>
              <button
                onClick={() => {
                  if (slidePage == data?.length) {
                    setSlidePage(1);
                    return;
                  }
                  setSlidePage(slidePage + 1);
                }}
                className="slider-button slider-button--next"
              ></button>
              <div className="slider-counter">
                <span className="slider-counter-current">{slidePage}</span>
                <span className="slider-counter-divider"></span>
                <span className="slider-counter-total">{data?.length}</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SwiperInsights;
