'use client';

import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import PropertyCard from '@/components/PropertyCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import api from '@/lib/api';
import { Property } from '@/types';
import Link from 'next/link';
import { PlusCircle,  Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export default function MyPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const response = await api.get('/properties/my-properties');
      setProperties(response.data.data.properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) {
      return;
    }

    try {
      await api.delete(`/properties/${id}`);
      toast.success('Property deleted successfully');
      fetchMyProperties();
    } catch (err) {
     const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || 'Failed to delete property');
    }
  };

  return (
    <ProtectedRoute allowedRoles={['seller', 'admin']}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Properties</h1>
              <p className="text-gray-600">Manage your property listings</p>
            </div>
            <Link
              href="/dashboard/add-property"
              className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Add Property</span>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-xl shadow-lg p-12">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  No Properties Listed Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start listing your properties and reach potential buyers
                </p>
                <Link
                  href="/dashboard/add-property"
                  className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Add Your First Property</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div key={property._id} className="relative group">
                  <PropertyCard property={property} onFavoriteChange={fetchMyProperties} />
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
