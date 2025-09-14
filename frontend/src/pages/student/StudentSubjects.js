import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart'

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id])

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails])

    useEffect(() => {
        // Fix: Check if subjectMarks is empty by checking its length
        if (subjectMarks.length === 0) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleSectionChange = (newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <>
                <h2 className="text-2xl font-bold text-center mb-4">
                    Subject Marks
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {subjectMarks.map((result, index) => {
                                if (!result.subName || !result.marksObtained) {
                                    return null;
                                }
                                return (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.subName.subName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.marksObtained}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    };

    const renderChartSection = () => {
        return <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />;
    };

    const renderClassDetailsSection = () => {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Class Details
                </h2>
                <h3 className="text-xl font-semibold mb-3">
                    You are currently in Class {sclassDetails && sclassDetails.sclassName}
                </h3>
                <h4 className="text-lg font-medium mb-3">
                    And these are the subjects:
                </h4>
                {subjectsList &&
                    subjectsList.map((subject, index) => (
                        <div key={index} className="mb-2">
                            <p className="text-base">
                                {subject.subName} ({subject.subCode})
                            </p>
                        </div>
                    ))}
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
                <div>
                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
                        ?
                        (<>
                            <div className="pb-16">
                                {selectedSection === 'table' && renderTableSection()}
                                {selectedSection === 'chart' && renderChartSection()}
                            </div>

                            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => handleSectionChange('table')}
                                        className={`flex flex-col items-center p-3 ${selectedSection === 'table' ? 'text-blue-600' : 'text-gray-500'}`}
                                    >
                                        {selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                        <span className="text-xs mt-1">Table</span>
                                    </button>
                                    <button
                                        onClick={() => handleSectionChange('chart')}
                                        className={`flex flex-col items-center p-3 ${selectedSection === 'chart' ? 'text-blue-600' : 'text-gray-500'}`}
                                    >
                                        {selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                        <span className="text-xs mt-1">Chart</span>
                                    </button>
                                </div>
                            </div>
                        </>)
                        :
                        (<>
                            {renderClassDetailsSection()}
                        </>)
                    }
                </div>
            )}
        </>
    );
};

export default StudentSubjects;