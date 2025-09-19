import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import TableTemplate from "../../../components/TableTemplate";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import {
  UserPlusIcon,
  UserMinusIcon,
  TrashIcon,
  DocumentPlusIcon
} from "@heroicons/react/24/outline";

const ClassDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);

  const classID = params.id;

  useEffect(() => {
    dispatch(getClassDetails(classID, "Sclass"));
    dispatch(getSubjectList(classID, "ClassSubjects"));
    dispatch(getClassStudents(classID));
  }, [dispatch, classID]);

  if (error) {
    console.log(error);
  }

  const [activeTab, setActiveTab] = useState('details');
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");



const deleteHandler = (deleteID, address) => {
    
         dispatch(deleteUser(deleteID, address))
            .then(() => {
               dispatch(getClassStudents(classID));
               dispatch(resetSubjects())
               dispatch(getSubjectList(classID, "ClassSubjects"))
           })
    }



  const subjectColumns = [
    { id: 'name', label: 'Subject Name', minWidth: 170 },
    { id: 'code', label: 'Subject Code', minWidth: 100 },
  ];

  const subjectRows = subjectsList && subjectsList.length > 0 && subjectsList.map((subject) => {
    return {
      name: subject.subName,
      code: subject.subCode,
      id: subject._id,
    };
  });

  const SubjectsButtonHaver = ({ row }) => {
    return (
      <div className="flex space-x-2">
        <button 
          onClick={() => deleteHandler(row.id, "Subject")}
          className="text-red-600 hover:text-red-800 p-1"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          onClick={() => {
            navigate(`/Admin/class/subject/${classID}/${row.id}`);
          }}
        >
          View
        </button>
      </div>
    );
  };

  const subjectActions = [
    {
      icon: <DocumentPlusIcon className="h-5 w-5 text-blue-600" />, 
      name: 'Add New Subject',
      action: () => navigate("/Admin/addsubject/" + classID)
    },
    {
      icon: <TrashIcon className="h-5 w-5 text-red-600" />, 
      name: 'Delete All Subjects',
      action: () => deleteHandler(classID, "SubjectsClass")
    }
  ];

  const ClassSubjectsSection = () => {
    return (
      <div>
        {response ? (
          <div className="flex justify-end mt-4">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              onClick={() => navigate("/Admin/addsubject/" + classID)}
            >
              Add Subjects
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Subjects List:</h2>
            <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
            <SpeedDialTemplate actions={subjectActions} />
          </>
        )}
      </div>
    );
  };

  const studentColumns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
  ];

  const studentRows = sclassStudents.map((student) => {
    return {
      name: student.name,
      rollNum: student.rollNum,
      id: student._id,
    };
  });

  const StudentsButtonHaver = ({ row }) => {
    return (
      <div className="flex space-x-2">
        <button 
          onClick={() => deleteHandler(row.id, "Student")}
          className="text-red-600 hover:text-red-800 p-1"
        >
          <UserMinusIcon className="h-5 w-5" />
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          onClick={() => navigate("/Admin/students/student/" + row.id)}
        >
          View
        </button>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
          onClick={() => navigate("/Admin/students/student/attendance/" + row.id)}
        >
          Attendance
        </button>
      </div>
    );
  };

  const studentActions = [
    {
      icon: <UserPlusIcon className="h-5 w-5 text-blue-600" />, 
      name: 'Add New Student',
      action: () => navigate("/Admin/class/addstudents/" + classID)
    },
    {
      icon: <UserMinusIcon className="h-5 w-5 text-red-600" />, 
      name: 'Delete All Students',
      action: () => deleteHandler(classID, "StudentsClass")
    },
  ];

  const ClassStudentsSection = () => {
    return (
      <div>
        {getresponse ? (
          <div className="flex justify-end mt-4">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              onClick={() => navigate("/Admin/class/addstudents/" + classID)}
            >
              Add Students
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Students List:</h2>
            <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
            <SpeedDialTemplate actions={studentActions} />
          </>
        )}
      </div>
    );
  };

  const ClassTeachersSection = () => {
    return <div>Teachers</div>;
  };

  const ClassDetailsSection = () => {
    const numberOfSubjects = subjectsList.length;
    const numberOfStudents = sclassStudents.length;

    return (
      <>
        <h1 className="text-3xl font-bold text-center mb-6">Class Details</h1>
        <h2 className="text-xl font-bold mb-4">This is Class {sclassDetails && sclassDetails.sclassName}</h2>
        <p className="text-lg mb-2">Number of Subjects: {numberOfSubjects}</p>
        <p className="text-lg mb-4">Number of Students: {numberOfStudents}</p>
        {getresponse && (
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            onClick={() => navigate("/Admin/class/addstudents/" + classID)}
          >
            Add Students
          </button>
        )}
        {response && (
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded ml-2"
            onClick={() => navigate("/Admin/addsubject/" + classID)}
          >
            Add Subjects
          </button>
        )}
      </>
    );
  };

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'subjects', label: 'Subjects' },
    { id: 'students', label: 'Students' },
    { id: 'teachers', label: 'Teachers' },
  ];

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="w-full">
          <div className="border-b border-gray-200 fixed w-full bg-white z-10">
            <nav className="flex space-x-8 px-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="pt-20 pb-16 px-4">
            {activeTab === 'details' && (
              <div className="max-w-4xl mx-auto">
                <ClassDetailsSection />
              </div>
            )}
            {activeTab === 'subjects' && (
              <div className="max-w-6xl mx-auto">
                <ClassSubjectsSection />
              </div>
            )}
            {activeTab === 'students' && (
              <div className="max-w-6xl mx-auto">
                <ClassStudentsSection />
              </div>
            )}
            {activeTab === 'teachers' && (
              <div className="max-w-6xl mx-auto">
                <ClassTeachersSection />
              </div>
            )}
          </div>
        </div>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default ClassDetails;