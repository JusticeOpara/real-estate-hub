'use client';

import React, { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Property } from '@/types';
import api from '@/lib/api';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Home as HomeIcon, MapPin } from 'lucide-react';
import Testimonial from '@/components/Testimonial';
import FAQSection from '@/components/Faq';
import Feature from '@/components/Feature';

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  /**
   * Fetches the featured properties from the API.
   * Sets the featuredProperties state with the fetched properties.
   * Sets the loading state to false when the fetch is complete.
   */
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
    <div className='bg-[#141414]'>
      <Hero />

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Featured Properties</h2>
            <p className="text-white">Discover our hand-picked selection of premium properties</p>
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
                className="inline-flex items-center space-x-2 text-white font-semibold transition-colors"
              >
                <span>View All Properties</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </>
        )}
      </section>

    <Feature/>

      <Testimonial/>
      <FAQSection/>

      
      <section className="bg-[#141414] py-20 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          {/* Text Content */}
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Start Your Real Estate Journey Today
            </h2>
            <p className="text-[#999999] text-base leading-relaxed">
              Your dream property is just a click away. Whether you&apos;re looking for a new home, a strategic investment, or expert real estate advice, Estatein is here to assist you every step of the way. Take the first step towards your real estate goals and explore our available properties or get in touch with our team for personalized assistance.
            </p>
          </div>

          {/* CTA Button */}
          <button className="px-8 py-4 bg-[#703BF7] text-white rounded-lg hover:bg-[#8254f8] transition-colors font-medium whitespace-nowrap">
            Explore Properties
          </button>
        </div>
      </div>
    </section>
    </div>
  );
}
