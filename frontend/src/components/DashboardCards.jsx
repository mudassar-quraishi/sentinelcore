import { useEffect, useState } from "react";
import api from "../services/api";

import {
  FaBug,
  FaExclamationTriangle,
  FaDatabase,
  FaShieldVirus,
} from "react-icons/fa";

function DashboardCards() {
  const [stats, setStats] = useState({
    threats: 0,
    alerts: 0,
    ioc: 0,
    risk: "0%",
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get("/dashboard/stats");
      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cards = [
    {
      title: "Threats",
      value: stats.threats,
      icon: <FaBug />,
      color: "text-red-500",
    },
    {
      title: "Active Alerts",
      value: stats.alerts,
      icon: <FaExclamationTriangle />,
      color: "text-yellow-500",
    },
    {
      title: "IOC Count",
      value: stats.ioc,
      icon: <FaDatabase />,
      color: "text-blue-500",
    },
    {
      title: "Risk Score",
      value: stats.risk,
      icon: <FaShieldVirus />,
      color: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
        >
          <div className={`text-4xl ${card.color}`}>
            {card.icon}
          </div>

          <h3 className="mt-4 text-gray-500 text-lg">
            {card.title}
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            {card.value}
          </h1>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;