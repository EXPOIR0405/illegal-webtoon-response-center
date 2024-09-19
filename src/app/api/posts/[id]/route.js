import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const client = await clientPromise;
    const database = client.db('communityDB');
    const collection = database.collection('posts');

    const post = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!post) {
      return NextResponse.json({ message: '게시글을 찾을 수 없습니다.' }, { status: 404 });
    }

    // 조회수 증가
    await collection.updateOne({ _id: new ObjectId(id) }, { $inc: { views: 1 } });
    
    // 댓글 수 가져오기
    const commentsCollection = database.collection('comments');
    const commentsCount = await commentsCollection.countDocuments({ postId: id });

    return NextResponse.json({ ...post, commentsCount });
  } catch (error) {
    console.error('게시글 처리 실패:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function GET_ALL() {
  try {
    const client = await clientPromise;
    const database = client.db('communityDB');
    const collection = database.collection('posts');

    const posts = await collection.find().toArray();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('게시글 목록 조회 실패:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}