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


export const BackendPage = (props: { selectData: string }) => {
  const { selectData } = props;


  if (selectData == '3') return (<InsightsManager />)

  return (
    null
  )
}
