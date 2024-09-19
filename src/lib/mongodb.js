// src/lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error('MongoDB URI를 .env.local 파일에 추가해주세요');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // 개발 환경에서는 글로벌 변수 사용
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // 프로덕션 환경에서는 새로운 클라이언트 생성
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;