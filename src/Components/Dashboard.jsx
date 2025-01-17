import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem("user"); // Example: clearing localStorage
    sessionStorage.clear();  // Clears sessionStorage

    // Redirect to the login page
    navigate("/");
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Student Dashboard</h1>
        <button 
          onClick={handleLogout} 
          className="text-sm text-blue-500 hover:underline"
        >
          Logout
        </button>
      </div>

      {/* Student Info Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Student Details</h2>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Roll Number:</strong> 12345</p>
        <p><strong>Program:</strong> B.Tech Computer Science</p>
      </div>

      {/* Resume Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Resume</h2>

        {/* Resume Link Display */}
        <p className="mb-4">
          <strong>Resume Link:</strong>{" "}
          <a
            href="https://drive.google.com/file/d/your-resume-id/view"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View Resume
          </a>
        </p>

        {/* Edit Resume Link Button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Edit Resume Link
        </button>

        {/* Form for new resume link (if not submitted yet) */}
        <form>
          <label htmlFor="resume-link" className="block text-sm font-medium text-gray-700">
            Resume Link (Google Drive):
          </label>
          <input
            type="url"
            id="resume-link"
            name="resume-link"
            placeholder="Paste your Google Drive link here"
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit Resume Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
