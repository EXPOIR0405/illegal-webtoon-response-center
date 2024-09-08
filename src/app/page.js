
// src/app/page.js
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { AlertCircle, BookOpen, FileText, Users, MessageSquare, Mail, Menu, X } from 'lucide-react'

const data = [
  { name: '2020', 불법사이트수: 100, 합법사이트수: 50 },
  { name: '2021', 불법사이트수: 120, 합법사이트수: 60 },
  { name: '2022', 불법사이트수: 140, 합법사이트수: 70 },
  { name: '2023', 불법사이트수: 160, 합법사이트수: 80 },
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="bg-blue-600 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">불법 웹툰 웹소설 대응 센터</h1>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="hover:text-blue-200 transition duration-300">홈</a>
            <a href="#" className="hover:text-blue-200 transition duration-300">커뮤니티</a>
            <a href="#" className="hover:text-blue-200 transition duration-300">문의하기</a>
            <a href="#" className="hover:text-blue-200 transition duration-300">웹툰 작가 지원</a>
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-blue-600 z-40 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-white text-2xl">
            <a href="#" className="hover:text-blue-200 transition duration-300">홈</a>
            <a href="#" className="hover:text-blue-200 transition duration-300">커뮤니티</a>
            <a href="#" className="hover:text-blue-200 transition duration-300">문의하기</a>
            <a href="#" className="hover:text-blue-200 transition duration-300">웹툰 작가 지원</a>
          </div>
        </div>
      )}

      <main className="container mx-auto mt-8 p-4">
        <section className="mb-12 bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500 skew-x-12 transform translate-x-1/2 -z-10"></div>
          <div className="float-right ml-8 mb-4 w-1/3 relative">
            <Image src="/images/1.jpg" alt="웹툰 작가 일러스트" width={500} height={300} className="rounded-lg shadow-md" />
          </div>
          <h2 className="text-3xl font-semibold mb-4 text-blue-600">소개</h2>
          <p className="text-gray-700 leading-relaxed">
            불법 웹툰 사이트는 창작자의 권리를 침해하고 웹툰 산업의 발전을 저해합니다. 
            우리 센터는 이러한 문제를 해결하고 건전한 웹툰 생태계를 만들기 위해 노력하고 있습니다.
            여러분의 참여로 더 나은 웹툰 문화를 만들어갈 수 있습니다.
          </p>
        </section>

        <section className="mb-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4 text-blue-600">통계</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="불법사이트수" fill="#8884d8" />
              <Bar dataKey="합법사이트수" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
            <div className="w-full mb-4 relative">
              <Image src="/placeholder-image.jpg" alt="불법 웹툰 사이트 경고" width={300} height={200} className="rounded-lg shadow-sm" />
            </div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-red-500">
              <AlertCircle className="mr-2" /> 불법 웹툰 사이트 목록
            </h2>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>사이트 A</li>
              <li>사이트 B</li>
              <li>사이트 C</li>
            </ul>
            <button className="mt-4 bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300">
              사이트 신고하기
            </button>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
            <div className="w-full mb-4 relative">
              <Image src="/placeholder-image.jpg" alt="법률 문서" width={300} height={200} className="rounded-lg shadow-sm" />
            </div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-green-600">
              <BookOpen className="mr-2" /> 법적 정보
            </h2>
            <p className="text-gray-700 mb-4">웹툰 저작권법과 불법 사이트 신고 절차에 대한 정보를 확인하세요.</p>
            <a href="#" className="text-blue-600 hover:underline">자세히 보기 →</a>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
            <div className="w-full mb-4 relative">
              <Image src="/placeholder-image.jpg" alt="웹툰 작가 지원" width={300} height={200} className="rounded-lg shadow-sm" />
            </div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-purple-600">
              <FileText className="mr-2" /> 웹툰 제작자 지원
            </h2>
            <p className="text-gray-700 mb-4">웹툰 제작자를 위한 지원 정보와 협력 기회를 제공합니다.</p>
            <a href="#" className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition duration-300 inline-block">
              지원 신청하기
            </a>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500"></div>
            <div className="w-full mb-4 relative">
              <Image src="/placeholder-image.jpg" alt="커뮤니티 토론" width={300} height={200} className="rounded-lg shadow-sm" />
            </div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-yellow-600">
              <Users className="mr-2" /> 커뮤니티
            </h2>
            <p className="text-gray-700 mb-4">의견을 나누고 최신 뉴스를 확인하세요.</p>
            <div className="mt-4 space-x-4">
              <a href="#" className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300">포럼</a>
              <a href="#" className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300">블로그</a>
            </div>
          </section>
        </div>

        <section className="mt-12 bg-white p-8 rounded-lg shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-200 skew-x-12 transform translate-x-1/2 -z-10"></div>
          <div className="float-right ml-8 mb-4 w-1/3 relative">
            <Image src="/images/2.png" alt="고객 지원" width={400} height={300} className="rounded-lg shadow-md" />
          </div>
          <h2 className="text-3xl font-semibold mb-4 flex items-center text-blue-600">
            <MessageSquare className="mr-2" /> 문의하기
          </h2>
          <p className="text-gray-700 mb-4">궁금한 점이 있으시면 언제든 문의해 주세요.</p>
          <div className="flex items-center bg-blue-100 p-4 rounded-lg inline-block">
            <Mail className="mr-2 text-blue-600" />
            <a href="mailto:rkdalswjd0405@gmail.com" className="text-blue-600 hover:underline">rkdalswjd0405@gmail.com</a>
          </div>
          <p className="text-gray-700 mb-4 mt-4">개발자 소개</p>
          <p className="text-gray-700 mb-4">안녕하세요. 불법 웹툰 사이트 문제를 해결하고자 자발적으로 시작한 1인 프로젝트입니다. 보다 깨끗한 웹툰 환경을 위해 많은 관심과 이용 부탁드립니다. 감사합니다.</p>
        </section>
      </main>

      <footer className="bg-blue-800 text-white text-center p-8 mt-12">
        <div className="container mx-auto">
          <p className="mb-4">&copy; 2024 불법 웹툰 대응 센터. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-blue-300 transition duration-300">개인정보 처리방침</a>
            <a href="#" className="hover:text-blue-300 transition duration-300">이용약관</a>
            <a href="#" className="hover:text-blue-300 transition duration-300">사이트맵</a>
          </div>
        </div>
      </footer>
    </div>
  )
}