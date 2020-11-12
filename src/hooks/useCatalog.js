import { useCallback, useState } from 'react'

export const useCatalog = () => {
    const [catalog, setCatalog] = useState([])

    const updateCatalog = useCallback(catalog => {
       if (catalog.length) setCatalog(catalog)
    }, [setCatalog])
    return { catalog, updateCatalog }
}