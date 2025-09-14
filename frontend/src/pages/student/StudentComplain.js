import { useEffect, useState } from 'react';
import Popup from '../../components/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../redux/userRelated/userHandle';

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch()

    const { status, currentUser, error } = useSelector(state => state.user);

    const user = currentUser._id
    const school = currentUser.school._id
    const address = "Complain"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        user,
        date,
        complaint,
        school,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Done Successfully")
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("Network Error")
        }
    }, [status, error])

    return (
        <>
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="max-w-md w-full px-6 py-16">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Complain</h1>
                    </div>
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                                Select Date
                            </label>
                            <input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="complaint" className="block text-sm font-medium text-gray-700 mb-1">
                                Write your complaint
                            </label>
                            <textarea
                                id="complaint"
                                value={complaint}
                                onChange={(event) => setComplaint(event.target.value)}
                                required
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Describe your complaint here..."
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loader}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex justify-center items-center disabled:opacity-70"
                        >
                            {loader ? (
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                            ) : (
                                "Add"
                            )}
                        </button>
                    </form>
                </div>
            </div>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default StudentComplain;