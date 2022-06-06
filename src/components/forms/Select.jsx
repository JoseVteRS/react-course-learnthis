import ArrowDownIcon from "../icon/ArrowDownIcon";
import style from "./Select.module.css";

const Select = ({ className, ...props }) => {
	return (
		<div className={`${style.wrapper} ${className || ""}`}>
			<select {...props} className={style.select}></select>
			<ArrowDownIcon className={style.arrow} />
		</div>
	);
};

export default Select;
