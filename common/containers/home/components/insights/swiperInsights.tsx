import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
const SwiperInsights = ({ data, title }: { data: any; title: string }) => {
  const [slidePage, setSlidePage] = useState(0);
  const router = useRouter();
  const { lang = "cn" } = router.query;
  if (!data || data?.length <= 0) return null;
  return (
    <div className="glg-block glg-block-case-studies-slider scroll-transitions align--left color--pearl logos--show scroll-transitions--enabled scroll-transitions--active">
      <h2>{title}</h2>
      <div className="case-studies-slider">
        <div className="case-studies-slider-images">
          {data?.map((d: any, index: number) => {
            return (
              <img
                key={d?._id}
                width="1024"
                height="1024"
                src={d?.pic}
                className={`case-studies-slider-image transition-in-left ${
                  slidePage == index ? "active" : ""
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
                key={index}
                  className={`case-studies-slider-content-item ${
                    slidePage == index ? "active" : ""
                  }`}
                >
                  <h3 className="title">{d?.title}</h3>
                  <p className="category">{d?.typeN}</p>
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
                  if (slidePage == 0) {
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
                    setSlidePage(0);
                    return;
                  }
                  setSlidePage(slidePage + 1);
                }}
                className="slider-button slider-button--next"
              ></button>
              <div className="slider-counter">
                <span className="slider-counter-current">{slidePage + 1}</span>
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
