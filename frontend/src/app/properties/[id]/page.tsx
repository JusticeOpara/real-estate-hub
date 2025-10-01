'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Property } from '@/types';
import api from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { formatPrice, formatDate } from '@/lib/utils';
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Calendar,
  Eye,
  Heart,
  Phone,
  Mail,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  const fetchProperty = async () => {
    try {
      const response = await api.get(`/properties/${params.id}`);
      setProperty(response.data.data.property);
    } catch (error) {
      toast.error('Property not found');
      router.push('/properties');
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add favorites');
      return;
    }

    try {
      if (isFavorite) {
        await api.delete(`/favorites/${property?._id}`);
        toast.success('Removed from favorites');
        setIsFavorite(false);
      } else {
        await api.post('/favorites', { propertyId: property?._id });
        toast.success('Added to favorites');
        setIsFavorite(true);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update favorites');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!property) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Properties</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-96 md:h-[500px]">
                <img
                  src={property.images[currentImageIndex]?.url || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase">
                    {property.listingType}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold uppercase ${
                    property.status === 'available'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}>
                    {property.status}
                  </span>
                </div>

                {/* Favorite */}
                <button
                  onClick={handleFavorite}
                  className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-red-50 transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                </button>

                {/* Navigation */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0 ? property.images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === property.images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors rotate-180"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {property.images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex
                          ? 'border-primary-600'
                          : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {property.title}
                </h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="text-lg">
                    {property.location.address}, {property.location.city}, {property.location.state}
                  </span>
                </div>
                <div className="text-4xl font-bold text-primary-600">
                  {formatPrice(property.price)}
                  {property.listingType === 'rent' && (
                    <span className="text-lg text-gray-500">/month</span>
                  )}
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b">
                {property.specifications.bedrooms && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <Bed className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {property.specifications.bedrooms}
                      </div>
                      <div className="text-sm text-gray-600">Bedrooms</div>
                    </div>
                  </div>
                )}

                {property.specifications.bathrooms && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <Bath className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {property.specifications.bathrooms}
                      </div>
                      <div className="text-sm text-gray-600">Bathrooms</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Maximize className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {property.specifications.area}
                    </div>
                    <div className="text-sm text-gray-600">
                      {property.specifications.areaUnit}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Eye className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{property.views}</div>
                    <div className="text-sm text-gray-600">Views</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="capitalize">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span>Listed on {formatDate(property.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <span className="capitalize font-medium">Type:</span>
                  <span className="capitalize">{property.propertyType}</span>
                </div>
                {property.specifications.yearBuilt && (
                  <div className="flex items-center space-x-2 text-gray-700">
                    <span className="font-medium">Built in:</span>
                    <span>{property.specifications.yearBuilt}</span>
                  </div>
                )}
                {property.location.zipCode && (
                  <div className="flex items-center space-x-2 text-gray-700">
                    <span className="font-medium">Zip Code:</span>
                    <span>{property.location.zipCode}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Agent</h3>

              <div className="mb-6 pb-6 border-b">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-bold text-lg">
                      {property.owner.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{property.owner.name}</div>
                    <div className="text-sm text-gray-600">Property Owner</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {property.owner.phone && (
                  <a
                    href={`tel:${property.owner.phone}`}
                    className="flex items-center justify-center space-x-2 w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call Now</span>
                  </a>
                )}

                <a
                  href={`mailto:${property.owner.email}`}
                  className="flex items-center justify-center space-x-2 w-full border-2 border-primary-600 text-primary-600 py-3 rounded-lg hover:bg-primary-50 transition-colors font-medium"
                >
                  <Mail className="w-5 h-5" />
                  <span>Send Email</span>
                </a>
              </div>

              {property.owner.phone && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Contact Number</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {property.owner.phone}
                  </div>
                </div>
              )}

              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">Email Address</div>
                <div className="text-sm font-medium text-gray-900 break-all">
                  {property.owner.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}