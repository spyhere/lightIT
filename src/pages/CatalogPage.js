import React, { useEffect, useState, useCallback, useContext } from 'react'
import { useHTTP } from '../hooks/useHTTP'
import { useMessage } from '../hooks/useMessage'
import { Loader } from '../components/Loader'
import { ProductList } from '../components/ProductList'
import { AuthContext } from '../context/AuthContext'


export const CatalogPage = () => {
    const [catalog, setCatalog] = useState([])
    const { request, loading, error, clearError } = useHTTP()
    const { updateCatalog } = useContext(AuthContext)
    const message = useMessage()

    
    const newUpdCatalog = useCallback(async () => {
        try {
            let data = await request('http://smktesting.herokuapp.com/api/products/')
            setCatalog(data)
            updateCatalog(data)
        } catch(e) {
            message(e.message)
        }
    }, [request, setCatalog, updateCatalog])

    useEffect(() => {
        newUpdCatalog()
        return () => clearError()
    }, [newUpdCatalog])

    if (loading) {
        return <Loader />
    }

    if (!catalog.length && !loading && error) {
        return (
            <div>
                <h1 className="center-align">No content</h1>
            </div>
        )
    }

    return (
        <div className="catalog">
              <ProductList {...{catalog}} />  
        </div>
    )
}