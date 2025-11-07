/**
 * Intelligent Itinerary Generator
 * 
 * This simulates AI behavior by using algorithms and a knowledge base
 * to generate realistic, varied itineraries based on user preferences.
 */

import type { Itinerary, TimeSlot, Activity } from '../types/api';

// ============================================================================
// Knowledge Base - Real data about cities and attractions
// ============================================================================

interface CityData {
  name: string;
  country: string;
  timezone: string;
  currency: string;
  activities: ActivityTemplate[];
}

interface ActivityTemplate {
  name: string;
  type: 'Breakfast Spot' | 'Lunch' | 'Dinner' | 'Attraction' | 'Experience' | 'Cafe' | 'Shopping';
  rating: number;
  priceLevel: 1 | 2 | 3 | 4; // 1 = €, 2 = €€, 3 = €€€, 4 = €€€€
  period: 'Morning' | 'Afternoon' | 'Evening' | 'Any';
  duration: number; // in minutes
  description: string;
  tips: string[];
  tags: string[]; // cuisine, museums, outdoor, etc.
}

const CITY_DATABASE: Record<string, CityData> = {
  Paris: {
    name: 'Paris',
    country: 'France',
    timezone: 'Europe/Paris',
    currency: '€',
    activities: [
      {
        name: 'Café de Flore',
        type: 'Breakfast Spot',
        rating: 4.3,
        priceLevel: 3,
        period: 'Morning',
        duration: 60,
        description: 'Historic café in Saint-Germain-des-Prés, famous for its literary history and excellent croissants.',
        tips: ['Come early to avoid crowds', 'Sit outside for people watching', 'Try the café au lait'],
        tags: ['french cuisine', 'historic', 'iconic']
      },
      {
        name: 'Musée d\'Orsay',
        type: 'Attraction',
        rating: 4.7,
        priceLevel: 2,
        period: 'Any',
        duration: 120,
        description: 'World-renowned museum featuring Impressionist masterpieces in a stunning Beaux-Arts railway station.',
        tips: ['Book tickets online to skip lines', 'Visit on Wednesday evenings for fewer crowds', 'Don\'t miss the top floor views'],
        tags: ['museums', 'art', 'culture']
      },
      {
        name: 'L\'As du Fallafel',
        type: 'Lunch',
        rating: 4.5,
        priceLevel: 1,
        period: 'Afternoon',
        duration: 45,
        description: 'Best falafel in the Marais district, always packed with locals and tourists alike.',
        tips: ['Take away and eat in Place des Vosges', 'Cash only!', 'Expect a line but it moves fast'],
        tags: ['middle eastern', 'street food', 'budget-friendly']
      },
      {
        name: 'Sacré-Cœur',
        type: 'Attraction',
        rating: 4.6,
        priceLevel: 1,
        period: 'Afternoon',
        duration: 90,
        description: 'Stunning basilica atop Montmartre hill with panoramic views of Paris.',
        tips: ['Walk up the steps instead of taking funicular', 'Visit at sunset', 'Explore Montmartre streets after'],
        tags: ['religious', 'architecture', 'views', 'free']
      },
      {
        name: 'Seine River Cruise',
        type: 'Experience',
        rating: 4.4,
        priceLevel: 2,
        period: 'Evening',
        duration: 90,
        description: 'Romantic cruise past iconic landmarks including Notre-Dame and the Eiffel Tower.',
        tips: ['Bateaux Parisiens offers best value', 'Bring a light jacket', 'Book sunset time slot'],
        tags: ['romantic', 'sightseeing', 'relaxing']
      },
      {
        name: 'Le Comptoir du Relais',
        type: 'Dinner',
        rating: 4.5,
        priceLevel: 3,
        period: 'Evening',
        duration: 120,
        description: 'Authentic French bistro with seasonal menu and cozy atmosphere.',
        tips: ['Reservations essential', 'Try the duck confit', 'Dinner is prix-fixe only'],
        tags: ['french cuisine', 'fine dining', 'romantic']
      },
      {
        name: 'Louvre Museum',
        type: 'Attraction',
        rating: 4.8,
        priceLevel: 2,
        period: 'Any',
        duration: 180,
        description: 'World\'s largest art museum, home to the Mona Lisa and thousands of masterpieces.',
        tips: ['Book timed entry online', 'Enter through Carrousel entrance to avoid crowds', 'Plan your route in advance'],
        tags: ['museums', 'art', 'culture', 'iconic']
      },
      {
        name: 'Angelina Paris',
        type: 'Cafe',
        rating: 4.4,
        priceLevel: 3,
        period: 'Afternoon',
        duration: 60,
        description: 'Famous tearoom known for its decadent hot chocolate and Mont-Blanc dessert.',
        tips: ['Try the hot chocolate - it\'s legendary', 'Expect a wait during peak hours', 'Great for afternoon tea'],
        tags: ['desserts', 'tea', 'luxury']
      }
    ]
  },
  Tokyo: {
    name: 'Tokyo',
    country: 'Japan',
    timezone: 'Asia/Tokyo',
    currency: '¥',
    activities: [
      {
        name: 'Tsukiji Outer Market',
        type: 'Breakfast Spot',
        rating: 4.6,
        priceLevel: 2,
        period: 'Morning',
        duration: 90,
        description: 'Famous seafood market with fresh sushi breakfast and street food stalls.',
        tips: ['Arrive early (6-7am) for best selection', 'Try the fresh sushi', 'Bring cash'],
        tags: ['seafood', 'japanese cuisine', 'market']
      },
      {
        name: 'Senso-ji Temple',
        type: 'Attraction',
        rating: 4.7,
        priceLevel: 1,
        period: 'Morning',
        duration: 120,
        description: 'Tokyo\'s oldest Buddhist temple with impressive architecture and bustling market street.',
        tips: ['Visit early to avoid crowds', 'Walk through Nakamise shopping street', 'Free entry'],
        tags: ['religious', 'culture', 'historic', 'free']
      },
      {
        name: 'Ichiran Ramen',
        type: 'Lunch',
        rating: 4.5,
        priceLevel: 1,
        period: 'Afternoon',
        duration: 45,
        description: 'Famous ramen chain with individual booths for focused eating experience.',
        tips: ['Order at vending machine', 'Customize your ramen preferences', 'Solo dining friendly'],
        tags: ['ramen', 'japanese cuisine', 'casual']
      },
      {
        name: 'teamLab Borderless',
        type: 'Attraction',
        rating: 4.8,
        priceLevel: 3,
        period: 'Afternoon',
        duration: 150,
        description: 'Immersive digital art museum with stunning interactive installations.',
        tips: ['Book tickets weeks in advance', 'Wear comfortable shoes', 'Allow 2-3 hours'],
        tags: ['art', 'technology', 'interactive', 'instagram-worthy']
      },
      {
        name: 'Shibuya Crossing Experience',
        type: 'Experience',
        rating: 4.5,
        priceLevel: 1,
        period: 'Evening',
        duration: 60,
        description: 'World\'s busiest pedestrian crossing, best viewed from Starbucks above.',
        tips: ['Go to Starbucks 2nd floor for best view', 'Visit at night for neon lights', 'Free to experience'],
        tags: ['iconic', 'urban', 'free', 'photography']
      },
      {
        name: 'Sukiyabashi Jiro',
        type: 'Dinner',
        rating: 4.9,
        priceLevel: 4,
        period: 'Evening',
        duration: 90,
        description: 'Three Michelin-starred sushi restaurant, considered one of the best in the world.',
        tips: ['Reserve months in advance', 'Cash only', 'Trust the chef - omakase style'],
        tags: ['sushi', 'fine dining', 'michelin star']
      },
      {
        name: 'Harajuku Takeshita Street',
        type: 'Shopping',
        rating: 4.3,
        priceLevel: 2,
        period: 'Afternoon',
        duration: 90,
        description: 'Vibrant pedestrian street known for quirky fashion, crepes, and youth culture.',
        tips: ['Try a rainbow crepe', 'Visit on weekdays to avoid crowds', 'Explore side streets'],
        tags: ['shopping', 'fashion', 'youth culture', 'food']
      }
    ]
  },
  'New York': {
    name: 'New York',
    country: 'USA',
    timezone: 'America/New_York',
    currency: '$',
    activities: [
      {
        name: 'Russ & Daughters',
        type: 'Breakfast Spot',
        rating: 4.7,
        priceLevel: 2,
        period: 'Morning',
        duration: 60,
        description: 'Iconic Jewish appetizing shop serving bagels, lox, and schmear since 1914.',
        tips: ['Order the Classic bagel with lox', 'Expect a wait on weekends', 'Cash and card accepted'],
        tags: ['bagels', 'jewish cuisine', 'historic']
      },
      {
        name: 'Central Park',
        type: 'Attraction',
        rating: 4.8,
        priceLevel: 1,
        period: 'Any',
        duration: 120,
        description: 'Iconic 843-acre urban park with lakes, gardens, and countless activities.',
        tips: ['Rent a bike to cover more ground', 'Visit Bethesda Fountain', 'Free entry'],
        tags: ['nature', 'outdoors', 'iconic', 'free']
      },
      {
        name: 'Joe\'s Pizza',
        type: 'Lunch',
        rating: 4.4,
        priceLevel: 1,
        period: 'Afternoon',
        duration: 30,
        description: 'Classic New York slice joint in Greenwich Village, famous since 1975.',
        tips: ['Order a plain cheese slice first', 'Eat it folded, NY style', 'Cash only at some locations'],
        tags: ['pizza', 'casual', 'iconic', 'budget-friendly']
      },
      {
        name: 'Metropolitan Museum of Art',
        type: 'Attraction',
        rating: 4.8,
        priceLevel: 2,
        period: 'Afternoon',
        duration: 180,
        description: 'One of world\'s largest art museums with over 2 million works spanning 5000 years.',
        tips: ['Suggested donation - pay what you wish', 'Download the app for tours', 'Plan at least 3 hours'],
        tags: ['museums', 'art', 'culture', 'world-class']
      },
      {
        name: 'Brooklyn Bridge Walk',
        type: 'Experience',
        rating: 4.7,
        priceLevel: 1,
        period: 'Evening',
        duration: 60,
        description: 'Iconic walk across historic suspension bridge with stunning city skyline views.',
        tips: ['Walk from Brooklyn to Manhattan for best views', 'Go at sunset', 'Free activity'],
        tags: ['iconic', 'views', 'photography', 'free']
      },
      {
        name: 'Peter Luger Steak House',
        type: 'Dinner',
        rating: 4.6,
        priceLevel: 4,
        period: 'Evening',
        duration: 120,
        description: 'Legendary steakhouse in Brooklyn, serving prime dry-aged beef since 1887.',
        tips: ['Reservations required weeks ahead', 'Cash or Peter Luger card only', 'Share the porterhouse for two'],
        tags: ['steakhouse', 'fine dining', 'historic']
      },
      {
        name: 'Times Square',
        type: 'Experience',
        rating: 4.2,
        priceLevel: 1,
        period: 'Evening',
        duration: 45,
        description: 'Bright lights and bustling energy of NYC\'s most famous intersection.',
        tips: ['Visit at night for full effect', 'Watch out for costumed characters', 'Free to experience'],
        tags: ['iconic', 'urban', 'photography', 'free']
      }
    ]
  },
  Barcelona: {
    name: 'Barcelona',
    country: 'Spain',
    timezone: 'Europe/Madrid',
    currency: '€',
    activities: [
      {
        name: 'Els Quatre Gats',
        type: 'Breakfast Spot',
        rating: 4.3,
        priceLevel: 2,
        period: 'Morning',
        duration: 60,
        description: 'Historic café where Picasso had his first exhibition, serving traditional Catalan breakfast.',
        tips: ['Order the pa amb tomàquet', 'Visit the Picasso sketches on the walls', 'Come for the history'],
        tags: ['catalan cuisine', 'historic', 'art']
      },
      {
        name: 'Sagrada Família',
        type: 'Attraction',
        rating: 4.9,
        priceLevel: 3,
        period: 'Morning',
        duration: 120,
        description: 'Gaudí\'s masterpiece basilica, still under construction after 140+ years.',
        tips: ['Book tickets months in advance', 'Take the tower tour', 'Morning light is best for photos'],
        tags: ['architecture', 'gaudi', 'iconic', 'religious']
      },
      {
        name: 'La Boqueria Market',
        type: 'Lunch',
        rating: 4.5,
        priceLevel: 2,
        period: 'Afternoon',
        duration: 90,
        description: 'Famous food market on Las Ramblas with fresh produce, tapas, and seafood.',
        tips: ['Avoid peak tourist hours', 'Try fresh fruit juice', 'Walk past the entrance stalls for better deals'],
        tags: ['market', 'tapas', 'seafood', 'local']
      },
      {
        name: 'Park Güell',
        type: 'Attraction',
        rating: 4.7,
        priceLevel: 2,
        period: 'Afternoon',
        duration: 120,
        description: 'Whimsical park designed by Gaudí with colorful mosaics and city views.',
        tips: ['Book timed entry ticket', 'Wear comfortable shoes', 'Free area is also worth exploring'],
        tags: ['gaudi', 'architecture', 'park', 'views']
      },
      {
        name: 'Magic Fountain Show',
        type: 'Experience',
        rating: 4.6,
        priceLevel: 1,
        period: 'Evening',
        duration: 45,
        description: 'Spectacular water and light show at Montjuïc fountain.',
        tips: ['Check schedule - not daily', 'Arrive early for good spot', 'Completely free'],
        tags: ['free', 'entertainment', 'romantic']
      },
      {
        name: 'Tickets Bar',
        type: 'Dinner',
        rating: 4.7,
        priceLevel: 4,
        period: 'Evening',
        duration: 120,
        description: 'Innovative tapas bar by Ferran Adrià, offering creative small plates.',
        tips: ['No reservations - arrive when they open', 'Try the air baguette', 'Be adventurous with orders'],
        tags: ['tapas', 'innovative', 'fine dining']
      },
      {
        name: 'Gothic Quarter Walk',
        type: 'Experience',
        rating: 4.8,
        priceLevel: 1,
        period: 'Any',
        duration: 90,
        description: 'Labyrinth of narrow medieval streets in the heart of old Barcelona.',
        tips: ['Easy to get lost - that\'s part of the fun', 'Visit Barcelona Cathedral', 'Free to explore'],
        tags: ['historic', 'architecture', 'walking', 'free']
      }
    ]
  },
  London: {
    name: 'London',
    country: 'United Kingdom',
    timezone: 'Europe/London',
    currency: '£',
    activities: [
      {
        name: 'The Wolseley',
        type: 'Breakfast Spot',
        rating: 4.5,
        priceLevel: 3,
        period: 'Morning',
        duration: 75,
        description: 'Grand European café serving full English breakfast in elegant surroundings.',
        tips: ['Book ahead for weekends', 'Try the eggs Benedict', 'Dress smart casual'],
        tags: ['british cuisine', 'elegant', 'breakfast']
      },
      {
        name: 'British Museum',
        type: 'Attraction',
        rating: 4.8,
        priceLevel: 1,
        period: 'Any',
        duration: 180,
        description: 'World-famous museum housing millions of works including the Rosetta Stone.',
        tips: ['Completely free entry', 'Download the app for tours', 'Visit Great Court for architecture'],
        tags: ['museums', 'history', 'culture', 'free']
      },
      {
        name: 'Borough Market',
        type: 'Lunch',
        rating: 4.6,
        priceLevel: 2,
        period: 'Afternoon',
        duration: 90,
        description: 'Historic food market with artisanal products and international street food.',
        tips: ['Go hungry - lots of free samples', 'Try the grilled cheese sandwich', 'Best on weekdays'],
        tags: ['market', 'street food', 'international']
      },
      {
        name: 'Tower of London',
        type: 'Attraction',
        rating: 4.7,
        priceLevel: 3,
        period: 'Afternoon',
        duration: 150,
        description: 'Historic castle housing the Crown Jewels and 1000 years of history.',
        tips: ['Book online for discount', 'Join a Yeoman Warder tour', 'Allow 2-3 hours'],
        tags: ['historic', 'royal', 'architecture']
      },
      {
        name: 'Thames River Cruise',
        type: 'Experience',
        rating: 4.5,
        priceLevel: 2,
        period: 'Evening',
        duration: 60,
        description: 'Scenic cruise past Parliament, London Eye, and Tower Bridge.',
        tips: ['Sunset cruises are magical', 'Sit on top deck', 'Can use Oyster card on some routes'],
        tags: ['sightseeing', 'romantic', 'relaxing']
      },
      {
        name: 'Dishoom',
        type: 'Dinner',
        rating: 4.6,
        priceLevel: 2,
        period: 'Evening',
        duration: 90,
        description: 'Bombay-style café serving incredible Indian cuisine in vintage setting.',
        tips: ['Expect queues but they move fast', 'Try the black daal', 'House chai is excellent'],
        tags: ['indian cuisine', 'popular', 'vibrant']
      },
      {
        name: 'West End Theatre',
        type: 'Experience',
        rating: 4.8,
        priceLevel: 3,
        period: 'Evening',
        duration: 150,
        description: 'World-class theatre district with musicals and plays.',
        tips: ['Book in advance for best seats', 'Day seats available at box office', 'Dress code varies'],
        tags: ['theatre', 'entertainment', 'culture']
      }
    ]
  },
  Rome: {
    name: 'Rome',
    country: 'Italy',
    timezone: 'Europe/Rome',
    currency: '€',
    activities: [
      {
        name: 'Roscioli Caffè',
        type: 'Breakfast Spot',
        rating: 4.6,
        priceLevel: 2,
        period: 'Morning',
        duration: 45,
        description: 'Artisanal bakery serving fresh cornetti and excellent espresso.',
        tips: ['Try the maritozzo with cream', 'Stand at the bar for cheaper prices', 'Come early'],
        tags: ['italian', 'bakery', 'coffee']
      },
      {
        name: 'Colosseum',
        type: 'Attraction',
        rating: 4.9,
        priceLevel: 3,
        period: 'Morning',
        duration: 150,
        description: 'Iconic ancient amphitheater and symbol of Imperial Rome.',
        tips: ['Book skip-the-line tickets', 'Include Roman Forum in combo ticket', 'Early morning is best'],
        tags: ['ancient', 'historic', 'iconic', 'architecture']
      },
      {
        name: 'Trattoria da Enzo',
        type: 'Lunch',
        rating: 4.7,
        priceLevel: 2,
        period: 'Afternoon',
        duration: 90,
        description: 'Authentic Roman trattoria in Trastevere serving traditional carbonara and cacio e pepe.',
        tips: ['No reservations - arrive at opening', 'Cash only', 'Try the supplì as starter'],
        tags: ['italian cuisine', 'traditional', 'pasta']
      },
      {
        name: 'Vatican Museums & Sistine Chapel',
        type: 'Attraction',
        rating: 4.8,
        priceLevel: 3,
        period: 'Afternoon',
        duration: 180,
        description: 'Vast collection of art and history culminating in Michelangelo\'s Sistine Chapel ceiling.',
        tips: ['Book early morning slot', 'Dress modestly', 'Allow 3+ hours'],
        tags: ['art', 'museums', 'religious', 'world-class']
      },
      {
        name: 'Trevi Fountain Evening',
        type: 'Experience',
        rating: 4.7,
        priceLevel: 1,
        period: 'Evening',
        duration: 30,
        description: 'Baroque fountain beautifully illuminated at night, less crowded than daytime.',
        tips: ['Throw coin over left shoulder', 'Visit after 10pm for fewer crowds', 'Free to visit'],
        tags: ['iconic', 'romantic', 'photography', 'free']
      },
      {
        name: 'La Pergola',
        type: 'Dinner',
        rating: 4.8,
        priceLevel: 4,
        period: 'Evening',
        duration: 180,
        description: 'Rome\'s only three Michelin-starred restaurant with panoramic city views.',
        tips: ['Book months ahead', 'Dress code enforced', 'Jacket required for men'],
        tags: ['fine dining', 'michelin star', 'views']
      }
    ]
  },
  Amsterdam: {
    name: 'Amsterdam',
    country: 'Netherlands',
    timezone: 'Europe/Amsterdam',
    currency: '€',
    activities: [
      {
        name: 'Pancakes Amsterdam',
        type: 'Breakfast Spot',
        rating: 4.5,
        priceLevel: 2,
        period: 'Morning',
        duration: 60,
        description: 'Traditional Dutch pancake house serving sweet and savory varieties.',
        tips: ['Try the bacon and cheese', 'Expect a wait on weekends', 'Cash preferred'],
        tags: ['dutch cuisine', 'pancakes', 'traditional']
      },
      {
        name: 'Anne Frank House',
        type: 'Attraction',
        rating: 4.7,
        priceLevel: 2,
        period: 'Morning',
        duration: 90,
        description: 'Historic house and museum dedicated to Jewish wartime diarist Anne Frank.',
        tips: ['Book online only - months in advance', 'Very moving experience', 'Allow 90 minutes'],
        tags: ['museums', 'history', 'memorial']
      },
      {
        name: 'Foodhallen',
        type: 'Lunch',
        rating: 4.4,
        priceLevel: 2,
        period: 'Afternoon',
        duration: 75,
        description: 'Indoor food market with diverse international cuisines and local Dutch treats.',
        tips: ['Try the stroopwafel stand', 'Less crowded on weekdays', 'Good for groups'],
        tags: ['food hall', 'international', 'variety']
      },
      {
        name: 'Canal Cruise',
        type: 'Experience',
        rating: 4.6,
        priceLevel: 2,
        period: 'Afternoon',
        duration: 75,
        description: 'Scenic boat tour through Amsterdam\'s UNESCO-listed canal system.',
        tips: ['Sunset cruises are beautiful', 'Bring a light jacket', 'Skip the dinner cruises'],
        tags: ['canals', 'sightseeing', 'relaxing']
      },
      {
        name: 'Rijksmuseum',
        type: 'Attraction',
        rating: 4.8,
        priceLevel: 3,
        period: 'Afternoon',
        duration: 150,
        description: 'National museum showcasing Dutch Golden Age masterpieces including Rembrandt\'s Night Watch.',
        tips: ['Book online to skip queues', 'Download the app for tours', 'Gardens are free'],
        tags: ['museums', 'art', 'dutch masters']
      },
      {
        name: 'Restaurant Greetje',
        type: 'Dinner',
        rating: 4.6,
        priceLevel: 3,
        period: 'Evening',
        duration: 120,
        description: 'Modern take on traditional Dutch cuisine in cozy canal-side setting.',
        tips: ['Try the stamppot', 'Reservations recommended', 'Ask about the Dutch spirit pairing'],
        tags: ['dutch cuisine', 'modern', 'local']
      }
    ]
  }
};

// Default activities for unknown cities
const DEFAULT_ACTIVITIES: ActivityTemplate[] = [
  {
    name: 'Local Café',
    type: 'Breakfast Spot',
    rating: 4.3,
    priceLevel: 2,
    period: 'Morning',
    duration: 60,
    description: 'Popular local breakfast spot known for fresh pastries and great coffee.',
    tips: ['Arrive early for best selection', 'Try the local specialty', 'Cash preferred'],
    tags: ['breakfast', 'cafe', 'local']
  },
  {
    name: 'City Museum',
    type: 'Attraction',
    rating: 4.5,
    priceLevel: 2,
    period: 'Any',
    duration: 120,
    description: 'Main city museum showcasing local history and culture.',
    tips: ['Check for free admission days', 'Audio guide recommended', 'Allow 2 hours'],
    tags: ['museums', 'culture', 'history']
  },
  {
    name: 'Downtown Restaurant',
    type: 'Lunch',
    rating: 4.4,
    priceLevel: 2,
    period: 'Afternoon',
    duration: 75,
    description: 'Highly-rated restaurant serving authentic local cuisine.',
    tips: ['Reservations recommended', 'Try the daily special', 'Lunch menu offers good value'],
    tags: ['local cuisine', 'popular']
  },
  {
    name: 'Historic District Walk',
    type: 'Experience',
    rating: 4.6,
    priceLevel: 1,
    period: 'Afternoon',
    duration: 90,
    description: 'Self-guided walk through the historic old town.',
    tips: ['Download walking tour app', 'Wear comfortable shoes', 'Free activity'],
    tags: ['walking', 'historic', 'free']
  },
  {
    name: 'Sunset Viewpoint',
    type: 'Experience',
    rating: 4.7,
    priceLevel: 1,
    period: 'Evening',
    duration: 60,
    description: 'Popular spot for panoramic city views, especially at sunset.',
    tips: ['Arrive 30 min before sunset', 'Bring a camera', 'Free access'],
    tags: ['views', 'photography', 'romantic', 'free']
  },
  {
    name: 'Fine Dining Restaurant',
    type: 'Dinner',
    rating: 4.5,
    priceLevel: 3,
    period: 'Evening',
    duration: 120,
    description: 'Upscale restaurant offering refined local and international cuisine.',
    tips: ['Reservations essential', 'Dress code applies', 'Try the tasting menu'],
    tags: ['fine dining', 'upscale']
  }
];

// ============================================================================
// Intelligent Selection Algorithm
// ============================================================================

function selectActivities(
  cityData: CityData,
  minRating: number,
  period: 'Morning' | 'Afternoon' | 'Evening',
  count: number = 2
): ActivityTemplate[] {
  // Filter activities by rating, period, and availability
  const suitable = cityData.activities.filter(activity => {
    const matchesPeriod = activity.period === period || activity.period === 'Any';
    const matchesRating = activity.rating >= minRating;
    return matchesPeriod && matchesRating;
  });

  // Sort by rating and randomize slightly for variety
  const sorted = suitable.sort((a, b) => {
    const ratingDiff = b.rating - a.rating;
    const randomFactor = (Math.random() - 0.5) * 0.3; // Add some randomness
    return ratingDiff + randomFactor;
  });

  // Return top activities
  return sorted.slice(0, count);
}

function getPriceString(level: number, currency: string): string {
  if (level === 1 && currency === '$') return '$';
  if (level === 1) return currency;
  return currency.repeat(level);
}

function getTimeForPeriod(period: string, activityIndex: number): string {
  const times = {
    Morning: ['9:00 - 10:00 AM', '10:30 AM - 12:00 PM'],
    Afternoon: ['12:30 - 2:00 PM', '2:30 - 5:00 PM'],
    Evening: ['6:00 - 7:30 PM', '8:00 - 10:00 PM']
  };
  return times[period as keyof typeof times]?.[activityIndex] || '9:00 AM - 12:00 PM';
}

function formatRedditInsight(tips: string[]): string {
  const starters = [
    'Travelers recommend:',
    'Locals say:',
    'Reddit users rave:',
    'Pro tip from Reddit:',
    'Insider advice:'
  ];
  const starter = starters[Math.floor(Math.random() * starters.length)];
  const tip = tips[Math.floor(Math.random() * tips.length)];
  return `${starter} ${tip}`;
}

// ============================================================================
// Main Generator Function
// ============================================================================

export async function generateIntelligentItinerary(
  city: string,
  date: string,
  minRating: number
): Promise<Itinerary> {
  // Get city data or use defaults
  const cityData = CITY_DATABASE[city] || {
    name: city,
    country: 'Unknown',
    timezone: 'UTC',
    currency: '$',
    activities: DEFAULT_ACTIVITIES
  };

  // Generate activities for each period
  const morningActivities = selectActivities(cityData, minRating, 'Morning', 2);
  const afternoonActivities = selectActivities(cityData, minRating, 'Afternoon', 2);
  const eveningActivities = selectActivities(cityData, minRating, 'Evening', 2);

  // Helper to get appropriate image based on activity
  const getActivityImage = (template: ActivityTemplate): string => {
    // Map activity types to relevant Unsplash images
    const imageMap: Record<string, string> = {
      'Breakfast Spot': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format',
      'Lunch': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format',
      'Dinner': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format',
      'Cafe': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format',
      'Attraction': 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&auto=format',
      'Experience': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format',
      'Shopping': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format'
    };
    
    return imageMap[template.type] || imageMap['Experience'];
  };

  // Convert to API format
  const convertToActivity = async (template: ActivityTemplate, index: number, period: string): Promise<Activity> => {
    return {
      name: template.name,
      type: template.type,
      rating: template.rating,
      price: getPriceString(template.priceLevel, cityData.currency),
      time: getTimeForPeriod(period, index),
      description: template.description,
      redditInsight: formatRedditInsight(template.tips),
      image: getActivityImage(template)
    };
  };

  const slots: TimeSlot[] = [
    {
      period: 'Morning',
      time: '9:00 AM - 12:00 PM',
      activities: await Promise.all(morningActivities.map((a, i) => convertToActivity(a, i, 'Morning')))
    },
    {
      period: 'Afternoon',
      time: '12:00 PM - 6:00 PM',
      activities: await Promise.all(afternoonActivities.map((a, i) => convertToActivity(a, i, 'Afternoon')))
    },
    {
      period: 'Evening',
      time: '6:00 PM - 10:00 PM',
      activities: await Promise.all(eveningActivities.map((a, i) => convertToActivity(a, i, 'Evening')))
    }
  ];

  // Calculate estimated cost
  const avgPriceLevel = [...morningActivities, ...afternoonActivities, ...eveningActivities]
    .reduce((sum, a) => sum + a.priceLevel, 0) / 6;
  
  const costEstimate = avgPriceLevel <= 2 
    ? `${cityData.currency}50-80 per person`
    : avgPriceLevel <= 3 
    ? `${cityData.currency}100-150 per person`
    : `${cityData.currency}200+ per person`;

  return {
    city: cityData.name,
    date,
    minRating,
    slots,
    metadata: {
      totalEstimatedCost: costEstimate,
      totalDuration: '13 hours',
      generatedAt: new Date().toISOString()
    }
  };
}

// ============================================================================
// Exported Helper Functions
// ============================================================================

export function getCitiesInDatabase(): string[] {
  return Object.keys(CITY_DATABASE);
}

export function isCitySupported(city: string): boolean {
  return city in CITY_DATABASE;
}
