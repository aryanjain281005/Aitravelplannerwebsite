/**
 * Mock Data for Development
 * 
 * This file contains sample data that can be used for development
 * when the backend is not available. Remove or disable this in production.
 */

import type { Itinerary } from '../types/api';

export const sampleItinerary: Itinerary = {
  city: "Paris",
  date: "2025-03-15",
  minRating: 4.0,
  slots: [
    {
      period: "Morning",
      time: "9:00 AM - 12:00 PM",
      activities: [
        {
          name: "Café de Flore",
          type: "Breakfast Spot",
          rating: 4.3,
          price: "€€€",
          time: "9:00 - 10:00 AM",
          description: "Historic café in Saint-Germain-des-Prés. Famous for croissants and café au lait.",
          redditInsight: "Locals say: Come early to avoid tourist crowds, sit outside if weather permits.",
          image: "https://images.unsplash.com/photo-1667388968964-4aa652df0a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGRpbmluZ3xlbnwxfHx8fDE3NTk4MTEyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
          name: "Musée d'Orsay",
          type: "Attraction",
          rating: 4.7,
          price: "€€",
          time: "10:30 AM - 12:30 PM",
          description: "World-renowned museum featuring Impressionist masterpieces in a stunning Beaux-Arts railway station.",
          redditInsight: "Pro tip: Book tickets online to skip the 1-hour queue. Wednesday evenings are less crowded.",
          image: "https://images.unsplash.com/photo-1725291975516-a67056a8b519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwYXR0cmFjdGlvbnMlMjBsYW5kbWFya3xlbnwxfHx8fDE3NTk5MTI3MDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
        }
      ]
    },
    {
      period: "Afternoon",
      time: "12:30 PM - 6:00 PM",
      activities: [
        {
          name: "L'As du Fallafel",
          type: "Lunch",
          rating: 4.5,
          price: "€",
          time: "12:45 - 1:45 PM",
          description: "Best falafel in the Marais district. Always packed with locals.",
          redditInsight: "Reddit users rave: Take away and eat in Place des Vosges nearby. Cash only!",
          image: "https://images.unsplash.com/photo-1667388968964-4aa652df0a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGRpbmluZ3xlbnwxfHx8fDE3NTk4MTEyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
          name: "Montmartre & Sacré-Cœur",
          type: "Attraction",
          rating: 4.6,
          price: "Free",
          time: "2:30 - 5:30 PM",
          description: "Charming hilltop neighborhood with stunning basilica and panoramic city views.",
          redditInsight: "Local secret: Skip the funicular, walk up Rue Foyatier for the authentic experience.",
          image: "https://images.unsplash.com/photo-1532188142562-df556b861e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBleHBsb3JpbmclMjB3b3JsZHxlbnwxfHx8fDE3NTk5MTI3MDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
        }
      ]
    },
    {
      period: "Evening",
      time: "6:00 PM - 10:00 PM",
      activities: [
        {
          name: "Seine River Cruise",
          type: "Experience",
          rating: 4.4,
          price: "€€",
          time: "6:30 - 8:00 PM",
          description: "Sunset cruise past Notre-Dame, Eiffel Tower, and other iconic landmarks.",
          redditInsight: "Travelers recommend: Bateaux Parisiens has the best value. Bring a light jacket!",
          image: "https://images.unsplash.com/photo-1645109252640-400da62771ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMGNpdHl8ZW58MXx8fHwxNzU5ODI1ODExfDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
          name: "Le Comptoir du Relais",
          type: "Dinner",
          rating: 4.5,
          price: "€€€",
          time: "8:30 - 10:00 PM",
          description: "Authentic French bistro with seasonal menu. Reservations essential.",
          redditInsight: "Foodies say: Try the duck confit. Dinner service is prix-fixe only but worth it!",
          image: "https://images.unsplash.com/photo-1667388968964-4aa652df0a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGRpbmluZ3xlbnwxfHx8fDE3NTk4MTEyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080"
        }
      ]
    }
  ],
  metadata: {
    totalEstimatedCost: "€80-120 per person",
    totalDuration: "13 hours",
    generatedAt: new Date().toISOString()
  }
};

/**
 * Simulate API delay for more realistic development experience
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
