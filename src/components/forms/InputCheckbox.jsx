import CheckIcon from "../icon/CheckIcon";
import style from "./InputCheckbox.module.css";

const InputCheckbox = ({ className, ...props }) => {
	return (
		<label className={`${style.label} ${className || ""}`}>
			<input className={style.input} type='checkbox' {...props} />
			<CheckIcon className={style.check} />
		</label>
	);
};

export default InputCheckbox;
