// Custom React hooks for Frappe LMS API integration
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { frappeAPI, User } from '@/lib/frappe-api';

// Generic hook for API calls with loading states
function useAPICall<T>(
  apiCall: () => Promise<T>,
  dependencies: unknown[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiCallRef = useRef(apiCall);

  // Update ref when apiCall changes
  useEffect(() => {
    apiCallRef.current = apiCall;
  }, [apiCall]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCallRef.current();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Authentication hooks
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const currentUser = await frappeAPI.getCurrentUser();
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      await frappeAPI.login(username, password);
      await checkAuthStatus();
      return true;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await frappeAPI.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    refetch: checkAuthStatus
  };
}

// Course management hooks
export function useCourses(filters?: Record<string, string | number | boolean>) {
  return useAPICall(() => frappeAPI.getCourses(filters), [filters]);
}

export function useCourse(courseId: string) {
  return useAPICall(() => frappeAPI.getCourse(courseId), [courseId]);
}

export function useChapters(courseId: string) {
  return useAPICall(() => frappeAPI.getChapters(courseId), [courseId]);
}

export function useLessons(chapterId: string) {
  return useAPICall(() => frappeAPI.getLessons(chapterId), [chapterId]);
}

export function useLesson(lessonId: string) {
  return useAPICall(() => frappeAPI.getLesson(lessonId), [lessonId]);
}

// Enrollment hooks
export function useEnrollments(userId?: string) {
  return useAPICall(() => frappeAPI.getEnrollments(userId), [userId]);
}

export function useEnrollment() {
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enroll = async (courseId: string, userId: string) => {
    try {
      setEnrolling(true);
      setError(null);
      const enrollment = await frappeAPI.enrollUser(courseId, userId);
      return enrollment;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Enrollment failed';
      setError(errorMsg);
      throw err;
    } finally {
      setEnrolling(false);
    }
  };

  return { enroll, enrolling, error };
}

export function useProgress(enrollmentId: string) {
  return useAPICall(() => frappeAPI.getUserProgress(enrollmentId), [enrollmentId]);
}

// Quiz hooks
export function useQuiz(quizId: string) {
  return useAPICall(() => frappeAPI.getQuiz(quizId), [quizId]);
}

export function useQuizSubmission() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submitQuiz = async (quizId: string, answers: Record<string, string | string[]>) => {
    try {
      setSubmitting(true);
      setError(null);
      const quizResult = await frappeAPI.submitQuizAttempt(quizId, answers);
      setResult(quizResult);
      return quizResult;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Quiz submission failed';
      setError(errorMsg);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return { submitQuiz, submitting, result, error };
}

// Certificate hooks
export function useCertificate(courseId: string, userId: string) {
  return useAPICall(() => frappeAPI.getCertificate(courseId, userId), [courseId, userId]);
}

export function useCertificateGeneration() {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCertificate = async (courseId: string, userId: string) => {
    try {
      setGenerating(true);
      setError(null);
      const certificate = await frappeAPI.generateCertificate(courseId, userId);
      return certificate;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Certificate generation failed';
      setError(errorMsg);
      throw err;
    } finally {
      setGenerating(false);
    }
  };

  return { generateCertificate, generating, error };
}

// Lesson completion hook
export function useLessonCompletion() {
  const [marking, setMarking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markComplete = async (lessonId: string, userId: string) => {
    try {
      setMarking(true);
      setError(null);
      await frappeAPI.markLessonComplete(lessonId, userId);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to mark lesson complete';
      setError(errorMsg);
      throw err;
    } finally {
      setMarking(false);
    }
  };

  return { markComplete, marking, error };
}

// File upload hook
export function useFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File, doctype: string, docname: string) => {
    try {
      setUploading(true);
      setError(null);
      setProgress(0);
      
      // Simulate progress for now - in a real implementation you'd track actual upload progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const result = await frappeAPI.uploadFile(file, doctype, docname);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMsg);
      throw err;
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1000); // Reset progress after 1 second
    }
  };

  return { uploadFile, uploading, progress, error };
}

// Combined hook for course with enrollment status
export function useCourseWithEnrollment(courseId: string, userId?: string) {
  const { data: course, loading: courseLoading, error: courseError } = useCourse(courseId);
  const { data: enrollments, loading: enrollmentLoading } = useEnrollments(userId);
  
  const enrollment = enrollments?.find(e => e.course === courseId);
  const isEnrolled = !!enrollment;
  
  return {
    course,
    enrollment,
    isEnrolled,
    loading: courseLoading || enrollmentLoading,
    error: courseError
  };
}