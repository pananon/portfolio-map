import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building, Calendar, BookOpen, Star, Zap, Rocket, Trophy, GraduationCap, Briefcase, Play, Pause, RotateCcw } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix marker icon for Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Red marker icon and shadow from leaflet-color-markers CDN
const redMarkerIcon = 'https://unpkg.com/leaflet-color-markers@1.1.1/img/marker-icon-red.png';
const redMarkerIcon2x = 'https://unpkg.com/leaflet-color-markers@1.1.1/img/marker-icon-2x-red.png';
const markerShadowCDN = 'https://unpkg.com/leaflet-color-markers@1.1.1/img/marker-shadow.png';
const customIcon = new L.Icon({
  iconUrl: redMarkerIcon,
  iconRetinaUrl: redMarkerIcon2x,
  shadowUrl: markerShadowCDN,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom animated marker icons
const createAnimatedIcon = (color, size = 25) => {
  return L.divIcon({
    className: 'custom-animated-marker',
    html: `
      <div style="
        width: ${size}px; 
        height: ${size}px; 
        background: ${color}; 
        border-radius: 50%; 
        border: 3px solid white; 
        box-shadow: 0 0 20px ${color}40, 0 0 40px ${color}20;
        animation: pulse 2s infinite;
        position: relative;
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        "></div>
      </div>
      <style>
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      </style>
    `,
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
    popupAnchor: [0, -size/2],
  });
};

// Work journey with enhanced data
const WORK_COORDS = [
  { 
    name: 'Noida', 
    coordinates: [28.5355, 77.3910], 
    type: 'work',
    color: '#3b82f6',
    achievements: ['Started career journey', 'First professional role'],
    icon: '🚀',
    awards: ['State Chess Champion', 'Gold Medal - 100m Race', 'Tritya Soupan - Scout and Guide'] // Awards earned in Noida
  },
  { 
    name: 'Bengaluru', 
    coordinates: [12.9716, 77.5946], 
    type: 'work',
    color: '#10b981',
    achievements: ['Senior role', 'Leadership experience'],
    icon: '⭐',
    awards: [] // No awards in Bengaluru
  },
  { 
    name: 'Hyderabad', 
    coordinates: [17.3850, 78.4867], 
    type: 'work',
    color: '#8b5cf6',
    achievements: ['Microsoft', 'Current position'],
    icon: '🏆',
    awards: [] // No awards in Hyderabad
  },
];

// Education journey with enhanced data
const EDU_COORDS = [
  { 
    name: 'Ambala Cantt', 
    coordinates: [30.3752, 76.7821], 
    type: 'edu', 
    label: 'KVS Ambala Cantt (Up to 6th)',
    color: '#ef4444',
    achievements: ['Foundation years', 'Early education'],
    icon: '📚'
  },
  { 
    name: 'Basti', 
    coordinates: [26.8137, 82.7634], 
    type: 'edu', 
    label: 'KVS Basti (6th–12th)',
    color: '#f59e0b',
    achievements: ['Secondary education', 'Academic excellence'],
    icon: '🎓'
  },
  { 
    name: 'Kota', 
    coordinates: [25.2138, 75.8648], 
    type: 'edu', 
    label: 'Kota (JEE Prep)',
    color: '#ec4899',
    achievements: ['JEE preparation', 'Competitive exams'],
    icon: '⚡'
  },
  { 
    name: 'Noida', 
    coordinates: [28.5355, 77.3910], 
    type: 'edu', 
    label: 'Noida (BTech)',
    color: '#06b6d4',
    achievements: ['BTech degree', 'Computer Science'],
    icon: '💻'
  },
];

const InteractiveMap = ({ data }) => {
  const [activeCity, setActiveCity] = useState(null);
  const [activeExperience, setActiveExperience] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [showJourneyAnimation, setShowJourneyAnimation] = useState(false);
  const [currentJourneyStep, setCurrentJourneyStep] = useState(0);
  const [weatherEffect, setWeatherEffect] = useState(false);
  const mapRef = useRef(null);

  const indiaCenter = [20.5937, 78.9629];
  const indiaZoom = 5;

  // Journey animation effect
  useEffect(() => {
    if (!showJourneyAnimation) return;

    const interval = setInterval(() => {
      setCurrentJourneyStep(prev => {
        if (prev >= EDU_COORDS.length + WORK_COORDS.length - 1) {
          setShowJourneyAnimation(false);
          return 0;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [showJourneyAnimation]);

  // Auto-show cards during animation
  useEffect(() => {
    if (showJourneyAnimation) {
      const currentCity = getCurrentAnimationCity();
      setActiveCity(currentCity);
      setActiveType(currentCity.type);
    }
  }, [currentJourneyStep, showJourneyAnimation]);

  // Weather effect toggle
  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherEffect(prev => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Get experiences for a city
  const getExperiencesForCity = (cityName) => {
    const cityObj = data.mapData.india.cities.find(c => c.name === cityName);
    if (!cityObj) return [];
    return data.experience.filter(exp => cityObj.experiences.includes(exp.id));
  };

  // Get education for a city
  const getEducationForCity = (cityName) => {
    if (cityName === 'Ambala Cantt') {
      return [{
        institution: 'KVS Ambala Cantt',
        degree: 'Schooling (Up to 6th)',
        duration: 'Up to 2009',
        location: 'Ambala Cantt, Haryana',
        description: 'Studied up to 6th standard at Kendriya Vidyalaya, Ambala Cantt.',
        achievements: ['Foundation years', 'Early education']
      }];
    }
    if (cityName === 'Basti') {
      return [{
        institution: 'KVS Basti',
        degree: 'Schooling (6th–12th)',
        duration: '2009–2015',
        location: 'Basti, Uttar Pradesh',
        description: 'Studied from 6th to 12th standard at Kendriya Vidyalaya, Basti.',
        achievements: ['Secondary education', 'Academic excellence']
      }];
    }
    if (cityName === 'Kota') {
      return [{
        institution: 'Kota (JEE Prep)',
        degree: 'JEE Preparation',
        duration: '2015–2016',
        location: 'Kota, Rajasthan',
        description: 'Prepared for JEE, secured AIR 19319 in IIT JEE Advance and AIR 421 in UPTU.',
        achievements: ['JEE preparation', 'Competitive exams']
      }];
    }
    if (cityName === 'Noida') {
      return [{
        institution: 'JSS Academy of Technical Education',
        degree: 'BTech, Computer Science',
        duration: '2016–2020',
        location: 'Noida, Uttar Pradesh',
        description: 'Graduated with strong foundation in computer science fundamentals, algorithms, and software engineering principles.',
        achievements: ['BTech degree', 'Computer Science']
      }];
    }
    return [];
  };

  // Get awards for a city (if any)
  const getAwardsForCity = (cityName) => {
    const city = WORK_COORDS.find(city => city.name === cityName);
    return city ? city.awards || [] : [];
  };

  // Get current city for animation
  const getCurrentAnimationCity = () => {
    if (currentJourneyStep < EDU_COORDS.length) {
      return EDU_COORDS[currentJourneyStep];
    } else {
      return WORK_COORDS[currentJourneyStep - EDU_COORDS.length];
    }
  };

  // Get all cities for the complete journey
  const getAllJourneyCities = () => {
    return [...EDU_COORDS, ...WORK_COORDS];
  };

  // Custom popup content
  const createCustomPopup = (city, type) => (
    <div className="custom-popup">
      <div className="text-center">
        <div className="text-2xl mb-2">
          {type === 'awards' ? '🏆' : city.icon}
        </div>
        <h3 className="font-bold text-lg text-gray-800 mb-1">{city.name}</h3>
        <p className="text-sm text-gray-600 mb-3">
          {type === 'work' ? 'Professional Journey' : 
           type === 'edu' ? 'Educational Journey' : 
           'Awards & Recognition'}
        </p>
        <div className="flex flex-wrap gap-1 justify-center">
          {type === 'awards' ? 
            city.awards.slice(0, 2).map((award, idx) => (
              <span key={idx} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                {award}
              </span>
            )) :
            city.achievements.map((achievement, idx) => (
              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {achievement}
              </span>
            ))
          }
        </div>
        <button
          className={`mt-3 px-4 py-2 rounded-lg text-sm transition-colors ${
            type === 'awards' 
              ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          onClick={() => { setActiveCity(city); setActiveType(type); }}
        >
          Explore Details
        </button>
      </div>
    </div>
  );

  // Custom markers
  const createCustomIcon = (type) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="marker-container">
          <div class="marker-icon ${type}">
            ${type === 'education' ? '🎓' : type === 'work' ? '💼' : '🏆'}
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });
  };

  return (
    <div className="relative">
      {/* Weather Effect Overlay */}
      {weatherEffect && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-200/20 to-transparent animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Journey Animation Controls */}
      <div className="absolute top-4 left-4 z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowJourneyAnimation(!showJourneyAnimation);
            setCurrentJourneyStep(0);
          }}
          className={`px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 ${
            showJourneyAnimation 
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' 
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
          }`}
        >
          {showJourneyAnimation ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-4 h-4" />
              </motion.div>
              Journey in Progress...
            </>
          ) : (
            <>
              <Rocket className="w-4 h-4" />
              Start Journey Animation
            </>
          )}
        </motion.button>
      </div>

      {/* Current City Indicator */}
      {showJourneyAnimation && (
        <div className="absolute top-4 left-64 z-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200"
          >
            <div className="flex items-center gap-2">
              <div className="text-2xl">{getCurrentAnimationCity().icon}</div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  {getCurrentAnimationCity().name}
                </div>
                <div className="text-xs text-gray-600">
                  {getCurrentAnimationCity().type === 'work' ? 'Professional Journey' : 'Educational Journey'}
                </div>
                <div className="text-xs text-blue-600 font-medium mt-1">
                  📖 Auto-showing details...
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Map Container */}
        <div className="relative h-[500px] lg:h-[700px] rounded-xl overflow-hidden shadow-2xl border-4 border-white">
          <MapContainer 
            center={indiaCenter} 
            zoom={indiaZoom} 
            scrollWheelZoom={false} 
            className="w-full h-full rounded-xl z-0"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Animated Journey Path */}
            <Polyline 
              positions={WORK_COORDS.map(city => [city.coordinates[0], city.coordinates[1]])} 
              color="#3b82f6" 
              weight={4} 
              dashArray="8 8"
              className="journey-path"
            />
            <Polyline 
              positions={EDU_COORDS.map(city => [city.coordinates[0], city.coordinates[1]])} 
              color="#ef4444" 
              weight={4} 
              dashArray="6 10"
              className="journey-path"
            />

            {/* Work Markers with Custom Icons */}
            {WORK_COORDS.map((city, idx) => (
              <Marker
                key={city.name + '-work'}
                position={[city.coordinates[0], city.coordinates[1]]}
                icon={createAnimatedIcon(
                  city.color, 
                  showJourneyAnimation && getCurrentAnimationCity().name === city.name ? 40 : 30
                )}
                eventHandlers={{
                  click: () => { setActiveCity(city); setActiveType('work'); },
                }}
              >
                <Popup className="custom-popup-container">
                  {createCustomPopup(city, 'work')}
                </Popup>
              </Marker>
            ))}

            {/* Education Markers with Custom Icons */}
            {EDU_COORDS.map((city, idx) => (
              <Marker
                key={city.name + '-edu'}
                position={[city.coordinates[0], city.coordinates[1]]}
                icon={createAnimatedIcon(
                  city.color, 
                  showJourneyAnimation && getCurrentAnimationCity().name === city.name ? 35 : 25
                )}
                eventHandlers={{
                  click: () => { setActiveCity(city); setActiveType('edu'); },
                }}
              >
                <Popup className="custom-popup-container">
                  {createCustomPopup(city, 'edu')}
                </Popup>
              </Marker>
            ))}

            {/* Awards Markers */}
            {WORK_COORDS.filter(city => city.awards && city.awards.length > 0).map((city, idx) => (
              <Marker
                key={city.name + '-awards'}
                position={[city.coordinates[0] + 0.1, city.coordinates[1] + 0.1]}
                icon={createCustomIcon('awards')}
                eventHandlers={{
                  click: () => { setActiveCity(city); setActiveType('awards'); },
                }}
              >
                <Popup className="custom-popup-container">
                  {createCustomPopup(city, 'awards')}
                </Popup>
              </Marker>
            ))}

            {/* Journey Animation Circles */}
            {showJourneyAnimation && (
              <>
                <Circle
                  center={[getCurrentAnimationCity().coordinates[0], getCurrentAnimationCity().coordinates[1]]}
                  radius={80000}
                  pathOptions={{
                    color: getCurrentAnimationCity().color,
                    fillColor: getCurrentAnimationCity().color,
                    fillOpacity: 0.2,
                    weight: 3
                  }}
                />
                <Circle
                  center={[getCurrentAnimationCity().coordinates[0], getCurrentAnimationCity().coordinates[1]]}
                  radius={40000}
                  pathOptions={{
                    color: getCurrentAnimationCity().color,
                    fillColor: getCurrentAnimationCity().color,
                    fillOpacity: 0.4,
                    weight: 2
                  }}
                />
              </>
            )}

            {/* Journey Progress Indicator */}
            {showJourneyAnimation && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-10">
                <div className="text-sm font-semibold text-gray-800 mb-2">Journey Progress</div>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${((currentJourneyStep + 1) / (EDU_COORDS.length + WORK_COORDS.length)) * 100}%` 
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {currentJourneyStep + 1} / {EDU_COORDS.length + WORK_COORDS.length}
                </div>
              </div>
            )}
          </MapContainer>

          {/* Map Legend */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-10">
            <div className="text-sm font-semibold text-gray-800 mb-2">Legend</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-700">Work Journey</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs text-gray-700">Education Journey</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-xs text-gray-700">Awards & Recognition</span>
              </div>
            </div>
          </div>
        </div>

        {/* Experience/Education Cards */}
        <AnimatePresence mode="wait">
          {activeCity && activeType === 'work' ? (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
              className={`h-[500px] lg:h-[700px] overflow-y-auto rounded-xl shadow-lg p-6 border ${
                showJourneyAnimation 
                  ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-xl' 
                  : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl">{activeCity.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-blue-900">{activeCity.name} Experience</h2>
                  <p className="text-blue-600">Professional Journey</p>
                  {showJourneyAnimation && (
                    <div className="text-xs text-blue-600 font-medium mt-1 flex items-center gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        ⏱️
                      </motion.div>
                      Auto-displaying during journey
                    </div>
                  )}
                </div>
              </div>
              {getExperiencesForCity(activeCity.name).map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-4 shadow-lg border-l-4 mb-6 border-blue-400 cursor-pointer transition-all duration-200 hover:shadow-xl"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {exp.position}
                      </h3>
                      <p className="text-sm text-blue-600">
                        {exp.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.location}</span>
                    <Calendar className="w-4 h-4 ml-2" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="mb-2 text-gray-700 text-sm">
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start gap-2 mb-1">
                        <Star className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : activeCity && activeType === 'edu' ? (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
              className={`h-[500px] lg:h-[700px] overflow-y-auto rounded-xl shadow-lg p-6 border ${
                showJourneyAnimation 
                  ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200 shadow-xl' 
                  : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-100'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl">{activeCity.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-red-900">{activeCity.label || activeCity.name} Education</h2>
                  <p className="text-red-600">Learning Journey</p>
                  {showJourneyAnimation && (
                    <div className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        ⏱️
                      </motion.div>
                      Auto-displaying during journey
                    </div>
                  )}
                </div>
              </div>
              {getEducationForCity(activeCity.name).map((edu, idx) => (
                <motion.div
                  key={edu.institution + idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-4 shadow-lg border-l-4 mb-6 border-red-400 cursor-pointer transition-all duration-200 hover:shadow-xl"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {edu.institution}
                      </h3>
                      <p className="text-sm text-red-600">
                        {edu.degree}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{edu.location}</span>
                    <Calendar className="w-4 h-4 ml-2" />
                    <span>{edu.duration}</span>
                  </div>
                  <div className="mb-2 text-gray-700 text-sm">
                    {edu.description}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {edu.achievements.map((achievement, i) => (
                      <span key={i} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        {achievement}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : activeCity && activeType === 'awards' ? (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
              className={`h-[500px] lg:h-[700px] overflow-y-auto rounded-xl shadow-lg p-6 border ${
                showJourneyAnimation 
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-xl' 
                  : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-100'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl">🏆</div>
                <div>
                  <h2 className="text-2xl font-bold text-yellow-900">{activeCity.name} Awards</h2>
                  <p className="text-yellow-600">Achievements & Recognition</p>
                  {showJourneyAnimation && (
                    <div className="text-xs text-yellow-600 font-medium mt-1 flex items-center gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        ⏱️
                      </motion.div>
                      Auto-displaying during journey
                    </div>
                  )}
                </div>
              </div>
              {getAwardsForCity(activeCity.name).map((award, idx) => (
                <motion.div
                  key={award + idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-4 shadow-lg border-l-4 mb-6 border-yellow-400 cursor-pointer transition-all duration-200 hover:shadow-xl"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {award}
                      </h3>
                      <p className="text-sm text-yellow-600">
                        Achievement
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Recognition Award</span>
                  </div>
                  <div className="mb-2 text-gray-700 text-sm">
                    This award represents excellence and achievement in various fields including sports, 
                    academics, and extracurricular activities.
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      Achievement
                    </span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      Recognition
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
              className="h-[500px] lg:h-[700px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Interactive Journey Map</h3>
                <p className="text-gray-600 mb-6">Click on any marker to explore my professional and educational journey</p>
                <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800 text-sm">Work Experience</div>
                      <div className="text-xs text-gray-600">Professional journey across cities</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800 text-sm">Education</div>
                      <div className="text-xs text-gray-600">Academic journey and learning</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800 text-sm">Awards & Recognition</div>
                      <div className="text-xs text-gray-600">Achievements and honors</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom CSS for enhanced styling */}
      <style jsx>{`
        .custom-popup-container .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .custom-popup-container .leaflet-popup-content {
          margin: 15px;
          min-width: 200px;
        }
        
        .journey-path {
          animation: dash 3s linear infinite;
        }
        
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveMap; 