import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // 환경 변수에서 가져오는 경우
let client;
let clientPromise;

if (!client) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  try {
    await clientPromise;

    const database = client.db('communityDB');  // 사용할 데이터베이스 이름을 지정
    const collection = database.collection('posts');  // 'posts' 컬렉션 사용

    if (req.method === 'POST') {
      const { title, content, file } = req.body;

      // MongoDB에 새 게시글 저장
      const result = await collection.insertOne({
        title,
        content,
        file, // 파일은 나중에 업로드 방식에 따라 처리 가능
        createdAt: new Date(),
      });

      // posts.js API
      if (req.method === 'GET') {
        const post = await collection.findOne({ _id: new ObjectId(id) });
        
        // 조회수 증가
        await collection.updateOne({ _id: new ObjectId(id) }, { $inc: { views: 1 } });
        
        res.status(200).json(post);
      }

      res.status(200).json({ message: '게시글이 성공적으로 등록되었습니다.', result });
    } else if (req.method === 'GET') {
      const posts = await collection.find().sort({ createdAt: -1 }).toArray();
      
      // 각 게시글에 댓글 개수 추가
      const commentsCollection = database.collection('comments');
      const postsWithCommentCount = await Promise.all(
        posts.map(async (post) => {
          const commentsCount = await commentsCollection.countDocuments({ postId: post._id.toString() });
          return { ...post, commentsCount };
        })
      );
      
      res.status(200).json(postsWithCommentCount);
    } else {
      res.status(405).json({ message: 'POST 또는 GET 요청만 허용됩니다.' });
    }
  } catch (error) {
    console.error('게시글 처리 실패:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
}