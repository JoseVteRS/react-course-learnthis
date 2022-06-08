import { useEffect, useState } from "react";
import { findUserByUsername } from "../api/usersApi";
import { debounce } from "../debounce";
import { validateName, validateUsername } from "../users/usersValidation";

export const useEditForm = user => {
	const [formValues, setFormValues] = useState({
		name: {
			value: user.name,
			error: undefined
		},
		username: {
			value: user.username,
			loading: false,
			error: undefined
		},
		role: user.role,
		active: user.active
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

	const setUserRole = newRole => ({
		...formValues,
		role: newRole
	});

	const setUserActive = newActive => ({
		...formValues,
		active: newActive
	});

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
		if (!formValues.username.loading) return;

		const controller = new AbortController();
		const timeOutId = setTimeout(() => {
			validateUsernameIsAvailable(
				formValues.username.value,
				setUsernameError,
				controller.signal
			);
		}, 500);

		return () => {
			controller.abort();
			clearTimeout(timeOutId);
		};
	}, [formValues.username.value, formValues.username.loading]);

	const isFormValid =
		!formValues.name.value ||
		formValues.name.error ||
		!formValues.username.value ||
		formValues.username.error ||
		formValues.username.loading;

	return {
		...formValues,
		setName,
		setUsername,
		setUserRole,
		setUserActive,
		isFormValid
	};
};

const validateUsernameIsAvailable = async (
	username,
	setUsernameError,
	signal
) => {
	const { user, error, abort } = findUserByUsername(username, signal);

	if (abort) return;
	if (error) return setUsernameError("Error al validar");

	setUsernameError(user ? "Ya está en uso" : undefined);
};
