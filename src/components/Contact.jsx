import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = ({ personal }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send(
        'service_43sevl4', // Replaced with user's EmailJS service ID
        'template_5p00xzp', // Replaced with User's EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'fErXqUo4-g2Xe3fLD' // Replaced with User's EmailJS public key
      );
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Contact Information */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-12"
      >
        <motion.div variants={itemVariants}>
          <h3 className="font-display text-4xl font-bold text-white mb-6 tracking-tight">
            Collaborate
          </h3>
          <p className="text-xl text-gray-400 leading-relaxed font-light">
            I'm always interested in new opportunities and collaborations.
            Whether you have a project in mind or just want to chat about technology,
            feel free to reach out.
          </p>
        </motion.div>

        {/* Contact Details */}
        <motion.div variants={itemVariants} className="space-y-6">
          <motion.a
            whileHover={{ x: 10 }}
            href={`mailto:${personal.email}`}
            className="flex items-center gap-6 p-6 rounded-2xl border border-white/5 hover:bg-white/5 transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">Email</h4>
              <p className="text-gray-400 group-hover:text-white transition-colors">{personal.email}</p>
            </div>
          </motion.a>

          <motion.div
            whileHover={{ x: 10 }}
            className="flex items-center gap-6 p-6 rounded-2xl border border-white/5 hover:bg-white/5 transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">Base</h4>
              <p className="text-gray-400 group-hover:text-white transition-colors">Hyderabad, India</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Availability Status */}
        <motion.div variants={itemVariants} className="glass-dark rounded-2xl p-8 border border-white/5">
          <div className="flex items-center gap-4 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="font-bold text-white tracking-wide uppercase text-sm">Open to Work</span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            I am currently available for freelance projects and full-time opportunities.
          </p>
        </motion.div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="glass-dark rounded-3xl p-10 border border-white/5 shadow-2xl bg-[#0a0a0a]"
      >
        <h3 className="font-display text-2xl font-bold text-white mb-8">
          Send a Message
        </h3>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-4">
              Message Sent
            </h4>
            <p className="text-gray-400">
              Thank you for reaching out. I'll get back to you soon.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-400 ml-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-white/20 focus:border-white/20 focus:outline-none transition-all duration-300"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-400 ml-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-white/20 focus:border-white/20 focus:outline-none transition-all duration-300"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-400 ml-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-white/20 focus:border-white/20 focus:outline-none transition-all duration-300 resize-none"
                placeholder="Your message..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white hover:bg-gray-200 disabled:bg-gray-600 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 mt-4"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Contact;