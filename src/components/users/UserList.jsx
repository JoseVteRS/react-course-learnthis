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
import {
	filterActiveUsers,
	filterUsersByName,
	paginateUsers,
	sortUsers
} from "../../lib/users/filterUsers";
import UserFormLayout from "../users-forms/UserFormLayout";
import UsersEditForm from "../users-forms/UsersEditForm";

const UserList = () => {
	const {
		currentForm,
		currentUser,
		setFiltersForm,
		setCreateForm,
		setEditForm,
		setDeleteForm
	} = useForm();

	console.log(currentUser);

	const {
		filters,
		pagination,
		filtersSetters,
		paginationSetters,
		resetFilters
	} = useFilters();

	const { users, usersError, usersLoading, reloadUsers } = useUsers(filters);

	const { paginatedUsers, totalPages } = getUsersToDisplay(
		users,
		filters,
		pagination
	);

	const onSuccess = () => {
		reloadUsers();
		resetFilters();
		setFiltersForm();
	};

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			{currentForm === USER_FORMS.FILTER ? (
				<UsersListFilter
					{...filters}
					{...filtersSetters}
					slot={
						<Button kind='primary' onClick={setCreateForm}>
							Añadir usuario
						</Button>
					}
				/>
			) : (
				<UserFormLayout onClose={setFiltersForm}>
					{currentForm === USER_FORMS.CREATE && (
						<UsersCreateForm onSuccess={onSuccess} />
					)}
					{currentForm === USER_FORMS.EDIT && (
						<UsersEditForm onSuccess={onSuccess} user={currentUser} />
					)}
				</UserFormLayout>
			)}

			<UsersListRows
				users={paginatedUsers}
				error={usersError}
				loading={usersLoading}
				setEditForm={setEditForm}
				setDeleteForm={setDeleteForm}
			/>
			<UserListPagination
				{...pagination}
				{...paginationSetters}
				totalPages={totalPages}
			/>
		</div>
	);
};

const getUsersToDisplay = (
	users,
	{ search, onlyActive, sortBy },
	{ page, itemsPerPage }
) => {
	let usersFiltered = filterActiveUsers(users, onlyActive);
	usersFiltered = filterUsersByName(usersFiltered, search);
	usersFiltered = sortUsers(usersFiltered, sortBy);

	const { totalPages, paginatedUsers } = paginateUsers(
		usersFiltered,
		page,
		itemsPerPage
	);

	return { paginatedUsers, totalPages };
};

const useForm = () => {
	const [currentForm, setCurrentForm] = useState({ form: USER_FORMS.FILTER });

	const setFiltersForm = () => setCurrentForm({ form: USER_FORMS.FILTER });
	const setCreateForm = () => setCurrentForm({ form: USER_FORMS.CREATE });
	const setEditForm = user => setCurrentForm({ form: USER_FORMS.EDIT, user });
	const setDeleteForm = user =>
		setCurrentForm({ form: USER_FORMS.DELETE, user });

	return {
		currentForm: currentForm.form,
		currentUser: currentForm.user,
		setFiltersForm,
		setCreateForm,
		setEditForm,
		setDeleteForm
	};
};

export default UserList;
