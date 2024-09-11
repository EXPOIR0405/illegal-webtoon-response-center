import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('MONGODB_URI가 설정되지 않았습니다.');
}

async function dbConnect() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB에 연결되었습니다.');
    }
}

export default dbConnect;