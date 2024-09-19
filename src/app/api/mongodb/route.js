import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // MongoDB URI를 환경 변수에서 가져옵니다
let client;  // 클라이언트 변수를 전역에서 사용할 수 있게 선언합니다
let clientPromise; // 연결을 Promise로 처리합니다

if (!uri) {
  console.error('MONGODB_URI가 설정되지 않았습니다.');
  throw new Error('MONGODB_URI가 설정되지 않았습니다. 환경 변수를 확인해주세요.');
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

export async function GET(req) {
  try {
    // MongoDB 연결
    const client = await clientPromise;
    const database = client.db('communityDB');  // 데이터베이스 이름 수정
    const collection = database.collection('testCollection');  // 컬렉션 선택

    // 데이터 삽입 (테스트용)
    const result = await collection.insertOne({ name: "Minjeong", age: 18 });

    // 성공 메시지 응답
    return new Response(JSON.stringify({ message: "데이터가 성공적으로 추가되었습니다!", result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("MongoDB 작업 실패:", error.message);  // 오류 메시지 출력
    return new Response(JSON.stringify({ error: 'MongoDB 작업 실패', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}