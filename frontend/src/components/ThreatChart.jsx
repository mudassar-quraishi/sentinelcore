import { useEffect, useState } from "react";
import api from "../services/api";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { motion } from "framer-motion";
import CustomTooltip from "./CustomTooltip";

function ThreatChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchChart();

    const interval = setInterval(fetchChart, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchChart = async () => {
    try {
      const response = await api.get("/dashboard/chart");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
          className="
      h-full
      rounded-3xl
      bg-slate-900/80
      backdrop-blur-xl
      border border-slate-800
      shadow-2xl
      p-8
      flex
      flex-col
      "
    >
      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-4xl font-bold text-white">
            Threat Trend
          </h2>

          <p className="text-slate-400 mt-2">
            Live severity analysis
          </p>

        </div>

        <div className="text-cyan-400 font-semibold flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
          Live Data
        </div>

      </div>

      {/* Chart */}

      <div className="flex-1 min-h-0">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="threatGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#38bdf8"
                  stopOpacity={0.8}
                />

                <stop
                  offset="100%"
                  stopColor="#38bdf8"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#334155"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="severity"
              stroke="#94a3b8"
              tick={{ fill: "#cbd5e1" }}
            />

            <YAxis
              allowDecimals={false}
              stroke="#94a3b8"
              tick={{ fill: "#cbd5e1" }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#38bdf8",
                strokeWidth: 2,
              }}
            />

            <Area
              type="monotone"
              dataKey="count"
              stroke="#38bdf8"
              strokeWidth={4}
              fill="url(#threatGradient)"
              animationDuration={2200}
            />

            <Line
              type="monotone"
              dataKey="count"
              stroke="#7dd3fc"
              strokeWidth={3}
              animationDuration={2200}
              dot={{
                r: 6,
                fill: "#38bdf8",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 9,
                fill: "#06b6d4",
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </motion.div>
  );
}

export default ThreatChart;