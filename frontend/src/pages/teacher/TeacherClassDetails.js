import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const TeacherClassDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { sclassStudents, loading, error, getresponse } = useSelector((state) => state.sclass);

    const { currentUser } = useSelector((state) => state.user);
    const classID = currentUser.teachSclass?._id
    const subjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getClassStudents(classID));
    }, [dispatch, classID])

    if (error) {
        console.log(error)
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ]

    const studentRows = sclassStudents.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        };
    })

    const StudentsButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];

        const [open, setOpen] = useState(false);
        const anchorRef = useRef(null);
        const [selectedIndex, setSelectedIndex] = useState(0);

        const handleClick = () => {
            console.info(`You clicked ${options[selectedIndex]}`);
            if (selectedIndex === 0) {
                handleAttendance();
            } else if (selectedIndex === 1) {
                handleMarks();
            }
        };

        const handleAttendance = () => {
            navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`)
        }
        const handleMarks = () => {
            navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`)
        };

        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setOpen(false);
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }

            setOpen(false);
        };

        useEffect(() => {
            // Add event listener to close dropdown when clicking outside
            const handleClickOutside = (event) => {
                if (anchorRef.current && !anchorRef.current.contains(event.target)) {
                    setOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);

        return (
            <div className="flex gap-2">
                <button
                    onClick={() => navigate("/Teacher/class/student/" + row.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    View
                </button>
                
                <div className="relative" ref={anchorRef}>
                    <div className="flex">
                        <button
                            onClick={handleClick}
                            className="bg-blue-600 text-white px-4 py-2 rounded-l hover:bg-blue-700 transition-colors"
                        >
                            {options[selectedIndex]}
                        </button>
                        <button
                            onClick={handleToggle}
                            className="bg-black text-white px-2 py-2 rounded-r hover:bg-gray-800 transition-colors flex items-center"
                        >
                            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </button>
                    </div>
                    
                    {open && (
                        <div className="absolute right-0 z-10 mt-1 w-48 bg-white rounded-md shadow-lg overflow-hidden">
                            <div className="py-1">
                                {options.map((option, index) => (
                                    <button
                                        key={option}
                                        onClick={(event) => handleMenuItemClick(event, index)}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                                            index === selectedIndex ? 'bg-gray-100' : ''
                                        }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const TableTemplate = ({ buttonHaver: ButtonHaver, columns, rows }) => {
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.id}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {column.label}
                                </th>
                            ))}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {rows.map((row, index) => {
                            return (
                                <tr key={index} className="hover:bg-gray-50">
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <td key={column.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {value}
                                            </td>
                                        );
                                    })}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <ButtonHaver row={row} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div>Loading...</div>
                </div>
            ) : (
                <>
                    <h1 className="text-2xl font-bold text-center mb-4">
                        Class Details
                    </h1>
                    {getresponse ? (
                        <>
                            <div className="flex justify-end mt-4">
                                No Students Found
                            </div>
                        </>
                    ) : (
                        <div className="w-full overflow-hidden bg-white rounded-lg shadow">
                            <h2 className="text-xl font-semibold p-4">
                                Students List:
                            </h2>

                            {Array.isArray(sclassStudents) && sclassStudents.length > 0 &&
                                <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                            }
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default TeacherClassDetails;