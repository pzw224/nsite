import React, { useEffect, useState } from "react";
import InsightsManager from "../../components/backend/insightsManage";
import ModuleManage from "../../components/backend/ModuleManage";
import PageManage from "../../components/backend/PageManage";
import SubModuleManage from "../../components/backend/SubModuleManage";

const BackendPage = (props: { selectData: string }) => {
  const { selectData } = props;
  switch (selectData) {
    case "0":
      return <ModuleManage />;
    case "1":
      return <SubModuleManage />;
    case "2":
      return <PageManage />;
    case "3":
      return <InsightsManager />;
    default:
      return <ModuleManage />;
  }

  return null;
};

export default BackendPage;
