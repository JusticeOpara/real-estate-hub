import React from 'react';

const FAQCard = ({ question, description }) => {
  return (
    <div className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-8 space-y-4 hover:border-[#703BF7] transition-all">
      <h3 className="text-xl font-semibold text-white leading-relaxed">
        {question}
      </h3>
      <p className="text-[#999999] leading-relaxed">
        {description}
      </p>
      <button className="text-white font-medium hover:text-[#703BF7] transition-colors inline-flex items-center gap-2">
        Read More
      </button>
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I search for properties on Estatein?",
      description: "Learn how to use our user-friendly search tools to find properties that match your criteria."
    },
    {
      question: "What documents do I need to sell my property through Estatein?",
      description: "Find out about the necessary documentation for listing your property with us."
    },
    {
      question: "How can I contact an Estatein agent?",
      description: "Discover the different ways you can get in touch with our experienced agents."
    }
  ];

  return (
    <section className="bg-[#141414] py-20 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-[#999999] text-lg leading-relaxed">
              Find answers to common questions about Estatein`&apos;s services, property listings, and the real estate process. We&apos;re here to provide clarity and assist you every step of the way.
            </p>
          </div>
          <button className="px-6 py-3 border border-[#262626] text-white rounded-lg hover:border-[#703BF7] transition-colors font-medium whitespace-nowrap">
            View All FAQ&apos;s
          </button>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <FAQCard key={index} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;