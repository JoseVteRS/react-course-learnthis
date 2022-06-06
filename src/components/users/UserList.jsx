import { useEffect, useState } from "react";
import { useFilters, useUsers } from "../../lib/hooks";
import UsersListFilter from "./UsersListFilter";
import UsersListRows from "./UsersListRows";
import style from "./UserList.module.css";
import UserListPagination from "./UserListPagination";
import Button from "../buttons/Button";
import InputText from "../forms/InputText";
import InputTextAsync from "../forms/InputTextAsync";
import { USER_FORMS } from "../../constants/usersForms";
import UsersCreateForm from "../users-forms/UsersCreateForm";

const UserList = () => {
	const { currentForm, setFiltersForm, setCreateForm } = useForm();
	const {
		filters,
		setSearch,
		setOnlyActive,
		setSortBy,
		setPage,
		setItemsPerPage
	} = useFilters();

	const { users, totalPages, error, loading } = useUsers(filters);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			{currentForm === USER_FORMS.FILTER ? (
				<UsersListFilter
					search={filters.search}
					onlyActive={filters.onlyActive}
					sortBy={filters.sortBy}
					setSearch={setSearch}
					setOnlyActive={setOnlyActive}
					setSortBy={setSortBy}
					slot={
						<Button kind='primary' onClick={setCreateForm}>
							Añadir usuario
						</Button>
					}
				/>
			) : (
				<UsersCreateForm onClose={setFiltersForm} />
			)}

			<UsersListRows users={users} error={error} loading={loading} />
			<UserListPagination
				page={filters.page}
				itemsPerPage={filters.itemsPerPage}
				setPage={setPage}
				setItemsPerPage={setItemsPerPage}
				totalPages={totalPages}
			/>
		</div>
	);
};

const useForm = () => {
	const [currentForm, setCurrentForm] = useState(USER_FORMS.FILTER);

	const setFiltersForm = () => setCurrentForm(USER_FORMS.FILTER);
	const setCreateForm = () => setCurrentForm(USER_FORMS.CREATE);
	const setEditForm = () => setCurrentForm(USER_FORMS.EDIT);
	const setDeleteForm = () => setCurrentForm(USER_FORMS.DELETE);

	return {
		currentForm,
		setFiltersForm,
		setCreateForm,
		setEditForm,
		setDeleteForm
	};
};

export default UserList;
