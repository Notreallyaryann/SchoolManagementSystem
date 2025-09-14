import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            ) : (
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                        Teacher Details
                    </h1>
                    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Teacher Name:</h2>
                            <p className="text-lg text-gray-900">{teacherDetails?.name}</p>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Class Name:</h2>
                            <p className="text-lg text-gray-900">{teacherDetails?.teachSclass?.sclassName}</p>
                        </div>
                        {isSubjectNamePresent ? (
                            <>
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Subject Name:</h2>
                                    <p className="text-lg text-gray-900">{teacherDetails?.teachSubject?.subName}</p>
                                </div>
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Subject Sessions:</h2>
                                    <p className="text-lg text-gray-900">{teacherDetails?.teachSubject?.sessions}</p>
                                </div>
                            </>
                        ) : (
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                onClick={handleAddSubject}
                            >
                                Add Subject
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default TeacherDetails;