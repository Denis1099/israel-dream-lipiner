import React, { useState, useEffect, useRef } from 'react';
import AnimatedBox from './AnimatedBox';

const CountUp = ({ end, duration = 2000, startOnView = true, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!startOnView || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime;
          const animateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            
            if (progress < 1) {
              window.requestAnimationFrame(animateCount);
            }
          };
          window.requestAnimationFrame(animateCount);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [end, duration, startOnView, hasAnimated]);

  // Format the number with commas for display
  const formattedCount = typeof count === 'number' ? 
    count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 
    count;

  return (
    <span ref={elementRef} className="font-merriweather">
      {formattedCount}{suffix}
    </span>
  );
};

const StatisticsSection = () => {
  // Consolidated statistics as specified in requirements
  const statistics = [
    {
      value: 20,
      suffix: '+',
      label: 'Years of Experience'
    },
    {
      value: 100,
      suffix: '%',
      label: 'Transaction Success Rate'
    },
    {
      value: 500,
      suffix: '+',
      label: 'American Families Served'
    },
    {
      value: 100,
      suffix: '%',
      label: 'English-First Legal Service'
    }
  ];
  
  return (
    <section id="statistics" className="section-padding py-16 md:py-20 bg-gradient-to-b from-primary-light to-secondary-gray relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <AnimatedBox animation="slideUp" delay={300} duration={1000} threshold={0.1}>
          <div className="bg-primary-navy rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
                {statistics.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-gold mb-2 font-merriweather">
                      <CountUp end={stat.value} suffix={stat.suffix} duration={2000} />
                    </div>
                    <div className="text-primary-light font-inter font-bold mb-1 text-sm md:text-base">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedBox>
      </div>

      {/* Decorative elements positioned behind with proper z-index */}
      <div 
        className="decorative-element -bottom-16 -right-16 w-64 h-64 bg-primary-gold/10 rounded-full"
        aria-hidden="true"
      ></div>
      <div 
        className="decorative-element top-1/4 -left-8 w-32 h-32 bg-primary-navy/10 rounded-full"
        aria-hidden="true"
      ></div>
      <div 
        className="decorative-element top-1/2 right-1/4 w-24 h-24 bg-primary-gold/5 rounded-full"
        aria-hidden="true"
      ></div>
    </section>
  );
};

export default StatisticsSection;