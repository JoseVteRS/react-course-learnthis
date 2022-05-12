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
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
				</Select>
				<p>Elementos por página</p>
			</div>
			<PageSelector page={page} totalPages={totalPages} setPage={setPage} />
		</div>
	);
};

export default UserListPagination;
