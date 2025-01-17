import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use navigate for redirection
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'; // Firebase auth methods
import { auth } from '../firebaseConfig'; // Import the auth instance
import { toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook to navigate to another page after successful registration

  // Form validation
  const validateForm = () => {
    if (!email || !password) {
      setError('Please fill in both fields.');
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification link
      await sendEmailVerification(user);
      setLoading(false);

      // Show success message and redirect to login
      toast.success('Registration successful! Please check your email to verify your account.');
      navigate('/'); // Redirect to login page

    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200 relative px-4 sm:px-6 lg:px-8">
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-40 sm:w-40 sm:h-40 lg:w-48 lg:h-48"></div>
      <div className="absolute bottom-2 right-10 w-48 h-48 bg-green-400 rounded-full opacity-30 sm:w-56 sm:h-56 lg:w-64 lg:h-64"></div>
      <div className="absolute top-2 right-24 w-60 h-48 bg-red-500 opacity-20 rounded-lg sm:w-72 sm:h-56 lg:w-80 lg:h-64"></div>
      <div className="absolute bottom-10 left-10 w-56 h-56 bg-yellow-400 rounded-full opacity-30 sm:w-64 sm:h-64 lg:w-72 lg:h-72"></div>

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full sm:w-96 lg:w-1/3 z-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-blue-200 via-transparent to-transparent opacity-50 z-[-1]"></div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6 relative z-10">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
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

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 shadow-sm hover:shadow-md z-10"
              required
              minLength="6" // Minimum password length
            />
          </div>

          {error && <p className="text-sm text-red-500 mb-4 z-10">{error}</p>}

          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-500 text-white rounded-full font-medium transition duration-200 ${
              loading ? 'bg-blue-300' : 'hover:bg-blue-600'
            } z-10`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-4 text-center z-10">
          <p className="text-sm">
            Already have an account?{' '}
            <Link to="/" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
