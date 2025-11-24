'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiHome, FiFileText, FiPackage, FiFolder, FiUsers, FiCalendar, FiStar, FiHelpCircle, FiBook, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/auth/session');
      const data = await res.json();

      if (data.authenticated) {
        setUser(data.user);
      } else if (!pathname.includes('/admin/login')) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Session check error:', error);
      if (!pathname.includes('/admin/login')) {
        router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  }, [pathname, router]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Don't show admin layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3c4b33]"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: FiHome },
    { name: 'Blogs', href: '/admin/blogs', icon: FiFileText },
    { name: 'Products', href: '/admin/products', icon: FiPackage },
    { name: 'Courses', href: '/admin/courses-admin', icon: FiBook },
    { name: 'Events', href: '/admin/events', icon: FiCalendar },
    { name: 'Testimonials', href: '/admin/testimonials', icon: FiStar },
    { name: 'FAQs', href: '/admin/faqs', icon: FiHelpCircle },
    { name: 'Categories', href: '/admin/categories', icon: FiFolder },
    { name: 'Admin Users', href: '/admin/users', icon: FiUsers },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#3c4b33] text-white transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-[#4a5d3f] flex-shrink-0">
            <Link href="/admin/dashboard" className="text-xl font-bold">
              Terra Admin
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded hover:bg-[#4a5d3f]"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto mt-6 px-3 pb-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#4a5d3f] text-white'
                      : 'text-gray-300 hover:bg-[#4a5d3f] hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex-shrink-0 p-4 border-t border-[#4a5d3f]">
            <div className="mb-3 px-4">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-[#4a5d3f] hover:text-white rounded-lg transition-colors"
            >
              <FiLogOut className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white shadow-sm h-16 flex items-center px-4 sm:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <h1 className="ml-2 lg:ml-4 text-base sm:text-lg font-semibold text-gray-900 truncate">
            {navigation.find(item => pathname === item.href || pathname.startsWith(item.href + '/'))?.name || 'Admin'}
          </h1>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
