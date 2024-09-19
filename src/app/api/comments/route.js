import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!uri) {
  throw new Error('MONGODB_URI가 설정되지 않았습니다.');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const database = client.db('communityDB');
    const collection = database.collection('comments');

    const { userId, postId, comment } = await req.json();

    if (!userId || !comment) {
      return NextResponse.json({ message: 'userId와 comment는 필수입니다.' }, { status: 400 });
    }

    const result = await collection.insertOne({
      userId,
      postId,
      comment,
      createdAt: new Date()
    });

    return NextResponse.json({
      _id: result.insertedId,
      userId,
      postId,
      comment,
      createdAt: new Date()
    }, { status: 200 });
  } catch (error) {
    console.error('댓글 작성 오류:', error);
    return NextResponse.json({ message: '댓글 작성 실패', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const client = await clientPromise;
    const database = client.db('communityDB');
    const collection = database.collection('comments');

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const { userId } = await req.json();

    const comment = await collection.findOne({ _id: new ObjectId(id) });
    if (!comment) {
      return NextResponse.json({ message: '댓글을 찾을 수 없습니다.' }, { status: 404 });
    }

    if (comment.userId !== userId && userId !== 'adminUserId') {
      return NextResponse.json({ message: '삭제 권한이 없습니다.' }, { status: 403 });
    }

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: '댓글을 찾을 수 없습니다.' }, { status: 404 });
    }
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('댓글 삭제 오류:', error);
    return NextResponse.json({ message: '댓글 삭제 실패', error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const client = await clientPromise;
    const database = client.db('communityDB');
    const collection = database.collection('comments');

    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');

    const comments = await collection.find({ postId }).toArray();
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error('댓글 가져오기 오류:', error);
    return NextResponse.json({ message: '댓글 가져오기 실패', error: error.message }, { status: 500 });
  }
}