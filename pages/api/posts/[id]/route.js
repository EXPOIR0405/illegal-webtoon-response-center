import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;

export async function GET(request, { params }) {
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: '유효하지 않은 ID입니다.' }, { status: 400 });
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('communityDB');
    const collection = database.collection('posts');

    const post = await collection.findOne({ _id: new ObjectId(id) });

    if (!post) {
      return NextResponse.json({ error: '게시글을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('게시글 조회 실패:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  } finally {
    await client.close();
  }
}