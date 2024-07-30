import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/background.png";

function UserAppointments() {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signIn");
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get("http://localhost:3001/my-appointment", config)
      .then((response) => {
        setAppointment(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointment:", error);
      });
  }, [navigate]);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "100vw",
      }}
      className="flex items-center"
    >
      <div className="flex justify-center items-center min-h-screen  w-full">
        <div className="w-[600px] bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="grid h-9 w-9 place-items-center rounded-full border-2 border-solid border-black">
              <Link to="/user-panel">
                <FaHome className="h-6 w-6 text-yellow-300" />
              </Link>
            </div>
            <h2 className="text-lg font-bold mt-2">Rezerwacja wizyty</h2>
          </div>

          {appointment ? (
            <div className="bg-gray-50 border-2 border-black rounded-lg p-4 shadow">
              <h3 className="font-bold text-xl">Twoja Wizyta</h3>
              <p className="mt-2">
                <strong>Data:</strong> {appointment.date}
              </p>
              <p>
                <strong>Godzina:</strong> {appointment.time}
              </p>
            </div>
          ) : (
            <h3 className="text-center text-gray-500">Brak umówionych wizyt</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserAppointments;
