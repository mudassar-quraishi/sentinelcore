import { motion } from "framer-motion";

function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        bg-slate-900/80
        backdrop-blur-xl
        border
        border-slate-800
        rounded-3xl
        shadow-2xl
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;