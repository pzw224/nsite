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
  Upload,
  UploadProps,
  Switch,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";

import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { modalType } from "../../../common/interface";
import {
  deletePage,
  addPage,
  updatePage,
  getInitialPage,
  pageDetail,
} from "../../../common/browserapi/pageApi";
import { getInitialData } from "../../../common/browserapi/moduleApi";

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

export default function PageManage() {
  const [dataSource, setDataSource] = useState({ data: [], total: 0 } as any);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [pageIndex, SetPageIndex] = useState(1);
  const [action, setAction] = useState(modalType.add);
  const [loading, setLoading] = useState(false);
  const [moduleList, setModuleList] = useState([]);
  const [parentMenu, setParentMenu] = useState([]);
  const [parentMenuEnable, setParentMenuEnable] = useState(true);

  const [form] = Form.useForm();

  const { Option } = Select;

  const updateModal = (id: any) => {
    setAction(modalType.edit);
    form.resetFields();
    pageDetail(id).then((res) => {
      if (res) {
        form.setFieldsValue(res?.data);
        if (!res?.data?.isTop) {
          setParentMenuEnable(false);
        } else {
          setParentMenuEnable(true);
        }
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

  const confirmModal = () => {
    form.submit();
  };

  const hideModal = () => {
    setOpen(false);
  };

  const onFinish = (values: any) => {
    let formData = form.getFieldsValue(true);
    if (action == modalType.add) {
      addPage(formData).then((res) => {
        if (res && res.data == "添加失败") {
          message.error("添加失败");
          return;
        }
        if (res) {
          setDataSource({
            data: [{ _id: res.insertedId, ...formData }, ...dataSource.data],
            total: dataSource?.total + 1,
          });
        }
      });
    } else {
      updatePage(formData).then((res) => {
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
  };

  useEffect(() => {
    getInitialPage({ page: pageIndex }).then((res) => {
      if (res) {
        setDataSource(res);
        let pm = res?.data
          ?.filter((d: any) => {
            return d.isTop == true;
          })
          .map((o: any) => {
            return { value: o._id, label: o.menuName };
          });
        if (pm) {
          setParentMenu(pm);
        }
      }
    });
    getInitialData({ page: 1, size: 30 }).then((res) => {
      if (res && res.data) {
        setModuleList(
          res.data.map((o: any) => {
            return { value: o._id, label: o.moduleName };
          })
        );
      }
    });
  }, [pageIndex]);

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
        form.setFieldValue("background", url?.toString());
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
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
      key: "menuName",
      title: "菜单名",
      dataIndex: "menuName",
    },
    {
      key: "path",
      title: "路由",
      dataIndex: "path",
    },
    {
      key: "pageTitle",
      title: "标题",
      dataIndex: "pageTitle",
    },
    {
      key: "pageDescription",
      title: "描述",
      dataIndex: "pageDescription",
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
                  deletePage(record._id).then((res) => {
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
                if (changKey == "isTop") {
                  if (!changValue) {
                    setParentMenuEnable(false);
                  } else {
                    setParentMenuEnable(true);
                  }
                  form.setFieldValue(changKey, changValue);
                } else if (changKey == "moduleList") {
                  let finalValue = changValue?.map(
                    (data: any, sortby: number) => {
                      return Object.assign(data, {
                        label: data.label,
                        key: data.key,
                        value: data.value,
                        sortby,
                      });
                    }
                  );
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
                name="isTop"
                label="顶级菜单"
                valuePropName="checked"
                shouldUpdate
              >
                <Switch defaultChecked />
              </Form.Item>
              <Form.Item
                shouldUpdate
                name="parentMenu"
                label="父菜单"
                // rules={[{ required: true, message: "必须选择父菜单" }]}
              >
                <Select
                  disabled={parentMenuEnable}
                  style={{ width: "200px" }}
                  placeholder="父菜单"
                  labelInValue={true}
                  options={parentMenu}
                />
              </Form.Item>
              <Form.Item
                name="menuName"
                label="菜单名"
                rules={[{ required: true, message: "必须填写菜单" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="priority" label="优先级">
                <Select defaultValue={"0"}>
                  <Option value="0">低</Option>
                  <Option value="1">略低</Option>
                  <Option value="2">中</Option>
                  <Option value="3">略高</Option>
                  <Option value="4">最高</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="path"
                label="路由"
                rules={[
                  {
                    pattern: new RegExp("[a-z]+"),
                    message: "必须是a-z 的字母",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="pageTitle" label="标题">
                <Input />
              </Form.Item>
              <Form.Item name="pageDescription" label="描述">
                <Input />
              </Form.Item>
              <Form.Item name="moduleList" label="模板">
                <Select
                  mode="multiple"
                  style={{ width: "200px" }}
                  placeholder="模板"
                  labelInValue={true}
                  options={moduleList}
                />
              </Form.Item>
              <Form.Item
                name="background"
                label="背景图"
                wrapperCol={{ span: 24 }}
              >
                <Upload
                  method="POST"
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={"/api/upload"}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {!!form.getFieldValue("background") ? (
                    <img
                      src={form.getFieldValue("background")}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
            </Form>
          </Modal>
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
