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
  try {
    await clientPromise;

    const { id } = req.query; // 게시글 ID를 가져옴
    
    if (!id || !ObjectId.isValid(id)) {
      return res.status(400).json({ message: '유효하지 않은 게시글 ID입니다.' });
    }

    const database = client.db('communityDB');
    const postsCollection = database.collection('posts');
    const commentsCollection = database.collection('comments');

    // 게시글 데이터 가져오기
    const post = await postsCollection.findOne({ _id: new ObjectId(id) });

    if (!post) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    // 댓글 데이터 가져오기
    const comments = await commentsCollection.find({ postId: new ObjectId(id) }).toArray();

    // 조회수 증가 처리
    await postsCollection.updateOne({ _id: new ObjectId(id) }, { $inc: { views: 1 } });

    // 게시글과 댓글을 함께 반환
    res.status(200).json({ post, comments });
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
    if (error instanceof MongoClient.MongoError) {
      res.status(500).json({ message: '데이터베이스 오류 발생', details: error.message });
    } else if (error instanceof Error) {
      res.status(500).json({ message: '서버 오류 발생', details: error.message });
    } else {
      res.status(500).json({ message: '알 수 없는 오류 발생' });
    }
  } finally {
    // 연결 종료
    if (client) {
      await client.close();
    }
  }
}