import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import dbConnect from '../../utils/dbConnect'; // 경로 수정
import User from '../../models/User'; // 경로 수정
import Cors from 'cors';

// CORS 미들웨어 초기화
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
  origin: '*', // 모든 출처 허용 (보안상 주의 필요)
});

// CORS 미들웨어를 사용하여 API 핸들러를 감싸는 함수
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

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
  await runMiddleware(req, res, cors); // CORS 미들웨어 실행

  await dbConnect(); // 데이터베이스 연결

  if (req.method === 'POST') {
    const { name, nickname, age, gender, email, password } = req.body;

    // 필드 유효성 검사
    if (!name || !nickname || !age || !gender || !email || !password) {
      return res.status(400).json({ error: '모든 필드를 입력해야 합니다.' });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const newUser = new User({
      name,
      nickname,
      age,
      gender,
      email,
      password: hashedPassword, // 해싱된 비밀번호 저장
    });

    try {
      await newUser.save(); // 사용자 저장
      res.status(201).json({ message: '회원가입 성공' });
    } catch (error) {
      console.error('회원가입 오류:', error); // 추가된 로그
      res.status(400).json({ error: '회원가입 중 오류가 발생했습니다.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}