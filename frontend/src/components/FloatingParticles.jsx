import { motion } from "framer-motion";

const particles = Array.from({ length: 25 });

function FloatingParticles() {
  return (
    <>
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-cyan-400/20"
          style={{
            width: Math.random() * 8 + 3,
            height: Math.random() * 8 + 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: Math.random() * 6 + 6,
            repeat: Infinity,
          }}
        />
      ))}
    </>
  );
}

export default FloatingParticles;