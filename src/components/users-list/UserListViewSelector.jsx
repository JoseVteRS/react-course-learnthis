import GridIcon from "../icon/GridIcon";
import Listicon from "../icon/Listicon";
import style from "./UserListViewSelector.module.css";

const UserListViewSelector = ({ showRowsFormat, setShowRowsFormat }) => {
	return (
		<div className={style.wrapper}>
			<button
				onClick={() => setShowRowsFormat(false)}
				disabled={!showRowsFormat}
			>
				<GridIcon className={style.icon} />
			</button>

			<div className={style.divider} />

			<button onClick={() => setShowRowsFormat(true)} disabled={showRowsFormat}>
				<Listicon className={style.icon} />
			</button>
		</div>
	);
};

export default UserListViewSelector;
