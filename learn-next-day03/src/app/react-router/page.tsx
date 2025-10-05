'use client';

import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';

// 组件: 首页
function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">React Router Hooks 示例</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/react-router/use-params/123" className="p-4 border rounded-lg hover:bg-gray-100">
          <h2 className="text-xl font-semibold">useParams</h2>
          <p>获取URL参数</p>
        </Link>
        
        <Link to="/react-router/use-navigate" className="p-4 border rounded-lg hover:bg-gray-100">
          <h2 className="text-xl font-semibold">useNavigate</h2>
          <p>编程式导航</p>
        </Link>
        
        <Link to="/react-router/use-location" className="p-4 border rounded-lg hover:bg-gray-100">
          <h2 className="text-xl font-semibold">useLocation</h2>
          <p>获取当前位置信息</p>
        </Link>
      </div>
      
      <div className="mt-8">
        <Link to="/" className="text-blue-500 hover:underline">返回首页</Link>
      </div>
    </div>
  );
}

// 组件: useParams示例
function UseParamsExample() {
  const { id } = useParams();
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">useParams Hook 示例</h1>
      
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">URL参数</h2>
        <p className="mb-4">当前URL参数: <span className="font-bold">{id}</span></p>
        <p>尝试更改URL中的ID值，然后刷新页面查看效果</p>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">useParams 说明</h2>
        <p>useParams 用于获取URL中的动态参数。</p>
        <pre className="bg-gray-800 text-white p-4 rounded mt-2 overflow-x-auto">
{`// 在路由定义中
<Route path="/users/:id" element={<UserDetail />} />

// 在组件中使用
function UserDetail() {
  const { id } = useParams();
  // id 将包含URL中的动态参数值
}`}
        </pre>
      </div>
      
      <div className="mt-8">
        <Link to="/react-router" className="text-blue-500 hover:underline">返回React Router Hooks列表</Link>
      </div>
    </div>
  );
}

// 组件: useNavigate示例
function UseNavigateExample() {
  const navigate = useNavigate();
  const [path, setPath] = useState('');
  
  const handleNavigate = () => {
    if (path) {
      navigate(path);
    }
  };
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">useNavigate Hook 示例</h1>
      
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">编程式导航</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="输入路径 (例如: /react-router)"
            className="flex-1 border rounded px-2 py-1"
          />
          <button 
            onClick={handleNavigate}
            className="px-4 py-1 bg-blue-500 text-white rounded"
          >
            导航
          </button>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => navigate(-1)}
            className="px-4 py-1 bg-gray-500 text-white rounded"
          >
            返回上一页
          </button>
          <button 
            onClick={() => navigate(1)}
            className="px-4 py-1 bg-gray-500 text-white rounded"
          >
            前进一页
          </button>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">useNavigate 说明</h2>
        <p>useNavigate 用于编程式导航，替代了旧版的useHistory。</p>
        <pre className="bg-gray-800 text-white p-4 rounded mt-2 overflow-x-auto">
{`// 基本用法
const navigate = useNavigate();

// 导航到指定路径
navigate('/home');

// 带状态导航
navigate('/user', { state: { id: 1 } });

// 返回上一页
navigate(-1);

// 前进一页
navigate(1);`}
        </pre>
      </div>
      
      <div className="mt-8">
        <Link to="/react-router" className="text-blue-500 hover:underline">返回React Router Hooks列表</Link>
      </div>
    </div>
  );
}

// 组件: useLocation示例
function UseLocationExample() {
  const location = useLocation();
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">useLocation Hook 示例</h1>
      
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">当前位置信息</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p><strong>pathname:</strong> {location.pathname}</p>
          <p><strong>search:</strong> {location.search}</p>
          <p><strong>hash:</strong> {location.hash}</p>
          <p><strong>state:</strong> {JSON.stringify(location.state)}</p>
          <p><strong>key:</strong> {location.key}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <Link 
          to={`${location.pathname}?query=test#section1`}
          className="text-blue-500 hover:underline"
        >
          添加查询参数和哈希
        </Link>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">useLocation 说明</h2>
        <p>useLocation 返回当前URL的location对象，包含pathname、search、hash等信息。</p>
        <pre className="bg-gray-800 text-white p-4 rounded mt-2 overflow-x-auto">
{`// 基本用法
const location = useLocation();

// location对象包含:
// - pathname: URL路径
// - search: 查询字符串
// - hash: URL哈希
// - state: 导航时传递的状态
// - key: 位置的唯一标识`}
        </pre>
      </div>
      
      <div className="mt-8">
        <Link to="/react-router" className="text-blue-500 hover:underline">返回React Router Hooks列表</Link>
      </div>
    </div>
  );
}

// 主应用组件
export default function ReactRouterPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/react-router" element={<HomePage />} />
        <Route path="/react-router/use-params/:id" element={<UseParamsExample />} />
        <Route path="/react-router/use-navigate" element={<UseNavigateExample />} />
        <Route path="/react-router/use-location" element={<UseLocationExample />} />
      </Routes>
    </BrowserRouter>
  );
}