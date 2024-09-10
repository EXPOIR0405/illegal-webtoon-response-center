'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, TrendingUp, Search, UserPlus, ChevronRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('일반 토론')
  const [recentTopics, setRecentTopics] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // 예시: 커뮤니티 페이지에서 각 게시글에 링크 추가
  const topicList = (
    <ul className="space-y-3 sm:space-y-4">
      {recentTopics.map((topic, index) => (
        <li key={index} className="border-b border-purple-100 pb-3 sm:pb-4 last:border-b-0">
          <Link href={`/posts/${topic._id}`}>
            <div className="block hover:bg-purple-50 rounded p-2 transition duration-300">
              <h3 className="font-semibold text-base sm:text-lg text-purple-700">{topic.title}</h3>
              <div className="flex justify-between text-xs sm:text-sm text-purple-500 mt-1 sm:mt-2">
                <span>작성자: {topic.author}</span>
                <span>댓글: {topic.replies} | 조회: {topic.views}</span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )

  // 백엔드에서 최근 글 목록 가져오기
  useEffect(() => {
    const fetchTopics = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/posts') // 백엔드 API로 요청
        if (!response.ok) {
          throw new Error('서버 응답이 올바르지 않습니다.')
        }
        const data = await response.json()
        setRecentTopics(data) // 응답 데이터를 상태로 저장
      } catch (err) {
        setError('글 목록을 불러오는 중 오류가 발생했습니다.')
        console.error('에러 상세:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTopics()
  }, []) // 페이지 로드 시 한 번만 실행

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

            {/* 카테고리 선택 버튼 */}
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
              {/* 카테고리 선택 로직 */}
            </div>

            {/* 검색 바 */}
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

            {/* 최근 토픽 목록 */}
            {isLoading && <p>로딩 중...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!isLoading && !error && recentTopics.length === 0 && <p>아직 게시글이 없습니다.</p>}
            {!isLoading && !error && recentTopics.length > 0 && topicList}

            <Link href="/writing" className="mt-4 sm:mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 text-center block text-sm sm:text-base">
              새 토픽 작성하기
            </Link>
          </div>
        </div>

        <div className="md:col-span-1">
          {/* 인기 토픽 섹션 */}
        </div>
      </div>
    </div>
  )
}



//추가
