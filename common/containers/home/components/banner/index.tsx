const Banner = () => {
    return (

        <div className="glg-block glg-block-banner-hero-v2 scroll-transitions scroll-transitions--enabled scroll-transitions--active">
            <img width="1500" height="627" src="https://assets.glginsights.com/wp-content/uploads/2021/09/D1_HomepageImage-2.jpg" className="banner-hero-v2-image" alt="" loading="lazy" sizes="(max-width: 1500px) 100vw, 1500px" />
            <div className="banner-hero-v2-content">
                <h1 className="banner-hero-v2-title">汇聚全球洞见</h1>
                <p className="banner-hero-v2-subtitle">汇聚专业洞见，助力卓越决策</p>
                <div className="banner-hero-v2-buttons">
                    <a className="glg-button-v2 style--solid size--large color--light" href="#contact-form" target="">成为客户</a>
                    <a className="glg-button-v2 style--solid size--large color--light" href="/network-members/" target="">分享专业知识</a>
                </div>
            </div>
        </div>
    )
}

export default Banner;