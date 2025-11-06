import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import DashboardLayout from "./layout/Layout";

import Login from "./pages/Login";
import Managers from "./pages/Managers";
import Admins from "./pages/Admins";
import Teachers from "./pages/Teachers";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute roles={["admin","ustoz","student"]}><DashboardLayout /></ProtectedRoute>}>
        <Route path="/managers" element={<Managers />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/students" element={<Students />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<Profile />} />
        <Route index element={<Managers />} /> 
      </Route>

      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}
