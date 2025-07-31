import axios from "axios"
import { useEffect, useState } from "react"

let apiUrl = import.meta.env.VITE_API_URL + '/auth/me'


export default function useGetSelf() {
    let [user, setUser] = useState('')
    let [error, setError] = useState('')
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getSelf(params) {
            
            let res = await axios.get(apiUrl, {withCredentials: true})
            setUser(res.data)
        }
        
        getSelf()
    }, [])
    
    return {user, error, loading}
}


