import React, { useEffect } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import { useRoutes } from './routes'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'
import { useCatalog } from './hooks/useCatalog'
import { Loader } from './components/Loader'
import { Navbar } from './components/Navbar'
import './app.css'
import 'materialize-css'


function App() {
    const { login, logout, token, ready } = useAuth()
    const routes = useRoutes()

    const { catalog, updateCatalog } = useCatalog()
    const link = 'http://smktesting.herokuapp.com/'

    if (!ready) {
        return <Loader />
    }


    return(
        <AuthContext.Provider value={{
            token, login, logout, catalog, updateCatalog, link
        }}>
            <Router>
                <Navbar />
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App