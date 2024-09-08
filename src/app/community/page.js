'use client'

import { useState } from 'react'
import { MessageSquare, TrendingUp, Search, UserPlus, ChevronRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// 주석: 백엔드 연동을 위한 API 클라이언트 또는 데이터 fetching 라이브러리를 import 해야 합니다.
// 예: import axios from 'axios' 또는 import { useQuery } from 'react-query'

const forumCategories = ['일반 토론', '작품 리뷰', '창작 팁', '불법 사이트 신고']

// 주석: 이 데이터는 실제로는 백엔드 API에서 가져와야 합니다.
// 예: const { data: recentTopics, isLoading, error } = useQuery('recentTopics', fetchRecentTopics)
const recentTopics = [
  { title: '새로운 웹툰 플랫폼의 등장', author: '웹툰러버', replies: 23, views: 156 },
  { title: '디지털 저작권에 대한 생각', author: '법률전문가', replies: 45, views: 289 },
  { title: '웹툰 작가를 위한 건강 관리 팁', author: '헬시아티스트', replies: 17, views: 134 },
  { title: '불법 사이트 근절을 위한 아이디어', author: '정의수호자', replies: 56, views: 412 },
]

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('일반 토론')

  // 주석: 백엔드와 연동 시 필요한 상태 및 함수들
  // const [topics, setTopics] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState(null)

  // useEffect(() => {
  //   const fetchTopics = async () => {
  //     setIsLoading(true)
  //     try {
  //       const response = await axios.get('/api/topics')
  //       setTopics(response.data)
  //     } catch (err) {
  //       setError(err.message)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  //   fetchTopics()
  // }, [selectedCategory])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-6 sm:mb-8 flex items-center">
        <Link href="/" className="mr-2 sm:mr-4 hover:text-purple-700 transition duration-300">
          <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </Link>
        <MessageSquare className="mr-2 w-6 h-6 sm:w-8 sm:h-8" />
        웹툰 커뮤니티
      </h1>
      
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 mb-4">토론 게시판</h2>
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
              {forumCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="mb-4 sm:mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="토픽 검색..."
                  className="w-full p-2 pl-8 sm:pl-10 text-sm sm:text-base border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <Search className="absolute left-2 sm:left-3 top-2.5 text-purple-400 w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <ul className="space-y-3 sm:space-y-4">
              {recentTopics.map((topic, index) => (
                <li key={index} className="border-b border-purple-100 pb-3 sm:pb-4 last:border-b-0">
                  <a href="#" className="block hover:bg-purple-50 rounded p-2 transition duration-300">
                    <h3 className="font-semibold text-base sm:text-lg text-purple-700">{topic.title}</h3>
                    <div className="flex justify-between text-xs sm:text-sm text-purple-500 mt-1 sm:mt-2">
                      <span>작성자: {topic.author}</span>
                      <span>댓글: {topic.replies} | 조회: {topic.views}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            <Link href="/writing" className="mt-4 sm:mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 text-center block text-sm sm:text-base">
              새 토픽 작성하기
            </Link>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-purple-600 mb-3 sm:mb-4 flex items-center">
              <TrendingUp className="mr-2 w-5 h-5 sm:w-6 sm:h-6" /> 인기 토픽
            </h2>
            <ul className="space-y-2">
              {recentTopics.slice(0, 3).map((topic, index) => (
                <li key={index}>
                  <a href="#" className="text-purple-700 hover:text-purple-500 flex items-center text-sm sm:text-base">
                    <span className="mr-2">{index + 1}.</span>
                    {topic.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-purple-50 rounded-lg shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-purple-600 mb-3 sm:mb-4 flex items-center">
              <UserPlus className="mr-2 w-5 h-5 sm:w-6 sm:h-6" /> 커뮤니티 가입하기
            </h2>
            <p className="text-purple-700 mb-3 sm:mb-4 text-sm sm:text-base">
              웹툰 애호가들과 소통하고 최신 정보를 공유하세요!
            </p>
            <Link href="/signup" className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center text-sm sm:text-base">
              회원가입 <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}