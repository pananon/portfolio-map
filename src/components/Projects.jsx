import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Code, Trophy, Star, TrendingUp, Zap, Target, Award } from 'lucide-react';

const CodingProfiles = ({ personal }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoveredCard, setHoveredCard] = useState(null);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const leetcodeStats = {
    username: "harimangalp",
    rating: 1800,
    problemsSolved: 200,
    contests: 50,
    rank: "Top 5%",
    streak: 30,
    languages: ["C++", "Java", "Python", "JavaScript"],
    apiUrl: "https://leetcode-stats.vercel.app/api?username=harimangalp&theme=Light"
  };

  const githubStats = {
    username: "pananon",
    repositories: 27,
    stars: 37,
    forks: 80,
    contributions: 1200,
    followers: 5,
    languages: ["JavaScript", "TypeScript", "Python", "Java", "C++"]
  };

  const codechefStats = {
    username: "pandey01",
    rating: 1769,
    problemsSolved: 76,
    contests: 24,
    rank: "3★",
    streak: 30,
    languages: ["C++", "Java", "Python"]
  };

  return (
    <div ref={ref} className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-secondary-900 mb-4">
          Coding Achievements & Profiles
        </h2>
        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
          My journey in competitive programming and open source development
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* LeetCode Profile */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -5 }}
          onHoverStart={() => setHoveredCard('leetcode')}
          onHoverEnd={() => setHoveredCard(null)}
          className="group relative bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">LeetCode Profile</h3>
                  <p className="text-orange-100 text-sm">@{leetcodeStats.username}</p>
                </div>
              </div>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={`https://leetcode.com/u/${leetcodeStats.username}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="p-6">
            {/* Real-time LeetCode Stats */}
            <div className="mb-6">
              <div className="text-center mb-3">
                <h4 className="font-semibold text-gray-800 mb-2">Real-time Stats</h4>
                <a 
                  href={`https://leetcode.com/u/${leetcodeStats.username}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <img 
                    src={leetcodeStats.apiUrl} 
                    alt="LeetCode Stats" 
                    className="w-full max-w-xs mx-auto rounded-lg shadow-sm"
                  />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-orange-600 mb-1">{leetcodeStats.rating}</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-orange-600 mb-1">{leetcodeStats.problemsSolved}</div>
                <div className="text-sm text-gray-600">Problems Solved</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-orange-600 mb-1">{leetcodeStats.contests}</div>
                <div className="text-sm text-gray-600">Contests</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-orange-600 mb-1">{leetcodeStats.streak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <div>
                  <div className="font-semibold text-gray-800">{leetcodeStats.rank}</div>
                  <div className="text-sm text-gray-600">Global Ranking</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <Target className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-semibold text-gray-800">200+ Problems</div>
                  <div className="text-sm text-gray-600">Successfully Solved</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <Zap className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="font-semibold text-gray-800">Multiple Languages</div>
                  <div className="text-sm text-gray-600">{leetcodeStats.languages.join(", ")}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hover Border Effect */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: hoveredCard === 'leetcode' ? 1 : 0 }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 origin-left"
          />
        </motion.div>

        {/* GitHub Profile */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -5 }}
          onHoverStart={() => setHoveredCard('github')}
          onHoverEnd={() => setHoveredCard(null)}
          className="group relative bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Github className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">GitHub Profile</h3>
                  <p className="text-gray-300 text-sm">@{githubStats.username}</p>
                </div>
              </div>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={`https://github.com/${githubStats.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-gray-700 mb-1">{githubStats.repositories}</div>
                <div className="text-sm text-gray-600">Repositories</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-gray-700 mb-1">{githubStats.stars}</div>
                <div className="text-sm text-gray-600">Stars Earned</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-gray-700 mb-1">{githubStats.contributions}</div>
                <div className="text-sm text-gray-600">Contributions</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-gray-700 mb-1">{githubStats.followers}</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <Star className="w-5 h-5 text-yellow-500" />
                <div>
                  <div className="font-semibold text-gray-800">{githubStats.stars} Stars</div>
                  <div className="text-sm text-gray-600">Repository Recognition</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-semibold text-gray-800">{githubStats.repositories} Repositories</div>
                  <div className="text-sm text-gray-600">Active Development</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <Award className="w-5 h-5 text-purple-500" />
                <div>
                  <div className="font-semibold text-gray-800">Multiple Languages</div>
                  <div className="text-sm text-gray-600">{githubStats.languages.join(", ")}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hover Border Effect */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: hoveredCard === 'github' ? 1 : 0 }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-700 to-gray-800 origin-left"
          />
        </motion.div>

        {/* CodeChef Profile */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -5 }}
          onHoverStart={() => setHoveredCard('codechef')}
          onHoverEnd={() => setHoveredCard(null)}
          className="group relative bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">CodeChef Profile</h3>
                  <p className="text-pink-100 text-sm">@{codechefStats.username}</p>
                </div>
              </div>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={`https://www.codechef.com/users/${codechefStats.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-pink-600 mb-1">{codechefStats.rating}</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-pink-600 mb-1">{codechefStats.problemsSolved} Problems</div>
                <div className="text-sm text-gray-600">Successfully Solved</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-pink-600 mb-1">{codechefStats.contests}</div>
                <div className="text-sm text-gray-600">Contests</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-pink-600 mb-1">{codechefStats.streak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <Trophy className="w-5 h-5 text-pink-500" />
                <div>
                  <div className="font-semibold text-gray-800">{codechefStats.rank}</div>
                  <div className="text-sm text-gray-600">CodeChef Rating</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <Target className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-semibold text-gray-800">200+ Problems</div>
                  <div className="text-sm text-gray-600">Successfully Solved</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <Zap className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="font-semibold text-gray-800">Multiple Languages</div>
                  <div className="text-sm text-gray-600">{codechefStats.languages.join(", ")}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hover Border Effect */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: hoveredCard === 'codechef' ? 1 : 0 }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 origin-left"
          />
        </motion.div>
      </motion.div>

      {/* Coding Journey Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8" />
            <h3 className="text-2xl font-bold">Competitive Programming</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
              <span>{codechefStats.rating} CodeChef rating (@{codechefStats.username})</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
              <span>{codechefStats.problemsSolved} problems solved across platforms</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
              <span>{codechefStats.contests} contests participated</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
              <span>Strong foundation in algorithms and data structures</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Development Philosophy
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-gray-700 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Problem Solving</h4>
                <p className="text-gray-600 text-sm">Strong analytical and algorithmic thinking</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-gray-700 font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Open Source</h4>
                <p className="text-gray-600 text-sm">Active contribution to community projects (@{githubStats.username})</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-gray-700 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Continuous Learning</h4>
                <p className="text-gray-600 text-sm">Always exploring new technologies and approaches</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CodingProfiles; 