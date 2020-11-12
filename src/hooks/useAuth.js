import { useState, useEffect, useCallback } from 'react'


export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(null)

    const login = useCallback(data => {
        setToken(data.token)
        localStorage.setItem('token', JSON.stringify(data))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        localStorage.removeItem('token')
    }, [])


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('token'))
        if (data && data.token) {
            login(data)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, ready }
}