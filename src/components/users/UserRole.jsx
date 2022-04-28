import { USER_ROLES } from "../../constants/userRoles";
import style from "./UserRole.module.css";

const ROLES_STYLES = {
	[USER_ROLES.TEACHER]: ["Profesor", style.teacher],
	[USER_ROLES.STUDENT]: ["Estudiante", style.student],
	[USER_ROLES.OTHER]: ["Otro", style.other]
};

const UserRole = ({ role }) => {
	const [roleName, roleClassName] = ROLES_STYLES[role] || ROLES_STYLES.other;
	return <span className={`${style.role} ${roleClassName}`}>{roleName}</span>;
};

export default UserRole;
