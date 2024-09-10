'use client'

import { Eye, MessageCircle, ThumbsUp, Share2, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PostPage() {
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState([])
  const params = useParams()
  const router = useRouter()
  const { id } = params

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/posts/${id}`)
        if (response.status === 404) {
          router.push('/404')
          return
        }
        if (!response.ok) {
          throw new Error(`HTTP 오류! 상태: ${response.status}`)
        }
        const data = await response.json()
        setPost(data)
      } catch (err) {
        console.error('게시글 가져오기 오류:', err)
        setError(`게시글을 불러오는 중 오류가 발생했습니다: ${err.message}`)
        if (err.message.includes('500')) {
          router.push('/500')
        }
      } finally {
        setIsLoading(false)
      }
    }
    if (id) {
      fetchPost()
    }
  }, [id, router])

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: id, content: newComment }),
      })
      if (!response.ok) {
        throw new Error('댓글 작성 실패')
      }
      const newCommentData = await response.json()
      setComments([...comments, newCommentData])
      setNewComment('')
    } catch (error) {
      console.error('댓글 작성 오류:', error)
      alert('댓글 작성에 실패했습니다. 다시 시도해주세요.')
    }
  }

  if (isLoading) return <div className="flex justify-center items-center h-screen">로딩 중...</div>
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>
  if (!post) return <div className="p-4 text-center">게시글을 찾을 수 없습니다.</div>

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Link href="/community" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          커뮤니티로 돌아가기
        </Link>
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span className="mr-4">작성자: {post.author}</span>
              <span className="flex items-center mr-4"><Eye className="w-4 h-4 mr-1" /> {post.views}</span>
              <span className="flex items-center"><MessageCircle className="w-4 h-4 mr-1" /> {post.commentsCount || 0}</span>
            </div>
            <div 
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
              className="prose max-w-none"  // Tailwind CSS의 Typography 플러그인 사용 시
            />
            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex space-x-4">
                <button className="flex items-center text-gray-600 hover:text-blue-600">
                  <ThumbsUp className="w-5 h-5 mr-1" /> 좋아요
                </button>
                <button className="flex items-center text-gray-600 hover:text-green-600">
                  <Share2 className="w-5 h-5 mr-1" /> 공유하기
                </button>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">댓글</h2>
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              rows="4"
              placeholder="댓글을 작성해주세요..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              댓글 작성
            </button>
          </form>
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{comment.author}</span>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}