'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';

// 不同DEX的交易量比较柱状图
const BarChart = () => {
  // 模拟不同DEX的交易量数据
  const option = {
    title: {
      text: '不同DEX的交易量比较',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: '{b}: {c} 百万美元'
    },
    xAxis: {
      type: 'category',
      data: ['Uniswap', 'SushiSwap', 'PancakeSwap', 'Curve', 'Balancer', 'dYdX', '1inch'],
      axisLabel: {
        rotate: 30
      }
    },
    yAxis: {
      type: 'value',
      name: '交易量 (百万美元/天)',
      nameLocation: 'middle',
      nameGap: 40
    },
    series: [
      {
        name: '交易量',
        type: 'bar',
        data: [1200, 800, 950, 500, 320, 480, 390],
        itemStyle: {
          color: function(params) {
            const colorList = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452'];
            return colorList[params.dataIndex];
          }
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}'
        }
      }
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true
    }
  };

  return <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />;
};

export default BarChart;