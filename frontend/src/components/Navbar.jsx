import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-900 text-white flex items-center justify-between px-6 shadow-lg z-50">
      <h1 className="text-2xl font-bold text-cyan-400">
        SentinelCore
      </h1>

      <div className="flex items-center gap-6 text-xl">
        <FaBell className="cursor-pointer hover:text-cyan-400 transition" />
        <FaUserCircle className="cursor-pointer hover:text-cyan-400 transition text-2xl" />
      </div>
    </nav>
  );
}

export default Navbar;