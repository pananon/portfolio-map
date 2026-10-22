import { JOURNEY_DATA } from './journeyData';

// Chapters that share a city get their own pin, fanned on a small ring around the city.
const FAN_RADIUS_DEG = 1.15;

const cityKey = item => item.coordinates.join(',');

const groups = JOURNEY_DATA.slice(1).reduce((map, item) => {
  const key = cityKey(item);
  map.set(key, [...(map.get(key) ?? []), item.id]);
  return map;
}, new Map());

const startYear = year => {
  const match = /\d{4}/.exec(year);
  return match ? Number(match[0]) : null;
};

export const CHAPTER_META = JOURNEY_DATA.map((item, index) => {
  if (index === 0) return { city: item.coordinates, pin: item.coordinates, cityIndex: 0, cityCount: 1, startYear: null };
  const ids = groups.get(cityKey(item));
  const cityIndex = ids.indexOf(item.id);
  const cityCount = ids.length;
  const [lat, lon] = item.coordinates;
  if (cityCount === 1) return { city: item.coordinates, pin: item.coordinates, cityIndex, cityCount, startYear: startYear(item.year) };
  // Start the fan pointing north-west and walk clockwise so the order reads naturally.
  const angle = (135 - (360 / cityCount) * cityIndex) * (Math.PI / 180);
  const pin = [
    lat + FAN_RADIUS_DEG * Math.sin(angle),
    lon + (FAN_RADIUS_DEG * Math.cos(angle)) / Math.cos((lat * Math.PI) / 180),
  ];
  return { city: item.coordinates, pin, cityIndex, cityCount, startYear: startYear(item.year) };
});

// Unique cities with more than one chapter, for the hairlines joining a city to its pins.
export const SHARED_CITIES = [...groups.entries()]
  .filter(([, ids]) => ids.length > 1)
  .map(([key, ids]) => ({
    city: key.split(',').map(Number),
    pins: ids.map(id => CHAPTER_META[JOURNEY_DATA.findIndex(item => item.id === id)].pin),
  }));

// The second part of each chapter's scroll draws the route onward and carries the camera.
export const TRAVEL_START = 0.45;

export const segmentProgress = (progress, index) => {
  if (index >= JOURNEY_DATA.length - 1) return 0;
  return Math.min(Math.max((progress - index - TRAVEL_START) / (1 - TRAVEL_START), 0), 1);
};

const FIRST_YEAR = CHAPTER_META[1].startYear;

// Year shown in the map caption while scrolling, interpolated between chapter start years.
export const yearAt = progress => {
  const index = Math.min(Math.floor(progress), JOURNEY_DATA.length - 1);
  const from = CHAPTER_META[index].startYear ?? FIRST_YEAR;
  const to = CHAPTER_META[index + 1]?.startYear ?? from;
  return Math.round(from + (to - from) * segmentProgress(progress, index));
};
