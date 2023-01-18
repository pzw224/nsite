import * as React from "react";
import MasterPage from "../components/templates/masterpage";
import Template from "../components/templates/template";
import { PageInfo } from "../containers/page";

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
