import { MongoClient } from 'mongodb';

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

export async function GET() {
  try {
    await clientPromise;
    return new Response(JSON.stringify({ message: 'MongoDB 연결 성공' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('MongoDB 연결 실패:', error);
    return new Response(JSON.stringify({ error: 'MongoDB 연결 실패' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export { clientPromise };