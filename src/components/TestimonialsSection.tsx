import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import AnimatedBox from './AnimatedBox';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      name: "Michael & Sarah R.",
      location: "New York → Jerusalem Property Purchase",
      rating: 5,
      text: "Attorney Avi Lipiner guided us through our first property purchase in Israel. As a young American couple, we were inexperienced and very concerned about the process. Avi led us step by step, explained every stage clearly, and made us feel confident. His financial knowledge saved us tens of thousands of dollars on our mortgage!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2650"
    },
    {
      name: "David & Rachel K.",
      location: "Los Angeles → Tel Aviv Investment Sale",
      rating: 5,
      text: "We sold our investment property that we had owned for about 30 years. Avi knew how to handle all the complexities related to capital gains tax for US citizens, coordination with the bank, and the special requirements of the buyers. Everything went smoothly and far beyond what we expected.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=2340"
    },
    {
      name: "Jonathan & Lisa S.",
      location: "Chicago → Jerusalem Property Purchase",
      rating: 5,
      text: "Our transaction was particularly complex and involved property division and challenging legal issues with multiple heirs. Avi demonstrated exceptional professionalism, knew how to deal with all the issues that arose, and managed to bring the transaction to a successful conclusion.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=2340"
    },
    {
      name: "Robert & Jennifer M.",
      location: "San Francisco → Netanya Investment",
      rating: 5,
      text: "As Americans investing in Israeli real estate from California, we needed someone who understood both legal systems. Avi's bilingual expertise, remote consultation capabilities, and understanding of US-Israel legal intersections made our investment process seamless and stress-free.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=2487"
    },
    {
      name: "Steven & Rebecca F.",
      location: "New York → Tel Aviv Business Formation",
      rating: 5,
      text: "We established our Israeli business entity with Avi's guidance. His comprehensive understanding of cross-border tax implications and Israeli business law helped us structure everything properly from the start. Highly recommend for any American looking to invest in Israel.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=2340"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-br from-primary-light to-secondary-gray relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <AnimatedBox animation="fadeIn" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-primary-navy">What Our</span>{' '}
            <span className="text-primary-gold">American Clients</span>{' '}
            <span className="text-primary-navy">Say</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-2">
            Clients share their experiences with the legal guidance they received
          </p>
        </AnimatedBox>

        <div className="max-w-4xl mx-auto">
          <AnimatedBox animation="scaleIn" delay={200} className="relative">
            {/* Main testimonial display */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
              {/* Quote icon */}
              <div className="absolute top-6 left-6 text-primary-gold/20">
                <Quote size={48} />
              </div>
              
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} size={24} className="text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Testimonial text */}
              <blockquote className="text-lg md:text-xl text-gray-700 text-center mb-8 leading-relaxed relative z-10">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              {/* Client info */}
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-primary-gold">
                  <img 
                    src={testimonials[currentTestimonial].image} 
                    alt={testimonials[currentTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-xl text-primary-navy">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-primary-gold font-medium">
                    {testimonials[currentTestimonial].location}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 text-primary-gold hover:bg-primary-gold hover:text-white transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 text-primary-gold hover:bg-primary-gold hover:text-white transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </AnimatedBox>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-primary-gold scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary-gold/5 rounded-full" aria-hidden="true"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary-navy/5 rounded-full" aria-hidden="true"></div>
    </section>
  );
};

export default TestimonialsSection;
