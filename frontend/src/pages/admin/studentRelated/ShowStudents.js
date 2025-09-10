import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import TableTemplate from '../../../components/TableTemplate';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowStudents = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { studentsList, loading, error, response } = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ]

    const studentRows = studentsList && studentsList.length > 0 && studentsList.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            sclassName: student.sclassName.sclassName,
            id: student._id,
        };
    })

    const StudentButtonHaver = ({ row }) => {
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
            navigate("/Admin/students/student/attendance/" + row.id)
        }
        
        const handleMarks = () => {
            navigate("/Admin/students/student/marks/" + row.id)
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
            function handleClickOutside(event) {
                if (anchorRef.current && !anchorRef.current.contains(event.target)) {
                    setOpen(false);
                }
            }
            
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);

        return (
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => deleteHandler(row.id, "Student")}
                    className="text-red-500 hover:text-red-700 p-1"
                >
                    <PersonRemoveIcon />
                </button>
                <button
                    onClick={() => navigate("/Admin/students/student/" + row.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                >
                    View
                </button>
                
                <div className="relative" ref={anchorRef}>
                    <div className="flex rounded-md shadow-sm">
                        <button
                            onClick={handleClick}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-l-md"
                        >
                            {options[selectedIndex]}
                        </button>
                        <button
                            onClick={handleToggle}
                            className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-2 rounded-r-md"
                        >
                            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </button>
                    </div>
                    
                    {open && (
                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1">
                                {options.map((option, index) => (
                                    <button
                                        key={option}
                                        className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                                            index === selectedIndex ? 'bg-gray-100' : ''
                                        }`}
                                        onClick={(event) => handleMenuItemClick(event, index)}
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

    const actions = [
        {
            icon: <PersonAddAlt1Icon className="text-blue-500" />, 
            name: 'Add New Student',
            action: () => navigate("/Admin/addstudents")
        },
        {
            icon: <PersonRemoveIcon className="text-red-500" />, 
            name: 'Delete All Students',
            action: () => deleteHandler(currentUser._id, "Students")
        },
    ];

    return (
        <div className="p-4">
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {response ?
                        <div className="flex justify-end mt-4">
                            <button 
                                onClick={() => navigate("/Admin/addstudents")}
                                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
                            >
                                Add Students
                            </button>
                        </div>
                        :
                        <div className="w-full overflow-hidden bg-white rounded-lg shadow">
                            {Array.isArray(studentsList) && studentsList.length > 0 &&
                                <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </div>
                    }
                </>
            }
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
    );
};

export default ShowStudents;