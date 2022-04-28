import CheckIcon from "../icon/CheckIcon";
import style from "./Checkbox.module.css";

const Checkbox = ({ label }) => {
	return (
		<>
			<div className={style.controlGroup}>
				<label className={`${style.control} ${style["control-checkbox"]}`}>
					<input className={style.checkbox} type='checkbox' />
					<div className={style.control_indicator}></div>
					{/* <CheckIcon className={style.control_indicator} /> */}
					{label && <span>{label}</span>}
				</label>
			</div>
		</>
	);
};

export default Checkbox;
