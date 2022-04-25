import style from './Button.module.css'

const BUTTON_TYPE = {
    primary: style.buttonPrimary,
    secondary: style.buttonSecondary
}

const Button = ({ children, type, ...rest }) => {

    return (
        <button className={`${style.button} ${BUTTON_TYPE[type]}`} {...rest} >{children}</button>
    )
}

export default Button