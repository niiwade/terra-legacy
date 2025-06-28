'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaCertificate } from 'react-icons/fa';

// Define types for quiz data
type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
};

type Quiz = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  passingScore: number;
  timeLimit: number; // minutes
  questions: Question[];
};

// Mock quiz data - in a real app, this would come from an API or database
const quizData: Record<string, Quiz> = {
  'quiz-1': {
    id: 'quiz-1',
    courseId: 'c1',
    title: 'Module 1 Quiz: Introduction to Land Investment',
    description: 'Test your knowledge of the fundamental concepts of land investment covered in Module 1.',
    passingScore: 70,
    timeLimit: 15, // minutes
    questions: [
      {
        id: 'q1',
        question: 'Which of the following is NOT a common type of land investment?',
        options: [
          'Residential development land',
          'Agricultural land',
          'Commercial land',
          'Underwater land'
        ],
        correctAnswer: 3
      },
      {
        id: 'q2',
        question: 'What is a key factor in determining land value?',
        options: [
          'The age of the land',
          'Location',
          'The previous owner',
          'The color of the soil'
        ],
        correctAnswer: 1
      },
      {
        id: 'q3',
        question: 'Which investment strategy focuses on holding land for future price appreciation?',
        options: [
          'Fix and flip',
          'Buy and hold',
          'Wholesale',
          'Land banking'
        ],
        correctAnswer: 3
      },
      {
        id: 'q4',
        question: 'What does ROI stand for in the context of land investment?',
        options: [
          'Rate Of Interest',
          'Return On Investment',
          'Risk Of Investment',
          'Range Of Income'
        ],
        correctAnswer: 1
      },
      {
        id: 'q5',
        question: 'Which of the following is an example of due diligence when purchasing land?',
        options: [
          'Signing the contract immediately',
          'Checking only the price of the land',
          'Conducting a title search',
          'Avoiding all inspections to save money'
        ],
        correctAnswer: 2
      }
    ]
  },
  'quiz-2': {
    id: 'quiz-2',
    courseId: 'c1',
    title: 'Module 2 Quiz: Land Valuation Techniques',
    description: 'Test your understanding of different land valuation methods and their applications.',
    passingScore: 70,
    timeLimit: 20, // minutes
    questions: [
      {
        id: 'q1',
        question: 'Which valuation method is most appropriate for income-producing properties?',
        options: [
          'Comparative Market Analysis',
          'Income Approach',
          'Cost Approach',
          'Residual Method'
        ],
        correctAnswer: 1
      },
      {
        id: 'q2',
        question: 'What is a "comp" in real estate valuation?',
        options: [
          'A computer program used for valuation',
          'A complimentary service offered by agents',
          'A comparable property used for reference',
          'A comprehensive report'
        ],
        correctAnswer: 2
      },
      // More questions would be here
    ]
  }
};

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { courseId, quizId } = params;
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const handleSubmit = useCallback(() => {
    if (!quiz) return;
    
    // Calculate score
    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctAnswer) {
        correctCount++;
      }
    });
    
    const calculatedScore = Math.round((correctCount / quiz.questions.length) * 100);
    setScore(calculatedScore);
    setSubmitted(true);
    
    // Check if passed and update quizCompleted state
    const passed = calculatedScore >= (quiz.passingScore || 0);
    setQuizCompleted(passed);
  }, [quiz, answers]);
  
  useEffect(() => {
    // In a real app, fetch quiz data from API
    const data = quizData[quizId as keyof typeof quizData];
    if (data) {
      setQuiz(data);
      setTimeRemaining(data.timeLimit * 60); // Convert minutes to seconds
      setAnswers(new Array(data.questions.length).fill(-1));
    }
  }, [quizId]);
  
  useEffect(() => {
    if (!quiz || submitted) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [quiz, submitted, handleSubmit]);
  
  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (submitted) return;
    
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleContinue = () => {
    // In a real app, save the quiz result to the user's progress
    // Then navigate back to the course
    router.push(`/dashboard/courses/${courseId}`);
  };
  
  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-burgundy"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <Link href={`/dashboard/courses/${courseId}`} className="text-gray-600 hover:text-gray-900 mr-4">
              <FaArrowLeft />
            </Link>
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
          </div>
          
          {!submitted && (
            <div className="bg-white px-4 py-2 rounded-md shadow-sm">
              <span className="font-medium">Time Remaining: </span>
              <span className={timeRemaining < 60 ? 'text-red-500 font-bold' : ''}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <p className="text-gray-600 mb-4">{quiz.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Questions: </span>
              {quiz.questions.length}
            </div>
            <div>
              <span className="font-medium">Time Limit: </span>
              {quiz.timeLimit} minutes
            </div>
            <div>
              <span className="font-medium">Passing Score: </span>
              {quiz.passingScore}%
            </div>
          </div>
        </div>
        
        {submitted ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="text-center py-6">
              <div className="mb-4">
                {quizCompleted ? (
                  <FaCheckCircle className="mx-auto text-green-500" size={64} />
                ) : (
                  <FaTimesCircle className="mx-auto text-red-500" size={64} />
                )}
              </div>
              
              <h2 className="text-2xl font-bold mb-2">
                {score >= quiz.passingScore ? 'Congratulations!' : 'Not Quite There Yet'}
              </h2>
              
              <p className="text-gray-600 mb-4">
                {score >= quiz.passingScore 
                  ? 'You passed the quiz and can now proceed to the next module.' 
                  : 'You did not reach the passing score. Review the material and try again.'}
              </p>
              
              <div className="inline-block bg-gray-100 rounded-full px-6 py-3 mb-6">
                <span className="text-2xl font-bold">
                  {score}%
                </span>
              </div>
              
              <div className="mt-8">
                <button
                  onClick={handleContinue}
                  className="bg-burgundy text-white px-6 py-3 rounded-md hover:bg-burgundy/90 transition-colors"
                >
                  {score >= quiz.passingScore ? 'Continue to Next Module' : 'Review Module Content'}
                </button>
                
                {score >= quiz.passingScore && quiz.id === 'quiz-2' && (
                  <Link
                    href={`/dashboard/courses/${courseId}/certificate`}
                    className="flex items-center justify-center mt-4 text-green-600 hover:text-green-800"
                  >
                    <FaCertificate className="mr-2" />
                    View Your Certificate
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {quiz.questions.map((question: Question, qIndex: number) => (
              <div key={question.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-medium mb-4">
                  Question {qIndex + 1}: {question.question}
                </h3>
                
                <div className="space-y-3">
                  {question.options.map((option: string, oIndex: number) => (
                    <div 
                      key={oIndex}
                      onClick={() => handleAnswerSelect(qIndex, oIndex)}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        answers[qIndex] === oIndex 
                          ? 'bg-burgundy/10 border-burgundy' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 flex items-center justify-center ${
                          answers[qIndex] === oIndex ? 'border-burgundy bg-burgundy' : 'border-gray-400'
                        }`}>
                          {answers[qIndex] === oIndex && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={answers.includes(-1)}
                className={`px-6 py-3 rounded-md transition-colors ${
                  answers.includes(-1)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-burgundy text-white hover:bg-burgundy/90'
                }`}
              >
                Submit Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
