import LogOutButton from "../components/LogOutButton";
import AppointmentButton from "../components/AppointmentButton";
import UserAppointmentsButton from "../components/UserAppoitmentsButton";
import Navbar from "../components/Navbar";
import hero from "../assets/hero.png";
function UserPanel() {
  return (
    <div className="flex h-screen  w-full bg-[#070F2B] flex-col">
      <Navbar>
        <AppointmentButton />
        <LogOutButton
          backgroundColor="bg-transparent"
          textColor="text-black"
          hoverColor="hover:text-red-200"
        />
        <UserAppointmentsButton
          backgroundColor="bg-transparent"
          textColor="text-black"
          hoverColor="hover:text-red-200"
        />
      </Navbar>
      <img className="h-screen w-screen" src={hero} />
    </div>
  );
}
export default UserPanel;
