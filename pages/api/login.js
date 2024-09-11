import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt'; // 비밀번호 해시 확인을 위한 bcrypt

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
    const database = client.db('communityDB');
    const usersCollection = database.collection('users');

    if (req.method === 'POST') {
        const { email, password } = req.body;

        // 사용자 찾기
        const user = await usersCollection.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
        }

        // 비밀번호 확인
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
        }

        // 로그인 성공 시 사용자 정보 반환
        res.status(200).json({ message: '로그인 성공', userId: user._id });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
