import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useHTTP } from '../hooks/useHTTP'
import { useMessage } from '../hooks/useMessage'
import { AuthContext } from '../context/AuthContext'


const link = 'http://smktesting.herokuapp.com/api/'

export const AuthPage = ({match}) => {
    const { loading, error, request, clearError } = useHTTP()
    const auth = useContext(AuthContext)
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
            let response = await request(link + 'login/', 'POST', form)
            auth.login(response)
            message('Successfully logged in')
            setTimeout(() => history.push('/catalog'), 500)
            
        } catch(e) {
            message(e.message)
        }
    }

    const registerHandler = async () => {
        try {
            let response = await request(link + 'register/', 'POST', form)
            message(response.message)
            setForm({
                username: "", password: ""
            })
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