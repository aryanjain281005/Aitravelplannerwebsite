import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

export function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stack = [
    {
      category: "AI & Intelligence",
      items: [
        { name: "LangChain", description: "Orchestrates AI agent decisions" },
        { name: "Gemini AI", description: "Powers natural language understanding" }
      ]
    },
    {
      category: "Data Sources",
      items: [
        { name: "Google Places API", description: "Real-time location data" },
        { name: "Reddit API", description: "Authentic user reviews" },
        { name: "Web Scraping", description: "Additional insights" }
      ]
    },
    {
      category: "Backend",
      items: [
        { name: "FastAPI", description: "High-performance Python backend" },
        { name: "Modular Design", description: "Easy to extend and maintain" }
      ]
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 relative overflow-hidden" ref={ref}>
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px']
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <Badge className="bg-indigo-500 text-white hover:bg-indigo-500">
            Technology
          </Badge>
          <h2 className="text-4xl sm:text-5xl text-white">
            Built with Modern Tech
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Combining the best AI models, APIs, and frameworks for reliable, intelligent travel planning
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stack.map((section, index) => {
            const [isHovered, setIsHovered] = useState(false);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2,
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
                <Card className="bg-slate-800 border-slate-700 hover:border-indigo-500 transition-all h-full relative overflow-hidden group">
                  {/* Animated glow effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1), transparent 70%)'
                    }}
                  />
                  
                  {/* Top border glow */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    initial={{ scaleX: 0 }}
                    animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <CardContent className="p-6 space-y-4 relative z-10">
                    <motion.h3 
                      className="text-xl text-white"
                      animate={isHovered ? { x: 5 } : { x: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {section.category}
                    </motion.h3>
                    <div className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <motion.div 
                          key={itemIndex} 
                          className="space-y-1 cursor-pointer"
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ delay: index * 0.2 + itemIndex * 0.1 }}
                          whileHover={{ x: 10, scale: 1.05 }}
                        >
                          <motion.div 
                            className="text-indigo-400"
                            whileHover={{ color: "#a78bfa" }}
                          >
                            {item.name}
                          </motion.div>
                          <div className="text-sm text-slate-400">{item.description}</div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-slate-400 max-w-3xl mx-auto">
            Every component is designed to be modular and extensible. The AI agent intelligently 
            decides which data sources to query and how to optimize results for the best user experience.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
