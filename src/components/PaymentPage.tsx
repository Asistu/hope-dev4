import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import { useAuth } from '../context/AuthContext';

const PaymentPage: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically process the payment
    console.log('Processing payment...');
    // After successful payment, update user subscription and navigate to dashboard
    updateUser({ subscription: 'premium' });
    navigate('/dashboard?plan=premium');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100 relative">
      <BackButton />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-purple-900">Payment Details</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Premium Plan</h3>
          <p className="text-gray-600">£3.99/month</p>
          <ul className="mt-2 text-sm">
            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Unlimited messages</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Priority support</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Personalized recovery plan</li>
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" required />
              <span className="ml-2 text-sm text-gray-700">
                I agree to the <a href="/terms" className="text-purple-600 hover:text-purple-800">Terms and Conditions</a>
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 flex items-center justify-center"
          >
            Pay £3.99/month
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;