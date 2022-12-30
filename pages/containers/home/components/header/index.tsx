const Header = (props: any) => {
  const { mastheadClass = "" } = props; //masthead--transparent
  return (
    <header id="masthead" className={mastheadClass}>
      <div className="header-menu-overlay header-menu-overlay--primary"></div>
      <div className="page-container">
        <div className="header-menu-overlay header-menu-overlay--secondary"></div>
        <div className="header-wrap">
          <div className="header-logo">
            <a href="/">
              <img src="/assets/img/zh-hans-logo-white.781e2926.svg" alt="" />
            </a>
          </div>
          <ul id="menu-header-main" className="header-menu header-menu-primary">
            <li
              id="menu-item-23505"
              className="header-menu-item header-menu-item-23505 menu-item-depth--0 header-menu-item--has-children"
            >
              <button className="header-menu-link">
                <span>服务内容</span>
              </button>
              <button type="button" className="header-menu-expand">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="icon icon--plus"
                >
                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="icon icon--minus"
                >
                  <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                </svg>
              </button>
              <div className="header-sub-menu">
                <ul className="header-sub-menu-column">
                  <li className="header-menu-item header-menu-item-23506 menu-item-depth--1">
                    <a href="/overview/" className="header-menu-link">
                      <span>产品服务概述</span>
                    </a>
                  </li>
                  <li className="header-menu-item header-menu-item-23507 menu-item-depth--1">
                    <a href="/getting-started/" className="header-menu-link">
                      <span>GLG 服务入门使用指南</span>
                    </a>
                  </li>
                  <li className="header-menu-item header-menu-item-42893 menu-item-depth--1">
                    <a href="/the-glg-difference/" className="header-menu-link">
                      <span>GLG 的独到之处</span>
                    </a>
                  </li>
                </ul>
                <ul className="header-sub-menu-column">
                  <li className="header-menu-item header-menu-item-31203 menu-item-depth--1 header-menu-item--has-children">
                    <div className="header-menu-link header-menu-link--disabled">
                      <span>专家访谈</span>
                    </div>
                    <ul className="header-sub-menu-column">
                      <li className="header-menu-item header-menu-item-23510 menu-item-depth--2">
                        <a href="/expert-calls/" className="header-menu-link">
                          <span>电话访谈</span>
                        </a>
                      </li>
                      <li className="header-menu-item header-menu-item-33979 menu-item-depth--2">
                        <a href="/placements/" className="header-menu-link">
                          <span>人才服务</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul className="header-sub-menu-column">
                  <li className="header-menu-item header-menu-item-31204 menu-item-depth--1 header-menu-item--has-children">
                    <div className="header-menu-link header-menu-link--disabled">
                      <span>研究服务</span>
                    </div>
                    <ul className="header-sub-menu-column">
                      <li className="header-menu-item header-menu-item-23513 menu-item-depth--2">
                        <a href="/surveys/" className="header-menu-link">
                          <span>定量研究</span>
                        </a>
                      </li>
                      <li className="header-menu-item header-menu-item-23514 menu-item-depth--2">
                        <a
                          href="/integrated-insights/"
                          className="header-menu-link"
                        >
                          <span>定制洞察</span>
                        </a>
                      </li>
                      <li className="header-menu-item header-menu-item-33978 menu-item-depth--2">
                        <a
                          href="/qualitative-research/"
                          className="header-menu-link"
                        >
                          <span>定性研究</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul className="header-sub-menu-column">
                  <li className="header-menu-item header-menu-item-31205 menu-item-depth--1 header-menu-item--has-children">
                    <div className="header-menu-link header-menu-link--disabled">
                      <span>前沿洞见</span>
                    </div>
                    <ul className="header-sub-menu-column">
                      <li className="header-menu-item header-menu-item-23516 menu-item-depth--2">
                        <a href="/insights" className="header-menu-link">
                          <span>专家洞见</span>
                        </a>
                      </li>
                      <li className="header-menu-item header-menu-item-23512 menu-item-depth--2">
                        <a href="/events/" className="header-menu-link">
                          <span>会议活动</span>
                        </a>
                      </li>
                      <li className="header-menu-item header-menu-item-23511 menu-item-depth--2">
                        <a href="/library/" className="header-menu-link">
                          <span>会议纪要资料库</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li
              id="menu-item-23515"
              className="header-menu-item header-menu-item-23515 menu-item-depth--0 header-menu-item--has-children"
            >
              <button className="header-menu-link">
                <span>客户行业</span>
              </button>
              <button type="button" className="header-menu-expand">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="icon icon--plus"
                >
                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="icon icon--minus"
                >
                  <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                </svg>
              </button>
              <div className="header-sub-menu">
                <ul className="header-sub-menu-column">
                  <li className="header-menu-item header-menu-item-23521 menu-item-depth--1 header-menu-item--has-children">
                    <a href="/business/" className="header-menu-link">
                      <span>企业客户</span>
                    </a>
                    <ul className="header-sub-menu-column">
                      <li className="header-menu-item header-menu-item-23522 menu-item-depth--2">
                        <a
                          href="/technology-media-telecommunications/"
                          className="header-menu-link"
                        >
                          <span>科技行业</span>
                        </a>
                      </li>
                      <li className="header-menu-item header-menu-item-23523 menu-item-depth--2">
                        <a
                          href="/medical-devices-diagnostics/"
                          className="header-menu-link"
                        >
                          <span>医疗器械、诊断和生命科学</span>
                        </a>
                      </li>
                      <li className="header-menu-item header-menu-item-23524 menu-item-depth--2">
                        <a
                          href="/pharmaceuticals-biotechnology/"
                          className="header-menu-link"
                        >
                          <span>制药和生物技术行业</span>
                        </a>
                      </li>
                      <li className="header-menu-item header-menu-item-23525 menu-item-depth--2">
                        <a href="/industrials/" className="header-menu-link">
                          <span>工业企业</span>
                        </a>
                      </li>
                      <li className="header-menu-item header-menu-item-23526 menu-item-depth--2">
                        <a href="/consumer-goods/" className="header-menu-link">
                          <span>消费品行业</span>
                        </a>
                      </li>
                      <li className="header-menu-item header-menu-item-23527 menu-item-depth--2">
                        <a
                          href="/payments-and-insurance/"
                          className="header-menu-link"
                        >
                          <span>支付与保险行业</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul className="header-sub-menu-column">
                  <li className="header-menu-item header-menu-item-23529 menu-item-depth--1 header-menu-item--has-children">
                    <a href="/financial-services/" className="header-menu-link">
                      <span>金融服务</span>
                    </a>
                    <ul className="header-sub-menu-column">
                      <li className="header-menu-item header-menu-item-23528 menu-item-depth--2">
                        <a
                          href="/investment-managers-mutual-funds/"
                          className="header-menu-link"
                        >
                          <span>投资经理人和公募基金</span>
                        </a>
                      </li>
                      <li className="header-menu-item header-menu-item-23530 menu-item-depth--2">
                        <a
                          href="/investment-banks-research/"
                          className="header-menu-link"
                        >
                          <span>投资银行及研究</span>
                        </a>
                      </li>
                      <li className="header-menu-item header-menu-item-23531 menu-item-depth--2">
                        <a href="/private-equity/" className="header-menu-link">
                          <span>私募股权投资</span>
                        </a>
                      </li>
                      <li className="header-menu-item header-menu-item-23532 menu-item-depth--2">
                        <a href="/hedge-funds/" className="header-menu-link">
                          <span>对冲基金</span>
                        </a>
                      </li>
                      <li className="header-menu-item header-menu-item-23533 menu-item-depth--2">
                        <a href="/private-credit/" className="header-menu-link">
                          <span>信贷业务</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul className="header-sub-menu-column">
                  <li className="header-menu-item header-menu-item-23583 menu-item-depth--1 header-menu-item--has-children">
                    <a
                      href="/professional-services/"
                      className="header-menu-link"
                    >
                      <span>专业服务</span>
                    </a>
                    <ul className="header-sub-menu-column">
                      <li className="header-menu-item header-menu-item-23535 menu-item-depth--2">
                        <a
                          href="/consulting-firms/"
                          className="header-menu-link"
                        >
                          <span>咨询公司服务</span>
                        </a>
                      </li>
                      <li className="header-menu-item header-menu-item-40056 menu-item-depth--2">
                        <a
                          href="/advertising-and-public-relations/"
                          className="header-menu-link"
                        >
                          <span>广告和公关咨询</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li
              id="menu-item-23517"
              className="header-menu-item header-menu-item-23517 menu-item-depth--0"
            >
              <a href="/network-members/" className="header-menu-link">
                <span>专家团成员</span>
              </a>
            </li>
            <li
              id="menu-item-23518"
              className="header-menu-item header-menu-item-23518 menu-item-depth--0"
            >
              <a href="/careers/" className="header-menu-link">
                <span>职业发展</span>
              </a>
            </li>
            <li
              id="menu-item-23519"
              className="header-menu-item header-menu-item-23519 menu-item-depth--0"
            >
              <a href="/social-impact/" className="header-menu-link">
                <span>社会影响力项目</span>
              </a>
            </li>
            <li
              id="menu-item-31209"
              className="header-menu-item header-menu-item-31209 menu-item-depth--0"
            >
              <a href="/compliance/" className="header-menu-link">
                <span>合规框架</span>
              </a>
            </li>
            <li
              id="menu-item-23520"
              className="header-menu-item header-menu-item-23520 menu-item-depth--0 header-menu-item--has-children"
            >
              <button className="header-menu-link">
                <span>关于我们</span>
              </button>
              <button type="button" className="header-menu-expand">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="icon icon--plus"
                >
                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="icon icon--minus"
                >
                  <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                </svg>
              </button>
              <div className="header-sub-menu">
                <ul className="header-sub-menu-column">
                  <li className="header-menu-item header-menu-item-23542 menu-item-depth--1">
                    <a href="/who-we-are/" className="header-menu-link">
                      <span>关于我们</span>
                    </a>
                  </li>
                  <li className="header-menu-item header-menu-item-23545 menu-item-depth--1">
                    <a href="/news/" className="header-menu-link">
                      <span>新闻</span>
                    </a>
                  </li>
                  <li className="header-menu-item header-menu-item-31206 menu-item-depth--1">
                    <a href="/fact-sheet/" className="header-menu-link">
                      <span>公司简介</span>
                    </a>
                  </li>
                  <li className="header-menu-item header-menu-item-23544 menu-item-depth--1">
                    <a href="/who-we-are/faq/" className="header-menu-link">
                      <span>常见问题解答</span>
                    </a>
                  </li>
                </ul>
                <ul className="header-sub-menu-column">
                  <li className="header-menu-item header-menu-item-24260 menu-item-depth--1">
                    <a
                      href="/gerson-lehrman-group/"
                      className="header-menu-link"
                    >
                      <span>公司历史</span>
                    </a>
                  </li>
                  <li className="header-menu-item header-menu-item-23546 menu-item-depth--1">
                    <a href="/contact-us/" className="header-menu-link">
                      <span>联系我们</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <ul
            id="menu-header-right"
            className="header-menu header-menu-secondary"
          >
            <li
              id="menu-item-10835"
              className="header-menu-item header-menu-item-10835 menu-item-depth--0 header-menu-item--has-children"
            >
              <button className="header-menu-link">
                <span>登录</span>
              </button>
              <div className="header-sub-menu">
                <ul className="header-sub-menu-column">
                  <li className="header-menu-item header-menu-item-10836 menu-item-depth--1">
                    <a
                      href="https://myglg.glgresearch.com/projects-listing/?utm_source=glginsights.com&amp;utm_medium=website&amp;utm_campaign=myglglogin"
                      className="header-menu-link"
                    >
                      <span>客户登录 - MyGLG</span>
                    </a>
                  </li>
                  <li className="header-menu-item header-menu-item-10837 menu-item-depth--1">
                    <a
                      href="https://services.glgresearch.com/go-compliance/"
                      className="header-menu-link"
                    >
                      <span>客户合规人士</span>
                    </a>
                  </li>
                  <li className="header-menu-item header-menu-item-10838 menu-item-depth--1">
                    <a
                      href="https://members.glgresearch.com/profile?utm_campaign=glgit"
                      className="header-menu-link"
                    >
                      <span>专家团成员</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li
              id="menu-item-10834"
              className="header-menu-item header-menu-item-10834 menu-item-depth--0"
            >
              <button type="button" className="header-menu-link">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    className="icon"
                  >
                    <path
                      d="M12.02 0C18.634.011 24 5.383 24 12c0 6.623-5.376 12-12 12-6.623 0-12-5.377-12-12C0 5.383 5.367.011 11.981 0h.039zm3.694 16H8.287c.639 4.266 2.242 7 3.713 7 1.472 0 3.075-2.734 3.714-7m6.535 0h-5.523c-.426 2.985-1.321 5.402-2.485 6.771A11.025 11.025 0 0022.249 16M7.275 16H1.751a11.029 11.029 0 008.009 6.771C8.596 21.402 7.701 18.985 7.275 16m-.123-7H1.416a11.043 11.043 0 000 6h5.736a29.82 29.82 0 010-6m8.691 0H8.158a28.617 28.617 0 000 6h7.685a28.62 28.62 0 000-6m6.742 0h-5.736c.062.592.308 3.019 0 6h5.736a11.042 11.042 0 000-6M9.76 1.229A11.029 11.029 0 001.751 8h5.524c.426-2.985 1.321-5.403 2.485-6.771M15.714 8C15.075 3.734 13.472 1 12 1c-1.471 0-3.074 2.734-3.713 7h7.427zm-1.473-6.771C15.405 2.597 16.3 5.015 16.726 8h5.523a11.025 11.025 0 00-8.008-6.771"
                      fill="#fff"
                    ></path>
                  </svg>
                </span>
              </button>
              <div className="header-sub-menu">
                <ul className="header-sub-menu-column">
                  <li className="header-menu-item menu-item-depth--1">
                    <a
                      href="https://glginsights.com/"
                      className="header-menu-link lang-en"
                    >
                      <span>English</span>
                    </a>
                  </li>
                  <li className="header-menu-item menu-item-depth--1">
                    <a
                      href="https://glginc.cn/"
                      className="header-menu-link lang-zh-hans current-language"
                    >
                      <span>简体中文</span>
                    </a>
                  </li>
                  <li className="header-menu-item menu-item-depth--1">
                    <a
                      href="https://glginsights.com/ja/"
                      className="header-menu-link lang-ja"
                    >
                      <span>日本語</span>
                    </a>
                  </li>
                </ul>
                <ul className="header-sub-menu-column">
                  <li className="header-menu-item menu-item-depth--1">
                    <a
                      href="https://glginsights.com/ko/"
                      className="header-menu-link lang-ko"
                    >
                      <span>한국어</span>
                    </a>
                  </li>
                  <li className="header-menu-item menu-item-depth--1">
                    <a
                      href="https://glginsights.com/de/"
                      className="header-menu-link lang-de"
                    >
                      <span>Deutsch</span>
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
