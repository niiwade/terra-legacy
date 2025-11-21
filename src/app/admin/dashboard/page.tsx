'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiFileText, FiPackage, FiFolder, FiPlus } from 'react-icons/fi';

interface Stats {
  blogs: number;
  products: number;
  categories: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({ blogs: 0, products: 0, categories: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [blogsRes, productsRes, categoriesRes] = await Promise.all([
        fetch('/api/admin/blogs'),
        fetch('/api/admin/products'),
        fetch('/api/admin/categories?flat=true'),
      ]);

      const [blogsData, productsData, categoriesData] = await Promise.all([
        blogsRes.json(),
        productsRes.json(),
        categoriesRes.json(),
      ]);

      setStats({
        blogs: blogsData.blogs?.length || 0,
        products: productsData.products?.length || 0,
        categories: categoriesData.categories?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: 'Blogs',
      count: stats.blogs,
      icon: FiFileText,
      href: '/admin/blogs',
      color: 'bg-blue-500',
    },
    {
      name: 'Products',
      count: stats.products,
      icon: FiPackage,
      href: '/admin/products',
      color: 'bg-green-500',
    },
    {
      name: 'Categories',
      count: stats.categories,
      icon: FiFolder,
      href: '/admin/categories',
      color: 'bg-purple-500',
    },
  ];

  const quickActions = [
    { name: 'New Blog', href: '/admin/blogs/new', icon: FiFileText },
    { name: 'New Product', href: '/admin/products/new', icon: FiPackage },
    { name: 'New Category', href: '/admin/categories/new', icon: FiFolder },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome to Admin Dashboard</h2>
        <p className="mt-1 text-gray-600">Manage your blogs, products, and categories</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : stat.count}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#3c4b33] hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 bg-[#3c4b33] rounded-lg">
                <FiPlus className="w-4 h-4 text-white" />
              </div>
              <span className="ml-3 font-medium text-gray-900">{action.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Getting Started</h3>
        <div className="space-y-3 text-gray-600">
          <p>1. Create categories for organizing your content</p>
          <p>2. Add products to your store</p>
          <p>3. Write blog posts to engage your audience</p>
          <p>4. Upload images through the file manager</p>
        </div>
      </div>
    </div>
  );
}
