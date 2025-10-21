'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// 使用dynamic导入以避免SSR问题
const LineChart = dynamic(() => import('@/components/LineChart'), { ssr: false });
const BarChart = dynamic(() => import('@/components/BarChart'), { ssr: false });
const PieChart = dynamic(() => import('@/components/PieChart'), { ssr: false });
const CandlestickChart = dynamic(() => import('@/components/CandlestickChart'), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Web3 数据可视化</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl">
        <div className="bg-white p-4 rounded-lg shadow-md chart-container">
          <LineChart />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md chart-container">
          <BarChart />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md chart-container">
          <PieChart />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md chart-container">
          <CandlestickChart />
        </div>
      </div>
    </main>
  );
}
