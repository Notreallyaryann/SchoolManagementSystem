import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userRelated/userHandle";
import Popup from "../components/Popup";
import { FaUserShield, FaSchool, FaChalkboardTeacher } from "react-icons/fa";

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector((state) => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate("/Adminlogin");
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate("/Studentlogin");
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate("/Teacherlogin");
      }
    }
  };

  useEffect(() => {
    if (status === "success" || currentUser !== null) {
      if (currentRole === "Admin") navigate("/Admin/dashboard");
      else if (currentRole === "Student") navigate("/Student/dashboard");
      else if (currentRole === "Teacher") navigate("/Teacher/dashboard");
    } else if (status === "error") {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-indigo-900 p-6">
      <h1 className="text-4xl font-bold text-white mb-10 text-center">
        Choose Your Role
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Admin Card */}
        <div
          onClick={() => navigateHandler("Admin")}
          className="bg-indigo-800 text-white p-8 rounded-xl shadow-lg transform transition hover:scale-105 hover:bg-indigo-700 cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <FaUserShield className="text-6xl mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Admin</h2>
            <p className="text-center text-sm text-gray-200">
              Login as an administrator to manage the app's data and dashboards.
            </p>
          </div>
        </div>

        {/* Student Card */}
        <div
          onClick={() => navigateHandler("Student")}
          className="bg-indigo-800 text-white p-8 rounded-xl shadow-lg transform transition hover:scale-105 hover:bg-indigo-700 cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <FaSchool className="text-6xl mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Student</h2>
            <p className="text-center text-sm text-gray-200">
              Login as a student to explore courses, materials, and assignments.
            </p>
          </div>
        </div>

        {/* Teacher Card */}
        <div
          onClick={() => navigateHandler("Teacher")}
          className="bg-indigo-800 text-white p-8 rounded-xl shadow-lg transform transition hover:scale-105 hover:bg-indigo-700 cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <FaChalkboardTeacher className="text-6xl mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Teacher</h2>
            <p className="text-center text-sm text-gray-200">
              Login as a teacher to create courses, assignments, and track students.
            </p>
          </div>
        </div>
      </div>

      {/* Loader */}
      {loader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-center text-white">
            <svg
              className="animate-spin h-10 w-10 mx-auto mb-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            <p>Please Wait...</p>
          </div>
        </div>
      )}

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  );
};

export default ChooseUser;
