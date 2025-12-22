import React from 'react';
import { Link, useNavigate } from 'react-router';
import { Lock, ArrowLeft, Home, ShieldAlert } from 'lucide-react';

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full text-center">
        <div className="relative flex justify-center mb-8">
          <div className="absolute inset-0 bg-red-100 rounded-full blur-3xl opacity-50 scale-150"></div>
          <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-red-50">
            <ShieldAlert size={80} className="text-red-500 animate-pulse" />
            <div className="absolute -top-2 -right-2">
              <Lock size={32} className="text-gray-800 bg-yellow-400 p-1.5 rounded-lg shadow-lg" />
            </div>
          </div>
        </div>

        <h1 className="text-6xl font-black text-gray-900 mb-2">403</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Access Forbidden
        </h2>
        <p className="text-gray-600 mb-10 leading-relaxed">
          Sorry, Student! You don't have the valid permissions to access this Page. 
          Please contact your administrator or go back to safety.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
          to="/dashboard/my-applications"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
          >
            <ArrowLeft size={18} />
            Go Back to Dashboard
          </Link>
          
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Forbidden;