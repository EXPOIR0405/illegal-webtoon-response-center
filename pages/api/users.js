import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // MONGODB_URI를 환경 변수에서 가져옴
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

    const database = client.db('userDB');  // 'userDB' 데이터베이스 사용
    const collection = database.collection('users');  // 'users' 컬렉션 사용

    // POST 요청 처리 - 유저 데이터를 MongoDB에 삽입
    if (req.method === 'POST') {
      const { name, nickname, age, gender, email, ip } = req.body;

      const result = await collection.insertOne({
        name,
        nickname,
        age,
        gender,
        email,
        ip,
        signupDate: new Date()
      });

      res.status(200).json({ message: '유저가 성공적으로 등록되었습니다!', result });
    } else {
      res.status(405).json({ message: 'POST 요청만 허용됩니다.' });
    }
  } catch (error) {
    console.error('MongoDB 연결 실패:', error.message);
    res.status(500).json({ error: 'MongoDB 연결 실패', details: error.message });
  } finally {
    await client.close(); // 연결 종료
  }
}