import { motion } from "framer-motion";

function PrimaryButton({
  children,
  className = "",
  ...props
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className={`
        px-5
        py-3
        rounded-xl
        font-semibold
        transition-all
        shadow-lg
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default PrimaryButton;