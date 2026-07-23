import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import PatientDashboard from "./pages/patient/PatientDashboard";
import Appointment from "./pages/patient/Appointment";
import Payment from "./pages/patient/Payment";
import AppointmentHistory from "./pages/patient/AppointmentHistory";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";

import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorManagement from "./pages/admin/DoctorManagement";
import PatientManagement from "./pages/admin/PatientManagement";
import AppointmentManagement from "./pages/admin/AppointmentManagement";
import Reports from "./pages/admin/Reports";
import AdminLayout from "./components/layout/AdminLayout";
import "./styles/admin.css";
import PaymentManagement from "./pages/admin/PaymentManagement";
import HealthAssistant from "./pages/patient/HealthAssistant";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import Review from "./pages/patient/Review";
import Profile from "./pages/patient/Profile";
import HealthTips from "./pages/patient/HealthTips";
import Notifications from "./pages/patient/Notifications";
import ForgotPassword from "./pages/auth/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Patient */}
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointment-history" element={<AppointmentHistory />} />
        <Route path="/payment" element={<Payment />} />

        {/* Doctor */}
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/health-assistant" element={<HealthAssistant />} />
        <Route path="/review" element={<Review/>}/>
        <Route path="/health-tips" element={<HealthTips />} />
        {/* Admin */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/doctor-management"
          element={
            <AdminLayout>
              <DoctorManagement />
            </AdminLayout>
          }
        />

        <Route
          path="/patient-management"
          element={
            <AdminLayout>
              <PatientManagement />
            </AdminLayout>
          }
        />

        <Route
          path="/appointment-management"
          element={
            <AdminLayout>
              <AppointmentManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/payment-management"
          element={
            <AdminLayout>
              <PaymentManagement />
            </AdminLayout>
          }
        />

        <Route
          path="/reports"
          element={
            <AdminLayout>
              <Reports />
            </AdminLayout>
          }
        />
        <Route
          path="/doctor-appointments"
          element={<DoctorAppointments />}
        />

        <Route
          path="/doctor-profile"
          element={<DoctorProfile />}
        />

        <Route
            path="appointments"
            element={<AppointmentManagement />}
        />
        <Route
            path="/admin/payments"
            element={<PaymentManagement />}
        />
        <Route
            path="/profile"
            element={<Profile />}
        />
        <Route
            path="/notifications"
            element={<Notifications/>}
        />
        <Route
            path="/forgot-password"
            element={<ForgotPassword />}
        />
        
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;