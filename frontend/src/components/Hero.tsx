"use client";

import React from "react";
import { ArrowUpRight, Home, Wallet, Building2, Sparkles } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <div className="bg-[#141414] min-h-screen text-white border-t border-[#262626]">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Discover Your Dream Property with Estatein
              </h1>
              <p className="text-[#999999] text-lg leading-relaxed">
                Your journey to finding the perfect property begins here.
                Explore our listings to find the home that matches your dreams.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 border border-[#262626] text-white rounded-lg hover:border-[#666666] transition-colors font-medium">
                Learn More
              </button>
              <button className="px-8 py-3 bg-[#703BF7] text-white rounded-lg hover:bg-[#8254f8] transition-colors font-medium">
                Browse Properties
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <div className="text-4xl font-bold">200+</div>
                <div className="text-[#999999] text-sm">Happy Customers</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">10k+</div>
                <div className="text-[#999999] text-sm">
                  Properties For Clients
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">16+</div>
                <div className="text-[#999999] text-sm">
                  Years of Experience
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Building Image with Badge */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=1000&fit=crop"
              alt="Modern Buildings"
              className="w-full h-[600px] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {/* Card 1 */}
          <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-8 relative group hover:border-[#703BF7] transition-all">
            <ArrowUpRight className="absolute top-6 right-6 w-5 h-5 text-[#999999] group-hover:text-[#703BF7] transition-colors" />
            <div className="w-16 h-16 rounded-full border-2 border-[#262626] flex items-center justify-center mb-6 group-hover:border-[#703BF7] transition-colors">
              <Home className="w-8 h-8 text-[#703BF7]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Find Your Dream Home</h3>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-8 relative group hover:border-[#703BF7] transition-all">
            <ArrowUpRight className="absolute top-6 right-6 w-5 h-5 text-[#999999] group-hover:text-[#703BF7] transition-colors" />
            <div className="w-16 h-16 rounded-full border-2 border-[#262626] flex items-center justify-center mb-6 group-hover:border-[#703BF7] transition-colors">
              <Wallet className="w-8 h-8 text-[#703BF7]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Unlock Property Value
            </h3>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-8 relative group hover:border-[#703BF7] transition-all">
            <ArrowUpRight className="absolute top-6 right-6 w-5 h-5 text-[#999999] group-hover:text-[#703BF7] transition-colors" />
            <div className="w-16 h-16 rounded-full border-2 border-[#262626] flex items-center justify-center mb-6 group-hover:border-[#703BF7] transition-colors">
              <Building2 className="w-8 h-8 text-[#703BF7]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Effortless Property Management
            </h3>
          </div>

          {/* Card 4 */}
          <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-8 relative group hover:border-[#703BF7] transition-all">
            <ArrowUpRight className="absolute top-6 right-6 w-5 h-5 text-[#999999] group-hover:text-[#703BF7] transition-colors" />
            <div className="w-16 h-16 rounded-full border-2 border-[#262626] flex items-center justify-center mb-6 group-hover:border-[#703BF7] transition-colors">
              <Sparkles className="w-8 h-8 text-[#703BF7]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Smart Investments. Informed Decisions
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
