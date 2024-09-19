import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request) {
	try {
		await client.connect();
		const database = client.db('test');
		const users = database.collection('users');

		const { email, password } = await request.json();
		console.log('로그인 시도:', email); // 디버깅용 로그

		const user = await users.findOne({ email });
		console.log('사용자 찾음:', user ? '예' : '아니오'); // 디버깅용 로그

		if (!user) {
			console.log('사용자를 찾을 수 없음'); // 디버깅용 로그
			return NextResponse.json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		console.log('비밀번호 유효:', isPasswordValid); // 디버깅용 로그

		if (!isPasswordValid) {
			console.log('비밀번호 불일치'); // 디버깅용 로그
			return NextResponse.json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 });
		}

		console.log('로그인 성공'); // 디버깅용 로그
		return NextResponse.json({ message: '로그인 성공', userId: user._id }, { status: 200 });
	} catch (error) {
		console.error('로그인 오류:', error);
		return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
	} finally {
		await client.close();
	}
}
