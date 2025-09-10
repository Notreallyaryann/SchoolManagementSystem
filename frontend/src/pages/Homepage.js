import React from 'react';
import { Link } from 'react-router-dom';
import Students from "../assets/students.svg";

const Homepage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="flex flex-col md:flex-row w-full max-w-6xl">
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                    <img src={Students} alt="students" className="w-full h-auto" />
                </div>
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <div className="p-6 w-full max-w-md">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
                            Welcome to
                            <br />
                            School Management
                            <br />
                            System
                        </h1>
                        <p className="text-gray-600 mt-8 mb-8 leading-relaxed">
                            Streamline school management, class organization, and add students and faculty.
                            Seamlessly track attendance, assess performance, and provide feedback.
                            Access records, view marks, and communicate effortlessly.
                        </p>
                        <div className="flex flex-col items-center gap-4 p-6">
                            <Link to="/choose" className="w-full">
                                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200">
                                    Login
                                </button>
                            </Link>
                            <Link to="/chooseasguest" className="w-full">
                                <button className="w-full border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 mt-2 mb-3">
                                    Login as Guest
                                </button>
                            </Link>
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/Adminregister" className="text-purple-800 hover:text-purple-900 font-medium">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
