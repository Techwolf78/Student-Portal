import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../firebaseConfig";
import { useNavigate } from "react-router-dom"; // For navigation

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // State for password
  const [college, setCollege] = useState(""); // State for selected college
  const [role, setRole] = useState(""); // State for selected role (Student/Faculty/Recruiter)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegisterNotification, setShowRegisterNotification] =
    useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false); // State for modal
  const navigate = useNavigate(); // Hook for navigation after successful login

  useEffect(() => {
    // Show the register notification only for first-time users (example)
    if (!localStorage.getItem("hasVisited")) {
      setShowRegisterNotification(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  // Form validation
  const validateForm = () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Check if email is verified
      if (!user.emailVerified) {
        setLoading(false);
        setError("Please verify your email address before logging in.");
        return;
      }

      setLoading(false);
      navigate("/dashboard"); // Navigate after successful login
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (error.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200 relative px-4 sm:px-6 lg:px-8">
      {/* Funky Shapes with responsive sizes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-40 sm:w-40 sm:h-40 lg:w-48 lg:h-48"></div>
      <div className="absolute bottom-2 right-10 w-48 h-48 bg-green-400 rounded-full opacity-30 sm:w-56 sm:h-56 lg:w-64 lg:h-64"></div>
      <div className="absolute top-2 right-24 w-60 h-48 bg-red-500 opacity-20 rounded-lg sm:w-72 sm:h-56 lg:w-80 lg:h-64"></div>
      <div className="absolute bottom-10 left-10 w-56 h-56 bg-yellow-400 rounded-full opacity-30 sm:w-64 sm:h-64 lg:w-72 lg:h-72"></div>

      {/* Register Notification (if first-time user) */}
      {showRegisterNotification && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md text-center z-20">
          <p className="text-sm font-semibold">
            New here?{" "}
            <Link to="/register" className="font-bold hover:underline">
              Register now!
            </Link>
          </p>
        </div>
      )}

      {/* Login Modal with Video */}
      <div className="flex bg-white rounded-lg shadow-xl w-full sm:w-96 lg:w-2/3 z-10 relative overflow-hidden">
        {/* Left Side: Plain white section */}
        <div className="w-1/2 bg-[#274258] p-6 sm:p-8 flex flex-col justify-center items-center relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-4 sm:mb-6 relative z-10">
            Student Portal
          </h2>

          <p className="text-sm text-gray-200 mb-4 z-10 text-center">
            Please login to continue to your dashboard.
          </p>

          {/* Video Section */}
          <div className="w-full h-48 overflow-hidden relative">
            <video
              className="object-cover w-full h-full"
              autoPlay
              loop
              muted
              src="landvideo.mp4" // Replace with your video URL
            />
          </div>
        </div>

        {/* Right Side: Gradient Blue Form Section */}
        <div className="w-1/2 p-6 sm:p-8 relative overflow-hidden">
          {/* Gradient Effect for the right side */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-blue-200 via-transparent to-transparent opacity-50 z-[-1]"></div>

          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6 relative z-10">
            Welcome Back!
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 shadow-sm hover:shadow-md z-20"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 shadow-sm hover:shadow-md"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="college"
                className="block text-sm font-medium text-gray-600"
              >
                Select College
              </label>
              <select
                id="college"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="mt-1 w-full px-4 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 shadow-sm hover:shadow-md"
              >
                <option value="">Select your college</option>
                <option value="College A">College A</option>
                <option value="College B">College B</option>
                <option value="College C">College C</option>
                <option value="College D">College D</option>
                <option value="College E">College E</option>
                <option value="College F">College F</option>
                <option value="College G">College G</option>
                <option value="College H">College H</option>
                <option value="College I">College I</option>
                <option value="College J">College J</option>
                <option value="College K">College K</option>
                <option value="College L">College L</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">
                Login as
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Student"
                    checked={role === "Student"}
                    onChange={() => setRole("Student")}
                    className="mr-2"
                  />
                  Student
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Faculty"
                    checked={role === "Faculty"}
                    onChange={() => setRole("Faculty")}
                    className="mr-2"
                  />
                  Faculty
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Recruiter"
                    checked={role === "Recruiter"}
                    onChange={() => setRole("Recruiter")}
                    className="mr-2"
                  />
                  Recruiter
                </label>
              </div>
            </div>

            {error && <p className="text-sm text-red-500 mb-4 z-10">{error}</p>}

            <button
              type="submit"
              className={`w-full py-2 px-4 bg-blue-500 text-white rounded-full font-medium transition duration-200 ${
                loading ? "bg-blue-300" : "hover:bg-blue-600"
              } z-10`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-4 text-center z-10">
            <Link
              to="/forgetpassword"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Modal for New User Registration */}
          <div
            className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-30 ${
              showRegisterModal ? "block" : "hidden"
            }`}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                New User?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                If you don't have an account, you can register now to get
                started!
              </p>

              {/* Container for buttons with flexbox */}
              <div className="flex justify-center space-x-4 mt-4">
                <Link
                  to="/register"
                  className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-200 hover:underline"
                  onClick={() => setShowRegisterModal(false)} // Close modal on click
                >
                  Register Now
                </Link>
                <button
                  className="text-sm py-2 px-6 text-gray-700 hover:underline rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200"
                  onClick={() => setShowRegisterModal(false)} // Close modal without action
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          {/* Button to Show Modal */}
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowRegisterModal(true)}
              className="text-sm text-blue-500 font-semibold hover:underline"
            >
              New user? Register now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
