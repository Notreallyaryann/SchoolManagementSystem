import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherFreeClassSubjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateTeachSubject } from '../../../redux/teacherRelated/teacherHandle';

const ChooseSubject = ({ situation }) => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [classID, setClassID] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [loader, setLoader] = useState(false);

    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);

    useEffect(() => {
        if (situation === "Norm") {
            setClassID(params.id);
            const classID = params.id;
            dispatch(getTeacherFreeClassSubjects(classID));
        } else if (situation === "Teacher") {
            const { classID, teacherID } = params;
            setClassID(classID);
            setTeacherID(teacherID);
            dispatch(getTeacherFreeClassSubjects(classID));
        }
    }, [situation]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    } else if (response) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Sorry, all subjects have teachers assigned already</h1>
                <div className="flex justify-end mt-4">
                    <button
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                        onClick={() => navigate("/Admin/addsubject/" + classID)}
                    >
                        Add Subjects
                    </button>
                </div>
            </div>
        );
    } else if (error) {
        console.log(error);
    }

    const updateSubjectHandler = (teacherId, teachSubject) => {
        setLoader(true);
        dispatch(updateTeachSubject(teacherId, teachSubject));
        navigate("/Admin/teachers");
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Choose a subject</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Name</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Code</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {Array.isArray(subjectsList) && subjectsList.length > 0 && subjectsList.map((subject, index) => (
                            <tr key={subject._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                                    {subject.subName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                                    {subject.subCode}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                                    {situation === "Norm" ? (
                                        <button
                                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                            onClick={() => navigate("/Admin/teachers/addteacher/" + subject._id)}
                                        >
                                            Choose
                                        </button>
                                    ) : (
                                        <button
                                            className={`px-4 py-2 bg-green-600 text-white rounded-md transition-colors ${loader ? 'opacity-75 cursor-not-allowed' : 'hover:bg-green-700'}`}
                                            disabled={loader}
                                            onClick={() => updateSubjectHandler(teacherID, subject._id)}
                                        >
                                            {loader ? (
                                                <div className="flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                                    Choosing...
                                                </div>
                                            ) : (
                                                'Choose Sub'
                                            )}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChooseSubject;