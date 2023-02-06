import React, { useEffect, useState } from "react";
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
import { modalType } from "../../../common/interface";
import {
  deleteModule,
  addModule,
  updateModule,
  moduleDetail,
} from "../../../common/browserapi/moduleApi";
import { getInitialData } from "../../browserapi/insights";

function debounce(fn: any, delay: number) {
  var timer: any = null;
  return function () {
    var context: any = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

const ModuleModal = (props: any): any => {
  let {
    form,
    setOpen,
    open,
    setDataSource,
    dataSource,
    action,
    insightsEnable,
    setInsightsEnable,
    insightsList,
    setInsightList,
  } = props;

  const [messageApi, contextHolder] = message.useMessage();
  const { Option } = Select;
  const onFinish = (values: any) => {
    let formData = form.getFieldsValue(true);
    if (action == modalType.add) {
      addModule(formData).then((res) => {
        if (res) {
          setDataSource({
            data: [{ _id: res.insertedId, ...formData }, ...dataSource.data],
            total: dataSource?.total + 1,
          });
        }
      });
    } else {
      updateModule(formData).then((res) => {
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

  const confirmModal = () => {
    form.submit();
  };

  const hideModal = () => {
    setOpen(false);
  };

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

          if (changKey == "type" || changKey == "lang") {
            if (!!form.getFieldValue("type") && !!form.getFieldValue("lang")) {
              if (changValue == "case-studies" || changValue == "articles") {
                setInsightsEnable(false);
                getInitialData({
                  page: 1,
                  size: 30,
                  type: form.getFieldValue("type"),
                  lang: form.getFieldValue("lang"),
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
            } else {
              setInsightsEnable(true);
            }
          }

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
        <Form.Item shouldUpdate name="insightsList" label="选择文章">
          <Select
            showSearch
            disabled={insightsEnable}
            mode="multiple"
            labelInValue={true}
            options={insightsList}
            filterOption={false}
            onSearch={debounce((v: any) => {
              getInitialData({
                page: 1,
                size: 30,
                type: form.getFieldValue("type"),
                lang: form.getFieldValue("lang"),
                q: v,
              }).then((res) => {
                if (res && res.data) {
                  setInsightList(
                    res.data.map((o: any) => {
                      return { value: o._id, label: o.title };
                    })
                  );
                }
              });
            }, 500)}
          />
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
    </Modal>
  );
};

export default ModuleModal;
