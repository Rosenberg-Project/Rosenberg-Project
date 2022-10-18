import React from 'react'

const Editablerow = ({ val, index, editAccount, editaddaccount, insertuser, cancelclick }) => {
    return (
        <tr>
            <th className='text-center' scope="row">{index + 1}</th>
            <td className='text-center'>
                <input className='form-control'
                    type='text'
                    required='required'
                    placeholder='Enetr new user'
                    name='userid'
                    value={editAccount.userid}
                    onChange={editaddaccount}
                ></input>
            </td>
            <td className='text-center'>
                <input className='form-control'
                    type='text'
                    required='required'
                    placeholder='Enetr new password'
                    name='password'
                    value={editAccount.password}
                    onChange={editaddaccount}
                ></input>

            </td>
            <td className='text-center'>
                <select className="form-select" name='designation' value={editAccount.designation} onChange={editaddaccount}>
                    <option defaultValue="--Select Role--">--Select Role--</option>
                    <option value="One">One</option>
                    <option value="Two">Two</option>
                    <option value="Three">Three</option>
                </select>
            </td>
            <td className='d-flex justify-content-between'>
                <button className='btn btn-primary' onClick={(e) => insertuser(e, val._id)}>Update</button>
                <button className='btn btn-primary' onClick={cancelclick}>Cancel</button>
            </td>
        </tr>
    )
}

export default Editablerow
