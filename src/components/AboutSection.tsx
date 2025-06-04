import React from 'react';
import { Check } from 'lucide-react';
import AnimatedBox from './AnimatedBox';

const AboutSection = () => {
  // Reordered achievements from most to least impressive
  const achievements = [
    'מאות משפחות שלוו בהצלחה בתהליכי רכישה ומכירה של דירות',
    'ניסיון רב בהתמודדות עם עסקות מורכבות לרבות קומבינציות ותמ"א 38',
    'יועץ משכנתאות מוסמך מטעם התאחדות יועצי המשכנתאות',
    'בעל רישיון תיווך מקרקעין המעניק יתרון בהבנת שוק הנדל"ן',
    'תארים אקדמיים במשפטים ובמנהל עסקים עם התמחות במימון'
  ];

  return (
    <section id="about" className=" pt-16 pb-12 bg-fbfbfb relative overflow-hidden scroll-smooth">
      <div className="container mx-auto px-4 md:px-8">
        {/* Desktop layout */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-16">
          {/* Left column (image) - Only visible on desktop */}
          <div className="hidden lg:block lg:w-5/12">
            <AnimatedBox animation="slideInRight">
              <div className="relative h-full flex items-start">
                <div 
                  className="absolute -top-5 -right-5 w-full h-full bg-primary-gold/15 rounded-lg z-0"
                  aria-hidden="true"
                ></div>
                <div className="relative rounded-lg overflow-hidden shadow-xl z-10">
                  <img 
                    src="/lovable-uploads/avi-image.webp" 
                    alt="עו״ד אבי ליפינר" 
                    className="w-full h-auto relative z-10 object-cover"
                    style={{ 
                      aspectRatio: '3/4.5',
                      filter: 'contrast(1.08) saturate(1.08) brightness(1.02)',
                      imageRendering: 'crisp-edges'
                    }}
                    width="600"
                    height="800"
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
          
          {/* Right column (content) - Full width on mobile */}
          <div className="w-full lg:w-7/12">
            {/* Title and intro paragraphs */}
            <AnimatedBox animation="slideInLeft" delay={100}>
              {/* IMPROVED: Better mobile text sizes and spacing */}
              <h2 className="section-title mb-4 md:mb-6 text-2xl md:text-5xl leading-tight">עו"ד אבי ליפינר - מומחה במקרקעין ופיננסים</h2>
              
              <div className="text-black space-y-4 mb-6 md:mb-8" style={{ lineHeight: '1.6' }}>
                <p className="text-base md:text-lg font-medium">
                  את דרכי המקצועית התחלתי מתוך תשוקה להקל על אנשים בתהליך המורכב של רכישת דירה. בעסקת מקרקעין, אתם זקוקים ליותר מעורך דין - אתם צריכים שותף שמבין את כל היבטי העסקה.
                </p>
                <p className="text-base md:text-lg font-medium">
                  אני משלב ידע משפטי מעמיק במקרקעין עם רקע פיננסי מוצק. עם תארים במנהל עסקים ומשפטים (תואר שני מבר אילן), יחד עם הסמכה כיועץ משכנתאות ורישיון תיווך מקרקעין, אני מציע מענה הוליסטי שמוביל את העסקה שלכם לקו הסיום בצורה בטוחה.
                </p>
              </div>
            </AnimatedBox>
            
            {/* Mobile-only image - IMPROVED with better sizing and spacing */}
            <div className="block lg:hidden mb-6">
              <AnimatedBox animation="slideInRight">
                <div className="relative max-w-xs mx-auto">
                  <div 
                    className="absolute -top-3 -right-3 w-full h-full bg-primary-gold/15 rounded-lg z-0"
                    aria-hidden="true"
                  ></div>
                  <div className="relative rounded-lg overflow-hidden shadow-xl z-10">
                    <img 
                      src="/lovable-uploads/avi-image.webp" 
                      alt="עו״ד אבי ליפינר" 
                      className="w-full h-auto relative z-10 object-cover"
                      style={{ 
                        aspectRatio: '3/4',
                        filter: 'contrast(1.08) saturate(1.08) brightness(1.02)',
                        imageRendering: 'crisp-edges'
                      }}
                      width="400"
                      height="530"
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
            </div>
            
            {/* Achievements section - IMPROVED for mobile */}
            <AnimatedBox animation="slideUp" delay={300}>
              <div className="bg-secondary-gray rounded-xl shadow-md py-5 px-4 md:py-[30px] md:px-[30px]">
                <h3 className="font-bold mb-4 text-primary-gold text-2xl md:text-3xl">הישגים מקצועיים:</h3>
                <ul className="space-y-3 md:space-y-4">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start group">
                      <div className="bg-primary-gold rounded-full p-1 mt-1 ml-2 md:ml-3 flex-shrink-0">
                        <Check size={14} className="text-primary-light" />
                      </div>
                      <span className="text-black text-base md:text-lg font-medium">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedBox>
            
            {/* Commitment section - IMPROVED for mobile */}
            <AnimatedBox animation="fadeIn" delay={400}>
              <div className="mt-6 md:mt-10 p-4 md:p-6 border-r-4 border-primary-gold bg-primary-light shadow-md rounded-lg">
                <h3 className="font-bold mb-2 md:mb-3 text-primary-gold text-2xl md:text-3xl">המחויבות שלי אליכם:</h3>
                <p className="text-black text-base md:text-lg font-medium" style={{ lineHeight: '1.6' }}>
                  המחויבות שלי היא לספק ללקוחותיי שירות מקצועי, אמין ואישי. אני מאמין ביחס אישי לכל לקוח, בזמינות מרבית, בסבלנות לכל שאלה ובקשה, ובדקדקנות תוך ירידה לפרטים הקטנים ביותר. יחד נבטיח שהעסקה שלכם תהיה בטוחה, מוצלחת, ללא דאגות וללא פשרות!
                </p>
              </div>
            </AnimatedBox>
          </div>
        </div>
        
        {/* Partnership section - IMPROVED for mobile */}
        <AnimatedBox animation="fadeIn" delay={500}>
          <div className="mt-6 md:mt-10 bg-primary-light rounded-xl px-4 md:px-16 py-5 md:py-6 shadow-md border-r-4 border-primary-gold">
            <h3 className="font-bold mb-4 md:mb-6 text-primary-gold text-2xl md:text-3xl text-center">שיתוף פעולה ייחודי ומקצועי:</h3>
            
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 mb-3 items-center">
              {/* Image container with decorative elements - IMPROVED for mobile */}
              <div className="w-full lg:w-1/3 relative max-w-xs mx-auto lg:mx-0">
                <div className="relative">
                  <div 
                    className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-full h-full bg-primary-gold/15 rounded-lg z-0"
                    aria-hidden="true"
                  ></div>
                  <div className="relative rounded-lg overflow-hidden shadow-lg z-10">
                    <img 
                      src="/lovable-uploads/avi-and-yaron.webp" 
                      alt="עו״ד אבי ליפינר ועו״ד ירון פוקס" 
                      className="w-full h-auto object-cover mx-auto"
                      width="400"
                      height="400"
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
                  </div>
                </div>
              </div>
              
              {/* Text describing the partnership - IMPROVED for mobile */}
              <div className="w-full lg:w-2/3 flex flex-col justify-center">
                <div className="bg-white/50 p-4 md:p-8 rounded-lg shadow-sm border-r-2 border-primary-gold/30">
                  <p className="text-black text-base md:text-lg font-medium mb-4 md:mb-8" style={{ lineHeight: '1.7' }}>
                  משרדנו גאה לשתף פעולה עם עו"ד ירון פוקס, המתמחה במגוון שירותים המשלימים את השירותים המשפטיים שאנו מעניקים. שיתוף פעולה זה מאפשר לנו להציע מענה משפטי כולל ומקיף תחת קורת גג אחת.
                  </p>
                  <p className="text-black text-base md:text-lg font-medium" style={{ lineHeight: '1.7' }}>
                  עו"ד ירון פוקס הינו תושב ותיק ומוכר בשכונת הדר גנים בפתח תקווה, שכונה בעלת קהילה חמה ומגובשת. אנו שמחים להציע לתושבי השכונה שירות משפטי אישי ומקצועי ברמה הגבוהה ביותר, הכולל פגישות ייעוץ בבית הלקוח, ליווי צמוד לאורך כל התהליך, וכמובן - הטבות והנחות ייחודיות ובלעדיות.
                  </p>
                </div>
                
                {/* Highlight box for the key message - IMPROVED for mobile */}
                <div className="mt-3 md:mt-4 bg-primary-gold/10 p-3 md:p-4 rounded-lg border-r-2 border-primary-gold">
                  <p className="text-black text-base md:text-lg font-bold text-center">
                    השילוב בין מקצועיות בלתי מתפשרת לבין יחס אישי וחם הוא המפתח לשירות המשפטי שאנו מאמינים בו.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedBox>
            
        {/* Signature section - IMPROVED for mobile */}
        <AnimatedBox animation="fadeIn" delay={600}>
          <div className="mt-8 md:mt-12 flex justify-center">
            <div className="w-52 md:w-64">
              <img 
                src="/lovable-uploads/avi-lipiner-signature.webp" 
                alt="חתימת עו״ד אבי ליפינר" 
                className="w-full h-auto"
                width="256"
                height="100"
                loading="lazy"
              />
            </div>
          </div>
        </AnimatedBox>
      </div>
      
      {/* Decorative elements - IMPROVED for mobile */}
      <div 
        className="hidden lg:block absolute top-20 left-10 w-72 h-72 bg-primary-gold/8 rounded-full -z-10"
        aria-hidden="true"
      ></div>
      <div 
        className="hidden lg:block absolute bottom-20 right-10 w-48 h-48 bg-primary-gold/12 rounded-full -z-10"
        aria-hidden="true"
      ></div>
      <div 
        className="block lg:hidden absolute top-10 left-5 w-24 h-24 bg-primary-gold/8 rounded-full -z-10"
        aria-hidden="true"
      ></div>
      {/* Added an additional decorative element for mobile */}
      <div 
        className="block lg:hidden absolute bottom-10 right-5 w-32 h-32 bg-primary-gold/10 rounded-full -z-10"
        aria-hidden="true"
      ></div>
    </section>
  );
};

export default AboutSection;