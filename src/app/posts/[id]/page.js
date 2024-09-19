'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DOMPurify from 'dompurify';
import parse, { domToReact } from 'html-react-parser';

export default function PostDetail() {
  const [post, setPost] = useState({ author: 'Unknown', title: '', content: '', createdAt: new Date() });
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const params = useParams();

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const [postResponse, commentsResponse] = await Promise.all([
          fetch(`/api/posts/${params.id}`),
          fetch(`/api/comments?postId=${params.id}`)
        ]);

        if (!postResponse.ok || !commentsResponse.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다.');
        }

        const [postData, commentsData] = await Promise.all([
          postResponse.json(),
          commentsResponse.json()
        ]);

        setPost({
          ...postData,
          author: postData.author || 'Unknown',
        });
        setLikeCount(postData.likeCount || 0);
        setComments(commentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostAndComments();
  }, [params.id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          postId: params.id,
          content: newComment,
          author: 'Current User', // 실제 구현시 로그인된 사용자 정보를 사용해야 합니다
        }),
      });

      if (!response.ok) {
        throw new Error('댓글 작성에 실패했습니다.');
      }

      const newCommentData = await response.json();
      setComments([newCommentData, ...comments]);
      setNewComment('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었습니다.');
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">로딩 중...</div>;
  if (error) return <div className="text-red-500 text-center">에러: {error}</div>;
  if (!post) return <div className="text-center">게시글을 찾을 수 없습니다.</div>;

  const sanitizedContent = DOMPurify.sanitize(post.content, { 
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li'],
    KEEP_CONTENT: true
  });

  const options = {
    replace: (domNode) => {
      if (domNode.type === 'tag' && domNode.name === 'p' && domNode.children.some(child => child.type === 'tag' && child.name === 'p')) {
        return <div>{domToReact(domNode.children, options)}</div>;
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {post.author ? post.author[0].toUpperCase() : 'A'}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{post.title}</h1>
              <p className="text-sm text-gray-500">
                {post.author || 'Unknown Author'} • {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="prose max-w-none mb-6">
            {parse(sanitizedContent, options)}
          </div>
          
          <div className="flex items-center justify-between text-gray-500 border-t border-b py-3">
            <button 
              className={`flex items-center space-x-2 ${liked ? 'text-blue-500' : ''}`} 
              onClick={handleLike}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              <span>{likeCount} 좋아요</span>
            </button>
            <button className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              <span>{comments.length} 댓글</span>
            </button>
            <button className="flex items-center space-x-2" onClick={handleShare}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              <span>공유하기</span>
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-6">
          <h2 className="text-xl font-semibold mb-4">댓글 {comments.length}개</h2>
          
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
            />
            <div className="mt-2 text-right">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                댓글 작성
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-xl">
                    {comment.author[0].toUpperCase()}
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold">{comment.author}</p>
                    <p className="text-gray-600 mt-1">{comment.content}</p>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <span>{new Date(comment.createdAt).toLocaleString()}</span>
                      <button className="hover:text-blue-500">답글</button>
                      <button className="hover:text-blue-500">좋아요</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}