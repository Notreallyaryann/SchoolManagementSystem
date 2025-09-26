import React from "react";
import { Link } from "react-router-dom";
import Students from "../assets/students.png";
import { FaUserGraduate } from "react-icons/fa";


const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-900 text-white">
      {/* Header */}
      <header className="w-full bg-black bg-opacity-80 shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">SchoolMS</h1>
          <nav className="flex gap-6">
            <Link to="/" className="hover:text-blue-400">Home</Link>
            <Link to="/choose" className="hover:text-blue-400">Login</Link>
            <Link to="/Adminregister" className="hover:text-blue-400">Sign Up</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow mt-20">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6 py-16 gap-10">
          <div className="w-full md:w-1/2">
            <h2 className="text-5xl font-extrabold leading-tight mb-6">
              Welcome to <span className="text-blue-400">School Management</span> System
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Simplify school management, organize classes, track attendance,
              evaluate performance, and communicate effortlessly with faculty and students.
            </p>
            <Link to="/choose">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition transform hover:scale-105">
                Get Started
              </button>
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            <img src={Students} alt="students" className="rounded-xl shadow-lg" />
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-black bg-opacity-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-3xl font-bold text-center text-blue-400 mb-10">
              Key Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Attendance", description: "Feature exists: Track student attendance." },
                { title: "Marks", description: "Feature exists: View marks of students." },
                { title: "Assignments", description: "Feature exists: Teachers can assign homework or tasks." },
                { title: "Notice", description: "Feature exists: Admins can post notices for students." },
                { title: "Complain", description: "Feature exists: Students can raise complaints or issues." },
              ].map((feature, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-blue-500 transition">
                  <div className="flex gap-2 mb-3">
                    <FaUserGraduate className="text-2xl text-blue-400" />
                    <FaUserGraduate className="text-2xl text-blue-400" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-80 text-gray-300 py-6 mt-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} SchoolMS. All rights reserved.</p>
          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            <p>Email: <span className="text-blue-400">findaryan.info@gmail.com</span></p>
            <p>Phone: <span className="text-blue-400">+91 9984934842</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;







