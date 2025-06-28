'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaDownload, FaArrowLeft } from 'react-icons/fa';
import html2canvas from 'html2canvas';

interface CourseData {
  id: string;
  title: string;
  instructor: string;
  completionDate: string;
  certificateId: string;
  instructorSignature: string;
  hasSignature: boolean;
}

// Mock course data - in a real app, this would come from an API or database
const courseData = {
  'c1': {
    id: 'c1',
    title: 'Land Investment Fundamentals',
    instructor: 'Dr. Sarah Johnson',
    completionDate: 'June 15, 2025',
    certificateId: 'TERRA-C1-12345',
    instructorSignature: '/images/signatures/signature-sarah-johnson.png',
    hasSignature: true
  },
  'c2': {
    id: 'c2',
    title: 'Advanced Land Acquisition Strategies',
    instructor: 'Michael Rodriguez, MBA',
    completionDate: 'June 10, 2025',
    certificateId: 'TERRA-C2-67890',
    instructorSignature: '/images/signatures/signature-michael-rodriguez.png',
    hasSignature: true
  },
  'c3': {
    id: 'c3',
    title: 'Land Development and Zoning',
    instructor: 'Prof. Emily Chen',
    completionDate: 'May 20, 2025',
    certificateId: 'TERRA-C3-54321',
    instructorSignature: '',
    hasSignature: false
  }
};

export default function CertificatePage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const [course, setCourse] = useState<CourseData | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // In a real app, fetch certificate data from API
    const data = courseData[courseId as keyof typeof courseData];
    setCourse(data);
  }, [courseId]);
  
  const handleDownload = async () => {
    if (!certificateRef.current) return;
    
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `${course?.title?.replace(/\s+/g, '-') || 'certificate'}-Certificate.png`;
      link.click();
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('There was an error downloading your certificate. Please try again.');
    }
  };
  
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-burgundy"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <Link href={`/dashboard/courses/${courseId}`} className="text-gray-600 hover:text-gray-900 mr-4">
              <FaArrowLeft />
            </Link>
            <h1 className="text-2xl font-bold">Course Certificate</h1>
          </div>
          
          <button
            onClick={handleDownload}
            className="flex items-center bg-burgundy text-white px-4 py-2 rounded-md hover:bg-burgundy/90 transition-colors"
          >
            <FaDownload className="mr-2" />
            Download Certificate
          </button>
        </div>
        
        {/* Certificate */}
        <div className="bg-white p-8 shadow-lg rounded-lg mb-8">
          <div 
            ref={certificateRef}
            className="border-8 border-double border-gray-300 p-8 relative"
            style={{ 
              backgroundImage: 'url(/images/certificate-background.jpg)', 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '600px'
            }}
          >
            {/* This would be replaced with an actual background image */}
            <div className="absolute inset-0 bg-white opacity-90 z-0"></div>
            
            <div className="relative z-10 text-center">
              <div className="mb-6">
                <Image
                  src="/images/logo.png"
                  alt="Terra Legacy Logo"
                  width={120}
                  height={120}
                  className="mx-auto"
                />
              </div>
              
              <h2 className="text-3xl font-serif mb-2">Certificate of Completion</h2>
              <p className="text-gray-600 mb-8">This certifies that</p>
              
              <h3 className="text-2xl font-bold font-serif mb-8">John Doe</h3>
              
              <p className="text-gray-600 mb-4">has successfully completed the course</p>
              
              <h4 className="text-2xl font-bold mb-8">{course.title}</h4>
              
              <p className="text-gray-600 mb-8">
                Instructed by {course.instructor} on {course.completionDate}
              </p>
              
              <div className="flex justify-between items-center mt-16">
                <div className="text-center">
                  {course?.hasSignature ? (
                    <div className="h-16 flex items-end justify-center mb-2">
                      <Image 
                        src={course?.instructorSignature || ''} 
                        alt="Instructor Signature" 
                        width={150} 
                        height={60}
                        className="max-h-16 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="h-px w-48 bg-gray-400 mb-2"></div>
                  )}
                  <p>Instructor Signature</p>
                </div>
                
                <div className="text-center">
                  <div className="h-px w-48 bg-gray-400 mb-2"></div>
                  <p>Director Signature</p>
                </div>
              </div>
              
              <div className="mt-8 text-sm text-gray-500">
                <p>Certificate ID: {course?.certificateId}</p>
                <p>Verify this certificate at terralegal.com/verify</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">About This Certificate</h2>
          <p className="text-gray-600 mb-4">
            This certificate verifies that you have successfully completed the course &quot;{course?.title || 'course'}&quot; 
            taught by {course?.instructor || 'instructor'}. You have demonstrated proficiency in the course material
            by passing all required quizzes and assessments.
          </p>
          <p className="text-gray-600">
            You can share this certificate on your resume, LinkedIn profile, or other professional platforms
            to showcase your knowledge and skills in land investment.
          </p>
        </div>
      </div>
    </div>
  );
}
