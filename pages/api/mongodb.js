// pages/api/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Vercel 환경 변수에서 URI를 가져옴
const client = new MongoClient(uri);

export default async function handler(req, res) {
  try {
    // MongoDB 연결
    await client.connect();
    
    // 데이터베이스와 컬렉션 선택
    const database = client.db('test1'); // 'testDB'는 네가 생성한 데이터베이스 이름으로 변경
    const collection = database.collection('testCollection'); // 'testCollection'도 원하는 컬렉션 이름으로 변경
    
    // 예시: 새로운 데이터 삽입
    const result = await collection.insertOne({ name: "Minjeong", age: 18 });
    
    // 성공적으로 데이터를 추가했다는 응답
    res.status(200).json({ message: "데이터가 성공적으로 추가되었습니다!", result });
  } catch (error) {
    console.error("MongoDB 연결 실패:", error);
    res.status(500).json({ error: '데이터베이스 연결 실패' });
  } finally {
    // 연결 종료
    await client.close();
  }
}