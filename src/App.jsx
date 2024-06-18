import { Routes, Route } from "react-router-dom";
import SignInForm from "./pages/SignInForm";
import SignUpForm from "./pages/SignUpForm";
import Appoitment from "./pages/Appoitment";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute"; // Zaimportuj komponent PrivateRoute
import UserPanel from "./pages/UserPanel";
import UserAppoitments from "./pages/UserAppoitments";
import AdminPanel from "./pages/AdminPanel";
import AllAppointments from "./pages/AllAppointments";
import AppointmentConfirm from "./pages/AppointmentConfirm";

function App() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#070F2B]">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signIn" element={<SignInForm />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/user-panel" element={<UserPanel />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/all-appointments" element={<AllAppointments />} />
        <Route path="/appoitment-confirm" element={<AppointmentConfirm />} />

        <Route path="/user-appoitments" element={<UserAppoitments />} />

        <Route
          path="/appoitment"
          element={
            <PrivateRoute>
              <Appoitment />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
