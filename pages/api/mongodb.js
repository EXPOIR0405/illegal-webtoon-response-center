export default async function handler(req, res) {
  console.log("MongoDB URI:", process.env.MONGODB_URI);  // URI 출력
  try {
    await client.connect();
    const database = client.db('Cluster0');
    const collection = database.collection('testCollection');
    
    const result = await collection.insertOne({ name: "Minjeong", age: 18 });
    res.status(200).json({ message: "데이터가 성공적으로 추가되었습니다!", result });
  } catch (error) {
    console.error("MongoDB 연결 실패:", error.message);  // 오류 메시지 출력
    res.status(500).json({ error: 'MongoDB 연결 실패', details: error.message });
  } finally {
    await client.close();
  }
}