import { CircleX, ShieldQuestion, User2, Menu, BadgeHelp, CircleUserRound } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className="w-full h-[4rem] flex justify-center items-center bg-[#ffe7cd] shadow-sm shadow-white rounded-sm">
                <div className="w-[80%] h-full flex justify-between items-center">
                    <div className='flex items-center font-bold text-xl text-red-600'>
                        RedConnect
                    </div>

                    {/* Menu items for larger screens */}
                    <div className="hidden md:flex space-x-4">
                        <button className='flex items-center space-x-2 h-9 px-4 text-red-600 font-bold border-red-600 hover:text-red-700' onClick={() => navigate("/login")}>
                            <CircleUserRound className='h-9 w-10' />
                            <p>Login</p>
                        </button>
                        <button className='flex items-center space-x-2 h-9 px-4 text-red-600 font-bold border-red-600 hover:text-red-700' onClick={() => navigate("/learnmore")}>
                            <BadgeHelp className='h-9 w-10' />
                            <p>Learn More</p>
                        </button>
                    </div>

                    {/* Hamburger menu for mobile screens */}
                    <button
                        className="md:hidden flex items-center"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Menu className="h-8 w-8 text-red-600" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden w-full bg-[#ffe7cd] shadow-sm shadow-white flex flex-col items-center space-y-4 py-4">
                    <button className='flex items-center space-x-2 h-9 px-4 text-red-600 font-bold border-red-600 hover:text-red-700' onClick={() => navigate("/login")}>
                        <User2 className='h-9 w-10' />
                        <p>Login</p>
                    </button>
                    <button className='flex items-center space-x-2 h-9 px-4 text-red-600 font-bold border-red-600 hover:text-red-700' onClick={() => navigate("/learnmore")}>
                        <ShieldQuestion className='h-9 w-10' />
                        <p>Learn More</p>
                    </button>
                </div>
            )}
        </>
    );
};

export default Navbar;
