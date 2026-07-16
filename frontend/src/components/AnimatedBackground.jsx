import { motion } from "framer-motion";
import FloatingParticles from "./FloatingParticles";
import AnimatedGrid from "./AnimatedGrid";

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      <AnimatedGrid />

      <FloatingParticles />

      <motion.div
        className="absolute -top-40 -left-40 w-[450px] h-[450px] rounded-full bg-sky-500/20 blur-[140px]"
        animate={{
          x: [-20, 30, -20],
          y: [-20, 30, -20],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/20 blur-[180px]"
        animate={{
          x: [20, -20, 20],
          y: [20, -20, 20],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full bg-cyan-500/15 blur-[140px]"
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        style={{
          transform: "translate(-50%,-50%)",
        }}
      />
    </div>
  );
}

export default AnimatedBackground;