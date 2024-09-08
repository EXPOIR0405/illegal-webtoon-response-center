'use client'

import Link from 'next/link'
import { Palette, DollarSign, Users, Lightbulb, ArrowLeft, ArrowRight } from 'lucide-react'

const supportPrograms = [
  {
    title: '창작 지원금',
    description: '신진 웹툰 작가를 위한 창작 지원금 프로그램',
    icon: <DollarSign className="h-8 w-8 text-green-500" />,
    color: 'bg-green-100'
  },
  {
    title: '멘토링 프로그램',
    description: '경험 많은 웹툰 작가와의 1:1 멘토링 기회',
    icon: <Users className="h-8 w-8 text-blue-500" />,
    color: 'bg-blue-100'
  },
  {
    title: '웹툰 제작 툴 지원',
    description: '최신 웹툰 제작 소프트웨어 라이센스 제공',
    icon: <Palette className="h-8 w-8 text-purple-500" />,
    color: 'bg-purple-100'
  },
  {
    title: '아이디어 공모전',
    description: '신선한 웹툰 아이디어를 위한 공모전 개최',
    icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
    color: 'bg-yellow-100'
  }
]

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white p-8">
      <h1 className="text-3xl font-bold text-indigo-600 mb-8 flex items-center">
        <Link href="/" className="mr-4 hover:text-indigo-700 transition duration-300">
          <ArrowLeft />
        </Link>
        웹툰 제작자 지원 프로그램
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        {supportPrograms.map((program, index) => (
          <div key={index} className={`${program.color} rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105`}>
            <div className="flex items-center mb-4">
              {program.icon}
              <h2 className="text-xl font-semibold ml-2">{program.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{program.description}</p>
            <button className="flex items-center text-indigo-600 font-semibold hover:text-indigo-800">
              자세히 보기 <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">지원 신청하기</h2>
        <p className="text-gray-600 mb-4">
          위의 프로그램 중 관심 있는 항목이 있으시다면 아래 버튼을 클릭하여 지원 신청을 진행해주세요.
        </p>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-300">
          지원 신청 시작하기
        </button>
      </div>
    </div>
  )
}