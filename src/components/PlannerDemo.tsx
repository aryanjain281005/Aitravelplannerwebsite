import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Slider } from "./ui/slider";
import { 
  CalendarIcon, 
  Sparkles, 
  MapPin, 
  Brain, 
  Database,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Globe2,
  Star
} from "lucide-react";
import { format } from "date-fns";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { apiService } from "../services/api";
import type { GenerateItineraryRequest, Itinerary } from "../types/api";
import { sampleItinerary, delay } from "../utils/mockData";
import { generateIntelligentItinerary, isCitySupported, getCitiesInDatabase } from "../utils/intelligentGenerator";
import { toast } from "sonner@2.0.3";

const popularCities = [
  {
    name: "Paris",
    emoji: "🗼",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format"
  },
  {
    name: "Tokyo",
    emoji: "🗾",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format"
  },
  {
    name: "New York",
    emoji: "🗽",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format"
  },
  {
    name: "Barcelona",
    emoji: "🏖️",
    image: "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=800&auto=format"
  },
  {
    name: "London",
    emoji: "🎡",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format"
  },
  {
    name: "Rome",
    emoji: "🏛️",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format"
  },
];

const aiSteps = [
  {
    icon: Brain,
    label: "AI Agent Decides",
    color: "from-purple-500 to-pink-500",
    description: "Analyzing your request"
  },
  {
    icon: MapPin,
    label: "Google Places API",
    color: "from-blue-500 to-cyan-500",
    description: "Finding top attractions"
  },
  {
    icon: MessageCircle,
    label: "Reddit Insights",
    color: "from-orange-500 to-red-500",
    description: "Reading real reviews"
  },
  {
    icon: Database,
    label: "Web Scraping",
    color: "from-green-500 to-emerald-500",
    description: "Gathering details"
  },
  {
    icon: Sparkles,
    label: "Optimizing Plan",
    color: "from-yellow-500 to-amber-500",
    description: "Creating your itinerary"
  }
];

// Set to true to use intelligent mock data, false to use real API
// Intelligent mode uses AI-like algorithms to generate varied itineraries
const USE_MOCK_DATA = true;

interface PlannerDemoProps {
  onItineraryGenerated?: (itinerary: Itinerary) => void;
}

export function PlannerDemo({ onItineraryGenerated }: PlannerDemoProps) {
  const [city, setCity] = useState("");
  const [date, setDate] = useState<Date>();
  const [minRating, setMinRating] = useState([4.0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [generatedItinerary, setGeneratedItinerary] = useState<Itinerary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isGenerating && currentStep < aiSteps.length) {
      const timer = setTimeout(() => {
        setCompletedSteps([...completedSteps, currentStep]);
        setCurrentStep(currentStep + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else if (isGenerating && currentStep === aiSteps.length) {
      setTimeout(() => {
        setIsGenerating(false);
        setShowItinerary(true);
        
        // Scroll to itinerary section after a brief delay
        setTimeout(() => {
          const itinerarySection = document.getElementById('sample-itinerary');
          if (itinerarySection) {
            const elementPosition = itinerarySection.offsetTop;
            
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
          }
        }, 800);
      }, 500);
    }
  }, [isGenerating, currentStep, completedSteps]);

  const handleGenerate = async () => {
    if (!city) {
      toast.error("Please enter a city name");
      return;
    }
    
    setIsGenerating(true);
    setShowItinerary(false);
    setCurrentStep(0);
    setCompletedSteps([]);
    setError(null);

    try {
      if (USE_MOCK_DATA) {
        // Use intelligent generator for development
        // This creates varied itineraries based on your inputs
        await delay(300);
        
        // Show city support message
        if (isCitySupported(city)) {
          toast.success(`Great choice! ${city} has detailed recommendations.`);
        } else {
          toast.info(`Generating itinerary for ${city} with general recommendations.`);
        }
        
        // The useEffect will handle the steps animation
        // After all steps complete, generate and set the itinerary
        setTimeout(async () => {
          try {
            const newItinerary = await generateIntelligentItinerary(
              city,
              date ? format(date, "yyyy-MM-dd") : new Date().toISOString().split('T')[0],
              minRating[0]
            );
            setGeneratedItinerary(newItinerary);
            onItineraryGenerated?.(newItinerary);
          } catch (err) {
            console.error("Error generating itinerary:", err);
            toast.error("Failed to generate itinerary. Please try again.");
            setIsGenerating(false);
          }
        }, aiSteps.length * 600 + 500);
      } else {
        // Use real API
        const request: GenerateItineraryRequest = {
          city: city,
          date: date ? format(date, "yyyy-MM-dd") : new Date().toISOString().split('T')[0],
          minRating: minRating[0],
          preferences: {
            // You can extend this based on additional user inputs
          }
        };

        const response = await apiService.generateItinerary(request);
        
        if (response.success) {
          // Wait for animation to complete
          setTimeout(() => {
            setGeneratedItinerary(response.itinerary);
            onItineraryGenerated?.(response.itinerary);
          }, aiSteps.length * 600 + 500);
        } else {
          throw new Error(response.message || "Failed to generate itinerary");
        }
      }
    } catch (err) {
      console.error("Error generating itinerary:", err);
      const errorMessage = err instanceof Error ? err.message : "An error occurred while generating your itinerary";
      setError(errorMessage);
      toast.error(errorMessage);
      setIsGenerating(false);
      setCurrentStep(0);
      setCompletedSteps([]);
    }
  };

  return (
    <div id="planner-demo" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm"
          >
            <Globe2 className="w-4 h-4 text-purple-300" />
            <span className="text-sm text-purple-200">AI-Powered Travel Intelligence</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-6xl text-white">
            Try It Out ✨
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Watch AI build your perfect day in real-time
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left side - Input form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <div className="p-8 space-y-8">
                <div>
                  <h3 className="text-2xl text-white mb-2">Plan Your Adventure</h3>
                  <p className="text-slate-300">
                    Get AI-powered recommendations with timings, prices, and real insights
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-white">Which city are you visiting?</Label>
                    <Input
                      id="city"
                      placeholder="e.g., Paris, Tokyo, New York..."
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-white/90 border-white/30 text-slate-900 placeholder:text-slate-500 h-12 text-base"
                    />
                  </div>

                  {/* Popular cities quick select */}
                  <div className="space-y-3">
                    <p className="text-sm text-slate-300">Popular destinations with detailed recommendations:</p>
                    <div className="grid grid-cols-3 gap-3">
                      {popularCities.map((cityItem, idx) => {
                        const hasDetailedData = isCitySupported(cityItem.name);
                        return (
                          <motion.button
                            key={cityItem.name}
                            onClick={() => setCity(cityItem.name)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="relative h-24 rounded-xl overflow-hidden group cursor-pointer"
                          >
                            <ImageWithFallback
                              src={cityItem.image}
                              alt={cityItem.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            {hasDetailedData && (
                              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                ✨ AI
                              </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-2xl mb-1">{cityItem.emoji}</div>
                                <div className="text-white text-sm">{cityItem.name}</div>
                              </div>
                            </div>
                            <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/50 rounded-xl transition-all" />
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-purple-300" />
                      When are you visiting?
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left bg-white/90 border-white/30 hover:bg-white h-12 transition-all ${
                              date ? 'border-purple-400 ring-2 ring-purple-400/20' : ''
                            }`}
                          >
                            <CalendarIcon className={`mr-2 h-5 w-5 ${date ? 'text-purple-600' : 'text-slate-500'}`} />
                            {date ? (
                              <span className="text-slate-900">{format(date, "PPPP")}</span>
                            ) : (
                              <span className="text-slate-500">Select your travel date</span>
                            )}
                          </Button>
                        </motion.div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          className="rounded-lg border-0"
                        />
                      </PopoverContent>
                    </Popover>
                    {date && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-purple-300 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Perfect! Planning for {format(date, "MMMM d, yyyy")}
                      </motion.p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label className="text-white flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                      Minimum Rating Filter
                    </Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">Only show places rated:</span>
                        <motion.div
                          key={minRating[0]}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500"
                        >
                          <Star className="w-4 h-4 text-white fill-white" />
                          <span className="text-white">{minRating[0].toFixed(1)}+</span>
                        </motion.div>
                      </div>
                      <Slider
                        value={minRating}
                        onValueChange={setMinRating}
                        min={3.0}
                        max={5.0}
                        step={0.5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>3.0 (Good)</span>
                        <span>4.0 (Great)</span>
                        <span>5.0 (Perfect)</span>
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg"
                    >
                      <p className="text-xs text-blue-200">
                        {minRating[0] >= 4.5 ? (
                          <>💎 Only the best! You'll get premium, highly-rated spots.</>
                        ) : minRating[0] >= 4.0 ? (
                          <>✨ Recommended! Great quality places with excellent reviews.</>
                        ) : minRating[0] >= 3.5 ? (
                          <>👍 Solid choices! Good places with decent reviews.</>
                        ) : (
                          <>🌟 More options! Includes places with mixed reviews.</>
                        )}
                      </p>
                    </motion.div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl shadow-purple-500/50"
                      onClick={handleGenerate}
                      disabled={!city || isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles className="mr-2 h-5 w-5" />
                          </motion.div>
                          Generating Your Perfect Day...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Generate AI Itinerary
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right side - AI Process visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <div className="p-8">
                <h3 className="text-2xl text-white mb-6">How AI Creates Your Plan</h3>
                
                <div className="space-y-4">
                  {aiSteps.map((step, idx) => {
                    const Icon = step.icon;
                    const isActive = isGenerating && currentStep === idx;
                    const isCompleted = completedSteps.includes(idx);
                    
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        className="relative"
                      >
                        <div className={`
                          flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                          ${isActive ? 'bg-white/20 border-2 border-white/40' : 'bg-white/5 border-2 border-white/10'}
                          ${isCompleted ? 'bg-green-500/20 border-green-500/50' : ''}
                        `}>
                          <div className={`
                            relative flex items-center justify-center w-12 h-12 rounded-xl
                            bg-gradient-to-br ${step.color}
                            ${isActive ? 'shadow-lg' : ''}
                          `}>
                            <AnimatePresence mode="wait">
                              {isCompleted ? (
                                <motion.div
                                  key="check"
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  exit={{ scale: 0 }}
                                  transition={{ type: "spring", stiffness: 200 }}
                                >
                                  <CheckCircle2 className="w-6 h-6 text-white" />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="icon"
                                  initial={{ scale: 1 }}
                                  animate={isActive ? { 
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 10, -10, 0]
                                  } : {}}
                                  transition={isActive ? { 
                                    duration: 0.6,
                                    repeat: Infinity
                                  } : {}}
                                >
                                  <Icon className="w-6 h-6 text-white" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                            
                            {isActive && (
                              <motion.div
                                className="absolute inset-0 rounded-xl bg-white/30"
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [0.5, 0, 0.5]
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity
                                }}
                              />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="text-white">{step.label}</div>
                            <div className="text-sm text-slate-300">{step.description}</div>
                          </div>

                          {isActive && (
                            <motion.div
                              className="flex gap-1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              {[0, 1, 2].map((i) => (
                                <motion.div
                                  key={i}
                                  className="w-1.5 h-1.5 bg-white rounded-full"
                                  animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.3, 1, 0.3]
                                  }}
                                  transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                  }}
                                />
                              ))}
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {!isGenerating && completedSteps.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl"
                  >
                    <p className="text-sm text-purple-200 text-center">
                      👆 Enter a city above to see the AI in action
                    </p>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Success message */}
        <AnimatePresence>
          {showItinerary && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="mt-12 max-w-4xl mx-auto"
            >
              <Card className="bg-gradient-to-r from-green-500 to-emerald-500 border-0 shadow-2xl shadow-green-500/50">
                <div className="p-6 flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="text-xl text-white">Your Itinerary is Ready! 🎉</h4>
                    <p className="text-white/90">
                      Scroll down to see your personalized day plan for {city} with {minRating[0].toFixed(1)}+ rated places
                    </p>
                  </div>
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6 text-white rotate-90" />
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
