'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation' // next/navigation에서 useRouter 임포트
import { Heart, ChevronRight, Send, ArrowLeft } from 'lucide-react'
import Image from 'next/image'

const steps = ['사이트 정보', '증거 자료', '신고자 정보', '검토 및 제출']

export default function ReportPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [file, setFile] = useState(null)

  // 상태 관리
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [reporterName, setReporterName] = useState('')
  const [reporterPhone, setReporterPhone] = useState('')
  const [reporterEmail, setReporterEmail] = useState('')

  const router = useRouter()

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  // handleSubmit 함수: API로 데이터를 보내는 부분
  const handleSubmit = async () => {
    try {
      // 사용자가 입력한 데이터를 API로 전송할 데이터 객체로 변환
      const reportData = {
        url,
        description,
        evidenceFiles: file ? file.name : null, // 파일 이름 저장
        reporterName,
        reporterPhone,
        reporterEmail,
      };

      // 백엔드로 POST 요청 보내기
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData), // JSON 형식으로 변환하여 전송
      });

      const result = await response.json(); // 응답을 JSON으로 파싱
      console.log('응답 결과:', result); // 응답 로그로 출력

      if (response.ok) {
        console.log('신고가 성공적으로 제출되었습니다.');
        // 신고 성공 시 메인 페이지로 이동
        router.push('/');
      } else {
        console.error('신고 제출 실패:', result.message);
      }
    } catch (error) {
      console.error('제출 중 오류 발생:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-white p-8">
      <h1 className="text-3xl font-bold text-red-600 mb-8 flex items-center">
        <Link href="/" className="mr-4 hover:text-red-700 transition duration-300">
          <ArrowLeft />
        </Link>
        불법 웹툰 사이트 신고하기
      </h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step} className={`flex flex-col items-center ${index <= currentStep ? 'text-red-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full ${index <= currentStep ? 'bg-red-600' : 'bg-gray-200'} flex items-center justify-center text-white mb-2`}>
                {index + 1}
              </div>
              <span className="text-sm">{step}</span>
            </div>
          ))}
        </div>

        {currentStep === 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">사이트 정보</h2>
            <input 
              type="text" 
              placeholder="불법 웹툰 사이트 URL" 
              value={url}
              onChange={(e) => setUrl(e.target.value)} // URL 입력 필드 연결
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <textarea 
              placeholder="사이트에 대한 추가 정보" 
              value={description}
              onChange={(e) => setDescription(e.target.value)} // 설명 입력 필드 연결
              className="w-full p-2 border border-gray-300 rounded h-32 mb-4"
            ></textarea>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">증거 자료</h2>
            <input 
              type="file" 
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            {file && <p className="text-sm text-gray-600">선택된 파일: {file.name}</p>}
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">신고자 정보</h2>
            <input 
              type="text" 
              placeholder="성명" 
              value={reporterName}
              onChange={(e) => setReporterName(e.target.value)} // 성명 입력 필드 연결
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input 
              type="tel" 
              placeholder="전화번호" 
              value={reporterPhone}
              onChange={(e) => setReporterPhone(e.target.value)} // 전화번호 입력 필드 연결
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input 
              type="email" 
              placeholder="이메일(신고 확인 결과 통지용)" 
              value={reporterEmail}
              onChange={(e) => setReporterEmail(e.target.value)} // 이메일 입력 필드 연결
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">해당 자료는 한국 저작권 보호원으로 직통 신고가 들어갑니다. 감사합니다.</h2>
            <p className="mb-4 text-center">저작권 보호원에 신고가 정상적으로 접수되면 신고자에게 확인 메일이 발송됩니다.</p>
            <div className="mb-4 flex justify-center">
              <Image src="/images/thanks.png" alt="저작권 보호" width={300} height={200} />
            </div>
            <button 
              onClick={handleSubmit} // 제출 버튼에 handleSubmit 연결
              className="px-4 py-2 text-center bg-red-600 text-white rounded hover:bg-red-700"
            >
              제출하기
            </button>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button 
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            disabled={currentStep === 0}
          >
            이전
          </button>
          {currentStep < 3 && (
            <button 
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
            >
              다음 <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 flex items-start">
        <Heart className="text-yellow-500 mr-2 flex-shrink-0" />
        <p className="text-sm">
          오늘도 불법 웹툰, 웹소설 없는 세상을 만들어 가는데 동참해주셔서 감사합니다!
        </p>
      </div>
    </div>
  );
}