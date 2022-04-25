export const filterActiveUsers = (users, active) => {
    if (!active) return [...users];

    return users.filter(user => user.active);
}