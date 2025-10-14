'use client';

import { useState, useEffect } from 'react';
import { generateKeyPair, findPOW, signWithPrivateKey, verifyWithPublicKey } from '@/utils/crypto';

export default function Home() {
  const [nickname, setNickname] = useState('');
  const [keyPair, setKeyPair] = useState<{ privateKey: string; publicKey: string } | null>(null);
  const [powResult, setPowResult] = useState<{ nonce: number; hash: string; text: string } | null>(null);
  const [signature, setSignature] = useState('');
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<{ pow: boolean; verify: boolean }>({ pow: false, verify: false });
  const [step, setStep] = useState(1);

  // 生成RSA密钥对
  const handleGenerateKeyPair = () => {
    const newKeyPair = generateKeyPair();
    setKeyPair(newKeyPair);
    setStep(2);
  };

  // 计算POW
  const handleCalculatePOW = async () => {
    if (!nickname) {
      alert('请输入昵称');
      return;
    }

    setLoading({ ...loading, pow: true });
    
    // 使用Web Worker计算POW，避免阻塞UI
    setTimeout(() => {
      try {
        const result = findPOW(nickname);
        setPowResult(result);
        setStep(3);
      } catch (error) {
        console.error('POW计算错误:', error);
      } finally {
        setLoading({ ...loading, pow: false });
      }
    }, 0);
  };

  // 使用私钥签名
  const handleSign = () => {
    if (!keyPair || !powResult) return;
    
    try {
      const sig = signWithPrivateKey(powResult.text, keyPair.privateKey);
      setSignature(sig);
      setStep(4);
    } catch (error) {
      console.error('签名错误:', error);
    }
  };

  // 使用公钥验证签名
  const handleVerify = () => {
    if (!keyPair || !powResult || !signature) return;
    
    setLoading({ ...loading, verify: true });
    
    setTimeout(() => {
      try {
        const result = verifyWithPublicKey(powResult.text, signature, keyPair.publicKey);
        setVerificationResult(result);
      } catch (error) {
        console.error('验证错误:', error);
      } finally {
        setLoading({ ...loading, verify: false });
      }
    }, 0);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">RSA非对称加密演示</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">步骤 1: 生成RSA密钥对</h2>
            <button 
              onClick={handleGenerateKeyPair}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              disabled={step > 1}
            >
              生成密钥对
            </button>
            
            {keyPair && (
              <div className="mt-4">
                <div className="mb-2">
                  <h3 className="font-semibold">公钥:</h3>
                  <textarea 
                    className="w-full h-24 p-2 border rounded bg-gray-50 text-xs"
                    value={keyPair.publicKey}
                    readOnly
                  />
                </div>
                <div>
                  <h3 className="font-semibold">私钥:</h3>
                  <textarea 
                    className="w-full h-24 p-2 border rounded bg-gray-50 text-xs"
                    value={keyPair.privateKey}
                    readOnly
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">步骤 2: 计算POW (工作量证明)</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="输入昵称"
                className="flex-1 px-4 py-2 border rounded"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={step !== 2}
              />
              <button 
                onClick={handleCalculatePOW}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                disabled={!nickname || loading.pow || step !== 2}
              >
                {loading.pow ? '计算中...' : '计算POW'}
              </button>
            </div>
            
            {powResult && (
              <div className="mt-4">
                <p><span className="font-semibold">Nonce:</span> {powResult.nonce}</p>
                <p><span className="font-semibold">文本:</span> {powResult.text}</p>
                <p><span className="font-semibold">哈希值:</span> {powResult.hash}</p>
              </div>
            )}
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">步骤 3: 私钥签名</h2>
            <button 
              onClick={handleSign}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              disabled={!keyPair || !powResult || step !== 3}
            >
              签名
            </button>
            
            {signature && (
              <div className="mt-4">
                <h3 className="font-semibold">签名结果:</h3>
                <textarea 
                  className="w-full h-24 p-2 border rounded bg-gray-50 text-xs"
                  value={signature}
                  readOnly
                />
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">步骤 4: 公钥验证</h2>
            <button 
              onClick={handleVerify}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              disabled={!keyPair || !powResult || !signature || loading.verify || step !== 4}
            >
              {loading.verify ? '验证中...' : '验证签名'}
            </button>
            
            {verificationResult !== null && (
              <div className="mt-4">
                <p className={`font-bold ${verificationResult ? 'text-green-600' : 'text-red-600'}`}>
                  验证结果: {verificationResult ? '验证成功 ✓' : '验证失败 ✗'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
