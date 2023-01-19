import React from "react";
import MasterPage from "../../common/components/templates/masterpage";
import Template from "../../common/components/templates/template";
import InsightsPage from "../../common/containers/insights";

@MasterPage(Template, {})
export default class Index extends React.Component {
  render() {
    return (
      <main className="site-main post-archive news-archive">
        <InsightsPage type="videos" />
      </main>
    );
  }
}
