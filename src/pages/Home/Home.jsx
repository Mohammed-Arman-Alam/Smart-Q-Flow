import React from 'react';
import { terminalRoles } from '../../data/terminalRoles';
import { Link } from 'react-router';

const Home = () => {
    return (
        <div className='pt-10 h-full py-8'>
            <h1 className='text-center text-4xl font-bold'>Smart Q Flow</h1>
            <h4 className='text-center text-xl text-[#00634180] my-4'>OPD Queue Managament System</h4>
            <h4 className='text-center text-2xl font-semibold mt-8 my-4'>Select Terminal Role</h4>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 clear-startjustify-around w-11/12 sm:w-10/12 mx-auto'>
                {
                    terminalRoles.map(terminalRole=>{
                         const Icon = terminalRole.icon;
                        return(
                            <Link key={terminalRole.id} to={terminalRole.route}>
                                <div  className='bg-white p-7 rounded-2xl hover:scale-105 border-2 border-transparent hover:border-[#006341] shadow lg:h-42'>
                                <Icon size={30}/>
                                <h2 className='text-xl font-semibold py-2'>{terminalRole.title}</h2>
                                <p className='text-sm text-[#00634190]'>{terminalRole.description}</p>
                            </div>
                            </Link>
                            
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Home;