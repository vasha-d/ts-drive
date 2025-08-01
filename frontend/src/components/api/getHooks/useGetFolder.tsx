



import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL
import type { errObj, FolderObj, GetFolderResult } from '../../../types/main';

export function useGetFolder(defId='drive'): GetFolderResult {
    const [currentFolderId, setCurrentFolderId] = useState<number | string>(defId)
    const [folder, setFolder] = useState<FolderObj | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<errObj>({message: '', status: undefined})
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {

        async function getFolder() {
            try {
                
                const url = `${apiUrl}/users/folders/${currentFolderId}`
                const req = await axios.get(url, {
                    withCredentials: true
                })
                const folderObj: FolderObj = req.data
                setFolder(folderObj)
                setLoading(false)
            } catch (error:unknown) {
                let errObj : errObj;
                if (error instanceof AxiosError) {
                    errObj = {
                        message: error.message,
                        status: error.status 
                    }
                } else if (error !== null && error !== undefined) {
                    errObj = {
                        message: error.toString(),
                        status: undefined
                    }
                } else {
                    errObj = {
                        message: 'Unknown error',
                        status: undefined
                    }
                }
                setError(errObj)
                setLoading(false)
            }
        }

        getFolder()

    }, [refresh, currentFolderId])
    return {loading, folder, error, setRefresh, setCurrentFolderId}
}

