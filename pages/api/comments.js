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
  await clientPromise;
  const database = client.db('communityDB');  // 'communityDB' 데이터베이스 사용
  const collection = database.collection('comments');  // 'comments' 컬렉션 사용

  // POST 요청 처리 - 댓글 데이터를 MongoDB에 삽입
  if (req.method === 'POST') {
    const { userId, postId, comment } = req.body;

    // userId와 comment가 null이 아닌지 확인
    if (!userId || !comment) {
      return res.status(400).json({ message: 'userId와 comment는 필수입니다.' });
    }

    const result = await collection.insertOne({
      userId,
      postId,
      comment,
      createdAt: new Date() // createdAt 필드 추가
    });

    res.status(200).json({
      _id: result.insertedId,
      userId,
      postId,
      comment,
      createdAt: new Date() // createdAt 필드 추가
    });
  } 
  // DELETE 요청 처리 - 댓글 삭제
  else if (req.method === 'DELETE') {
    const { id } = req.query; // 댓글 ID를 쿼리에서 가져옴
    try {
      await collection.deleteOne({ _id: new ObjectId(id) }); // MongoDB에서 댓글 삭제
      res.status(204).end(); // 성공적으로 삭제
    } catch (error) {
      res.status(500).json({ message: '댓글 삭제 실패', error });
    }
  } 
  // GET 요청 처리 - 댓글 가져오기
  else if (req.method === 'GET') {
    const { postId } = req.query; // 게시글 ID를 쿼리에서 가져옴
    try {
      const comments = await collection.find({ postId }).toArray(); // 해당 게시글의 댓글 가져오기
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: '댓글 가져오기 실패', error });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}