'use client';

import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Home, Heart, PlusCircle, LayoutGrid } from 'lucide-react';
import api from '@/lib/api';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    properties: 0,
    favorites: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [propertiesRes, favoritesRes] = await Promise.all([
        user?.role === 'seller' ? api.get('/properties/my-properties') : Promise.resolve({ data: { count: 0 } }),
        api.get('/favorites'),
      ]);

      setStats({
        properties: propertiesRes.data.count || 0,
        favorites: favoritesRes.data.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600">Manage your properties and favorites</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {user?.role === 'seller' && (
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <Home className="w-10 h-10" />
                  <span className="text-3xl font-bold">{stats.properties}</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">My Properties</h3>
                <p className="text-primary-100 text-sm">Listed properties</p>
              </div>
            )}

            <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <Heart className="w-10 h-10" />
                <span className="text-3xl font-bold">{stats.favorites}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">Favorites</h3>
              <p className="text-red-100 text-sm">Saved properties</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <LayoutGrid className="w-10 h-10" />
                <span className="text-lg font-semibold">Active</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">Account Status</h3>
              <p className="text-green-100 text-sm capitalize">{user?.role} account</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user?.role === 'seller' && (
                <>
                  <Link
                    href="/dashboard/add-property"
                    className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
                  >
                    <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-200 transition-colors">
                      <PlusCircle className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Add Property</div>
                      <div className="text-sm text-gray-600">List a new property</div>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/my-properties"
                    className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
                  >
                    <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-200 transition-colors">
                      <Home className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">My Properties</div>
                      <div className="text-sm text-gray-600">Manage your listings</div>
                    </div>
                  </Link>
                </>
              )}

              <Link
                href="/dashboard/favorites"
                className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
              >
                <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-200 transition-colors">
                  <Heart className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">My Favorites</div>
                  <div className="text-sm text-gray-600">View saved properties</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Profile Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                <div className="text-lg font-semibold text-gray-900">{user?.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <div className="text-lg font-semibold text-gray-900">{user?.email}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
                <div className="text-lg font-semibold text-gray-900 capitalize">{user?.role}</div>
              </div>
              {user?.phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                  <div className="text-lg font-semibold text-gray-900">{user.phone}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}