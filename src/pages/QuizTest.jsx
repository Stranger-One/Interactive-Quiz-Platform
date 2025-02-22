import React from 'react'
import { Quiz } from '../components'

const QuizTest = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 md:p-10">
      <div className="w-full bg-white flex items-center justify-between max-w-2xl md:p-8 rounded-lg shadow-md">
        <Quiz />
      </div>
    </div>)
}

export default QuizTest