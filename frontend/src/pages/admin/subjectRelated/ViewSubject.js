import React, { useEffect, useState } from 'react';
import { getClassStudents, getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TableTemplate from '../../../components/TableTemplate';
import {
  ChartBarIcon,
  TableCellsIcon
} from '@heroicons/react/24/outline';

const ViewSubject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } = useSelector((state) => state.sclass);

  const { classID, subjectID } = params;

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  if (error) {
    console.log(error);
  }

  const [activeTab, setActiveTab] = useState('details');
  const [selectedSection, setSelectedSection] = useState('attendance');

  const handleSectionChange = (newSection) => {
    setSelectedSection(newSection);
  };

  const studentColumns = [
    { id: 'rollNum', label: 'Roll No.', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
  ];

  const studentRows = sclassStudents.map((student) => {
    return {
      rollNum: student.rollNum,
      name: student.name,
      id: student._id,
    };
  });

  const StudentsAttendanceButtonHaver = ({ row }) => {
    return (
      <div className="flex space-x-2">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          onClick={() => navigate("/Admin/students/student/" + row.id)}
        >
          View
        </button>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
          onClick={() => navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)}
        >
          Take Attendance
        </button>
      </div>
    );
  };

  const StudentsMarksButtonHaver = ({ row }) => {
    return (
      <div className="flex space-x-2">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          onClick={() => navigate("/Admin/students/student/" + row.id)}
        >
          View
        </button>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
          onClick={() => navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)}
        >
          Provide Marks
        </button>
      </div>
    );
  };

  const SubjectStudentsSection = () => {
    return (
      <div>
        {getresponse ? (
          <div className="flex justify-end mt-4">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              onClick={() => navigate("/Admin/class/addstudents/" + classID)}
            >
              Add Students
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Students List:</h2>

            {selectedSection === 'attendance' &&
              <TableTemplate buttonHaver={StudentsAttendanceButtonHaver} columns={studentColumns} rows={studentRows} />
            }
            {selectedSection === 'marks' &&
              <TableTemplate buttonHaver={StudentsMarksButtonHaver} columns={studentColumns} rows={studentRows} />
            }

            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
              <div className="flex justify-around py-3">
                <button
                  className={`flex flex-col items-center px-4 py-2 rounded-lg ${selectedSection === 'attendance' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                  onClick={() => handleSectionChange('attendance')}
                >
                  <TableCellsIcon className="h-6 w-6" />
                  <span className="text-sm mt-1">Attendance</span>
                </button>
                <button
                  className={`flex flex-col items-center px-4 py-2 rounded-lg ${selectedSection === 'marks' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                  onClick={() => handleSectionChange('marks')}
                >
                  <ChartBarIcon className="h-6 w-6" />
                  <span className="text-sm mt-1">Marks</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const SubjectDetailsSection = () => {
    const numberOfStudents = sclassStudents.length;

    return (
      <>
        <h1 className="text-3xl font-bold text-center mb-6">Subject Details</h1>
        <p className="text-xl mb-3">Subject Name : {subjectDetails && subjectDetails.subName}</p>
        <p className="text-xl mb-3">Subject Code : {subjectDetails && subjectDetails.subCode}</p>
        <p className="text-xl mb-3">Subject Sessions : {subjectDetails && subjectDetails.sessions}</p>
        <p className="text-xl mb-3">Number of Students: {numberOfStudents}</p>
        <p className="text-xl mb-4">Class Name : {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}</p>
        {subjectDetails && subjectDetails.teacher ? (
          <p className="text-xl mb-4">Teacher Name : {subjectDetails.teacher.name}</p>
        ) : (
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            onClick={() => navigate("/Admin/teachers/addteacher/" + subjectDetails._id)}
          >
            Add Subject Teacher
          </button>
        )}
      </>
    );
  };

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'students', label: 'Students' },
  ];

  return (
    <>
      {subloading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="w-full">
          <div className="border-b border-gray-200 fixed w-full bg-white z-10">
            <nav className="flex space-x-8 px-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="pt-20 pb-16 px-4">
            {activeTab === 'details' && (
              <div className="max-w-4xl mx-auto">
                <SubjectDetailsSection />
              </div>
            )}
            {activeTab === 'students' && (
              <div className="max-w-6xl mx-auto">
                <SubjectStudentsSection />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewSubject;