import { useEffect, useState } from "react";
import {
	filterActiveUsers,
	filterUsersByName,
	paginateUsers,
	sortUsers
} from "../users/filterUsers";

const fetchUsers = async (setData, setError, signal) => {
	try {
		const res = await fetch("http://localhost:4003/users", { signal: signal });
		if (res.ok) {
			const data = await res.json();
			setData(data);
		} else {
			setError();
		}
	} catch (error) {
		setError();
	}
};

const getUsersToDisplay = (
	users,
	{ search, onlyActive, sortBy, page, itemsPerPage }
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

export const useUsers = filters => {
	const [users, setUsers] = useState({
		data: [],
		error: false,
		loading: true
	});

	const setData = newData =>
		setUsers({ data: newData, loading: false, error: false });
	const setError = () => setUsers({ data: [], loading: false, error: true });

	useEffect(() => {
		const controller = new AbortController();
		fetchUsers(setData, setError, controller.signal);
		return () => controller.abort();
	}, []);

	const { paginatedUsers, totalPages } = getUsersToDisplay(users.data, filters);

	return {
		users: paginatedUsers,
		totalPages,
		error: users.error,
		loading: users.loading
	};
};
