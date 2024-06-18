import { Link } from "react-router-dom";
function SignUpButton() {
  return (
    <div className="grid h-14 w-52 items-center rounded-sm bg-sky-700 text-center text-white">
      <Link to="signUp">Zarejestruj się</Link>
    </div>
  );
}

export default SignUpButton;
