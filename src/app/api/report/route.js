import { MongoClient } from 'mongodb';
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
    const database = client.db('reportDB');
    const collection = database.collection('reports');

    const body = await req.json();
    const { url, description, evidenceFiles, reporterName, reporterPhone, reporterEmail } = body;

    const result = await collection.insertOne({
      url,
      description,
      evidenceFiles,
      reporterName,
      reporterPhone,
      reporterEmail,
      timestamp: new Date()
    });

    return NextResponse.json({ message: '신고가 성공적으로 저장되었습니다!', result }, { status: 200 });
  } catch (error) {
    console.error('MongoDB 작업 실패:', error.message);
    return NextResponse.json({ error: 'MongoDB 작업 실패', details: error.message }, { status: 500 });
  }
}