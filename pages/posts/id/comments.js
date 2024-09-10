import { MongoClient, ObjectId } from 'mongodb';

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
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'GET 요청만 허용됩니다.' });
  }

  const { id } = req.query;

  try {
    await clientPromise;
    const database = client.db('communityDB');
    const collection = database.collection('comments');

    const comments = await collection.find({ postId: new ObjectId(id) }).sort({ createdAt: -1 }).toArray();

    res.status(200).json(comments);
  } catch (error) {
    console.error('MongoDB 작업 실패:', error);
    res.status(500).json({ error: 'MongoDB 작업 실패', details: error.message });
  }
}
