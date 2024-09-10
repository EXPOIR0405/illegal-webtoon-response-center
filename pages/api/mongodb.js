import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Vercel 환경 변수에서 URI 가져옴
const client = new MongoClient(uri);

export default async function handler(req, res) {
  try {
    // MongoDB 연결 시도
    await client.connect();
    
    // 데이터베이스와 컬렉션 선택
    const database = client.db('Cluster0');
    const collection = database.collection('testCollection');

    // 데이터 삽입 (테스트용)
    const result = await collection.insertOne({ name: "Minjeong", age: 18 });
    
    // 성공적으로 데이터 삽입 응답
    res.status(200).json({ message: "데이터가 성공적으로 추가되었습니다!", result });
  } catch (error) {
    console.error("MongoDB 연결 실패:", error.message);  // 오류 메시지 출력
    res.status(500).json({ error: 'MongoDB 연결 실패', details: error.message });
  } finally {
    await client.close();
  }
}