"use client";

import { useState, useEffect } from 'react';
import { performPow, PowResult } from '@/lib/pow';

export default function Home() {
  const [nickname, setNickname] = useState('Alice');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result4Zeros, setResult4Zeros] = useState<PowResult | null>(null);
  const [result5Zeros, setResult5Zeros] = useState<PowResult | null>(null);

  const handleCalculate = async () => {
    if (!nickname.trim() || isCalculating) return;
    
    setIsCalculating(true);
    setResult4Zeros(null);
    setResult5Zeros(null);
    
    // 使用Web Worker或setTimeout来避免UI阻塞
    setTimeout(async () => {
      try {
        // 计算4个0开头的哈希
        const result4 = performPow(nickname, 4);
        setResult4Zeros(result4);
        
        // 计算5个0开头的哈希
        const result5 = performPow(nickname, 5);
        setResult5Zeros(result5);
      } catch (error) {
        console.error('计算出错:', error);
      } finally {
        setIsCalculating(false);
      }
    }, 100);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6">POW工作量证明演示</h1>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">您的昵称:</label>
          <div className="flex gap-4">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入昵称"
              disabled={isCalculating}
            />
            <button
              onClick={handleCalculate}
              disabled={isCalculating || !nickname.trim()}
              className={`px-6 py-2 rounded-md text-white ${
                isCalculating || !nickname.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isCalculating ? '计算中...' : '开始计算'}
            </button>
          </div>
        </div>

        {isCalculating && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-gray-600">正在计算中，这可能需要一些时间...</p>
          </div>
        )}

        {result4Zeros && (
          <div className="mb-6 p-4 border rounded-md bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">4个0开头的哈希结果</h2>
            <div className="space-y-2">
              <p><span className="font-medium">昵称 + Nonce:</span> {result4Zeros.nickname + result4Zeros.nonce}</p>
              <p><span className="font-medium">Nonce值:</span> {result4Zeros.nonce}</p>
              <p><span className="font-medium">哈希值:</span> <span className="font-mono text-sm break-all">{result4Zeros.hash}</span></p>
              <p><span className="font-medium">计算时间:</span> {result4Zeros.timeSpent.toFixed(2)} 毫秒</p>
            </div>
          </div>
        )}

        {result5Zeros && (
          <div className="p-4 border rounded-md bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">5个0开头的哈希结果</h2>
            <div className="space-y-2">
              <p><span className="font-medium">昵称 + Nonce:</span> {result5Zeros.nickname + result5Zeros.nonce}</p>
              <p><span className="font-medium">Nonce值:</span> {result5Zeros.nonce}</p>
              <p><span className="font-medium">哈希值:</span> <span className="font-mono text-sm break-all">{result5Zeros.hash}</span></p>
              <p><span className="font-medium">计算时间:</span> {result5Zeros.timeSpent.toFixed(2)} 毫秒</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
