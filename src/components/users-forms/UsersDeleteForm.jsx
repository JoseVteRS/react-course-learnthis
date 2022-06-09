import { useState } from "react";
import { USER_ROLES } from "../../constants/userRoles";
import { createUser, deleteUserById, updateUser } from "../../lib/api/usersApi";
import { useEditForm } from "../../lib/hooks/useEditForm";
import Button from "../buttons/Button";
import InputCheckbox from "../forms/InputCheckbox";
import InputText from "../forms/InputText";
import InputTextAsync from "../forms/InputTextAsync";
import Select from "../forms/Select";

import style from "./UsersDeleteForm.module.css";

const UsersDeleteForm = ({ onSuccess, user, onCancel }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<form
			onSubmit={ev => handleSubmit(ev, user.id, setIsSubmitting, onSuccess)}
		>
			<div className={style.row}>
				<p className={style.text}>
					¿Estás seguro de que quieres eliminar al usuario "{user.name}"?
				</p>
			</div>
			<div className={style.row}>
				<Button
					kind='secondary'
					type='button'
					disabled={isSubmitting}
					onClick={onCancel}
				>
					{isSubmitting ? "Cargando..." : "Cancelar"}
				</Button>
				<Button kind='primary' type='submit' disabled={isSubmitting}>
					{isSubmitting ? "Eliminando..." : "Elimanar usuario"}
				</Button>
			</div>
		</form>
	);
};

const handleSubmit = async (ev, userId, setIsSubmitting, onSuccess) => {
	ev.preventDefault();
	setIsSubmitting(true);

	const success = await deleteUserById(userId);

	if (success) {
		onSuccess();
	} else {
		setIsSubmitting(false);
	}
};

export default UsersDeleteForm;
