import SearchIcon from "../icon/SearchIcon";
import style from "./InputSearch.module.css";

const InputSearch = ({ className, ...props }) => {
	return (
		<div className={`${style.wrapper} ${className || ""}`}>
			<SearchIcon className={style.icon} />
			<input {...props} type='text' className={style.input}></input>
		</div>
	);
};

export default InputSearch;
