'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { AlertCircle, BookOpen, FileText, Users, MessageSquare, Mail, Menu, X } from 'lucide-react'

const data = [
  { name: '2019년', 불법사이트피해규모: 3183},
  { name: '2020년', 불법사이트피해규모: 5488},
  { name: '2021년', 불법사이트피해규모: 8427},
  { name: '2022년', 불법사이트피해규모: 7215},
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
      }, 1500) // 1.5초 후에 새 메시지 추가
    }, 5000) // 5초마다 새 메시지 cycle 시작
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="bg-blue-600 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">불법 웹툰 웹소설 대응 센터</h1>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="hover:text-blue-200 transition duration-300">홈</a>
            <Link href="/community" className="hover:text-blue-200 transition duration-300">커뮤니티</Link>
            <Link href="/email" className="hover:text-blue-200 transition duration-300">문의하기</Link>
            <Link href="/support" className="hover:text-blue-200 transition duration-300">웹툰 작가 지원</Link>
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
            <Link href="/community" className="hover:text-blue-200 transition duration-300">커뮤니티</Link>
            <Link href="/email" className="hover:text-blue-200 transition duration-300">문의하기</Link>
            <Link href="/support" className="hover:text-blue-200 transition duration-300">웹툰 작가 지원</Link>
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
          <p className="text-gray-700 text-xl leading-relaxed">
            불법 웹툰, 불법 웹소설 사이트는 창작자의 권리를 침해하고 웹툰 산업의 발전을 저해합니다. <br />
            저희 센터(사실상 1인 프로젝트지만)는 이러한 문제를 해결하고 건전한 웹툰, 웹소설 생태계를 만들기 위해 노력하고 있습니다. <br />
            여러분의 참여로 더 나은 웹툰 문화를 만들어갈 수 있습니다. 함께 해주세요!
          </p>
          <ul className="text-l mt-6">
            진행한 프로젝트 <br />
            2024.07.02~현재 진행중 <a href="https://www.wavvetoon4.com/" className="text-blue-500 underline">베드로 프로젝트</a>(불법 웹툰 유통사의 크론 사이트 제작)
          </ul>
        </section>

        <section className="mb-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4 text-red-600">불법사이트 피해 통계</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="불법사이트피해규모" fill="#ff6347" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-gray-600 text-sm mt-2 text-right">출처: 한국콘텐츠진흥원</p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
            <div className="w-full mb-4 relative">
              <Image src="/images/money2.jpg" alt="불법 웹툰 사이트 경고" width={500} height={200} className="rounded-lg shadow-sm" />
            </div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-red-500">
              <AlertCircle className="mr-2" /> 불법 웹툰/웹소설 사이트를 발견하셨다면?
            </h2>
            <p className="text-gray-700 mb-4">불법 웹툰, 불법 웹소설 사이트를 신고하고 포상금 받아가세요!</p>
            <Link href="/report" className="mt-4 bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300 inline-block">
              사이트 신고하기
            </Link>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
            <div className="w-full mb-4 relative">
              <Image src="/images/lawyer.jpg" alt="법률 문서" width={500} height={200} className="rounded-lg shadow-sm" />
            </div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-green-600">
              <BookOpen className="mr-2" /> 법률 권리를 지키시고 싶다면?
            </h2>
            <p className="text-gray-700 mb-4">웹툰 저작권법과 불법 사이트 신고 절차에 대한 정보를 확인하세요.</p>
            <Link href="/legal" className="text-blue-600 hover:underline">
              자세히 보기 →
            </Link>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
            <div className="w-full mb-4 relative">
              <Image src="/images/help.jpg" alt="웹툰 작가 지원" width={500} height={500} className="rounded-lg shadow-sm" />
            </div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-purple-600">
              <FileText className="mr-2" /> 웹툰, 웹소설 제작 지원
            </h2>
            <p className="text-gray-700 mb-4">웹툰, 웹소설 창작자를 위한 지원 정보를 공유합니다.</p>
            <Link href="/support" className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition duration-300 inline-block">
              지원 신청하기
            </Link>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500"></div>
            <div className="w-full mb-4 relative">
              <Image src="/images/say2.jpg" alt="커뮤니티 토론" width={500} height={500} className="rounded-lg shadow-sm" />
            </div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-yellow-600">
              <Users className="mr-2" /> 커뮤니티
            </h2>
            <p className="text-gray-700 mb-4">웹툰, 웹소설 창작자 여러분들의 자유로운 의견 공유 및 소통 공간입니다.</p>
            <div className="mt-4 space-x-4">
              <Link href="/community" className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300">
                커뮤니티 참여하기
              </Link>
            </div>
          </section>
        </div>

        <section className="mt-12 bg-white p-8 rounded-lg shadow-lg relative overflow-hidden">
          <h2 className="text-3xl font-semibold mb-4 text-blue-600">정식 웹툰, 웹소설 독자들이 보내는 응원 메시지</h2>
          <div className="flex flex-col items-end space-y-2 h-64 overflow-hidden">
            {visibleMessages.map((message, index) => (
              <div
                key={index}
                className="bg-blue-500 text-white p-3 rounded-lg max-w-xs animate-slide-up"
              >
                <p className="text-sm">{message}</p>
              </div>
            ))}
            {isTyping && (
              <div className="bg-gray-300 text-gray-600 p-3 rounded-lg max-w-xs animate-slide-up">
                <p className="text-sm flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-1 animate-loading-1"></span>
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-1 animate-loading-2"></span>
                  <span className="w-2 h-2 bg-gray-600 rounded-full animate-loading-3"></span>
                </p>
              </div>
            )}
          </div>
        </section>


        <section className="mt-12 bg-white p-8 rounded-lg shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-200 skew-x-12 transform translate-x-1/2 -z-10"></div>
          <div className="float-right ml-8 mb-4 w-1/3 relative">
            <Image src="/images/2.png" alt="고객 지원" width={400} height={300} className="rounded-lg shadow-md" />
          </div>
          <h2 className="text-3xl font-semibold mb-4 flex items-center text-blue-600">
          <MessageSquare className="mr-2" /> 문의하기
        </h2>
        <p className="text-gray-700 mb-4">개발자에게 궁금한 점이 있으시면 언제든 문의해 주세요.</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center bg-blue-100 p-4 rounded-lg">
          <Mail className="mr-2 text-blue-600 mb-2 sm:mb-0" />
          <a href="mailto:rkdalswjd0405@gmail.com" className="text-blue-600 hover:underline break-all">rkdalswjd0405@gmail.com</a>
          </div>
          <p className="text-gray-700 mb-4 mt-4 text-xl font-bold">지나가던 개발자 소개</p>
          <p className="text-gray-700 mb-4">
            정부 기관이 할 수 없다면, 제가 해야죠. 지나가던 개발자가 나섭니다! <br />
            불법 웹툰을 막는 진짜 방법은 사이트 셧다운이 아니라, 여러분의 클릭을 멈추는 겁니다! <br />
            함께 깨끗한 웹툰, 웹소설 세상을 만들어봐요! <br />
          </p>

          <p className="text-gray-800 mb-4 mt-4 text-xl font-bold">작가님들께</p>
          <p className="text-gray-700 mb-4">
            제가 좋아하는 웹툰, 소설 많이 창작해주시고, 돈 많이 버세요! <br />
            작가님들 건강도 꼭 챙기시고요. 감사합니다! <br />
          </p>

        </section>
      </main>

      <footer className="bg-blue-800 text-white text-center p-8 mt-12">
        <div className="container mx-auto">
          <p className="mb-4">&copy; 2024 불법 웹툰 웹소설 대응 센터. All rights reserved.</p>
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
