



import axios from 'axios';
import React, { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL

export function useGetFolder() {
    const [currentFolderId, setCurrentFolderId] = useState('drive')
    const [folder, setFolder] = useState({})
    const [loading, setLoading] = useState({})
    const [error, setError] = useState('')
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {

        async function getFolder() {
            try {
                
                let url = `${apiUrl}/users/folders/${currentFolderId}`
                console.log('running get', url);
                let req = await axios.get(url, {
                    withCredentials: true
                })
                let folderObj = req.data
                setFolder(folderObj)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }

        }

        getFolder()

    }, [refresh, currentFolderId])
    return {loading, folder, error, setRefresh, setCurrentFolderId}
}

