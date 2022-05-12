import Select from "../forms/Select";
import IconButton from "../buttons/IconButton";
import style from "./UserListPagination.module.css";
import SearchIcon from "../icon/SearchIcon";
import PageSelector from "../icon/PageSelector";

const UserListPagination = ({
	page,
	itemsPerPage,
	setPage,
	setItemsPerPage,
	totalPages
}) => {
	return (
		<div className={style.wrapper}>
			<div className={style.itemsPerPage}>
				<Select
					value={itemsPerPage}
					onChange={ev => setItemsPerPage(Number(ev.target.value))}
				>
					<option value={1}>UNO</option>
					<option value={2}>DOS</option>
					<option value={3}>TRES</option>
				</Select>
				<p>Elementos por página</p>
			</div>
			<IconButton kind='red' filled icon={SearchIcon}></IconButton>
			<PageSelector page={page} totalPages={totalPages} setPage={setPage} />
		</div>
	);
};

export default UserListPagination;
