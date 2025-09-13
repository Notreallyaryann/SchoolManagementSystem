import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { PersonRemove, PersonAddAlt } from '@mui/icons-material'; // Corrected icon imports
import Popup from '../../../components/Popup';

const ShowTeachers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    } else if (response) {
        return (
            <div className="flex justify-end mt-4">
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    onClick={() => navigate("/Admin/teachers/chooseclass")}
                >
                    Add Teacher
                </button>
            </div>
        );
    } else if (error) {
        console.log(error);
    }

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'teachSubject', label: 'Subject', minWidth: 100 },
        { id: 'teachSclass', label: 'Class', minWidth: 170 },
    ];

    const rows = teachersList.map((teacher) => {
        return {
            name: teacher.name,
            teachSubject: teacher.teachSubject?.subName || null,
            teachSclass: teacher.teachSclass.sclassName,
            teachSclassID: teacher.teachSclass._id,
            id: teacher._id,
        };
    });

    const actions = [
        {
            icon: <PersonAddAlt color="primary" />, 
            name: 'Add New Teacher',
            action: () => navigate("/Admin/teachers/chooseclass")
        },
        {
            icon: <PersonRemove color="error" />, 
            name: 'Delete All Teachers',
            action: () => deleteHandler(currentUser._id, "Teachers")
        },
    ];

    // Custom pagination component
    const CustomPagination = () => {
        const totalPages = Math.ceil(rows.length / rowsPerPage);
        
        return (
            <div className="flex items-center justify-between mt-4 px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                <div className="flex items-center">
                    <span className="text-sm text-gray-700 mr-4">
                        Rows per page:
                    </span>
                    <select
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                        value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                        }}
                    >
                        {[5, 10, 25, 100].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700">
                        {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, rows.length)} of {rows.length}
                    </span>
                    
                    <button
                        className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50"
                        onClick={() => setPage(0)}
                        disabled={page === 0}
                    >
                        First
                    </button>
                    
                    <button
                        className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 0}
                    >
                        Previous
                    </button>
                    
                    <button
                        className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50"
                        onClick={() => setPage(page + 1)}
                        disabled={page >= totalPages - 1}
                    >
                        Next
                    </button>
                    
                    <button
                        className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50"
                        onClick={() => setPage(totalPages - 1)}
                        disabled={page >= totalPages - 1}
                    >
                        Last
                    </button>
                </div>
            </div>
        );
    };

    // Custom speed dial component
    const CustomSpeedDial = () => {
        const [isOpen, setIsOpen] = useState(false);
        
        return (
            <div className="fixed bottom-6 right-6 z-10">
                {isOpen && (
                    <div className="absolute bottom-14 right-0 mb-2 space-y-2">
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                className="flex items-center justify-end w-full px-4 py-2 text-sm text-gray-700 bg-white rounded-md shadow-md hover:bg-gray-100 transition-colors"
                                onClick={() => {
                                    action.action();
                                    setIsOpen(false);
                                }}
                            >
                                <span className="mr-2">{action.name}</span>
                                <span>{action.icon}</span>
                            </button>
                        ))}
                    </div>
                )}
                
                <button
                    className="flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition-colors text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
            </div>
        );
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.id}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </th>
                            ))}
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <tr key={row.id} className="hover:bg-gray-50">
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.id === 'teachSubject') {
                                                return (
                                                    <td key={column.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {value ? (
                                                            value
                                                        ) : (
                                                            <button
                                                                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                                                onClick={() => {
                                                                    navigate(`/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`)
                                                                }}
                                                            >
                                                                Add Subject
                                                            </button>
                                                        )}
                                                    </td>
                                                );
                                            }
                                            return (
                                                <td key={column.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </td>
                                            );
                                        })}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center space-x-2">
                                            <button
                                                className="text-red-600 hover:text-red-800 transition-colors"
                                                onClick={() => deleteHandler(row.id, "Teacher")}
                                            >
                                                <PersonRemove />
                                            </button>
                                            <button
                                                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                                onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            
            <CustomPagination />
            <CustomSpeedDial />
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
    );
};

export default ShowTeachers;