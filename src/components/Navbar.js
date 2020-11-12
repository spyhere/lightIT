import React, { useContext } from 'react'
import { ReactComponent as Logo } from '../assets/lightIT.svg'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


export const Navbar = () => {

    const auth = useContext(AuthContext)

    const logOutHandler = () => {
        auth.logout()
    }


    const logButtons = auth.token ?
    // If logged in
    <li onClick={logOutHandler}><a className="auth__buttons">Log Out</a></li> :
    // If not authorized
    <>
      <li className="waves-effect waves-light"><NavLink className="auth__buttons" to="/auth/log">Log In</NavLink></li>
      <li className="waves-effect waves-light"><NavLink className="auth__buttons" to="/auth/reg">Register</NavLink></li>
    </>
    
    return (
        <nav>
        <div className="nav-wrapper deep-purple darken-4">

          {/* LOGO */}
          <a target="_blank" rel="noreferrer" href="https://light-it.net/" className="brand-logo center">
            <Logo className="logo" width="70%" fill='white'/>
          </a>

          {/* BUTTONS */}
          <ul className="right hide-on-med-and-down">
            <li className="waves-effect waves-light"><NavLink to="/catalog">Catalog</NavLink></li>
            {logButtons }
          </ul>
        </div>
      </nav>
    )
}