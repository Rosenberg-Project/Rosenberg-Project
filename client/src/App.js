
import 'bootstrap/dist/css/bootstrap.min.css';
import './adduser.css'
import { Routes, Route } from 'react-router-dom'

import Navbaar from './componenets/navbaar';
import Home from './componenets/home';
import Registeredit from './componenets/adduser';
import Login from './featurers/login';
//import About from "./About"
//<Route path="about" element={ <About/> } />
function App() {
  return (
    <>
      <Navbaar />
      <Routes>
        <Route exact path="login" element={<Login />} />
        <Route exact path="home" element={<Home />} />
        <Route exact path="register" element={<Registeredit />} />
      </Routes>
    </>
  );
};
//<>
// 
// <Routes>
//   

// </Routes>
//</>

export default App;
