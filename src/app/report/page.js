'use client'

import { useState } from 'react'
import { AlertTriangle, ChevronRight, Send } from 'lucide-react'

const steps = ['사이트 정보', '증거 자료', '신고자 정보', '검토 및 제출']

export default function ReportPage() {
  const [currentStep, setCurrentStep] = useState(0)
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-white p-8">
      <h1 className="text-3xl font-bold text-red-600 mb-8">불법 웹툰 사이트 신고하기</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step} className={`flex flex-col items-center ${index <= currentStep ? 'text-red-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full ${index <= currentStep ? 'bg-red-600' : 'bg-gray-200'} flex items-center justify-center text-white mb-2`}>
                {index + 1}
              </div>
              <span className="text-sm">{step}</span>
            </div>
          ))}
        </div>
        
        {currentStep === 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">사이트 정보</h2>
            <input 
              type="text" 
              placeholder="불법 웹툰 사이트 URL" 
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <textarea 
              placeholder="사이트에 대한 추가 정보" 
              className="w-full p-2 border border-gray-300 rounded h-32 mb-4"
            ></textarea>
          </div>
        )}
        
        {/* 다른 단계들의 내용은 여기에 추가 */}
        
        <div className="flex justify-between mt-8">
          <button 
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            disabled={currentStep === 0}
          >
            이전
          </button>
          <button 
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
          >
            {currentStep === steps.length - 1 ? (
              <>제출 <Send className="ml-2 h-4 w-4" /></>
            ) : (
              <>다음 <ChevronRight className="ml-2 h-4 w-4" /></>
            )}
          </button>
        </div>
      </div>
      
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 flex items-start">
        <AlertTriangle className="text-yellow-500 mr-2 flex-shrink-0" />
        <p className="text-sm">
          허위 신고는 법적 책임을 질 수 있습니다. 신중하게 신고해 주시기 바랍니다.
        </p>
      </div>
    </div>
  )
}