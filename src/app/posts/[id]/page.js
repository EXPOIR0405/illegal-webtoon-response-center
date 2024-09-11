'use client'

import { Eye, MessageCircle, ThumbsUp, Share2, ArrowLeft, Link as LinkIcon } from 'lucide-react';
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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const params = useParams()
  const router = useRouter()
  const { id } = params

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (response.status === 404) {
          router.push('/404');
          return;
        }
        if (!response.ok) {
          throw new Error(`HTTP 오류! 상태: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);

        // 댓글 가져오기
        const commentsResponse = await fetch(`/api/comments?postId=${id}`); // GET 요청
        if (!commentsResponse.ok) {
          throw new Error('댓글 가져오기 실패');
        }
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (err) {
        console.error('게시글 가져오기 오류:', err);
        setError(`게시글을 불러오는 중 오류가 발생했습니다: ${err.message}`);
        if (err.message.includes('500')) {
          router.push('/500');
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchPost();
    }
  }, [id, router]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: '사용자 ID', postId: id, comment: newComment }), // userId 추가
      });
      if (!response.ok) {
        throw new Error('댓글 작성 실패');
      }
      const newCommentData = await response.json();
      setComments([...comments, newCommentData]);
      setNewComment('');
    } catch (error) {
      console.error('댓글 작성 오류:', error);
      alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
    }
  }

  // 댓글 삭제 핸들러 추가
  const handleCommentDelete = async (commentId) => {
    try {
      const response = await fetch(`/api/comments?id=${commentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('댓글 삭제 실패');
      }
      setComments(comments.filter(comment => comment._id !== commentId)); // 댓글 목록에서 삭제
    } catch (error) {
      console.error('댓글 삭제 오류:', error);
      alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  }

  const handleShare = () => {
    setIsShareModalOpen(true)
    navigator.clipboard.writeText(window.location.href)
    setTimeout(() => setIsShareModalOpen(false), 2000)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  if (isLoading) return <div className="flex justify-center items-center h-screen">로딩 중...</div>
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>
  if (!post) return <div className="p-4 text-center">게시글을 찾을 수 없습니다.</div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Link href="/community" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6 transition duration-300">
          <ArrowLeft className="w-5 h-5 mr-2" />
          커뮤니티로 돌아가기
        </Link>
        <article className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <span className="mr-4 bg-purple-100 px-3 py-1 rounded-full">작성자: {post.author}</span>
              <span className="flex items-center mr-4"><Eye className="w-4 h-4 mr-1" /> {post.views}</span>
              <span className="flex items-center"><MessageCircle className="w-4 h-4 mr-1" /> {post.commentsCount || 0}</span>
            </div>
            <div 
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
              className="prose max-w-none mb-6"
            />
            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex space-x-4">
                <button 
                  onClick={handleLike}
                  className={`flex items-center transition duration-300 ${
                    isLiked ? 'text-purple-600 bg-purple-100' : 'text-gray-600 hover:text-purple-600'
                  } px-3 py-1 rounded-full`}
                >
                  <ThumbsUp className={`w-5 h-5 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                  좋아요
                </button>
                <button onClick={handleShare} className="flex items-center text-green-600 hover:text-green-800 transition duration-300">
                  <Share2 className="w-5 h-5 mr-1" /> 공유하기
                </button>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">댓글</h2>
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              className="w-full px-4 py-3 text-gray-700 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              rows="4"
              placeholder="댓글을 작해주세요..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="mt-3 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
            >
              댓글 작성
            </button>
          </form>
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment._id} className="bg-white rounded-lg shadow-md p-6 transition-shadow duration-300 hover:shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-purple-600">{comment.userId || '익명'}</span>
                  <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-gray-700">{comment.comment}</p>
                <button onClick={() => handleCommentDelete(comment._id)} className="text-red-500 hover:text-red-700">삭제</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isShareModalOpen && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          링크가 클립보드에 복사되었습니다!
        </div>
      )}
    </div>
  )
}