import {
	filterActiveUsers,
	filterUsersByName
} from "../../lib/filtersAndSorters/users/filters";
import { sortUsers } from "../../lib/filtersAndSorters/users/sorters";
import { useFilters, useUsers } from "../../lib/hooks";
import UsersListFilter from "./UsersListFilter";
import UsersListRows from "./UsersListRows";
import style from "./UserList.module.css";

const UserList = ({ initialUsers }) => {
	const { search, onlyActive, sortBy, ...setFilterFunctions } = useFilters();
	const { users } = useUsers(initialUsers);

	let usersFiltered = filterActiveUsers(users, onlyActive);
	usersFiltered = filterUsersByName(usersFiltered, search);
	usersFiltered = sortUsers(usersFiltered, sortBy);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<UsersListFilter
				search={search}
				onlyActive={onlyActive}
				sortBy={sortBy}
				{...setFilterFunctions}
			/>
			<UsersListRows users={usersFiltered} />
		</div>
	);
};

export default UserList;
