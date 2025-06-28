"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Type definitions
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'text';
  duration?: string;
  completed?: boolean;
  questions?: QuizQuestion[];
  content?: string;
  videoUrl?: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  locked: boolean;
  completed?: boolean;
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  image: string;
  modules: Module[];
  progress: number;
}

// Mock course content data
const courseContentData: Record<string, Omit<Course, "progress"> & { modules: Module[] }> = {
  'c1': {
    id: 'c1',
    title: 'Land Investment Fundamentals',
    instructor: 'Dr. Sarah Johnson',
    description: 'Learn the fundamentals of land investment',
    image: '/images/courses/land-investment.jpg',
    modules: [
      {
        id: 'm1',
        title: 'Introduction to Land Investment',
        locked: false,
        completed: false,
        lessons: [
          {
            id: 'l1',
            title: 'Understanding the Land Market',
            type: 'video',
            duration: '10:23',
            completed: false,
            videoUrl: 'https://example.com/videos/land-market.mp4'
          },
          {
            id: 'l2',
            title: 'Types of Land Investments',
            type: 'video',
            duration: '8:45',
            completed: false,
            videoUrl: 'https://example.com/videos/land-types.mp4'
          },
          {
            id: 'l3',
            title: 'Investment Goals and Strategies',
            type: 'text',
            duration: '5 min read',
            completed: false,
            content: 'When investing in land, it is important to define your goals clearly...'
          },
          {
            id: 'l4',
            title: 'Module 1 Quiz',
            type: 'quiz',
            duration: '10 questions',
            completed: false,
            questions: [
              {
                question: 'Which of the following is NOT a common type of land investment?',
                options: ['Agricultural Land', 'Residential Development Land', 'Virtual Land', 'Commercial Land'],
                correctAnswer: 2
              },
              {
                question: 'What is a key factor to consider when evaluating land for investment?',
                options: ['Location', 'Current owner', 'Age of the land', 'Number of trees'],
                correctAnswer: 0
              }
            ]
          }
        ]
      },
      {
        id: 'm2',
        title: 'Due Diligence Process',
        locked: true,
        completed: false,
        lessons: [
          {
            id: 'l5',
            title: 'Legal Considerations',
            type: 'video',
            duration: '12:10',
            completed: false,
            videoUrl: 'https://example.com/videos/legal-considerations.mp4'
          },
          {
            id: 'l6',
            title: 'Environmental Assessment',
            type: 'video',
            duration: '9:30',
            completed: false,
            videoUrl: 'https://example.com/videos/environmental-assessment.mp4'
          },
          {
            id: 'l7',
            title: 'Module 2 Quiz',
            type: 'quiz',
            duration: '5 questions',
            completed: false,
            questions: [
              {
                question: 'Which document is most important when verifying land ownership?',
                options: ['Title deed', 'Survey report', 'Tax receipt', 'Utility bill'],
                correctAnswer: 0
              }
            ]
          }
        ]
      },
      {
        id: 'm3',
        title: 'Financing Your Land Purchase',
        locked: true,
        completed: false,
        lessons: [
          {
            id: 'l8',
            title: 'Financing Options Overview',
            type: 'video',
            duration: '15:20',
            completed: false,
            videoUrl: 'https://example.com/videos/financing-options.mp4'
          },
          {
            id: 'l9',
            title: 'Calculating ROI for Land Investments',
            type: 'text',
            duration: '8 min read',
            completed: false,
            content: 'Return on Investment (ROI) for land can be calculated using the following methods...'
          },
          {
            id: 'l10',
            title: 'Module 3 Quiz',
            type: 'quiz',
            duration: '8 questions',
            completed: false,
            questions: [
              {
                question: 'What is typically the down payment percentage required for raw land purchases?',
                options: ['5-10%', '15-25%', '30-50%', '0% with good credit'],
                correctAnswer: 2
              }
            ]
          }
        ]
      }
    ]
  },
  'c2': {
    id: 'c2',
    title: 'Advanced Land Development Strategies',
    instructor: 'Michael Roberts',
    description: 'Take your land development skills to the next level',
    image: '/images/courses/land-development.jpg',
    modules: [
      {
        id: 'm1',
        title: 'Market Analysis for Developers',
        locked: false,
        completed: false,
        lessons: [
          {
            id: 'l1',
            title: 'Identifying High-Growth Areas',
            type: 'video',
            duration: '14:35',
            completed: false,
            videoUrl: 'https://example.com/videos/high-growth-areas.mp4'
          },
          {
            id: 'l2',
            title: 'Demographic Research Techniques',
            type: 'video',
            duration: '11:20',
            completed: false,
            videoUrl: 'https://example.com/videos/demographic-research.mp4'
          }
        ]
      },
      {
        id: 'm2',
        title: 'Zoning and Entitlements',
        locked: true,
        completed: false,
        lessons: [
          {
            id: 'l3',
            title: 'Navigating Zoning Regulations',
            type: 'video',
            duration: '18:45',
            completed: false,
            videoUrl: 'https://example.com/videos/zoning-regulations.mp4'
          }
        ]
      }
    ]
  }
};

export default function CourseContentPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  
  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // In a real app, this would be an API call
        const courseData = courseContentData[courseId];
        
        if (!courseData) {
          router.push('/dashboard/courses');
          return;
        }
        
        // Calculate progress based on completed lessons
        let completedLessons = 0;
        let totalLessons = 0;
        
        courseData.modules.forEach(module => {
          module.lessons.forEach(lesson => {
            totalLessons++;
            if (lesson.completed) completedLessons++;
          });
        });
        
        const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        
        setCourse({
          ...courseData,
          progress
        });
        
        // Set active lesson to the first lesson of the first unlocked module
        if (courseData.modules.length > 0) {
          const firstUnlockedModule = courseData.modules.findIndex(module => !module.locked);
          if (firstUnlockedModule !== -1 && courseData.modules[firstUnlockedModule].lessons.length > 0) {
            setActiveModuleIndex(firstUnlockedModule);
            setActiveLessonIndex(0);
            setActiveLesson(courseData.modules[firstUnlockedModule].lessons[0]);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error);
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [courseId, router]);
  
  // Handle lesson click
  const handleLessonClick = (moduleIndex: number, lessonIndex: number) => {
    if (!course) return;
    
    // Check if module is locked
    if (course.modules[moduleIndex].locked) {
      alert('This module is locked. Complete previous modules first.');
      return;
    }
    
    // Update active lesson and module
    const currentModule = course.modules[moduleIndex];
    setActiveModuleIndex(moduleIndex);
    setActiveLessonIndex(lessonIndex);
    setActiveLesson(currentModule.lessons[lessonIndex]);
    setSelectedAnswers({});
  };
  
  // Mark lesson as complete
  const markLessonComplete = () => {
    if (!course || !activeLesson) return;
    
    // Create a deep copy of the course object
    const updatedCourse = JSON.parse(JSON.stringify(course)) as Course;
    
    // Update the active lesson's completed status
    updatedCourse.modules[activeModuleIndex].lessons[activeLessonIndex].completed = true;
    
    // Check if all lessons in the module are completed
    const allLessonsCompleted = updatedCourse.modules[activeModuleIndex].lessons.every(
      lesson => lesson.completed
    );
    
    if (allLessonsCompleted) {
      updatedCourse.modules[activeModuleIndex].completed = true;
      
      // Unlock the next module if it exists
      if (activeModuleIndex < updatedCourse.modules.length - 1) {
        updatedCourse.modules[activeModuleIndex + 1].locked = false;
      }
    }
    
    // Recalculate progress
    let completedLessons = 0;
    let totalLessons = 0;
    
    updatedCourse.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        totalLessons++;
        if (lesson.completed) completedLessons++;
      });
    });
    
    updatedCourse.progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    
    setCourse(updatedCourse);
  };
  
  // Handle quiz submission
  const handleQuizSubmit = () => {
    if (!activeLesson?.questions) return;
    
    // Check if all questions are answered
    const allQuestionsAnswered = activeLesson.questions.every(
      (_, index) => selectedAnswers[index] !== undefined
    );
    
    if (!allQuestionsAnswered) {
      alert('Please answer all questions before submitting.');
      return;
    }
    
    // Check answers
    const correctAnswers = activeLesson.questions.filter(
      (question, index) => selectedAnswers[index] === question.correctAnswer
    ).length;
    
    const totalQuestions = activeLesson.questions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Mark lesson as complete if score is passing (e.g., 70% or higher)
    if (score >= 70) {
      markLessonComplete();
      alert(`Quiz completed with a score of ${score}%! You've passed this module.`);
    } else {
      alert(`Quiz completed with a score of ${score}%. You need 70% to pass. Please try again.`);
    }
    
    // Reset selected answers
    setSelectedAnswers({});
  };
  
  // Handle answer selection
  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };
  
  // Navigate to previous lesson
  const goToPreviousLesson = () => {
    if (!course) return;
    
    if (activeLessonIndex > 0) {
      // Previous lesson in same module
      handleLessonClick(activeModuleIndex, activeLessonIndex - 1);
    } else if (activeModuleIndex > 0) {
      // Last lesson of previous module
      const prevModuleIndex = activeModuleIndex - 1;
      const prevLessonIndex = course.modules[prevModuleIndex].lessons.length - 1;
      handleLessonClick(prevModuleIndex, prevLessonIndex);
    }
  };
  
  // Navigate to next lesson
  const goToNextLesson = () => {
    if (!course || !activeLesson) return;
    
    // Mark current lesson as complete if it's not already
    if (!activeLesson.completed) {
      markLessonComplete();
    }
    
    if (activeLessonIndex < course.modules[activeModuleIndex].lessons.length - 1) {
      // Next lesson in same module
      handleLessonClick(activeModuleIndex, activeLessonIndex + 1);
    } else if (activeModuleIndex < course.modules.length - 1) {
      // First lesson of next module
      const nextModuleIndex = activeModuleIndex + 1;
      handleLessonClick(nextModuleIndex, 0);
    } else {
      // If this is the last lesson of the last module, navigate to certificate
      router.push(`/dashboard/courses/${courseId}/certificate`);
    }
  };
  
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-burgundy border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading course content...</p>
        </div>
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <p className="mb-6">The course you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.</p>
          <Link href="/dashboard/courses" className="bg-burgundy text-black px-6 py-2 rounded-md hover:bg-burgundy/90 transition-colors">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }
  
  // Render the course content
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Course content will be rendered here */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
        <p className="mb-6">Progress: {course.progress}%</p>
        
        {/* Render active lesson content */}
        {activeLesson && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{activeLesson.title}</h2>
            
            {/* Video content */}
            {activeLesson.type === 'video' && activeLesson.videoUrl && (
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <video
                  controls
                  className="w-full rounded"
                  src={activeLesson.videoUrl}
                />
              </div>
            )}
            
            {/* Text content */}
            {activeLesson.type === 'text' && activeLesson.content && (
              <div className="prose max-w-none mb-4">
                <p>{activeLesson.content}</p>
              </div>
            )}
            
            {/* Quiz content */}
            {activeLesson.type === 'quiz' && activeLesson.questions && (
              <div className="space-y-6">
                {activeLesson.questions.map((question, qIndex) => (
                  <div key={qIndex} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">{question.question}</h3>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <div
                          key={oIndex}
                          className={`p-3 border rounded cursor-pointer ${selectedAnswers[qIndex] === oIndex ? 'bg-burgundy/10 border-burgundy' : 'hover:bg-gray-50'}`}
                          onClick={() => handleAnswerSelect(qIndex, oIndex)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleQuizSubmit}
                  className="mt-4 bg-burgundy text-white px-6 py-2 rounded-md hover:bg-burgundy/90 transition-colors"
                >
                  Submit Quiz
                </button>
              </div>
            )}
            
            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={goToPreviousLesson}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Previous Lesson
              </button>
              <button
                onClick={goToNextLesson}
                className="bg-burgundy text-white px-4 py-2 rounded-md hover:bg-burgundy/90 transition-colors"
              >
                {activeLessonIndex === course.modules[activeModuleIndex].lessons.length - 1 && 
                 activeModuleIndex === course.modules.length - 1 
                  ? 'Complete Course' 
                  : 'Next Lesson'}
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Sidebar with course modules and lessons */}
      <div className={`w-full md:w-80 bg-white border-l p-4 ${showSidebar ? 'block' : 'hidden md:block'}`}>
        <button
          onClick={toggleSidebar}
          className="md:hidden w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md mb-4"
        >
          {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
        </button>
        
        <h3 className="text-lg font-semibold mb-4">Course Modules</h3>
        <div className="space-y-4">
          {course.modules.map((module, mIndex) => (
            <div key={module.id} className="border rounded-lg overflow-hidden">
              <div className={`p-3 ${module.completed ? 'bg-green-100' : module.locked ? 'bg-gray-100' : 'bg-burgundy/10'}`}>
                <h4 className="font-medium flex items-center">
                  {module.locked && <span className="mr-2">🔒</span>}
                  {module.completed && <span className="mr-2">✅</span>}
                  {module.title}
                </h4>
              </div>
              {!module.locked && (
                <div className="divide-y">
                  {module.lessons.map((lesson, lIndex) => (
                    <div
                      key={lesson.id}
                      onClick={() => handleLessonClick(mIndex, lIndex)}
                      className={`p-3 pl-6 cursor-pointer ${activeModuleIndex === mIndex && activeLessonIndex === lIndex ? 'bg-burgundy/5' : 'hover:bg-gray-50'} ${lesson.completed ? 'text-gray-500' : ''}`}
                    >
                      <div className="flex items-center">
                        {lesson.completed && <span className="mr-2 text-green-500">✓</span>}
                        <span>{lesson.title}</span>
                      </div>
                      {lesson.duration && <span className="text-xs text-gray-500 block mt-1">{lesson.duration}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}