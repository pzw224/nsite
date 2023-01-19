import React, { useState, useEffect } from "react";
import { insightsDetail } from "../../../common/browserapi/insights";
import { useRouter } from "next/router";

const Article: React.FC<any> = (props: any) => {
  const router = useRouter();
  const { id } = router.query;
  const [articleInfo, setArticleInfo] = useState({} as any);
  useEffect(() => {
    if (id) {
      insightsDetail(id as string).then((res) => {
        if (res && res?.data) {
          setArticleInfo(res?.data);
        }
      });
    }
  }, [id]);
  return (
    <div className="page-container">
      <main className="site-main">
        <div className="insight-article">
          <div className="insight-photo">
            {articleInfo?.pic ? (
              <picture>
                <img
                  src={articleInfo?.pic}
                  loading="lazy"
                  sizes="(max-width: 1300px) 100vw, 1500px"
                  alt="Sustainability Strategy Implementation"
                />
              </picture>
            ) : null}
          </div>
          <div className="block-accent"></div>
          <div className="insight-content">
            <div className="insight-content-top">
              <div className="insight-breadcrumb">
                <a href="/insights/" className="insight-breadcrumb-link">
                  Insights
                </a>
                <span className="insight-breadcrumb-separator">/</span>
                <a
                  href={`/${props?.type}/`}
                  className="insight-breadcrumb-link"
                >
                  {`${props?.type}`}
                </a>
              </div>
              <div className="insight-share"></div>
            </div>
            <div className="insight-content-header">
              <a
                href={`/insights/categories/${articleInfo?.tags?.[0]?.filter}/`}
                className="insight-content-category"
              >
                {articleInfo?.tags?.[0]?.tag}
              </a>
              <h1 className="insight-content-title">{articleInfo?.title}</h1>
              <p className="insight-content-author">{articleInfo?.author}</p>
            </div>
            <div
              className="insight-content-body long-form-text"
              dangerouslySetInnerHTML={{ __html: articleInfo?.htmlContent }}
            ></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Article;
