import React, { useContext } from "react";
import UserRole from "./UserRole";
import UserStatus from "./UserStatus";
import style from "./UserRow.module.css";
import UserDisplay from "./UserDisplay";
import IconButton from "../buttons/IconButton";
import TrashIcon from "../icon/TrashIcon";
import PencilIcon from "../icon/PencilIcon";
import { UserFormContext } from "../../lib/context/UserFormContext";

const UserRow = ({ id, username, name, active, role }) => {
	const { setDeleteForm, setEditForm } = useContext(UserFormContext);

	return (
		<div className={style.wrapper}>
			<div className={style.name}>
				<UserDisplay name={name} username={username} />
			</div>
			<div className={style.status}>
				<UserStatus active={active} />
			</div>
			<div className={style.role}>
				<UserRole role={role} />
			</div>
			<div className={style.action}>
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
	);
};

export default UserRow;
