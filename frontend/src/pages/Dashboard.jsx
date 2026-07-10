import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";
import ThreatChart from "../components/ThreatChart";
import RecentAlerts from "../components/RecentAlerts";

function Dashboard() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <main className="ml-64 mt-16 p-8 bg-slate-100 min-h-screen">

        <h1 className="text-4xl font-bold">
          Welcome to SentinelCore
        </h1>

        <p className="text-gray-500 mt-2">
          Cyber Threat Intelligence Platform
        </p>

        <DashboardCards />

        <ThreatChart />

        <RecentAlerts />

      </main>
    </>
  );
}

export default Dashboard;