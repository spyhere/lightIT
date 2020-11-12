import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useHTTP } from '../hooks/useHTTP'
import { useMessage } from '../hooks/useMessage'
import { AuthContext } from '../context/AuthContext'



export const AuthPage = ({match}) => {
    const { request } = useHTTP()
    const { login, link } = useContext(AuthContext)
    const message = useMessage()
    const history = useHistory()
    const operation = match.params.auth

    const [form, setForm] = useState({
        username: "", password: ""
    })


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }


    const loginHandler = async () => {
        try {
            let response = await request(link + 'api/login/', 'POST', form)
            login(response)
            message('Successfully logged in')

            // Redirect to catalog page after successful login in 0.5s
            setTimeout(() => history.push('/catalog'), 500)
        } catch(e) {
            message(e.message)
        }
    }

    
    const registerHandler = async () => {
        try {
            let response = await request(link + 'api/register/', 'POST', form)
            message(response.message)
            setForm({
                username: "", password: ""
            })

            // Redirecting to login page after successful registration
            history.push('/auth/log')
        } catch(e) {
            message(e.message)
        }
    }

    return (
        <div className="container authorization">
            <div className="row">
                <div className="input-field col s8 offset-s2">
                    <input 
                    id="last_name"
                    name="username" 
                    type="text" 
                    className="validate"
                    value={form.username}
                    onChange={changeHandler}/>
                    <label htmlFor="last_name">Name</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s8 offset-s2">
                    <input 
                    id="password" 
                    name="password"
                    type="password" 
                    className="validate"
                    value={form.password}
                    onChange={changeHandler}/>
                    <label htmlFor="password">Password</label>
                </div>
            </div>
            <div className="row center-align section">

                {/* Dependency on route 'auth/log' or 'auth/reg' */}
                {operation === 'log' &&
                <button 
                className="btn waves-effect blue lighten-1" 
                style={{marginRight: "10px"}}
                onClick={loginHandler}
                disabled={!form.username || !form.password}
                >Login</button>
                }
                
                {operation === 'reg' && 
                <button 
                className="btn waves-effect blue darken-4"
                onClick={registerHandler}
                disabled={!form.username || !form.password}
                >Register</button>
                }
                
            </div>
        </div>
    )
}