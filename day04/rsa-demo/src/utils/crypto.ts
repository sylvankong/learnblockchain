import CryptoJS from 'crypto-js';
import * as KJUR from 'jsrsasign';

// RSA密钥对生成
export const generateKeyPair = () => {
  const keyPair = KJUR.KEYUTIL.generateKeypair("RSA", 2048);
  const privateKey = KJUR.KEYUTIL.getPEM(keyPair.prvKeyObj, "PKCS8PRV");
  const publicKey = KJUR.KEYUTIL.getPEM(keyPair.pubKeyObj, "PKCS8PUB");
  
  return { privateKey, publicKey };
};

// 计算哈希值
export const calculateHash = (text: string) => {
  return CryptoJS.SHA256(text).toString();
};

// 工作量证明 - 寻找以4个0开头的哈希值
export const findPOW = (nickname: string) => {
  let nonce = 0;
  let hash = '';
  
  while (true) {
    const text = nickname + nonce;
    hash = calculateHash(text);
    
    if (hash.startsWith('0000')) {
      return { nonce, hash, text };
    }
    
    nonce++;
  }
};

// 使用私钥签名
export const signWithPrivateKey = (text: string, privateKey: string) => {
  const sig = new KJUR.KJUR.crypto.Signature({ "alg": "SHA256withRSA" });
  sig.init(privateKey);
  sig.updateString(text);
  const signature = sig.sign();
  
  return signature;
};

// 使用公钥验证签名
export const verifyWithPublicKey = (text: string, signature: string, publicKey: string) => {
  const sig = new KJUR.KJUR.crypto.Signature({ "alg": "SHA256withRSA" });
  sig.init(publicKey);
  sig.updateString(text);
  
  return sig.verify(signature);
};