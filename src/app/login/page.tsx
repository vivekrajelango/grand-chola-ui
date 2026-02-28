"use client";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChevronsRight } from 'lucide-react';
import { PAGE_LAYOUT } from '@/constants/constants';
import LoaderComponent from '@/components/common/Loader';
import { AppState } from '@/store/reducers';
import LoginPage from '@/components/Login';

const Login = () => {
    const [isPage, setPage] = useState('login');

    const clickHandler=(item:string)=>{
        setPage(item);
        // setPending(isPending);
    };


    useEffect(()=>{
        setPage(isPage);
    },[isPage]);
    
    // bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]

    return (
        <section className="flex h-[100vh] w-[100vw] m-0 p-0 bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="flex flex-col w-[100%] items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className='flex flex-row justify-center items-center h-[100px]'>
                        <ChevronsRight size={48} className='flex flex-row items-center text-emerald-600' />
                        <span className='text-3xl text-emerald-600 font-mono'>Admin</span>
                    </div>
                    <hr/>
                    <LoginPage handleClick={clickHandler}/>
            </div>
            </div>
        </section>
    )
}
export default Login;