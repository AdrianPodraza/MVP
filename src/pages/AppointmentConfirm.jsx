import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHome, FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import { Link } from "react-router-dom";
function AppointmentConfirm() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/appointments")
      .then((response) => {
        const unapprovedAppointments = response.data.filter(
          (appointment) => !appointment.approved,
        );
        setAppointments(unapprovedAppointments);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleApprove = (id) => {
    axios
      .post(`http://localhost:3001/approve-appointment/${id}`)
      .then((response) => {
        setAppointments(
          appointments.filter((appointment) => appointment._id !== id),
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCancel = (id) => {
    axios
      .post(`http://localhost:3001/cancel-appointment/${id}`)
      .then((response) => {
        setAppointments(
          appointments.filter((appointment) => appointment._id !== id),
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="flex w-[600px] flex-col gap-7 rounded-xl border-2 border-solid border-black bg-white p-20">
        <div className="flex flex-col items-center gap-5">
          <div className="grid h-9 w-9 place-items-center rounded-full border-2 border-solid border-black">
            <Link to="/admin-panel">
              <FaHome className="h-6 w-6 text-yellow-300" />
            </Link>
          </div>
          <div className="place-self-center">Potwierdzenie wizyty</div>
          {appointments.map((appointment) => (
            <div
              className="flex flex-col gap-2 border-2 border-black p-4"
              key={appointment._id}
            >
              <p>Data: {appointment.date}</p>
              <p>Godzina: {appointment.time}</p>
              <p>Email: {appointment.email}</p>
              <p>numer telefonu: {appointment.phoneNumber}</p>
              <div className="flex justify-between">
                <button
                  className="bg-green-500 p-3"
                  onClick={() => handleApprove(appointment._id)}
                >
                  <FaCheck className="text-white" />
                </button>
                <button
                  className="bg-red-600 p-3"
                  onClick={() => handleCancel(appointment._id)}
                >
                  <FaXmark />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AppointmentConfirm;
