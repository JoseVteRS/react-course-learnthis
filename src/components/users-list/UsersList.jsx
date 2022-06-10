import { useFilters, useUsers } from "../../lib/hooks";

import UsersListFilter from "./UsersListFilter";
import UsersListRows from "./UsersListRows";
import UserListPagination from "./UserListPagination";
import UserFormsProvider from "../providers/UsersFormProvider";
import UserLayoutContainer from "../users-forms/UserLayoutContainer";
import style from "./UsersList.module.css";
import UserListViewSelector from "./UserListViewSelector";
import { useState } from "react";

const UsersList = () => {
	const [showRowsFormat, setShowRowsFormat] = useState(true);
	const { filters, filtersSetters, paginationSetters, resetFilters } =
		useFilters();

	const { users, totalUsers, usersError, usersLoading } = useUsers(filters);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>

			<UserFormsProvider resetFilters={resetFilters}>
				<UsersListFilter
					search={filters.search}
					onlyActive={filters.onlyActive}
					sortBy={filters.sortBy}
					{...filtersSetters}
				/>
				<UserLayoutContainer />
				<UserListViewSelector
					showRowsFormat={showRowsFormat}
					setShowRowsFormat={setShowRowsFormat}
				/>
				<UsersListRows
					users={users}
					error={usersError}
					loading={usersLoading}
					view={showRowsFormat}
				/>
			</UserFormsProvider>
			<UserListPagination
				page={filters.page}
				itemsPerPage={filters.itemsPerPage}
				{...paginationSetters}
				totalUsers={totalUsers}
			/>
		</div>
	);
};

export default UsersList;
