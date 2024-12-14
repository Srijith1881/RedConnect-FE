import { CircleX, OctagonAlert } from 'lucide-react';
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
        <div className="h-screen w-screen bg-black/40 fixed top-0 left-0 flex justify-center items-center z-50">
    <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%] max-w-lg bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="w-full bg-[#ffe7cd] text-red-600 text-lg sm:text-xl font-semibold flex items-center justify-between px-6 py-4 border-b border-red-600">
            <span>Register</span>
            <CircleX onClick={() => navigate("/")} className="cursor-pointer text-xl hover:text-red-800 transition-colors" />
        </div>

        {/* Form Section */}
        <div className="w-full p-6 flex flex-col items-center">
            <form className="w-full flex flex-col gap-6" ref={formRef} onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="flex flex-col gap-1">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="p-3 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none text-gray-700"
                    />
                    {error.name && (
                        <p className="text-red-500 text-sm flex items-center">
                            <OctagonAlert className="mr-2 w-5 h-5" />
                            {error.name}
                        </p>
                    )}
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-1">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="p-3 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none text-gray-700"
                    />
                    {error.email && (
                        <p className="text-red-500 text-sm flex items-center">
                            <OctagonAlert className="mr-2 w-5 h-5" />
                            {error.email}
                        </p>
                    )}
                </div>

                {/* Password Input */}
                <div className="flex flex-col gap-1">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="p-3 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none text-gray-700"
                    />
                    {error.password && (
                        <p className="text-red-500 text-sm flex items-center">
                            <OctagonAlert className="mr-2 w-10 h-10" />
                            {error.password}
                        </p>
                    )}
                </div>

                {/* Phone Number Input */}
                <div className="flex flex-col gap-1">
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        className="p-3 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none text-gray-700"
                    />
                    {error.phone && (
                        <p className="text-red-500 text-sm flex items-center">
                            <OctagonAlert className="mr-2 w-5 h-5" />
                            {error.phone}
                        </p>
                    )}
                </div>

                {/* Location Input */}
                <div className="flex flex-col gap-1">
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        className="p-3 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none text-gray-700"
                    />
                    {error.location && (
                        <p className="text-red-500 text-sm flex items-center">
                            <OctagonAlert className="mr-2 w-5 h-5" />
                            {error.location}
                        </p>
                    )}
                </div>

                {/* Role Selection */}
                <div className="flex flex-col gap-1">
                    <select
                        name="role"
                        defaultValue="user"
                        className="p-3 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none text-gray-700"
                    >
                        <option value="user">User</option>
                        <option value="employee">Employee</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-red-600 text-white p-3 rounded-md text-lg font-semibold hover:bg-red-700 transition-transform transform hover:scale-105"
                >
                    Register
                </button>
            </form>
        </div>
    </div>
</div>

    );
};

export default Register;
