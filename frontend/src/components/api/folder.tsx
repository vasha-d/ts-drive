import axios from "axios"

let apiUrl = import.meta.env.VITE_API_URL

export async function renameFolder(folderId, newName, setRefresh) {
    let folderUrl = `${apiUrl}/users/folders/${folderId}`

    let req = await axios.patch(folderUrl, {
        newName
    }, {
        withCredentials: true
    })
    setRefresh(r => !r)
}
export async function shareFolder(folderId, usernameToShareWith, setRefresh) {
    let folderUrl = `${apiUrl}/users/folders/${folderId}`

    let req = await axios.patch(folderUrl,
        {usernameToShareWith},
        {withCredentials: true}
    )
    
    setRefresh(r => !r)
}
export async function deleteFolder(folderId, setRefresh) {
    let folderUrl = `${apiUrl}/users/folders/${folderId}`

    let req = await axios.delete(folderUrl, {
        withCredentials: true
    })
    setRefresh(r => !r)
}
export async function newFolder(folderName, parentId, setRefresh) {
    let url = apiUrl + `/users/folders`
    let data = new URLSearchParams({
        folderName,
        parentId    
    })
    let req = await axios.post (url, data, {
        withCredentials: true
    })

    setRefresh(r => !r)
    
}

export async function moveFolder(folderId, newParentId, setRefresh) {

    let url = apiUrl + `/users/folders/${folderId}`
    let data = new URLSearchParams({newParentId})

    let req = await axios.patch(url, data, {withCredentials: true})

    setRefresh(r => !r)
}

export async function starFolder(folderId, setRefresh) {

    let url = apiUrl + `/users/folders/${folderId}`
    let data = new URLSearchParams({star: true})
    let req = await axios.patch(url, data, {withCredentials:true})

    setRefresh(r => !r)
}


export async function setFolderColor(folderId, newColor, setRefresh) {

    let url = apiUrl + `/users/folders/${folderId}`
    let data = new URLSearchParams({newColor: newColor})
    let req = await axios.patch(url, data, {withCredentials:true})

    setRefresh(r => !r)
}