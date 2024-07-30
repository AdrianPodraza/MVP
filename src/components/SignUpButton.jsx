import { Link } from "react-router-dom";
function SignUpButton() {
  return (
    <div className="grid h-14 w-52 items-center cursor-pointer rounded-sm bg-[#F4B183] text-center text-black hover:bg-orange-300">
      <Link to="signUp">Zarejestruj się</Link>
    </div>
  );
}

export default SignUpButton;
