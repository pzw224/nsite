import { useEffect, useState } from "react";
import { getInitialPage } from "../../../common/browserapi/pageApi";
import Header from "../../containers/home/components/header";
import { getQuery } from "../../until";
import Footer from "../footer";

const Template = (props: any) => {
  const { children } = props;
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    let queryObj = getQuery();
    let { lang = "cn" } = queryObj;
    getInitialPage({ lang: lang ?? "cn" }).then((res) => {
      if (res && res.data) {
        setPageData(res.data);
      }
    });
  }, []);
  return (
    <div>
      <Header pageData={pageData} showLang={props?.showLang} />
      <div className="site-content layout-full">
        <div className="page-container">{children}</div>
      </div>
      <Footer pageData={pageData} />
    </div>
  );
};

export default Template;
