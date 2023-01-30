import { commonPath } from "../../interface";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getQuery } from "../../until";

const Footer = (props: any) => {
  let { pageData } = props;
  let [language, setLang] = useState("cn");
  let childMenu = pageData?.filter((c: any) => !c?.isTop);

  useEffect(() => {
    let queryObj = getQuery();
    let { lang = "cn" } = queryObj;
    setLang(lang);
  }, []);
  return (
    <footer id="colophon" className="site-footer">
      <div className="page-container">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-12">
            <div className="footer-logo">
              {/* <img src="/assets/img/zh-hans-logo.286dc06b.jpg" className="attachment-full size-full" /> */}
            </div>
            <div className="footer-tagline">
              <p>
                {language == "cn"
                  ? "汇聚专业洞见 助力卓越决策"
                  : "We bring the power of insight to every great professional decision."}
              </p>
            </div>
          </div>
          <div className="footer-menu col-lg-6 col-md-8 offset-lg-1 col-sm-12">
            <div className="row">
              {childMenu?.length > 0 ? (
                <ul className="footer-menu-column">
                  <ul className="footer-sub-menu">
                    {childMenu?.map((c: any, index: number) => {
                      return (
                        <li
                          key={`cm${index}`}
                          className="menu-item menu-item-type-custom menu-item-object-custom menu-depth-2 menu-item-link"
                        >
                          <a href={commonPath(c)}>
                            <span>{c?.menuName}</span>
                            <span className="menu-expand"></span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </ul>
              ) : null}
              <ul className="footer-menu-column">
                <ul className="footer-sub-menu">
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-depth-1 menu-item-has-children menu-item-h1">
                    <a href={`/insights?lang=${language}`}>
                      <span>{language == "cn" ? "全部洞见" : "All"}</span>
                      <span className="menu-expand"></span>
                    </a>
                    <ul className="footer-sub-menu">
                      <li className="menu-item menu-item-type-custom menu-item-object-custom menu-depth-2 menu-item-link">
                        <a href={`/insights?lang=${language}`}>
                          <span>{language == "cn" ? "全部洞见" : "All"}</span>
                          <span className="menu-expand"></span>
                        </a>
                      </li>
                      <li className="menu-item menu-item-type-custom menu-item-object-custom menu-depth-2 menu-item-link">
                        <a href={`/articles?lang=${language}`}>
                          <span>{language == "cn" ? "文章" : "Ariticles"}</span>
                          <span className="menu-expand"></span>
                        </a>
                      </li>
                      <li className="menu-item menu-item-type-custom menu-item-object-custom menu-depth-2 menu-item-link">
                        <a href={`/case-studies?lang=${language}`}>
                          <span>
                            {language == "cn" ? "案例研究" : "Case Studies"}
                          </span>
                          <span className="menu-expand"></span>
                        </a>
                      </li>
                      <li className="menu-item menu-item-type-custom menu-item-object-custom menu-depth-2 menu-item-link">
                        <a href={`/whitepapers?lang=${language}`}>
                          <span>
                            {language == "cn" ? "白皮书" : "White Paper"}
                          </span>
                          <span className="menu-expand"></span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
          <div className="footer-social col-lg-2 col-md-12 col-sm-12">
            <div></div>
            <div className="footer-social-additional long-form-text"></div>
          </div>
        </div>
        <hr className="footer-rule" />
        <div className="footer-bottom-menu text-center col-12">
          <ul id="menu-footer-policy-menu" className="menu">
            <li
              id="menu-item-11275"
              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11275"
            >
              <a href="/privacy-policy/">隐私政策</a>
            </li>
            <li
              id="menu-item-11274"
              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11274"
            >
              <a href="/terms-of-use/">使用条款</a>
            </li>
            <li
              id="menu-item-11272"
              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11272"
            >
              <a href="/environmental-policy/">环境政策</a>
            </li>
            <li
              id="menu-item-11273"
              className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11273"
            >
              <a href="/cookie-policy/">Cookie政策</a>
            </li>
          </ul>
        </div>
        <div className="footer-copyright col-12 text-center">
          {/* <div className="footer-copyright">© 2022, Gerson Lehrman Group, Inc. 保留所有权利。GLG 与 GLG 标志是 Gerson Lehrman Group, Inc. 的注册商标。<a href="http://beian.miit.gov.cn" target="_blank">沪ICP备16037277号-1</a>
                    </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
