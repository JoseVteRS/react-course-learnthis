import { useEffect, useState } from "react";
import { USER_ROLES } from "../../constants/userRoles";
import { useCreateForm } from "../../lib/hooks/useCreateForm";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import InputCheckbox from "../forms/InputCheckbox";
import InputText from "../forms/InputText";
import InputTextAsync from "../forms/InputTextAsync";
import Select from "../forms/Select";
import CrossIcon from "../icon/CrossIcon";
import style from "./UsersCreateForm.module.css";

const UsersCreateForm = ({ onClose }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { username, name, setName, setUsername } = useCreateForm();

	const isDisabled =
		!name.value ||
		name.error ||
		!username.value ||
		username.error ||
		username.loading ||
		isSubmitting;

	return (
		<div className={style.wrapper}>
			<form
				onSubmit={ev =>
					handleSubmit(ev, name, username, onClose, setIsSubmitting)
				}
			>
				<IconButton
					className={style.close}
					icon={CrossIcon}
					filled
					onClick={onClose}
				/>
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
						success={username.value && !username.loading && !username.error}
						value={username.value}
						error={username.error}
						loading={username.loading}
						onChange={ev => setUsername(ev.target.value)}
					/>
				</div>
				<div className={style.row}>
					<Select name='role'>
						<option value={USER_ROLES.TEACHER}>Profesor</option>
						<option value={USER_ROLES.STUDENT}>Alumno</option>
						<option value={USER_ROLES.OTHER}>Otro</option>
					</Select>
					<div className={style.active}>
						<InputCheckbox name='active' />
						<span>¿Activo?</span>
					</div>
					<Button kind='primary' type='submit' disabled={isDisabled}>
						{isSubmitting ? "Cargando" : "Crear usuario"}
					</Button>
				</div>
			</form>
		</div>
	);
};

const handleSubmit = async (ev, name, username, onClose, setIsSubmitting) => {
	ev.preventDefault();
	setIsSubmitting(true);

	const user = {
		id: crypto.randomUUID(),
		name: name.value,
		username: username.value,
		role: ev.target.role.value,
		active: ev.target.active.checked
	};

	const res = await fetch("http://localhost:4003/users", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(user)
	});

	if (res.ok) {
		// TODO: Actualizar los usuarios
		onClose();
		console.log("Usuario creado");
	} else {
		setIsSubmitting(false);
	}
};

export default UsersCreateForm;
