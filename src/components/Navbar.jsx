import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <div className="shadow bg-[#006341]">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between sm:w-11/12 ">
                <a href="/" className="text-2xl font-bold tracking-tight text-white hover:scale-105">Smart Q Flow</a>
                <div className="flex items-center gap-4 text-md font font-semibold">
                    <Link><button className='border border-black p-1 px-2 rounded-md bg-white hover:text-[#006341] hover:scale-110'>Login</button></Link>
                    <Link><button className='border border-black p-1 px-2 rounded-md bg-white hover:text-[#006341] hover:scale-110'>Register</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

