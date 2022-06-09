import { useEffect, useState } from "react";
import { useFilters, useUsers } from "../../lib/hooks";
import UsersListFilter from "./UsersListFilter";
import UsersListRows from "./UsersListRows";
import style from "./UserList.module.css";
import UserListPagination from "./UserListPagination";
import Button from "../buttons/Button";
import { getUsersToDisplay } from "../../lib/users/filterUsers";
import { USER_FORMS } from "../../constants/usersForms";
import UsersCreateForm from "../users-forms/UsersCreateForm";
import UserFormLayout from "../users-forms/UserFormLayout";
import UsersEditForm from "../users-forms/UsersEditForm";
import UsersDeleteForm from "../users-forms/UsersDeleteForm";
import { useSelectedForm } from "../../lib/hooks/useSelectedForm";
import { UserFormContext } from "../../lib/context/UserFormContext";

const UserList = () => {
	const {
		currentForm,
		currentUser,
		setFiltersForm,
		setCreateForm,
		setEditForm,
		setDeleteForm
	} = useSelectedForm();

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
					{currentForm === USER_FORMS.DELETE && (
						<UsersDeleteForm
							onSuccess={onSuccess}
							onCancel={setFiltersForm}
							user={currentUser}
						/>
					)}
				</UserFormLayout>
			)}
			<UserFormContext.Provider value={{ setEditForm, setDeleteForm }}>
				<UsersListRows
					users={paginatedUsers}
					error={usersError}
					loading={usersLoading}
				/>
			</UserFormContext.Provider>
			<UserListPagination
				{...pagination}
				{...paginationSetters}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default UserList;
