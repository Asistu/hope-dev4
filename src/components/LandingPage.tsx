import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100 text-purple-900">
      <div className="text-6xl font-bold mb-4 flex items-center">
        <MessageSquare className="mr-2" size={48} />
        Hope AI
      </div>
      <h1 className="text-3xl font-semibold mb-8">Your personal AI addiction support. 24/7</h1>
      <div className="mb-8">
        <img 
          src="https://github.com/Asistu/hope-ai-assets/blob/main/Hope.jpg?raw=true"
          alt="Hope AI Consultant" 
          className="rounded-full w-64 h-64 object-cover shadow-lg"
        />
      </div>
      <Link
        to="/login"
        className="bg-purple-600 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-purple-700 transition duration-300"
      >
        Chat Now
      </Link>
    </div>
  );
};

export default LandingPage;