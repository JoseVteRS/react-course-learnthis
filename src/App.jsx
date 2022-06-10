import { useState } from "react";

// import UsersList from "./components/users-list/UsersList.jsx";
// const App = () => <UsersList />;
// export default App;

const App = () => {
	const [value, setValue] = useState(0);
	const [step, setStep] = useState(1);
	const [ticks, setTicks] = useState(0);

	const handleIncrement = () => {
		setValue(value + step);
		setTicks(ticks + 1);
	};

	const handleDecrement = () => {
		setValue(value - step);
		setTicks(ticks + 1);
	};

	const handleAddStep = () => {
		setStep(step + 1);
	};

	const handleReset = () => {
		setValue(0);
		setStep(1);
		setTicks(0);
	};

	return (
		<div>
			<h1>{value}</h1>
			<h2>Step: {step}</h2>
			<h2>Ticks: {ticks}</h2>
			<div>
				<button onClick={handleIncrement}>Incrementar</button>
				<button onClick={handleDecrement}>Decrementar</button>
			</div>
			<div>
				<button onClick={handleAddStep}>Incrementar step</button>
				<button onClick={handleReset}>Reiniciar</button>
			</div>
		</div>
	);
};

export default App;
