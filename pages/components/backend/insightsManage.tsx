/* eslint-disable @next/next/no-img-element */
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import {
    ExclamationCircleOutlined,
    LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons';
import {
    SelectProps, message, Table, Tag, Space, Button, Modal, Row, Col,
    Form, Select, FormInstance, Input, Upload, UploadProps,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';

import '@wangeditor/editor/dist/css/style.css' // 引入 css
let Editor: any;
let Toolbar: any;
const options: SelectProps['options'] = [{ label: 'CFO', value: 'CFO' },
{ label: 'Global Economy', value: 'economy' }, { label: 'Network Surveys', value: 'surveys' },
{ label: 'Environmental Social Governance (ESG)', value: 'esg' },
{ label: 'Corporate Responsibility', value: 'responsibility' }
];

interface DataType {
    _id: any;
    pic: string;
    typeN: string;
    title: string;
    tags: string[];
}

async function deleteInsight(id: string) {
    let data = await fetch('/api/deleteInsights', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
    });
    return data.json();
}

async function addInsight(body: any) {
    let data = await fetch('/api/addInsights', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return data.json();
}


const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};


export default function InsightsManager({ dataSource, setDataSource }: any) {
    const [open, setOpen] = useState(false);
    const [isBrowser, setBrowser] = useState(false);
    const [formData, setFormData] = useState({ htmlContent: '', pic: '', tags: [] });
    const [messageApi, contextHolder] = message.useMessage();


    const [form] = Form.useForm();

    const { Option } = Select;

    const showModal = () => {
        form.resetFields();
        setFormData({ htmlContent: '', pic: '', tags: [] })
        setOpen(true);
    };

    const confirmModal = () => {
        form.submit();
    }

    const hideModal = () => {
        setOpen(false);
    };

    const onFinish = (values: any) => {
        addInsight(formData).then((res) => {
            console.log(JSON.stringify(res));
            if (res) {
                setDataSource([{ _id: res.insertedId, ...formData }, ...dataSource]);
            }
        });
        setOpen(false);
    };

    const onFinishFailed = (errorInfo: any) => {
        messageApi.open({
            type: 'error',
            content: '提交失败',
        });
        // console.log('Failed:', errorInfo);
    };

    const onGenderChange = (value: string) => {
        switch (value) {
            case 'cn':
                setFormData(Object.assign(formData, { lang: 'cn' }));
                return;
            case 'en':
                setFormData(Object.assign(formData, { lang: 'en' }));
                return;
            default:
        }
    }

    const onTypeChange = (value: string) => {
        switch (value) {
            case 'articles':
                setFormData(Object.assign(formData, { type: value, typeN: '文章' }));
                return;
            case 'case-studies':
                setFormData(Object.assign(formData, { type: value, typeN: '案例研究' }));
                return;
            case 'videos':
                setFormData(Object.assign(formData, { type: value, typeN: '视频' }));
                return;
            case 'whitepapers':
                setFormData(Object.assign(formData, { type: value, typeN: '白皮书' }));
                return;
            case 'podcasts':
                setFormData(Object.assign(formData, { type: value, typeN: '播客' }));
                return;

            default:
        }
    }

    const tagChange = (value: [any]) => {
        setFormData(Object.assign(formData, { tags: value?.map(tag => { return { tag: tag.label, filter: tag.value } }) }))
    }

    const [loading, setLoading] = useState(false);


    const [editor, setEditor]: [any, any] = useState(null)

    // 工具栏配置
    const toolbarConfig = {}  // TS 语法
    // 编辑器配置
    const editorConfig = {    // TS 语法
        placeholder: '请输入内容...',
    }

    useEffect(() => {
        let editorjs = require('@wangeditor/editor-for-react')
        Editor = editorjs.Editor;
        Toolbar = editorjs.Toolbar;
        setBrowser(true);
    }, [])

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setFormData(Object.assign(formData, { pic: url?.toString() }))
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
            key: '_id',
            title: 'id',
            dataIndex: '_id',
        },
        {
            key: 'lang',
            title: '语言',
            dataIndex: 'lang',
            render: (lang: string) => { return lang == 'cn' ? <span>中文</span> : <span>英文</span> }
        },
        {
            key: 'pic',
            title: '图片',
            dataIndex: 'pic',
            render: (src: string) => src ? <img src={src} style={{ width: 20, height: 20 }} /> : null,
        },
        {
            key: 'typeN',
            title: '类型',
            dataIndex: 'typeN',
        },
        {
            key: 'title',
            title: '标题',
            dataIndex: 'title',
        },
        {
            title: 'tags',
            key: '标记',
            dataIndex: 'tags',
            render: (_: any, record: { tags: [{ tag: string, filter: string }] }) => (
                <>
                    {record?.tags?.map((data) => {
                        let color = data?.tag?.length > 15 ? 'geekblue' : 'green';
                        if (data?.tag === 'CFO') {
                            color = 'volcano';
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
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" title='修改'>修改</Button>
                    <Button type="link" title='删除' danger onClick={() => {
                        Modal.confirm({
                            title: 'Confirm',
                            icon: <ExclamationCircleOutlined />,
                            onOk(...args) {
                                deleteInsight(record._id).then((res) => {
                                    if (res.data == 'done') {
                                        setDataSource(dataSource?.filter((x: { _id: any; }) => x._id != record._id));
                                    }
                                });
                            },
                            content: '确定删除吗',
                            okText: '确认',
                            cancelText: '取消',
                        });
                    }}>删除</Button>
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
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="lang" label="语言" rules={[{ required: true, message: '必须选择语言' }]}
                            >
                                <Select
                                    placeholder="Select a option and change input text above"
                                    onChange={onGenderChange}
                                >
                                    <Option value="cn">中文</Option>
                                    <Option value="en">英文</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="type" label="类型" rules={[{ required: true, message: '必须选择类型' }]}>
                                <Select
                                    placeholder="Select a option and change input text above"
                                    onChange={onTypeChange}
                                >
                                    <Option value="articles">文章</Option>
                                    <Option value="case-studies">案例研究</Option>
                                    <Option value="videos">视频</Option>
                                    <Option value="whitepapers">白皮书</Option>
                                    <Option value="podcasts">播客</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题!' }]}>
                                <Input onChange={(title) => { setFormData(Object.assign(formData, { title: title?.target?.value })); }} />
                            </Form.Item>
                            <Form.Item name="tags" label="标签" >
                                <Select
                                    mode="tags"
                                    style={{ width: '200px' }}
                                    placeholder="Tags Mode"
                                    labelInValue={true}
                                    onChange={tagChange}
                                    options={options}
                                />
                            </Form.Item>
                            <Form.Item name="pic" label="图片" wrapperCol={{ span: 24 }}>
                                <Upload
                                    method='POST'
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}

                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                >
                                    {formData?.pic ? <img src={formData?.pic} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </Form.Item>
                            {isBrowser ?
                                <Form.Item>
                                    <Toolbar
                                        editor={editor}
                                        defaultConfig={toolbarConfig}
                                        mode="default"
                                        style={{ borderBottom: '1px solid #ccc' }}
                                    />
                                    <Editor
                                        defaultConfig={editorConfig}
                                        value={formData?.htmlContent}
                                        onCreated={setEditor}
                                        onChange={(editor: { getHtml: () => any; }) => {
                                            console.log(editor.getHtml())
                                            setFormData(Object.assign(formData, { htmlContent: editor.getHtml() }))
                                        }}
                                        mode="default"
                                        style={{ height: '100px', overflowY: 'hidden' }}
                                    />
                                </Form.Item>
                                : null}
                        </Form>
                    </Modal>
                </Col>
                <Col span={6}>

                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table rowKey="_id" dataSource={dataSource} columns={columns} />
                </Col>
            </Row>
        </>
    )
}