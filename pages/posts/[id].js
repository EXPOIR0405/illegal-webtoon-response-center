// 예시: /pages/api/posts/[id].js (게시글 가져오는 API)
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI; // MongoDB URI
let client;
let clientPromise;

if (!client) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  try {
    await clientPromise;
    const { id } = req.query;

    const database = client.db('communityDB');
    const collection = database.collection('posts');

    // MongoDB에서 게시글 가져오기
    const post = await collection.findOne({ _id: new ObjectId(id) });

    if (!post) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('게시글을 가져오는 중 오류 발생:', error);
    res.status(500).json({ message: '서버 오류 발생', details: error.message });
  }
}