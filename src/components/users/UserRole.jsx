import style from './UserRole.module.css'

const ROLES_STYLES = {
    teacher: ['Profesor', style.teacher],
    student: ['Estudiante', style.student],
    other: ['Otro', style.other],
}

const UserRole = ({ role }) => {
    const [roleName, roleClassName] = ROLES_STYLES[role] || ROLES_STYLES.other;
    return <span className={`${style.role} ${roleClassName}`}>{roleName}</span>
}

export default UserRole