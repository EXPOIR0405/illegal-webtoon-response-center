'use client'

import { useState } from 'react'
import { ArrowLeft, FileUp } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function WritingPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const router = useRouter()

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['blockquote', 'link', 'image', 'video'],
    ],
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async () => {
    try {
      const postData = {
        title,
        content,
        file: file ? file.name : null,
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      const result = await response.json()
      console.log('응답 결과:', result)

      if (response.ok) {
        setShowPopup(true)
      } else {
        console.error('글 등록 실패:', result.message)
      }
    } catch (error) {
      console.error('등록 중 오류 발생:', error)
    }
  }

  const handleConfirm = () => {
    setShowPopup(false)
    router.push('/community')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white p-8">
      <h1 className="text-3xl font-bold text-purple-600 mb-8 flex items-center">
        <ArrowLeft className="mr-4 cursor-pointer" onClick={() => router.back()} />
        게시글 작성
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="w-full p-2 mb-4 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <ReactQuill
          theme="snow"
          modules={modules}
          value={content}
          onChange={setContent}
          className="mb-4"
          style={{ height: '400px', marginBottom: '50px' }}
        />

        <div className="flex items-center mb-4">
          <label htmlFor="file-upload" className="cursor-pointer bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300">
            <FileUp className="inline-block mr-2" />
            파일 첨부
          </label>
          <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
          <span className="ml-4 text-gray-600">여기에 파일을 끌어놓거나 파일 첨부 버튼을 클릭하세요</span>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          글 등록
        </button>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-xl font-bold mb-4">글이 등록되었습니다!</p>
            <button
              onClick={handleConfirm}
              className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  )
}