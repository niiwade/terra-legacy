'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBook, FaGraduationCap, FaCertificate, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const navItems = [
    {
      name: 'My Courses',
      href: '/dashboard/courses',
      icon: <FaBook className="mr-3" />,
      active: pathname.startsWith('/dashboard/courses')
    },
    {
      name: 'Certificates',
      href: '/dashboard/certificates',
      icon: <FaCertificate className="mr-3" />,
      active: pathname === '/dashboard/certificates'
    },
    {
      name: 'Profile',
      href: '/dashboard/profile',
      icon: <FaUser className="mr-3" />,
      active: pathname === '/dashboard/profile'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-gray-200 py-4 px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="Terra Legacy Logo" 
              width={40} 
              height={40}
              className="mr-2"
            />
            <span className="font-bold text-lg">Terra Legacy</span>
          </Link>
          
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </header>
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logo.png" 
                alt="Terra Legacy Logo" 
                width={40} 
                height={40}
                className="mr-2"
              />
              <span className="font-bold text-lg">Terra Legacy</span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <div className="mb-6">
              <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Learning
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    item.active
                      ? 'bg-burgundy text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    if (sidebarOpen) setSidebarOpen(false);
                  }}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="mb-6">
              <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Explore
              </div>
              <Link
                href="/courses"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  if (sidebarOpen) setSidebarOpen(false);
                }}
              >
                <FaGraduationCap className="mr-3" />
                Course Catalog
              </Link>
            </div>
          </nav>
          
          {/* User Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <FaUser className="text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
              </div>
            </div>
            <button className="mt-4 flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
              <FaSignOutAlt className="mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Main Content */}
      <div className="md:pl-64">
        <main>{children}</main>
      </div>
    </div>
  );
}
