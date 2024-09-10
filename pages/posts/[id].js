import { MongoClient, ObjectId } from 'mongodb';

export async function getServerSideProps(context) {
  const { id } = context.params;  // URL에서 게시글 ID를 가져옴

  const uri = process.env.MONGODB_URI;
  let client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db('communityDB');
    const collection = database.collection('posts');

    // 해당 ID의 게시글 찾기
    const post = await collection.findOne({ _id: new ObjectId(id) });

    return {
      props: {
        post: JSON.parse(JSON.stringify(post)) // MongoDB의 ObjectId를 직렬화
      }
    };
  } catch (error) {
    console.error('데이터베이스 연결 또는 쿼리 오류:', error);
    return {
      props: {
        post: null
      }
    };
  } finally {
    await client.close();
  }
}

export default function PostDetail({ post }) {
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white p-8">
      <h1 className="text-3xl font-bold text-purple-600 mb-8">{post.title}</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-lg text-gray-700 mb-4">{post.content}</p>
        {post.file && (
          <div className="mt-4">
            <p>첨부 파일: {post.file}</p>
          </div>
        )}
        <p className="text-sm text-gray-500">작성일: {new Date(post.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}