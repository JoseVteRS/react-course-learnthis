import { useEffect, useState } from "react";
import { debounce } from "../debounce";
import { validateName, validateUsername } from "../users/usersValidation";

const validateUsernameIsAvailable = async (
	username,
	setUsernameError,
	signal
) => {
	let error;

	try {
		const res = await fetch(
			`http://localhost:4003/users?username=${username}`,
			{ signal }
		);
		if (res.ok) {
			const data = await res.json();
			if (data.length) error = "Ya está en uso";
		} else {
			error = "Error al validar";
		}
	} catch (error) {
		if (error.name === "AbortError") return;
		error = "Error al validar";
	}

	setUsernameError(error);
};

export const useCreateForm = () => {
	const [formValues, setFormValues] = useState({
		name: {
			value: "",
			error: undefined
		},
		username: {
			value: "",
			loading: false,
			error: undefined
		}
	});

	const setName = newName => {
		const error = validateName(newName);
		setFormValues({
			...formValues,
			name: { value: newName, error }
		});
	};

	const setUsername = newUsername => {
		const error = validateUsername(newUsername);
		setFormValues({
			...formValues,
			username: { value: newUsername, loading: !error, error }
		});
	};

	const setUsernameError = error =>
		setFormValues(prevFormValues => ({
			...prevFormValues,
			username: {
				value: prevFormValues.username.value,
				error,
				loading: false
			}
		}));

	useEffect(() => {
		if (formValues.username.loading) {
			const controller = new AbortController();

			const timeOutId = setTimeout(() => {
				validateUsernameIsAvailable(
					formValues.username.value,
					setUsernameError,
					controller.signal
				);
			}, 500);

			return () => {
				clearTimeout(timeOutId);
				controller.abort();
			};
		}
	}, [formValues.username.value, formValues.username.loading]);

	return { ...formValues, setName, setUsername };
};
