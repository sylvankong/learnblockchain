'use client';

import Link from 'next/link';

export default function HooksPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">React Hooks 示例 (App Router)</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/hooks/useState" className="p-4 border rounded-lg hover:bg-gray-100">
          <h2 className="text-xl font-semibold">useState</h2>
          <p>状态管理的基础Hook</p>
        </Link>
        
        <Link href="/hooks/useEffect" className="p-4 border rounded-lg hover:bg-gray-100">
          <h2 className="text-xl font-semibold">useEffect</h2>
          <p>处理副作用的Hook</p>
        </Link>
        
        <Link href="/hooks/useContext" className="p-4 border rounded-lg hover:bg-gray-100">
          <h2 className="text-xl font-semibold">useContext</h2>
          <p>跨组件共享状态</p>
        </Link>
        
        <Link href="/hooks/useReducer" className="p-4 border rounded-lg hover:bg-gray-100">
          <h2 className="text-xl font-semibold">useReducer</h2>
          <p>复杂状态管理</p>
        </Link>
        
        <Link href="/hooks/useCallback" className="p-4 border rounded-lg hover:bg-gray-100">
          <h2 className="text-xl font-semibold">useCallback</h2>
          <p>记忆化回调函数</p>
        </Link>
        
        <Link href="/hooks/useMemo" className="p-4 border rounded-lg hover:bg-gray-100">
          <h2 className="text-xl font-semibold">useMemo</h2>
          <p>记忆化计算结果</p>
        </Link>
        
        <Link href="/hooks/useRef" className="p-4 border rounded-lg hover:bg-gray-100">
          <h2 className="text-xl font-semibold">useRef</h2>
          <p>引用DOM元素和保存变量</p>
        </Link>
        
        <Link href="/hooks/useLayoutEffect" className="p-4 border rounded-lg hover:bg-gray-100">
          <h2 className="text-xl font-semibold">useLayoutEffect</h2>
          <p>同步执行副作用</p>
        </Link>
        
        <Link href="/hooks/useImperativeHandle" className="p-4 border rounded-lg hover:bg-gray-100">
          <h2 className="text-xl font-semibold">useImperativeHandle</h2>
          <p>自定义暴露给父组件的实例值</p>
        </Link>
      </div>
      
      <div className="mt-8">
        <Link href="/" className="text-blue-500 hover:underline">
          返回首页
        </Link>
      </div>
    </div>
  );
}