"use client";

import { useState, useEffect } from "react";

type Player = "X" | "O" | null;
type BoardState = Player[];

const calculateWinner = (squares: BoardState): Player => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Square = ({ value, onClick }: { value: Player; onClick: () => void }) => {
  return (
    <button
      className="w-20 h-20 border border-gray-400 flex items-center justify-center text-4xl font-bold bg-white hover:bg-gray-100 transition-colors"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

const Board = ({
  squares,
  onClick,
}: {
  squares: BoardState;
  onClick: (i: number) => void;
}) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
};

export default function Home() {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [gameHistory, setGameHistory] = useState<BoardState[]>([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState<number>(0);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);
  const status = winner
    ? `获胜者: ${winner}`
    : isDraw
    ? "平局!"
    : `下一步: ${xIsNext ? "X" : "O"}`;

  const handleClick = (i: number) => {
    const boardCopy = [...board];
    
    // 如果已有获胜者或方格已被填充，则返回
    if (calculateWinner(boardCopy) || boardCopy[i]) {
      return;
    }
    
    // 更新棋盘
    boardCopy[i] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    
    // 更新历史记录
    const newHistory = gameHistory.slice(0, stepNumber + 1);
    newHistory.push(boardCopy);
    setGameHistory(newHistory);
    setStepNumber(newHistory.length - 1);
    
    // 切换玩家
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setBoard(gameHistory[step]);
    setXIsNext(step % 2 === 0);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameHistory([Array(9).fill(null)]);
    setStepNumber(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">井字游戏</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4 text-xl font-semibold">{status}</div>
        <Board squares={board} onClick={handleClick} />
        
        <div className="mt-6 flex justify-between">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={resetGame}
          >
            重新开始
          </button>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">游戏历史</h2>
        <div className="flex flex-col gap-2">
          {gameHistory.map((_, step) => (
            <button
              key={step}
              className={`px-4 py-2 rounded ${
                step === stepNumber
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => jumpTo(step)}
            >
              {step === 0 ? "回到游戏开始" : `回到第 ${step} 步`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
