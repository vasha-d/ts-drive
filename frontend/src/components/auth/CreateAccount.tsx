import React, { useState } from 'react';
import postNewUser from '../api/newUser';
import { useNavigate } from 'react-router-dom';
import styles  from '../../css/auth.module.css'
import logo from '../../assets/logo.png'
import axios from 'axios';
const CreateAccount = () => {

    
    let navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameTakenError, setUsernameTakenError] = useState(false)
    function handleUsernameChange (e) {
        setUsername(e.target.value)

    }
    
    function handlePasswordChange (e) {
        setPassword(e.target.value)
        console.log(username, password)
    }

    function handleSubmitCreate (e) {
        e.preventDefault()

        async function createUser() {
            let response = await postNewUser(username, password)
            console.log(response);
            if (response == 'Username not available') {
                setUsernameTakenError(true)
            } else {
                navigate('/auth/sign-in')
            }
        }
        createUser()

    }
    function goToSignIn(e) {
        e.preventDefault()

        navigate('/auth/sign-in')
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
    let takenError = usernameTakenError ? <div className={styles.error}>Username already taken!</div> : null
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
                        {takenError}
                    </div>
                    <div className={styles.passwordForm}>
                        <label htmlFor="password">Enter password</label>
                        <input type="password" name="password" id="password"
                         value={password} onChange={handlePasswordChange}
                         />
                    </div>
                
                    <div className={styles.formButtons}>
                        <button className={styles.createButton} onClick={handleSubmitCreate}>Create account</button>
                        <div className={styles.seperate}>Or</div>
                        <button className={styles.signInButton} onClick={goToSignIn}>Sign in</button>
                    </div>
                </form>
            </div>
            <div className={styles.sampleUserMsg}>
                P.S - <span onClick={signInAsSample}className={styles.sampleUser}>Click here</span> to sign in as a sample user
            </div>
        </div>
        
    );
}

export default CreateAccount;
