import { useState } from "react";
import { USER_FORMS } from "../../constants/usersForms";

export const useSelectedForm = () => {
	const [currentForm, setCurrentForm] = useState({ form: USER_FORMS.FILTER });

	const setFiltersForm = () => setCurrentForm({ form: USER_FORMS.FILTER });
	const setCreateForm = () => setCurrentForm({ form: USER_FORMS.CREATE });
	const setEditForm = user => setCurrentForm({ form: USER_FORMS.EDIT, user });
	const setDeleteForm = user =>
		setCurrentForm({ form: USER_FORMS.DELETE, user });

	return {
		currentForm: currentForm.form,
		currentUser: currentForm.user,
		setFiltersForm,
		setCreateForm,
		setEditForm,
		setDeleteForm
	};
};
