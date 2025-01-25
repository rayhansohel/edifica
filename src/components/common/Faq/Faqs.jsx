import { useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Default to open the first question

  // Toggle the visibility of the FAQ answer
  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What amenities are available in the building?",
      answer:
        "The building offers state-of-the-art amenities including a gym, a relaxing lounge, a rooftop terrace, and much more.",
    },
    {
      question: "Is parking available for residents?",
      answer:
        "Yes, there is ample parking space available for residents in a secure, underground parking garage.",
    },
    {
      question: "What is the process for renting an apartment?",
      answer:
        "To rent an apartment, you can visit our office or apply online through our website. Our team will guide you through the process.",
    },
    {
      question: "Are pets allowed in the building?",
      answer:
        "Yes, we are a pet-friendly building! However, we have certain guidelines and policies for pet owners, which you can review during your application.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support team through the contact form on our website or by calling the support number provided in the footer.",
    },
  ];

  return (
    <section className="pb-8 md:pb-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="FAQ"
          subtitle="Everything you need to know"
        />
        <div className="mt-6 px-8 border border-base-300 rounded-box">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-base-300 py-4"
            >
              <button
                className="w-full text-left text-xl hover:text-accent flex items-center justify-between"
                onClick={() => toggleAnswer(index)}
              >
                <span>{faq.question}</span>
                <span className="text-xl">{activeIndex === index ? "-" : "+"}</span>
              </button>
              {activeIndex === index && (
                <p className="mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;

