'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiTrash2, FiChevronRight } from 'react-icons/fi';
import { Category } from '@/lib/db/schema';

interface CategoryWithChildren extends Category {
  children?: CategoryWithChildren[];
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryWithChildren[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories?flat=true');
      const data = await res.json();

      // Build tree structure
      const categoryMap = new Map<string, CategoryWithChildren>();
      const rootCategories: CategoryWithChildren[] = [];

      // First pass: create all nodes
      (data.categories || []).forEach((cat: Category) => {
        categoryMap.set(cat.id, { ...cat, children: [] });
      });

      // Second pass: build tree
      (data.categories || []).forEach((cat: Category) => {
        const node = categoryMap.get(cat.id)!;
        if (cat.parentId && categoryMap.has(cat.parentId)) {
          categoryMap.get(cat.parentId)!.children!.push(node);
        } else {
          rootCategories.push(node);
        }
      });

      setCategories(rootCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    setDeleteId(id);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (res.ok) {
        fetchCategories(); // Refetch to update tree
      } else {
        alert(data.error || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category');
    } finally {
      setDeleteId(null);
    }
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 0: return 'Category';
      case 1: return 'Subcategory';
      case 2: return 'Sub-subcategory';
      default: return `Level ${level}`;
    }
  };

  const renderCategory = (category: CategoryWithChildren, depth: number = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expanded.has(category.id);

    return (
      <div key={category.id}>
        <div
          className={`flex items-center justify-between py-3 px-4 hover:bg-gray-50 ${
            depth > 0 ? 'border-l-2 border-gray-200' : ''
          }`}
          style={{ paddingLeft: `${depth * 24 + 16}px` }}
        >
          <div className="flex items-center flex-1">
            {hasChildren ? (
              <button
                onClick={() => toggleExpand(category.id)}
                className="p-1 mr-2 hover:bg-gray-200 rounded"
              >
                <FiChevronRight
                  className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                />
              </button>
            ) : (
              <div className="w-6 mr-2" />
            )}

            <div>
              <p className="font-medium text-gray-900">{category.name}</p>
              <p className="text-xs text-gray-500">
                {getLevelLabel(category.level)} • {category.slug}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              category.isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {category.isActive ? 'Active' : 'Inactive'}
            </span>

            <Link
              href={`/admin/categories/${category.id}`}
              className="p-2 text-gray-500 hover:text-[#3c4b33] transition-colors"
              title="Edit"
            >
              <FiEdit2 className="w-4 h-4" />
            </Link>

            <button
              onClick={() => handleDelete(category.id)}
              disabled={deleteId === category.id}
              className="p-2 text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
              title="Delete"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {category.children!.map((child) => renderCategory(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
        <Link
          href="/admin/categories/new"
          className="flex items-center px-4 py-2 bg-[#3c4b33] text-white rounded-lg hover:bg-[#4a5d3f] transition-colors"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          New Category
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3c4b33] mx-auto"></div>
          </div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No categories yet. Create your first category!
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {categories.map((category) => renderCategory(category))}
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
        <p className="font-medium mb-2">Category Hierarchy:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Categories</strong> - Top-level groupings</li>
          <li><strong>Subcategories</strong> - Second-level groupings within categories</li>
          <li><strong>Sub-subcategories</strong> - Third-level groupings within subcategories</li>
        </ul>
      </div>
    </div>
  );
}
