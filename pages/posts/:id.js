import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'GET 요청만 허용됩니다.' });
  }

  const { id } = req.query;

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('communityDB');
    const collection = database.collection('posts');

    const post = await collection.findOne({ _id: new ObjectId(id) });

    if (!post) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('MongoDB 작업 실패:', error);
    res.status(500).json({ error: 'MongoDB 작업 실패', details: error.message });
  } finally {
    await client.close();
  }
}
