import { Link } from "react-router-dom"
import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'
 

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />, index => <User index={index} />)
            : null

        content = (
            <div className='conatiner'>
                <div className='add_btn mt-2'>
                    <Link to='/dash/users/new' className='btn btn-primary'>Add user</Link>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr className='table-dark'>
                            <th scope="col" className="text-center">Sr. No.</th>
                            <th scope="col" className="text-center">Username</th>
                            <th scope="col" className="text-center">Roles</th>
                            <th scope="col" className="text-center">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </div>

        )
    }

    return content
}
export default UsersList