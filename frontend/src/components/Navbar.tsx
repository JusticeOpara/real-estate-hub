'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, Home, Heart, PlusCircle, User, LogOut, LayoutDashboard } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="w-8 h-8 text-primary-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                RealEstateHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/properties"
              className={`${
                isActive('/properties')
                  ? 'text-primary-600'
                  : 'text-gray-700 hover:text-primary-600'
              } transition-colors font-medium`}
            >
              Properties
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role === 'seller' && (
                  <Link
                    href="/dashboard/add-property"
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors font-medium"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>List Property</span>
                  </Link>
                )}

                <Link
                  href="/dashboard/favorites"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  <Heart className="w-4 h-4" />
                  <span>Favorites</span>
                </Link>

                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors font-medium">
                    <User className="w-5 h-5" />
                    <span>{user?.name}</span>
                  </button>

                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </div>
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t animate-slide-down">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/properties"
              className="block text-gray-700 hover:text-primary-600 py-2 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Properties
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role === 'seller' && (
                  <Link
                    href="/dashboard/add-property"
                    className="block text-gray-700 hover:text-primary-600 py-2 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    List Property
                  </Link>
                )}

                <Link
                  href="/dashboard/favorites"
                  className="block text-gray-700 hover:text-primary-600 py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Favorites
                  </Link>

                <Link
                  href="/dashboard"
                  className="block text-gray-700 hover:text-primary-600 py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-red-600 hover:text-red-700 py-2 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block text-gray-700 hover:text-primary-600 py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 text-center font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;