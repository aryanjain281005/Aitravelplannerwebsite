import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
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

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20"
      onClick={scrollToPlanner}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <motion.div
        className="flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <span className="text-sm text-slate-600">Scroll to explore</span>
        <div className="w-8 h-12 border-2 border-slate-400 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-3 bg-indigo-600 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        <ChevronDown className="w-5 h-5 text-slate-600" />
      </motion.div>
    </motion.div>
  );
}
