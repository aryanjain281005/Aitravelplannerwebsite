import { Button } from "./ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { ScrollIndicator } from "./ScrollIndicator";

const scrollToPlanner = () => {
  const plannerSection = document.getElementById('planner-demo');
  if (plannerSection) {
    const elementPosition = plannerSection.offsetTop;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      {/* Animated floating orbs */}
      <motion.div 
        className="absolute top-20 right-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{ 
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{ 
          y: [0, -30, 0],
          x: [0, -20, 0],
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-200"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm text-indigo-700">Powered by AI & Real Data</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-tight text-slate-900">
                Plan Your Perfect
                <motion.span 
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  City Adventure
                </motion.span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl">
                No more "Wait… but I don't know the cool places here" moments. 
                Get AI-powered itineraries with only 4.0+ rated spots, complete with 
                timings, prices, and real insights from Google Places & Reddit.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="group bg-indigo-600 hover:bg-indigo-700" onClick={scrollToPlanner}>
                Start Planning
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" onClick={scrollToPlanner}>
                See How It Works
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-8 pt-4"
            >
              {[
                { value: "4.0+", label: "Rated Places Only" },
                { value: "100%", label: "AI-Optimized" },
                { value: "3", label: "Data Sources" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    delay: 0.4 + index * 0.1 
                  }}
                >
                  <div className="text-3xl text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                  {index < 2 && <div className="h-12 w-px bg-slate-300 absolute right-0 top-0" />}
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-2xl group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1645109252640-400da62771ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMGNpdHl8ZW58MXx8fHwxNzU5ODI1ODExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="City destination"
                className="w-full h-[500px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              {/* Shine effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
                transition={{ duration: 0.8 }}
              />
            </motion.div>
            
            {/* Floating card with animation */}
            <motion.div 
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ 
                opacity: 1, 
                y: [0, -10, 0],
                x: 0
              }}
              transition={{ 
                opacity: { delay: 0.5, duration: 0.5 },
                x: { delay: 0.5, duration: 0.5 },
                y: { 
                  delay: 1,
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 max-w-xs"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <div className="text-sm text-slate-900">Smart Planning</div>
                  <div className="text-xs text-slate-600">Morning, afternoon & evening slots with perfect timing</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <ScrollIndicator />
    </div>
  );
}
