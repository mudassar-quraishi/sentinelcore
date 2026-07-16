import { motion } from "framer-motion";

function PageHeader({ title, subtitle, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center mb-8"
    >
      <div>
        <h1 className="text-5xl font-bold text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="text-slate-400 mt-2">
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </motion.div>
  );
}

export default PageHeader;