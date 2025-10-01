'use client';

import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import PropertyCard from '@/components/PropertyCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import api from '@/lib/api';
import { Property } from '@/types';
import Link from 'next/link';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);
  console.log(favorites,"--favorties")

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/favorites');
      setFavorites(response.data.data.favorites.map((fav) => fav.property));
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Favorites</h1>
            <p className="text-gray-600">Properties you&apos;ve saved for later</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-xl shadow-lg p-12">
                <div className="text-6xl mb-4">❤️</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Favorites Yet</h3>
                <p className="text-gray-600 mb-6">
                  Start exploring properties and save your favorites
                </p>
              <Link href="/properties" className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
  Browse Properties
</Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  onFavoriteChange={fetchFavorites}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}