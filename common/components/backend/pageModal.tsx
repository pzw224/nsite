import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Modal,
  Form,
  Select,
  Input,
  Upload,
  message,
  SelectProps,
  UploadProps,
  Switch,
} from "antd";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { addPage, updatePage } from "../../../common/browserapi/pageApi";

import { modalType } from "../../../common/interface";
import { getInitialData } from "../../browserapi/moduleApi";

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

const PageModal = (props: any): any => {
  let {
    form,
    setOpen,
    open,
    setDataSource,
    dataSource,
    action,
    parentMenuEnable,
    setParentMenuEnable,
    moduleList,
    parentMenu,
    setModuleList,
  } = props;
  const { Option } = Select;
  const [messageApi] = message.useMessage();
  const [loading, setLoading] = useState(false);

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

  return (
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
          if (changKey == "lang") {
            getInitialData({ page: 1, size: 30, lang: changValue }).then(
              (res) => {
                if (res && res.data) {
                  setModuleList(
                    res.data.map((o: any) => {
                      return { value: o._id, label: o.moduleName };
                    })
                  );
                }
              }
            );
          }
          if (changKey == "isTop") {
            if (!changValue) {
              setParentMenuEnable(false);
            } else {
              setParentMenuEnable(true);
            }
            form.setFieldValue(changKey, changValue);
          } else if (changKey == "moduleList") {
            let finalValue = changValue?.map((data: any, sortby: number) => {
              return Object.assign(data, {
                label: data.label,
                key: data.key,
                value: data.value,
                sortby,
              });
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
          name="isTop"
          label="顶级菜单"
          valuePropName="checked"
          initialValue={true}
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
        <Form.Item name="priority" label="优先级" initialValue={"0"}>
          <Select>
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
        <Form.Item name="background" label="背景图" wrapperCol={{ span: 24 }}>
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
  );
};

export default PageModal;
