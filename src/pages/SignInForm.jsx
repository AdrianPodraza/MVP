import { FaUser } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data.message === "Success") {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("admin", result.data.userData.admin);

          if (result.data.userData.admin) {
            navigate("/admin-panel");
          } else navigate("/user-panel");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-[600px] flex-col gap-7 rounded-xl border-2 border-solid border-black bg-white p-20">
        <div className="flex flex-col items-center">
          <div className="grid h-9 w-9 place-items-center rounded-full border-2 border-solid border-black">
            <Link to="/">
              <FaHome className="h-6 w-6 text-yellow-300" />
            </Link>
          </div>
          <span className="">
            <b>Logowanie</b>
          </span>
        </div>
        <InputField
          label="e-mail lub nr-tel"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        >
          <FaUser className="absolute right-5 top-1/2 -translate-y-1/2" />
        </InputField>

        <InputField
          label="hasło"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        >
          <IoEyeSharp className="absolute right-5 top-1/2 -translate-y-1/2" />
        </InputField>
        <button className="grid place-items-center rounded-full bg-green-400 p-3 font-bold text-white">
          Zaloguj
        </button>
      </div>
    </form>
  );
}

export default SignInForm;
