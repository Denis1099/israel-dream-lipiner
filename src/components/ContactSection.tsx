import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import AnimatedBox from './AnimatedBox';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) return;
    
    setIsSubmitting(true);
    
    try {
      console.log('Submitting contact form...', { name, phone, email, message });
      const response = await fetch('https://real-estate.lipiner.co.il/api/submit-lead.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          serviceType: 'לא צוין',
          message,
          source: 'contact-form'
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'אירעה שגיאה בשליחת הטופס');
      }
      
      setSubmitted(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      
      // Reset success message after delay
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('אירעה שגיאה בשליחת הטופס, נסה שנית');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "טלפון",
      value: "050-2230066",
      href: "tel:0502230066",
      description: "זמין בימים א׳-ה׳, 9:00-19:00"
    },
    {
      icon: <Mail size={24} />,
      title: "דוא\"ל",
      value: "lipiner10@gmail.com",
      href: "mailto:lipiner10@gmail.com",
      description: "מענה תוך 24 שעות"
    },
    {
      icon: <MapPin size={24} />,
      title: "משרד",
      value: "ורדינון אליעזר 3, פתח תקווה",
      href: "https://maps.google.com/?q=ורדינון+אליעזר+3+פתח+תקווה",
      description: "פגישות בתיאום מראש"
    }
  ];
  
  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary-gray">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto mb-16">
          <AnimatedBox animation="fadeIn">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
              <span className="text-primary-gold">נתחיל יחד</span> את הדרך לעסקה מוצלחת
            </h2>
            <p className="text-lg md:text-xl text-center text-gray-700 max-w-2xl mx-auto">
              השאירו פרטים ואחזור אליכם תוך 24 שעות לתיאום פגישת ייעוץ ראשונית ללא עלות
            </p>
          </AnimatedBox>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <AnimatedBox animation="fadeIn" className="w-full mb-12">
            <div className="w-full bg-white shadow-lg p-6 rounded-lg">
              {submitted ? (
                <div className="py-6 text-center animate-fadeIn">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">תודה על פנייתך!</h4>
                  <p className="text-gray-600">אצור איתך קשר בהקדם.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="transition-all duration-300 hover:translate-y-[-2px]">
                      <label className="block text-gray-700 text-right mb-1">שם מלא</label>
                      <input 
                        type="text" 
                        placeholder="הזן/י את שמך המלא" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold/50 focus:border-primary-gold/50 transition"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="transition-all duration-300 hover:translate-y-[-2px]">
                      <label className="block text-gray-700 text-right mb-1">טלפון נייד</label>
                      <input 
                        type="tel" 
                        placeholder="הזן/י מספר טלפון נייד" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold/50 focus:border-primary-gold/50 transition"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="transition-all duration-300 hover:translate-y-[-2px]">
                    <label className="block text-gray-700 text-right mb-1">דוא"ל</label>
                    <input 
                      type="email" 
                      placeholder="הזן/י כתובת דוא״ל" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold/50 focus:border-primary-gold/50 transition"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="transition-all duration-300 hover:translate-y-[-2px]">
                    <label className="block text-gray-700 text-right mb-1">הודעה</label>
                    <textarea 
                      placeholder="הזן/י את הודעתך" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold/50 focus:border-primary-gold/50 transition h-32"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <button 
                    type="submit"
                    style={{ backgroundColor: '#b08d57' }}
                    className="w-full py-3 px-4 rounded-lg text-white font-bold mt-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md relative overflow-hidden group"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10">
                      {isSubmitting ? 'שולח...' : 'שלח הודעה'}
                    </span>
                    <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </button>
                </form>
              )}
              <p className="text-xs text-gray-500 mt-4 text-center">
                הפרטים שלך מאובטחים ולא יועברו לגורם שלישי.
              </p>
            </div>
          </AnimatedBox>
          
          {/* Contact Cards */}
          <AnimatedBox animation="slideInRight" className="w-full mt-16">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-primary-gold p-4 text-white">
                <h3 className="text-xl font-semibold text-center">דרכי התקשרות</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-gray-100">
                {contactInfo.map((item, index) => (
                  <div key={index} className="p-5 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary-gold bg-opacity-10 text-primary-gold p-3 rounded-full mb-3">
                        {item.icon}
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                      {item.href ? (
                        <a 
                          href={item.href} 
                          className="text-primary-gold hover:text-primary-gold hover:underline transition-colors duration-200 block mb-1"
                          target={item.href.startsWith('https') ? "_blank" : undefined}
                          rel={item.href.startsWith('https') ? "noopener noreferrer" : undefined}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-600 mb-1">{item.value}</p>
                      )}
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-center">
                  <Clock size={20} className="text-primary-gold ml-2" />
                  <p className="text-gray-700 text-center">
                    <span className="font-semibold">שעות פעילות:</span> ימים א׳-ה׳, 9:00-19:00
                  </p>
                </div>
              </div>
            </div>
          </AnimatedBox>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;