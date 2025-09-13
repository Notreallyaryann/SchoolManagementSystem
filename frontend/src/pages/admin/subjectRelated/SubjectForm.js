import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from '../../../components/Popup';

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;

    const sclassName = params.id
    const adminID = currentUser._id
    const address = "Subject"

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    const handleSubjectNameChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subName = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSubjectCodeChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subCode = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSessionsChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].sessions = event.target.value || 0;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subName: "", subCode: "" }]);
    };

    const handleRemoveSubject = (index) => () => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const fields = {
        sclassName,
        subjects: subjects.map((subject) => ({
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
        })),
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === 'added') {
            navigate("/Admin/subjects");
            dispatch(underControl())
            setLoader(false)
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-xl font-bold mb-4">Add Subjects</h2>
            <form onSubmit={submitHandler} className="space-y-6">
                {subjects.map((subject, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                        <div className="md:col-span-5">
                            <label htmlFor={`subName-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                Subject Name
                            </label>
                            <input
                                id={`subName-${index}`}
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Subject Name"
                                value={subject.subName}
                                onChange={handleSubjectNameChange(index)}
                                required
                            />
                        </div>
                        <div className="md:col-span-3">
                            <label htmlFor={`subCode-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                Subject Code
                            </label>
                            <input
                                id={`subCode-${index}`}
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Subject Code"
                                value={subject.subCode}
                                onChange={handleSubjectCodeChange(index)}
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor={`sessions-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                Sessions
                            </label>
                            <input
                                id={`sessions-${index}`}
                                type="number"
                                min="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={subject.sessions}
                                onChange={handleSessionsChange(index)}
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            {index === 0 ? (
                                <button
                                    type="button"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                                    onClick={handleAddSubject}
                                >
                                    Add Subject
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
                                    onClick={handleRemoveSubject(index)}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors disabled:opacity-70 flex items-center justify-center"
                        disabled={loader}
                    >
                        {loader ? (
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Saving...
                            </div>
                        ) : (
                            'Save'
                        )}
                    </button>
                </div>
            </form>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
    );
}

export default SubjectForm;