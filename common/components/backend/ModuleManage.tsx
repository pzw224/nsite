import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  ExclamationCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  SelectProps,
  message,
  Table,
  Tag,
  Space,
  Button,
  Modal,
  Row,
  Col,
  Form,
  Select,
  Input,
  Pagination,
} from "antd";
import type { ColumnsType } from "antd/es/table";

import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { modalType } from "../../../common/interface";
import {
  deleteModule,
  addModule,
  updateModule,
  getInitialData,
  moduleDetail,
} from "../../../common/browserapi/moduleApi";
import { getInitialData as getInsightData } from "../../../common/browserapi/insights";
import ModuleModal from "./moduleModal";

export default function ModuleManage() {
  const [dataSource, setDataSource] = useState({ data: [], total: 0 } as any);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [pageIndex, SetPageIndex] = useState(1);
  const [action, setAction] = useState(modalType.add);
  const [insightsEnable, setInsightsEnable] = useState(true);
  const [insightsList, setInsightList] = useState([]);
  const [form] = Form.useForm();

  const updateModal = (id: any) => {
    setAction(modalType.edit);
    form.resetFields();
    moduleDetail(id).then((res) => {
      if (res) {
        if (
          res?.data?.type == "case-studies" ||
          res?.data?.type == "articles"
        ) {
          setInsightsEnable(false);
          getInsightData({
            page: 1,
            size: 30,
            type: res?.data?.type,
            lang: res?.data?.lang,
          }).then((res) => {
            if (res && res.data) {
              setInsightList(
                res.data.map((o: any) => {
                  return { value: o._id, label: o.title };
                })
              );
            }
          });
        } else {
          setInsightsEnable(true);
        }
        form.setFieldsValue(res?.data);
      }
      setOpen(true);
    });
    setOpen(true);
  };

  const showModal = () => {
    setAction(modalType.add);
    form.resetFields();
    setOpen(true);
  };

  useEffect(() => {
    getInitialData({ page: pageIndex }).then((res) => {
      if (res) {
        setDataSource(res);
      }
    });
  }, [pageIndex]);

  const columns: ColumnsType<any> = [
    {
      key: "_id",
      title: "id",
      dataIndex: "_id",
    },
    {
      key: "lang",
      title: "语言",
      dataIndex: "lang",
      render: (lang: string) => {
        return lang == "cn" ? <span>中文</span> : <span>英文</span>;
      },
    },
    {
      key: "moduleName",
      title: "模板名",
      dataIndex: "moduleName",
    },
    {
      key: "title",
      title: "标题",
      dataIndex: "title",
    },
    {
      key: "descirption",
      title: "描述",
      dataIndex: "descirption",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            title="修改"
            onClick={() => {
              updateModal(record._id);
            }}
          >
            修改
          </Button>
          <Button
            type="link"
            title="删除"
            danger
            onClick={() => {
              Modal.confirm({
                title: "Confirm",
                icon: <ExclamationCircleOutlined />,
                onOk(...args) {
                  deleteModule(record._id).then((res) => {
                    if (res.data == "done") {
                      setDataSource({
                        data: dataSource?.data.filter(
                          (x: { _id: any }) => x._id != record._id
                        ),
                        total: dataSource.total - 1,
                      });
                    }
                  });
                },
                content: "确定删除吗",
                okText: "确认",
                cancelText: "取消",
              });
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  if (!dataSource) return null;
  return (
    <>
      {contextHolder}
      <Row style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Button type="primary" onClick={showModal}>
            新增
          </Button>
          {open ? (
            <ModuleModal
              action={action}
              form={form}
              setOpen={setOpen}
              open={open}
              setDataSource={setDataSource}
              dataSource={dataSource}
              insightsEnable={insightsEnable}
              setInsightsEnable={setInsightsEnable}
              insightsList={insightsList}
              setInsightList={setInsightList}
            />
          ) : null}
          {/* <Modal
            title="新增模板"
            open={open}
            onOk={confirmModal}
            onCancel={hideModal}
            okText="确认"
            cancelText="取消"
          >
            <Form
              form={form}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              onValuesChange={(values) => {
                const changKey = Object.keys(values)?.[0];
                const changValue = Object.values(values)?.[0] as any;
                if (changKey == "tags") {
                  let finalValue = changValue?.map((data: any) => {
                    return Object.assign(
                      data,
                      data.label ? {} : { label: data.value, key: data.value }
                    );
                  });
                  form.setFieldValue(changKey, finalValue);
                } else {
                  form.setFieldValue(changKey, changValue);
                }
              }}
            >
              <Form.Item
                name="lang"
                label="语言"
                rules={[{ required: true, message: "必须选择语言" }]}
              >
                <Select placeholder="Select a option and change input text above">
                  <Option value="cn">中文</Option>
                  <Option value="en">英文</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="type"
                label="类型"
                rules={[{ required: true, message: "必须选择模板类型" }]}
              >
                <Select placeholder="Select a option and change input text above">
                  <Option value="redModule">红底模板</Option>
                  <Option value="blackModule">黑底模板</Option>
                  <Option value="whiteModule">白底模板</Option>
                  <Option value="articles">文章</Option>
                  <Option value="case-studies">案例分析</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="moduleName"
                label="模板名"
                rules={[{ required: true, message: "必须输入模板名" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="title" label="标题">
                <Input />
              </Form.Item>
              <Form.Item name="description" label="描述">
                <Input />
              </Form.Item>
            </Form>
          </Modal> */}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            rowKey="_id"
            dataSource={dataSource?.data}
            columns={columns}
            pagination={false}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 30 }}>
        <Col span={24}>
          <Pagination
            defaultCurrent={1}
            current={pageIndex}
            pageSize={10}
            total={dataSource?.total}
            onChange={(page, pageSize) => {
              SetPageIndex(page);
            }}
          />
        </Col>
      </Row>
    </>
  );
}
