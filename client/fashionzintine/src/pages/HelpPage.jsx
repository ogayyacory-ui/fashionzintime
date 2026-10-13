import React, { useState } from 'react';

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does M-Pesa checkout work?",
      answer: "When choosing M-Pesa at checkout, enter your registered Safaricom phone number. You will receive an STK Push prompt directly on your phone asking you to enter your M-Pesa PIN to complete the transaction securely."
    },
    {
      question: "What payment methods do you accept globally?",
      answer: "We accept all major credit and debit cards globally through our secure Stripe payment gateway integration."
    },
    {
      question: "How can I track my order status?",
      answer: "Once logged into your account, navigate to Settings -> Order History to check the real-time status of all your placed orders."
    },
    {
      question: "What is your return policy?",
      answer: "We offer hassle-free returns within 30 days of purchase for unworn and unwashed items in their original packaging."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Help & Support</h1>
      <p className="text-gray-600 mb-8">Find answers to common questions or reach out to our team.</p>

      {/* FAQs Section */}
      <div className="space-y-4 mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left font-medium text-gray-900 flex justify-between items-center hover:bg-gray-50 transition"
            >
              <span>{faq.question}</span>
              <span className="text-gray-500">{openIndex === index ? '-' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-2">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Support Contact Info */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-indigo-900 mb-2">Still need help?</h2>
        <p className="text-indigo-700 text-sm mb-4">Our customer support team is available Monday through Saturday.</p>
        <p className="text-sm text-gray-700">Email: <span className="font-semibold">support@fashionzintime.com</span></p>
        <p className="text-sm text-gray-700 mt-1">Helpline: <span className="font-semibold">+254 700 000000</span></p>
      </div>
    </div>
  );
}