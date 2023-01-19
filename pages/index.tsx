import Head from "next/head";
import React from "react";
import Footer from "../common/components/footer";
import MasterPage from "../common/components/templates/masterpage";
import Template from "../common/components/templates/template";
import Header from "../common/containers/home/components/header";
import PageInfo from "../common/containers/page";

@MasterPage(Template, {})
export default class Home extends React.Component {
  render() {
    return <PageInfo />;
  }
}
