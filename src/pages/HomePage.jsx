import LogOutButton from "../components/LogOutButton";
import SignInButton from "./../components/SignInButton";
import SignUpButton from "./../components/SignUpButton";
function HomePage() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#070F2B]">
      <div className="flex w-fit flex-col gap-10">
        <SignInButton />
        <SignUpButton />
      </div>
    </div>
  );
}
export default HomePage;
