import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/background.png";

function AllAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/appointments")
      .then((response) => {
        const approvedAppointments = response.data.filter(
          (appointment) => appointment.approved
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
      })
      .catch((error) => {
        console.error("There was an error fetching the appointments!", error);
      });
  }, []);

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
          <div className="flex flex-col items-center gap-5 mb-6">
            <div className="grid h-9 w-9 place-items-center rounded-full border-2 border-solid border-black">
              <Link to="/admin-panel">
                <FaHome className="h-6 w-6 text-yellow-300" />
              </Link>
            </div>
            <h2 className="text-lg font-bold">Wszystkie zatwierdzone wizyty</h2>
          </div>

          {appointments.length === 0 ? (
            <p className="text-center text-gray-500">
              Brak zatwierdzonych wizyt.
            </p>
          ) : (
            <ul className="space-y-4">
              {appointments.map((appointment, index) => (
                <li
                  key={appointment._id}
                  className="bg-gray-50 border-2 border-black rounded-lg p-4 shadow"
                >
                  <p className="font-bold">
                    {index + 1}. {appointment.date} - {appointment.time}
                  </p>
                  <p>Email: {appointment.email}</p>
                  <p>Numer telefonu: {appointment.phoneNumber}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllAppointments;
