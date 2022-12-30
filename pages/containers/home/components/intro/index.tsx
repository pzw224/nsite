const Intro = () => {
    return (
        <div className="glg-block glg-block-icons-rows scroll-transitions background--navy scroll-transitions--enabled scroll-transitions--active">
            <h2 className="icons-rows-title">如何为您服务</h2>
            <div className="icons-rows">
                <div className="icons-rows-item">
                    <div className="icons-rows-item-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                            <line className="cls-1" x1="16.49" y1="22.11" x2="15.37" y2="17.62"></line>
                            <line className="cls-1" x1="7.51" y1="22.11" x2="8.63" y2="17.62"></line>
                            <rect className="cls-1" x="1.89" y="1.89" width="20.22" height="15.73" rx="2.33"></rect>
                            <line className="cls-1" x1="6.95" y1="13.12" x2="6.95" y2="10.06"></line>
                            <line className="cls-1" x1="10.32" y1="13.12" x2="10.32" y2="6.38"></line>
                            <line className="cls-1" x1="13.68" y1="13.12" x2="13.68" y2="9.39"></line>
                            <line className="cls-1" x1="17.05" y1="13.12" x2="17.05" y2="7"></line>
                        </svg>
                    </div>
                    <h3 className="icons-rows-item-title">确定您的研究话题</h3>
                    <div className="icons-rows-item-content">
                        <p>我们的专业团队将为您量身定制方案，在您的时限内确定、分析并且回答您的问题。</p>
                    </div>
                </div>
                <div className="icons-rows-item">
                    <div className="icons-rows-item-icon">
                    </div>
                    <h3 className="icons-rows-item-title">制定计划</h3>
                    <div className="icons-rows-item-content">
                        <p>我们将从您的需求出发，进一步与您配合制定一份囊括我们独特服务的计划：电话访谈、定量研究、会议活动和定制洞察。</p>
                        <div className="icons-rows-item-buttons">
                            <a className="glg-button-v2 style--underline size--large color--light" href="/overview/" target="">查看我们的服务</a>
                        </div>
                    </div>
                </div>
                <div className="icons-rows-item">
                    <div className="icons-rows-item-icon">
                    </div>
                    <h3 className="icons-rows-item-title">向资深专家学习</h3>
                    <div className="icons-rows-item-content">
                        <p>在您方便的时间范围内，根据您的具体需求与匹配的行业专家进行交流。GLG 格理集团与约 100 万名跨行业、职能、地域的专业人士合作。</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Intro;