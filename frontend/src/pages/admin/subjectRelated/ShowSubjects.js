import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';

// Heroicons for icons
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

const ShowSubjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const subjectColumns = [
        { id: 'subName', label: 'Sub Name', minWidth: 170 },
        { id: 'sessions', label: 'Sessions', minWidth: 170 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
        { id: 'actions', label: 'Actions', minWidth: 170 },
    ];

    const subjectRows = subjectsList.map((subject) => {
        return {
            subName: subject.subName,
            sessions: subject.sessions,
            sclassName: subject.sclassName.sclassName,
            sclassID: subject.sclassName._id,
            id: subject._id,
        };
    });

    const ActionsCell = ({ row }) => {
        return (
            <div className="flex space-x-2">
                <button
                    onClick={() => deleteHandler(row.id, "Subject")}
                    className="text-red-600 hover:text-red-800"
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
                <button
                    onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                >
                    View
                </button>
            </div>
        );
    };

    const actions = [
        {
            icon: <PlusCircleIcon className="h-5 w-5 text-blue-600" />, 
            name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/chooseclass")
        },
        {
            icon: <TrashIcon className="h-5 w-5 text-red-600" />, 
            name: 'Delete All Subjects',
            action: () => deleteHandler(currentUser._id, "Subjects")
        }
    ];

    const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div>Loading...</div>
                </div>
            ) : (
                <>
                    {response ? (
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => navigate("/Admin/subjects/chooseclass")}
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                            >
                                Add Subjects
                            </button>
                        </div>
                    ) : (
                        <div className="w-full overflow-hidden bg-white rounded-lg shadow">
                            {Array.isArray(subjectsList) && subjectsList.length > 0 && (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                {subjectColumns.map((column) => (
                                                    <th
                                                        key={column.id}
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        {column.label}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {subjectRows.map((row, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {row.subName}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {row.sessions}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {row.sclassName}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <ActionsCell row={row} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            
                            {/* Speed Dial */}
                            <div className="fixed bottom-4 right-4">
                                <div className="relative">
                                    {/* Speed Dial Toggle */}
                                    <button
                                        onClick={() => setIsSpeedDialOpen(!isSpeedDialOpen)}
                                        className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 focus:outline-none"
                                    >
                                        <svg 
                                            className={`w-6 h-6 transition-transform ${isSpeedDialOpen ? 'rotate-45' : ''}`} 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </button>
                                    
                                    {/* Speed Dial Actions */}
                                    {isSpeedDialOpen && (
                                        <div className="absolute bottom-14 right-0 mb-2 space-y-2">
                                            {actions.map((action, index) => (
                                                <div key={index} className="flex items-center">
                                                    <span className="mr-2 text-sm text-gray-700 bg-white px-2 py-1 rounded shadow-sm">
                                                        {action.name}
                                                    </span>
                                                    <button
                                                        onClick={action.action}
                                                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 shadow-md hover:bg-gray-100"
                                                    >
                                                        {action.icon}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ShowSubjects;