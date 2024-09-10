import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!client) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  const { id } = req.query;å

  try {
    await clientPromise;
    const database = client.db('communityDB');
    const collection = database.collection('posts');

    if (req.method === 'GET') {
      const post = await collection.findOne({ _id: new ObjectId(id) });
      
      if (!post) {
        return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
      }

      // 조회수 증가
      await collection.updateOne({ _id: new ObjectId(id) }, { $inc: { views: 1 } });
      
      // 댓글 수 가져오기
      const commentsCollection = database.collection('comments');
      const commentsCount = await commentsCollection.countDocuments({ postId: id });

      res.status(200).json({ ...post, commentsCount });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('게시글 처리 실패:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
}