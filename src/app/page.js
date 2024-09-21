'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { MessageSquare, Mail, Info, Code, Link as LinkIcon, GamepadIcon, Menu, X, AlertCircle, BookOpen, FileText, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const data = [
  { name: '2019년', 불법사이트피해액: 3183},
  { name: '2020년', 불법사이트피해액: 5488},
  { name: '2021년', 불법사이트피해액: 8427},
  { name: '2022년', 불법사이트피해액: 7215},
]

const supportMessages = [
  "정식 독자들을 믿고 용기 잃지 마시길. 우린 영원히 작가님 편입니다.",
  "작가님들의 안정적인 창작활동을 바라며, 응원하고 지원합니다. 정식 사이트에서 오래오래 작가님들의 좋은 작품을 보고싶고, 함께하고싶습니다 ! ♡",
  "작가님들의 작품 덕분에 행복해요! 작가님들도 건강하시고 백만 배 더 행복하세요🤍",
  "작가님 응원합니다!",
  "끝날때까지 끝난게 아니다. 완벽하게 불타지 못한건 언젠가 다시 불탄다. 당신의 글도 그렇다.",
  "정식 연재 사이트에서 보는 게 최고예요",
  "당신의 손에서 태어난 것이 다시 되찾아 오는 것은 당연합니다",
  "웹툰으로 힘든 시기를 이겨냈어요",
  "앞으로도 좋은 작품 기대할게요",
  "세상에는 분명 선한사람이 더 많을테니, 힘내시고 쭉 연재해주세요..!"
]

const videoUrls = [
  '/images/video1.mp4',
  '/images/video2.mp4',
  '/images/video3.mp4',
  '/images/video4.mp4',
  '/images/video5.mp4',
  '/images/video6.mp4',
  '/images/video7.mp4',
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [visibleMessages, setVisibleMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [nextVideoIndex, setNextVideoIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // 새로 추가된 상태와 효과
  const [currentYear, setCurrentYear] = useState(2019);
  const [animatedDamage, setAnimatedDamage] = useState(0);

  useEffect(() => {
    const yearInterval = setInterval(() => {
      setCurrentYear(prevYear => {
        if (prevYear < 2022) {
          return prevYear + 1;
        } else {
          clearInterval(yearInterval);
          return prevYear;
        }
      });
    }, 2000);
    return () => clearInterval(yearInterval);
  }, []);

  useEffect(() => {
    let damage;
    switch(currentYear) {
      case 2019: damage = 3183; break;
      case 2020: damage = 5488; break;
      case 2021: damage = 8427; break;
      case 2022: damage = 9192; break;
      default: damage = 0;
    }
    let start = 0;
    const end = damage;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setAnimatedDamage(end);
      } else {
        setAnimatedDamage(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [currentYear]);


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

  useEffect(() => {
    const videoElement = document.getElementById(`video-${currentVideoIndex}`)
    if (videoElement) {
      videoElement.play()
    }

    const transitionTimer = setTimeout(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length)
        setNextVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length)
        setIsTransitioning(false)
      }, 1000)
    }, 5000)

    return () => clearTimeout(transitionTimer)
  }, [currentVideoIndex])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm fixed w-full z-10">  
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">불법 웹툰 웹소설 대응 센터</h1>
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

      <main className="pt-16 md:pt-20">
        {/* 비디오 섹션 */}
        <section className="h-screen relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {videoUrls.map((video, index) => (
              <video
                key={index}
                id={`video-${index}`}
                src={video}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentVideoIndex
                    ? 'opacity-100'
                    : index === nextVideoIndex && isTransitioning
                    ? 'opacity-100'
                    : 'opacity-0'
                }`}
                muted
                loop
                playsInline
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">나의 소중한 작품은 내 또 다른 권리니까</h1>
              <p className="text-lg md:text-xl mb-8">창작자의 권리를 지키고, 올바른 창작 환경을 만듭니다</p>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 text-white text-sm">
            Designed by Freepik
          </div>
        </section>

        {/* 소개 섹션 */}
        <section id="intro" className="min-h-screen flex items-center justify-center bg-white">
          <div className="container mx-auto px-4 py-12">
            <div className="md:flex items-center justify-between">
              <div className="md:w-1/2 pr-0 md:pr-8 mb-6 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-500">소개</h2>
                <p className="text-gray-600 text-lg md:text-2xl leading-relaxed mb-6">
                  창작자들은 자신의 작품을 통해 생계를 이어가지만, 불법 사이트로 인해 그 권리가 침해되고 있습니다. 많은 창작자들이 이에 고통받고 있지만, 제대로 된 방안은 여전히 부족한 상황입니다.
                  <br/>이 사이트는 불법 사이트의 실태를 알리고 창작자의 권리를 보호하고, 불법 유통에 맞서기 위한 정보를 공유하기 위해 만들어졌습니다.
                </p>
              </div>
              
              <div className="md:w-1/2">
                <figure className="relative">
                  <Image 
                    src="/images/2.jpg" 
                    alt="웹툰 작가 일러스트" 
                    width={500} 
                    height={500} 
                    className="rounded-lg shadow-sm" 
                  />
                  <figcaption className="mt-2 text-sm text-center text-gray-600">글/그림 화음조 <br /> (출처 = 한국저작권보호원)</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* 불법 웹사이트의 현실과 창작자의 고통 섹션 */}
        <section id="illegal-sites" className="relative bg-gray-100 py-12">
          <div className="absolute inset-0">
            <Image
              src="/images/word.png"
              alt="불법 웹사이트의 현실을 보여주는 배경 이미지"
              layout="fill"
              className="object-cover"
            />
          </div>
          <div className="relative container mx-auto px-4 z-1">
            <h2 className="text-3xl font-bold mb-4 text-white text-center">불법 웹사이트의 현실</h2>
            <div className="bg-black bg-opacity-50 p-6 rounded-lg">
              <p className="text-white text-lg leading-relaxed text-center mb-6">
                수많은 불법 웹사이트가 창작자의 권리를 침해하고 있으며, 배너 광고 통해 서로 연결되어 하나의 거대한 불법 유통 네트워크를 형성하고 있습니다. <br />
                음란물, 불법 웹툰, 불법 영화 등의 웹사이트들은 방문자가 많은 사이트일수록 불법적인 광고가 활성화되어 창작자들의 피해는 커지고 있습니다. <br />
                이러한 문제를 해결하고, 창작자의 권리를 보호하기 위한 지속적인 대응이 필요합니다.
              </p>
              <div className="flex justify-center">
                <a href="#" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-300">
                  자세히 알아보기
                </a>
              </div>
            </div>
          </div>
        </section>

       {/* 불법사이트 피해 통계 섹션 */}
        <section className="min-h-screen mb-16 bg-white rounded-lg shadow-md p-4 md:p-8 flex flex-col justify-center items-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 mt-4">불법사이트 피해 통계</h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-16">
            <div className="text-center">
              <p className="text-4xl md:text-6xl font-bold text-blue-600 mb-2">
                {currentYear}
              </p>
              <p className="text-xl md:text-2xl text-gray-600">연도</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-6xl font-bold text-red-600 mb-2">
                {animatedDamage.toFixed(0)}
              </p>
              <p className="text-xl md:text-2xl text-gray-600">피해액 (억원)</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-8 text-center">출처: 한국콘텐츠진흥원</p>
        </section>

        {/* 추가 정보 섹션 */}
        <section className="relative min-h-screen">
          <div className="absolute inset-0">
            <Image
              src="/images/tired.png"
              alt="불법사이트 관련 이미지"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="relative z-10 flex items-center justify-center min-h-screen">
            <div className="bg-black bg-opacity-50 p-8 rounded-lg max-w-3xl">
              <h2 className="text-3xl font-bold mb-4 text-white">불법사이트의 영향</h2>
              <p className="text-white text-lg leading-relaxed mb-6">
                불법사이트로 인한 피해는 단순히 경제적 손실에 그치지 않습니다. 창작자의 권리 침해, 콘텐츠 산업의 위축, 
                사회적 윤리 붕괴 등 다양한 측면에서 심각한 문제를 야기하고 있습니다. 이러한 불법사이트들의 근절을 위해 
                정부, 기업, 시민사회가 협력하여 지속적인 노력을 기울여야 합니다.
              </p>
              <a href="#" className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-300">
                자세히 알아보기
              </a>
            </div>
          </div>
        </section>

        {/* 불법 웹툰 사이트 신고 섹션 */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 px-4 md:px-0">
          <section className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
            <figure className="relative mb-4">
              <Image src="/images/money2.png" alt="불법 웹툰 사이트 경고" width={500} height={200} className="rounded-lg shadow-sm" />
             
            </figure>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center text-gray-800">
              <AlertCircle className="mr-2 text-red-500" /> 불법 웹툰/웹소설 사이트를 발견하셨다면?
            </h2>
            <p className="text-gray-600 mb-4">불법 웹툰, 불법 웹소설 사이트를 신고하고 포상금 받아가세요!</p>
            <Link href="/report" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
              사이트 신고하기
              </Link>
          </section>

          {/* 법률 권리 지키기 섹션 */}
          <section className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
            <figure className="relative mb-4">
              <Image src="/images/lawyer.png" alt="법률 문서" width={500} height={200} className="rounded-lg shadow-sm" />
            </figure>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center text-gray-800">
              <BookOpen className="mr-2 text-green-600" /> 법률 권리를 지키시고 싶다면?
            </h2>
            <p className="text-gray-600 mb-4">웹툰 저작권법과 불법 사이트 신고 절차에 대한 정보를 확인하세요.</p>
            <Link href="/legal" className="text-blue-600 hover:underline">
              자세히 보기 →
            </Link>
          </section>

          {/* 웹툰, 웹소설 제작 지원 섹션 */}
          <section className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
            <figure className="relative mb-4">
              <Image src="/images/help.png" alt="웹툰 작가 지원" width={500} height={200} className="rounded-lg shadow-sm" />
      
            </figure>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center text-gray-800">
              <FileText className="mr-2 text-purple-600" /> 웹툰, 웹소설 제작 지원
            </h2>
            <p className="text-gray-600 mb-4">웹툰, 웹소설 창작자를 위한 지원 정보를 공유합니다.</p>
            <Link href="/support" className="inline-block bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300">
              지원 신청하기
            </Link>
          </section>

          {/* 커뮤니티 섹션 */}
          <section className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
            <figure className="relative mb-4">
              <Image src="/images/say2.png" alt="커뮤니티 토론" width={500} height={200} className="rounded-lg shadow-sm" />
            </figure>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center text-gray-800">
              <Users className="mr-2 text-yellow-600" /> 커뮤니티
            </h2>
            <p className="text-gray-600 mb-4">웹툰, 웹소설 창작자 여러분들의 자유로운 의견 공유 및 소통 공간입니다.</p>
            <Link href="/community" className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition duration-300">
              커뮤니티 참여하기
            </Link>
          </section>
        </div>

        {/* 응원 메시지 섹션 */}
        <section className="min-h-screen py-16 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 mt-15">독자들이 보내는 따뜻한 응원 메시지</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300"
                >
                  <p className="text-gray-800 mb-2">{message}</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
                    <div>
                      <p className="font-semibold text-gray-900">익명의 독자</p>
                      <p className="text-sm text-gray-600">공식 플랫폼 이용자</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 text-center"
              >
                <p className="text-white text-lg">새로운 응원 메시지가 오고 있어요...</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* 문의하기 섹션 */}
<section className="bg-white rounded-lg shadow-md p-8">
  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 flex items-center">
    <MessageSquare className="mr-3 text-blue-600" size={36} /> 문의 및 정보
  </h2>
  
  <div className="grid md:grid-cols-3 gap-8">
    <div className="md:col-span-2">
      <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center text-blue-700">
          <Mail className="mr-2" /> 이메일로 문의하기
        </h3>
        <a href="mailto:rkdalswjd0405@gmail.com" className="text-blue-600 hover:underline text-lg break-all">
          rkdalswjd0405@gmail.com
        </a>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
          <Info className="mr-2 text-blue-600" /> 센터 소개
        </h3>
        <p className="text-gray-600">
          세상에서 침대를 좋아하는 개발자 1명이 만든 사이트입니다. 위 사이트는 수익 창출 하지 않으며, 앞으로도 수익 창출 계획이 없습니다. 개발자를 돕는 방법은 불법 웹툰 사이트 이용 자제입니다!
        </p>
      </div>
      
      <div className="bg-purple-50 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center text-purple-700">
          <Code className="mr-2" /> 웹툰 관련 진행중인 프로젝트
        </h3>
        <ul className="space-y-3">
          <li className="flex items-center">
            <LinkIcon className="mr-2 text-purple-600" />
            <a href="https://www.wavvetoon4.com/" className="text-purple-600 hover:underline">베드로 프로젝트</a>
          </li>
          <li className="flex items-start">
            <GamepadIcon className="mr-2 mt-1 text-purple-600" />
            <div>
              웹툰 방지 캠페인용 게임제작
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-600">
                <li>웹툰 작가로 살아남기 (개발중)</li>
                <li>발더스 게이트3 : 위조된 세계 (개발중)</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 flex items-center text-yellow-700">
          <Users className="mr-2" /> 작가님들에게 전하고 싶은 말
        </h3>
        <p className="text-gray-700 leading-relaxed">
          제 인생에 대해 고민하는 것보다 작가님들이 그려주신 작품을 곱씹어보는 게 인생이 바람직하다는 걸 깨달았습니다. 건강 잘 챙겨주시고 돈 많이 버세요. 여러분의 작품이 우리의 삶을 풍요롭게 만듭니다.
        </p>
      </div>
    </div>
    
    <div>
      <figure className="sticky top-20">
        <Image 
          src="/images/me.png" 
          alt="고객 지원" 
          width={500} 
          height={375} 
          className="rounded-lg shadow-lg" 
        />
      </figure>
    </div>
  </div>
</section>
</main>

<footer className="bg-gray-800 text-white text-center p-4 md:p-8 mt-12">
  <div className="container mx-auto">
    <p className="mb-4 text-sm md:text-base">&copy; 2024 불법 웹툰 웹소설 대응 센터. All rights reserved. 문의하기 : rkdalswjd0405@gmail.com</p>
    <div className="flex justify-center space-x-4 text-sm md:text-base">
      <a href="#" className="hover:text-blue-300 transition duration-300">개인정보 처리방침</a>
      <a href="#" className="hover:text-blue-300 transition duration-300">이용약관</a>
      <a href="#" className="hover:text-blue-300 transition duration-300">사이트맵</a>
    </div>
  </div>
</footer>
</div>
  )
}