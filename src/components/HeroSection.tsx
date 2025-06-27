import React, { useEffect, useState } from 'react';
import AnimatedBox from './AnimatedBox';

const HeroSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call it immediately to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add a second useEffect to handle initial scroll position
  useEffect(() => {
    // Set initial scroll state
    setIsScrolled(window.scrollY > 50);
  }, []); // Empty dependency array means this runs once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/backend/submit_lead.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          email: 'no-email@provided.com',
          serviceType: 'Not specified',
          message: '',
          source: 'israel-dream-hero'
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'An error occurred while submitting the form');
      }
      
      setSubmitted(true);
      setName('');
      setPhone('');
      
      // Reset success message after delay
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred while submitting the form, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center pt-28 md:pt-16 pb-16 overflow-hidden hero-background"
    >
      {/* Enhanced overlay with better gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 backdrop-blur-sm"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-primary-gold/20"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.1
            }}
          ></div>
        ))}
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <AnimatedBox animation="slideInLeft" className="w-full lg:w-6/12 mb-12 lg:mb-0 text-center lg:text-left">
            <h1 
              className="text-4xl sm:text-5xl lg:text-7xl font-black text-primary-light leading-tight mb-6 md:mb-8 font-merriweather relative animate-slideUp"
              style={{ color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.3)', fontWeight: '900' }}
            >
              <span className="relative inline-block">
                Your Israel Dream Starts Here
                <div className="absolute h-1 w-24 bg-primary-gold left-0 -bottom-2 lg:block hidden"></div>
              </span>
            </h1>
            
            <h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-gold mb-10 font-merriweather"
              style={{ color: '#b08d57', fontWeight: '700' }}
            >
              Trusted Legal Guidance for Americans Investing in Israel
            </h2>
            
            <div className="text-lg md:text-xl text-primary-light mb-0 md:mb-8 max-w-2xl lg:mx-0 mx-auto font-inter leading-relaxed" style={{ color: '#fbfbfb' }}>
              <p>
              Expert guidance for property purchases, business ventures, and investments. Comprehensive legal support and financing assistance — all in English.
              </p>
            </div>
          </AnimatedBox>

          <AnimatedBox animation="scaleIn" delay={300} className="w-full lg:w-5/12">
            <div 
              className="backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-white/10 hover:shadow-primary-gold/10 transition-shadow duration-500"
              style={{ 
                backgroundColor: 'rgba(251, 251, 251, 0.92)',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3), 0 8px 10px -6px rgba(0,0,0,0.2)'
              }}
            >
              <div className="p-6 sm:p-8">
                <h3 
                  style={{ color: '#b08d57', fontWeight: '900' }} 
                  className="font-black text-primary-gold mb-8 text-center text-3xl md:text-4xl relative"
                >
                  Schedule a Free Consultation
                  <div className="absolute -bottom-3 left-0 right-0 mx-auto h-1 w-16 bg-primary-gold/60" style={{ backgroundColor: 'rgba(176, 141, 87, 0.6)' }}></div>
                </h3>
                
                {submitted ? (
                  <div className="py-6 text-center animate-fadeIn">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Thank you for contacting us!</h4>
                    <p className="text-gray-600">We'll be in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="transition-all duration-300 hover:translate-y-[-2px]">
                      <label className="block text-gray-700 text-left mb-1">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter your full name" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold/50 focus:border-primary-gold/50 transition"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="transition-all duration-300 hover:translate-y-[-2px]">
                      <label className="block text-gray-700 text-left mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="Enter your phone number" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold/50 focus:border-primary-gold/50 transition"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <button 
                      type="submit"
                      style={{ backgroundColor: '#b08d57' }}
                      className="w-full py-3 px-4 rounded-lg text-white font-bold mt-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md relative overflow-hidden group"
                      disabled={isSubmitting}
                    >
                      <span className="relative z-10">
                        {isSubmitting ? 'Submitting...' : 'Schedule Free Consultation'}
                      </span>
                      <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                    </button>
                  </form>
                )}
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Your information is secure and will not be shared with third parties.
                </p>
              </div>
            </div>
          </AnimatedBox>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div 
        className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer z-20 transition-all duration-500 ease-in-out ${isScrolled ? 'opacity-0' : 'opacity-100'}`}
        onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}
      >
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-gold/40 backdrop-blur-md text-primary-light transition-all duration-300 hover:scale-110 hover:bg-primary-gold/60 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#ffffff' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
