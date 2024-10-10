import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import PricePlanPage from './components/PricePlanPage';
import PaymentPage from './components/PaymentPage';
import DashboardPage from './components/DashboardPage';
import ChatPage from './components/ChatPage';
import UpdatePasswordPage from './components/UpdatePasswordPage';
import DeleteAccountPage from './components/DeleteAccountPage';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="min-h-screen bg-purple-100">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/price-plan" element={<PricePlanPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/update-password" element={<UpdatePasswordPage />} />
            <Route path="/delete-account" element={<DeleteAccountPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;