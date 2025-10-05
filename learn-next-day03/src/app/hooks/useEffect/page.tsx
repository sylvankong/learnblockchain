'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UseEffectPage() {
  const [count, setCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [data, setData] = useState<{title: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 基本的useEffect - 每次渲染后执行
  useEffect(() => {
    document.title = `点击了 ${count} 次`;
  }, [count]);

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // 初始化窗口宽度
    setWindowWidth(window.innerWidth);
    
    // 添加事件监听器
    window.addEventListener('resize', handleResize);
    
    // 清除函数 - 组件卸载时执行
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 模拟数据获取
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 模拟API请求
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData([
          { title: '学习React' },
          { title: '掌握Hooks' },
          { title: '构建应用' }
        ]);
      } catch (error) {
        console.error('获取数据失败', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">useEffect Hook 示例</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">文档标题更新</h2>
          <p className="mb-4">当前计数: {count}</p>
          <button 
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            增加计数
          </button>
          <p className="mt-4 text-gray-600">
            查看浏览器标签标题，它会随着计数变化而更新
          </p>
        </div>
        
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">窗口大小监听</h2>
          <p>当前窗口宽度: {windowWidth}px</p>
          <p className="mt-4 text-gray-600">
            尝试调整浏览器窗口大小，这个值会自动更新
          </p>
        </div>
      </div>
      
      <div className="mt-8 border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">数据获取示例</h2>
        {isLoading ? (
          <p>加载中...</p>
        ) : (
          <ul className="list-disc pl-5">
            {data.map((item, index) => (
              <li key={index} className="mb-1">{item.title}</li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="mt-8">
        <Link href="/hooks" className="text-blue-500 hover:underline">
          返回Hooks列表
        </Link>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">useEffect 说明</h2>
        <p>useEffect 用于处理函数组件中的副作用，如数据获取、订阅、手动DOM操作等。</p>
        <pre className="bg-gray-800 text-white p-4 rounded mt-2 overflow-x-auto">
{`// 基本语法
useEffect(() => {
  // 副作用代码
  
  // 可选的清除函数
  return () => {
    // 清除副作用的代码
  };
}, [依赖项数组]);

// 每次渲染后执行
useEffect(() => { ... });

// 仅在组件挂载和卸载时执行
useEffect(() => { ... }, []);

// 仅在依赖项变化时执行
useEffect(() => { ... }, [dependency1, dependency2]);`}
        </pre>
      </div>
    </div>
  );
}