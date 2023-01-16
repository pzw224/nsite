/* eslint-disable @next/next/no-img-element */
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
  FormInstance,
  Input,
  Upload,
  UploadProps,
  Pagination,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import {
  getInitialData,
  insightsDetail,
  deleteInsight,
  updateInsight,
  addInsight,
} from "../../../common/browserapi/insights";

import "@wangeditor/editor/dist/css/style.css"; // 引入 css
let Editor: any;
let Toolbar: any;
const options: SelectProps["options"] = [
  { label: "CFO", value: "CFO" },
  { label: "Global Economy", value: "economy" },
  { label: "Network Surveys", value: "surveys" },
  { label: "Environmental Social Governance (ESG)", value: "esg" },
  { label: "Corporate Responsibility", value: "responsibility" },
];

interface DataType {
  _id: any;
  pic: string;
  typeN: string;
  title: string;
  tags: any;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
enum modalType {
  add,
  edit,
}

const typeInfo: any = {
  articles: "文章",
  "case-studies": "案例研究",
  videos: "视频",
  whitepapers: "白皮书",
  podcasts: "播客",
};

export default function InsightsManager() {
  const [dataSource, setDataSource] = useState({ data: [], total: 0 } as any);
  const [open, setOpen] = useState(false);
  const [isBrowser, setBrowser] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [pageIndex, SetPageIndex] = useState(1);
  const [action, setAction] = useState(modalType.add);

  const [form] = Form.useForm();

  const { Option } = Select;

  const updateModal = (id: any) => {
    setAction(modalType.edit);
    insightsDetail(id).then((res) => {
      if (res) {
        console.log(res.data);
        const tags = res?.data?.tags;
        let newTags = tags?.map((tag: any) => {
          return { label: tag.tag, value: tag.filter };
        });
        res.data.tags = newTags;
        if (!res?.data?.htmlContent) {
          res.data.htmlContent = "";
        }
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

  const confirmModal = () => {
    form.submit();
  };

  const hideModal = () => {
    setOpen(false);
  };

  const onFinish = (values: any) => {
    let formData = form.getFieldsValue(true);
    formData.tags = formData?.tags.map((tag: any) => {
      return { tag: tag.label, filter: tag.value };
    });
    const tag = formData.type;
    formData.typeN = typeInfo[tag];
    console.log(formData);
    if (action == modalType.add) {
      addInsight(formData).then((res) => {
        console.log(JSON.stringify(res));
        if (res) {
          setDataSource({
            data: [{ _id: res.insertedId, ...formData }, ...dataSource.data],
            total: dataSource?.total + 1,
          });
        }
      });
    } else {
      updateInsight(formData).then((res) => {
        if (res.data == "done") {
          setDataSource({
            data: dataSource?.data?.map((x: any) => {
              if (x._id == formData?._id) {
                return formData;
              }
              return x;
            }),
            total: dataSource.total,
          });
        }
      });
    }
    setOpen(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    messageApi.open({
      type: "error",
      content: "提交失败",
    });
    // console.log('Failed:', errorInfo);
  };

  const [loading, setLoading] = useState(false);

  const [editor, setEditor]: [any, any] = useState(null);

  // 工具栏配置
  const toolbarConfig = {}; // TS 语法
  // 编辑器配置
  const editorConfig = {
    // TS 语法
    placeholder: "请输入内容...",
  };

  useEffect(() => {
    let editorjs = require("@wangeditor/editor-for-react");
    Editor = editorjs.Editor;
    Toolbar = editorjs.Toolbar;
    setBrowser(true);
  }, []);
  useEffect(() => {
    getInitialData({ pageIndex: pageIndex }).then((res) => {
      if (res) {
        setDataSource(res);
      }
    });
  }, [pageIndex]);

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        form.setFieldValue("pic", url?.toString());
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
          <Modal
            title="新增洞见"
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
                rules={[{ required: true, message: "必须选择类型" }]}
              >
                <Select
                  placeholder="Select a option and change input text above"
                  //   onChange={onTypeChange}
                >
                  <Option value="articles">文章</Option>
                  <Option value="case-studies">案例研究</Option>
                  <Option value="videos">视频</Option>
                  <Option value="whitepapers">白皮书</Option>
                  <Option value="podcasts">播客</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="title"
                label="标题"
                rules={[{ required: true, message: "请输入标题!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="author" label="作者">
                <Input />
              </Form.Item>
              <Form.Item name="tags" label="标签">
                <Select
                  mode="tags"
                  style={{ width: "200px" }}
                  placeholder="Tags Mode"
                  labelInValue={true}
                  options={options}
                />
              </Form.Item>
              <Form.Item name="pic" label="图片" wrapperCol={{ span: 24 }}>
                <Upload
                  method="POST"
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {!!form.getFieldValue("pic") ? (
                    <img
                      src={form.getFieldValue("pic")}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
              {isBrowser ? (
                <Form.Item name={"htmlContent"}>
                  <>
                    <Toolbar
                      editor={editor}
                      defaultConfig={toolbarConfig}
                      mode="default"
                      style={{ borderBottom: "1px solid #ccc" }}
                    />
                    <Editor
                      defaultConfig={editorConfig}
                      value={form.getFieldValue("htmlContent")}
                      onCreated={setEditor}
                      onChange={(editor: { getHtml: () => any }) => {
                        form.setFieldValue("htmlContent", editor.getHtml());
                      }}
                      mode="default"
                      style={{ height: "100px", overflowY: "hidden" }}
                    />
                  </>
                </Form.Item>
              ) : null}
            </Form>
          </Modal>
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
