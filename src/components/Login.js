import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidation } from '../utils/CheckValidation'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/UserSlice';

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true)
    const [errorMessage, setErrorMessage] = useState()
    const navigate = useNavigate()
    const email = useRef()
    const password = useRef()
    const name = useRef()
    const dispatch = useDispatch()

    const toggleSignInForm = () => {
        setIsSignIn(!isSignIn);
    }

    const submitForm = () => {
        setErrorMessage(checkValidation(email.current.value, password.current.value))
        if (errorMessage) return
        if (!isSignIn) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user)
                    updateProfile(auth.currentUser, {
                        displayName: name.current.value
                    })
                        .then(() => {
                            const { uid, displayName, email } = user
                            dispatch(addUser({
                                uid: uid, displayName: displayName, email: email
                            }))
                            navigate('/browse')
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            setErrorMessage(errorMessage)
                        });
                })

        }
        else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log("Success")
                    navigate('/browse')
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode + " " + errorMessage)
                    setErrorMessage(errorMessage)
                });
        }
    }

    return (
        <div>
            <Header />
            <div className='login_img absolute'>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/058eee37-6c24-403a-95bd-7d85d3260ae1/e10ba8a6-b96a-4308-bee4-76fab1ebd6ca/IN-en-20240422-POP_SIGNUP_TWO_WEEKS-perspective_WEB_db9348f2-4d68-4934-b495-6d9d1be5917e_large.jpg' />
            </div>
            <form className='text-white absolute mx-auto right-0 left-0 bg-black p-8 w-3/12 my-24 bg-opacity-80' onSubmit={(e) => { e.preventDefault() }}>
                <h2 className='text-3xl font-bold mb-4'>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
                {!isSignIn && <div>
                    <input type='text' placeholder='Full Name' className='p-2 my-2 w-full bg-gray-800 text-sm' ref={name} />
                </div>}
                <div>
                    <input type='text' placeholder='Email and Phone number' className='p-2 my-2 w-full bg-gray-800 text-sm' ref={email} />
                </div>

                <div>
                    <input type='password' placeholder='Password' className='p-2 my-2 w-full bg-gray-800 text-sm' ref={password} />
                </div>
                <p className='text-red-600 text-bold text-xl py-2'>{errorMessage}</p>
                <button className='px-4 py-2 bg-red-700 w-full my-2 rounded-lg' onClick={submitForm}>{isSignIn ? 'Sign In' : 'Sign Up'}</button>
                <p className='text-center my-4'>{isSignIn ? 'New to netflix ?' : ''}</p>
                <button type='button' className='px-4 py-2 bg-gray-600 w-full my-2 rounded-lg  bg-opacity-70' onClick={toggleSignInForm}>{isSignIn ? 'Sign Up Now' : 'Already Registered'}</button>
            </form>
        </div>
    )
}

export default Login
