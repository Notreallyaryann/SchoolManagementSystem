import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUser, getUserDetails, updateUser } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { removeStuff, updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/attendanceCalculator';
import CustomBarChart from '../../../components/CustomBarChart';
import CustomPieChart from '../../../components/CustomPieChart';
import Popup from '../../../components/Popup';

// Heroicons (replace MUI icons)
import {
  ChevronUpIcon,
  ChevronDownIcon,
  TrashIcon,
  ChartBarIcon,
  TableCellsIcon
} from '@heroicons/react/24/outline';
import {
  ChartBarIcon as ChartBarIconSolid,
  TableCellsIcon as TableCellsIconSolid
} from '@heroicons/react/24/solid';

const ViewStudent = () => {
  const [showTab, setShowTab] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { userDetails, response, loading, error } = useSelector((state) => state.user);

  const studentID = params.id;
  const address = "Student";

  useEffect(() => {
    dispatch(getUserDetails(studentID, address));
  }, [dispatch, studentID]);

  useEffect(() => {
    if (userDetails && userDetails.sclassName && userDetails.sclassName._id !== undefined) {
      dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
    }
  }, [dispatch, userDetails]);

  if (response) { console.log(response); }
  else if (error) { console.log(error); }

  const [name, setName] = useState('');
  const [rollNum, setRollNum] = useState('');
  const [password, setPassword] = useState('');
  const [sclassName, setSclassName] = useState('');
  const [studentSchool, setStudentSchool] = useState('');
  const [subjectMarks, setSubjectMarks] = useState('');
  const [subjectAttendance, setSubjectAttendance] = useState([]);

  const [openStates, setOpenStates] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpen = (subId) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [subId]: !prevState[subId],
    }));
  };

  const [value, setValue] = useState('1');
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [selectedSection, setSelectedSection] = useState('table');
  const handleSectionChange = (newSection) => {
    setSelectedSection(newSection);
  };

  const fields = password === ""
    ? { name, rollNum }
    : { name, rollNum, password };

  useEffect(() => {
    if (userDetails) {
      setName(userDetails.name || '');
      setRollNum(userDetails.rollNum || '');
      setSclassName(userDetails.sclassName || '');
      setStudentSchool(userDetails.school || '');
      setSubjectMarks(userDetails.examResult || '');
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUser(fields, studentID, address))
      .then(() => {
        dispatch(getUserDetails(studentID, address));
      })
      .catch((error) => {
        console.error(error);
      });
  };

   const deleteHandler = () => {
    

         dispatch(deleteUser(studentID, address))
            .then(() => {
                navigate(-1)
            })
    }
  const removeHandler = (id, deladdress) => {
    dispatch(removeStuff(id, deladdress))
      .then(() => {
        dispatch(getUserDetails(studentID, address));
      });
  };

  const removeSubAttendance = (subId) => {
    dispatch(updateStudentFields(studentID, { subId }, "RemoveStudentSubAtten"))
      .then(() => {
        dispatch(getUserDetails(studentID, address));
      });
  };

  const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;

  const chartData = [
    { name: 'Present', value: overallAttendancePercentage },
    { name: 'Absent', value: overallAbsentPercentage }
  ];

  const subjectData = Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { subCode, present, sessions }]) => {
    const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
    return {
      subject: subName,
      attendancePercentage: subjectAttendancePercentage,
      totalClasses: sessions,
      attendedClasses: present
    };
  });

  const StudentAttendanceSection = () => {
    const renderTableSection = () => {
      return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Attendance:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sessions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Percentage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                  const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{present}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sessions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subjectAttendancePercentage}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                          <button
                            onClick={() => handleOpen(subId)}
                            className="bg-blue-600 text-white px-3 py-1 rounded-md flex items-center hover:bg-blue-700"
                          >
                            {openStates[subId] ? <ChevronUpIcon className="h-4 w-4 mr-1" /> : <ChevronDownIcon className="h-4 w-4 mr-1" />}
                            Details
                          </button>
                          <button
                            onClick={() => removeSubAttendance(subId)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => navigate(`/Admin/subject/student/attendance/${studentID}/${subId}`)}
                            className="bg-purple-700 text-white px-3 py-1 rounded-md hover:bg-purple-800"
                          >
                            Change
                          </button>
                        </td>
                      </tr>
                      {openStates[subId] && (
                        <tr>
                          <td colSpan="5" className="px-6 py-4">
                            <div className="bg-gray-50 p-4 rounded-md">
                              <h4 className="text-lg font-medium text-gray-900 mb-2">Attendance Details</h4>
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {allData.map((data, index) => {
                                    const date = new Date(data.date);
                                    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                    return (
                                      <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dateString}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.status}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-lg font-medium text-gray-800">
            Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
          </div>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => removeHandler(studentID, "RemoveStudentAtten")}
              className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-red-700"
            >
              <TrashIcon className="h-5 w-5 mr-1" />
              Delete All
            </button>
            <button
              onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}
              className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900"
            >
              Add Attendance
            </button>
          </div>
        </div>
      );
    };

    const renderChartSection = () => {
      return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
        </div>
      );
    };

    return (
      <>
        {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
          <>
            {selectedSection === 'table' && renderTableSection()}
            {selectedSection === 'chart' && renderChartSection()}

            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
              <div className="flex justify-center">
                <div className="flex border border-gray-200 rounded-md m-2">
                  <button
                    onClick={() => handleSectionChange('table')}
                    className={`flex items-center px-4 py-2 rounded-l-md ${selectedSection === 'table' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
                  >
                    {selectedSection === 'table' ? <TableCellsIconSolid className="h-5 w-5 mr-1" /> : <TableCellsIcon className="h-5 w-5 mr-1" />}
                    Table
                  </button>
                  <button
                    onClick={() => handleSectionChange('chart')}
                    className={`flex items-center px-4 py-2 rounded-r-md ${selectedSection === 'chart' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
                  >
                    {selectedSection === 'chart' ? <ChartBarIconSolid className="h-5 w-5 mr-1" /> : <ChartBarIcon className="h-5 w-5 mr-1" />}
                    Chart
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <button
            onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}
            className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900"
          >
            Add Attendance
          </button>
        )}
      </>
    );
  };

  const StudentMarksSection = () => {
    const renderTableSection = () => {
      return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Subject Marks:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subjectMarks.map((result, index) => {
                  if (!result.subName || !result.marksObtained) {
                    return null;
                  }
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.subName.subName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.marksObtained}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => navigate("/Admin/students/student/marks/" + studentID)}
            className="mt-4 bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900"
          >
            Add Marks
          </button>
        </div>
      );
    };

    const renderChartSection = () => {
      return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
        </div>
      );
    };

    return (
      <>
        {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
          <>
            {selectedSection === 'table' && renderTableSection()}
            {selectedSection === 'chart' && renderChartSection()}

            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
              <div className="flex justify-center">
                <div className="flex border border-gray-200 rounded-md m-2">
                  <button
                    onClick={() => handleSectionChange('table')}
                    className={`flex items-center px-4 py-2 rounded-l-md ${selectedSection === 'table' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
                  >
                    {selectedSection === 'table' ? <TableCellsIconSolid className="h-5 w-5 mr-1" /> : <TableCellsIcon className="h-5 w-5 mr-1" />}
                    Table
                  </button>
                  <button
                    onClick={() => handleSectionChange('chart')}
                    className={`flex items-center px-4 py-2 rounded-r-md ${selectedSection === 'chart' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
                  >
                    {selectedSection === 'chart' ? <ChartBarIconSolid className="h-5 w-5 mr-1" /> : <ChartBarIcon className="h-5 w-5 mr-1" />}
                    Chart
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <button
            onClick={() => navigate("/Admin/students/student/marks/" + studentID)}
            className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900"
          >
            Add Marks
          </button>
        )}
      </>
    );
  };

  const StudentDetailsSection = () => {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="space-y-3">
          <p className="text-lg"><span className="font-semibold">Name:</span> {userDetails.name}</p>
          <p className="text-lg"><span className="font-semibold">Roll Number:</span> {userDetails.rollNum}</p>
          <p className="text-lg"><span className="font-semibold">Class:</span> {sclassName.sclassName}</p>
          <p className="text-lg"><span className="font-semibold">School:</span> {studentSchool.schoolName}</p>
        </div>
        
        {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 && (
          <div className="mt-6">
            <CustomPieChart data={chartData} />
          </div>
        )}
        
        <button
          onClick={deleteHandler}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div>Loading...</div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-6">
          <div className="mb-4">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => handleChange('1')}
                className={`py-2 px-4 font-medium ${value === '1' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              >
                Details
              </button>
              <button
                onClick={() => handleChange('2')}
                className={`py-2 px-4 font-medium ${value === '2' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              >
                Attendance
              </button>
              <button
                onClick={() => handleChange('3')}
                className={`py-2 px-4 font-medium ${value === '3' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              >
                Marks
              </button>
            </div>
          </div>

          <div className="mt-4">
            {value === '1' && <StudentDetailsSection />}
            {value === '2' && <StudentAttendanceSection />}
            {value === '3' && <StudentMarksSection />}
          </div>
        </div>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default ViewStudent;