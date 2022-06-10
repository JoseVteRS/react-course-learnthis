import { useContext, useState } from "react";
import { deleteUserById } from "../../lib/api/usersApi";
import { UserFormsContext } from "../../lib/context/UserFormsContext";
import Button from "../buttons/Button";
import style from "./UsersDeleteForm.module.css";

const UsersDeleteForm = ({ onSuccess }) => {
	const { setFiltersForm, currentUser } = useContext(UserFormsContext);
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<form
			onSubmit={ev =>
				handleSubmit(ev, currentUser.id, setIsSubmitting, onSuccess)
			}
		>
			<div className={style.row}>
				<p className={style.text}>
					¿Estás seguro de que quieres eliminar al usuario "{currentUser.name}"?
				</p>
			</div>
			<div className={style.row}>
				<Button
					kind='secondary'
					type='button'
					disabled={isSubmitting}
					onClick={setFiltersForm}
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
