import {
	filterActiveUsers,
	filterUsersByName,
	paginateUsers,
	sortUsers
} from "../users/filterUsers";

export const getUsers = (
	initialUsers,
	{ search, onlyActive, sortBy, items, itemsPerPage }
) => {
	let usersFiltered = filterActiveUsers(initialUsers, onlyActive);
	usersFiltered = filterUsersByName(usersFiltered, search);
	usersFiltered = sortUsers(usersFiltered, sortBy);
	usersFiltered = paginateUsers(usersFiltered, items, itemsPerPage);

	return { users: usersFiltered };
};
