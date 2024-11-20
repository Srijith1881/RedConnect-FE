import { CircleX } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../services/Api';

const Register = () => {
    const formRef = useRef();
    const navigate = useNavigate();
    const [error, setError] = useState({});

    const validateForm = (data) => {
        let errors = {};

        // Name validation
        if (!/^[A-Za-z\s]{2,}$/.test(data.name)) {
            errors.name = 'Name must contain at least 2 characters and only alphabets.';
        }

        // Email validation
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
            errors.email = 'Please provide a valid email address.';
        }

        // Password validation
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(data.password)) {
            errors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.';
        }

        // Phone validation (10 digits only)
        if (data.phone && !/^\d{10}$/.test(data.phone)) {
            errors.phone = 'Phone number must be exactly 10 digits.';
        }



        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const registerData = {
            name: formRef.current.name.value,
            email: formRef.current.email.value,
            password: formRef.current.password.value,
            phone: formRef.current.phone.value,
            location: formRef.current.location.value,
            role: formRef.current.role.value,
        };

        const errors = validateForm(registerData);
        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        try {
            const response = await userRegister(registerData);
            console.log("Registered successfully", response);
            alert("Registered successfully!");
            navigate("/login");
        } catch (error) {
            console.error("Error in registering", error);
        }
    };

    return (
        <div className='h-screen w-screen bg-black/25 absolute top-0 left-0 flex justify-center items-center z-50'>
            <div className='w-full max-w-lg h-auto bg-white shadow-lg rounded-md flex flex-col'>
                <div className='w-full py-4 px-6 flex items-center justify-between border-b border-red-600 bg-[#ffe7cd] text-red-600 text-xl font-bold rounded-t-md'>
                    <div>Register</div>
                    <CircleX onClick={() => navigate("/")} className="cursor-pointer" />
                </div>
                <div className="w-full py-6 px-8">
                    <form className="flex flex-col gap-4" ref={formRef} onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <input type="text" name='name' placeholder='Name' className='p-3 bg-[#f8f8f8] w-full outline-none rounded-md' />
                            {error.name && <p className="text-red-500 text-sm mt-1"><OctagonAlert className='mr-1 w-10 h-10'/>{error.name}</p>}
                        </div>

                        <div className="flex flex-col">
                            <input type="email" name='email' placeholder='Email' className='p-3 bg-[#f8f8f8] w-full outline-none rounded-md' />
                            {error.email && <p className="text-red-500 text-sm mt-1"><OctagonAlert className='mr-1 w-10 h-10'/>{error.email}</p>}
                        </div>

                        <div className="flex flex-col">
                            <input type="password" name='password' placeholder='Password' className='p-3 bg-[#f8f8f8] w-full outline-none rounded-md' />
                            {error.password && <p className="text-red-500 text-sm mt-1"><OctagonAlert className='mr-1 w-10 h-10'/>{error.password}</p>}
                        </div>

                        <div className="flex flex-col">
                            <input type="text" name='phone' placeholder='Phone-no' className='p-3 bg-[#f8f8f8] w-full outline-none rounded-md' />
                            {error.phone && <p className="text-red-500 text-sm mt-1"><OctagonAlert className='mr-1 w-10 h-10'/>{error.phone}</p>}
                        </div>

                        <div className="flex flex-col">
                            <input type="text" name='location' placeholder='Location' className='p-3 bg-[#f8f8f8] w-full outline-none rounded-md' />
                            {error.location && <p className="text-red-500 text-sm mt-1"><OctagonAlert className='mr-1 w-10 h-10'/>{error.location}</p>}
                        </div>

                        <select name='role' defaultValue="user" className='p-3 bg-[#f8f8f8] w-full outline-none rounded-md'>
                            <option value="user">User</option>
                            <option value="employee">Employee</option>
                        </select>

                        <button type="submit" className="bg-red-600 p-3 text-[#ffe7cd] w-full rounded-md text-lg font-bold">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
