import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

function AllAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/appointments")
      .then((response) => {
        const approvedAppointments = response.data.filter(
          (appointment) => appointment.approved,
        );
        const sortedAppointments = approvedAppointments.sort((a, b) => {
          const formatDateTime = (date, time) => {
            const [day, month, year] = date.split(".");
            const [hours, minutes] = time.split(":");
            return `${year}-${month}-${day}T${hours}:${minutes}`;
          };

          const dateTimeA = formatDateTime(a.date, a.time);
          const dateTimeB = formatDateTime(b.date, b.time);
          return new Date(dateTimeA) - new Date(dateTimeB);
        });

        setAppointments(sortedAppointments);
        console.log(response);
      })
      .catch((error) => {
        console.error("There was an error fetching the appointments!", error);
      });
  }, []);
  return (
    <div className="flex w-[600px] flex-col gap-7 rounded-xl border-2 border-solid border-black bg-white p-20">
      <div className="flex flex-col items-center">
        <div className="grid h-9 w-9 place-items-center rounded-full border-2 border-solid border-black">
          <Link to="/admin-panel">
            <FaHome className="h-6 w-6 text-yellow-300" />
          </Link>
        </div>
        <div className="place-self-center">Rezerwacja wizyty</div>
        <ul>
          {appointments.map((appointment, index) => (
            <li key={appointment._id}>
              {index + 1}. {appointment.date} - {appointment.time} -{" "}
              {appointment.email} - {appointment.phoneNumber}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AllAppointments;
