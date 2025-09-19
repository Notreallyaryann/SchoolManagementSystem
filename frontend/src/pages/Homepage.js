import React from 'react';
import { Link } from 'react-router-dom';
import Students from "../assets/students.png";

const Homepage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen p-6 bg-gradient-to-r from-purple-100 via-white to-purple-50">
            <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-2xl rounded-2xl overflow-hidden">
                
                {/* Left Side Image */}
                <div className="w-full md:w-1/2">
                    <img src={Students} alt="students" className="w-full h-full object-cover" />
                </div>

                {/* Right Side Content */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-10">
                    <div className="max-w-md">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                            Welcome to
                            <span className="text-purple-600"> School Management</span> System
                        </h1>
                        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                            Simplify school management, organize classes, track attendance, evaluate performance,
                            and communicate effortlessly with faculty and students.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col gap-4">
                            <Link to="/choose" className="w-full">
                                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transform hover:scale-105 transition duration-300">
                                    Login
                                </button>
                            </Link>

                      
                        </div>

                        {/* Sign up link */}
                        <p className="text-gray-700 mt-6 text-center">
                            Don’t have an account?{' '}
                            <Link to="/Adminregister" className="text-purple-700 hover:text-purple-900 font-semibold underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;

