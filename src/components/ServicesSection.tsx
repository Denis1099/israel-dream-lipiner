
import React, { useState } from 'react';
import { FileText, Calculator, HomeIcon, ChevronRight, ChevronLeft } from 'lucide-react';
import AnimatedBox from './AnimatedBox';

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const services = [
    {
      icon: <FileText size={36} className="text-primary-gold" />,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2712",
      title: "בדיקות מקדימות וחוזה מכר",
      description: "ליווי מקצועי בשלב הבדיקות הראשוניות, ניסוח וסקירת חוזה המכר, זיהוי סיכונים פוטנציאליים והבטחת האינטרסים שלכם. בדיקת רישום הנכס, היעדר שעבודים, ותיאום מול ספרי המקרקעין.",
      benefits: [
        "בדיקה מדוקדקת של למעלה מ-20 נקודות קריטיות בכל חוזה מכר",
        "זיהוי מוקדם של סיכונים משפטיים",
        "חוזה מותאם אישית להגנה על האינטרסים שלכם"
      ],
      statistic: "בדיקה מדוקדקת של למעלה מ-20 נקודות קריטיות בכל חוזה מכר"
    },
    {
      icon: <Calculator size={36} className="text-primary-gold" />,
      image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&q=80&w=3540",
      title: "ליווי פיננסי ומשכנתאות",
      description: "ייעוץ מקצועי בהיבטים הפיננסיים של העסקה, ליווי בתהליך המשכנתא, תיאום מול הבנק, הכנת המסמכים הנדרשים והבטחת העברות כספים בטוחות ויעילות.",
      benefits: [
        "תנאי מימון אופטימליים המותאמים לצרכים שלכם",
        "חיסכון של אלפי שקלים בריבית ובעלויות",
        "ליווי מול הבנק עד לביצוע העברות הכספים"
      ],
      statistic: "סיוע בהשגת תנאי מימון אופטימליים המותאמים ליכולות הפיננסיות שלכם"
    },
    {
      icon: <HomeIcon size={36} className="text-primary-gold" />,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=3546",
      title: "השלמת העסקה ורישום הזכויות",
      description: "ליווי צמוד בשלב ההתחשבנויות הסופיות, העברת הכספים, חתימה אצל נוטריון כשנדרש, טיפול בדיווחים למס שבח ומס רכישה, ורישום הזכויות על שמכם בטאבו.",
      benefits: [
        "100% הצלחה ברישום זכויות בטאבו",
        "טיפול מלא בדיווחי המס ובתשלומים הנדרשים",
        "ודאות משפטית מלאה בבעלות על הנכס"
      ],
      statistic: "100% הצלחה ברישום זכויות תקין בטאבו ללא עיכובים מיותרים"
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
          <h2 className="section-title text-center mx-auto text-3xl md:text-5xl mb-3 flex justify-center">הליווי המשפטי המקיף שלנו בעסקאות מכר דירות</h2>
          <p className="text-center text-lg text-black/80 max-w-3xl mx-auto">
            אנו מלווים אתכם בכל שלבי העסקה - מהבדיקות הראשוניות ועד רישום הזכויות בטאבו, תוך שמירה על האינטרסים שלכם לאורך כל הדרך.
          </p>
        </AnimatedBox>

        {/* Desktop Layout - 3 columns */}
        <div className="hidden lg:grid grid-cols-3 gap-8 mt-12">
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
                  <div className="absolute bottom-4 right-4 bg-primary-light rounded-full p-3 shadow-md">
                    {service.icon}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow text-center">
                  <h3 className="text-2xl font-bold mb-3 text-primary-gold">{service.title}</h3>
                  <p className="text-black mb-4 leading-relaxed">{service.description}</p>
                  
                  <div className="mt-auto">
                    <div className="p-4 bg-secondary-gray rounded-lg">
                      <p className="text-sm font-medium text-black">
                        {service.statistic}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedBox>
          ))}
        </div>
        
        {/* Mobile Layout - Tabbed interface with sliding cards */}
        <div className="lg:hidden mt-8">
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2 rtl:space-x-reverse">
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
                <ChevronRight size={20} />
              </button>
              <button
                onClick={nextTab}
                className="bg-white/80 hover:bg-white text-primary-gold p-2 rounded-full shadow-md mr-2"
                aria-label="Next service"
              >
                <ChevronLeft size={20} />
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
                      <div className="absolute bottom-4 right-4 bg-primary-light rounded-full p-3 shadow-md">
                        {service.icon}
                      </div>
                    </div>
                    
                    <div className="p-5 text-center">
                      <h3 className="text-2xl font-bold mb-3 text-primary-gold">{service.title}</h3>
                      <p className="text-black mb-4 text-sm leading-relaxed">{service.description}</p>
                      
                      <ul className="mb-4 space-y-2">
                        {service.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start justify-center">
                            <div className="text-primary-gold ml-2 mt-1 flex-shrink-0">•</div>
                            <span className="text-sm text-right">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="p-3 bg-secondary-gray rounded-lg">
                        <p className="text-sm font-medium text-black">
                          {service.statistic}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <AnimatedBox animation="fadeIn" delay={500} className="mt-12 text-center">
          <a 
            href="#contact" 
            className="inline-block py-4 px-10 bg-primary-navy text-primary-light font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-primary-navy/90 text-xl"
            aria-label="צרו קשר לקבלת פרטים נוספים על שירותי הליווי המשפטי"
          >
            לפרטים נוספים צרו קשר
          </a>
        </AnimatedBox>
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
