import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbaar = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav mb-2 gap-2">
          <li>
            <NavLink to='/home' className="btn btn-outline-secondary" href="#">Home</NavLink>
          </li>
          <li>
            <NavLink to='/register' className="btn btn-outline-secondary" href="#">Register</NavLink>
          </li>
          <li>
            <NavLink to='/login' className="btn btn-outline-secondary" href="#">Login</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbaar
