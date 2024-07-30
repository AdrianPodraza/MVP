import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHome, FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/background.png";

function AppointmentConfirm() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/appointments")
      .then((response) => {
        const unapprovedAppointments = response.data.filter(
          (appointment) => !appointment.approved
        );
        setAppointments(unapprovedAppointments);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleApprove = (id) => {
    const appointmentToApprove = appointments.find(
      (appointment) => appointment._id === id
    );

    if (appointmentToApprove) {
      axios
        .post(`http://localhost:3001/approve-appointment/${id}`)
        .then(() => {
          axios.post("http://localhost:3001/send-sms", {
            to: `+48${appointmentToApprove.phoneNumber}`,
            message: `Twoja wizyta została potwierdzona na ${appointmentToApprove.date} o ${appointmentToApprove.time}.`,
          });

          setAppointments(
            appointments.filter((appointment) => appointment._id !== id)
          );
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleCancel = (id) => {
    axios
      .post(`http://localhost:3001/cancel-appointment/${id}`)
      .then(() => {
        setAppointments(
          appointments.filter((appointment) => appointment._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="w-[600px] bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col items-center gap-5 mb-6">
            <div className="grid h-9 w-9 place-items-center rounded-full border-2 border-solid border-black">
              <Link to="/admin-panel">
                <FaHome className="h-6 w-6 text-yellow-300" />
              </Link>
            </div>
            <h2 className="text-lg font-bold">Potwierdzenie wizyty</h2>
          </div>

          {appointments.length === 0 ? (
            <p className="text-center text-gray-500">
              Brak wizyt do potwierdzenia.
            </p>
          ) : (
            appointments.map((appointment) => (
              <div
                className="flex flex-col gap-4 border-2 border-black rounded-lg p-4 mb-4 bg-gray-50 shadow"
                key={appointment._id}
              >
                <p>
                  <strong>Data:</strong> {appointment.date}
                </p>
                <p>
                  <strong>Godzina:</strong> {appointment.time}
                </p>
                <p>
                  <strong>Email:</strong> {appointment.email}
                </p>
                <p>
                  <strong>Numer telefonu:</strong> {appointment.phoneNumber}
                </p>
                <div className="flex justify-between">
                  <button
                    className="flex items-center bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                    onClick={() => handleApprove(appointment._id)}
                  >
                    <FaCheck className="mr-2" /> Zatwierdź
                  </button>
                  <button
                    className="flex items-center bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
                    onClick={() => handleCancel(appointment._id)}
                  >
                    <FaXmark className="mr-2" /> Anuluj
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AppointmentConfirm;
