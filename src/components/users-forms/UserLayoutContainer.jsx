import { useContext } from "react";
import { USER_FORMS } from "../../constants/usersForms";
import { UserFormsContext } from "../../lib/context/UserFormsContext";
import IconButton from "../buttons/IconButton";
import CrossIcon from "../icon/CrossIcon";
import style from "./UserLayoutContainer.module.css";
import UsersCreateForm from "./UsersCreateForm";
import UsersDeleteForm from "./UsersDeleteForm";
import UsersEditForm from "./UsersEditForm";

const FORMS = {
	[USER_FORMS.CREATE]: <UsersCreateForm />,
	[USER_FORMS.EDIT]: <UsersEditForm />,
	[USER_FORMS.DELETE]: <UsersDeleteForm />
};

const UserLayoutContainer = () => {
	const { currentForm, setFiltersForm } = useContext(UserFormsContext);

	const form = FORMS[currentForm];

	if (!form) return null;

	return (
		<div className={style.wrapper}>
			<IconButton
				className={style.close}
				icon={CrossIcon}
				filled
				onClick={setFiltersForm}
			/>
			{form}
		</div>
	);
};

export default UserLayoutContainer;
