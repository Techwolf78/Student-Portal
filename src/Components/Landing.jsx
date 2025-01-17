// src/Components/Landing.jsx
import { useNavigate } from "react-router-dom";  // Import the useNavigate hook for navigation

const Landing = () => {
  const navigate = useNavigate();  // Hook to programmatically navigate

  // Function to handle the click on a college block
  const handleCollegeClick = () => {
    navigate("/login");  // Redirect to /login on college block click
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center py-10 bg-[url('landing.jpg')] bg-cover bg-center ">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">Welcome to the Student Portal</h1>
      <p className="text-lg mb-12 text-gray-700">Choose your college to log in:</p>

      <div className="flex flex-col space-y-6">
        {/* College 1 */}
        <div 
          className="w-80 h-16 bg-white border border-gray-300 rounded-lg shadow-lg p-4 cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
          onClick={handleCollegeClick}
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">College 1</h2>
        </div>

        {/* College 2 */}
        <div 
          className="w-80 h-16 bg-white border border-gray-300 rounded-lg shadow-lg p-4 cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
          onClick={handleCollegeClick}
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">College 2</h2>
        </div>

        {/* College 3 */}
        <div 
          className="w-80 h-16 bg-white border border-gray-300 rounded-lg shadow-lg p-4 cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
          onClick={handleCollegeClick}
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">College 3</h2>
        </div>
      </div>
    </div>
  );
};

export default Landing;
