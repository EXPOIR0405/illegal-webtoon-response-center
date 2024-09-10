"use client"

import { useState, useEffect } from 'react'
import { ArrowLeft, MessageSquare, ThumbsUp, Share2 } from 'lucide-react'
import Link from 'next/link'

export default function PostPage({ params }) {
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPostAndComments = async () => {
      setIsLoading(true)
      try {
        // 게시글 데이터 가져오기
        const postResponse = await fetch(`/api/posts/${params.id}`)
        if (!postResponse.ok) {
          throw new Error('게시글을 불러오는데 실패했습니다.')
        }
        const postData = await postResponse.json()
        setPost(postData)

        // 댓글 데이터 가져오기
        const commentsResponse = await fetch(`/api/posts/${params.id}/comments`)
        if (!commentsResponse.ok) {
          throw new Error('댓글을 불러오는데 실패했습니다.')
        }
        const commentsData = await commentsResponse.json()
        setComments(commentsData)
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.')
        console.error('에러 상세:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPostAndComments()
  }, [params.id])

  if (isLoading) return <div className="text-center py-10">로딩 중...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>
  if (!post) return <div className="text-center py-10">게시글을 찾을 수 없습니다.</div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white p-4 sm:p-8">
      <Link href="/community" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
        <ArrowLeft className="mr-2" /> 커뮤니티로 돌아가기
      </Link>
      
      <article className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-4">{post.title}</h1>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
          <span>작성자: {post.author}</span>
          <span>작성일: {new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button className="flex items-center text-gray-500 hover:text-purple-600">
              <ThumbsUp className="mr-1" /> {post.likes}
            </button>
            <button className="flex items-center text-gray-500 hover:text-purple-600">
              <MessageSquare className="mr-1" /> {comments.length}
            </button>
          </div>
          <button className="flex items-center text-gray-500 hover:text-purple-600">
            <Share2 className="mr-1" /> 공유하기
          </button>
        </div>
      </article>

      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">댓글 {comments.length}개</h2>
        {comments.map((comment, index) => (
          <div key={index} className="border-b border-gray-200 py-4 last:border-b-0">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium">{comment.author}</span>
              <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
        <form className="mt-6">
          <textarea 
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="3"
            placeholder="댓글을 작성해주세요..."
          ></textarea>
          <button 
            type="submit"
            className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
          >
            댓글 작성
          </button>
        </form>
      </section>
    </div>
  )
}