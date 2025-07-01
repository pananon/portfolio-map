import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Award, Medal, Crown, Zap, Sparkles, Target, Flame } from 'lucide-react';

const Awards = ({ awards }) => {
  const awardCategories = [
    {
      title: "🏃‍♂️ Sports & Athletics",
      subtitle: "Physical Excellence",
      icon: Medal,
      color: "from-yellow-400 via-orange-500 to-red-500",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
      borderColor: "border-yellow-300",
      textColor: "text-yellow-800",
      achievements: ["Gold Medal - 100m Race"],
      description: "Demonstrating exceptional athletic prowess and competitive spirit"
    },
    {
      title: "🧠 Academic Excellence", 
      subtitle: "Intellectual Achievement",
      icon: Crown,
      color: "from-purple-400 via-pink-500 to-indigo-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      borderColor: "border-purple-300",
      textColor: "text-purple-800",
      achievements: ["State Chess Champion"],
      description: "Recognition for outstanding academic performance and strategic thinking"
    },
    {
      title: "🌟 Leadership & Service",
      subtitle: "Community Impact",
      icon: Award,
      color: "from-blue-400 via-cyan-500 to-teal-500", 
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      borderColor: "border-blue-300",
      textColor: "text-blue-800",
      achievements: ["Tritya Soupan - Scout and Guide"],
      description: "Demonstrated leadership abilities and commitment to serving the community"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Awards Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-8 text-white"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex justify-center mb-6"
          >
            <Trophy className="w-16 h-16 text-white" />
          </motion.div>
          <h3 className="text-3xl font-bold mb-4">Celebrating Excellence</h3>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            A collection of achievements that reflect dedication, perseverance, and the pursuit of excellence across diverse fields
          </p>
        </div>
      </motion.div>

      {/* Awards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {awardCategories.map((category, categoryIndex) => {
          const Icon = category.icon;
          
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative p-8 rounded-3xl shadow-2xl border-2 transition-all duration-500 ${category.bgColor} ${category.borderColor} hover:shadow-3xl group`}
            >
              {/* Floating Icons */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  delay: categoryIndex * 0.5
                }}
                className="absolute top-4 right-4 opacity-20"
              >
                <Sparkles className="w-8 h-8 text-yellow-500" />
              </motion.div>

              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${category.color} text-white shadow-lg`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{category.title}</h3>
                  <p className="text-sm text-gray-600 font-medium">{category.subtitle}</p>
                </div>
              </div>

              {/* Awards List */}
              <div className="space-y-4 mb-6">
                {category.achievements.map((award, awardIndex) => (
                  <motion.div
                    key={award}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: awardIndex * 0.1 }}
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${category.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                        <Trophy className={`w-5 h-5 ${category.textColor}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2 text-lg">{award}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Category Stats */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${category.textColor}`}>
                      {category.achievements.length}
                    </div>
                    <div className="text-xs text-gray-600">Achievements</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">100%</div>
                    <div className="text-xs text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">⭐</div>
                    <div className="text-xs text-gray-600">Excellence</div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Achievement Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 border border-gray-200"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="w-8 h-8 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">Achievement Journey</h3>
            <Flame className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A timeline of milestones that shaped my character and demonstrated my commitment to excellence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="text-4xl mb-3">🏃‍♂️</div>
            <h4 className="font-bold text-gray-900 mb-2">Physical Excellence</h4>
            <p className="text-sm text-gray-600">Gold Medal in 100m Race</p>
            <div className="mt-3 text-xs text-blue-600 font-medium">Athletic Achievement</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="text-4xl mb-3">🧠</div>
            <h4 className="font-bold text-gray-900 mb-2">Strategic Thinking</h4>
            <p className="text-sm text-gray-600">State Chess Champion</p>
            <div className="mt-3 text-xs text-purple-600 font-medium">Intellectual Achievement</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="text-4xl mb-3">🌟</div>
            <h4 className="font-bold text-gray-900 mb-2">Community Service</h4>
            <p className="text-sm text-gray-600">Tritya Soupan - Scout and Guide</p>
            <div className="mt-3 text-xs text-green-600 font-medium">Leadership Achievement</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 rounded-3xl p-10 shadow-2xl border border-yellow-200 max-w-4xl mx-auto">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-6xl mb-6"
          >
            🏆
          </motion.div>
          <blockquote className="text-2xl font-medium text-gray-800 mb-6 italic leading-relaxed">
            "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle."
          </blockquote>
          <p className="text-gray-600 font-medium">- Steve Jobs</p>
          <div className="mt-6 flex justify-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <Star className="w-5 h-5 text-yellow-500" />
            <Star className="w-5 h-5 text-yellow-500" />
            <Star className="w-5 h-5 text-yellow-500" />
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Awards; 