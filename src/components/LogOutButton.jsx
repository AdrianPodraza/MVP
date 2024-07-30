import { Link } from "react-router-dom";

function LogOutButton({
  backgroundColor = "bg-sky-700",
  textColor = "text-white",
  hoverColor = "hover:bg-sky-300",
}) {
  function handleLogOut() {
    localStorage.removeItem("token");
  }

  return (
    <button
      onClick={handleLogOut}
      className={`grid h-14 w-52 items-center rounded-sm ${backgroundColor} ${textColor} text-center ${hoverColor}`}
    >
      <Link to="/">Wyloguj się</Link>
    </button>
  );
}

export default LogOutButton;
