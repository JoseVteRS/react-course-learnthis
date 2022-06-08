import IconButton from "../buttons/IconButton";
import CrossIcon from "../icon/CrossIcon";
import style from "./UserFormLayout.module.css";

const UserFormLayout = ({ onClose, children }) => {
	return (
		<div className={style.wrapper}>
			<IconButton
				className={style.close}
				icon={CrossIcon}
				filled
				onClick={onClose}
			/>
			{children}
		</div>
	);
};

export default UserFormLayout;
