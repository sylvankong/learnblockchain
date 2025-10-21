'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';

// DeFi借贷业务TVL变化的折线图
const LineChart = () => {
  // 模拟DeFi借贷业务TVL数据
  const option = {
    title: {
      text: 'DeFi借贷业务TVL变化趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{a} <br/>{b}: {c} 百万美元'
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLabel: {
        rotate: 30
      }
    },
    yAxis: {
      type: 'value',
      name: 'TVL (百万美元)',
      nameLocation: 'middle',
      nameGap: 40
    },
    series: [
      {
        name: 'Aave',
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
        itemStyle: {
          color: '#5470c6'
        }
      },
      {
        name: 'Compound',
        type: 'line',
        smooth: true,
        data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149],
        itemStyle: {
          color: '#91cc75'
        }
      },
      {
        name: 'MakerDAO',
        type: 'line',
        smooth: true,
        data: [150, 232, 201, 154, 190, 330, 410, 320, 332, 301, 334, 390],
        itemStyle: {
          color: '#fac858'
        }
      }
    ],
    legend: {
      data: ['Aave', 'Compound', 'MakerDAO'],
      bottom: 0
    },
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

export default LineChart;