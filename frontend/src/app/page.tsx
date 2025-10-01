'use client';

import React, { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Property } from '@/types';
import api from '@/lib/api';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Home as HomeIcon, MapPin } from 'lucide-react';

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const response = await api.get('/properties?limit=6&sort=-createdAt');
      setFeaturedProperties(response.data.data.properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Hero />

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Properties</h2>
            <p className="text-gray-600">Discover our hand-picked selection of premium properties</p>
          </div>
          <Link
            href="/properties"
            className="hidden md:flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link
                href="/properties"
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              >
                <span>View All Properties</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose RealEstateHub?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the best service to help you find your dream property
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <HomeIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Wide Range of Properties</h3>
              <p className="text-gray-600">
                Browse through thousands of verified properties across multiple cities and find the perfect match for your needs.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Best Market Prices</h3>
              <p className="text-gray-600">
                Get competitive pricing and great deals. We ensure transparency in all property transactions.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Prime Locations</h3>
              <p className="text-gray-600">
                Properties in the best neighborhoods and locations. Find homes near your workplace, schools, and amenities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Dream Property?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of happy customers who found their perfect home with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/properties"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-block"
            >
              Start Searching
            </Link>
            <Link
              href="/register"
              className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-800 transition-colors inline-block border-2 border-white"
            >
              List Your Property
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
