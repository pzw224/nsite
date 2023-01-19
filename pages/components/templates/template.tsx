import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getInitialPage } from "../../../common/browserapi/pageApi";
import Header from "../../containers/home/components/header";
import Footer from "../footer";

const Template = (props: any) => {
  const { children } = props;
  const router = useRouter();
  const { lang } = router.query;
  const [pageData, setPageData] = useState([]);
  useEffect(() => {
    getInitialPage({ lang: lang ?? "cn" }).then((res) => {
      if (res && res.data) {
        setPageData(res.data);
      }
    });
  }, [lang]);
  return (
    <div>
      <Header pageData={pageData} />
      <div className="site-content layout-full">
        <div className="page-container">{children}</div>
      </div>
      <Footer pageData={pageData} />
    </div>
  );
};

export default Template;
