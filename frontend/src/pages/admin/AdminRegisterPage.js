import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { registerUser } from '../../redux/userRelated/userHandle';
import Popup from '../../components/Popup';

const AdminRegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [adminNameError, setAdminNameError] = useState(false);
    const [schoolNameError, setSchoolNameError] = useState(false);
    const role = "Admin";

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = event.target.adminName.value;
        const schoolName = event.target.schoolName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!name || !schoolName || !email || !password) {
            if (!name) setAdminNameError(true);
            if (!schoolName) setSchoolNameError(true);
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        const fields = { name, email, password, role, schoolName };
        setLoader(true);
        dispatch(registerUser(fields, role));
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'adminName') setAdminNameError(false);
        if (name === 'schoolName') setSchoolNameError(false);
    };

    useEffect(() => {
        if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
            navigate('/Admin/dashboard');
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            console.log(error);
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-4 text-center text-black">
                    Admin Register
                </h2>
                <p className="text-center mb-6">
                    Create your own school by registering as an admin.
                    <br />
                    You will be able to add students and faculty and manage the system.
                </p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="adminName" className="block text-sm font-medium text-gray-700 mb-1">
                            Enter your name
                        </label>
                        <input
                            type="text"
                            id="adminName"
                            name="adminName"
                            autoComplete="name"
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${adminNameError ? 'border-red-500' : 'border-gray-300'}`}
                            onChange={handleInputChange}
                            required
                        />
                        {adminNameError && <p className="mt-1 text-sm text-red-600">Name is required</p>}
                    </div>

                    <div>
                        <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">
                            Create your school name
                        </label>
                        <input
                            type="text"
                            id="schoolName"
                            name="schoolName"
                            autoComplete="off"
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${schoolNameError ? 'border-red-500' : 'border-gray-300'}`}
                            onChange={handleInputChange}
                            required
                        />
                        {schoolNameError && <p className="mt-1 text-sm text-red-600">School name is required</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Enter your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${emailError ? 'border-red-500' : 'border-gray-300'}`}
                            onChange={handleInputChange}
                            required
                        />
                        {emailError && <p className="mt-1 text-sm text-red-600">Email is required</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={toggle ? 'text' : 'password'}
                                id="password"
                                name="password"
                                autoComplete="current-password"
                                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
                                onChange={handleInputChange}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setToggle(!toggle)}
                            >
                                {toggle ? <Visibility /> : <VisibilityOff />}
                            </button>
                        </div>
                        {passwordError && <p className="mt-1 text-sm text-red-600">Password is required</p>}
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox text-blue-600" />
                            <span className="ml-2 text-sm text-gray-700">Remember me</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex justify-center items-center"
                        disabled={loader}
                    >
                        {loader ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        ) : "Register"}
                    </button>

                    <div className="mt-4 flex justify-center">
                        <span className="text-sm text-gray-700">Already have an account?</span>
                        <Link
                            to="/Adminlogin"
                            className="ml-2 text-sm text-blue-600 hover:text-blue-800"
                        >
                            Log in
                        </Link>
                    </div>
                </form>
            </div>

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
    );
};

export default AdminRegisterPage;


