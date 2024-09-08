'use client';

import React, { useEffect, useState } from 'react';
import { Coffee, Code, Pencil } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 1;
        return newProgress > 100 ? 0 : newProgress;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          404 - 페이지를 찾을 수 없습니다
        </h1>
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24 animate-spin">
            <Coffee className="absolute top-0 left-0 w-12 h-12 text-brown-500" />
            <Code className="absolute top-0 right-0 w-12 h-12 text-blue-500" />
            <Pencil className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-12 text-green-500" />
          </div>
        </div>
        <p className="text-gray-600 text-center mb-6">
          죄송합니다! 요청하신 페이지를 찾을 수 없습니다.
          개발자가 지금 이 문제를 해결하기 위해 열심히 작업 중입니다.
          잠시 기다려주세요.
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 text-center mb-6">
          문제 해결 진행률: {progress}% (추정)
        </p>
        <div className="text-center">
          <Link href="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}