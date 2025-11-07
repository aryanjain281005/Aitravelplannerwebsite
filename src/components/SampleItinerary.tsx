import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, DollarSign, Star, MapPin, Coffee, Utensils, Camera } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import type { Itinerary } from "../types/api";

interface SampleItineraryProps {
  itinerary?: Itinerary | null;
}

const defaultItinerary: Itinerary = {
  city: "Paris",
  date: "March 15, 2025",
  minRating: 4.0,
  slots: [
      {
        period: "Morning",
        time: "9:00 AM - 12:00 PM",
        icon: Coffee,
        color: "bg-amber-100 text-amber-700",
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
        icon: Utensils,
        color: "bg-blue-100 text-blue-700",
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
        icon: Camera,
        color: "bg-purple-100 text-purple-700",
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
    ]
  };

export function SampleItinerary({ itinerary: propItinerary }: SampleItineraryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Use provided itinerary or fall back to default
  const itinerary = propItinerary || defaultItinerary;

  // Helper function to get icon for time period
  const getPeriodIcon = (period: string) => {
    switch (period) {
      case 'Morning':
        return Coffee;
      case 'Afternoon':
        return Utensils;
      case 'Evening':
        return Camera;
      default:
        return Clock;
    }
  };

  // Helper function to get color for time period
  const getPeriodColor = (period: string) => {
    switch (period) {
      case 'Morning':
        return 'bg-amber-100 text-amber-700';
      case 'Afternoon':
        return 'bg-blue-100 text-blue-700';
      case 'Evening':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div id="sample-itinerary" className="py-20 px-4 sm:px-6 lg:px-8 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
            {propItinerary ? 'Your Itinerary' : 'Sample Itinerary'}
          </Badge>
          <h2 className="text-4xl sm:text-5xl text-slate-900">
            A Day in {itinerary.city}
          </h2>
          <p className="text-xl text-slate-600">
            {typeof itinerary.date === 'string' && itinerary.date.includes('-') 
              ? new Date(itinerary.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
              : itinerary.date} • Optimized by AI • All spots rated {itinerary.minRating?.toFixed(1)}+
          </p>
        </motion.div>

        <div className="space-y-8">
          {itinerary.slots.map((slot, slotIndex) => (
            <motion.div 
              key={slotIndex} 
              className="space-y-4"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: slotIndex * 0.2 }}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className={`p-3 rounded-lg ${getPeriodColor(slot.period)}`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {(() => {
                    const Icon = getPeriodIcon(slot.period);
                    return <Icon className="w-6 h-6" />;
                  })()}
                </motion.div>
                <div>
                  <h3 className="text-2xl text-slate-900">{slot.period}</h3>
                  <p className="text-sm text-slate-600">{slot.time}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {slot.activities.map((activity, actIndex) => (
                  <motion.div
                    key={actIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: slotIndex * 0.2 + actIndex * 0.1 
                    }}
                    whileHover={{ y: -8 }}
                  >
                    <Card className="overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300 border-slate-200 h-full group">
                      <div className="h-48 overflow-hidden relative">
                        <motion.img 
                          src={activity.image} 
                          alt={activity.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />
                        {/* Overlay gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <CardTitle className="text-xl">{activity.name}</CardTitle>
                            <p className="text-sm text-slate-600 mt-1">{activity.type}</p>
                          </div>
                          <Badge variant="outline" className="flex items-center gap-1 bg-yellow-50 text-yellow-700 border-yellow-200">
                            <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-600" />
                            {activity.rating}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {activity.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {activity.price}
                          </div>
                        </div>

                        <p className="text-sm text-slate-700">{activity.description}</p>

                        <motion.div 
                          className="bg-blue-50 border border-blue-100 rounded-lg p-3 space-y-1"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span className="text-xs text-blue-900">Reddit Insight</span>
                          </div>
                          <p className="text-sm text-blue-800">{activity.redditInsight}</p>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100"
        >
          <div className="flex items-start gap-4">
            <motion.div 
              className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Star className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex-1">
              <h4 className="text-lg text-slate-900 mb-2">
                {propItinerary ? 'Enjoy your trip!' : 'This is just a sample!'}
              </h4>
              <p className="text-slate-700">
                {propItinerary 
                  ? `This itinerary was generated using AI and real-time data from Google Places and Reddit. All recommendations are rated ${itinerary.minRating?.toFixed(1) || '4.0'}+ for the best experience. Have a great time in ${itinerary.city}!`
                  : 'Your actual itinerary will be customized based on your preferences, real-time data, and the latest reviews from Google Places and Reddit. Every recommendation is rated 4.0+ and optimized for the best experience.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
