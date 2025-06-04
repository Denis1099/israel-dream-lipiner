import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import AnimatedBox from './AnimatedBox';

const FaqSection = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqs = [
    {
      question: "Can US citizens buy property in Israel without traveling there?",
      answer: "Yes, most of the transaction can be completed remotely through power of attorney documents, video consultations, and digital signatures. We regularly assist clients who complete their entire purchase from the United States, though we recommend at least one property viewing trip when possible."
    },
    {
      question: "When should I contact an attorney for my Israeli real estate transaction?",
      answer: "It's crucial to contact an attorney before signing any documents or making any payments. Early legal guidance allows us to identify potential issues, strengthen your negotiating position, and ensure your interests are protected from the beginning. Our initial consultation is provided at no cost."
    },
    {
      question: "What does your legal representation include?",
      answer: "Our representation covers the entire transaction: preliminary property inspections, contract drafting and review, negotiation support, mortgage assistance, coordination of fund transfers, tax authority reporting, and land registry procedures. We guide you personally through each step, from initial negotiations to receiving your keys."
    },
    {
      question: "How do inheritance laws affect American property owners in Israel?",
      answer: "Israeli inheritance law differs significantly from US law. We prepare appropriate wills for Israeli assets that work in conjunction with your US estate planning, ensuring your wishes are honored in both jurisdictions and your heirs are properly protected."
    },
    {
      question: "What makes your firm particularly suited for American investors?",
      answer: "Beyond fluent English, we have deep understanding of both US and Israeli legal systems, extensive experience with cross-border transactions, and established relationships with US tax professionals. Our boutique structure means you work directly with senior attorneys who understand the unique needs of American investors."
    },
    {
      question: "Do you handle transactions throughout Israel?",
      answer: "Yes, we handle transactions anywhere in Israel, with extensive experience in Jerusalem, Tel Aviv, central Israel, and Judea & Samaria. We offer both in-person consultations and remote services to accommodate clients regardless of location."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-primary-light relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-8">
        <AnimatedBox animation="fadeIn" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-primary-navy">Frequently Asked Questions</span>{' '}
            <span className="text-primary-gold">About Israeli Real Estate Transactions</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Here you can find answers to the most common questions regarding legal guidance in real estate transactions
          </p>
        </AnimatedBox>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedBox 
                key={index} 
                animation="slideUp" 
                delay={index * 100}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-6 text-left focus:outline-none focus:ring-2 focus:ring-primary-gold/50 rounded-xl transition-colors duration-200 hover:bg-gray-50"
                  aria-expanded={openQuestion === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-primary-gold font-inter pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 ml-4">
                      {openQuestion === index ? (
                        <ChevronUp size={24} className="text-primary-gold" />
                      ) : (
                        <ChevronDown size={24} className="text-primary-gold" />
                      )}
                    </div>
                  </div>
                </button>
                
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openQuestion === index 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed font-inter">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </AnimatedBox>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary-gold/5 rounded-full" aria-hidden="true"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary-navy/5 rounded-full" aria-hidden="true"></div>
    </section>
  );
};

export default FaqSection;