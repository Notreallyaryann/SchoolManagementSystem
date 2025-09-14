import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';

const TeacherViewStudent = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);

    const address = "Student";
    const studentID = params.id;
    const teachSubject = currentUser.teachSubject?.subName;
    const teachSubjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    if (response) { console.log(response); }
    else if (error) { console.log(error); }

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;
    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div>Loading...</div>
                </div>
            ) : (
                <div className="p-6">
                    <div className="text-lg mb-4">
                        <span className="font-semibold">Name:</span> {userDetails.name}
                    </div>
                    <div className="text-lg mb-4">
                        <span className="font-semibold">Roll Number:</span> {userDetails.rollNum}
                    </div>
                    <div className="text-lg mb-4">
                        <span className="font-semibold">Class:</span> {sclassName.sclassName}
                    </div>
                    <div className="text-lg mb-6">
                        <span className="font-semibold">School:</span> {studentSchool.schoolName}
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Attendance:</h3>
                    {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 && (
                        <>
                            {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                if (subName === teachSubject) {
                                    const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                                    return (
                                        <div key={index} className="mb-6 overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sessions</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Percentage</th>
                                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{present}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sessions}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subjectAttendancePercentage}%</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                                                            <button 
                                                                onClick={() => handleOpen(subId)}
                                                                className="bg-blue-600 text-white px-3 py-2 rounded flex items-center gap-1"
                                                            >
                                                                {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                                Details
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" colSpan={6}>
                                                            <div className={`overflow-hidden transition-all duration-300 ${openStates[subId] ? 'max-h-96' : 'max-h-0'}`}>
                                                                <div className="my-2">
                                                                    <h4 className="text-lg font-semibold mb-2">
                                                                        Attendance Details
                                                                    </h4>
                                                                    <table className="min-w-full divide-y divide-gray-200">
                                                                        <thead className="bg-gray-50">
                                                                            <tr>
                                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                                            {allData.map((data, index) => {
                                                                                const date = new Date(data.date);
                                                                                const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                                return (
                                                                                    <tr key={index} className="hover:bg-gray-50">
                                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dateString}</td>
                                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{data.status}</td>
                                                                                    </tr>
                                                                                );
                                                                            })}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                            <div className="text-lg font-medium mb-6">
                                Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
                            </div>

                            <CustomPieChart data={chartData} />
                        </>
                    )}
                    
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700"
                        onClick={() => navigate(`/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`)}
                    >
                        Add Attendance
                    </button>
                    
                    <h3 className="text-xl font-semibold mb-4">Subject Marks:</h3>

                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 && (
                        <>
                            {subjectMarks.map((result, index) => {
                                if (result.subName.subName === teachSubject) {
                                    return (
                                        <div key={index} className="mb-6 overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.subName.subName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.marksObtained}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    );
                                } else if (!result.subName || !result.marksObtained) {
                                    return null;
                                }
                                return null;
                            })}
                        </>
                    )}
                    
                    <button
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                        onClick={() => navigate(`/Teacher/class/student/marks/${studentID}/${teachSubjectID}`)}
                    >
                        Add Marks
                    </button>
                </div>
            )}
        </>
    );
};

export default TeacherViewStudent;