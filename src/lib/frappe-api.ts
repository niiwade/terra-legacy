// Frappe LMS API Integration Layer
interface FrappeConfig {
  baseUrl: string;
  apiKey?: string;
  apiSecret?: string;
}

interface FrappeResponse<T = unknown> {
  data: T;
  message?: string;
}

interface Course {
  name: string;
  title: string;
  short_introduction: string;
  description: string;
  image: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  price: number;
  currency: string;
  status: 'Draft' | 'Approved' | 'Published';
  enrollment_status: 'Open' | 'Closed' | 'Limited';
  start_date: string;
  end_date?: string;
  chapters: Chapter[];
  total_lessons: number;
  rating?: number;
  reviews_count?: number;
}

interface Chapter {
  name: string;
  title: string;
  description: string;
  index_: number;
  lessons: Lesson[];
}

interface Lesson {
  name: string;
  title: string;
  body: string;
  include_in_preview: boolean;
  index_: number;
  youtube: string;
  quiz: string;
}

interface User {
  name: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  user_image?: string;
  roles: string[];
}

interface Enrollment {
  name: string;
  course: string;
  member: string;
  progress: number;
  status: 'Active' | 'Completed' | 'Dropped';
  enrollment_date: string;
  completion_date?: string;
}

interface Quiz {
  name: string;
  title: string;
  questions: QuizQuestion[];
}

interface QuizQuestion {
  question: string;
  type: 'Single Choice' | 'Multiple Choice' | 'Fill in the Blank';
  options?: string[];
  correct_answers: string[];
  marks: number;
}

interface Certificate {
  name: string;
  member: string;
  course: string;
  issue_date: string;
  certificate_html: string;
}

class FrappeAPI {
  private config: FrappeConfig;
  private authToken?: string;

  constructor(config: FrappeConfig) {
    this.config = config;
  }

  // Authentication
  async login(username: string, password: string): Promise<{ message: string; home_page: string; full_name: string }> {
    const response = await this.request('/api/method/login', {
      method: 'POST',
      body: {
        usr: username,
        pwd: password
      }
    });
    return response.data;
  }

  async logout(): Promise<void> {
    await this.request('/api/method/logout', {
      method: 'POST'
    });
    this.authToken = undefined;
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.request('/api/method/frappe.auth.get_logged_user');
    return response.data;
  }

  // Course Management
  async getCourses(filters?: Record<string, string | number | boolean>): Promise<Course[]> {
    const queryParams = filters ? '?' + new URLSearchParams(filters as Record<string, string>).toString() : '';
    const response = await this.request(`/api/resource/LMS Course${queryParams}`);
    return response.data as Course[];
  }

  async getCourse(courseId: string): Promise<Course> {
    const response = await this.request(`/api/resource/LMS Course/${courseId}`);
    return response.data;
  }

  async createCourse(courseData: Partial<Course>): Promise<Course> {
    const response = await this.request('/api/resource/LMS Course', {
      method: 'POST',
      body: courseData
    });
    return response.data;
  }

  async updateCourse(courseId: string, courseData: Partial<Course>): Promise<Course> {
    const response = await this.request(`/api/resource/LMS Course/${courseId}`, {
      method: 'PUT',
      body: courseData
    });
    return response.data;
  }

  // Chapter Management
  async getChapters(courseId: string): Promise<Chapter[]> {
    const response = await this.request(`/api/resource/Course Chapter?filters=[["course","=","${courseId}"]]`);
    return response.data;
  }

  async createChapter(chapterData: Partial<Chapter>): Promise<Chapter> {
    const response = await this.request('/api/resource/Course Chapter', {
      method: 'POST',
      body: chapterData
    });
    return response.data;
  }

  // Lesson Management
  async getLessons(chapterId: string): Promise<Lesson[]> {
    const response = await this.request(`/api/resource/Course Lesson?filters=[["chapter","=","${chapterId}"]]`);
    return response.data;
  }

  async getLesson(lessonId: string): Promise<Lesson> {
    const response = await this.request(`/api/resource/Course Lesson/${lessonId}`);
    return response.data;
  }

  async createLesson(lessonData: Partial<Lesson>): Promise<Lesson> {
    const response = await this.request('/api/resource/Course Lesson', {
      method: 'POST',
      body: lessonData
    });
    return response.data;
  }

  // Enrollment Management
  async getEnrollments(userId?: string): Promise<Enrollment[]> {
    const filters = userId ? `?filters=[["member","=","${userId}"]]` : '';
    const response = await this.request(`/api/resource/LMS Enrollment${filters}`);
    return response.data;
  }

  async enrollUser(courseId: string, userId: string): Promise<Enrollment> {
    const response = await this.request('/api/resource/LMS Enrollment', {
      method: 'POST',
      body: {
        course: courseId,
        member: userId
      }
    });
    return response.data;
  }

  async getUserProgress(enrollmentId: string): Promise<{ progress: number; completed_lessons: string[] }> {
    const response = await this.request(`/api/method/lms.lms.doctype.lms_enrollment.lms_enrollment.get_progress?enrollment=${enrollmentId}`);
    return response.data;
  }

  async markLessonComplete(lessonId: string, userId: string): Promise<void> {
    await this.request('/api/method/lms.lms.doctype.course_lesson.course_lesson.mark_lesson_complete', {
      method: 'POST',
      body: {
        lesson: lessonId,
        member: userId
      }
    });
  }

  // Quiz Management
  async getQuiz(quizId: string): Promise<Quiz> {
    const response = await this.request(`/api/resource/LMS Quiz/${quizId}`);
    return response.data;
  }

  async submitQuizAttempt(quizId: string, answers: Record<string, string | string[]>): Promise<{ score: number; passed: boolean }> {
    const response = await this.request('/api/method/lms.lms.doctype.lms_quiz.lms_quiz.submit_quiz', {
      method: 'POST',
      body: {
        quiz: quizId,
        answers: answers
      }
    });
    return response.data;
  }

  // Certificate Management
  async getCertificate(courseId: string, userId: string): Promise<Certificate | null> {
    try {
      const response = await this.request(`/api/resource/LMS Certificate?filters=[["course","=","${courseId}"],["member","=","${userId}"]]`);
      return (response.data as Certificate[])[0] || null;
    } catch {
      return null;
    }
  }

  async generateCertificate(courseId: string, userId: string): Promise<Certificate> {
    const response = await this.request('/api/method/lms.lms.doctype.lms_certificate.lms_certificate.create_certificate', {
      method: 'POST',
      body: {
        course: courseId,
        member: userId
      }
    });
    return response.data;
  }

  // File Upload
  async uploadFile(file: File, doctype: string, docname: string): Promise<{ file_url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('doctype', doctype);
    formData.append('docname', docname);

    const response = await fetch(`${this.config.baseUrl}/api/method/upload_file`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Generic request method
  private async request(endpoint: string, options: {
    method?: string;
    body?: Record<string, unknown>;
    headers?: Record<string, string>;
  } = {}): Promise<FrappeResponse> {
    const { method = 'GET', body, headers = {} } = options;

    const requestHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...headers
    };

    // Add API key authentication if available
    if (this.config.apiKey && this.config.apiSecret) {
      requestHeaders['Authorization'] = `token ${this.config.apiKey}:${this.config.apiSecret}`;
    }

    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
      credentials: 'include' // Important for session-based auth
    };

    if (body && method !== 'GET') {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.config.baseUrl}${endpoint}`, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Frappe API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  }
}

// Create and export API instance
const frappeConfig: FrappeConfig = {
  baseUrl: process.env.NEXT_PUBLIC_FRAPPE_URL || 'http://localhost:8000',
  apiKey: process.env.FRAPPE_API_KEY,
  apiSecret: process.env.FRAPPE_API_SECRET
};

export const frappeAPI = new FrappeAPI(frappeConfig);

// Export types for use in components
export type {
  Course,
  Chapter,
  Lesson,
  User,
  Enrollment,
  Quiz,
  QuizQuestion,
  Certificate
};