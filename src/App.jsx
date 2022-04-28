import UserList from "./components/users/UserList";

const USERS = [
	{
		username: "jose",
		name: "Jose Vte Ripoll",
		active: true,
		role: "other"
	},
	{
		username: "alba",
		name: "Alba Soriano Cano",
		active: true,
		role: "teacher"
	},
	{
		username: "mar",
		name: "Mar Aranda León",
		active: false,
		role: "student"
	},
	{
		username: "pepita",
		name: "Maria Pepita de las Flores Roja",
		active: false,
		role: "teacher"
	},
	{
		username: "noname",
		name: "No Name",
		active: true,
		role: "other"
	}
];

function App() {
	return <UserList initialUsers={USERS} />;
}

export default App;
