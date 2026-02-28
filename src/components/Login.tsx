"use client";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { handleClickModel } from '@/types';

interface LoginProps {
    emailID?: string | undefined;
    password?: string | undefined;
}

const LoginPage = ({handleClick}:handleClickModel) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLogin, setLogin] = useState<LoginProps>();
    const [error, setError] = useState<string | null>(null);

    const changeHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setError('');
        const {name, value} = e.target;
        setLogin({...isLogin, [name]:value})
    };

    const handleSignIn= async()=>{
        setError('');
        if (isLogin?.emailID ===undefined || isLogin?.password ===undefined) {
            setError('Email and Password are required.');
            return;
        }
        if(isLogin?.emailID ==='vivek' && isLogin?.password ==='admin'){
            // await dispatch(adminLogin(true));
            await localStorage.setItem('dashboard', 'true');
            router.push("/admin");
        } else {
            // await dispatch(adminLogin(false));
            // localStorage.setItem('dashboard', 'false');
            setError('Please enter valid credentials');
            return;
        }
    }


    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="space-y-4 md:space-y-6">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Username</label>
                    <input type="email" name="emailID" id="email" onChange={changeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="enter your username" />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600 ">Password</label>
                    <input type="password" onChange={changeHandler} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button 
                    onClick={handleSignIn}
                    className="w-full text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >Sign in</button>

            </div>
        </div>
    )
}
export default LoginPage;