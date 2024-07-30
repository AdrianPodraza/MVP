import { Link } from "react-router-dom";

function UserAppointmentsButton({
  backgroundColor = "bg-sky-700",
  textColor = "text-white",
  hoverColor = "hover:bg-sky-300",
}) {
  return (
    <div
      className={`grid h-14 w-52 items-center rounded-sm ${backgroundColor} ${textColor} text-center ${hoverColor}`}
    >
      <Link to="/user-appointments">Zobacz Wizyty</Link>
    </div>
  );
}

export default UserAppointmentsButton;
