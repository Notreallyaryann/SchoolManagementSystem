import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Lessons from "../../assets/subjects.svg";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        if (subjectID) dispatch(getSubjectDetails(subjectID, "Subject"));
        if (classID) dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents?.length || 0;
    const numberOfSessions = subjectDetails?.sessions || 0;

    return (
        <div className="max-w-7xl mx-auto mt-8 mb-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Class Students Card */}
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between h-64 text-center">
                    <img src={Students} alt="Students" className="h-20 w-20 object-contain" />
                    <p className="text-xl font-semibold">Class Students</p>
                    <div className="text-3xl font-bold text-green-600">
                        <CountUp start={0} end={numberOfStudents} duration={2.5} separator="," />
                    </div>
                </div>

                {/* Total Lessons Card */}
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between h-64 text-center">
                    <img src={Lessons} alt="Lessons" className="h-20 w-20 object-contain" />
                    <p className="text-xl font-semibold">Total Lessons</p>
                    <div className="text-3xl font-bold text-green-600">
                        <CountUp start={0} end={numberOfSessions} duration={2.5} separator="," />
                    </div>
                </div>

                {/* Tests Taken Card */}
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between h-64 text-center">
                    <img src={Tests} alt="Tests" className="h-20 w-20 object-contain" />
                    <p className="text-xl font-semibold">Tests Taken</p>
                    <div className="text-3xl font-bold text-green-600">
                        <CountUp start={0} end={24} duration={4} separator="," />
                    </div>
                </div>

                {/* Total Hours Card */}
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between h-64 text-center">
                    <img src={Time} alt="Time" className="h-20 w-20 object-contain" />
                    <p className="text-xl font-semibold">Total Hours</p>
                    <div className="text-3xl font-bold text-green-600">
                        <CountUp start={0} end={30} duration={4} separator="," suffix=" hrs" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
                <SeeNotice />
            </div>
        </div>
    );
};

export default TeacherHomePage;