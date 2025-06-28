'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUpload, FaSave, FaTrash, FaArrowLeft } from 'react-icons/fa';

// Mock course data - in a real app, this would come from an API or database
const coursesData = [
  {
    id: 'c1',
    title: 'Land Investment Fundamentals',
    instructor: 'Dr. Sarah Johnson',
    signatureUrl: '/images/signatures/signature-sarah-johnson.png',
    hasSignature: true
  },
  {
    id: 'c2',
    title: 'Advanced Land Acquisition Strategies',
    instructor: 'Michael Rodriguez, MBA',
    signatureUrl: '/images/signatures/signature-michael-rodriguez.png',
    hasSignature: true
  },
  {
    id: 'c3',
    title: 'Land Development and Zoning',
    instructor: 'Prof. Emily Chen',
    signatureUrl: '',
    hasSignature: false
  },
  {
    id: 'c7',
    title: 'Sustainable Land Development',
    instructor: 'Dr. Lisa Green',
    signatureUrl: '',
    hasSignature: false
  }
];

export default function CertificateManagementPage() {
  const [courses, setCourses] = useState(coursesData);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.match('image.*')) {
      alert('Please select an image file (PNG, JPG, JPEG)');
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size should be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSignature = () => {
    if (!selectedCourse || !previewImage) return;
    
    setSaving(true);
    
    // Simulate API call to save signature
    setTimeout(() => {
      setCourses(courses.map(course => {
        if (course.id === selectedCourse) {
          return {
            ...course,
            signatureUrl: previewImage,
            hasSignature: true
          };
        }
        return course;
      }));
      
      setSuccessMessage('Signature saved successfully!');
      setSaving(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1500);
  };

  const handleDeleteSignature = (courseId: string) => {
    if (confirm('Are you sure you want to delete this signature?')) {
      setCourses(courses.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            signatureUrl: '',
            hasSignature: false
          };
        }
        return course;
      }));
      
      if (courseId === selectedCourse) {
        setSelectedCourse(null);
        setPreviewImage(null);
      }
    }
  };

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourse(courseId);
    const course = courses.find(c => c.id === courseId);
    setPreviewImage(course?.hasSignature ? course.signatureUrl : null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Link href="/admin/courses" className="text-gray-600 hover:text-gray-900 mr-4">
              <FaArrowLeft />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Certificate Signature Management</h1>
          </div>
          <p className="text-gray-600">Upload and manage your signature for course certificates</p>
        </div>

        {successMessage && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {successMessage}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 bg-gray-100 border-b">
              <h2 className="font-bold text-lg">Your Courses</h2>
            </div>
            <div className="divide-y">
              {courses.map(course => (
                <div 
                  key={course.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedCourse === course.id ? 'bg-burgundy/10' : ''
                  }`}
                  onClick={() => handleSelectCourse(course.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-gray-600">{course.instructor}</p>
                    </div>
                    <div className="flex items-center">
                      {course.hasSignature ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Uploaded
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Missing
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Signature Upload */}
          <div className="lg:col-span-2">
            {selectedCourse ? (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">
                  {courses.find(c => c.id === selectedCourse)?.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  Upload your signature image to be displayed on course certificates
                </p>
                
                <div className="mb-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50">
                    {previewImage ? (
                      <div className="mb-4 p-4 bg-white rounded shadow-sm">
                        <Image 
                          src={previewImage} 
                          alt="Signature Preview" 
                          width={300} 
                          height={100}
                          className="max-h-32 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="text-center mb-4">
                        <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          Upload your signature as PNG or JPG (transparent background recommended)
                        </p>
                        <p className="text-xs text-gray-500">
                          Max file size: 2MB
                        </p>
                      </div>
                    )}
                    
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/png,image/jpeg,image/jpg"
                      className="hidden"
                    />
                    
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy"
                    >
                      {previewImage ? 'Change Signature' : 'Select Signature File'}
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => handleDeleteSignature(selectedCourse)}
                    disabled={!courses.find(c => c.id === selectedCourse)?.hasSignature}
                    className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
                      courses.find(c => c.id === selectedCourse)?.hasSignature
                        ? 'text-red-700 hover:bg-red-50'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <FaTrash className="mr-2 -ml-1 h-4 w-4" />
                    Delete Signature
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleSaveSignature}
                    disabled={!previewImage || saving}
                    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      previewImage && !saving
                        ? 'bg-burgundy hover:bg-burgundy/90'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2 -ml-1"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="mr-2 -ml-1 h-4 w-4" />
                        Save Signature
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium">No course selected</h3>
                  <p className="mt-1 text-sm">
                    Select a course from the list to upload or manage your signature
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Certificate Preview Section */}
        {selectedCourse && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">Certificate Preview</h2>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <div 
                className="border-8 border-double border-gray-300 p-8 relative"
                style={{ 
                  backgroundImage: 'url(/images/certificate-background.jpg)', 
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '400px'
                }}
              >
                <div className="absolute inset-0 bg-white opacity-90 z-0"></div>
                
                <div className="relative z-10 text-center">
                  <div className="mb-4">
                    <Image
                      src="/images/logo.png"
                      alt="Terra Legacy Logo"
                      width={80}
                      height={80}
                      className="mx-auto"
                    />
                  </div>
                  
                  <h2 className="text-2xl font-serif mb-2">Certificate of Completion</h2>
                  <p className="text-gray-600 mb-4">This certifies that</p>
                  
                  <h3 className="text-xl font-bold font-serif mb-4">[Student Name]</h3>
                  
                  <p className="text-gray-600 mb-2">has successfully completed the course</p>
                  
                  <h4 className="text-xl font-bold mb-4">{courses.find(c => c.id === selectedCourse)?.title}</h4>
                  
                  <p className="text-gray-600 mb-6">
                    Instructed by {courses.find(c => c.id === selectedCourse)?.instructor}
                  </p>
                  
                  <div className="flex justify-between items-center mt-8">
                    <div className="text-center">
                      {previewImage ? (
                        <div className="h-16 flex items-end justify-center">
                          <Image 
                            src={previewImage} 
                            alt="Instructor Signature" 
                            width={150} 
                            height={60}
                            className="max-h-16 object-contain"
                          />
                        </div>
                      ) : (
                        <div className="h-px w-32 bg-gray-400"></div>
                      )}
                      <p className="text-sm mt-1">Instructor Signature</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="h-px w-32 bg-gray-400"></div>
                      <p className="text-sm mt-1">Director Signature</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
