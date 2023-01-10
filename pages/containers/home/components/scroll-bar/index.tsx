const ScrollBar = () => {
  return (
    <div className="glg-block glg-block-notification-slider scroll-transitions scroll-transitions--enabled scroll-transitions--active">
      <button
        className="notification-slider-control notification-slider-control--prev"
        aria-controls="tns1"
        data-controls="prev"
      >
        <svg
          className="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16.04 27.64"
        >
          <path d="M15.38 27.64L0 13.82 15.38 0l.66.74L1.5 13.82l14.54 13.07-.66.75z"></path>
        </svg>
      </button>
      <button
        className="notification-slider-control notification-slider-control--next"
        aria-controls="tns1"
        data-controls="next"
      >
        <svg
          className="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16.04 27.64"
        >
          <path d="M15.38 27.64L0 13.82 15.38 0l.66.74L1.5 13.82l14.54 13.07-.66.75z"></path>
        </svg>
      </button>
      <div className="tns-outer" id="tns1-ow">
        <div
          className="tns-liveregion tns-visually-hidden"
          aria-live="polite"
          aria-atomic="true"
        >
          slide <span className="current">4</span> of 5
        </div>
        <div id="tns1-mw" className="tns-ovh">
          <div className="tns-inner" id="tns1-iw">
            <div
              className="notification-slider  tns-slider tns-carousel tns-subpixel tns-calc tns-horizontal"
              id="tns1"
            >
              <div
                className="notification-slider-item tns-item tns-slide-cloned"
                aria-hidden="true"
              >
                <div className="notification-slider-item-container">
                  <div className="notification-slider-item-header">
                    <h2 className="notification-slider-item-title">
                      GLG格理集团服务介绍
                    </h2>
                    <a
                      className="glg-button-v2 style--underline size--small color--dark"
                      href="/who-we-are/#glg-in-action"
                      target=""
                    >
                      观看视频
                    </a>
                  </div>
                  <div className="notification-slider-item-content">
                    <p>
                      了解GLG如何通过三类产品与服务助力客户决策制定的每一步。
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="notification-slider-item tns-item"
                id="tns1-item0"
                aria-hidden="true"
              >
                <div className="notification-slider-item-container">
                  <div className="notification-slider-item-header">
                    <h2 className="notification-slider-item-title">
                      2022 年度 GLG 全球 CEO 调研正式发布
                    </h2>
                    <a
                      className="glg-button-v2 style--underline size--small color--dark"
                      href="/2022-glg-ceo-survey/"
                      target=""
                    >
                      下载白皮书
                    </a>
                  </div>
                  <div className="notification-slider-item-content">
                    <p>
                      本年度的调研发现，高管人员对于全球经济持乐观态度。调研内容囊括了他们的投资计划、业务担忧，以及对新一年的预期。
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="notification-slider-item tns-item"
                id="tns1-item1"
                aria-hidden="true"
              >
                <div className="notification-slider-item-container">
                  <div className="notification-slider-item-header">
                    <h2 className="notification-slider-item-title">
                      GLG 社会影响力项目
                    </h2>
                    <a
                      className="glg-button-v2 style--underline size--small color--dark"
                      href="/social-impact/"
                      target=""
                    >
                      了解更多
                    </a>
                  </div>
                  <div className="notification-slider-item-content">
                    <p>
                      GLG
                      社会影响力项目推出全球化知识共享平台，助力解决全球最紧迫的挑战。这一屡获殊荣的项目，将我们专家团成员的洞见带给有着最迫切需要的组织。
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="notification-slider-item tns-item tns-slide-active"
                id="tns1-item2"
              >
                <div className="notification-slider-item-container">
                  <div className="notification-slider-item-header">
                    <h2 className="notification-slider-item-title">
                      收听我们的系列播客：
                      <br />
                      决策要素(Deciding Factors)
                    </h2>
                    <a
                      className="glg-button-v2 style--underline size--small color--dark"
                      href="/deciding-factors/"
                      target=""
                    >
                      收听
                    </a>
                  </div>
                  <div className="notification-slider-item-content">
                    <p>
                      在本系列播客中，GLG
                      格理集团邀请商界、政界、新闻界、学术界和金融界高层决策者分享专业洞见。
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="notification-slider-item tns-item"
                id="tns1-item3"
                aria-hidden="true"
              >
                <div className="notification-slider-item-container">
                  <div className="notification-slider-item-header">
                    <h2 className="notification-slider-item-title">
                      助力决策的洞见
                    </h2>
                    <a
                      className="glg-button-v2 style--underline size--small color--dark"
                      href="/insights/"
                      target=""
                    >
                      浏览最新内容
                    </a>
                  </div>
                  <div className="notification-slider-item-content">
                    <p>
                      GLG 格理集团专家团拥有约 100
                      万名成员，涵盖全球主要行业和地区的意见领袖，为您提供专业洞见。
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="notification-slider-item tns-item"
                id="tns1-item4"
                aria-hidden="true"
              >
                <div className="notification-slider-item-container">
                  <div className="notification-slider-item-header">
                    <h2 className="notification-slider-item-title">
                      GLG格理集团服务介绍
                    </h2>
                    <a
                      className="glg-button-v2 style--underline size--small color--dark"
                      href="/who-we-are/#glg-in-action"
                      target=""
                    >
                      观看视频
                    </a>
                  </div>
                  <div className="notification-slider-item-content">
                    <p>
                      了解GLG如何通过三类产品与服务助力客户决策制定的每一步。
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="notification-slider-item tns-item tns-slide-cloned"
                aria-hidden="true"
              >
                <div className="notification-slider-item-container">
                  <div className="notification-slider-item-header">
                    <h2 className="notification-slider-item-title">
                      2022 年度 GLG 全球 CEO 调研正式发布
                    </h2>
                    <a
                      className="glg-button-v2 style--underline size--small color--dark"
                      href="/2022-glg-ceo-survey/"
                      target=""
                    >
                      下载白皮书
                    </a>
                  </div>
                  <div className="notification-slider-item-content">
                    <p>
                      本年度的调研发现，高管人员对于全球经济持乐观态度。调研内容囊括了他们的投资计划、业务担忧，以及对新一年的预期。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollBar;
