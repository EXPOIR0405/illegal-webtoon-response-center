'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { AlertCircle, BookOpen, FileText, Users, MessageSquare, Mail, Menu, X } from 'lucide-react'

const data = [
  { name: '2019년', 불법사이트피해액: 3183},
  { name: '2020년', 불법사이트피해액: 5488},
  { name: '2021년', 불법사이트피해액: 8427},
  { name: '2022년', 불법사이트피해액: 7215},
]

const supportMessages = [
  "작가님들 사랑해요",
  "작가님들 최고",
  "작가님들 포기하지 말아주세요!",
  "작가님 응원합니다!",
  "불법 웹툰 사이트는 이용하지 맙시다",
  "정식 연재 사이트에서 보는 게 최고예요",
  "작가님들의 노력에 감사드립니다",
  "웹툰으로 힘든 시기를 이겨냈어요",
  "앞으로도 좋은 작품 기대할게요",
  "창작자의 권리를 존중해요"
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [visibleMessages, setVisibleMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true)
      setTimeout(() => {
        setVisibleMessages(prevMessages => {
          const newMessage = supportMessages[Math.floor(Math.random() * supportMessages.length)]
          const updatedMessages = [...prevMessages, newMessage]
          if (updatedMessages.length > 4) {
            updatedMessages.shift()
          }
          return updatedMessages
        })
        setIsTyping(false)
      }, 1500)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm fixed w-full z-10">  
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">불법 웹툰 웹소설 대응 센터</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-300">홈</a>
            <Link href="/community" className="text-gray-600 hover:text-blue-600 transition duration-300">커뮤니티</Link>
            <Link href="/email" className="text-gray-600 hover:text-blue-600 transition duration-300">문의하기</Link>
            <Link href="/support" className="text-gray-600 hover:text-blue-600 transition duration-300">웹툰 작가 지원</Link>
          </nav>
          <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
            <a href="#" className="text-gray-800 hover:text-blue-600 transition duration-300">홈</a>
            <Link href="/community" className="text-gray-800 hover:text-blue-600 transition duration-300">커뮤니티</Link>
            <Link href="/email" className="text-gray-800 hover:text-blue-600 transition duration-300">문의하기</Link>
            <Link href="/support" className="text-gray-800 hover:text-blue-600 transition duration-300">웹툰 작가 지원</Link>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16 bg-white rounded-lg shadow-md p-8">
          <div className="md:flex items-center">
            <div className="md:w-2/3 pr-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">소개</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                불법 웹툰, 불법 웹소설 사이트는 창작자의 권리를 침해하고 웹툰 산업의 발전을 저해합니다. 
                저희 센터는 이러한 문제를 해결하고 건전한 웹툰, 웹소설 생태계를 만들기 위해 노력하고 있습니다. 
                여러분의 참여로 더 나은 웹툰 문화를 만들어갈 수 있습니다. 함께 해주세요!
              </p>
              <div className="text-sm text-gray-500">
                진행한 프로젝트<br />
                2024.07.02~현재 진행중 <a href="https://www.wavvetoon4.com/" className="text-blue-600 hover:underline">베드로 프로젝트</a> (불법 웹툰 유통사의 크론 사이트 제작)
              </div>
            </div>
            <div className="md:w-1/3 mt-6 md:mt-0">
              <Image src="/images/1.jpg" alt="웹툰 작가 일러스트" width={500} height={300} className="rounded-lg shadow-sm" />
            </div>
          </div>
        </section>

        <section className="mb-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">불법사이트 피해 통계</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="불법사이트피해액" fill="#FF0000" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-gray-500 text-sm mt-4 text-right">출처: 한국콘텐츠진흥원, (단위 억원)</p>
        </section>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <section className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
            <Image src="/images/money2.jpg" alt="불법 웹툰 사이트 경고" width={500} height={200} className="rounded-lg shadow-sm mb-4" />
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
              <AlertCircle className="mr-2 text-red-500" /> 불법 웹툰/웹소설 사이트를 발견하셨다면?
            </h2>
            <p className="text-gray-600 mb-4">불법 웹툰, 불법 웹소설 사이트를 신고하고 포상금 받아가세요!</p>
            <Link href="/report" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
              사이트 신고하기
            </Link>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
            <Image src="/images/lawyer.jpg" alt="법률 문서" width={500} height={200} className="rounded-lg shadow-sm mb-4" />
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
              <BookOpen className="mr-2 text-green-600" /> 법률 권리를 지키시고 싶다면?
            </h2>
            <p className="text-gray-600 mb-4">웹툰 저작권법과 불법 사이트 신고 절차에 대한 정보를 확인하세요.</p>
            <Link href="/legal" className="text-blue-600 hover:underline">
              자세히 보기 →
            </Link>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
            <Image src="/images/help.jpg" alt="웹툰 작가 지원" width={500} height={200} className="rounded-lg shadow-sm mb-4" />
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
              <FileText className="mr-2 text-purple-600" /> 웹툰, 웹소설 제작 지원
            </h2>
            <p className="text-gray-600 mb-4">웹툰, 웹소설 창작자를 위한 지원 정보를 공유합니다.</p>
            <Link href="/support" className="inline-block bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300">
              지원 신청하기
            </Link>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
            <Image src="/images/say2.jpg" alt="커뮤니티 토론" width={500} height={200} className="rounded-lg shadow-sm mb-4" />
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
              <Users className="mr-2 text-yellow-600" /> 커뮤니티
            </h2>
            <p className="text-gray-600 mb-4">웹툰, 웹소설 창작자 여러분들의 자유로운 의견 공유 및 소통 공간입니다.</p>
            <Link href="/community" className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition duration-300">
              커뮤니티 참여하기
            </Link>
          </section>
        </div>

        <section className="mb-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">정식 웹툰, 웹소설 독자들이 보내는 응원 메시지</h2>
          <div className="flex flex-col items-end space-y-2 h-64 overflow-hidden bg-gray-100 rounded-lg p-4">
            {visibleMessages.map((message, index) => (
              <div
                key={index}
                className="bg-blue-100 text-blue-800 p-3 rounded-lg max-w-xs animate-fade-in"
              >
                <p className="text-sm">{message}</p>
              </div>
            ))}
            {isTyping && (
              <div className="bg-gray-200 p-3 rounded-lg max-w-xs animate-pulse">
                <p className="text-sm flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-1"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-1"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <div className="md:flex items-center">
            <div className="md:w-2/3 pr-8">
              <h2 className="text-3xl font-bold mb-4 flex items-center text-gray-800">
                <MessageSquare className="mr-2 text-blue-600" /> 문의하기
              </h2>
              <p className="text-gray-600 mb-4">개발자에게 궁금한 점이 있으시면 언제든 문의해 주세요.</p>
              <div className="bg-blue-50 p-4 rounded-lg inline-flex items-center">
                <Mail className="mr-2 text-blue-600" />
                <a href="mailto:rkdalswjd0405@gmail.com" className="text-blue-600 hover:underline break-all">rkdalswjd0405@gmail.com</a>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">지나가던 개발자 소개</h3>
                <p className="text-gray-600">
                  정부 기관이 할 수 없다면, 제가 해야죠. 지나가던 개발자가 나섭니다!<br />
                  불법 웹툰을 막는 진짜 방법은 사이트 셧다운 뿐만 아니라, 여러분이 클릭을 멈추는 겁니다!<br />
                  함께 깨끗한 웹툰, 웹소설 세상을 만들어봐요!
                </p>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">작가님들께</h3>
                <p className="text-gray-600">
                  제 삶에 대해 고민하는 것보다 작품에 대한 고민할 때가 제일 행복합니다.<br />
                  돈 많이 버시고 작가님들 건강도 꼭 챙기시고요. 감사합니다!
                </p>
              </div>
            </div>
            <div className="md:w-1/3 mt-6 md:mt-0">
              <Image src="/images/2.png" alt="고객 지원" width={400} height={300} className="rounded-lg shadow-sm" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white text-center p-8 mt-12">
        <div className="container mx-auto">
          <p className="mb-4">&copy; 2024 불법 웹툰 웹소설 대응 센터. All rights reserved. 문의하기 : rkdalswjd0405@gmail.com</p>
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