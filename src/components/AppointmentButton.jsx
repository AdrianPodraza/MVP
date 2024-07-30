import { Link } from "react-router-dom";
function SignInButton() {
  return (
    <div className="grid h-14 w-52 items-center rounded-sm cursor-pointer  bg-orange-400 text-center text-white hover:bg-orange-300">
      <Link to="/appoitment">Umów wizyte</Link>
    </div>
  );
}

export default SignInButton;
