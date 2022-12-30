import React from 'react'
import style from './styles/index.module.scss';
import Menu from './components/menu';
import Banner from './components/banner'
import ScrollBar from './components/scroll-bar';
import ContentInfo from './components/content';
import ServiceInfo from './components/service-info';
import CaseInfo from './components/case-info';
import Intro from './components/intro';
import IntroMore from './components/intro-more';
import Insights from './components/insights';
import People from './components/people';
import Contract from './components/contract';

const HomePage: React.FC = () => {
    const list = [{
        name: '服务内容'
    }, {
        name: '客户行业'
    }, {
        name: '执业发展'
    }, {
        name: '社会影响力项目'
    }];
    return (
        <React.Fragment>
            <Banner />
            <ScrollBar />
            <ContentInfo />
            <ServiceInfo />
            <CaseInfo />
            <Intro />
            <IntroMore />
            <Insights />
            <People />
            <Contract />
        </React.Fragment>
    )
}

export default HomePage