import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";

function RecentThreats() {

  const [threats, setThreats] = useState([]);

  useEffect(() => {
    fetchRecentThreats();
  }, []);

  const fetchRecentThreats = async () => {
    try {
      const response = await api.get("/dashboard/recent-threats");
      setThreats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const severityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500/20 text-red-400";
      case "High":
        return "bg-orange-500/20 text-orange-400";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-300";
      case "Low":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-slate-700 text-white";
    }
  };

  const statusColor = (status) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-500/20 text-blue-400";
      case "resolved":
      case "closed":
      case "close":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-slate-600 text-white";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl p-6"
    >

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Recent Threats
          </h2>

          <p className="text-slate-400 mt-1">
            Latest detected cyber threats
          </p>

        </div>

        <span className="text-sky-400 font-semibold">
          {threats.length} Records
        </span>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="text-slate-400 border-b border-white/10">

              <th className="py-4 text-left">ID</th>
              <th className="text-left">Threat</th>
              <th className="text-left">Severity</th>
              <th className="text-left">Source</th>
              <th className="text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {threats.map((threat) => (

              <tr
                key={threat.id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >

                <td className="py-5 text-white">
                  #{threat.id}
                </td>

                <td className="font-medium text-white">
                  {threat.title}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${severityColor(threat.severity)}`}
                  >
                    {threat.severity}
                  </span>

                </td>

                <td className="text-slate-300">
                  {threat.source}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(threat.status)}`}
                  >
                    {threat.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </motion.div>
  );
}

export default RecentThreats;