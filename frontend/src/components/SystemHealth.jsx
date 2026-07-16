import { motion } from "framer-motion";

function Progress({ title, value, color }) {
  return (
    <div>

      <div className="flex justify-between mb-2">

        <span className="text-slate-300">
          {title}
        </span>

        <span className="text-white">
          {value}%
        </span>

      </div>

      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.5 }}
          className={`h-full ${color}`}
        />

      </div>

    </div>
  );
}

function SystemHealth() {

  return (

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl"
    >

      <h2 className="text-2xl font-bold text-white">
        System Health
      </h2>

      <p className="text-slate-400 mt-2 mb-8">
        Infrastructure Status
      </p>

      <div className="space-y-6">

        <Progress
          title="CPU Usage"
          value={62}
          color="bg-cyan-400"
        />

        <Progress
          title="Memory"
          value={74}
          color="bg-green-400"
        />

        <Progress
          title="Database"
          value={98}
          color="bg-blue-400"
        />

        <Progress
          title="API Health"
          value={100}
          color="bg-emerald-400"
        />

      </div>

    </motion.div>

  );
}

export default SystemHealth;