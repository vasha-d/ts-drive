import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate()
    function handleUsernameChange (e) {
        setUsername(e.target.value)

    }
    
    function handlePasswordChange (e) {
        setPassword(e.target.value)
        console.log(username, password)
    }

    function handleSubmit (e) {
        e.preventDefault()
        async function postUser() {
            let url = `${import.meta.env.VITE_API_URL}/auth/sign-in`
            let data = new URLSearchParams({
                username,
                password
            })

            let req = await axios.post(url, data, {withCredentials: true})

            if (req.status == 200) {
                console.log(req)
                navigate('/drive')
            }
        }
        postUser()
    }
    return (
        <div>
            <form action="">
                <label htmlFor="username">Enter username</label>
                <input type="text" name="username" id="username"
                 value={username} onChange={handleUsernameChange}
                 />

                <label htmlFor="password">Enter password</label>
                <input type="password" name="password" id="password"
                 value={password} onChange={handlePasswordChange}
                 />

                <button onClick={handleSubmit}>Sign in</button>
            </form>
            
        </div>
    );
}

export default SignIn;
