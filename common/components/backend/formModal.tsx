import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  ExclamationCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Modal,
  Form,
  Select,
  Input,
  Upload,
  message,
  SelectProps,
  UploadProps,
} from "antd";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { updateInsight, addInsight } from "../../../common/browserapi/insights";
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/jpg" ||
    file.type === "image/png";
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

const options: SelectProps["options"] = [
  { label: "CFO", value: "CFO" },
  { label: "Global Economy", value: "economy" },
  { label: "Network Surveys", value: "surveys" },
  { label: "Environmental Social Governance (ESG)", value: "esg" },
  { label: "Corporate Responsibility", value: "responsibility" },
];

const typeInfo: any = {
  articles: "文章",
  "case-studies": "案例研究",
  videos: "视频",
  whitepapers: "白皮书",
  podcasts: "播客",
};
const FormModal = (props: any): any => {
  let { form, setOpen, open, setDataSource, dataSource, action } = props;
  const { Option } = Select;
  const [messageApi, contextHolder] = message.useMessage();
  const [editor, setEditor]: [any, any] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  let editorjs = require("@wangeditor/editor-for-react");
  let Editor = editorjs.Editor;
  let Toolbar = editorjs.Toolbar;

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  // 工具栏配置
  const toolbarConfig = {}; // TS 语法
  // 编辑器配置
  const editorConfig = {
    // TS 语法
    placeholder: "请输入内容...",
  };
  const confirmModal = () => {
    form.submit();
  };

  const hideModal = () => {
    setOpen(false);
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

  const onFinish = (values: any) => {
    let formData = form.getFieldsValue(true);
    formData.tags = formData?.tags?.map((tag: any) => {
      return { tag: tag.label, filter: tag.value };
    });
    const tag = formData.type;
    formData.typeN = typeInfo[tag];
    if (action == modalType.add) {
      addInsight(formData).then((res) => {
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

  return (
    <>
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
          <Form.Item name="description" label="描述">
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
    </>
  );
};

export default FormModal;
