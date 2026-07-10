import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaShieldAlt,
  FaPlusCircle,
  FaExclamationTriangle,
  FaSearch,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {

  const navigate = useNavigate();

  return (
    <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-slate-900 text-white shadow-lg">

      <div className="p-6 text-center border-b border-slate-700">
        <h2 className="text-2xl font-bold text-cyan-400">
          SentinelCore
        </h2>
      </div>

      <nav className="mt-6">

        <ul className="space-y-2">

          {/* Dashboard */}
          <li
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer transition"
          >
            <FaHome />
            Dashboard
          </li>

          {/* Threat List */}
          <li
            onClick={() => navigate("/threat-list")}
            className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer transition"
          >
            <FaShieldAlt />
            Threat List
          </li>

          {/* Add Threat */}
          <li
            onClick={() => navigate("/add-threat")}
            className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer transition"
          >
            <FaPlusCircle />
            Add Threat
          </li>

          {/* Alerts */}
          <li
            className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer transition"
          >
            <FaExclamationTriangle />
            Alerts
          </li>

          {/* IOC Management */}
          <li
            className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer transition"
          >
            <FaSearch />
            IOC Management
          </li>

          {/* Reports */}
          <li
            className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer transition"
          >
            <FaFileAlt />
            Reports
          </li>

          {/* Settings */}
          <li
            className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer transition"
          >
            <FaCog />
            Settings
          </li>

          {/* Logout */}
          <li
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-6 py-3 mt-8 hover:bg-red-600 cursor-pointer transition"
          >
            <FaSignOutAlt />
            Logout
          </li>

        </ul>

      </nav>

    </aside>
  );
}

export default Sidebar;