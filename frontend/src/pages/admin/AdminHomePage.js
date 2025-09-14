import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CountUp from 'react-countup';
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user)

    const adminID = currentUser._id

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    return (
        <div className="container mx-auto p-4 mt-4 mb-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Students Card */}
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between h-60">
                    <img src={Students} alt="Students" className="h-20 w-20 object-contain" />
                    <p className="text-xl font-medium text-center">Total Students</p>
                    <div className="text-2xl md:text-3xl font-bold text-green-600">
                        <CountUp start={0} end={numberOfStudents} duration={2.5} />
                    </div>
                </div>

                {/* Classes Card */}
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between h-60">
                    <img src={Classes} alt="Classes" className="h-20 w-20 object-contain" />
                    <p className="text-xl font-medium text-center">Total Classes</p>
                    <div className="text-2xl md:text-3xl font-bold text-green-600">
                        <CountUp start={0} end={numberOfClasses} duration={5} />
                    </div>
                </div>

                {/* Teachers Card */}
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between h-60">
                    <img src={Teachers} alt="Teachers" className="h-20 w-20 object-contain" />
                    <p className="text-xl font-medium text-center">Total Teachers</p>
                    <div className="text-2xl md:text-3xl font-bold text-green-600">
                        <CountUp start={0} end={numberOfTeachers} duration={2.5} />
                    </div>
                </div>

                {/* Fees Card */}
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between h-60">
                    <img src={Fees} alt="Fees" className="h-20 w-20 object-contain" />
                    <p className="text-xl font-medium text-center">Fees Collection</p>
                    <div className="text-2xl md:text-3xl font-bold text-green-600">
                        <CountUp start={0} end={23000} duration={2.5} prefix="$" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <SeeNotice />
            </div>
        </div>
    );
};

export default AdminHomePage;