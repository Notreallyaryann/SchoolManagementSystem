import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';


const calculateOverallAttendancePercentage = (attendanceData) => {
    if (!attendanceData || !Array.isArray(attendanceData)) {
        return 0;
    }
    
    let totalPresent = 0;
    let totalClasses = 0;
    
    attendanceData.forEach(attendance => {
        if (attendance && typeof attendance.present === 'number' && typeof attendance.totalClasses === 'number') {
            totalPresent += attendance.present;
            totalClasses += attendance.totalClasses;
        }
    });
    
    if (totalClasses === 0) {
        return 0;
    }
    
    return (totalPresent / totalClasses) * 100;
};

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);


    const classID = currentUser?.sclassName?._id;
    const schoolID = currentUser?.school?._id;

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getUserDetails(currentUser._id, "Student"));
        }
    }, [dispatch, currentUser?._id]);

    useEffect(() => {
        if (classID) {
            dispatch(getSubjectList(classID, "ClassSubjects"));
        }
    }, [dispatch, classID]);

    const numberOfSubjects = subjectsList ? subjectsList.length : 0;

    useEffect(() => {
        if (userDetails) {
            // ✅ Filter out any attendance records with null subName
            const validAttendance = (userDetails.attendance || []).filter(
                att => att && att.subName !== null && att.subName !== undefined
            );
            setSubjectAttendance(validAttendance);
            setIsDataLoaded(true);
        }
    }, [userDetails])

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];
    

    if (loading || !isDataLoaded) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

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
                        ) : subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                            <CustomPieChart data={chartData} />
                        ) : (
                            <p className="text-lg font-medium">No Attendance Found</p>
                        )}
                    </div>
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-4">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                  
                        {schoolID && <SeeNotice schoolID={schoolID} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentHomePage;
