import { motion } from "framer-motion";

function DashboardHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-between items-center"
    >
      <div>
        <h1 className="text-4xl font-bold">
          Security Operations Center
        </h1>

        <p className="text-slate-400 mt-2">
          Real-time cyber threat monitoring
        </p>
      </div>

      <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full">
        ● Live Monitoring
      </div>
    </motion.div>
  );
}

export default DashboardHeader;