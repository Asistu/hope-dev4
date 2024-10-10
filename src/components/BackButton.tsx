import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute top-4 left-4 p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition duration-300"
    >
      <ArrowLeft size={24} />
    </button>
  );
};

export default BackButton;