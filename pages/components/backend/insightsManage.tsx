/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import {
    ExclamationCircleOutlined,
    LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { SelectProps, message, Table, Tag, Space, Button, Modal, Row, Col, Form, Select, FormInstance, Input, Upload, UploadProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';


const options: SelectProps['options'] = [{ label: 'CFO', value: 'CFO' },
{ label: 'Global Economy', value: 'Global Economy' }, { label: 'Network Surveys', value: 'Network Surveys' },
{ label: 'Environmental Social Governance (ESG)', value: 'Environmental Social Governance (ESG)' },
{ label: 'Corporate Responsibility', value: 'Corporate Responsibility' }
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
    return data;
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
    const [formData, setFormData] = useState({})

    const formRef = React.createRef<FormInstance>();
    const { Option } = Select;

    const showModal = () => {
        setOpen(true);
    };

    const confirmModal = () => {
        formRef.current?.submit();
    }

    const hideModal = () => {
        setOpen(false);
    };

    const onFinish = (values: any) => {
        console.log('Success:', formData);

        setOpen(false);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
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

    const tagChang = (value: []) => {
        console.log(value)
    }

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
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
            render: (src: string) => <img src={src} style={{ width: 20, height: 20 }} />,
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
                        let color = data?.tag.length > 15 ? 'geekblue' : 'green';
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
                                deleteInsight(record._id);
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
                            ref={formRef}

                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="lang" label="语言" rules={[{ required: true }]}
                            >
                                <Select
                                    placeholder="Select a option and change input text above"
                                    onChange={onGenderChange}
                                >
                                    <Option value="cn">中文</Option>
                                    <Option value="en">英文</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="type" label="类型" rules={[{ required: true }]}>
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
                                <Input />
                            </Form.Item>
                            <Form.Item name="tags" label="标签" >
                                <Select
                                    mode="tags"
                                    style={{ width: '200px' }}
                                    placeholder="Tags Mode"
                                    onChange={tagChang}
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
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </Form.Item>
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