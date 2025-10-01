export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'admin';
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  propertyType: 'house' | 'apartment' | 'land' | 'commercial' | 'villa';
  listingType: 'sale' | 'rent';
  location: {
    address: string;
    city: string;
    state: string;
    zipCode?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  specifications: {
    bedrooms?: number;
    bathrooms?: number;
    area: number;
    areaUnit: 'sqft' | 'sqm';
    yearBuilt?: number;
  };
  amenities?: string[];
  images: {
    url: string;
    publicId?: string;
  }[];
  owner: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  status: 'available' | 'pending' | 'sold' | 'rented';
  featured?: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface PropertyFilters {
  page?: number;
  limit?: number;
  propertyType?: string;
  listingType?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  sort?: string;
  search?: string;
}