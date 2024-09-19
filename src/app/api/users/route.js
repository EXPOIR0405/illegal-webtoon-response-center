import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request) {
  try {
    await client.connect();
    const database = client.db('test');
    const users = database.collection('users');

    const userData = await request.json();

    // 이메일 중복 체크
    const existingUser = await users.findOne({ email: userData.email });
    if (existingUser) {
      return NextResponse.json({ message: '이미 사용 중인 이메일입니다.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userToInsert = { ...userData, password: hashedPassword };
    const result = await users.insertOne(userToInsert);
    return NextResponse.json({ message: '회원가입 성공', userId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('회원가입 오류:', error);
    return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
  } finally {
    await client.close();
  }
}