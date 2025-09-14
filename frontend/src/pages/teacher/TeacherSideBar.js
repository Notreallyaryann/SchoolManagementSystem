import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';

const TeacherSideBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teachSclass;
    const location = useLocation();
    
    // Helper function to determine if a path is active
    const isActive = (path, useStartsWith = false) => {
        if (useStartsWith) {
            return location.pathname.startsWith(path);
        }
        return location.pathname === path;
    };

    return (
        <div className="space-y-2">
            {/* Navigation Section */}
            <div className="space-y-1">
                <Link 
                    to="/" 
                    className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${isActive("/") || isActive("/Teacher/dashboard") ? 'bg-blue-100' : ''}`}
                >
                    <HomeIcon className={`flex-shrink-0 w-6 h-6 ${isActive("/") || isActive("/Teacher/dashboard") ? 'text-blue-600' : 'text-gray-500'} transition duration-75 group-hover:text-gray-900`} />
                    <span className="ml-3 whitespace-nowrap">Home</span>
                </Link>
                
                <Link 
                    to="/Teacher/class" 
                    className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${isActive("/Teacher/class", true) ? 'bg-blue-100' : ''}`}
                >
                    <ClassOutlinedIcon className={`flex-shrink-0 w-6 h-6 ${isActive("/Teacher/class", true) ? 'text-blue-600' : 'text-gray-500'} transition duration-75 group-hover:text-gray-900`} />
                    <span className="ml-3 whitespace-nowrap">Class {sclassName.sclassName}</span>
                </Link>
                
                <Link 
                    to="/Teacher/complain" 
                    className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${isActive("/Teacher/complain", true) ? 'bg-blue-100' : ''}`}
                >
                    <AnnouncementOutlinedIcon className={`flex-shrink-0 w-6 h-6 ${isActive("/Teacher/complain", true) ? 'text-blue-600' : 'text-gray-500'} transition duration-75 group-hover:text-gray-900`} />
                    <span className="ml-3 whitespace-nowrap">Complain</span>
                </Link>
            </div>

            {/* Divider */}
            <hr className="my-2 border-gray-200" />

            {/* User Section */}
            <div className="space-y-1">
                <div className="p-2 text-xs font-semibold text-gray-500 uppercase">
                    User
                </div>
                
                <Link 
                    to="/Teacher/profile" 
                    className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${isActive("/Teacher/profile", true) ? 'bg-blue-100' : ''}`}
                >
                    <AccountCircleOutlinedIcon className={`flex-shrink-0 w-6 h-6 ${isActive("/Teacher/profile", true) ? 'text-blue-600' : 'text-gray-500'} transition duration-75 group-hover:text-gray-900`} />
                    <span className="ml-3 whitespace-nowrap">Profile</span>
                </Link>
                
                <Link 
                    to="/logout" 
                    className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${isActive("/logout", true) ? 'bg-blue-100' : ''}`}
                >
                    <ExitToAppIcon className={`flex-shrink-0 w-6 h-6 ${isActive("/logout", true) ? 'text-blue-600' : 'text-gray-500'} transition duration-75 group-hover:text-gray-900`} />
                    <span className="ml-3 whitespace-nowrap">Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default TeacherSideBar;