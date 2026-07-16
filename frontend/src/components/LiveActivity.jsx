import { motion } from "framer-motion";
import {
  FaBug,
  FaBell,
  FaShieldAlt,
  FaDatabase,
} from "react-icons/fa";

const activities = [
  {
    icon: <FaBug />,
    color: "text-red-400",
    title: "Critical Malware Detected",
    time: "Just now",
  },
  {
    icon: <FaDatabase />,
    color: "text-cyan-400",
    title: "IOC Added",
    time: "2 min ago",
  },
  {
    icon: <FaBell />,
    color: "text-yellow-400",
    title: "New Alert Generated",
    time: "5 min ago",
  },
  {
    icon: <FaShieldAlt />,
    color: "text-green-400",
    title: "Threat Resolved",
    time: "12 min ago",
  },
];

function LiveActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl bg-slate-900 border border-slate-800 shadow-xl p-6"
    >
      <h2 className="text-2xl font-bold text-white">
        Live Activity
      </h2>

      <p className="text-slate-400 mt-2 mb-6">
        Latest security events
      </p>

      <div className="space-y-5">

        {activities.map((activity, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.15,
            }}
            whileHover={{
              scale: 1.02,
            }}
            className="flex justify-between items-center bg-slate-800 rounded-2xl p-4"
          >

            <div className="flex items-center gap-4">

              <div className={`text-2xl ${activity.color}`}>
                {activity.icon}
              </div>

              <div>

                <h3 className="text-white font-semibold">
                  {activity.title}
                </h3>

                <p className="text-slate-400 text-sm">
                  {activity.time}
                </p>

              </div>

            </div>

            <motion.div
              animate={{
                scale: [1, 1.4, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              className="w-3 h-3 rounded-full bg-emerald-400"
            />

          </motion.div>

        ))}

      </div>

    </motion.div>
  );
}

export default LiveActivity;