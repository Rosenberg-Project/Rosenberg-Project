import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

const User = ({ userId, index }) => {
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <tr>
                <td className={`text-center ${cellStatus}`}>{index + 1}</td>
                <td className={`text-center ${cellStatus}`}>{user.username}</td>
                <td className={`text-center ${cellStatus}`}>{userRolesString}</td>
                <td className={`text-center ${cellStatus}`}>
                    <button
                        class="btn btn-primary"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default User