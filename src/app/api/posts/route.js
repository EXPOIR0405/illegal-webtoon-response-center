import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    const client = await clientPromise;
    const database = client.db('communityDB');
    const collection = database.collection('posts');

    if (id) {
      const postId = new ObjectId(id);
      const post = await collection.findOne({ _id: postId });

      if (!post) {
        return new Response(JSON.stringify({ message: '게시글을 찾을 수 없습니다.' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify(post), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      const posts = await collection.find({}).toArray();
      return new Response(JSON.stringify(posts), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('게시글 조회 오류:', error);
    return new Response(JSON.stringify({ error: '서버 오류가 발생했습니다.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}