import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ContactFormProps {
  className?: string;
  simplified?: boolean;
  onSubmit?: (formData: FormData) => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  className, 
  simplified = false,
  onSubmit 
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    serviceType: 'קנייה',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'נא להזין שם מלא';
    }
    
    // Phone validation - require Israeli phone format
    const phoneRegex = /^((\+972|0)([23489]|5[02468]|77|81)-?)?[1-9]\d{6}$/;
    if (!formData.phone) {
      newErrors.phone = 'נא להזין מספר טלפון';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'נא להזין מספר טלפון תקין';
    }
    
    // Email validation (only if provided)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'נא להזין כתובת דוא״ל תקינה';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Send data to Hostinger PHP endpoint
      const response = await fetch('https://your-domain.com/api/submit-lead.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: simplified ? 'hero-form' : 'contact-form'
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'אירעה שגיאה בשליחת הטופס');
      }
      
      toast.success('הטופס נשלח בהצלחה! נחזור אליך בהקדם', {
        duration: 5000,
        position: 'top-center',
      });
      
      setFormData({
        name: '',
        phone: '',
        email: '',
        serviceType: 'קנייה',
        message: ''
      });
      
      setFormSubmitted(true);
      
      if (onSubmit) {
        onSubmit(formData);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('אירעה שגיאה בשליחת הטופס, נסה שנית', {
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  // Success message after form submission
  if (formSubmitted && !simplified) {
    return (
      <div className="bg-green-50 rounded-lg p-6 border border-green-200 text-center animate-fadeIn">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-green-800 mb-2">הטופס נשלח בהצלחה!</h3>
        <p className="text-green-700">אנו מודים לך על פנייתך. נחזור אליך בהקדם האפשרי.</p>
        <button
          onClick={() => setFormSubmitted(false)}
          className="mt-4 text-green-700 underline hover:text-green-900"
        >
          שליחת טופס נוסף
        </button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        'bg-primary-light rounded-lg p-6 shadow-lg transition-all duration-300',
        'border border-gray-100 hover:shadow-xl',
        'mx-auto max-w-lg', // Center the form
        className
      )}
      aria-label="טופס יצירת קשר"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-black mb-1">
            שם מלא <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className={cn(
              "w-full px-4 py-2 border rounded-md transition-all duration-200 text-lg",
              "focus:ring-2 focus:ring-primary-gold focus:border-primary-gold",
              errors.name ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
            )}
            placeholder="הזן/י את שמך המלא"
            dir="rtl"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-red-500 text-sm">{errors.name}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-lg font-medium text-black mb-1">
            טלפון נייד <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            className={cn(
              "w-full px-4 py-2 border rounded-md transition-all duration-200 text-lg",
              "focus:ring-2 focus:ring-primary-gold focus:border-primary-gold",
              errors.phone ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
            )}
            placeholder="הזן/י מספר טלפון נייד"
            dir="ltr"
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1 text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
        
        {!simplified && (
          <>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-black mb-1">
                דוא"ל
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={cn(
                  "w-full px-4 py-2 border rounded-md transition-all duration-200 text-lg",
                  "focus:ring-2 focus:ring-primary-gold focus:border-primary-gold",
                  errors.email ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
                )}
                placeholder="דוא״ל (לא חובה)"
                dir="ltr"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="serviceType" className="block text-lg font-medium text-black mb-1">
                סוג העסקה
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-gold focus:border-primary-gold transition-all duration-200 text-lg bg-white"
              >
                <option value="קנייה">קנייה</option>
                <option value="מכירה">מכירה</option>
                <option value="שניהם">קנייה ומכירה</option>
                <option value="אחר">אחר</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-black mb-1">
                פרטים נוספים
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-gold focus:border-primary-gold transition-all duration-200 text-lg bg-white resize-none"
                placeholder="יש לך שאלות או פרטים נוספים? זה המקום לשתף"
              />
            </div>
          </>
        )}
        
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={cn(
              'w-full max-w-md py-3 px-6 text-primary-light font-medium rounded-md transition-all duration-300',
              'bg-primary-gold hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-gold',
              'shadow-md hover:shadow-lg flex justify-center items-center space-x-2 text-xl',
              'transform hover:-translate-y-1 active:translate-y-0',
              loading && 'opacity-80 cursor-not-allowed'
            )}
            aria-live="polite"
          >
            {loading ? (
              <>
                <div className="h-5 w-5 border-2 border-primary-light border-t-transparent rounded-full animate-spin ml-2"></div>
                <span>שולח...</span>
              </>
            ) : (
              simplified ? 'קבע/י שיחת ייעוץ חינם' : 'שלח/י ונדבר בהקדם'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
