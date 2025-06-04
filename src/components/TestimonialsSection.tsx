
import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Quote, Star } from 'lucide-react';
import AnimatedBox from './AnimatedBox';

interface Testimonial {
  text: string;
  name: string;
  location: string;
  rating?: number;
  projectType?: string;
}

const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      text: "עו\"ד אבי ליפינר ליווה אותנו ברכישת הדירה הראשונה שלנו. כזוג צעיר, היינו חסרי ניסיון וחששנו מאוד. אבי הוביל אותנו צעד אחר צעד, הסביר כל שלב בבהירות, וגרם לנו להרגיש בטוחים. הידע הפיננסי שלו חסך לנו עשרות אלפי שקלים במשכנתא!",
      name: "משפחת כהן",
      location: "קנו דירה בפתח תקווה",
      rating: 5,
      projectType: "רכישת דירה"
    },
    {
      text: "מכרנו דירה שהייתה בבעלותנו כ-30 שנה. אבי ידע לטפל בכל המורכבויות הקשורות למס שבח, תיאום מול הבנק ודרישות המיוחדות של הקונים. הכל התנהל בצורה חלקה והרבה מעבר למה שציפינו.",
      name: "חיים ושרה לוי",
      location: "מכרו דירה בתל אביב",
      rating: 5,
      projectType: "מכירת דירה"
    },
    {
      text: "עסקת המכר שלנו הייתה מורכבת במיוחד וכללה פיצול נכסים ואתגרים משפטיים לא פשוטים. אבי הפגין מקצועיות יוצאת דופן, ידע להתמודד עם כל הסוגיות שעלו, והצליח להביא את העסקה לידי סיום מוצלח.",
      name: "דוד אברהמי",
      location: "עסקת מכר מורכבת בירושלים",
      rating: 5,
      projectType: "עסקה מורכבת"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const autoSlideTime = 10000; // Increased to 10 seconds

  const resetProgressBar = () => {
    if (progressRef.current) {
      progressRef.current.style.transition = 'none';
      progressRef.current.style.width = '0%';
      // Force reflow
      progressRef.current.offsetHeight; 
      progressRef.current.style.transition = `width ${autoSlideTime}ms linear`;
      progressRef.current.style.width = '100%';
    }
  };

  const goToNextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    resetProgressBar();
  };

  const goToPrevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    resetProgressBar();
  };

  // Handle touch events for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Minimum distance required for a swipe
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped right to left -> go to next slide
        goToNextSlide();
      } else {
        // Swiped left to right -> go to previous slide
        goToPrevSlide();
      }
    }
    
    // Reset values
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Handle auto-sliding
  useEffect(() => {
    if (!isPaused) {
      resetProgressBar();
      const interval = setInterval(() => {
        goToNextSlide();
      }, autoSlideTime);

      return () => clearInterval(interval);
    }
    return undefined;
  }, [activeIndex, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToNextSlide();
      } else if (e.key === 'ArrowRight') {
        goToPrevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, isAnimating]);

  // Pause sliding when tab is not in focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className="flex justify-center mb-2" aria-label={`דירוג ${rating} מתוך 5`}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            fill={i < rating ? "#D4AF37" : "none"}
            color={i < rating ? "#D4AF37" : "#D4AF37"}
            className="mx-0.5"
          />
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="section-padding py-16 bg-gradient-to-b from-primary-light to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-8">
        <AnimatedBox animation="fadeIn">
          <div className="flex flex-col items-center">
            <h2 className="section-title text-center text-3xl md:text-5xl mb-3 relative">
              לקוחות מספרים על הליווי המשפטי שקיבלו
              <span className="absolute -bottom-2 right-0 w-16 h-1 bg-primary-gold"></span>
            </h2>
            <p className="text-center text-lg text-black/80 max-w-3xl mx-auto">
              המטרה שלנו היא לספק שירות ברמה הגבוהה ביותר וליצור חוויית לקוח יוצאת דופן
            </p>
          </div>
        </AnimatedBox>

        <div className="mt-12 relative">
          <div 
            className="overflow-hidden rounded-xl bg-white shadow-lg relative max-w-3xl mx-auto border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}

            role="region"
            aria-roledescription="carousel"
            aria-label="המלצות לקוחות"
          >
            {/* Progress bar */}
            <div className="h-1 w-full bg-gray-100 absolute top-0 left-0 z-20">
              <div 
                ref={progressRef}
                className="h-full bg-primary-gold transition-width" 
                style={{ width: '0%' }}
              ></div>
            </div>
            
            <div 
              className="absolute top-6 right-8 text-5xl text-primary-gold"
              aria-hidden="true"
            >
              <Quote size={60} opacity={0.4} />
            </div>
            
            <div className="pt-16 pb-16 px-6 sm:px-12 relative z-10">
              <div className="flex flex-col items-center min-h-[280px] relative">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`w-full transition-all duration-500 ease-in-out ${
                      index === activeIndex
                        ? 'opacity-100 translate-x-0 relative'
                        : index < activeIndex
                        ? 'opacity-0 translate-x-[100px] absolute'
                        : 'opacity-0 translate-x-[-100px] absolute'
                    }`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`המלצה ${index + 1} מתוך ${testimonials.length}`}
                    aria-hidden={index !== activeIndex}
                  >
                    <div className="flex flex-col items-center">
                      {testimonial.projectType && (
                        <span className="px-4 py-1 bg-primary-gold/10 text-primary-gold rounded-full text-sm mb-5">
                          {testimonial.projectType}
                        </span>
                      )}
                      
                      {testimonial.rating && renderStars(testimonial.rating)}
                      
                      <p className="text-xl text-black mb-10 leading-relaxed text-center max-w-2xl mx-auto">
                        {testimonial.text}
                      </p>
                      
                      <div className="text-center mt-6 border-t border-gray-100 pt-6 w-32">
                        <p className="font-bold text-primary-gold text-2xl font-karantina">
                          {testimonial.name}
                        </p>
                        <p className="text-black/80 font-assistant text-sm">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 space-x-reverse">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    resetProgressBar();
                  }}
                  className={`transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-8 h-2 bg-primary-gold rounded-full' 
                      : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                  }`}
                  aria-label={`הצגת המלצה ${index + 1}`}
                  aria-pressed={index === activeIndex}
                />
              ))}
            </div>
          </div>
          
          <button
            onClick={goToPrevSlide}
            className="absolute top-1/2 right-2 md:right-6 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300 text-primary-gold z-20 hover:bg-primary-gold hover:text-white"
            aria-label="המלצה קודמת"
          >
            <ChevronRight size={24} />
          </button>
          
          <button
            onClick={goToNextSlide}
            className="absolute top-1/2 left-2 md:left-6 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300 text-primary-gold z-20 hover:bg-primary-gold hover:text-white"
            aria-label="המלצה הבאה"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <AnimatedBox animation="fadeIn" delay={300} className="mt-12 text-center">
          <a 
            href="#contact" 
            className="inline-block py-4 px-10 bg-primary-gold text-primary-light font-bold rounded-lg shadow-md hover:bg-primary-gold/90 transition-all duration-300 text-xl"
            aria-label="צור קשר לקבלת ייעוץ ראשוני"
          >
            צרו קשר עכשיו
          </a>
        </AnimatedBox>
      </div>

      {/* Decorative elements */}
      <div 
        className="absolute -bottom-16 -right-16 w-60 h-60 bg-primary-gold/5 rounded-full" 
        aria-hidden="true"
      ></div>
      <div 
        className="absolute top-20 -left-20 w-48 h-48 bg-primary-gold/5 rounded-full"
        aria-hidden="true"
      ></div>
    </section>
  );
};

export default TestimonialsSection;
