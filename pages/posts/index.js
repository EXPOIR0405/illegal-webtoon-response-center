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

    const database = client.db('communityDB');
    const postsCollection = database.collection('posts');
    const commentsCollection = database.collection('comments');

    // 게시글 목록 가져오기
    const posts = await postsCollection.find({}).toArray();

    // 각 게시글에 댓글 개수를 추가
    const postsWithCommentCount = await Promise.all(
      posts.map(async (post) => {
        const commentsCount = await commentsCollection.countDocuments({ postId: post._id });
        return { ...post, commentsCount }; // 댓글 개수 추가
      })
    );

    res.status(200).json(postsWithCommentCount);
  } catch (error) {
    console.error('게시글 목록을 가져오는 중 오류 발생:', error);
    res.status(500).json({ message: '서버 오류 발생', details: error.message });
  } finally {
    // 연결 종료
    if (client) {
      await client.close();
    }
  }
}