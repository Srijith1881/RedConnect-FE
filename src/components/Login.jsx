import React, { useRef, useState } from 'react';
import { CircleX, OctagonAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../services/Api';
import { Toaster, toast } from 'sonner';

const Login = () => {
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [errors, setErrors] = useState({ email: '', password: '' });

    // Email and Password validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset errors before validation
        setErrors({ email: '', password: '' });
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const logindata = { email, password };

        // Validate email and password
        let valid = true;
        if (!emailPattern.test(email)) {
            setErrors(prev => ({ ...prev, email: 'Please provide a valid email address.' }));
            valid = false;
        }
        if (!passwordPattern.test(password)) {
            setErrors(prev => ({ 
                ...prev, 
                password: 'Password must be at least 8 characters, with at least one uppercase, one lowercase, and one number.' 
            }));
            valid = false;
        }
        if (!valid) return; // Stop submission if validation fails

        try {
            const response = await userLogin(logindata);
            alert("login successful...!")
            if (response.status === 200) {
                if (response.data.role === "employee") {
                    navigate("/employeedashboard");
                } else if (response.data.role === "user") {
                    navigate("/patientdashboard");
                }
            }
            }catch (error) {
                if (error.status === 404){
                    alert("Invalid login 😒... Do register");
                    navigate("/register");
                }else if (error.status === 401){
                    alert("Wrong Password...")
                }else if (error.status === 500){
                    alert("Server error... please try again later")
                }
            }     
    };

    return (
        <div className="h-screen w-screen fixed top-0 left-0 bg-black/40 flex justify-center items-center z-50">
            <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%] max-w-lg bg-white z-50 flex flex-col shadow-xl rounded-lg overflow-hidden">
                {/* Header */}
                <div className="w-full bg-[#ffe7cd] text-red-600 text-lg sm:text-xl font-semibold flex items-center justify-between px-6 py-4 border-b">
                    <span>Login</span>
                    <CircleX onClick={() => navigate("/")} className="cursor-pointer text-xl hover:text-red-800 transition-colors" />
                </div>

                {/* Form Section */}
                <div className="w-full p-6 flex flex-col items-center">
                    <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div className="flex flex-col gap-1">
                            <input
                                type="email"
                                ref={emailRef}
                                placeholder="Email"
                                className="p-3 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none text-gray-700"
                                required
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm flex items-center">
                                    <OctagonAlert className="mr-2 w-5 h-5" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col gap-1">
                            <input
                                type="password"
                                ref={passwordRef}
                                placeholder="Password"
                                className="p-3 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none text-gray-700"
                                required
                            />
                            {errors.password && (
                                <p className="text-red-600 text-sm flex items-center">
                                    <OctagonAlert className="mr-2 w-12 h-12" />
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="bg-red-600 text-white p-3 rounded-md text-lg font-semibold hover:bg-red-700 transition-transform transform hover:scale-105"
                        >
                            Login
                        </button>

                        {/* Register Button */}
                        <button
                            type="button"
                            className="text-red-600 font-medium hover:underline text-center mt-2"
                            onClick={() => navigate("/register")}
                        >
                            Don't have an account? Register
                        </button>
                    </form>
                </div>
            </div>
            <Toaster />
        </div>

    );
};

export default Login;
