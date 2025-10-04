import React from 'react';
import Link from 'next/link';
import {  Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';



const Footer: React.FC = () => {
  return (
    <footer className="bg-[#141414] text-[#999999] border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-white">
                Estatein
              </span>
            </div>
            <p className="text-sm mb-6 leading-relaxed">
              Your trusted partner in finding the perfect property. Browse thousands of listings and find your dream home today.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#262626] flex items-center justify-center hover:border-[#703BF7] hover:bg-[#262626] transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#262626] flex items-center justify-center hover:border-[#703BF7] hover:bg-[#262626] transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#262626] flex items-center justify-center hover:border-[#703BF7] hover:bg-[#262626] transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#262626] flex items-center justify-center hover:border-[#703BF7] hover:bg-[#262626] transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/properties" className="hover:text-[#703BF7] transition-colors">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/properties?listingType=sale" className="hover:text-[#703BF7] transition-colors">
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link href="/properties?listingType=rent" className="hover:text-[#703BF7] transition-colors">
                  Properties for Rent
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-[#703BF7] transition-colors">
                  Become a Seller
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Property Types</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/properties?propertyType=house" className="hover:text-[#703BF7] transition-colors">
                  Houses
                </Link>
              </li>
              <li>
                <Link href="/properties?propertyType=apartment" className="hover:text-[#703BF7] transition-colors">
                  Apartments
                </Link>
              </li>
              <li>
                <Link href="/properties?propertyType=villa" className="hover:text-[#703BF7] transition-colors">
                  Villas
                </Link>
              </li>
              <li>
                <Link href="/properties?propertyType=land" className="hover:text-[#703BF7] transition-colors">
                  Land
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#703BF7] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">123 Real Estate St, Property City, PC 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#703BF7] flex-shrink-0" />
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#703BF7] flex-shrink-0" />
                <span>info@estatein.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#262626] mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Estatein. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;