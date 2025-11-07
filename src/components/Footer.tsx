import { Plane, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <motion.div 
                className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Plane className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl text-white">TravelAI</span>
            </div>
            <p className="text-sm text-slate-400">
              AI-powered travel planning that actually understands what you want to experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              {["Features", "How it Works", "Pricing", "API Access"].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href="#" className="hover:text-indigo-400 transition-colors">{item}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              {["Documentation", "Blog", "Support", "Status"].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href="#" className="hover:text-indigo-400 transition-colors">{item}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-white mb-4">Connect</h4>
            <div className="flex gap-2">
              {[Github, Twitter, Linkedin].map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-400 hover:bg-slate-900">
                    <Icon className="w-5 h-5" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm text-slate-400">
            © 2025 TravelAI. Built with LangChain, Gemini AI & FastAPI.
          </p>
          <div className="flex gap-6 text-sm">
            {["Privacy", "Terms", "Cookies"].map((item, index) => (
              <motion.a 
                key={index}
                href="#" 
                className="hover:text-indigo-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
