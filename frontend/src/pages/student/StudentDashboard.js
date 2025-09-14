import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import StudentSideBar from './StudentSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';
import Logout from '../Logout';
import AccountMenu from '../../components/AccountMenu';

const StudentDashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <div className="flex h-screen bg-gray-100">
                {/* AppBar */}
                <header className={`fixed w-full bg-blue-600 text-white z-10 transition-all duration-300 ${open ? 'md:pl-64' : ''}`}>
                    <div className="flex items-center justify-between p-4">
                        <button
                            className="text-white mr-10 md:mr-36 focus:outline-none"
                            onClick={toggleDrawer}
                            style={{ display: open ? 'none' : 'block' }}
                        >
                            <MenuIcon />
                        </button>
                        <h1 className="text-xl font-semibold flex-grow">Student Dashboard</h1>
                        <AccountMenu />
                    </div>
                </header>

                {/* Sidebar */}
                <aside className={`fixed top-0 left-0 z-20 h-full bg-white shadow-lg transition-all duration-300 ${open ? 'w-64' : 'w-0 md:w-20'} overflow-x-hidden`}>
                    <div className="flex items-center justify-end p-2">
                        <button 
                            className="text-gray-500 focus:outline-none"
                            onClick={toggleDrawer}
                        >
                            <ChevronLeftIcon />
                        </button>
                    </div>
                    <hr className="my-2" />
                    <nav>
                        <StudentSideBar />
                    </nav>
                </aside>

                {/* Main content */}
                <main className={`flex-1 overflow-auto transition-all duration-300 ${open ? 'md:ml-64' : 'md:ml-20'}`}>
                    <div className="p-6 mt-16">
                        <Routes>
                            <Route path="/" element={<StudentHomePage />} />
                            <Route path='*' element={<Navigate to="/" />} />
                            <Route path="/Student/dashboard" element={<StudentHomePage />} />
                            <Route path="/Student/profile" element={<StudentProfile />} />
                            <Route path="/Student/subjects" element={<StudentSubjects />} />
                            <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                            <Route path="/Student/complain" element={<StudentComplain />} />
                            <Route path="/logout" element={<Logout />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </>
    );
}

export default StudentDashboard;