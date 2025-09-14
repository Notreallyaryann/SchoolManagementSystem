import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TeacherSideBar from './TeacherSideBar';
import Logout from '../Logout';
import AccountMenu from '../../components/AccountMenu';
import StudentAttendance from '../admin/studentRelated/StudentAttendance';
import TeacherClassDetails from './TeacherClassDetails';
import TeacherComplain from './TeacherComplain';
import TeacherHomePage from './TeacherHomePage';
import TeacherProfile from './TeacherProfile';
import TeacherViewStudent from './TeacherViewStudent';
import StudentExamMarks from '../admin/studentRelated/StudentExamMarks';

const TeacherDashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* App Bar */}
            <header className={`fixed top-0 right-0 z-10 bg-blue-600 text-white transition-all duration-300 ${open ? 'md:left-64' : 'left-0'}`}>
                <div className="flex items-center justify-between p-4">
                    <button
                        className="text-white hover:bg-blue-700 rounded p-1 md:mr-9 mr-4"
                        onClick={toggleDrawer}
                        style={{ display: open ? 'none' : 'block' }}
                    >
                        <MenuIcon />
                    </button>
                    <h1 className="text-xl font-semibold flex-grow">
                        Teacher Dashboard
                    </h1>
                    <AccountMenu />
                </div>
            </header>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 z-20 h-full bg-white shadow-lg transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`} style={{ width: '240px' }}>
                <div className="flex items-center justify-end p-2">
                    <button
                        className="text-gray-700 hover:bg-gray-200 rounded p-1"
                        onClick={toggleDrawer}
                    >
                        <ChevronLeftIcon />
                    </button>
                </div>
                <hr className="my-2" />
                <nav>
                    <TeacherSideBar />
                </nav>
            </aside>

            {/* Main Content */}
            <main className={`flex-grow pt-16 transition-all duration-300 ${open ? 'md:ml-64' : 'ml-0'} overflow-auto`}>
                <Routes>
                    {/* Default Dashboard/Home */}
                    <Route path="/" element={<TeacherHomePage />} />
                    <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />

                    <Route path="/Teacher/profile" element={<TeacherProfile />} />
                    <Route path="/Teacher/complain" element={<TeacherComplain />} />
                    <Route path="/Teacher/class" element={<TeacherClassDetails />} />
                    <Route
                        path="/Teacher/class/student/:id"
                        element={<TeacherViewStudent />}
                    />
                    <Route
                        path="/Teacher/class/student/attendance/:studentID/:subjectID"
                        element={<StudentAttendance situation="Subject" />}
                    />
                    <Route
                        path="/Teacher/class/student/marks/:studentID/:subjectID"
                        element={<StudentExamMarks situation="Subject" />}
                    />

                    {/* Logout */}
                    <Route path="/logout" element={<Logout />} />

                    {/* Catch-all (last) */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </div>
    );
};

export default TeacherDashboard;
