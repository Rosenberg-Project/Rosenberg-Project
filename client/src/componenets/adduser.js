import React from 'react';
import { useState,useEffect } from 'react';
import '../adduser.css';
import Axios from 'axios';

const Adduser = () => {
    const [inAccount,inAccountset] = useState({userid: "", password: "", designation: ""});
    const [errors,seterrors] = useState({});
    const [isSubmit,setissubmit] = useState(false);
    
    const addaccount = (e) => {
        console.log(e.target.value);
        const {name,value} = e.target;
        inAccountset((preval)=>{
            return {
                ...preval,
                [name]:value.trim()
            }
        })
    };

    const validateinAccounts = (values) => {
        const errors = {};
        
        if(!values.userid){
            errors.userid = "User name is required"
        } 
        if(!values.password){
            errors.password = "Password is required"
        }
        if(values.designation==="--Select Role--"||!values.designation){
            errors.designation = "Designation is required"
        }
        return errors
    };

    const insertuser = (e) => {
        e.preventDefault();
        seterrors(validateinAccounts(inAccount));
        setissubmit(true);
        Axios.post("http://localhost:3001/insert", {insert: inAccount}).then((response) => {
            console.log(response);
            const errors = {};
            errors.server = (response.data);
            seterrors(errors);
        });
    };
  
    useEffect(() => {
        console.log(errors);
        if (Object.keys(errors).length === 0 && isSubmit) {
            console.log(inAccount);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);

     
    return (
        <div className='container'>
            <div className="form">
                <div className="input-container ic2">
                    <label className="label" >User ID:</label>
                    <input className="input" name='userid' placeholder='Enter user ID' value={inAccount.userid} onChange={addaccount}/>
                    <div className='error'>{errors.userid}</div>
                </div>
                <div className="input-container ic2">
                    <label className="label">Password</label>
                    <input className="input" name='password' placeholder='Enter user ID' value={inAccount.password} onChange={addaccount}/>
                    <div className='error'>{errors.password}</div>
                </div>
                <div className="input-container ic2">
                    <label className="label">Role</label>
                    <select className="input" name='designation' value={inAccount.designation} onChange={addaccount}>
                        <option defaultValue="--Select Role--">--Select Role--</option>
                        <option value="One">One</option>
                        <option value="Two">Two</option>
                        <option value="Three">Three</option>
                    </select>
                    <div className='error'>{errors.designation}</div>
                </div>
                <button className="submit" onClick={insertuser}>Add Account</button>
            </div>
        </div >
    )
}

export default Adduser