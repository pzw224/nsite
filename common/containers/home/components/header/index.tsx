
import { useState, useEffect } from "react";
import { commonPath } from "../../../../interface";

/* eslint-disable @next/next/no-html-link-for-pages */
const Header = (props: any) => {
  const { mastheadClass = "", showLang = true } = props; //masthead--transparent
  const [langs, setLang] = useState(false);
  const pageData = props?.pageData;
  const [menuStatus, setMenuStatus] = useState({ status: false, index: -1 });

  return (
    <header
      id="masthead"
      className={
        mastheadClass +
        ` ${langs ? " open--secondary" : ""} 
        ${menuStatus?.status ? " open--primary" : ""}`
      }
    >
      <div
        className="header-menu-overlay header-menu-overlay--primary"
        onMouseLeave={() => {
          setMenuStatus({
            status: false,
            index: -1,
          });
        }}
      ></div>
      <div className="page-container">
        <div className="header-menu-overlay header-menu-overlay--secondary"></div>
        <div className="header-wrap">
          <div className="header-logo">
            <a href="/">
              {/* <img src="/assets/img/zh-hans-logo-white.781e2926.svg" alt="" /> */}
            </a>
          </div>
          <ul className="header-menu header-menu-primary">
            {pageData
              ?.sort((a: any, b: any) => b.priority - a.priority)
              ?.filter((x: any) => x.isTop)
              .map((data: any, parentIndex: number) => {
                let path = commonPath(data);
                let hasChildren =
                  data?.isTop &&
                  pageData?.findIndex(
                    (f: any) => f?.parentMenu?.value == data._id
                  ) >= 0;

                if (hasChildren) {
                  let childMenu = pageData?.filter(
                    (f: any) => f?.parentMenu?.value == data._id
                  );
                  let ceilValue = Math.ceil(childMenu?.length / 3);
                  let childData = [];
                  for (let i = 0; i < ceilValue; i++) {
                    childData.push(childMenu?.slice(3 * i, 3 * (i + 1)));
                  }
                  return (
                    <li
                      key={data?._id}
                      onMouseEnter={() => {
                        setMenuStatus({ status: true, index: parentIndex });
                      }}
                      className={`header-menu-item header-menu-item-23505 menu-item-depth--0 header-menu-item--has-children ${
                        menuStatus?.index == parentIndex ? "active" : ""
                      }`}
                    >
                      <button className="header-menu-link">
                        <span>{data?.menuName}</span>
                      </button>
                      <div className="header-sub-menu">
                        {childData?.map((c: any, cIndex: number) => {
                          return (
                            <ul
                              key={`ul${cIndex}`}
                              className="header-sub-menu-column"
                            >
                              {c
                                ?.sort(
                                  (a: any, b: any) => b?.priority - a?.priority
                                )
                                ?.map((d: any, dindex: number) => {
                                  return (
                                    <li
                                      key={`li${dindex}`}
                                      className="header-menu-item header-menu-item-23506 menu-item-depth--1"
                                    >
                                      <a
                                        href={commonPath(d)}
                                        className="header-menu-link"
                                      >
                                        <span>{d?.menuName}</span>
                                      </a>
                                    </li>
                                  );
                                })}
                            </ul>
                          );
                        })}
                      </div>
                    </li>
                  );
                } else {
                  return (
                    <li
                      key={data?._id}
                      className="header-menu-item header-menu-item-23517 menu-item-depth--0"
                    >
                      <a href={path} className="header-menu-link">
                        <span>{data?.menuName}</span>
                      </a>
                    </li>
                  );
                }
              })}
          </ul>
          <ul
            id="menu-header-right"
            className="header-menu header-menu-secondary"
            style={showLang ? { display: "inherit" } : { display: "none" }}
          >
            <li className="header-menu-item header-menu-item-10835 menu-item-depth--0 header-menu-item--has-children"></li>
            <li
              id="menu-item-10834"
              className={`header-menu-item header-menu-item-10834 menu-item-depth--0 ${
                langs ? "active" : ""
              }`}
              onClick={() => {
                setLang(!langs);
              }}
            >
              <button type="button" className="header-menu-link">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    className="icon"
                  >
                    <path
                      d="M12.02 0C18.634.011 24 5.383 24 12c0 6.623-5.376 12-12 12-6.623 0-12-5.377-12-12C0 5.383 5.367.011 11.981 0h.039zm3.694 16H8.287c.639 4.266 2.242 7 3.713 7 1.472 0 3.075-2.734 3.714-7m6.535 0h-5.523c-.426 2.985-1.321 5.402-2.485 6.771A11.025 11.025 0 0022.249 16M7.275 16H1.751a11.029 11.029 0 008.009 6.771C8.596 21.402 7.701 18.985 7.275 16m-.123-7H1.416a11.043 11.043 0 000 6h5.736a29.82 29.82 0 010-6m8.691 0H8.158a28.617 28.617 0 000 6h7.685a28.62 28.62 0 000-6m6.742 0h-5.736c.062.592.308 3.019 0 6h5.736a11.042 11.042 0 000-6M9.76 1.229A11.029 11.029 0 001.751 8h5.524c.426-2.985 1.321-5.403 2.485-6.771M15.714 8C15.075 3.734 13.472 1 12 1c-1.471 0-3.074 2.734-3.713 7h7.427zm-1.473-6.771C15.405 2.597 16.3 5.015 16.726 8h5.523a11.025 11.025 0 00-8.008-6.771"
                      fill="#fff"
                    ></path>
                  </svg>
                </span>
              </button>
              <div
                className="header-sub-menu"
                style={{ background: "#0f122b" }}
              >
                <ul className="header-sub-menu-column">
                  <li className="header-menu-item menu-item-depth--1">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (window.location.search) {
                          const arr = window.location.search
                            .substring(1)
                            .split("&");
                          const otherArr = arr.filter(
                            (o) => o.indexOf("lang") < 0
                          );
                          window.location.href =
                            window.location.protocol +
                            "//" +
                            window.location.host +
                            window.location.pathname +
                            "?" +
                            otherArr.join("&") +
                            (otherArr.join("&")?.length > 0
                              ? "&lang=cn"
                              : "lang=cn");
                        } else {
                          window.location.href =
                            window.location.href + "?lang=cn";
                        }
                      }}
                      className="header-menu-link lang-zh-hans current-language"
                    >
                      <span>简体中文</span>
                    </a>
                  </li>
                  <li className="header-menu-item menu-item-depth--1">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (window.location.search) {
                          const arr = window.location.search
                            .substring(1)
                            .split("&");
                          const otherArr = arr.filter(
                            (o) => o.indexOf("lang") < 0
                          );
                          window.location.href =
                            window.location.protocol +
                            "//" +
                            window.location.host +
                            window.location.pathname +
                            "?" +
                            otherArr.join("&") +
                            (otherArr.join("&")?.length > 0
                              ? "&lang=en"
                              : "lang=en");
                        } else {
                          window.location.href =
                            window.location.href + "?lang=en";
                        }
                      }}
                      className="header-menu-link lang-en"
                    >
                      <span>English</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="header-menu-item menu-item-depth--0 header-menu-item--mobile-toggle header-menu-item--has-children">
              <button
                type="button"
                className="header-menu-link mobile-menu-toggle"
              >
                <span>Menu</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
