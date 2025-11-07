import { Brain, MapPin, Star, Clock, DollarSign, MessageSquare } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Agent",
      description: "LangChain + Gemini AI smartly decides which tools to call and how to optimize your itinerary",
      color: "text-purple-600 bg-purple-100"
    },
    {
      icon: MapPin,
      title: "Google Places Integration",
      description: "Real-time data from Google Places API with accurate locations, photos, and opening hours",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: Star,
      title: "4.0+ Rating Filter",
      description: "Only recommends attractions and restaurants with ratings of 4.0 or higher for quality assurance",
      color: "text-yellow-600 bg-yellow-100"
    },
    {
      icon: MessageSquare,
      title: "Reddit Reviews",
      description: "Scrapes real Reddit reviews to get honest, local insights about each destination",
      color: "text-orange-600 bg-orange-100"
    },
    {
      icon: Clock,
      title: "Time-Optimized Slots",
      description: "Plans your day into morning, afternoon, and evening slots with realistic timings",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: DollarSign,
      title: "Pricing & Insights",
      description: "Get estimated costs, insider tips, and practical information for every recommendation",
      color: "text-emerald-600 bg-emerald-100"
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl sm:text-5xl text-slate-900">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            An intelligent agent that combines multiple data sources to create the perfect itinerary
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const [isHovered, setIsHovered] = useState(false);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <Card className="border-slate-200 hover:shadow-2xl hover:shadow-indigo-100 transition-all h-full relative overflow-hidden group">
                  {/* Animated gradient background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    style={{ width: '50%' }}
                  />
                  
                  <CardContent className="p-6 space-y-4 relative z-10">
                    <motion.div 
                      className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center relative`}
                      animate={isHovered ? { 
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1
                      } : { rotate: 0, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        animate={isHovered ? {
                          scale: [1, 1.5, 1.5, 1.5, 1],
                          opacity: [0.5, 0, 0, 0, 0]
                        } : {}}
                        className="absolute inset-0 rounded-lg bg-white"
                        transition={{ duration: 0.6 }}
                      />
                      <feature.icon className="w-6 h-6 relative z-10" />
                    </motion.div>
                    <div className="space-y-2">
                      <motion.h3 
                        className="text-slate-900"
                        animate={isHovered ? { x: 5 } : { x: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {feature.title}
                      </motion.h3>
                      <p className="text-sm text-slate-600">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
