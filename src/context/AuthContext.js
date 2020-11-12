import { createContext } from 'react'

function empty() {

}

export const AuthContext = createContext({
    token: null,
    login: empty,
    logout: empty,
    catalog: [],
    updateCatalog: empty,
    link: ''
})