'use client'

import { useState } from 'react'
import { MessageSquare, TrendingUp, Search, UserPlus, ChevronRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const forumCategories = ['일반 토론', '작품 리뷰', '창작 팁', '불법 사이트 신고']

const recentTopics = [
  { title: '새로운 웹툰 플랫폼의 등장', author: '웹툰러버', replies: 23, views: 156 },
  { title: '디지털 저작권에 대한 생각', author: '법률전문가', replies: 45, views: 289 },
  { title: '웹툰 작가를 위한 건강 관리 팁', author: '헬시아티스트', replies: 17, views: 134 },
  { title: '불법 사이트 근절을 위한 아이디어', author: '정의수호자', replies: 56, views: 412 },
]

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('일반 토론')

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white p-8">
      <h1 className="text-3xl font-bold text-purple-600 mb-8 flex items-center">
        <MessageSquare className="mr-2" />
        웹툰 커뮤니티
      </h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-purple-600 mb-4">토론 게시판</h2>
            <div className="flex space-x-2 mb-6 overflow-x-auto">
              {forumCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="토픽 검색..."
                  className="w-full p-2 pl-10 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <Search className="absolute left-3 top-2.5 text-purple-400" />
              </div>
            </div>
            <ul className="space-y-4">
              {recentTopics.map((topic, index) => (
                <li key={index} className="border-b border-purple-100 pb-4 last:border-b-0">
                  <a href="#" className="block hover:bg-purple-50 rounded p-2 transition duration-300">
                    <h3 className="font-semibold text-lg text-purple-700">{topic.title}</h3>
                    <div className="flex justify-between text-sm text-purple-500 mt-2">
                      <span>작성자: {topic.author}</span>
                      <span>댓글: {topic.replies} | 조회: {topic.views}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300">
              새 토픽 작성하기
            </button>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-purple-600 mb-4 flex items-center">
              <TrendingUp className="mr-2" /> 인기 토픽
            </h2>
            <ul className="space-y-2">
              {recentTopics.slice(0, 3).map((topic, index) => (
                <li key={index}>
                  <a href="#" className="text-purple-700 hover:text-purple-500 flex items-center">
                    <span className="mr-2">{index + 1}.</span>
                    {topic.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-purple-50 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-purple-600 mb-4 flex items-center">
              <UserPlus className="mr-2" /> 커뮤니티 가입하기
            </h2>
            <p className="text-purple-700 mb-4">
              웹툰 애호가들과 소통하고 최신 정보를 공유하세요!
            </p>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center">
              회원가입 <ChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}