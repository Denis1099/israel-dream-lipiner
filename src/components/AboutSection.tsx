import React from 'react';
import { Check } from 'lucide-react';
import AnimatedBox from './AnimatedBox';

const AboutSection = () => {
  // Why Choose Our Firm points
  const whyChoosePoints = [
    'Deep expertise in U.S.-Israel legal intersections ',
    'Coverage across Jerusalem, Tel Aviv, and Judea & Samaria',
    'Direct access to senior partners, not junior associates',  
  ];

  return (
    <section id="about" className="pt-16 pb-12 bg-fbfbfb relative overflow-hidden scroll-smooth">
      <div className="container mx-auto px-4 md:px-8">
        {/* Desktop layout */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-16">
          {/* Left column (image) - Only visible on desktop */}
          <div className="hidden lg:block lg:w-4/12">
            <AnimatedBox animation="slideInLeft">
              <div className="relative h-full flex items-start">
                <div 
                  className="absolute -top-5 -left-5 w-full h-full bg-primary-gold/15 rounded-lg z-0"
                  aria-hidden="true"
                ></div>
                <div className="relative rounded-lg overflow-hidden shadow-xl z-10">
                  <img 
                    src="/lovable-uploads/avi-and-yaron.webp" 
                    alt="Avi Lipiner, Yaron Fuks and Koby Bargad" 
                    className="w-auto h-auto relative z-10 object-cover"
                    style={{ 
                      aspectRatio: '1/1',
                      filter: 'contrast(1.08) saturate(1.08) brightness(1.02)',
                      imageRendering: 'crisp-edges'
                    }}
                    width="386"
                    height="386"
                    loading="lazy"
                  />
                  
                  {/* Vignette overlay to add depth and hide compression artifacts */}
                  <div 
                    className="absolute inset-0 z-20 pointer-events-none"
                    style={{
                      boxShadow: 'inset 0 0 40px rgba(0,0,0,0.15), inset 0 0 3px rgba(0,0,0,0.1)',
                      background: 'radial-gradient(circle, transparent 60%, rgba(0,0,0,0.07) 100%)'
                    }}
                  ></div>
                  
                  {/* Enhanced golden highlight at the bottom */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-24 z-20 pointer-events-none opacity-30"
                    style={{
                      background: 'linear-gradient(to top, rgba(176, 141, 87, 0.22), transparent)'
                    }}
                  ></div>
                </div>
                <div 
                  className="absolute -bottom-3 -right-3 w-24 h-24 bg-primary-gold rounded-lg z-0"
                  aria-hidden="true"
                ></div>
              </div>
            </AnimatedBox>
          </div>
          
          {/* Right column (content) - Full width on mobile */}
          <div className="w-full lg:w-7/12">
            {/* Title and intro paragraphs */}
            <AnimatedBox animation="slideInRight" delay={100}>
              <h2 className="section-title mb-4 md:mb-6 text-3xl md:text-4xl leading-tight">About Our Legal Team</h2>
              
              <div className="text-black space-y-4 mb-6 md:mb-8" style={{ lineHeight: '1.6' }}>
                <p className="text-base md:text-lg font-medium">
                Attorneys Yaron Fuks, Avi Lipiner and Koby Bargad lead our firm with 20+ years of experience 
                helping American families navigate Israeli real estate and business investments.
                </p>
                <p className="text-base md:text-lg font-medium">
                Supported by four associates and dedicated staff, we provide personalized, 
                boutique legal solutions entirely in English.
                </p>
              </div>
            </AnimatedBox>
            
            {/* Mobile-only image */}
            <div className="block lg:hidden mb-6">
              <AnimatedBox animation="slideInLeft">
                <div className="relative max-w-[300px] mx-auto">
                  <div 
                    className="absolute -top-3 -left-3 w-full h-full bg-primary-gold/15 rounded-lg z-0"
                    aria-hidden="true"
                  ></div>
                  <div className="relative rounded-lg overflow-hidden shadow-xl z-10">
                    <img 
                      src="/lovable-uploads/avi-and-yaron.webp" 
                      alt="Avi Lipiner, Yaron Fuks and Koby Bargad" 
                      className="w-full h-auto relative z-10 object-cover"
                      style={{ 
                        aspectRatio: '1/1',
                        filter: 'contrast(1.08) saturate(1.08) brightness(1.02)',
                        imageRendering: 'crisp-edges'
                      }}
                      width="300"
                      height="300"
                      loading="lazy"
                    />
                    
                    {/* Vignette overlay */}
                    <div 
                      className="absolute inset-0 z-20 pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.15), inset 0 0 3px rgba(0,0,0,0.1)',
                        background: 'radial-gradient(circle, transparent 60%, rgba(0,0,0,0.07) 100%)'
                      }}
                    ></div>
                    
                    {/* Subtle golden highlight at the bottom */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-16 z-20 pointer-events-none opacity-30"
                      style={{
                        background: 'linear-gradient(to top, rgba(176, 141, 87, 0.18), transparent)'
                      }}
                    ></div>
                  </div>
                  <div 
                    className="absolute -bottom-3 -right-3 w-16 h-16 md:w-24 md:h-24 bg-primary-gold rounded-lg z-0"
                    aria-hidden="true"
                  ></div>
                </div>
              </AnimatedBox>
            </div>
            
            {/* Why Choose Our Firm section */}
            <AnimatedBox animation="slideUp" delay={300}>
              <div className="bg-secondary-gray rounded-xl shadow-md py-5 px-4 md:py-[30px] md:px-[30px]">
                <h3 className="font-bold mb-4 text-primary-gold text-2xl md:text-3xl" style={{ fontWeight: '700' }}>Why Choose Our Firm</h3>
                <ul className="space-y-3 md:space-y-4">
                  {whyChoosePoints.map((point, index) => (
                    <li key={index} className="flex items-start group">
                      <div className="bg-primary-gold rounded-full p-1 mt-1 mr-2 md:mr-3 flex-shrink-0">
                        <Check size={14} className="text-primary-light" />
                      </div>
                      <span className="text-black text-base md:text-lg font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedBox>
          </div>
        </div>

        {/* Attorney Yaron Fuks section - with opposite layout */}
        <div className="mt-12 md:mt-16">
          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-16">
            {/* Left column (content) - Full width on mobile */}
            <div className="w-full lg:w-7/12 lg:order-1">
              <AnimatedBox animation="slideInLeft" delay={100}>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-primary-gold leading-tight" style={{ fontWeight: '700' }}>
                  Attorney Yaron Fuks
                </h3>
                
                <div className="text-black space-y-4 mb-6 md:mb-8" style={{ lineHeight: '1.6' }}>
                  <p className="text-base md:text-lg font-medium">
                    Attorney Yaron Fuks brings two decades of experience in business and real estate law, 
                    combined with comprehensive expertise in insolvency proceedings. His distinguished 
                    military service as an IDF Captain and five years representing Israel as a community 
                    emissary in the United States and Canada have equipped him with invaluable 
                    cross-cultural understanding.
                  </p>
                  <p className="text-base md:text-lg font-medium">
                    With fluent English and deep knowledge of both American and Israeli legal systems, 
                    Attorney Fuks provides uniquely qualified guidance for Americans conducting business 
                    and investing in Israel.
                  </p>
                </div>
              </AnimatedBox>
              
              {/* Mobile-only image for Yaron */}
              <div className="block lg:hidden mb-6">
                <AnimatedBox animation="slideInRight">
                  <div className="relative max-w-[300px] mx-auto">
                    <div 
                      className="absolute -top-3 -right-3 w-full h-full bg-primary-gold/15 rounded-lg z-0"
                      aria-hidden="true"
                    ></div>
                    <div className="relative rounded-lg overflow-hidden shadow-xl z-10">
                      <img 
                        src="/lovable-uploads/yaron-image.webp" 
                        alt="Attorney Yaron Fuks" 
                        className="w-full h-auto relative z-10"
                        style={{ 
                          aspectRatio: '1/1',
                          imageRendering: 'auto',
                          objectFit: 'contain'
                        }}
                        width="447"
                        height="447"
                        loading="lazy"
                      />
                      {/* Vignette overlay */}
                      <div 
                        className="absolute inset-0 z-20 pointer-events-none"
                        style={{
                          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.15), inset 0 0 3px rgba(0,0,0,0.1)',
                          background: 'radial-gradient(circle, transparent 60%, rgba(0,0,0,0.07) 100%)'
                        }}
                      ></div>
                      {/* Subtle golden highlight at the bottom */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-16 z-20 pointer-events-none opacity-30"
                        style={{
                          background: 'linear-gradient(to top, rgba(176, 141, 87, 0.18), transparent)'
                        }}
                      ></div>
                    </div>
                    <div 
                      className="absolute -bottom-3 -left-3 w-16 h-16 md:w-24 md:h-24 bg-primary-gold rounded-lg z-0"
                      aria-hidden="true"
                    ></div>
                  </div>
                </AnimatedBox>
                {/* Mobile signature in a separate div below the image */}
                <div className="w-full flex justify-center mt-8">
                  <img 
                    src="/lovable-uploads/yaron-fuks-signature.webp" 
                    alt="Attorney Yaron Fuks's signature" 
                    className="max-w-[120px] w-full h-auto mx-auto"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Desktop signature under text, center aligned */}
              <div className="hidden lg:flex justify-center mt-6">
                <img 
                  src="/lovable-uploads/yaron-fuks-signature.webp" 
                  alt="Attorney Yaron Fuks's signature" 
                  className="max-w-[200px] w-full h-auto mx-auto"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Right column (image) - Only visible on desktop */}
            <div className="hidden lg:block lg:w-4/12 lg:order-2">
              <AnimatedBox animation="slideInRight">
                <div className="relative h-full flex items-start">
                  <div 
                    className="absolute -top-5 -right-5 w-full h-full bg-primary-gold/15 rounded-lg z-0"
                    aria-hidden="true"
                  ></div>
                  <div className="relative rounded-lg overflow-hidden shadow-xl z-10">
                    <img 
                      src="/lovable-uploads/yaron-image.webp" 
                      alt="Attorney Yaron Fuks" 
                      className="w-auto h-auto relative z-10 object-cover"
                      style={{ 
                        aspectRatio: '1/1',
                        filter: 'contrast(1.08) saturate(1.08) brightness(1.02)',
                        imageRendering: 'crisp-edges'
                      }}
                      width="386"
                      height="386"
                      loading="lazy"
                    />
                    
                    {/* Vignette overlay to add depth and hide compression artifacts */}
                    <div 
                      className="absolute inset-0 z-20 pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.15), inset 0 0 3px rgba(0,0,0,0.1)',
                        background: 'radial-gradient(circle, transparent 60%, rgba(0,0,0,0.07) 100%)'
                      }}
                    ></div>
                    
                    {/* Enhanced golden highlight at the bottom */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-24 z-20 pointer-events-none opacity-30"
                      style={{
                        background: 'linear-gradient(to top, rgba(176, 141, 87, 0.22), transparent)'
                      }}
                    ></div>
                  </div>
                  <div 
                    className="absolute -bottom-3 -left-3 w-24 h-24 bg-primary-gold rounded-lg z-0"
                    aria-hidden="true"
                  ></div>
                </div>
              </AnimatedBox>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div 
        className="hidden lg:block absolute top-20 right-10 w-72 h-72 bg-primary-gold/8 rounded-full -z-10"
        aria-hidden="true"
      ></div>
      <div 
        className="hidden lg:block absolute bottom-20 left-10 w-48 h-48 bg-primary-gold/12 rounded-full -z-10"
        aria-hidden="true"
      ></div>
      <div 
        className="block lg:hidden absolute top-10 right-5 w-24 h-24 bg-primary-gold/8 rounded-full -z-10"
        aria-hidden="true"
      ></div>
    </section>
  );
};

export default AboutSection;