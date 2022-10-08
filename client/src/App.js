import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './adduser.css'

function App() {

  const [inAccount,inAccountset] = useState({userid:"", password:"",designation:""});
  const [errors,seterrors] = useState({});
  const [isSubmit,setissubmit] = useState(false);
  const addaccount = (e) => {
    console.log(e.target.value);
    const {name,value} = e.target;
    inAccountset((preval) => {
      return {
        ...preval,
        [name]: value
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
    Axios.post("http://localhost:3001/insert", {insertidpassword: inAccount}).then((response) => {
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

  const [userlist,setuserlist] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/retrieve").then((response) => {
      console.log(response);
      setuserlist(response.data);
    });
  }, []);


  return (
    <div className='container'>
      <div className='container1'>
        <form>
          <h2>Add User</h2>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label" >User ID:</label>
            <input type="text" className="form-control" placeholder='Enter user ID' value={inAccount.userid} onChange={addaccount}/>
            <div className='error'>{errors.userid}</div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" placeholder='Password' value={inAccount.password} onChange={addaccount}/>
            <div className='error'>{errors.password}</div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Role</label>
            <select className="form-select" value={inAccount.designation} onChange={addaccount}>
              <option defaultValue={'--Select Role--'}>--Select Role--</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <div className='error'>{errors.designation}</div>
          </div>
          <button className="btn btn-primary" onClick={insertuser}>Add Account</button>
        </form>
      </div>  
      <br/>
      <br/>
      <br/>
      <br/>
      
      <div className='container2'>
        <h2>Application Users</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr. No.</th>
              <th scope="col">User ID</th>
              <th scope="col">Password</th>
              <th scope="col">Role</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td><button type="button" className="btn btn-primary btn-sm">Edit</button></td>
              <td><button type="button" className="btn btn btn-danger btn-sm">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>  
  );
};

export default App;
