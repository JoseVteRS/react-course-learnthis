import { UserFormContext } from "../../lib/context/UserFormContext";
import { useSelectedForm } from "../../lib/hooks/useSelectedForm";

const UserFormsProvider = ({ reloadUsers, resetFilters, children }) => {
	const { setFiltersForm, ...restSelectedForm } = useSelectedForm();
	const onSuccess = () => {
		reloadUsers();
		resetFilters();
		setFiltersForm();
	};

	<UserFormContext.Provider
		value={{
			setFiltersForm,
			onSuccess,
			...restSelectedForm
		}}
	>
		{children}
	</UserFormContext.Provider>;
};

export default UserFormsProvider;
