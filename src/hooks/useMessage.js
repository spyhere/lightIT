import { useCallback } from 'react'

export const useMessage = () => {
    return useCallback(text => {
        if (window.M && text) {
            M.toast({html: text})
        }
    } 
    )
}