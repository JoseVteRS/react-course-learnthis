

import Input from '../ui/Input';
import style from './UsersListFilter.module.css';


const UsersListFilter = ({ search, setSearch, onlyActive, setOnlyActive, sortBy, setSortBy }) => {
    return (
        <>
            <form className={style.form} >
                <input className={style.input} type="text" value={search} onChange={ev => setSearch(ev.target.value)} />
                <div className={style.active} >
                    <input type="checkbox" checked={onlyActive} onChange={ev => setOnlyActive(ev.target.checked)} />
                    <span>Sólo activos</span>
                </div>

                <select value={sortBy} onChange={ev => setSortBy(ev.target.value)}>
                    <option value={0}>Por defecto</option>
                    <option value={1}>Por nombre</option>
                </select>

            </form>
            <Input />
            <Input error />
        </>

    )
}

export default UsersListFilter