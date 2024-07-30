import Navbar from "../components/Navbar";
import SignInButton from "./../components/SignInButton";
import SignUpButton from "./../components/SignUpButton";
import hero from "../assets/hero.png";

function HomePage() {
  return (
    <div className="flex h-screen w-full bg-[#070F2B] flex-col">
      <Navbar>
        <SignInButton />
        <SignUpButton />
      </Navbar>
      <img className="h-screen w-screen" src={hero} />
    </div>
  );
}
export default HomePage;
