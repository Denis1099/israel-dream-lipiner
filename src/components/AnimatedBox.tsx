
import React, { useEffect, useRef, useState, ReactNode, memo } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBoxProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  animation?: 'fadeIn' | 'slideInRight' | 'slideInLeft' | 'slideUp' | 'scaleIn' | 'bounce';
  duration?: number;
  threshold?: number;
  once?: boolean;
  easing?: string;
}

// Using memo to prevent excess re-renders
const AnimatedBox = memo(({
  children,
  delay = 0,
  className,
  animation = 'fadeIn',
  duration = 600,
  threshold = 0.1,
  once = true,
  easing = 'cubic-bezier(0.15, 0.7, 0.4, 1.0)'
}: AnimatedBoxProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasAnimated = useRef(false);
  
  // Get the initial styles based on animation type - before any transitions
  const getInitialStyles = () => {
    switch (animation) {
      case 'fadeIn':
        return { opacity: 0 };
      case 'slideInRight':
        return { opacity: 0, transform: 'translateX(30px)' };
      case 'slideInLeft':
        return { opacity: 0, transform: 'translateX(-30px)' };
      case 'slideUp':
        return { opacity: 0, transform: 'translateY(20px)' };
      case 'scaleIn':
        return { opacity: 0, transform: 'scale(0.95)' };
      case 'bounce':
        return { opacity: 0, transform: 'translateY(20px)' };
      default:
        return { opacity: 0 };
    }
  };
  
  // Get final styles when visible
  const getFinalStyles = () => {
    return { opacity: 1, transform: 'none' };
  };
  
  // Combine computed styles with base transition styles
  const styles = {
    ...(isVisible ? getFinalStyles() : getInitialStyles()),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: easing,
    transitionDelay: `${delay}ms`,
    // Hardware acceleration
    willChange: 'opacity, transform',
    backfaceVisibility: 'hidden' as const,
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Apply hardware acceleration from the start
    if (element) {
      element.style.transform = element.style.transform || 'translateZ(0)';
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (entry.isIntersecting && (!hasAnimated.current || !once)) {
        // Only update state if needed to prevent unnecessary renders
        if (!isVisible) {
          // Use requestAnimationFrame for smoother animation starts
          requestAnimationFrame(() => {
            setIsVisible(true);
          });
        }
        hasAnimated.current = true;
        
        if (once && observerRef.current) {
          observerRef.current.disconnect();
        }
      } else if (!entry.isIntersecting && !once && hasAnimated.current) {
        if (isVisible) {
          setIsVisible(false);
        }
      }
    };

    // Set up IntersectionObserver
    try {
      observerRef.current = new IntersectionObserver(handleIntersection, {
        threshold,
        // Increased rootMargin to start animations slightly earlier
        rootMargin: '10px'
      });
      
      observerRef.current.observe(element);
    } catch (error) {
      console.warn('IntersectionObserver not supported, fallback to visible');
      setIsVisible(true);
    }

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [once, threshold, isVisible]); // Keep dependencies minimal

  return (
    <div 
      ref={elementRef} 
      className={cn(className)}
      style={styles}
    >
      {children}
    </div>
  );
});

AnimatedBox.displayName = 'AnimatedBox';

export default AnimatedBox;
