import SHA256 from 'crypto-js/sha256';

export interface PowResult {
  nickname: string;
  nonce: number;
  hash: string;
  timeSpent: number; // 毫秒
}

/**
 * 执行POW工作量证明算法
 * @param nickname 用户昵称
 * @param targetZeros 目标前导零的数量
 * @returns POW结果，包含昵称、nonce值、哈希值和花费时间
 */
export function performPow(nickname: string, targetZeros: number): PowResult {
  const startTime = performance.now();
  let nonce = 0;
  let hash = '';
  const target = '0'.repeat(targetZeros);
  
  while (true) {
    const data = `${nickname}${nonce}`;
    hash = SHA256(data).toString();
    
    if (hash.startsWith(target)) {
      break;
    }
    
    nonce++;
  }
  
  const endTime = performance.now();
  const timeSpent = endTime - startTime;
  
  return {
    nickname,
    nonce,
    hash,
    timeSpent
  };
}