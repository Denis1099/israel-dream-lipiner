
import React from 'react';
import { MessageCircleMore } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://api.whatsapp.com/send/?phone=972502230066&text&type=phone_number&app_absent=0"
      className="fixed bottom-6 right-6 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors duration-300 z-50"
      aria-label="צור קשר בוואטסאפ"
      title="צור קשר בוואטסאפ"
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircleMore size={28} />
    </a>
  );
};

export default WhatsAppButton;
