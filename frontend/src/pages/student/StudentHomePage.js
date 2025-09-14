import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];
    
    return (
        <div className="max-w-7xl mx-auto mt-8 mb-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-between h-64">
                        <img src={Subject} alt="Subjects" className="h-24 w-24 mb-4" />
                        <p className="text-xl font-medium mb-2">Total Subjects</p>
                        <CountUp 
                            start={0} 
                            end={numberOfSubjects} 
                            duration={2.5} 
                            className="text-3xl font-bold text-green-600"
                        />
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-between h-64">
                        <img src={Assignment} alt="Assignments" className="h-24 w-24 mb-4" />
                        <p className="text-xl font-medium mb-2">Total Assignments</p>
                        <CountUp 
                            start={0} 
                            end={15} 
                            duration={4} 
                            className="text-3xl font-bold text-green-600"
                        />
                    </div>
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                    <div className="bg-white p-2 rounded-lg shadow-md flex flex-col justify-center items-center h-64 text-center">
                        {response ? (
                            <p className="text-lg font-medium">No Attendance Found</p>
                        ) : loading ? (
                            <p className="text-lg font-medium">Loading...</p>
                        ) : subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                            <CustomPieChart data={chartData} />
                        ) : (
                            <p className="text-lg font-medium">No Attendance Found</p>
                        )}
                    </div>
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-4">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <SeeNotice />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentHomePage;