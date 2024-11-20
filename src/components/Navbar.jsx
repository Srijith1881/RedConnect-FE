
import { CircleX, User2 } from 'lucide-react'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    // const [visible, setvisible] = useState(false)
    const navigate = useNavigate();

    return (
        <>
            <div className="w-full h-[4rem] flex justify-center items-center bg-[#ffe7cd] shadow-sm shadow-white rounded-sm">
                <div className="w-[80%] h-full flex justify-center items-center flex-row">
                    <div className='w-1/2 flex h-full justify-start items-center font-bold text-xl text-red-600'>Blood Report Management System</div>
                    <div className='pl- w-1/2 flex h-full justify-end items-center'>
                        <button className='flex items-center space-x-2 h-9 w-auto px-4 text-red-600 font-bold  border-red-600  hover:text-red-700' onClick={() => navigate("/Login")}>
                            <User2 className='h-9 w-10' />
                            <p>Login</p>
                        </button>
                    </div>

                </div>

            </div>
            
        </>
    )
}

export default Navbar