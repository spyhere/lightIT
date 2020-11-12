import React, { useEffect, useState, useCallback, useContext } from 'react'
import { useHTTP } from '../hooks/useHTTP'
import { useMessage } from '../hooks/useMessage'
import { Loader } from '../components/Loader'
import { ProductList } from '../components/ProductList'
import { AuthContext } from '../context/AuthContext'


export const CatalogPage = () => {
    const [catalog, setCatalog] = useState([])
    const { request, loading, error, clearError } = useHTTP()
    const { updateCatalog, link } = useContext(AuthContext)
    const message = useMessage()

    // Updating catalog list before mounting
    const newUpdCatalog = useCallback(async () => {
        try {
            let data = await request(link + 'api/products/')
            setCatalog(data)

            // Sending refreshed list to context
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

    // If HTTP request is done, catalog list is empty and we have error
    if (!catalog.length && !loading && error) {
        return (
            <div>
                <h2 className="center-align">No content</h2>
            </div>
        )
    }

    // If catalog list isn't empty render a list
    return (
        <div className="catalog">
              <ProductList {...{catalog}} />  
        </div>
    )
}