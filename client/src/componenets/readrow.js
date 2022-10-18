import React from 'react'

const Readrow = ({ val, index, handledit, deleteuser }) => {
    return (
        <tr>
            <th className='text-center' scope="row">{index + 1}</th>
            <td className='text-center'>{val.user_ID}</td>
            <td className='text-center'>{val.password_ID}</td>
            <td className='text-center'>{val.designation_ID}</td>
            <td className='d-flex justify-content-between'>
                <button className='btn btn-primary' onClick={(e) => handledit(e, val)}>Edit</button>
                <button className='btn btn-danger' onClick={() => deleteuser(val._id)}>Delete</button>
            </td>

        </tr>
    )
}

export default Readrow

 