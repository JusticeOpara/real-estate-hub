'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Property } from '@/types';
import { formatPrice } from '@/lib/utils';
import { MapPin, Bed, Bath, Maximize, Heart, Eye } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';


interface PropertyCardProps {
  property: Property;
  onFavoriteChange?: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onFavoriteChange }) => {
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to add favorites');
      return;
    }

    setIsLoading(true);
    try {
      if (isFavorite) {
        await api.delete(`/favorites/${property._id}`);
        toast.success('Removed from favorites');
        setIsFavorite(false);
      } else {
        await api.post('/favorites', { propertyId: property._id });
        toast.success('Added to favorites');
        setIsFavorite(true);
      }
      onFavoriteChange?.();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update favorites');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link href={`/properties/${property._id}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.images[0]?.url || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
              {property.listingType}
            </span>
            {property.featured && (
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                Featured
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            disabled={isLoading}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>

          {/* Views */}
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>{property.views}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Price */}
          <div className="text-2xl font-bold text-primary-600 mb-2">
            {formatPrice(property.price)}
            {property.listingType === 'rent' && <span className="text-sm text-gray-500">/month</span>}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="text-sm line-clamp-1">
              {property.location.city}, {property.location.state}
            </span>
          </div>

          {/* Specifications */}
          <div className="flex items-center justify-between text-gray-700 pt-4 border-t">
            {property.specifications.bedrooms && (
              <div className="flex items-center space-x-1">
                <Bed className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium">{property.specifications.bedrooms} Beds</span>
              </div>
            )}
            {property.specifications.bathrooms && (
              <div className="flex items-center space-x-1">
                <Bath className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium">{property.specifications.bathrooms} Baths</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Maximize className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium">
                {property.specifications.area} {property.specifications.areaUnit}
              </span>
            </div>
          </div>

          {/* Property Type */}
          <div className="mt-4">
            <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium capitalize">
              {property.propertyType}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;