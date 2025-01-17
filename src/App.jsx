// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // Import Routes and Route
import Login from "./Components/Login";  // Import Login
import Dashboard from "./Components/Dashboard";
import ForgetPassword from "./Components/ForgetPassword";
import Register from "./Components/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the login page (set as default now) */}
        <Route path="/" element={<Login />} />  {/* Set Login as the default page */}
        
        {/* Route for the register page */}
        <Route path="/register" element={<Register />} />
        
        {/* Route for the dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Route for the forget password page */}
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
