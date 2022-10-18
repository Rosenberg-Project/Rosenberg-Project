import React from 'react'
import { useState, useEffect } from 'react';
import '../adduser.css'
import Axios from 'axios'

const Login = () => {
    const [logindata, setlogindata] = useState({ userid: "", password: "" });
    const [errors, seterrors] = useState({});
    const [isSubmit, setissubmit] = useState(false);

    const loginaddaccount = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setlogindata((preval) => {
            return {
                ...preval,
                [name]: value.trim()
            }
        })
    };

    const validateinAccounts = (values) => {
        const errors = {};

        if (!values.userid) {
            errors.userid = "User name is required"
        }
        if (!values.password) {
            errors.password = "Password is required"
        }
        return errors
    };

    const login = (e) => {
        e.preventDefault();
        seterrors(validateinAccounts(logindata));
        setissubmit(true);
        Axios.post("http://localhost:3001/singinauthentication", {response: logindata}).then((response) => {
            console.log(response);
            const errors = {};
            errors.server = (response.data);
            seterrors(errors);
        });
    };

    useEffect(() => {
        console.log(errors);
        if (Object.keys(errors).length === 0 && isSubmit) {
            console.log(logindata);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);


    return (
        <div className='container'>
            <div className="form">
                <div className="input-container ic2">
                    <label className="label" >User ID:</label>
                    <input className="input" type='text' name='userid' placeholder='Enter user ID' value={logindata.userid} onChange={loginaddaccount} />
                    <div className='error'>{errors.userid}</div>
                </div>
                <div className="input-container ic2">
                    <label className="label">Password</label>
                    <input className="input" type='password' name='password' placeholder='Enter user ID' value={logindata.password} onChange={loginaddaccount} />
                    <div className='error'>{errors.password}</div>
                </div>
                <button className="submit" onClick={login}>Sign In</button>
            </div>
        </div >
    )
}

export default Login