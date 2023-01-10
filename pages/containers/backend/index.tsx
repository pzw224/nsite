import React, { useEffect, useState } from 'react';
import InsightsManager from '../../components/backend/insightsManage';


export const BackendPage = (props: { selectData: string }) => {
  const { selectData } = props;


  if (selectData == '3') return (<InsightsManager />)

  return (
    null
  )
}
