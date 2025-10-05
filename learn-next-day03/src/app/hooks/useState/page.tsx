'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UseStatePage() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [items, setItems] = useState<string[]>([]);

  const addItem = () => {
    if (text.trim()) {
      setItems([...items, text]);
      setText('');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">useState Hook 示例</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">计数器示例</h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCount(count - 1)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              减少
            </button>
            <span className="text-2xl">{count}</span>
            <button 
              onClick={() => setCount(count + 1)}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              增加
            </button>
          </div>
          <button 
            onClick={() => setCount(0)}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
          >
            重置
          </button>
        </div>
        
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">待办事项列表</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 border rounded px-2 py-1"
              placeholder="输入新项目"
            />
            <button 
              onClick={addItem}
              className="px-4 py-1 bg-blue-500 text-white rounded"
            >
              添加
            </button>
          </div>
          <ul className="list-disc pl-5">
            {items.map((item, index) => (
              <li key={index} className="mb-1">{item}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-8">
        <Link href="/hooks" className="text-blue-500 hover:underline">
          返回Hooks列表
        </Link>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">useState 说明</h2>
        <p>useState 是 React 中最基础的 Hook，用于在函数组件中添加状态。</p>
        <pre className="bg-gray-800 text-white p-4 rounded mt-2 overflow-x-auto">
{`// 基本语法
const [state, setState] = useState(initialState);

// 使用函数更新状态（当新状态依赖于旧状态时推荐使用）
setState(prevState => prevState + 1);`}
        </pre>
      </div>
    </div>
  );
}