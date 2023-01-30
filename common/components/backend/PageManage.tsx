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
import PageModal from "./pageModal";

export default function PageManage() {
  const [dataSource, setDataSource] = useState({ data: [], total: 0 } as any);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [pageIndex, SetPageIndex] = useState(1);
  const [action, setAction] = useState(modalType.add);
  const [moduleList, setModuleList] = useState([]);
  const [parentMenu, setParentMenu] = useState([]);
  const [parentMenuEnable, setParentMenuEnable] = useState(true);

  const [form] = Form.useForm();

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

  useEffect(() => {
    getInitialData({ page: 1, size: 30 }).then((res) => {
      if (res && res.data) {
        setModuleList(
          res.data.map((o: any) => {
            return { value: o._id, label: o.moduleName };
          })
        );
      }
    });
  }, []);

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
      key: "background",
      title: "背景",
      dataIndex: "background",
      render: (src: string) =>
        src ? <img src={src} style={{ width: 20, height: 20 }} /> : null,
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
          {open ? (
            <PageModal
              action={action}
              form={form}
              setOpen={setOpen}
              open={open}
              setDataSource={setDataSource}
              dataSource={dataSource}
              parentMenuEnable={parentMenuEnable}
              setParentMenuEnable={setParentMenuEnable}
              moduleList={moduleList}
              parentMenu={parentMenu}
              setModuleList={setModuleList}
            />
          ) : null}
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
