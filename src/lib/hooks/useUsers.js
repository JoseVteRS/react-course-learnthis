import { useState } from "react"


export const useUsers = (initialUsers) => {
    const [users, setUsers] = useState(initialUsers);
    return { users }
}