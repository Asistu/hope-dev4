import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BackButton from './BackButton';

const DashboardPage: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newPlan = params.get('plan');
    if (newPlan && user) {
      updateUser({ subscription: newPlan as 'free' | 'premium' });
      navigate('/dashboard', { replace: true });
    }
  }, [location, user, updateUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-purple-100 p-8 relative">
      <BackButton />
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-purple-900">Welcome, {user.name}</h1>
          <div className={`${user.subscription === 'premium' ? 'bg-green-500' : 'bg-blue-500'} text-white px-4 py-2 rounded-full text-sm font-semibold`}>
            {user.subscription === 'premium' ? 'Premium Plan' : 'Free Plan'}
          </div>
        </div>
        
        <Link to="/chat" className="block bg-purple-600 text-white py-4 px-6 rounded-lg mb-8 text-center text-xl font-semibold hover:bg-purple-700 transition duration-300">
          Start New Chat
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> Not provided</p>
            <label className="flex items-center mt-4">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" />
              <span className="ml-2 text-sm">Receive marketing emails</span>
            </label>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Subscription</h2>
            <p><strong>Current Plan:</strong> {user.subscription === 'premium' ? 'Premium' : 'Free'}</p>
            <p><strong>Next billing date:</strong> {user.subscription === 'premium' ? '01/05/2024' : 'N/A'}</p>
            <div className="mt-4">
              <Link to="/price-plan" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300 mr-2">
                Change Plan
              </Link>
              {user.subscription === 'premium' && (
                <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300">
                  Cancel Subscription
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Chat History</h2>
            <ul>
              <li>Session 1 - 01/04/2024</li>
              <li>Session 2 - 31/03/2024</li>
              <li>Session 3 - 30/03/2024</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <Link to="/update-password" className="block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300 mb-2 text-center">
              Update Password
            </Link>
            <Link to="/delete-account" className="block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 text-center">
              Delete Account
            </Link>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;