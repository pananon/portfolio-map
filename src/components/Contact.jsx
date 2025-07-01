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
        'service_43sevl4', // Replace with your EmailJS service ID
        'template_5p00xzp', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'fErXqUo4-g2Xe3fLD' // Replace with your EmailJS public key
      );
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      // Reset form after 3 seconds
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
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Contact Information */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <h3 className="text-3xl font-bold text-secondary-900 mb-6">
            Let's Connect
          </h3>
          <p className="text-lg text-secondary-600 leading-relaxed">
            I'm always interested in new opportunities and collaborations. 
            Whether you have a project in mind or just want to chat about technology, 
            feel free to reach out!
          </p>
        </motion.div>

        {/* Contact Details */}
        <motion.div variants={itemVariants} className="space-y-6">
          <motion.a
            whileHover={{ scale: 1.02 }}
            href={`mailto:${personal.email}`}
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-200">
              <Mail className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors duration-200" />
            </div>
            <div>
              <h4 className="font-semibold text-secondary-900">Email</h4>
              <p className="text-secondary-600">{personal.email}</p>
            </div>
          </motion.a>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-200">
              <MapPin className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors duration-200" />
            </div>
            <div>
              <h4 className="font-semibold text-secondary-900">Location</h4>
              <p className="text-secondary-600">Hyderabad, India</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Availability Status */}
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <span className="font-semibold">Available for Opportunities</span>
          </div>
          <p className="text-green-100">
            I'm currently open to new opportunities and would love to discuss 
            potential collaborations or projects.
          </p>
        </motion.div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white rounded-xl p-8 shadow-lg border border-secondary-100"
      >
        <h3 className="text-2xl font-bold text-secondary-900 mb-6">
          Send a Message
        </h3>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-secondary-900 mb-2">
              Message Sent Successfully!
            </h4>
            <p className="text-secondary-600">
              Thank you for reaching out. I'll get back to you soon!
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Tell me about your project or opportunity..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-400 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
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