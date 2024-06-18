import LogOutButton from "../components/LogOutButton";
import AppointmentButton from "../components/AppointmentButton";
import UserAppointmentsButton from "../components/UserAppoitmentsButton";

function UserPanel() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#070F2B]">
      <div className="flex w-fit flex-col gap-10">
        <AppointmentButton />
        <LogOutButton />
        <UserAppointmentsButton />
      </div>
    </div>
  );
}
export default UserPanel;
