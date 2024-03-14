import { Role } from "../../models/user.model";
import HeaderButton from "../HeaderButton";
interface ChildProps {
  role: Role;
}
function SecondHeaderButton({ role }: ChildProps) {
  switch (role) {
    case Role.GENERALIST:
    case Role.DERMATOLOGIST:
      return (
        <HeaderButton info={{ navLink: "/messages", label: "Messagerie" }} />
      );
  }
  return null;
}

export default SecondHeaderButton;
