'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        setError('게시글을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  return (
    <div>
      <h1>게시글 목록</h1>
      {posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <Link href={`/posts/${post._id}`}>
                <a>
                  <h2>{post.title}</h2>
                </a>
              </Link>
              <p>댓글 수: {post.commentsCount || 0}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}