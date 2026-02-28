import { CookingPot, } from 'lucide-react';
import Image from 'next/image';

const Header=()=>{
    return(
        <nav className="">
            <div className="flex items-center justify-start text-white bg-center h-20 mt-5 w-[100vw]" >
                <img src="/logo.jpeg" alt="image" width="28%"/>
                <div className='flex flex-col'>
                    <h1 className='font-sans text-xl text-emerald-900'>Welcome</h1>
                    <h1 className='font-sans text-xl text-emerald-900'>Sri Madhavan Restaurant</h1>
                    <h1 className='font-sans text-xl text-emerald-900'>Kolathur, Chennai</h1>
                </div>
            </div>
        </nav>
    )
}

export default Header;

