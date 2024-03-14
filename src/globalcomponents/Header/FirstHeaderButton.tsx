import { Role } from "../../models/user.model";
import HeaderButton from "../HeaderButton";

interface ChildProps {
  role: Role;
}
function FirstHeaderButton({ role }: ChildProps) {
  switch (role) {
    case Role.PATIENT:
    case Role.GENERALIST:
    case Role.DERMATOLOGIST:
      return (
        <HeaderButton
          info={{ navLink: "/my-requests", label: "Mes Consultations" }}
        />
      );
    default:
      break;
  }
}

export default FirstHeaderButton;
