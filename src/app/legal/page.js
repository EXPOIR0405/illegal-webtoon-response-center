'use client'

import { useState } from 'react'
import { Book, ChevronDown, ChevronUp } from 'lucide-react'

const legalSections = [
  {
    title: '저작권법 개요',
    content: '저작권법은 창작자의 권리를 보호하고...'
  },
  {
    title: '불법 웹툰 사이트의 법적 문제',
    content: '불법 웹툰 사이트는 저작권법을 위반하며...'
  },
  {
    title: '합법적인 웹툰 이용 방법',
    content: '웹툰을 합법적으로 이용하기 위해서는...'
  },
  {
    title: '저작권 침해에 대한 처벌',
    content: '저작권을 침해할 경우 다음과 같은 처벌을 받을 수 있습니다...'
  }
]

export default function LegalPage() {
  const [openSection, setOpenSection] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-8 flex items-center">
        <Book className="mr-2" />
        법적 정보
      </h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        {legalSections.map((section, index) => (
          <div key={index} className="mb-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
            <button
              onClick={() => setOpenSection(openSection === index ? null : index)}
              className="w-full text-left flex justify-between items-center font-semibold text-lg text-blue-700 hover:text-blue-500"
            >
              {section.title}
              {openSection === index ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openSection === index && (
              <p className="mt-4 text-gray-600 animate-fadeIn">
                {section.content}
              </p>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">법률 자문</h2>
        <p className="text-gray-600">
          더 자세한 법률 정보나 개인적인 법률 자문이 필요하신 경우, 전문 변호사와 상담하시기를 권장합니다.
        </p>
      </div>
    </div>
  )
}