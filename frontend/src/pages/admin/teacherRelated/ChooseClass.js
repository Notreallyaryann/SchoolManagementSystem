import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate } from 'react-router-dom';

const ChooseClass = ({ situation }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const navigateHandler = (classID) => {
        if (situation === "Teacher") {
            navigate("/Admin/teachers/choosesubject/" + classID);
        } else if (situation === "Subject") {
            navigate("/Admin/addsubject/" + classID);
        }
    };

    const SclassButtonHaver = ({ row }) => {
        return (
            <button
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                onClick={() => navigateHandler(row.id)}
            >
                Choose
            </button>
        );
    };

    return (
        <div className="p-6">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            ) : (
                <>
                    {getresponse ? (
                        <div className="flex justify-end mt-4">
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                onClick={() => navigate("/Admin/addclass")}
                            >
                                Add Class
                            </button>
                        </div>
                    ) : (
                        <>
                            <h6 className="text-lg font-medium text-gray-900 mb-4">
                                Choose a class
                            </h6>
                            {Array.isArray(sclassesList) && sclassesList.length > 0 && (
                                <div className="overflow-x-auto shadow-md rounded-lg">
                                    <table className="min-w-full bg-white border border-gray-200">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="py-3 px-6 text-left font-medium text-gray-700 uppercase tracking-wider">
                                                    Class Name
                                                </th>
                                                <th className="py-3 px-6 text-right font-medium text-gray-700 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {sclassesList.map((sclass) => (
                                                <tr key={sclass._id} className="hover:bg-gray-50">
                                                    <td className="py-4 px-6 whitespace-nowrap text-gray-800">
                                                        {sclass.sclassName}
                                                    </td>
                                                    <td className="py-4 px-6 whitespace-nowrap text-right">
                                                        <SclassButtonHaver row={{ id: sclass._id }} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ChooseClass;