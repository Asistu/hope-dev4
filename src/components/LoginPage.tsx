import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BackButton from './BackButton';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      // Simulate an API call to fetch user data
      // In a real application, you would make an actual API call here
      const response = await simulateLoginAPI(email, password);
      
      if (response.success) {
        login(response.token, response.user);
        navigate('/dashboard');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  // Simulate an API call to a backend service
  const simulateLoginAPI = async (email: string, password: string) => {
    // This is a mock function. In a real app, you'd call your backend API here.
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate successful login
        if (email && password) {
          resolve({
            success: true,
            token: 'fake-token-' + Date.now(),
            user: {
              id: 'user-' + Date.now(),
              name: localStorage.getItem('lastSignupName') || 'User', // Use the name from last signup or default to 'User'
              email: email,
              subscription: 'free' as const
            }
          });
        } else {
          resolve({ success: false });
        }
      }, 1000); // Simulate network delay
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100 relative">
      <BackButton />
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center text-purple-900">Login to Hope AI</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/signup" className="text-purple-600 hover:text-purple-800 transition duration-300">
            Don't have an account? Sign up
          </Link>
        </div>
        <div className="mt-2 text-center">
          <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-gray-800 transition duration-300">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;