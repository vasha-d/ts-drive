import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles  from '../../css/auth.module.css'
import logo from '../../assets/logo.png'

const SignIn = () => {
  let location = useLocation()
  console.log(location.pathname);
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
    function signInAsSample(e) {
        e.preventDefault()
        async function postUser() {
            let url = `${import.meta.env.VITE_API_URL}/auth/sign-in`
            let data = new URLSearchParams({
                username: 'Sample User',
                password: 'sampleuserpassword'
            })

            let req = await axios.post(url, data, {withCredentials: true})

            if (req.status == 200) {
                console.log(req)
                navigate('/drive')
            }
        }
        postUser()
    }
    function goRegister() {
        navigate('/auth/create-account')
    }
    console.log('rendering signin');
    return (
        <div className={styles.page}>
         
            <div className={styles.formWrapper}>
              
                <form className={styles.createAccForm}action="">
                    <div className={styles.logo}>
                        <img src={logo} alt="" />
                        ovur.drive
                        </div>
                    <div className={styles.nameForm}>
                        <label htmlFor="username">Enter username</label>
                        <input type="text" name="username" id="username"
                         value={username} onChange={handleUsernameChange}
                         />
                        {/* {takenError} */}
                    </div>
                    <div className={styles.passwordForm}>
                        <label htmlFor="password">Enter password</label>
                        <input type="password" name="password" id="password"
                         value={password} onChange={handlePasswordChange}
                         />
                    </div>
              
                    <div className={styles.formButtons}>
                        <button className={styles.createButton} onClick={handleSubmit}>Sign in</button>
                        <div className={styles.seperate}>Or</div>
                        <button className={styles.signInButton} onClick={goRegister}>Go to register</button>
                    </div>
                </form>
            </div>
            <div className={styles.sampleUserMsg}>
                P.S - <span onClick={signInAsSample}className={styles.sampleUser}>Click here</span> to sign in as a sample user
            </div>
            
        </div>
    );
}

export default SignIn;
