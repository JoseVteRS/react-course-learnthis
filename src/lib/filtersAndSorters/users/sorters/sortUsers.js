
export const sortUsers = (users, sortBy) => {
    const sortedUsers = [...users];

    switch (sortBy) {
        case 1:
            return sortedUsers.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            });
        default:
            return sortedUsers;
    }
};