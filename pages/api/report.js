import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // 기존의 MONGODB_URI를 그대로 사용
let client;
let clientPromise;

if (!uri) {
  throw new Error('MONGODB_URI가 설정되지 않았습니다.');
}

if (!client) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  try {
    await clientPromise;

    const database = client.db('reportDB');  // 'reportDB' 데이터베이스 사용
    const collection = database.collection('reports');  // 'reports' 컬렉션 사용

    // POST 요청 처리 - 신고 데이터를 MongoDB에 삽입
    if (req.method === 'POST') {
      const { url, description, evidenceFiles } = req.body;

      // 데이터 삽입
      const result = await collection.insertOne({
        url,
        description,
        evidenceFiles,
        timestamp: new Date()
      });

      // 성공 응답
      res.status(200).json({ message: '신고가 성공적으로 저장되었습니다.', result });
    } else {
      res.status(405).json({ message: 'POST 요청만 허용됩니다.' });
    }
  } catch (error) {
    console.error('MongoDB 연결 실패:', error.message);
    res.status(500).json({ error: 'MongoDB 연결 실패', details: error.message });
  } finally {
    // 연결 종료
    await client.close();
  }
}