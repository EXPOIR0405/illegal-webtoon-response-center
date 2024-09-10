import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client;
let clientPromise;

if (typeof window === 'undefined') {
  if (!client) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
}

export default async function handler(req, res) {
  if (typeof window !== 'undefined') {
    return res.status(500).json({ message: '서버 사이드에서만 실행 가능합니다.' });
  }

  try {
    await clientPromise;
    const database = client.db('communityDB');
    const collection = database.collection('posts');

    if (req.method === 'GET') {
      const post = await collection.findOne({ _id: new ObjectId(req.query.id) });
      res.status(200).json(post);
    } else if (req.method === 'PUT') {
      const { title, content } = req.body;
      const result = await collection.updateOne(
        { _id: new ObjectId(req.query.id) },
        { $set: { title, content } }
      );
      res.status(200).json(result);
    } else if (req.method === 'DELETE') {
      const result = await collection.deleteOne({ _id: new ObjectId(req.query.id) });
      res.status(200).json(result);
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getServerSideProps({ params }) {
  if (typeof window === 'undefined') {
    await clientPromise;
    const database = client.db('communityDB');
    const collection = database.collection('posts');
    const post = await collection.findOne({ _id: new ObjectId(params.id) });
    return { props: { post: JSON.parse(JSON.stringify(post)) } };
  }
  return { props: {} };
}