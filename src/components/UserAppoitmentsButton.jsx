import { Link } from "react-router-dom";
function UserAppointmentsButton() {
  return (
    <div className="grid h-14 w-52 items-center rounded-sm bg-sky-700 text-center text-white">
      <Link to="/user-appoitments">Zobacz Wizyty</Link>
    </div>
  );
}

export default UserAppointmentsButton;
