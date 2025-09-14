import React, { useEffect, useState } from 'react'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomBarChart from '../../components/CustomBarChart'
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const ViewStdAttendance = () => {
    const dispatch = useDispatch();

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const attendanceBySubject = groupAttendanceBySubject(subjectAttendance)

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);

    const subjectData = Object.entries(attendanceBySubject).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    const handleSectionChange = (newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <>
                <h2 className="text-2xl font-bold text-center mb-4">
                    Attendance
                </h2>
                <div className="overflow-x-auto">
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
                        {Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
                            const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                            return (
                                <tbody key={index} className="bg-white divide-y divide-gray-200">
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
                                                    <h3 className="text-lg font-semibold mb-2">
                                                        Attendance Details
                                                    </h3>
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
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        }
                        )}
                    </table>
                </div>
                <div className="mt-4 text-lg font-medium">
                    Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
                </div>
            </>
        )
    }

    const renderChartSection = () => {
        return (
            <>
                <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
            </>
        )
    };

    return (
        <>
            {loading
                ? (
                    <div className="flex justify-center items-center h-64">
                        <div>Loading...</div>
                    </div>
                )
                :
                <div>
                    {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ?
                        <>
                            <div className="pb-16">
                                {selectedSection === 'table' && renderTableSection()}
                                {selectedSection === 'chart' && renderChartSection()}
                            </div>

                            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => handleSectionChange('table')}
                                        className={`flex flex-col items-center p-3 ${selectedSection === 'table' ? 'text-blue-600' : 'text-gray-500'}`}
                                    >
                                        {selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                        <span className="text-xs mt-1">Table</span>
                                    </button>
                                    <button
                                        onClick={() => handleSectionChange('chart')}
                                        className={`flex flex-col items-center p-3 ${selectedSection === 'chart' ? 'text-blue-600' : 'text-gray-500'}`}
                                    >
                                        {selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                        <span className="text-xs mt-1">Chart</span>
                                    </button>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <h3 className="text-xl font-semibold mb-4">
                                Currently You Have No Attendance Details
                            </h3>
                        </>
                    }
                </div>
            }
        </>
    )
}

export default ViewStdAttendance