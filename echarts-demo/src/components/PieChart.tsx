'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';

// ERC20前10持仓地址的份额比较饼图
const PieChart = () => {
  // 模拟ERC20前10持仓地址数据
  const option = {
    title: {
      text: 'ERC20前10持仓地址份额比较',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: ['地址1', '地址2', '地址3', '地址4', '地址5', '地址6', '地址7', '地址8', '地址9', '地址10']
    },
    series: [
      {
        name: '持仓份额',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '地址1' },
          { value: 735, name: '地址2' },
          { value: 580, name: '地址3' },
          { value: 484, name: '地址4' },
          { value: 300, name: '地址5' },
          { value: 200, name: '地址6' },
          { value: 150, name: '地址7' },
          { value: 120, name: '地址8' },
          { value: 90, name: '地址9' },
          { value: 60, name: '地址10' }
        ]
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />;
};

export default PieChart;