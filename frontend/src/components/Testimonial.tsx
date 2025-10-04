import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ rating, title, content, author, location, avatar }) => {
  return (
    <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-8 space-y-6 hover:border-[#703BF7] transition-all">
      {/* Star Rating */}
      <div className="flex gap-1">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-white">{title}</h3>

      {/* Content */}
      <p className="text-[#999999] leading-relaxed">{content}</p>

      {/* Author Info */}
      <div className="flex items-center gap-3 pt-4">
        <img 
          src={avatar} 
          alt={author}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="text-white font-medium">{author}</div>
          <div className="text-[#999999] text-sm">{location}</div>
        </div>
      </div>
    </div>
  );
};

const Testimonial = () => {
  const testimonials = [
    {
      rating: 5,
      title: "Exceptional Service!",
      content: "Our experience with Estatein was outstanding. Their team's dedication and professionalism made finding our dream home a breeze. Highly recommended!",
      author: "Wade Warren",
      location: "USA, California",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
      rating: 5,
      title: "Efficient and Reliable",
      content: "Estatein provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn't be happier with the results.",
      author: "Emelie Thomson",
      location: "USA, Florida",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      rating: 5,
      title: "Trusted Advisors",
      content: "The Estatein team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support!",
      author: "John Mans",
      location: "USA, Nevada",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    }
  ];

  return (
    <section className="bg-[#141414] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              What <span className="text-white">Our Clients Say</span>
            </h2>
            <p className="text-[#999999] text-lg leading-relaxed">
              Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Estatein for their real estate needs.
            </p>
          </div>
          <button className="px-6 py-3 border border-[#262626] text-white rounded-lg hover:border-[#703BF7] transition-colors font-medium whitespace-nowrap">
            View All Testimonials
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;