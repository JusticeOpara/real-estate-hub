'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Property } from '@/types';
import { formatPrice } from '@/lib/utils';
import { MapPin, Bed, Bath, Maximize, Heart, Eye } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { AxiosError } from 'axios';


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
    } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || 'Failed to update favorites');
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <Link href={`/properties/${property._id}`}>
      <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl overflow-hidden hover:border-[#703BF7] transition-all duration-300 transform hover:-translate-y-1 group">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.images[0]?.url || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-[#703BF7] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
              {property.listingType}
            </span>
            {property.featured && (
              <span className="bg-[#FF7A00] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                Featured
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            disabled={isLoading}
            className="absolute top-4 right-4 bg-[#1A1A1A] border border-[#262626] p-2 rounded-full hover:bg-[#262626] hover:border-[#703BF7] transition-all disabled:opacity-50"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-[#999999]'
              }`}
            />
          </button>

          {/* Views */}
          <div className="absolute bottom-4 right-4 bg-[#141414]/80 backdrop-blur-sm text-[#999999] px-3 py-1 rounded-full text-xs flex items-center space-x-1 border border-[#262626]">
            <Eye className="w-3 h-3" />
            <span>{property.views}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Price */}
          <div className="text-2xl font-bold text-[#703BF7] mb-2">
            {formatPrice(property.price)}
            {property.listingType === 'rent' && <span className="text-sm text-[#999999]">/month</span>}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1 group-hover:text-[#703BF7] transition-colors">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-[#999999] mb-4">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="text-sm line-clamp-1">
              {property.location.city}, {property.location.state}
            </span>
          </div>

          {/* Specifications */}
          <div className="flex items-center justify-between text-[#999999] pt-4 border-t border-[#262626]">
            {property.specifications.bedrooms && (
              <div className="flex items-center space-x-1">
                <Bed className="w-4 h-4 text-[#703BF7]" />
                <span className="text-sm font-medium">{property.specifications.bedrooms} Beds</span>
              </div>
            )}
            {property.specifications.bathrooms && (
              <div className="flex items-center space-x-1">
                <Bath className="w-4 h-4 text-[#703BF7]" />
                <span className="text-sm font-medium">{property.specifications.bathrooms} Baths</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Maximize className="w-4 h-4 text-[#703BF7]" />
              <span className="text-sm font-medium">
                {property.specifications.area} {property.specifications.areaUnit}
              </span>
            </div>
          </div>

          {/* Property Type */}
          <div className="mt-4">
            <span className="inline-block bg-[#262626] text-[#999999] px-3 py-1 rounded-full text-xs font-medium capitalize border border-[#333333]">
              {property.propertyType}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;