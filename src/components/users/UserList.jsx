import { filterActiveUsers, filterUsersByName } from "../../lib/filtersAndSorters/users/filters";
import { sortUsers } from "../../lib/filtersAndSorters/users/sorters";
import { useFilters, useUsers } from "../../lib/hooks"
import UsersListFilter from "./UsersListFilter";
import UsersListRows from "./UsersListRows";
import style from './UserList.module.css'
import Button from "../ui/Button";

const UserList = ({ initialUsers }) => {
    const { search, onlyActive, sortBy, ...setFilterFunctions } = useFilters();
    const { users } = useUsers(initialUsers);

    let usersFiltered = filterActiveUsers(users, onlyActive);
    usersFiltered = filterUsersByName(usersFiltered, search);
    usersFiltered = sortUsers(usersFiltered, sortBy);

    return (
        <div className={style.wrapper}>
            <h1>Listado de usuarios</h1>
            <UsersListFilter
                search={search}
                onlyActive={onlyActive}
                sortBy={sortBy}
                {...setFilterFunctions}
            />
            <Button type='primary' >Botón</Button>
            <Button type='secondary' >Botón</Button>
            <Button type='secondary' disabled  >Botón</Button>
            <UsersListRows users={usersFiltered} />
        </div>
    )
}

export default UserList