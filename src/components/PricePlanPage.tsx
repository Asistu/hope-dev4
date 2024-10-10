import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import BackButton from './BackButton';
import { useAuth } from '../context/AuthContext';

const PricePlanPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const handleSelectPlan = (plan: 'free' | 'premium') => {
    if (plan === 'premium') {
      navigate('/payment');
    } else {
      updateUser({ subscription: 'free' });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100 relative">
      <BackButton />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-3xl font-semibold mb-8 text-center text-purple-900">Choose Your Plan</h2>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
          <div className="bg-purple-50 p-6 rounded-lg shadow-md flex-1 flex flex-col">
            <h3 className="text-2xl font-semibold mb-4 text-purple-800">Free Plan</h3>
            <ul className="mb-6 flex-grow">
              <li className="flex items-center mb-2">
                <Check className="text-green-500 mr-2" size={20} />
                <span>1 message per day</span>
              </li>
              <li className="flex items-center mb-2">
                <Check className="text-green-500 mr-2" size={20} />
                <span>Basic support</span>
              </li>
              <li className="flex items-center mb-2">
                <Check className="text-green-500 mr-2" size={20} />
                <span>Access to community resources</span>
              </li>
            </ul>
            <button
              onClick={() => handleSelectPlan('free')}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
            >
              Select Free Plan
            </button>
          </div>
          <div className="bg-purple-100 p-6 rounded-lg shadow-md flex-1 flex flex-col border-2 border-purple-500">
            <h3 className="text-2xl font-semibold mb-4 text-purple-800">Premium Plan</h3>
            <div className="text-3xl font-bold mb-4 text-purple-900">£3.99<span className="text-lg font-normal">/month</span></div>
            <ul className="mb-6 flex-grow">
              <li className="flex items-center mb-2">
                <Check className="text-green-500 mr-2" size={20} />
                <span>Unlimited messages</span>
              </li>
              <li className="flex items-center mb-2">
                <Check className="text-green-500 mr-2" size={20} />
                <span>Priority support</span>
              </li>
              <li className="flex items-center mb-2">
                <Check className="text-green-500 mr-2" size={20} />
                <span>Personalized recovery plan</span>
              </li>
              <li className="flex items-center mb-2">
                <Check className="text-green-500 mr-2" size={20} />
                <span>Access to exclusive resources</span>
              </li>
            </ul>
            <button
              onClick={() => handleSelectPlan('premium')}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
            >
              Select Premium Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricePlanPage;