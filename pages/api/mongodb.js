import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // 환경 변수에서 MongoDB URI 가져오기
let client;  // 클라이언트 변수를 전역에서 사용할 수 있게 선언
let clientPromise; // 연결을 Promise로 처리

if (!client) {
  client = new MongoClient(uri);
  clientPromise = client.connect(); // 클라이언트가 한 번만 연결되게 함
}

export default async function handler(req, res) {
  try {
    // 이미 연결된 클라이언트 재사용
    await clientPromise;

    const database = client.db('Cluster0');  // 데이터베이스 선택
    const collection = database.collection('testCollection');  // 컬렉션 선택

    // 데이터 삽입 (테스트용)
    const result = await collection.insertOne({ name: "Minjeong", age: 18 });

    // 성공 메시지 응답
    res.status(200).json({ message: "데이터가 성공적으로 추가되었습니다!", result });
  } catch (error) {
    console.error("MongoDB 연결 실패:", error.message);  // 오류 메시지 출력
    res.status(500).json({ error: 'MongoDB 연결 실패', details: error.message });
  }
}