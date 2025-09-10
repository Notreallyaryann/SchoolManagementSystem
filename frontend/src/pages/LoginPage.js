import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import bgpic from "../assets/designlogin.jpg";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const LoginPage = ({ role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [guestLoader, setGuestLoader] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                return;
            }
            const fields = { rollNum, studentName, password };
            setLoader(true);
            dispatch(loginUser(fields, role));
        } else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                return;
            }

            const fields = { email, password };
            setLoader(true);
            dispatch(loginUser(fields, role));
        }
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };

    const guestModeHandler = () => {
        const password = "zxc";

        if (role === "Admin") {
            const email = "yogendra@12";
            const fields = { email, password };
            setGuestLoader(true);
            dispatch(loginUser(fields, role));
        } else if (role === "Student") {
            const rollNum = "1";
            const studentName = "Dipesh Awasthi";
            const fields = { rollNum, studentName, password };
            setGuestLoader(true);
            dispatch(loginUser(fields, role));
        } else if (role === "Teacher") {
            const email = "tony@12";
            const fields = { email, password };
            setGuestLoader(true);
            dispatch(loginUser(fields, role));
        }
    };

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (currentRole === 'Admin') {
                navigate('/Admin/dashboard');
            } else if (currentRole === 'Student') {
                navigate('/Student/dashboard');
            } else if (currentRole === 'Teacher') {
                navigate('/Teacher/dashboard');
            }
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
            setGuestLoader(false);
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <div className="flex h-screen">
            <div className="flex flex-col w-full md:w-1/2 lg:w-2/5 p-8 overflow-auto">
                <div className="my-8 mx-4 flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-4 text-gray-800">
                        {role} Login
                    </h1>
                    <p className="text-gray-600">
                        Welcome back! Please enter your details
                    </p>
                    <form onSubmit={handleSubmit} className="mt-4 w-full max-w-md">
                        {role === "Student" ? (
                            <>
                                <div className="mb-4">
                                    <input
                                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 ${rollNumberError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'}`}
                                        placeholder="Enter your Roll Number"
                                        name="rollNumber"
                                        type="number"
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                    />
                                    {rollNumberError && <p className="mt-1 text-sm text-red-600">Roll Number is required</p>}
                                </div>
                                <div className="mb-4">
                                    <input
                                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 ${studentNameError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'}`}
                                        placeholder="Enter your name"
                                        name="studentName"
                                        autoComplete="name"
                                        onChange={handleInputChange}
                                    />
                                    {studentNameError && <p className="mt-1 text-sm text-red-600">Name is required</p>}
                                </div>
                            </>
                        ) : (
                            <div className="mb-4">
                                <input
                                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'}`}
                                    placeholder="Enter your email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={handleInputChange}
                                />
                                {emailError && <p className="mt-1 text-sm text-red-600">Email is required</p>}
                            </div>
                        )}
                        <div className="mb-4 relative">
                            <input
                                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 ${passwordError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'}`}
                                placeholder="Password"
                                name="password"
                                type={toggle ? 'text' : 'password'}
                                autoComplete="current-password"
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setToggle(!toggle)}
                            >
                                {toggle ? (
                                    <EyeIcon className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                            {passwordError && <p className="mt-1 text-sm text-red-600">Password is required</p>}
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <label className="flex items-center">
                                <input type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                                <span className="ml-2 text-gray-600">Remember me</span>
                            </label>
                            <Link to="#" className="text-sm text-purple-600 hover:text-purple-800">
                                Forgot password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
                            disabled={loader}
                        >
                            {loader ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                </div>
                            ) : "Login"}
                        </button>
                        <button
                            type="button"
                            onClick={guestModeHandler}
                            className="w-full mt-4 border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-medium py-3 px-4 rounded-md transition-colors"
                        >
                            Login as Guest
                        </button>
                        {role === "Admin" && (
                            <div className="mt-4 flex justify-center">
                                <span className="text-gray-600">Don't have an account?</span>
                                <Link to="/Adminregister" className="ml-1 text-purple-600 hover:text-purple-800">
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </form>
                </div>
            </div>
            <div 
                className="hidden md:block w-1/2 lg:w-3/5 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgpic})` }}
            ></div>
            
            {/* Backdrop for guest loader */}
            {guestLoader && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
                        <p className="mt-4 text-gray-700">Please Wait</p>
                    </div>
                </div>
            )}
            
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
    );
};

export default LoginPage;
