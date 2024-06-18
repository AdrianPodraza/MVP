import { Link } from "react-router-dom";
function AppointmentConfirmButton() {
  return (
    <div className="grid h-14 w-52 items-center rounded-sm bg-sky-700 text-center text-white">
      <Link to="/appoitment-confirm">Potwierdź wizyty</Link>
    </div>
  );
}

export default AppointmentConfirmButton;
