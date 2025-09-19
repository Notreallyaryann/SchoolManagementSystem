import React from "react";
import { useSelector } from "react-redux";

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) console.log(response);
  else if (error) console.log(error);

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-center">
            <div className="w-36 h-36 rounded-full bg-blue-500 flex items-center justify-center text-white text-6xl font-bold">
              {String(currentUser.name).charAt(0)}
            </div>
          </div>
          <div className="flex justify-center">
            <h2 className="text-2xl font-semibold text-center">
              {currentUser.name}
            </h2>
          </div>
          <div className="flex justify-center">
            <p className="text-lg text-center">
              Student Roll No: {currentUser.rollNum}
            </p>
          </div>
          <div className="flex justify-center">
            <p className="text-lg text-center">
              Class: {sclassName.sclassName}
            </p>
          </div>
          <div className="flex justify-center">
            <p className="text-lg text-center">
              School: {studentSchool.schoolName}
            </p>
          </div>
        </div>

        {/* QR Code Section */}
        {currentUser.qrCode && (
          <div className="flex justify-center mt-6">
            <img
              src={currentUser.qrCode}
              alt="QR Code"
              className="w-40 h-40 border rounded-lg shadow-md"
            />
          </div>
        )}
      </div>

      {/* Other Info */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Personal Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-lg">
              <span className="font-semibold">Date of Birth:</span> January 1,
              2000
            </p>
          </div>
          <div>
            <p className="text-lg">
              <span className="font-semibold">Gender:</span> Male
            </p>
          </div>
          <div>
            <p className="text-lg">
              <span className="font-semibold">Email:</span> student@example.com
            </p>
          </div>
          <div>
            <p className="text-lg">
              <span className="font-semibold">Phone:</span> (123) 456-7890
            </p>
          </div>
          <div>
            <p className="text-lg">
              <span className="font-semibold">Address:</span> Kanpur
            </p>
          </div>
          <div>
            <p className="text-lg">
              <span className="font-semibold">Emergency Contact:</span> (999)
              999-9999
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
