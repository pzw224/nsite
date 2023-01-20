import { Col, Layout, Row, Form, Input, Button } from "antd";
import React, { useEffect, useState } from "react";
export default function Login(props: any) {
  const { Header, Footer, Sider, Content } = Layout;
  const onFinish = (values: any) => {
    console.log("Success:", values);
    if (values && values.password == "admin" && values.username == "admin") {
      sessionStorage.setItem("login", "true");
      window.location.href =
        window.location.protocol + "//" + window.location.host + "/backend";
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Layout>
      <Header>
        <Row align={"middle"} justify={"center"}>
          <Col span={8}></Col>
          <Col span={8}>
            <h1 style={{ color: "white", textAlign: "center" }}>登录</h1>
          </Col>
          <Col span={8}></Col>
        </Row>
      </Header>
      <Content style={{ minHeight: 1024, paddingTop: 30 }}>
        <Row></Row>
        <Row align={"middle"} justify={"center"}>
          <Col span={8}></Col>
          <Col span={8}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: "请输入用户名!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: "请输入密码!" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={8}></Col>
        </Row>
      </Content>
      <Footer></Footer>
    </Layout>
  );
}
