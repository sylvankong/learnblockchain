'use client';

import { createContext, useContext, useState } from 'react';
import Link from 'next/link';

// 创建Context
const ThemeContext = createContext<{
  theme: string;
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

// 主题提供者组件
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 使用Context的子组件
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 rounded ${
        theme === 'light' 
          ? 'bg-gray-800 text-white' 
          : 'bg-yellow-400 text-black'
      }`}
    >
      当前主题: {theme} (点击切换)
    </button>
  );
}

function ThemedBox() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div
      className={`p-4 rounded-lg mt-4 ${
        theme === 'light'
          ? 'bg-white text-black border'
          : 'bg-gray-800 text-white'
      }`}
    >
      <h3 className="text-lg font-semibold">主题示例盒子</h3>
      <p>这个盒子的样式会根据当前主题变化</p>
    </div>
  );
}

export default function UseContextPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">useContext Hook 示例</h1>
      
      <ThemeProvider>
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">主题切换示例</h2>
          <ThemedButton />
          <ThemedBox />
        </div>
      </ThemeProvider>
      
      <div className="mt-8">
        <Link href="/hooks" className="text-blue-500 hover:underline">
          返回Hooks列表
        </Link>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">useContext 说明</h2>
        <p>useContext 用于在组件树中共享状态，避免通过props层层传递数据。</p>
        <pre className="bg-gray-800 text-white p-4 rounded mt-2 overflow-x-auto">
{`// 创建Context
const MyContext = createContext(defaultValue);

// 提供Context
<MyContext.Provider value={/* 某个值 */}>
  {children}
</MyContext.Provider>

// 使用Context
function MyComponent() {
  const value = useContext(MyContext);
  // ...
}`}
        </pre>
      </div>
    </div>
  );
}