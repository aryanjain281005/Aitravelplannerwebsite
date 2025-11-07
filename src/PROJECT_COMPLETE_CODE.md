# 🚀 AI Travel Planner - Complete Project Code

**Generated:** November 7, 2025  
**Total Files:** 70+  
**Lines of Code:** ~15,000+  
**Status:** Production Ready

---

## 📋 TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Core Application Files](#core-application-files)
4. [Component Files](#component-files)
5. [Utility Files](#utility-files)
6. [Service Files](#service-files)
7. [Type Definitions](#type-definitions)
8. [Styling](#styling)
9. [Configuration Files](#configuration-files)
10. [Backend Example](#backend-example)

---

## PROJECT OVERVIEW

AI-powered travel itinerary generator with intelligent mock data generation featuring:
- 7-city database (Paris, Tokyo, New York, Barcelona, London, Rome, Amsterdam)
- 50+ real activities with authentic descriptions
- Extensive animations with Motion (Framer Motion)
- Custom cursor effects
- Smart activity selection algorithm
- Real-time AI process visualization
- TypeScript for type safety
- ShadCN UI components
- Tailwind CSS v4.0

---

## FILE STRUCTURE

```
ai-travel-planner/
├── App.tsx                          # Main application
├── .gitignore                       # Git ignore rules
│
├── components/                      # React components (59 files)
│   ├── CustomCursor.tsx
│   ├── Features.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── PlannerDemo.tsx
│   ├── SampleItinerary.tsx
│   ├── ScrollIndicator.tsx
│   ├── TechStack.tsx
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   └── ui/                          # 51 ShadCN components
│
├── services/
│   └── api.ts                       # API service layer
│
├── types/
│   └── api.ts                       # TypeScript types
│
├── utils/
│   ├── intelligentGenerator.ts     # AI generator (850+ lines)
│   └── mockData.ts                 # Mock data utilities
│
├── styles/
│   └── globals.css                 # Global styles
│
└── Documentation/                   # 13 markdown files
```

---

# CORE APPLICATION FILES

## 📄 App.tsx

```tsx
import { useState } from "react";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { PlannerDemo } from "./components/PlannerDemo";
import { SampleItinerary } from "./components/SampleItinerary";
import { TechStack } from "./components/TechStack";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { Toaster } from "./components/ui/sonner";
import type { Itinerary } from "./types/api";

export default function App() {
  const [generatedItinerary, setGeneratedItinerary] = useState<Itinerary | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Toaster position="top-right" richColors />
      <CustomCursor />
      <Hero />
      <Features />
      <PlannerDemo onItineraryGenerated={setGeneratedItinerary} />
      <SampleItinerary itinerary={generatedItinerary} />
      <TechStack />
      <Footer />
    </div>
  );
}
```

---

## 📄 .gitignore

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
*.log

# Production
build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Misc
*.tsbuildinfo
.cache
```

---

# COMPONENT FILES

## 📄 components/Hero.tsx

```tsx
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
```

---

## 📄 components/CustomCursor.tsx

```tsx
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add to trail
      setTrail(prev => [
        ...prev.slice(-8), // Keep last 8 points
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ]);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Trail effect */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed w-2 h-2 bg-indigo-500 rounded-full pointer-events-none z-50 mix-blend-screen"
          style={{
            left: point.x - 4,
            top: point.y - 4,
          }}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ 
            scale: 0,
            opacity: 0 
          }}
          transition={{ 
            duration: 0.6,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed w-6 h-6 border-2 border-indigo-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5
        }}
      />

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="fixed w-8 h-8 border border-indigo-400 rounded-full pointer-events-none z-50"
          style={{
            left: mousePosition.x - 16,
            top: mousePosition.y - 16,
          }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </>
  );
}
```

---

**NOTE:** This is a comprehensive reference document. The complete code is too long for a single file (15,000+ lines). 

## 📥 How to Download Your Complete Project:

### Option 1: GitHub (Recommended)
Once you push to GitHub, you can:
```bash
# Clone your repository
git clone YOUR_REPO_URL

# Or download as ZIP
# Click "Code" → "Download ZIP" on GitHub
```

### Option 2: Export from Figma Make
If you're using Figma Make, there should be an export/download option in the interface.

### Option 3: Manual File Copy
Copy each file individually from the file structure you provided.

---

Would you like me to:
1. ✅ Continue with remaining component code (PlannerDemo, Features, etc.)
2. ✅ Show the complete intelligentGenerator.ts (850+ lines)
3. ✅ Provide specific files you need
4. ✅ Create a script to bundle everything

**Which files are most important to you right now?**
