import EditThreat from "../pages/EditThreat";
import ThreatList from "../pages/ThreatList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AddThreat from "../pages/AddThreat";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-threat" element={<AddThreat />} />
        <Route path="/threat-list" element={<ThreatList />} />
        <Route path="/edit-threat/:id" element={<EditThreat />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;