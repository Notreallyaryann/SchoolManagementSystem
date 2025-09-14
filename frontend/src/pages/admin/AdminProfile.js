import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '../../redux/userRelated/userSlice';

const AdminProfile = () => {
    const [showTab, setShowTab] = useState(false);
    const buttonText = showTab ? 'Cancel' : 'Edit Profile';

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser, response, error } = useSelector((state) => state.user);
    const address = "Admin";

    if (response) { console.log(response); }
    else if (error) { console.log(error); }

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState("");
    const [schoolName, setSchoolName] = useState(currentUser.schoolName);

    const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUser(fields, currentUser._id, address));
    };

    const deleteHandler = () => {
        try {
            dispatch(deleteUser(currentUser._id, "Students"));
            dispatch(deleteUser(currentUser._id, address));
            dispatch(authLogout());
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Profile</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-500">Name</h3>
                        <p className="text-lg text-gray-800">{currentUser.name}</p>
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-500">Email</h3>
                        <p className="text-lg text-gray-800">{currentUser.email}</p>
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-500">School</h3>
                        <p className="text-lg text-gray-800">{currentUser.schoolName}</p>
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-500">Role</h3>
                        <p className="text-lg text-gray-800">Administrator</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        onClick={deleteHandler}
                    >
                        Delete Account
                    </button>
                    
                    <button
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        onClick={() => setShowTab(!showTab)}
                    >
                        {showTab ? <KeyboardArrowUp className="mr-1" /> : <KeyboardArrowDown className="mr-1" />}
                        {buttonText}
                    </button>
                </div>
            </div>

            {showTab && (
                <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Edit Profile Details</h3>
                    
                    <form className="space-y-6" onSubmit={submitHandler}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    type="text"
                                    placeholder="Enter your name..."
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    autoComplete="name"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    type="text"
                                    placeholder="Enter your school name..."
                                    value={schoolName}
                                    onChange={(event) => setSchoolName(event.target.value)}
                                    autoComplete="organization"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    type="email"
                                    placeholder="Enter your email..."
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    autoComplete="email"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    type="password"
                                    placeholder="Enter your password..."
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    autoComplete="new-password"
                                />
                                <p className="text-sm text-gray-500 mt-1">Leave blank to keep current password</p>
                            </div>
                        </div>
                        
                        <div className="flex justify-end">
                            <button
                                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                type="submit"
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminProfile;