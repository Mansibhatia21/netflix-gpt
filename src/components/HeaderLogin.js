import React from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const HeaderLogin = () => {
    const navigate = useNavigate()

    const handleSignIn = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch((error) => {
            navigate('/error')
        });
    }

    return (
        <div className='flex justify-around mt-3'>
            <div className='bg-gradient-to-tr from-black px-5 py-2 z-10'>
                <img src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' className='w-44' />
            </div>
            <div className=''>
                <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded' onClick={handleSignIn}>
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default HeaderLogin