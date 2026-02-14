import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Award, Medal, Crown, Sparkles, Target, Flame } from 'lucide-react';

const Awards = ({ awards }) => {
  const awardCategories = [
    {
      title: "Sports & Athletics",
      subtitle: "Physical Excellence",
      icon: Medal,
      color: "text-amber-400",
      achievements: ["Gold Medal - 100m Race"],
      description: "Demonstrating exceptional athletic prowess and competitive spirit"
    },
    {
      title: "Academic Excellence",
      subtitle: "Intellectual Achievement",
      icon: Crown,
      color: "text-purple-400",
      achievements: ["State Chess Champion"],
      description: "Recognition for outstanding academic performance and strategic thinking"
    },
    {
      title: "Leadership & Service",
      subtitle: "Community Impact",
      icon: Award,
      color: "text-blue-400",
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
        className="relative overflow-hidden rounded-3xl p-12 text-center border border-white/5 bg-[#0a0a0a]"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            <Trophy className="w-10 h-10 text-white" />
          </motion.div>
          <h3 className="text-4xl font-bold mb-4 text-white tracking-tight">Recognition</h3>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A testament to dedication, strategic thinking, and the pursuit of excellence across disciplines.
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              whileHover={{ y: -5 }}
              className="glass-dark rounded-2xl p-8 border border-white/5 hover:border-white/20 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3 opacity-20">
                <Icon className={`w-24 h-24 ${category.color} translate-x-8 -translate-y-8`} />
              </div>

              {/* Category Header */}
              <div className="relative z-10 mb-8">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 mb-5 ${category.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{category.title}</h3>
                <p className="text-sm text-gray-400 uppercase tracking-widest">{category.subtitle}</p>
              </div>

              {/* Awards List */}
              <div className="relative z-10 space-y-4">
                {category.achievements.map((award, awardIndex) => (
                  <div
                    key={award}
                    className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
                  >
                    <h4 className="font-bold text-white mb-2">{award}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                ))}
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
        className="glass-dark rounded-3xl p-10 border border-white/5"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left mb-12">
          <div>
            <h3 className="text-3xl font-bold text-white mb-2">Milestones</h3>
            <p className="text-gray-400">Defining moments of the journey</p>
          </div>
          <Flame className="w-8 h-8 text-white opacity-50" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="text-4xl mb-4 grayscale opacity-80">🏃‍♂️</div>
            <h4 className="font-bold text-white mb-1">Athletics</h4>
            <div className="h-px w-8 bg-white/20 my-3" />
            <p className="text-sm text-gray-400">Gold Medalist</p>
            <p className="text-xs text-gray-600 mt-1 uppercase">Physical Excellence</p>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="text-4xl mb-4 grayscale opacity-80">♟️</div>
            <h4 className="font-bold text-white mb-1">Strategy</h4>
            <div className="h-px w-8 bg-white/20 my-3" />
            <p className="text-sm text-gray-400">State Chess Champion</p>
            <p className="text-xs text-gray-600 mt-1 uppercase">Intellectual Mastery</p>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="text-4xl mb-4 grayscale opacity-80">🎖️</div>
            <h4 className="font-bold text-white mb-1">Leadership</h4>
            <div className="h-px w-8 bg-white/20 my-3" />
            <p className="text-sm text-gray-400">Scout & Guide</p>
            <p className="text-xs text-gray-600 mt-1 uppercase">Community Service</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Awards;