import { useEffect } from "react"

export const useTimeOut = (callback : () => void, delay : number) => {
    useEffect(() => {
        const timer = setTimeout(callback, delay);
        return () => clearTimeout(timer);
    }, [callback, delay])
}

export default useTimeOut;