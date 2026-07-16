import Register from "../pages/Register";
import UserList from "../pages/UserList";
import AddUser from "../pages/AddUser";
import EditUser from "../pages/EditUser";
import AddAlert from "../pages/AddAlert";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AlertList from "../pages/AlertList";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AddThreat from "../pages/AddThreat";
import ThreatList from "../pages/ThreatList";
import EditThreat from "../pages/EditThreat";
import AddIOC from "../pages/AddIOC";
import IOCList from "../pages/IOCList";
import EditIOC from "../pages/EditIOC";
import EditAlert from "../pages/EditAlert";
import ProtectedRoute from "./ProtectedRoute";
import Reports from "../pages/Reports";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/threat-list"
          element={
            <ProtectedRoute>
              <ThreatList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-threat"
          element={
            <ProtectedRoute>
              <AddThreat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-threat/:id"
          element={
            <ProtectedRoute>
              <EditThreat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-ioc"
          element={
            <ProtectedRoute>
              <AddIOC />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ioc-list"
          element={
            <ProtectedRoute>
              <IOCList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-ioc/:id"
          element={
            <ProtectedRoute>
              <EditIOC />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-alert"
          element={
            <ProtectedRoute>
              <AddAlert />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alert-list"
          element={
            <ProtectedRoute>
              <AlertList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-alert/:id"
          element={
            <ProtectedRoute>
              <EditAlert />
            </ProtectedRoute>
          }
        />

            <Route
          path="/users"
          element={
              <ProtectedRoute>
                  <UserList />
              </ProtectedRoute>
          }
      />

      <Route
          path="/add-user"
          element={
              <ProtectedRoute>
                  <AddUser />
              </ProtectedRoute>
          }
      />

      <Route
          path="/edit-user/:id"
          element={
              <ProtectedRoute>
                  <EditUser />
              </ProtectedRoute>
          }
      />

      <Route
    path="/reports"
    element={
        <ProtectedRoute>
            <Reports />
        </ProtectedRoute>
    }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;