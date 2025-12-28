import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-20 pb-12 font-sans selection:bg-rose-100 selection:text-rose-900">
      
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 dark:text-white">Get in Touch</h1>
          <p className="text-slate-600 dark:text-slate-400">Have questions or feature requests? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Info Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-rose-600 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-rose-500 rounded-full opacity-50 blur-3xl"></div>
            
            <h2 className="text-2xl font-bold mb-8 relative z-10">Contact Information</h2>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="font-medium text-rose-100 text-sm mb-1">Email Us</p>
                  <a href="mailto:support@vivahpatra.com" className="text-lg font-semibold hover:text-rose-100">support@vivahpatra.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="font-medium text-rose-100 text-sm mb-1">Call Us</p>
                  <p className="text-lg font-semibold">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="font-medium text-rose-100 text-sm mb-1">Location</p>
                  <p className="text-lg font-semibold">Jaipur, Rajasthan, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-none"
          >
             <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" placeholder="Priya" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" placeholder="Sharma" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" placeholder="priya@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all resize-none" placeholder="How can we help you?"></textarea>
                </div>

                <button type="button" className="w-full py-4 bg-slate-900 dark:bg-rose-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-rose-700 transform active:scale-95 transition-all">
                  <Send size={18} /> Send Message
                </button>
             </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;