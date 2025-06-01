import axios from "axios";

let apiUrl = import.meta.env.VITE_API_URL + '/users/files'

export async function newFile(file, parentId, setRefresh) {
    let data = new FormData()

    data.append('fileUpload', file)
    data.append('parentId', parentId)
    console.log(file);
    let req = await axios.post(apiUrl, data, {
        withCredentials: true
    })

    setRefresh(r => !r)
}
export async function deleteFile(fileId, setRefresh) {
    
    let url = apiUrl + `/${fileId}`

    let req = await axios.delete(url, {
        withCredentials: true
    })

    setRefresh(r => !r)
}

export async function renameFile(fileId, newName, setRefresh) {

    let url = apiUrl + `/${fileId}`
    let data = new URLSearchParams({newName})
    let req = await axios.patch(url, data, {
        withCredentials: true
    })

    setRefresh(r => !r)
    
}

export async function shareFile(fileId, usernameToShareWith, setRefresh) {

    let url = apiUrl + `/${fileId}`

    let data = new URLSearchParams({usernameToShareWith})

    let req = await axios.patch(url, data, {
        withCredentials: true
    })
    
    setRefresh(r => !r)
}

export async function moveFile(fileId, newParentId, setRefresh) {
    let url = apiUrl + `/${fileId}`

    let data = new URLSearchParams({newParentId})

    let req = await axios.patch(url, data, {
        withCredentials
    })

    setRefresh(r => !r)
}

export async function downloadFile(link, fileName) {
    let res = await axios.get(link, {
        responseType: 'blob'
    })
    let blob = res.data
    let blobUrl = URL.createObjectURL(blob)

    let docLink = document.createElement("a")

    docLink.href = blobUrl
    docLink.download = fileName

    docLink.click()

    URL.revokeObjectURL(blob)
    
}

export async function starFile(fileId, setRefesh) {

    let url = apiUrl + `/${fileId}`

    let data = new URLSearchParams({star: true})
    let req = await axios.patch(url, data, {withCredentials:true})

    setRefesh(r => !r)
}