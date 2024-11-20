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
        <div className="h-screen w-screen absolute top-0 left-0 bg-black/25 flex justify-center items-center z-50">
            <div className="h-[50%] w-[30%] max-w-md bg-white z-50 flex flex-col shadow-lg rounded-md">
                <div className="w-full h-[15%] flex items-center justify-between px-6 border-b-2 text-red-600 bg-[#ffe7cd] text-xl font-bold rounded-t-md">
                    <span>Login</span>
                    <CircleX onClick={() => navigate("/")} className="cursor-pointer" />
                </div>
                <div className="w-full h-[85%] flex justify-center items-center">
                    <form className="w-[80%] flex flex-col gap-4" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            ref={emailRef}
                            placeholder="Email"
                            className="p-3 bg-[#f8f8f8] w-full font-bold outline-none focus:border-b-2 border-transparent hover:border-black rounded-md"
                            required
                        />
                        
                        {errors.email && <p className="text-red-600 text-sm"><OctagonAlert className='mr-1 w-11 h-11'/>{errors.email}</p>}
                        
                        <input
                            type="password"
                            ref={passwordRef}
                            placeholder="Password"
                            className="p-3 bg-[#f8f8f8] w-full font-bold outline-none focus:border-b-2 border-transparent hover:border-black rounded-md"
                            required
                        />
                        {errors.password && <p className="text-red-600 text-sm flex items-center">
                            <OctagonAlert className='mr-1 w-11 h-11'/>{errors.password}</p>}
                        
                        <button
                            type="submit"
                            className="bg-red-600 p-3 text-[#ffe7cd] w-full rounded-md text-lg font-bold mt-4"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className="text-blue-700 hover:text-red-500 text-center font-semibold mt-2"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Login;
