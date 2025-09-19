import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import TableTemplate from '../../../components/TableTemplate';
import Popup from '../../../components/Popup';
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

const ShowClasses = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user)

  const adminID = currentUser._id

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  if (error) {
    console.log(error)
  }

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const deleteHandler = (deleteID, address) => {
  
    dispatch(deleteUser(deleteID, address))
     .then(() => {
       dispatch(getAllSclasses(adminID, "Sclass"));
      })
  }

  const sclassColumns = [
    { id: 'name', label: 'Class Name', minWidth: 170 },
  ]

  const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
    return {
      name: sclass.sclassName,
      id: sclass._id,
    };
  })

  const ActionMenu = ({ actions }) => {
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    return (
      <>
        <div className="flex items-center text-center">
          <div 
            className="relative group"
            title="Add Students & Subjects"
          >
            <button
              onClick={handleClick}
              className="ml-2 p-1 text-sm flex items-center gap-1"
            >
              <span className="font-medium">Add</span>
              <SpeedDialIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        {open && (
          <div className="fixed inset-0 z-10" onClick={handleClose}>
            <div 
              className="absolute right-2 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-20"
              style={{ transformOrigin: 'right top' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute -top-2 right-3 w-4 h-4 rotate-45 bg-white"></div>
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    action.action();
                    handleClose();
                  }}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span className="mr-2">{action.icon}</span>
                  {action.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }

  const SclassButtonHaver = ({ row }) => {
    const actions = [
      { icon: <PostAddIcon />, name: 'Add Subjects', action: () => navigate("/Admin/addsubject/" + row.id) },
      { icon: <PersonAddAlt1Icon />, name: 'Add Student', action: () => navigate("/Admin/class/addstudents/" + row.id) },
    ];
    
    return (
      <div className="flex items-center justify-center gap-4">
        <button 
          onClick={() => deleteHandler(row.id, "Sclass")} 
          className="text-red-500 hover:text-red-700 p-1"
        >
          <DeleteIcon />
        </button>
        <button
          onClick={() => navigate("/Admin/classes/class/" + row.id)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          View
        </button>
        <ActionMenu actions={actions} />
      </div>
    );
  };

  const SpeedDialTemplate = ({ actions }) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setOpen(!open)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <SpeedDialIcon />
        </button>
        
        {open && (
          <div className="absolute bottom-full right-0 mb-2 space-y-2">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="flex items-center bg-white text-gray-700 rounded-lg shadow-md p-3 hover:bg-gray-100 transition-colors"
                title={action.name}
              >
                {action.icon}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const actions = [
    {
      icon: <AddCardIcon className="text-blue-500" />, 
      name: 'Add New Class',
      action: () => navigate("/Admin/addclass")
    },
    {
      icon: <DeleteIcon className="text-red-500" />, 
      name: 'Delete All Classes',
      action: () => deleteHandler(adminID, "Sclasses")
    },
  ];

  return (
    <>
      {loading ?
        <div>Loading...</div>
        :
        <>
          {getresponse ?
            <div className="flex justify-end mt-4">
              <button 
                onClick={() => navigate("/Admin/addclass")}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
              >
                Add Class
              </button>
            </div>
            :
            <>
              {Array.isArray(sclassesList) && sclassesList.length > 0 &&
                <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
              }
              <SpeedDialTemplate actions={actions} />
            </>}
        </>
      }
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default ShowClasses;