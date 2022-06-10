import { useContext } from "react";
import { UserFormsContext } from "../../lib/context/UserFormsContext";
import UserRole from "../user/UserRole";
import UserDisplay from "../user/UserDisplay";
import UserStatus from "../user/UserStatus";
import TrashIcon from "../icon/TrashIcon";
import PencilIcon from "../icon/PencilIcon";
import IconButton from "../buttons/IconButton";
import style from "./UserCard.module.css";

const UserCard = ({ id, username, name, active, role }) => {
	const { setDeleteForm, setEditForm } = useContext(UserFormsContext);

	return (
		<div className={style.wrapper}>
			<div className={style.card}>
				<div className={style.name}>
					<UserDisplay name={name} username={username} />
				</div>
				<div className={style.info}>
					<UserRole role={role} />
					<UserStatus active={active} />
					<div className={style.actions}>
						<IconButton
							icon={PencilIcon}
							onClick={() => setEditForm({ id, username, name, active, role })}
						/>
						<IconButton
							icon={TrashIcon}
							kind='red'
							onClick={() => setDeleteForm({ id, name })}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
