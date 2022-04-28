import UserList from "./components/users/UserList";
import { USER_ROLES } from "./constants/userRoles";

const USERS = [
	{
		username: "jose",
		name: "Jose Vte Ripoll",
		active: true,
		role: USER_ROLES.OTHER
	},
	{
		username: "alba",
		name: "Alba Soriano Cano",
		active: true,
		role: USER_ROLES.TEACHER
	},
	{
		username: "mar",
		name: "Mar Aranda León",
		active: false,
		role: USER_ROLES.STUDENT
	},
	{
		username: "pepita",
		name: "Maria Pepita de las Flores Roja",
		active: false,
		role: USER_ROLES.TEACHER
	},
	{
		username: "noname",
		name: "No Name",
		active: true,
		role: USER_ROLES.OTHER
	}
];

function App() {
	return <UserList initialUsers={USERS} />;
}

export default App;
