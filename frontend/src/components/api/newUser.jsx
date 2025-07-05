import axios from "axios";


async function postNewUser(username, password) {
    let link = `${import.meta.env.VITE_API_URL}/users/`
    let data = new URLSearchParams({username, password})

    try {
        
        let req = await axios.post(link, data)
        return 'success'
    } catch (error) {
        console.log(error.response);
        if (error.response?.data.error == 'Username not available') {
            return 'Username not available'
        }
        return error
    }

    
}


export default postNewUser