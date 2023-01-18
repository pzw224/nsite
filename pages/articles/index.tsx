import React from "react";
import MasterPage from "../components/templates/masterpage";
import Template from "../components/templates/template";
import InsightsPage from "../containers/insights";

@MasterPage(Template, {})
export default class Articles extends React.Component {
  render() {
    return (
      <main className="site-main post-archive news-archive">
        <InsightsPage type="articles" />
      </main>
    );
  }
}
