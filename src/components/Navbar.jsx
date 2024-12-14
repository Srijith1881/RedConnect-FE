import { CircleX, ShieldQuestion, User2, Menu, BadgeHelp, CircleUserRound } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = (navigateTo) => {
        navigate(navigateTo);
        setMobileMenuOpen(false);
    };

    return (
        <>
            <div className="w-full h-[4rem] flex justify-center items-center bg-[#ffe7cd] shadow-sm shadow-white rounded-sm">
                <div className="w-[80%] h-full flex justify-between items-center">
                    <div className='flex items-center font-bold text-xl text-red-600'>
                        RedConnect
                    </div>

                    {/* menu for larger screens */}
                    <div className="hidden md:flex space-x-4">
                        <button className='flex items-center space-x-2 h-9 px-4 text-red-600 font-bold border-red-600 hover:text-red-700' onClick={() => navigate("/login")}>
                            <CircleUserRound className='h-9 w-10' />
                            <p>Login</p>
                        </button>
                        <button className='flex items-center space-x-2 h-9 px-4 text-red-600 font-bold border-red-600 hover:text-red-700' onClick={() => navigate("/learnmore")}>
                            <ShieldQuestion className='h-9 w-10' />
                            <p>Learn More</p>
                        </button>
                    </div>

                    {/* menu for mobile screens */}
                    <button
                        className="md:hidden flex items-center"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Menu className="h-8 w-8 text-red-600" />
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden w-3/4 rounded-xl bg-gradient-to-r from-red-500 to-red-700 shadow-lg flex flex-col items-center space-y-6 py-6 mx-auto my-2 transform transition-transform duration-300 ease-in-out hover:scale-105">
                    <button 
                        className="flex items-center space-x-3 h-12 px-6 text-white font-semibold border-2 border-white rounded-lg hover:bg-white hover:text-red-600 transition-colors duration-300"
                        onClick={() => handleButtonClick("/login")}
                    >
                        <User2 className="h-10 w-10" />
                        <p className="text-lg">Login</p>
                    </button>
                    <button 
                        className="flex items-center space-x-3 h-12 px-6 text-white font-semibold border-2 border-white rounded-lg hover:bg-white hover:text-red-600 transition-colors duration-300"
                        onClick={() => handleButtonClick("/learnmore")}
                    >
                        <ShieldQuestion className="h-10 w-10" />
                        <p className="text-lg">Learn More</p>
                    </button>
                </div>
            )}

        </>
    );
};

export default Navbar;
