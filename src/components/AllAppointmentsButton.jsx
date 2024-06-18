import { Link } from "react-router-dom";
function SignInButton() {
  return (
    <div className="grid h-14 w-52 items-center rounded-sm bg-sky-700 text-center text-white">
      <Link to="/all-appointments">Wszystkie wizyty</Link>
    </div>
  );
}

export default SignInButton;
