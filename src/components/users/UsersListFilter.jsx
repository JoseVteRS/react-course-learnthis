import InputCheckbox from "../forms/InputCheckbox";
import InputSearch from "../forms/InputSearch";
import Select from "../forms/Select";
import style from "./UsersListFilter.module.css";

const UsersListFilter = ({
	search,
	setSearch,
	onlyActive,
	setOnlyActive,
	sortBy,
	setSortBy
}) => {
	return (
		<>
			<div className={style.form}>
				<div className={style.row}>
					<InputSearch
						placeholder='Buscar...'
						value={search}
						onChange={ev => setSearch(ev.target.value)}
					/>

					<Select
						value={sortBy}
						onChange={ev => setSortBy(Number(ev.target.value))}
					>
						<option value={0}>Por defecto</option>
						<option value={1}>Por nombre</option>
						<option value={2}>Por role</option>
						{/* <option value={3} disabled={onlyActive}>Por activación</option> */}
						{!onlyActive && <option value={3}>Por activo</option>}
					</Select>
				</div>

				<div className={style.row}>
					<div className={style.active}>
						<InputCheckbox
							className={style.checkbox}
							checked={onlyActive}
							onChange={ev => setOnlyActive(ev.target.checked)}
						/>
						<p>Mostrar sólo activos</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default UsersListFilter;
