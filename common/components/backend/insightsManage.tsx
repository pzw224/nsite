/* eslint-disable @next/next/no-img-element */
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  message,
  Table,
  Tag,
  Space,
  Button,
  Modal,
  Row,
  Col,
  Form,
  Pagination,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  getInitialData,
  insightsDetail,
  deleteInsight,
} from "../../../common/browserapi/insights";
import FormModal from "./formModal";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

interface DataType {
  _id: any;
  lang: string;
  pic: string;
  typeN: string;
  title: string;
  author: string;
  tags: any;
}

enum modalType {
  add,
  edit,
}

export default function InsightsManager() {
  const [dataSource, setDataSource] = useState({ data: [], total: 0 } as any);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [pageIndex, SetPageIndex] = useState(1);
  const [action, setAction] = useState(modalType.add);

  const [form] = Form.useForm();
  const updateModal = (id: any) => {
    setAction(modalType.edit);
    insightsDetail(id).then((res) => {
      if (res) {
        const tags = res?.data?.tags;
        let newTags = tags?.map((tag: any) => {
          return { label: tag.tag, value: tag.filter };
        });
        res.data.tags = newTags;
        if (!res?.data?.htmlContent) {
          res.data.htmlContent = "";
        }
        form.resetFields();
        form.setFieldsValue(res?.data);
      }
      setOpen(true);
    });
  };

  const showModal = () => {
    setAction(modalType.add);
    form.resetFields();
    // form.setFieldsValue({ title: "", htmlContent: "", pic: "", tags: [] });
    setOpen(true);
  };

  useEffect(() => {
    getInitialData({ page: pageIndex }).then((res) => {
      if (res) {
        setDataSource(res);
      }
    });
  }, [pageIndex]);

  const columns: ColumnsType<DataType> = [
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
      key: "pic",
      title: "图片",
      dataIndex: "pic",
      render: (src: string) =>
        src ? <img src={src} style={{ width: 20, height: 20 }} /> : null,
    },
    {
      key: "typeN",
      title: "类型",
      dataIndex: "typeN",
    },
    {
      key: "title",
      title: "标题",
      dataIndex: "title",
    },
    {
      key: "author",
      title: "作者简介",
      dataIndex: "author",
    },
    {
      title: "tags",
      key: "标记",
      dataIndex: "tags",
      render: (_: any, record: { tags: [{ tag: string; filter: string }] }) => (
        <>
          {record?.tags?.map((data) => {
            let color = data?.tag?.length > 15 ? "geekblue" : "green";
            if (data?.tag === "CFO") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={data?.tag}>
                {data?.tag}
              </Tag>
            );
          })}
        </>
      ),
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
                  deleteInsight(record._id).then((res) => {
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
            <FormModal
              action={action}
              form={form}
              setOpen={setOpen}
              open={open}
              setDataSource={setDataSource}
              dataSource={dataSource}
            />
          ) : null}
        </Col>
        <Col span={6}></Col>
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
