import { motion } from "framer-motion";
import {
  FaBug,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

function RecentAlerts() {

  const alerts = [
    {
      severity: "Critical",
      threat: "SQL Injection",
      status: "Open",
      time: "10:15 AM",
    },
    {
      severity: "High",
      threat: "Malware Detected",
      status: "Open",
      time: "09:40 AM",
    },
    {
      severity: "Medium",
      threat: "Port Scan",
      status: "Resolved",
      time: "08:20 AM",
    },
    {
      severity: "Low",
      threat: "Suspicious Login",
      status: "Open",
      time: "07:55 AM",
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "text-red-400 bg-red-500/20";
      case "High":
        return "text-orange-400 bg-orange-500/20";
      case "Medium":
        return "text-yellow-300 bg-yellow-500/20";
      default:
        return "text-green-400 bg-green-500/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl p-6"
    >

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Recent Alerts
          </h2>

          <p className="text-slate-400">
            Latest security notifications
          </p>

        </div>

        <FaBug className="text-red-400 text-3xl" />

      </div>

      <div className="space-y-5">

        {alerts.map((alert, index) => (

          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="flex justify-between items-center bg-slate-900/70 rounded-2xl p-4 border border-white/5"
          >

            <div>

              <div className="flex items-center gap-3">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(alert.severity)}`}
                >
                  {alert.severity}
                </span>

                <h3 className="text-white font-semibold">
                  {alert.threat}
                </h3>

              </div>

              <div className="flex items-center gap-2 mt-3 text-slate-400">

                <FaClock />

                <span>{alert.time}</span>

              </div>

            </div>

            <div>

              {alert.status === "Resolved" ? (

                <span className="flex items-center gap-2 text-green-400 font-semibold">
                  <FaCheckCircle />
                  Resolved
                </span>

              ) : (

                <span className="flex items-center gap-2 text-orange-400 font-semibold">
                  <FaExclamationTriangle />
                  Open
                </span>

              )}

            </div>

          </motion.div>

        ))}

      </div>

    </motion.div>
  );
}

export default RecentAlerts;