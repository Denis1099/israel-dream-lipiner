import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

interface LeadFormProps {
  onSuccess?: () => void;
  className?: string;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSuccess, className = '' }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://real-estate.lipiner.co.il/api/submit-lead.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'שגיאה בשליחת הטופס');
      }

      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });

      // Show success message
      toast({
        title: 'הטופס נשלח בהצלחה!',
        description: 'נציג יצור איתך קשר בהקדם.',
        variant: 'default',
      });

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: 'שגיאה!',
        description: error instanceof Error ? error.message : 'שגיאה בשליחת הטופס',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          שם מלא *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          אימייל *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          טלפון *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          הודעה
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-gold text-white py-2 px-4 rounded-md hover:bg-primary-gold/90 transition-colors duration-200 disabled:opacity-50"
      >
        {isSubmitting ? 'שולח...' : 'שלח טופס'}
      </button>

      <p className="text-xs text-gray-500 text-center mt-2">
        * שדות חובה
      </p>
    </form>
  );
};

export default LeadForm; 