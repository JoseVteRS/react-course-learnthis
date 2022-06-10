import { useContext, useState } from "react";
import { USER_ROLES } from "../../constants/userRoles";
import { updateUser } from "../../lib/api/usersApi";
import { UserFormsContext } from "../../lib/context/UserFormsContext";
import { useEditForm } from "../../lib/hooks/useEditForm";
import Button from "../buttons/Button";
import InputCheckbox from "../forms/InputCheckbox";
import InputText from "../forms/InputText";
import InputTextAsync from "../forms/InputTextAsync";
import Select from "../forms/Select";

import style from "./UsersEditForm.module.css";

const UsersEditForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { currentUser, onSuccess } = useContext(UserFormsContext);

	const {
		username,
		name,
		role,
		active,
		setName,
		setUsername,
		setUserRole,
		setUserActive,
		isFormInvalid
	} = useEditForm(currentUser);

	return (
		<form
			onSubmit={ev =>
				handleSubmit(
					ev,
					{
						id: currentUser.id,
						name: name.value,
						username: username.value,
						role,
						active
					},
					setIsSubmitting,
					onSuccess
				)
			}
		>
			<div className={style.row}>
				<InputText
					className={style.input}
					label='Nombre'
					planceholder='John Doe'
					value={name.value}
					error={name.error}
					onChange={ev => setName(ev.target.value)}
				/>
				<InputTextAsync
					className={style.input}
					label='Username'
					planceholder='johndoe'
					success={
						username.value !== currentUser.username &&
						!username.loading &&
						!username.error
					}
					value={username.value}
					error={username.error}
					loading={username.loading}
					onChange={ev => setUsername(ev.target.value)}
				/>
			</div>
			<div className={style.row}>
				<Select value={role} onChange={ev => setUserRole(ev.target.value)}>
					<option value={USER_ROLES.TEACHER}>Profesor</option>
					<option value={USER_ROLES.STUDENT}>Alumno</option>
					<option value={USER_ROLES.OTHER}>Otro</option>
				</Select>
				<div className={style.active}>
					<InputCheckbox
						checked={active}
						onChange={ev => setUserActive(ev.target.checked)}
					/>
					<span>¿Activo?</span>
				</div>
				<Button
					kind='primary'
					type='submit'
					disabled={isFormInvalid || isSubmitting}
				>
					{isSubmitting ? "Cargando" : "Editar usuario"}
				</Button>
			</div>
		</form>
	);
};

const handleSubmit = async (ev, user, setIsSubmitting, onSuccess) => {
	ev.preventDefault();
	setIsSubmitting(true);

	const success = await updateUser(user);

	if (success) {
		onSuccess();
	} else {
		setIsSubmitting(false);
	}
};

export default UsersEditForm;
