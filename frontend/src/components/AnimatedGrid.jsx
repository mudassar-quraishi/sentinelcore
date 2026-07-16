import { motion } from "framer-motion";

function AnimatedGrid() {
  return (
    <motion.div
      className="absolute inset-0 opacity-10"
      animate={{
        backgroundPosition: ["0px 0px", "60px 60px"],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundImage: `
          linear-gradient(rgba(56,189,248,.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(56,189,248,.2) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  );
}

export default AnimatedGrid;