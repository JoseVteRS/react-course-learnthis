import GridIcon from "../icon/GridIcon";
import Listicon from "../icon/Listicon";
import style from "./UserListViewSelector.module.css";

const UserListViewSelector = ({ view, setView }) => {
	return (
		<div className={style.wrapper}>
			<button onClick={() => setView(false)} disabled={!view}>
				<GridIcon className={style.icon} />
			</button>

			<div className={style.divider} />

			<button onClick={() => setView(true)} disabled={view}>
				<Listicon className={style.icon} />
			</button>
		</div>
	);
};

export default UserListViewSelector;
