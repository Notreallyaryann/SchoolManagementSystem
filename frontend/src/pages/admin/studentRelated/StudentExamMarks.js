import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import Popup from '../../../components/Popup';

const StudentExamMarks = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams();

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [marksObtained, setMarksObtained] = useState("");

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (situation === "Student") {
            setStudentID(params.id);
            const stdID = params.id;
            dispatch(getUserDetails(stdID, "Student"));
        } else if (situation === "Subject") {
            const { studentID, subjectID } = params;
            setStudentID(studentID);
            dispatch(getUserDetails(studentID, "Student"));
            setChosenSubName(subjectID);
        }
    }, [situation]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === event.target.value
        );
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    };

    const fields = { subName: chosenSubName, marksObtained };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(updateStudentFields(studentID, fields, "UpdateExamResult"));
    };

    useEffect(() => {
        if (response) {
            setLoader(false);
            setShowPopup(true);
            setMessage(response);
        } else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage("error");
        } else if (statestatus === "added") {
            setLoader(false);
            setShowPopup(true);
            setMessage("Done Successfully");
        }
    }, [response, statestatus, error]);

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div>Loading...</div>
                </div>
            ) : (
                <>
                    <div className="flex flex-1 items-center justify-center p-4">
                        <div className="max-w-md w-full px-4 py-16">
                            <div className="space-y-2 mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Student Name: {userDetails.name}
                                </h2>
                                {currentUser.teachSubject && (
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Subject Name: {currentUser.teachSubject?.subName}
                                    </h2>
                                )}
                            </div>
                            <form onSubmit={submitHandler} className="space-y-4">
                                {situation === "Student" && (
                                    <div className="w-full">
                                        <label htmlFor="subject-select" className="block text-sm font-medium text-gray-700 mb-1">
                                            Select Subject
                                        </label>
                                        <select
                                            id="subject-select"
                                            value={subjectName}
                                            onChange={changeHandler}
                                            className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        >
                                            <option value="">Choose a subject</option>
                                            {subjectsList ? (
                                                subjectsList.map((subject, index) => (
                                                    <option key={index} value={subject.subName}>
                                                        {subject.subName}
                                                    </option>
                                                ))
                                            ) : (
                                                <option value="">Add Subjects For Marks</option>
                                            )}
                                        </select>
                                    </div>
                                )}
                                <div className="w-full">
                                    <label htmlFor="marks" className="block text-sm font-medium text-gray-700 mb-1">
                                        Enter marks
                                    </label>
                                    <input
                                        type="number"
                                        id="marks"
                                        value={marksObtained}
                                        onChange={(e) => setMarksObtained(e.target.value)}
                                        className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loader}
                                    className="w-full py-2.5 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 flex justify-center items-center"
                                >
                                    {loader ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        "Submit"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                    <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
                </>
            )}
        </>
    );
};

export default StudentExamMarks;