import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="border border-gray-300 rounded-xl p-8 flex flex-col justify-center items-center shadow-md bg-purple-100 bg-opacity-40 text-black w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">{currentUser.name}</h1>
                <p className="mb-6 text-center text-lg">
                    Are you sure you want to log out?
                </p>
                <button 
                    onClick={handleLogout}
                    className="w-full py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors mb-3"
                >
                    Log Out
                </button>
                <button 
                    onClick={handleCancel}
                    className="w-full py-3 px-6 bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-lg transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Logout;
