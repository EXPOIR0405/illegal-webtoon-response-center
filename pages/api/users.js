import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!uri) {
  throw new Error('MONGODB_URI가 설정되지 않았습니다.');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const database = client.db('userDB');
    const collection = database.collection('users');

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (req.method === 'POST') {
      const { name, nickname, age, gender, email } = req.body;

      const result = await collection.insertOne({
        name,
        nickname,
        age,
        gender,
        email,
        ip: ip || 'IP 불명',
        signupDate: new Date(),
      });

      res.status(200).json({ message: '회원가입 성공!', result });
    } else {
      res.status(405).json({ message: 'POST 요청만 허용됩니다.' });
    }
  } catch (error) {
    console.error('MongoDB 저장 실패:', error);
    res.status(500).json({ error: 'MongoDB 저장 실패', details: error.message });
  }
}