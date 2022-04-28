export const filterUsersByName = (users, search) => {
	if (!search) return [...users];

	const lowerCasedSearch = search.toLowerCase();

	console.log(lowerCasedSearch);

	return users.filter(user =>
		user.name.toLowerCase().includes(lowerCasedSearch)
	);
};
