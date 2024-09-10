import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  try {
    // MongoDB 연결 시도
    await client.connect();
    
    // 연결 성공 확인 후 응답
    res.status(200).json({ message: "MongoDB에 성공적으로 연결되었습니다!" });
  } catch (error) {
    console.error("MongoDB 연결 실패:", error.message);  // 오류 메시지 출력
    res.status(500).json({ error: 'MongoDB 연결 실패', details: error.message });
  } finally {
    await client.close();
  }
}