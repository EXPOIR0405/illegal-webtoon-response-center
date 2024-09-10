import { useState, useEffect } from 'react';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('서버에서 응답을 받지 못했습니다.');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('게시글을 불러오는 중 오류 발생:', error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>게시글 목록</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>댓글 수: {post.commentsCount || 0}</p>
        </div>
      ))}
    </div>
  );
}