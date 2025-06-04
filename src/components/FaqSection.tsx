import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedBox from './AnimatedBox';

interface FaqItem {
  question: string;
  answer: string;
  id?: string;
}

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs: FaqItem[] = [{
    question: "מתי כדאי לפנות לעורך דין בעסקת מכר דירה?",
    answer: "מומלץ לפנות לעורך דין כבר בשלב הפנייה וההתייעצות טרם הרכישה המתוכננת, לפני חתימה על כל מסמך מחייב. ליווי משפטי מהשלבים המוקדמים מאפשר לזהות בעיות פוטנציאליות, לנהל משא ומתן יעיל יותר, ולהבטיח שהאינטרסים שלכם מוגנים מההתחלה. המשרד שלנו מספק מענה הוליסטי הן בפן המשפטי והן בפן המימוני של העסקה כבר משלבים אלו.",
    id: "when-to-contact"
  }, {
    question: "מה כולל הליווי המשפטי בעסקת מכר דירה?",
    answer: "הליווי כולל: בדיקות מקדימות של הנכס והזכויות, ניסוח או בדיקת חוזה המכר, ליווי במשא ומתן, טיפול בהיבטים הפיננסיים והמשכנתא, תיאום העברות כספים, דיווחים לרשויות המס, וטיפול ברישום הזכויות בטאבו. אני מלווה את הלקוחות שלי באופן אישי לאורך כל התהליך, מהמשא ומתן ועד לקבלת המפתח.",
    id: "what-includes"
  }, {
    question: "כמה עולה ליווי משפטי בעסקת מכר דירה?",
    answer: "עלות הליווי המשפטי נקבעת בהתאם למורכבות העסקה ולהיקף השירותים הנדרשים. בפגישת הייעוץ הראשונית (ללא עלות) אוכל לבחון את פרטי העסקה שלכם ולהציע הצעת מחיר מדויקת ושקופה. חשוב לזכור שהשקעה בליווי משפטי מקצועי עשויה לחסוך לכם הרבה כסף, זמן וכאב ראש בהמשך.",
    id: "cost"
  }, {
    question: "מה ההבדל בין ליווי של עו\"ד מקרקעין מנוסה לעומת עו\"ד כללי?",
    answer: "עו\"ד מקרקעין מתמחה בעל ניסיון ספציפי בתחום מכיר לעומק את כל המורכבויות והמלכודות בעסקאות נדל\"ן. במקרה שלי, משרד עו\"ד אברהם ליפינר הינו משרד בוטיק המתמחה בדיני מקרקעין. כיועץ משכנתאות מוסמך ובעל רישיון תיווך, בנוסף להשכלה אקדמית במשפטים ובמנהל עסקים, אני מביא לשולחן פרספקטיבה ייחודית הכוללת הבנה עמוקה של היבטים משפטיים, פיננסיים ומסחריים בשוק הנדל\"ן - מה שמאפשר לי לזהות סיכונים, למקסם הזדמנויות, ולהבטיח שהעסקה מתאימה ליכולות ולצרכים שלכם.",
    id: "difference"
  }, {
    question: "כמה זמן אורכת עסקת מכר דירה מתחילתה ועד סופה?",
    answer: "משך הזמן הממוצע של עסקת מכר דירה נע בין חודשיים לארבעה חודשים, מהחתימה על החוזה ועד להעברת הזכויות בטאבו. הזמן המדויק תלוי במספר גורמים, כולל מורכבות העסקה, מימון במשכנתא, ולוחות הזמנים של הצדדים. בליווי מקצועי, אני פועל לייעל את התהליך ולמנוע עיכובים מיותרים.",
    id: "timeline"
  }, {
    question: "האם אתם מטפלים בעסקאות בכל רחבי הארץ?",
    answer: "כן, אני מטפל בעסקאות מכר בכל רחבי הארץ. לנוחות הלקוחות, אני מציע גם אפשרות לפגישות בבית הלקוח. בנוסף, אני עובד בשיתוף פעולה עם עו\"ד ירון פוקס, מה שמאפשר לנו להעניק שירות מקיף ואיכותי בכל מקום.",
    id: "locations"
  }];

  // Check if there's a hash in the URL to open a specific FAQ
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const index = faqs.findIndex(faq => faq.id === id);
      if (index !== -1) {
        setOpenIndex(index);
      }
    }
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    
    // Update URL hash when opening a FAQ
    if (openIndex !== index && faqs[index].id) {
      window.history.pushState(null, '', `#${faqs[index].id}`);
    } else {
      window.history.pushState(null, '', window.location.pathname);
    }
  };



  return (
    <section id="faq" className="section-padding py-16 bg-secondary-gray relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-4">
            <AnimatedBox animation="slideInRight">
              <h2 className="section-title text-3xl md:text-5xl mb-4">שאלות נפוצות בעסקאות מכר דירות</h2>
              
              <p className="text-lg text-black/80 mb-8">
                כאן תוכלו למצוא תשובות לשאלות הנפוצות ביותר בנוגע לליווי משפטי בעסקאות נדל"ן
              </p>
              
              <div className="relative hidden lg:block">
                <div className="relative z-10">
                  <div className="relative bg-primary-gold/10 rounded-full p-5 inline-block">
                    <HelpCircle size={100} className="text-primary-gold" />
                  </div>
                </div>
                <div className="absolute top-20 right-8 w-40 h-40 bg-primary-gold/5 rounded-full -z-10"></div>
              </div>
            </AnimatedBox>
          </div>
          
          <div className="lg:col-span-8">
            <AnimatedBox animation="slideInLeft" delay={200} className="space-y-4">
              {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    id={faq.id}
                    className={cn(
                      "border border-gray-200 rounded-lg overflow-hidden transition-all duration-300",
                      openIndex === index 
                        ? "shadow-md border-primary-gold/30" 
                        : "shadow-sm hover:border-primary-gold/20"
                    )}
                  >
                    <button 
                      onClick={() => toggleAccordion(index)} 
                      className="w-full px-6 py-5 text-right flex justify-between items-center bg-white hover:bg-gray-50 transition-colors duration-200"
                      aria-expanded={openIndex === index}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span className="text-xl text-primary-gold font-bold pr-2 border-r-4 border-primary-gold">
                        {faq.question}
                      </span>
                      <div className={cn(
                        "bg-primary-gold/10 rounded-full p-2 transition-transform duration-300",
                        openIndex === index ? "transform rotate-180" : ""
                      )}>
                        <ChevronDown className="text-primary-gold" size={20} />
                      </div>
                    </button>
                    <div 
                      id={`faq-answer-${index}`}
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out bg-white",
                        openIndex === index ? "max-h-[1000px] py-5 px-8" : "max-h-0"
                      )}
                    >
                      <p className="text-black text-lg leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                ))}
            </AnimatedBox>
            

          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div 
        className="absolute bottom-10 left-5 w-32 h-32 bg-primary-gold/5 rounded-full" 
        aria-hidden="true"
      ></div>
      <div 
        className="absolute top-40 right-5 w-24 h-24 bg-primary-gold/5 rounded-full"
        aria-hidden="true"
      ></div>
    </section>
  );
};

export default FaqSection;