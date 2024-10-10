import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100 text-purple-900">
      <h1 className="text-4xl font-bold mb-4">Welcome to Hope AI</h1>
      <p className="text-xl mb-8">Your personal AI addiction support. 24/7</p>
      <Link
        to="/login"
        className="bg-purple-600 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-purple-700 transition duration-300"
      >
        Get Started
      </Link>
    </div>
  );
};

export default LandingPage;