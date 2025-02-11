import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { toast } from "react-toastify";

const AppointmentReason = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctorId, appointmentDate, appointmentTime } = location.state || {};
  const { backendUrl, userId, loading } = useContext(AppContext);
  const [reason, setReason] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first!", { position: "top-right", autoClose: 3000 });
      navigate("/login");
      return;
    }

    if (userId === null && !loading) {
      window.location.reload();
    }
  }, [loading, userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      alert("User is still loading, please wait.");
      return;
    }

    if (!userId || !doctorId || !appointmentDate || !appointmentTime) {
      alert("Missing appointment details. Please try again.");
      return;
    }

    const formattedTime = new Date(`1970-01-01 ${appointmentTime}`).toLocaleTimeString("en-GB", { hour12: false });

    const appointmentData = {
      PatientID: userId,
      DoctorID: doctorId,
      AppointmentDate: appointmentDate,
      AppointmentTime: formattedTime,
      Reason: reason,
      Status: 0,
    };

    try {
      const response = await axios.post(
        `${backendUrl}/api/appointment`,
        appointmentData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/appointment-success");
    } catch (error) {
      alert("There was an error while creating your appointment. Please try again.");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold">Loading User Information...</div>;
  }

  if (!userId) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold">User not found. Please log in again.</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">Enter Appointment Reason</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
            Reason for appointment
          </label>
          <textarea
            id="reason"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            placeholder="Enter reason for your appointment"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full mt-6 py-3 rounded-lg text-white text-lg font-medium transition duration-300 ease-in-out ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit Appointment"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentReason;
