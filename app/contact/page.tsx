"use client";

import React, { useState, useRef } from 'react';
import { TopMinistryBar } from "@/components/site/top-ministry-bar";
import { Navbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/footer";

export default function ContactUs() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNo: '',
    emailId: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration - replace with your actual values
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

      // Load EmailJS script dynamically
      if (!window.emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.async = true;
        document.head.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
        
        window.emailjs.init(publicKey);
      }

      // Send email using EmailJS
      await window.emailjs.send(serviceId, templateId, {
        from_name: `${formData.firstName} ${formData.lastName}`,
        first_name: formData.firstName,
        last_name: formData.lastName,
        mobile_no: formData.mobileNo,
        email_id: formData.emailId,
        message: formData.message,
        reply_to: formData.emailId,
      });

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        mobileNo: '',
        emailId: '',
        message: ''
      });
      
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  return (
    <main className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <TopMinistryBar />
      <Navbar />

      <section className="py-10 lg:py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-sm sm:text-base font-semibold text-orange-600 tracking-wide mb-4">
              GET IN TOUCH
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              CONTACT <span className="text-green-500">US</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Form + Aside */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500 p-6 sm:p-8 border border-green-100">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="group">
                <label htmlFor="firstName" className="block text-sm font-semibold text-red-500 mb-2 uppercase tracking-wide">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-300 hover:border-green-300 hover:shadow-md"
                  placeholder="Enter your first name"
                />
              </div>

              <div className="group">
                <label htmlFor="lastName" className="block text-sm font-semibold text-red-500 mb-2 uppercase tracking-wide">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-300 hover:border-green-300 hover:shadow-md"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Mobile No and Email ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="group">
                <label htmlFor="mobileNo" className="block text-sm font-semibold text-red-500 mb-2 uppercase tracking-wide">
                  Mobile No
                </label>
                <input
                  type="tel"
                  id="mobileNo"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-300 hover:border-green-300 hover:shadow-md"
                  placeholder="Enter your mobile number"
                />
              </div>

              <div className="group">
                <label htmlFor="emailId" className="block text-sm font-semibold text-red-500 mb-2 uppercase tracking-wide">
                  Email ID
                </label>
                <input
                  type="email"
                  id="emailId"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-300 hover:border-green-300 hover:shadow-md"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Message */}
            <div className="group">
              <label htmlFor="message" className="block text-sm font-semibold text-blue-500 mb-2 uppercase tracking-wide">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-xl border-2 border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 hover:border-blue-400 hover:shadow-md resize-none"
                placeholder="Enter your message here..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg uppercase tracking-wide hover:from-green-600 hover:to-emerald-700 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-2 border-green-600"
              >
                {isSubmitting ? 'SENDING...' : 'SUBMIT'}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mt-4 p-4 rounded-xl bg-green-50 border-2 border-green-300 text-green-800 text-center font-semibold animate-pulse">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mt-4 p-4 rounded-xl bg-red-50 border-2 border-red-300 text-red-800 text-center font-semibold animate-pulse">
                Failed to send message. Please try again later.
              </div>
            )}
              </form>
            </div>

            {/* Aside: contact details and map placeholder */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-green-100 bg-white/70 backdrop-blur p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900">Contact details</h3>
                <ul className="mt-3 space-y-2 text-gray-700 text-sm">
                  <li><span className="text-gray-500">Email:</span> aetheraayurwave@gmail.com</li>
                  <li><span className="text-gray-500">Phone:</span> +91 98765 43210</li>
                  <li><span className="text-gray-500">Hours:</span> Mon–Fri, 9:00–18:00 IST</li>
                </ul>
              </div>
              <div className="rounded-2xl overflow-hidden border border-green-100 bg-white shadow-sm">
                <div className="aspect-[16/10] w-full bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center text-gray-500 text-sm">
                  Map preview
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

// TypeScript declaration for EmailJS
declare global {
  interface Window {
    emailjs: any;
  }
}