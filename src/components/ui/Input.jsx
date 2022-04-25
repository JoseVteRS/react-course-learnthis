import style from './Input.module.css';

const Input = ({ error }) => {
    return (
        <div>
            <label className={style.label}>Label</label>
            <input className={`${style.input} ${error && style.error}`} type='text' placeholder="Placeholder..." />
            {
                error && <span className={style.errorMessage} >Error</span>
            }
        </div>
    )
}

export default Input