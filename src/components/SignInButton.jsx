import { Link } from "react-router-dom";
function SignInButton() {
  return (
    <div className="grid h-14 w-52 items-center rounded-sm cursor-pointer  text-center text-black hover:text-opacity-50">
      <Link to="signIn">Zaloguj się</Link>
    </div>
  );
}

export default SignInButton;
