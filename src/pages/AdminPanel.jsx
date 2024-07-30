import AppointmentConfirmButton from "../components/AppointmentConfirmButton";
import AllAppointmentsButton from "./../components/AllAppointmentsButton";
import LogOutButton from "../components/LogOutButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AdminPanel() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin") === "true";

    if (!isAdmin) {
      navigate("/user-panel");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-[#070F2B]">
      <div className="flex w-fit flex-col gap-10">
        <AppointmentConfirmButton />
        <AllAppointmentsButton />
        <LogOutButton />
      </div>
    </div>
  );
}
export default AdminPanel;
