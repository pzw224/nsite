import * as React from "react";
import MasterPage from "../../common/components/templates/masterpage";
import Template from "../../common/components/templates/template";
import PageInfo from "../../common/containers/page";

@MasterPage(Template, {})
export default class Articles extends React.Component {
  render() {
    return (
      <div className="site-content layout-full">
        <PageInfo />
      </div>
    );
  }
}
