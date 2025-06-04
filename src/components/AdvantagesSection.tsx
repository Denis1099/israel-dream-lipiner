import React, { useState, useEffect, useRef } from 'react';
import { Award, Users, ClipboardCheck, Clock, ShieldCheck } from 'lucide-react';
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
    <span ref={elementRef} className="font-karantina">
      {formattedCount}{suffix}
    </span>
  );
};

const AdvantagesSection = () => {
  const advantages = [{
    icon: <Award size={28} />,
    title: 'מענה הוליסטי',
    description: 'שילוב ייחודי של ידע משפטי ופיננסי מקיף להבטחת עסקה מוצלחת'
  }, {
    icon: <ShieldCheck size={28} />,
    title: 'מומחיות מוכחת',
    description: 'יועץ משכנתאות מוסמך ובעל רישיון תיווך מקרקעין עם ניסיון מעשי'
  }, {
    icon: <ClipboardCheck size={28} />,
    title: 'ליווי אישי ומדוקדק',
    description: 'ירידה לפרטים הקטנים ביותר בכל שלב בעסקה וזיהוי סיכונים מראש'
  }, {
    icon: <Clock size={28} />,
    title: 'זמינות וסבלנות',
    description: 'זמן אישי לכל לקוח ומענה מהיר לכל שאלה ובקשה לאורך כל התהליך'
  }, {
    icon: <Users size={28} />,
    title: 'ניסיון מוכח',
    description: 'מאות משפחות שלוו בהצלחה בעסקאות מורכבות עם 100% שביעות רצון'
  }];
  
  // Keep statistics in consistent order for desktop and mobile
  const statistics = [{
    value: 100,
    suffix: '%',
    label: 'שיעור הצלחה בהשלמת עסקאות',
    description: 'כל העסקאות שליוויתי הגיעו לקו הסיום בהצלחה'
  }, {
    value: 100,
    suffix: '%',
    label: 'מהלקוחות ממליצים לחבריהם',
    description: 'לקוחות מרוצים שבוחרים להמליץ עליי לחבריהם'
  }, {
    value: 300000,
    suffix: ' ₪',
    label: 'חיסכון ממוצע ללקוח למשכנתא',
    description: 'בזכות זיהוי מוקדם של סיכונים אפשריים בעסקה'
  }];
  
  return (
    <section id="advantages" className="section-padding py-16 md:py-20 bg-gradient-to-b from-primary-light to-secondary-gray relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <AnimatedBox animation="fadeIn" duration={1000} threshold={0.05}>
          <div className="flex flex-col items-center">
            <h2 className="section-title text-center text-3xl md:text-5xl mb-4 relative">
              למה לבחור בליווי משפטי של עו"ד אבי ליפינר?
              <span className="absolute -bottom-2 right-0 w-16 h-1 bg-primary-gold"></span>
            </h2>
            <p className="section-subtitle text-center font-assistant mb-6 text-xl max-w-3xl mx-auto">
            רכישת דירה היא אחת ההחלטות הפיננסיות המשמעותיות בחייכם. ליווי משפטי מקצועי, המבוסס על ידע מעמיק הן בהיבטים המשפטיים והן בהיבטים המימוניים של העסקה, עושה את ההבדל בין עסקה מוצלחת לבין כאב ראש מתמשך.
            </p>
          </div>
        </AnimatedBox>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
          {advantages.map((advantage, index) => (
            <AnimatedBox 
              key={index} 
              animation="scaleIn" 
              delay={100 * index} 
              duration={800}
              threshold={0.05}
              className="bg-primary-light rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 text-center h-full flex flex-col"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-primary-gold/30 rounded-full p-4 inline-block text-primary-gold">
                  {advantage.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary-gold">{advantage.title}</h3>
              <p className="text-black font-assistant text-base flex-grow">{advantage.description}</p>
            </AnimatedBox>
          ))}
        </div>

        <AnimatedBox animation="slideUp" delay={300} duration={1000} threshold={0.1} className="mt-16">
          <div className="bg-primary-navy rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {statistics.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-5xl md:text-6xl font-bold text-primary-gold mb-2 font-karantina">
                      <CountUp end={stat.value} suffix={stat.suffix} duration={2000} />
                    </div>
                    <div className="text-primary-light font-assistant font-bold mb-1">{stat.label}</div>
                    <div className="text-primary-light/80 font-assistant text-sm md:text-base">{stat.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedBox>

        <AnimatedBox animation="fadeIn" delay={500} duration={1000} className="mt-12 text-center">
          <a 
            href="#contact" 
            className="inline-block py-4 px-10 bg-primary-gold text-primary-light font-assistant font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-xl"
            aria-label="צור קשר עכשיו לקבלת ייעוץ ראשוני"
          >
            צרו קשר עכשיו
          </a>
        </AnimatedBox>
      </div>

      {/* Decorative elements positioned behind with proper z-index */}
      <div 
        className="decorative-element -bottom-16 -left-16 w-64 h-64 bg-primary-gold/10 rounded-full"
        aria-hidden="true"
      ></div>
      <div 
        className="decorative-element top-1/4 -right-8 w-32 h-32 bg-primary-navy/10 rounded-full"
        aria-hidden="true"
      ></div>
      <div 
        className="decorative-element top-1/2 left-1/4 w-24 h-24 bg-primary-gold/5 rounded-full"
        aria-hidden="true"
      ></div>
    </section>
  );
};

export default AdvantagesSection;