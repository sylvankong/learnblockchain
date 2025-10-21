'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';

// 代币价格走向的K线图
const CandlestickChart = () => {
  // 模拟代币价格数据 [开盘价, 收盘价, 最低价, 最高价]
  const data = [
    ['2023/1/1', 2320.26, 2320.26, 2287.3, 2362.94],
    ['2023/1/2', 2300, 2291.3, 2288.26, 2308.38],
    ['2023/1/3', 2295.35, 2346.5, 2295.35, 2346.92],
    ['2023/1/4', 2347.22, 2358.98, 2337.35, 2363.8],
    ['2023/1/5', 2360.75, 2382.48, 2347.89, 2383.76],
    ['2023/1/6', 2383.43, 2385.42, 2371.23, 2391.82],
    ['2023/1/7', 2377.41, 2419.02, 2369.57, 2421.15],
    ['2023/1/8', 2425.92, 2428.15, 2417.58, 2440.38],
    ['2023/1/9', 2411, 2433.13, 2403.3, 2437.42],
    ['2023/1/10', 2432.68, 2434.48, 2427.7, 2441.73],
    ['2023/1/11', 2430.69, 2418.53, 2394.22, 2433.89],
    ['2023/1/12', 2416.62, 2432.4, 2414.4, 2443.03],
    ['2023/1/13', 2441.91, 2421.56, 2415.43, 2444.8],
    ['2023/1/14', 2420.26, 2382.91, 2373.53, 2427.07],
    ['2023/1/15', 2383.49, 2397.18, 2370.61, 2397.94],
    ['2023/1/16', 2378.82, 2325.95, 2309.17, 2378.82],
    ['2023/1/17', 2322.94, 2314.16, 2308.76, 2330.88],
    ['2023/1/18', 2320.62, 2325.82, 2315.01, 2338.78],
    ['2023/1/19', 2313.74, 2293.34, 2289.89, 2340.71],
    ['2023/1/20', 2297.77, 2313.22, 2292.03, 2324.63]
  ];

  const option = {
    title: {
      text: 'ETH价格走势图',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      formatter: function (params) {
        const param = params[0];
        return [
          '日期: ' + param.name + '<hr size=1 style="margin: 3px 0">',
          '开盘价: ' + param.data[1] + '<br/>',
          '收盘价: ' + param.data[2] + '<br/>',
          '最低价: ' + param.data[3] + '<br/>',
          '最高价: ' + param.data[4] + '<br/>'
        ].join('');
      }
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item[0]),
      scale: true,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      axisLabel: {
        rotate: 30
      }
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      },
      {
        show: true,
        type: 'slider',
        top: '90%',
        start: 0,
        end: 100
      }
    ],
    series: [
      {
        name: 'ETH价格',
        type: 'candlestick',
        data: data.map(item => item.slice(1)),
        itemStyle: {
          color: '#ef232a',
          color0: '#14b143',
          borderColor: '#ef232a',
          borderColor0: '#14b143'
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />;
};

export default CandlestickChart;