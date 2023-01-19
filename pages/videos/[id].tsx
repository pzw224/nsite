import * as React from "react";
import MasterPage from "../../common/components/templates/masterpage";
import Template from "../../common/components/templates/template";
import Article from "../../common/containers/articles/index";

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
