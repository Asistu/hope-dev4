import React, { useState } from 'react';
import { Users, Settings, UserMinus } from 'lucide-react';
import BackButton from './BackButton';

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', subscription: 'Premium' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', subscription: 'Free' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', subscription: 'Premium' },
  ]);

  const handleResetPassword = (userId: number) => {
    console.log(`Reset password for user ${userId}`);
    // Implement password reset logic
  };

  const handleChangeSubscription = (userId: number, newSubscription: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, subscription: newSubscription } : user
    ));
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <BackButton />
      <div className="bg-white shadow-md p-6">
        <h1 className="text-3xl font-semibold text-purple-900">Admin Panel</h1>
      </div>
      <div className="container mx-auto p-6">
        {/* ... rest of the admin panel content ... */}
      </div>
    </div>
  );
};

export default AdminPanel;