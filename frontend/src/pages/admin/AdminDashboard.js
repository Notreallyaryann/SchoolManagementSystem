import { useState } from 'react';
import {
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Logout from '../Logout';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';

import AddStudent from './studentRelated/AddStudent';
import SeeComplains from './studentRelated/SeeComplains';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ViewStudent from './studentRelated/ViewStudent';

import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';

import ShowSubjects from './subjectRelated/ShowSubjects';
import SubjectForm from './subjectRelated/SubjectForm';
import ViewSubject from './subjectRelated/ViewSubject';

import AddTeacher from './teacherRelated/AddTeacher';
import ChooseClass from './teacherRelated/ChooseClass';
import ChooseSubject from './teacherRelated/ChooseSubject';
import ShowTeachers from './teacherRelated/ShowTeachers';
import TeacherDetails from './teacherRelated/TeacherDetails';

import AddClass from './classRelated/AddClass';
import ClassDetails from './classRelated/ClassDetails';
import ShowClasses from './classRelated/ShowClasses';
import AccountMenu from '../../components/AccountMenu';

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Mobile sidebar backdrop */}
        {open && (
          <div 
            className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
            onClick={toggleDrawer}
          ></div>
        )}
        
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-end p-4 border-b">
            <button
              onClick={toggleDrawer}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <ChevronLeftIcon />
            </button>
          </div>
          <div className="border-b"></div>
          <nav>
            <SideBar />
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm z-10">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <button
                  onClick={toggleDrawer}
                  className="p-1 mr-4 rounded-md text-gray-700 hover:bg-gray-100 md:hidden"
                >
                  <MenuIcon />
                </button>
                <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
              </div>
              <AccountMenu />
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
            <Routes>
              <Route path="/" element={<AdminHomePage />} />
              <Route path='*' element={<Navigate to="/" />} />
              <Route path="/Admin/dashboard" element={<AdminHomePage />} />
              <Route path="/Admin/profile" element={<AdminProfile />} />
              <Route path="/Admin/complains" element={<SeeComplains />} />

              {/* Notice */}
              <Route path="/Admin/addnotice" element={<AddNotice />} />
              <Route path="/Admin/notices" element={<ShowNotices />} />

              {/* Subject */}
              <Route path="/Admin/subjects" element={<ShowSubjects />} />
              <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
              <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />

              <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
              <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />

              <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
              <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

              {/* Class */}
              <Route path="/Admin/addclass" element={<AddClass />} />
              <Route path="/Admin/classes" element={<ShowClasses />} />
              <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
              <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />

              {/* Student */}
              <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
              <Route path="/Admin/students" element={<ShowStudents />} />
              <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
              <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
              <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />

              {/* Teacher */}
              <Route path="/Admin/teachers" element={<ShowTeachers />} />
              <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
              <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
              <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
              <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
              <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />

              <Route path="/logout" element={<Logout />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;