import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme, Table, Tag, Space, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import InsightsManager from '../../components/backend/insightsManage';

async function getInitialData() {
  let data = await fetch("/api/insightsList");
  return data.json();
}

export const BackendPage = (props: { selectData: string }) => {
  const { selectData } = props;

  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    switch (selectData) {
      case '1':


        break;
      case '2':
        break;
      case '3':
        getInitialData().then((res) => {
          if (res && res?.length > 0) {
            console.log(res);
            setDataSource(res);
          }
        });
        break;
    }
  }, [selectData]);


  if (selectData == '3') return (<InsightsManager setDataSource={setDataSource} dataSource={dataSource} />)

  return (
    null
  )
}
