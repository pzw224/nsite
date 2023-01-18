import * as React from "react";
import MasterPage from "../components/templates/masterpage";
import Template from "../components/templates/template";
import Article from "../containers/articles/index";

@MasterPage(Template, {})
export default class Videos extends React.Component {
  render() {
    return (
      <div className="site-content layout-full">
        <Article type="videos" />
      </div>
    );
  }
}