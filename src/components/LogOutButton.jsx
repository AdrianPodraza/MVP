import { Link } from "react-router-dom";
function LogOutButton() {
  function handleLogOut() {
    localStorage.removeItem("token");
  }
  return (
    <button
      onClick={handleLogOut}
      className="grid h-14 w-52 items-center rounded-sm bg-sky-700 text-center text-white"
    >
      <Link to="/">Wyloguj się</Link>
    </button>
  );
}

export default LogOutButton;
