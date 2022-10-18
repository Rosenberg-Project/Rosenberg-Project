import React from 'react';
import '../accesstable.css';
import Axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Readrow from './readrow';
import Editablerow from './editablerow';

const Home = () => {

    const [userlist, setuserlist] = useState([]); 
    const [editAccount, editAccountset] = useState({
        userid: "",
        password: "",
        designation: ""
    });

    useEffect(() => {
        Axios.get("http://localhost:3001/retrieve").then((response) => {
            console.log(response);
            setuserlist(response.data);
        });
    }, []);

    //delete user server connection
    const deleteuser = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
            console.log(response);
        });
    };

    //edit button toggle
    const [editselectid, seteditselectid] = useState(null);

    const handledit = (e, val) => {
        e.preventDefault();
        seteditselectid(val._id);

        const fromvalues = {
            userid: val.user_ID,
            password: val.password_ID,
            designation: val.designation_ID
        };
        editAccountset(fromvalues);
        
    };
     console.log(editAccount)
    // handle cancel

    const cancelclick = () => {
        seteditselectid(null)
    }

    //update form function
   
    const editaddaccount = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        const { name, value } = e.target;
        editAccountset((preval) => {
            return {
                ...preval,
                [name]: value.trim()
            }
        })
    };

    const insertuser = (e, id) => {
        e.preventDefault();
        console.log(id)
        Axios.put("http://localhost:3001/update", { idedit: id, newaccounts: editAccount }).then((response) => {
            console.log(response);
        });
    };

    


    return (
        <div className='conatiner'>
            <div className='add_btn mt-2'>
                <NavLink to='/register' className='btn btn-primary'>Add user</NavLink>
            </div>
            <form>
                <table className="table table-hover">
                    <thead>
                        <tr className='table-dark'>
                            <th className='text-center' scope="col">Sr. No.</th>
                            <th className='text-center' scope="col">User ID</th>
                            <th className='text-center' scope="col">Password</th>
                            <th className='text-center' scope="col">Designation</th>
                            <th className='text-center' scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userlist.map((val, index) => (
                                <Fragment>
                                    {editselectid === val._id ? (
                                        <Editablerow val={val} index={index} editAccount={editAccount} editaddaccount={editaddaccount} insertuser={insertuser} cancelclick={cancelclick} />
                                    ) : (
                                        <Readrow val={val} index={index} handledit={handledit} deleteuser={deleteuser} />
                                    )}
                                </Fragment>
                            ))
                        }
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default Home