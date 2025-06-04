import React, { useState } from 'react';
import { FileText, Calculator, HomeIcon, ChevronRight, ChevronLeft, Briefcase, Shield, Users } from 'lucide-react';
import AnimatedBox from './AnimatedBox';

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const services = [
    {
      icon: <HomeIcon size={36} className="text-primary-gold" />,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2712",
      title: "Real Estate Transactions",
      description: "Legal representation for purchasing or selling property in Israel, including contract negotiation, due diligence, and land registration."
    },
    {
      icon: <Calculator size={36} className="text-primary-gold" />,
      image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&q=80&w=3540",
      title: "Financing Assistance",
      description: "Support in obtaining Israeli mortgages, coordinating with local banks, and leveraging U.S.-based income or assets for financing."
    },
    {
      icon: <Shield size={36} className="text-primary-gold" />,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=3546",
      title: "Foreign Buyers Tax Guidance",
      description: "Advisory on Israeli purchase taxes, capital gains, and compliance obligations for non-resident buyers."
    },
    {
      icon: <FileText size={36} className="text-primary-gold" />,
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2712",
      title: "Wills and Enduring Power of Attorney",
      description: "Preparation of legally valid documents under Israeli law, including halachic and civil considerations, for asset protection and future planning."
    },
    {
      icon: <Users size={36} className="text-primary-gold" />,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2712",
      title: "Home Visits and Remote Legal Services",
      description: "In-person consultations for local clients and secure remote services for international clients, elderly individuals, or those with limited mobility."
    },
    {
      icon: <Briefcase size={36} className="text-primary-gold" />,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2712",
      title: "Business Law and Corporate Services",
      description: "Formation of Israeli companies and legal entities, acquisition of businesses and commercial properties, drafting and review of commercial contracts, tax planning, including cross-border tax considerations."
    }
  ];

  // Mobile tabs navigation
  const nextTab = () => {
    setActiveTab((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const prevTab = () => {
    setActiveTab((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  return (
    <section id="services" className="section-padding py-16 bg-primary-light relative">
      <div className="container mx-auto px-5 md:px-8">
        <AnimatedBox animation="fadeIn">
          <h2 className="section-title text-center mx-auto text-3xl md:text-5xl mb-3 flex justify-center">Our Services</h2>
          <p className="text-center text-lg text-black/80 max-w-4xl mx-auto">
            We provide comprehensive legal support for Americans investing in Israel, from initial consultation to successful transaction completion, protecting your interests every step of the way.
          </p>
        </AnimatedBox>

        {/* Desktop Layout - 3 columns grid */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <AnimatedBox 
              key={index} 
              animation="slideUp" 
              delay={index * 200}
              className="group h-full"
            >
              <div className="h-full bg-primary-light rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-xl flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 bg-primary-light rounded-full p-3 shadow-md">
                    {service.icon}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow text-left">
                  <h3 className="text-2xl font-bold mb-3 text-primary-gold">{service.title}</h3>
                  <p className="text-black mb-4 leading-relaxed flex-grow">{service.description}</p>
                </div>
              </div>
            </AnimatedBox>
          ))}
        </div>
        
        {/* Mobile Layout - Tabbed interface with sliding cards */}
        <div className="lg:hidden mt-8">
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeTab === index ? 'bg-primary-gold scale-125' : 'bg-gray-300'
                  }`}
                  aria-label={`Tab ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="relative overflow-hidden">
            <div className="flex items-center justify-between absolute inset-y-0 w-full z-10">
              <button
                onClick={prevTab}
                className="bg-white/80 hover:bg-white text-primary-gold p-2 rounded-full shadow-md ml-2"
                aria-label="Previous service"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextTab}
                className="bg-white/80 hover:bg-white text-primary-gold p-2 rounded-full shadow-md mr-2"
                aria-label="Next service"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="relative">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-300 ${
                    activeTab === index ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
                  }`}
                >
                  <div className="bg-primary-light rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/80 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 bg-primary-light rounded-full p-3 shadow-md">
                        {service.icon}
                      </div>
                    </div>
                    
                    <div className="p-5 text-left">
                      <h3 className="text-2xl font-bold mb-3 text-primary-gold">{service.title}</h3>
                      <p className="text-black mb-4 text-sm leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div 
        className="absolute top-20 left-10 w-32 h-32 bg-primary-gold/5 rounded-full" 
        aria-hidden="true"
      ></div>
      <div 
        className="absolute bottom-10 right-10 w-48 h-48 bg-primary-navy/5 rounded-full"
        aria-hidden="true"
      ></div>
    </section>
  );
};

export default ServicesSection;
