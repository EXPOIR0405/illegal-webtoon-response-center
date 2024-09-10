import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
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

    const database = client.db('communityDB');  // 'communityDB' 데이터베이스 사용
    const collection = database.collection('posts');  // 'posts' 컬렉션 사용

    // POST 요청 처리 - 글 데이터를 MongoDB에 삽입
    if (req.method === 'POST') {
      const { userId, title, content } = req.body;

      const result = await collection.insertOne({
        userId,
        title,
        content,
        createdAt: new Date()
      });

      res.status(200).json({ message: '글이 성공적으로 등록되었습니다!', result });
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