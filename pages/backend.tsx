import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  ApartmentOutlined,
  AlignCenterOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import { Button, Col, Layout, Menu, Modal, Row, theme } from "antd";
import BackendPage from "../common/containers/backend";
import { useRouter } from "next/router";

export default function Backend(props: any) {
  const { Sider, Header, Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const menu = [
    { key: "0", icon: <AuditOutlined />, label: "模板管理" },
    { key: "1", icon: <AuditOutlined />, label: "子模板管理" },
    {
      key: "2",
      icon: <ApartmentOutlined />,
      label: "页面管理",
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "专家洞见管理",
    },
  ];
  const [selectData, setSelectData] = useState("0");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let value = sessionStorage.getItem("login");
    if (!value) {
      window.location.href =
        window.location.protocol + "//" + window.location.host + "/login";
    }
  }, []);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          onSelect={(item) => {
            setSelectData(item.key);
          }}
          items={menu}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 1024,
            background: colorBgContainer,
          }}
        >
          <BackendPage selectData={selectData} />
        </Content>
      </Layout>
    </Layout>
  );
}
