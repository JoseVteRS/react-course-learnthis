import { useEffect, useState } from "react";
import {
	filterActiveUsers,
	filterUsersByName,
	paginateUsers,
	sortUsers
} from "../users/filterUsers";

const fetchUsers = async (setUsers, signal) => {
	try {
		const res = await fetch("http://localhost:4003/users", { signal: signal });
		if (res.ok) {
			const data = await res.json();
			setUsers(data);
		}
		// ERROR
	} catch (error) {
		// ERROR
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

	useEffect(() => {
		const controller = new AbortController();
		fetchUsers(setUsers, controller.signal);
		return () => controller.abort();
	}, []);

	const { paginatedUsers, totalPages } = getUsersToDisplay(users, filters);

	return { users: paginatedUsers, totalPages };
};
