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

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const database = client.db('communityDB');
    const collection = database.collection('posts');

    if (req.method === 'POST') {
      const { title, content, file } = req.body;

      const result = await collection.insertOne({
        title,
        content,
        file,
        createdAt: new Date(),
      });

      res.status(200).json({ message: '글이 성공적으로 등록되었습니다!', result });
    } else if (req.method === 'GET') {
      const posts = await collection.find({}).sort({ createdAt: -1 }).toArray();
      res.status(200).json(posts);
    } else {
      res.status(405).json({ message: '허용되지 않은 메서드입니다.' });
    }
  } catch (error) {
    console.error('MongoDB 작업 실패:', error);
    res.status(500).json({ error: 'MongoDB 작업 실패', details: error.message });
  }
}