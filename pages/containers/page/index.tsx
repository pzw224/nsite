import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getPageInfo } from "../../../common/browserapi/pageApi";
import {
  BulbOutlined,
  UserOutlined,
  DashboardOutlined,
  EyeOutlined,
  ForkOutlined,
  FlagOutlined,
  FolderOutlined,
  GlobalOutlined,
  FileSearchOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
import { getInitialData } from "../../../common/browserapi/insights";
import { SwiperInsights } from "../home/components/insights/swiperInsights";

const PageInfo: React.FC<any> = (props: any) => {
  const router = useRouter();
  const { id, lang = "cn" } = router.query;
  const [pageData, setPageData] = useState<any>();
  useEffect(() => {
    getPageInfo({ id: id, lang: lang }).then(async (res) => {
      if (res && res.data) {
        let finalData = res?.data;
        let finalModule = res?.data?.finalModule;
        finalData.finalModule = finalModule?.map((f: any) => {
          let newF = f;
          res?.data?.moduleList?.forEach((m: any) => {
            if (m?.value == f?.id) {
              newF.sortby = m.sortby;
            }
          });
          return newF;
        });
        if (finalModule?.findIndex((x: any) => x.type == "articles") >= 0) {
          finalData.articles = await getInitialData({
            lang: lang,
            page: 1,
            size: 3,
            type: "articles",
          });
        }
        if (finalModule?.findIndex((x: any) => x.type == "case-studies") >= 0) {
          finalData.caseStudies = await getInitialData({
            lang: lang,
            page: 1,
            size: 3,
            type: "case-studies",
          });
        }
        finalData?.finalModule?.sort((a: any, b: any) => a.sortby - b.sortby);
        console.log(JSON.stringify(finalData?.articles))
        setPageData(finalData);
      }
    });
  }, [id]);
  return (
    <main className="site-main">
      <div className="page-content">
        <div className="glg-block glg-block-banner-hero-v2 scroll-transitions scroll-transitions--enabled scroll-transitions--active">
          <img
            title="banner"
            width={1500}
            height={807}
            className="banner-hero-v2-image"
            src={pageData?.background}
          />
          <div className="banner-hero-v2-content">
            <h1 className="banner-hero-v2-title">{pageData?.pageTitle}</h1>
            <p className="banner-hero-v2-subtitle">
              {pageData?.pageDescription}
            </p>
          </div>
        </div>
        {pageData?.finalModule?.map((module: any) => {
          let content = null;
          switch (module.type) {
            case "redModule":
              content = (
                <div
                  key={module?._id}
                  className="glg-block glg-block-icons-numbers scroll-transitions background--pink columns--4 scroll-transitions--enabled scroll-transitions--active"
                >
                  <h2 className="icons-numbers-title">{module?.title}</h2>
                  {module?.moduleInfo?.length > 0 ? (
                    <div className="icons-numbers-items">
                      {module?.moduleInfo?.map((m: any) => {
                        return (
                          <div
                            key={m._id}
                            className="icons-numbers-item icons-numbers-item--icon"
                          >
                            <h3 className="icons-numbers-item-title">
                              {m?.subTitle}
                            </h3>
                            <div className="icons-numbers-item-description">
                              {m?.subDescription}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
              break;
            case "blackModule":
              content = (
                <div
                  key={module?._id}
                  className="glg-block glg-block-icons-numbers scroll-transitions background--navy columns--3 scroll-transitions--enabled scroll-transitions--active"
                >
                  <h2 className="icons-numbers-title">{module?.title}</h2>
                  {module?.moduleInfo?.length > 0 ? (
                    <div className="icons-numbers-items">
                      {module?.moduleInfo?.map((m: any, index: number) => {
                        let icons = null;
                        switch (index) {
                          case 0:
                            icons = <BulbOutlined />;
                            break;
                          case 1:
                            icons = <UserOutlined />;
                            break;
                          case 2:
                            icons = <DashboardOutlined />;
                            break;
                          case 3:
                            icons = <EyeOutlined />;
                            break;
                          case 4:
                            icons = <ForkOutlined />;
                            break;
                          case 5:
                            icons = <FlagOutlined />;
                            break;
                          default:
                            icons = <FolderOutlined />;
                            break;
                        }
                        return (
                          <div
                            key={m._id}
                            className="icons-numbers-item icons-numbers-item--icon"
                          >
                            <div className="icons-numbers-item-icon">
                              {icons}
                            </div>
                            <h3 className="icons-numbers-item-title">
                              {m?.subTitle}
                            </h3>
                            <div className="icons-numbers-item-description">
                              {m?.subDescription}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
              break;
            case "whiteModule":
              content = (
                <div
                  key={module?._id}
                  className="glg-block glg-block-icons-rows scroll-transitions background--white scroll-transitions--enabled scroll-transitions--active"
                >
                  <h2 className="icons-rows-title">{module?.title}</h2>
                  {module?.moduleInfo?.length > 0 ? (
                    <div className="icons-rows">
                      {module?.moduleInfo?.map((m: any, index: number) => {
                        let icons = null;
                        switch (index) {
                          case 0:
                            icons = <GlobalOutlined />;
                            break;
                          case 1:
                            icons = <FileSearchOutlined />;
                            break;
                          case 2:
                            icons = <DashboardOutlined />;
                            break;
                          case 3:
                            icons = <FundProjectionScreenOutlined />;
                            break;
                          case 4:
                            icons = <ForkOutlined />;
                            break;
                          case 5:
                            icons = <FlagOutlined />;
                            break;
                          default:
                            icons = <FolderOutlined />;
                            break;
                        }
                        return (
                          <div key={m._id} className="icons-rows-item">
                            <div className="icons-rows-item-icon">{icons}</div>
                            <h3 className="icons-rows-item-title">
                              {m?.subTitle}
                            </h3>
                            <div className="icons-rows-item-content">
                              <p>{m?.subDescription}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
              break;
            case "articles":
              content = (
                <SwiperInsights
                  key={module?._id}
                  title={module?.title}
                  data={pageData?.articles?.data}
                />
              );
              break;
            case "case-studies":
              content = (
                <SwiperInsights
                  key={module?._id}
                  title={module?.title}
                  data={pageData?.caseStudies?.data}
                />
              );
              break;
          }
          return content;
        })}
      </div>
    </main>
  );
};

export { PageInfo };
