import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    console.log('MongoDB에 연결되었습니다.');
    const database = client.db('communityDB');
    const collection = database.collection('posts');

    const posts = await collection.find().toArray();
    console.log('조회된 게시글:', posts);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('게시글 목록 조회 오류:', error);
    return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function POST(request) {
  try {
    await client.connect();
    const database = client.db('communityDB');
    const collection = database.collection('posts');

    const postData = await request.json();
    const result = await collection.insertOne(postData);

    return NextResponse.json({ message: '게시글이 성공적으로 등록되었습니다.', postId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('게시글 등록 오류:', error);
    return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
  } finally {
    await client.close();
  }
}
