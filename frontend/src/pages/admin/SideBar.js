import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SideBar = () => {
    const location = useLocation();
    
    // Helper function to determine if a link is active
    const isActiveLink = (path) => {
        if (path === "/") {
            return location.pathname === "/" || location.pathname === "/Admin/dashboard";
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="w-64 bg-white shadow-md h-full flex flex-col">
            <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-1">
                    <Link
                        to="/"
                        className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                            isActiveLink("/") 
                            ? "text-blue-600 bg-blue-50 border-r-4 border-blue-600" 
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        <HomeIcon className={`mr-3 ${isActiveLink("/") ? "text-blue-600" : "text-gray-500"}`} />
                        <span>Home</span>
                    </Link>
                    
                    <Link
                        to="/Admin/classes"
                        className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                            isActiveLink("/Admin/classes") 
                            ? "text-blue-600 bg-blue-50 border-r-4 border-blue-600" 
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        <ClassOutlinedIcon className={`mr-3 ${isActiveLink("/Admin/classes") ? "text-blue-600" : "text-gray-500"}`} />
                        <span>Classes</span>
                    </Link>
                    
                    <Link
                        to="/Admin/subjects"
                        className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                            isActiveLink("/Admin/subjects") 
                            ? "text-blue-600 bg-blue-50 border-r-4 border-blue-600" 
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        <AssignmentIcon className={`mr-3 ${isActiveLink("/Admin/subjects") ? "text-blue-600" : "text-gray-500"}`} />
                        <span>Subjects</span>
                    </Link>
                    
                    <Link
                        to="/Admin/teachers"
                        className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                            isActiveLink("/Admin/teachers") 
                            ? "text-blue-600 bg-blue-50 border-r-4 border-blue-600" 
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        <SupervisorAccountOutlinedIcon className={`mr-3 ${isActiveLink("/Admin/teachers") ? "text-blue-600" : "text-gray-500"}`} />
                        <span>Teachers</span>
                    </Link>
                    
                    <Link
                        to="/Admin/students"
                        className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                            isActiveLink("/Admin/students") 
                            ? "text-blue-600 bg-blue-50 border-r-4 border-blue-600" 
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        <PersonOutlineIcon className={`mr-3 ${isActiveLink("/Admin/students") ? "text-blue-600" : "text-gray-500"}`} />
                        <span>Students</span>
                    </Link>
                    
                    <Link
                        to="/Admin/notices"
                        className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                            isActiveLink("/Admin/notices") 
                            ? "text-blue-600 bg-blue-50 border-r-4 border-blue-600" 
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        <AnnouncementOutlinedIcon className={`mr-3 ${isActiveLink("/Admin/notices") ? "text-blue-600" : "text-gray-500"}`} />
                        <span>Notices</span>
                    </Link>
                    
                    <Link
                        to="/Admin/complains"
                        className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                            isActiveLink("/Admin/complains") 
                            ? "text-blue-600 bg-blue-50 border-r-4 border-blue-600" 
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        <ReportIcon className={`mr-3 ${isActiveLink("/Admin/complains") ? "text-blue-600" : "text-gray-500"}`} />
                        <span>Complains</span>
                    </Link>
                </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 pb-2">
                <div className="px-4 mb-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">User</h3>
                </div>
                
                <div className="space-y-1">
                    <Link
                        to="/Admin/profile"
                        className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                            isActiveLink("/Admin/profile") 
                            ? "text-blue-600 bg-blue-50 border-r-4 border-blue-600" 
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        <AccountCircleOutlinedIcon className={`mr-3 ${isActiveLink("/Admin/profile") ? "text-blue-600" : "text-gray-500"}`} />
                        <span>Profile</span>
                    </Link>
                    
                    <Link
                        to="/logout"
                        className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                            isActiveLink("/logout") 
                            ? "text-blue-600 bg-blue-50 border-r-4 border-blue-600" 
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        <ExitToAppIcon className={`mr-3 ${isActiveLink("/logout") ? "text-blue-600" : "text-gray-500"}`} />
                        <span>Logout</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
