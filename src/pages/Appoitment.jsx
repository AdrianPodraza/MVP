import {
  DatePickerComponent,
  TimePickerComponent,
} from "@syncfusion/ej2-react-calendars";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Appointment() {
  const [value, setValue] = useState();
  const [time, setTime] = useState();
  const navigate = useNavigate();
  // Set minimum date and time to tomorrow at 8:00 AM
  const minDateTime = new Date();
  minDateTime.setDate(minDateTime.getDate() + 1);

  // Set maximum date and time to 14 days from now at 4:00 PM
  const maxDateTime = new Date();
  maxDateTime.setDate(maxDateTime.getDate() + 14);
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };
  const handleAppointmentSubmit = () => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const token = localStorage.getItem("token");

    const appointmentData = {
      date: value.toLocaleDateString(),
      time: formattedTime,
    };

    // Replace 'your_jwt_token' with the actual token
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post("http://localhost:3001/book-appointment", appointmentData, config)
      .then((response) => {
        navigate("/user-panel");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Handle change event to ensure the time selected is within the allowed range

  return (
    <div className="flex w-[600px] flex-col gap-7 rounded-xl border-2 border-solid border-black bg-white p-20">
      <div className="flex flex-col items-center">
        <div className="grid h-9 w-9 place-items-center rounded-full border-2 border-solid border-black">
          <Link to="/user-panel">
            <FaHome className="h-6 w-6 text-yellow-300" />
          </Link>
        </div>
        <div className="place-self-center">Rezerwacja wizyty</div>
      </div>

      <form onSubmit={handleAppointmentSubmit}>
        <label className="text-xs">Wybierz date wizyty:</label>
        <DatePickerComponent
          id="datepicker"
          placeholder="Wprowadź datę"
          value={value}
          min={minDateTime}
          max={maxDateTime}
          format="dd/MM/yyyy"
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      <div>
        <label className="text-xs">Wybierz godzine wizyty:</label>
        <TimePickerComponent
          value={time}
          id="timepicker"
          placeholder="Wybierz godzinę"
          format="HH:mm"
          step={60}
          min={new Date(new Date().setHours(8, 0, 0, 0))}
          max={new Date(new Date().setHours(16, 0, 0, 0))}
          onChange={handleTimeChange}
        ></TimePickerComponent>
      </div>
      <button
        onClick={handleAppointmentSubmit}
        className="grid place-items-center rounded-full bg-green-400 p-3 font-bold text-white"
      >
        Zarezerwuj
      </button>
    </div>
  );
}

export default Appointment;
