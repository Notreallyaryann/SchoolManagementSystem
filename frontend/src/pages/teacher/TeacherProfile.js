import React from 'react';
import { useSelector } from 'react-redux';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const teachSclass = currentUser.teachSclass
  const teachSubject = currentUser.teachSubject
  const teachSchool = currentUser.school

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-lg font-medium text-gray-800">Name: {currentUser.name}</div>
          <div className="text-lg font-medium text-gray-800">Email: {currentUser.email}</div>
          <div className="text-lg font-medium text-gray-800">Class: {teachSclass.sclassName}</div>
          <div className="text-lg font-medium text-gray-800">Subject: {teachSubject.subName}</div>
          <div className="text-lg font-medium text-gray-800">School: {teachSchool.schoolName}</div>
        </div>
      </div>
    </div>
  )
}

export default TeacherProfile