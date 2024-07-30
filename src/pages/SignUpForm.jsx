import { FaUser, FaHome } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BsFillTelephoneFill } from "react-icons/bs";
import InputField from "../components/InputField";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background.png";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Hasła muszą się zgadzać.");
      return;
    }

    try {
      const result = await axios.post("http://localhost:3001/register", {
        phoneNumber,
        email,
        password,
      });
      console.log(result);
      navigate("/signIn");
    } catch (error) {
      console.error(error);
      setError("Wystąpił błąd podczas rejestracji. Spróbuj ponownie.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "100vw",
      }}
      className="flex items-center"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex w-[600px] flex-col gap-7 rounded-xl border-2 border-solid border-black bg-white p-20">
          <div className="flex flex-col items-center">
            <div className="grid h-9 w-9 place-items-center rounded-full border-2 border-solid border-black">
              <Link to="/">
                <FaHome className="h-6 w-6 text-yellow-300" />
              </Link>
            </div>
            <span>
              <b>Rejestracja</b>
            </span>
          </div>

          {error && <div className="text-red-500">{error}</div>}

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

          <InputField
            label="potwierdzenie hasła"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          >
            <IoEyeSharp className="absolute right-5 top-1/2 -translate-y-1/2" />
          </InputField>

          <button className="grid place-items-center rounded-full bg-green-400 p-3 font-bold text-white">
            Zarejestruj
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
