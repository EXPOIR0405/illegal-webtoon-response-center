import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Post() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  async function fetchPost() {
    try {
      const response = await fetch(`/api/posts/${id}`);
      if (!response.ok) {
        throw new Error('게시글을 불러오는데 실패했습니다.');
      }
      const data = await response.json();
      setPost(data);
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) return <div>에러: {error}</div>;
  if (!post) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>조회수: {post.views || 0}</p>
      <p>댓글 수: {post.commentsCount || 0}</p>
    </div>
  );
}