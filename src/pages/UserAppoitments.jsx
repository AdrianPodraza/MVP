import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
function UserAppoitments() {
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
    <div className="flex w-[600px] flex-col items-center gap-7 rounded-xl border-2 border-solid border-black bg-white p-20">
      <div className="flex flex-col items-center">
        <div className="grid h-9 w-9 place-items-center rounded-full border-2 border-solid border-black">
          <Link to="/user-panel">
            <FaHome className="h-6 w-6 text-yellow-300" />
          </Link>
        </div>
        <div className="place-self-center">Rezerwacja wizyty</div>
      </div>
      <div>
        {appointment ? (
          <div>
            <h3>Twoja Wizyta</h3>
            <p>Data: {appointment.date}</p>
            <p>Godzina: {appointment.time}</p>
          </div>
        ) : (
          <h3>Brak umówionych wizyt</h3>
        )}
      </div>
    </div>
  );
}

export default UserAppoitments;
