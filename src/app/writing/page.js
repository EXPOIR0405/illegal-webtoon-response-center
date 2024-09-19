'use client'


import { useState, useCallback } from 'react'
import { ArrowLeft, FileUp, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'

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

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
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

      if (!response.ok) {
        const result = await response.json()
        console.error('글 등록 실패:', result.message)
        alert('글 등록 실패: ' + result.message)
        return
      }

      const result = await response.json()
      console.log('응답 결과:', result)
      setShowPopup(true)
    } catch (error) {
      console.error('등록 중 오류 발생:', error)
      alert('등록 중 오류 발생: ' + error.message)
    }
  }

  const handleConfirm = () => {
    setShowPopup(false)
    router.push('/community')
  }

  const removeFile = () => {
    setFile(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white p-8">
      <h1 className="text-3xl font-bold text-purple-600 mb-8 flex items-center">
        <ArrowLeft className="mr-4 cursor-pointer" onClick={() => router.back()} />
        게시글 작성
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            id="postTitle"
            name="postTitle"
            placeholder="제목" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full mb-4 p-2 border rounded"
          />
          <ReactQuill 
            value={content} 
            onChange={setContent} 
            modules={modules}
            className="mb-4 h-64"
          />
          <div className="mb-4">
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition duration-300 ${
                isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-500'
              }`}
            >
              <input {...getInputProps()} />
              <FileUp className="mx-auto mb-2" />
              {isDragActive ? (
                <p>파일을 여기에 놓으세요...</p>
              ) : (
                <p>파일을 이 영역에 드래그하거나 클릭하여 선택하세요</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                (허용 파일 형식: JPG, PNG, PDF, DOC, DOCX)
              </p>
            </div>
            {file && (
              <div className="mt-2 p-2 bg-purple-100 rounded flex items-center justify-between">
                <span className="text-sm text-purple-700">{file.name}</span>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            글 등록
          </button>
        </form>
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