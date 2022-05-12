import { useEffect, useState } from "react";
import {
	filterActiveUsers,
	filterUsersByName,
	paginateUsers,
	sortUsers
} from "../users/filterUsers";

const fetchUsers = async (setUsers, setError, setLoading, signal,) => {
	try {
		const res = await fetch("http://localhost:4003/users", { signal: signal });
		if (res.ok) {
			const data = await res.json();
			setUsers(data);
		} else {
			setError(true);
		}
	} catch (error) {
		setError(true);
	} finally {
		setLoading(false);
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
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const controller = new AbortController();
		fetchUsers(setUsers, setError, setLoading, controller.signal);
		return () => controller.abort();
	}, []);

	const { paginatedUsers, totalPages } = getUsersToDisplay(users, filters);

	return { users: paginatedUsers, totalPages, error, loading };
};
