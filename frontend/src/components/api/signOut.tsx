import axios from "axios";

let apiUrl = import.meta.env.VITE_API_URL + '/auth/sign-out'


export default async function apiSignOut() {
    console.log('running');
    let signOut = await axios.post(apiUrl, {}, {
        withCredentials: true
    })

    console.log(signOut, 'ended');
    window.location.reload()
    return signOut
}