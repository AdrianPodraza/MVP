import Logo from "../assets/Logo.svg";
function Navbar({ children }) {
  return (
    <nav className="flex justify-between px-11 py-6 w-full h-fit items-center bg-[#FFF2CC]">
      <img className="w-16" src={Logo} />
      <div className="flex gap-3">{children}</div>
    </nav>
  );
}

export default Navbar;
