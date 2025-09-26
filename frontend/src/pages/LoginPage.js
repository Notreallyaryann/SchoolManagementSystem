import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
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
    const [schoolError, setSchoolError] = useState(false);
    const [schoolId, setSchoolId] = useState("");
    const [schools, setSchools] = useState([]);

    // Fetch all schools for student or teacher login
    useEffect(() => {
        if (role === "Student" || role === "Teacher") {
            axios.get(`${process.env.REACT_APP_BASE_URL}/Schools`)
                .then(res => setSchools(res.data))
                .catch(err => console.log('Error fetching schools:', err));
        }
    }, [role]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password || !schoolId) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                if (!schoolId) setSchoolError(true);
                return;
            }

            const fields = { rollNum, studentName, password, schoolId };
            setLoader(true);
            dispatch(loginUser(fields, role));
        } else if (role === "Teacher") {
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password || !schoolId) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                if (!schoolId) setSchoolError(true);
                return;
            }

            const fields = { email, password, schoolId };
            setLoader(true);
            dispatch(loginUser(fields, role));
        } else {
            // Admin login
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
        if (name === 'schoolId') setSchoolError(false);
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
        <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h1 className="text-3xl font-bold mb-4 text-center text-black">{role} Login</h1>
                <p className="text-gray-800 text-center mb-6">Welcome back! Please enter your details</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {(role === "Student" || role === "Teacher") && (
                        <>
                            {role === "Student" && (
                                <>
                                    <div>
                                        <input
                                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 ${rollNumberError ? 'border-red-500 focus:ring-red-500' : 'border-black focus:ring-blue-500'}`}
                                            placeholder="Enter your Roll Number"
                                            name="rollNumber"
                                            type="number"
                                            autoComplete="off"
                                            onChange={handleInputChange}
                                        />
                                        {rollNumberError && <p className="mt-1 text-sm text-red-600">Roll Number is required</p>}
                                    </div>
                                    <div>
                                        <input
                                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 ${studentNameError ? 'border-red-500 focus:ring-red-500' : 'border-black focus:ring-blue-500'}`}
                                            placeholder="Enter your name"
                                            name="studentName"
                                            autoComplete="name"
                                            onChange={handleInputChange}
                                        />
                                        {studentNameError && <p className="mt-1 text-sm text-red-600">Name is required</p>}
                                    </div>
                                </>
                            )}
                            {role === "Teacher" && (
                                <div>
                                    <input
                                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-black focus:ring-blue-500'}`}
                                        placeholder="Enter your email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        onChange={handleInputChange}
                                    />
                                    {emailError && <p className="mt-1 text-sm text-red-600">Email is required</p>}
                                </div>
                            )}
                            <div>
                                <select
                                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 ${schoolError ? 'border-red-500 focus:ring-red-500' : 'border-black focus:ring-blue-500'}`}
                                    name="schoolId"
                                    value={schoolId}
                                    onChange={(e) => {
                                        setSchoolId(e.target.value);
                                        setSchoolError(false);
                                    }}
                                >
                                    <option value="">Select School</option>
                                    {schools.map((school) => (
                                        <option key={school._id} value={school._id}>{school.schoolName}</option>
                                    ))}
                                </select>
                                {schoolError && <p className="mt-1 text-sm text-red-600">School is required</p>}
                            </div>
                        </>
                    )}
                    {role === "Admin" && (
                        <div>
                            <input
                                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-black focus:ring-blue-500'}`}
                                placeholder="Enter your email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                onChange={handleInputChange}
                            />
                            {emailError && <p className="mt-1 text-sm text-red-600">Email is required</p>}
                        </div>
                    )}
                    <div className="relative">
                        <input
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 ${passwordError ? 'border-red-500 focus:ring-red-500' : 'border-black focus:ring-blue-500'}`}
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
                                <EyeIcon className="h-5 w-5 text-blue-600" />
                            ) : (
                                <EyeSlashIcon className="h-5 w-5 text-blue-600" />
                            )}
                        </button>
                        {passwordError && <p className="mt-1 text-sm text-red-600">Password is required</p>}
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <label className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-black rounded" />
                            <span className="ml-2 text-black">Remember me</span>
                        </label>
                        <Link to="#" className="text-sm text-blue-600 hover:text-blue-800">
                            Forgot password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
                        disabled={loader}
                    >
                        {loader ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            </div>
                        ) : "Login"}
                    </button>
                    {role === "Admin" && (
                        <div className="mt-4 flex justify-center">
                            <span className="text-black">Don't have an account?</span>
                            <Link to="/Adminregister" className="ml-1 text-blue-600 hover:text-blue-800">
                                Sign up
                            </Link>
                        </div>
                    )}
                </form>
            </div>

            {guestLoader && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-black">Please Wait</p>
                    </div>
                </div>
            )}

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
    );
};

export default LoginPage;




