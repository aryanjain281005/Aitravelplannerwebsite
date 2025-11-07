import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === "BUTTON" || target.closest("button")) {
        setIsHovering(true);
        setCursorText("CLICK");
      } else if (target.tagName === "A" || target.closest("a")) {
        setIsHovering(true);
        setCursorText("VIEW");
      } else if (target.tagName === "IMG" || target.closest("img")) {
        setIsHovering(true);
        setCursorText("ZOOM");
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleClick);
    };
  }, [cursorX, cursorY]);

  return (
    <>

      {/* Spotlight effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Click ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full border-2"
          style={{
            left: ripple.x,
            top: ripple.y,
            translateX: "-50%",
            translateY: "-50%",
            borderColor: "#6366f1",
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{
            width: 100,
            height: 100,
            opacity: 0,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}

      {/* Trailing gradient orbs */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9996]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
            background: `linear-gradient(135deg, rgba(99, 102, 241, 0.6), rgba(168, 85, 247, 0.6))`,
            filter: "blur(4px)",
          }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
