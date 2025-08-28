import axios from "axios";

let apiUrl = import.meta.env.VITE_API_URL + '/users/files'
export async function newFile(file, parentId, setRefresh) {
    let data = new FormData()

    data.append('fileUpload', file)
    data.append('parentId', parentId)
    console.log(file);
    try {  
        let req = await axios.post(apiUrl, data, {
            withCredentials: true
        })
    } catch (error) {
        console.log(error);
    }

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
    console.log(req, url);
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

    let data = new URLSearchParams({id: fileId, newParentId})

    let req = await axios.patch(url, data, {
        withCredentials: true
    })

    setRefresh(r => !r)
}

export async function downloadFile(id) {

    let reqLink = apiUrl + `/download/` + id
    let data = new URLSearchParams({id})
    console.log(reqLink);

    let req = await axios.get(reqLink, {
        params: data,
        withCredentials: true
    })
    let link = req.data
    const element = document.createElement('a')
    element.href = link
    element.click()

    element.remove()
    
    console.log(req.data);
  
}

export async function starFile(fileId, setRefesh) {

    let url = apiUrl + `/${fileId}`

    let data = new URLSearchParams({star: true})
    let req = await axios.patch(url, data, {withCredentials:true})

    setRefesh(r => !r)
}