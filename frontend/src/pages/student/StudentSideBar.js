import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';

const StudentSideBar = () => {
    const location = useLocation();
    
    const linkClass = "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group";
    const iconClass = (isActive) => 
        `flex-shrink-0 w-6 h-6 ${isActive ? 'text-blue-600' : 'text-gray-500'} transition duration-75 group-hover:text-gray-900`;
    const textClass = "ml-3 whitespace-nowrap";

    return (
        <div className="space-y-2">
            {/* Navigation Section */}
            <div className="space-y-1">
                <Link to="/" className={linkClass}>
                    <HomeIcon className={iconClass(location.pathname === ("/" || "/Student/dashboard"))} />
                    <span className={textClass}>Home</span>
                </Link>
                
                <Link to="/Student/subjects" className={linkClass}>
                    <AssignmentIcon className={iconClass(location.pathname.startsWith("/Student/subjects"))} />
                    <span className={textClass}>Subjects</span>
                </Link>
                
                <Link to="/Student/attendance" className={linkClass}>
                    <ClassOutlinedIcon className={iconClass(location.pathname.startsWith("/Student/attendance"))} />
                    <span className={textClass}>Attendance</span>
                </Link>
                
                <Link to="/Student/complain" className={linkClass}>
                    <AnnouncementOutlinedIcon className={iconClass(location.pathname.startsWith("/Student/complain"))} />
                    <span className={textClass}>Complain</span>
                </Link>
            </div>

            {/* Divider */}
            <hr className="my-2 border-gray-200" />

            {/* User Section */}
            <div className="space-y-1">
                <div className="p-2 text-xs font-semibold text-gray-500 uppercase">
                    User
                </div>
                
                <Link to="/Student/profile" className={linkClass}>
                    <AccountCircleOutlinedIcon className={iconClass(location.pathname.startsWith("/Student/profile"))} />
                    <span className={textClass}>Profile</span>
                </Link>
                
                <Link to="/logout" className={linkClass}>
                    <ExitToAppIcon className={iconClass(location.pathname.startsWith("/logout"))} />
                    <span className={textClass}>Logout</span>
                </Link>
            </div>
        </div>
    )
}

export default StudentSideBar;