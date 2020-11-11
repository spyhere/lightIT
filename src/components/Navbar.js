import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


export const Navbar = () => {

    const auth = useContext(AuthContext)

    const logOutHandler = () => {
        auth.logout()
    }

    const logButtons = auth.token ?
    <li className="teal" onClick={logOutHandler}><a>Log Out</a></li> :
    <>
      <li className="waves-effect"><NavLink to="/auth/log">Log In</NavLink></li>
      <li className="waves-effect"><NavLink to="/auth/reg">Register</NavLink></li>
    </>
    

    return (
        <nav>
        <div className="nav-wrapper teal lighten-2">
          <a target="_blank" href="https://light-it.net/" className="brand-logo center">
            <img className="logo" src="https://media-exp1.licdn.com/dms/image/C4E0BAQGbexZpfhLX8Q/company-logo_200_200/0?e=2159024400&v=beta&t=X3wlfZ2Lb3Vv8Y0Vp_r9u5xEezIbVDw3Ostk6J6SYYQ" alt=""/>
          </a>
          <ul className="right hide-on-med-and-down">
            <li className="waves-effect"><NavLink to="/catalog">Catalog</NavLink></li>
            {logButtons }
          </ul>
        </div>
      </nav>
    )
}