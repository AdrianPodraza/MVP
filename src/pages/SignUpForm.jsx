import { FaUser, FaHome } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

import { BsFillTelephoneFill } from "react-icons/bs";
import InputField from "../components/InputField";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", { phoneNumber, email, password })
      .then((result) => {
        console.log(result);
        navigate("/signIn");
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
            <b>Rejestracja</b>
          </span>
        </div>
        <InputField
          label="e-mail"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        >
          <FaUser className="absolute right-5 top-1/2 -translate-y-1/2" />
        </InputField>
        <InputField
          label="numer telefonu"
          type="text"
          onChange={(e) => setPhoneNumber(e.target.value)}
        >
          <BsFillTelephoneFill className="absolute right-5 top-1/2 -translate-y-1/2" />
        </InputField>

        <InputField
          label="hasło"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        >
          <IoEyeSharp className="absolute right-5 top-1/2 -translate-y-1/2" />
        </InputField>
        <InputField label="potwierdzenie hasła" type="password">
          <IoEyeSharp className="absolute right-5 top-1/2 -translate-y-1/2" />
        </InputField>
        <button className="grid place-items-center rounded-full bg-green-400 p-3 font-bold text-white">
          Zarejestruj
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
