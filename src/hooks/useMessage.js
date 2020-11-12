import { useCallback } from 'react'
import M from 'materialize-css'

export const useMessage = () => {
    return useCallback(text => {
        if (window.M && text) {
            M.toast({html: text})
        }
    }, [] )
}