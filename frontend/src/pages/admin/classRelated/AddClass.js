import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from "../../../components/Popup";
import Classroom from "../../../assets/classroom.png";

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error, tempDetails } = userState;

    const adminID = currentUser._id
    const address = "Sclass"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        sclassName,
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes/class/" + tempDetails._id)
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
    }, [status, navigate, error, response, dispatch, tempDetails]);
    
    return (
        <>
            <div className="flex flex-1 items-center justify-center p-4">
                <div className="max-w-md w-full p-12 mt-4 bg-white shadow-md border border-gray-300 rounded-lg">
                    <div className="flex flex-col items-center mb-8">
                        <img
                            src={Classroom}
                            alt="classroom"
                            className="w-4/5 max-w-xs"
                        />
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Create a class"
                                    value={sclassName}
                                    onChange={(event) => {
                                        setSclassName(event.target.value);
                                    }}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-70"
                                disabled={loader}
                            >
                                {loader ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                    </div>
                                ) : "Create"}
                            </button>
                            <button 
                                type="button"
                                onClick={() => navigate(-1)}
                                className="w-full border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium py-3 px-4 rounded-md transition-colors"
                            >
                                Go Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default AddClass