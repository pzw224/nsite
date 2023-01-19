const People = () => {
  return (
    <div className="glg-block glg-block-people-slider scroll-transitions background--pearl scroll-transitions--enabled scroll-transitions--active">
      <h2 className="people-slider-title">知名专家</h2>
      <div className="people-slider">
        <div className="people-slider-prev">
          <div className="people-slider-image " data-index="1">
            <img
              width="420"
              height="420"
              src="https://assets.glginsights.com/wp-content/uploads/2020/12/DanaFiser_JennyCraig-420x420.jpg"
              className=""
              alt=""
              loading="lazy"
              sizes="(max-width: 812px) 360px, (max-width: 931px) 420px, (max-width: 991px) 450px, 349px"
            />{" "}
          </div>
          <div className="people-slider-image " data-index="2">
            <img
              width="420"
              height="420"
              src="https://assets.glginsights.com/wp-content/uploads/2020/12/JessePujji_Ampush-420x420.jpg"
              className=""
              alt=""
              loading="lazy"
              sizes="(max-width: 812px) 360px, (max-width: 931px) 420px, (max-width: 991px) 450px, 349px"
            />{" "}
          </div>
          <div className="people-slider-image active" data-index="3">
            <img
              width="240"
              height="273"
              src="https://assets.glginsights.com/wp-content/uploads/2020/12/Paul_Eskenazi-1.jpg"
              className=""
              alt=""
              loading="lazy"
              sizes="(max-width: 812px) 360px, (max-width: 931px) 420px, (max-width: 991px) 450px, 349px"
            />{" "}
          </div>
        </div>
        <div className="people-slider-current">
          <div className="people-slider-current-images">
            <div className="people-slider-image active" data-index="1">
              <img
                width="420"
                height="420"
                src="https://assets.glginsights.com/wp-content/uploads/2020/12/DanaFiser_JennyCraig-420x420.jpg"
                className=""
                alt=""
                loading="lazy"
                sizes="(max-width: 812px) 360px, (max-width: 931px) 420px, (max-width: 991px) 450px, 349px"
              />{" "}
            </div>
            <div className="people-slider-image " data-index="2">
              <img
                width="420"
                height="420"
                src="https://assets.glginsights.com/wp-content/uploads/2020/12/JessePujji_Ampush-420x420.jpg"
                className=""
                alt=""
                loading="lazy"
                sizes="(max-width: 812px) 360px, (max-width: 931px) 420px, (max-width: 991px) 450px, 349px"
              />{" "}
            </div>
            <div className="people-slider-image " data-index="3">
              <img
                width="240"
                height="273"
                src="https://assets.glginsights.com/wp-content/uploads/2020/12/Paul_Eskenazi-1.jpg"
                className=""
                alt=""
                loading="lazy"
                sizes="(max-width: 812px) 360px, (max-width: 931px) 420px, (max-width: 991px) 450px, 349px"
              />{" "}
            </div>
          </div>
          <div className="people-sider-current-content">
            <div className="people-slider-text active" data-index="1">
              <h3 className="people-slider-name">Dana Fiser</h3>
              <p className="people-slider-position">Jenny Craig 前首席执行官</p>
            </div>
            <div className="people-slider-text " data-index="2">
              <h3 className="people-slider-name">Jesse Pujji</h3>
              <p className="people-slider-position">
                Ampush 联合创始人兼首席执行官
              </p>
            </div>
            <div className="people-slider-text " data-index="3">
              <h3 className="people-slider-name">Paul Eskenazi</h3>
              <p className="people-slider-position">
                Beats by Dre 前首席财务官
              </p>
            </div>
          </div>
        </div>
        <div className="people-slider-next">
          <div className="people-slider-image " data-index="1">
            <img
              width="420"
              height="420"
              src="https://assets.glginsights.com/wp-content/uploads/2020/12/DanaFiser_JennyCraig-420x420.jpg"
              className=""
              alt=""
              loading="lazy"
              sizes="(max-width: 812px) 360px, (max-width: 931px) 420px, (max-width: 991px) 450px, 349px"
            />{" "}
          </div>
          <div className="people-slider-image active" data-index="2">
            <img
              width="420"
              height="420"
              src="https://assets.glginsights.com/wp-content/uploads/2020/12/JessePujji_Ampush-420x420.jpg"
              className=""
              alt=""
              loading="lazy"
              sizes="(max-width: 812px) 360px, (max-width: 931px) 420px, (max-width: 991px) 450px, 349px"
            />{" "}
          </div>
          <div className="people-slider-image " data-index="3">
            <img
              width="240"
              height="273"
              src="https://assets.glginsights.com/wp-content/uploads/2020/12/Paul_Eskenazi-1.jpg"
              className=""
              alt=""
              loading="lazy"
              sizes="(max-width: 812px) 360px, (max-width: 931px) 420px, (max-width: 991px) 450px, 349px"
            />{" "}
          </div>
        </div>
      </div>
      <div className="people-slider-footer">
        <div className="people-slider-controls">
          <button
            className="slider-button slider-button--prev"
            data-animation-id="4"
          ></button>
          <button
            className="slider-button slider-button--next"
            data-animation-id="5"
          ></button>
          <div className="slider-counter">
            <span className="slider-counter-current">1</span>
            <span className="slider-counter-divider"></span>
            <span className="slider-counter-total">3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default People;
