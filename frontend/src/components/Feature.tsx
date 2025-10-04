import React from 'react';
import { Home, TrendingUp, MapPin } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-8 hover:border-[#703BF7] transition-all">
      <div className="bg-[#262626] w-16 h-16 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-[#703BF7]" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-[#999999] leading-relaxed">{description}</p>
    </div>
  );
};

const Feature = () => {
  const features = [
    {
      icon: Home,
      title: "Wide Range of Properties",
      description: "Browse through thousands of verified properties across multiple cities and find the perfect match for your needs."
    },
    {
      icon: TrendingUp,
      title: "Best Market Prices",
      description: "Get competitive pricing and great deals. We ensure transparency in all property transactions."
    },
    {
      icon: MapPin,
      title: "Prime Locations",
      description: "Properties in the best neighborhoods and locations. Find homes near your workplace, schools, and amenities."
    }
  ];

  return (
    <section className="bg-[#141414] py-16 border-y border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Why Choose RealEstateHub?
          </h2>
          <p className="text-[#999999] text-lg max-w-2xl mx-auto">
            We provide the best service to help you find your dream property
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;