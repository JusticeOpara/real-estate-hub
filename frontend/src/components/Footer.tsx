'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold text-white">RealEstateHub</span>
            </div>
            <p className="text-sm mb-4">
              Your trusted partner in finding the perfect property. Browse thousands of listings and find your dream home today.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/properties" className="hover:text-primary-500 transition-colors">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/properties?listingType=sale" className="hover:text-primary-500 transition-colors">
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link href="/properties?listingType=rent" className="hover:text-primary-500 transition-colors">
                  Properties for Rent
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-primary-500 transition-colors">
                  Become a Seller
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-white font-semibold mb-4">Property Types</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/properties?propertyType=house" className="hover:text-primary-500 transition-colors">
                  Houses
                </Link>
              </li>
              <li>
                <Link href="/properties?propertyType=apartment" className="hover:text-primary-500 transition-colors">
                  Apartments
                </Link>
              </li>
              <li>
                <Link href="/properties?propertyType=villa" className="hover:text-primary-500 transition-colors">
                  Villas
                </Link>
              </li>
              <li>
                <Link href="/properties?propertyType=land" className="hover:text-primary-500 transition-colors">
                  Land
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span>123 Real Estate St, Property City, PC 12345</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>info@realestatehub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} RealEstateHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;