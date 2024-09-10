import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Vercel에 설정된 환경 변수를 사용하여 MongoDB에 연결
let client;
let clientPromise;

if (!uri) {
  throw new Error('MONGODB_URI가 설정되지 않았습니다.');
}

if (process.env.NODE_ENV === 'development') {
  // 개발 환경에서는 전역 변수를 사용하여 연결을 재사용합니다.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // 프로덕션 환경에서는 새로운 연결을 생성합니다.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const database = client.db('reportDB');  // MongoDB의 데이터베이스 선택
    const collection = database.collection('reports');  // 'reports'라는 컬렉션 사용

    // POST 요청 처리 - 신고 데이터를 MongoDB에 삽입
    if (req.method === 'POST') {
      const { url, description, evidenceFiles, reporterName, reporterPhone, reporterEmail } = req.body;

      const result = await collection.insertOne({
        url,
        description,
        evidenceFiles,
        reporterName,
        reporterPhone,
        reporterEmail,
        timestamp: new Date()
      });

      // 성공적으로 데이터가 저장된 경우
      res.status(200).json({ message: '신고가 성공적으로 저장되었습니다!', result });
    } else {
      res.status(405).json({ message: 'POST 요청만 허용됩니다.' });
    }
  } catch (error) {
    console.error('MongoDB 연결 실패:', error.message);
    res.status(500).json({ error: 'MongoDB 연결 실패', details: error.message });
  }
}