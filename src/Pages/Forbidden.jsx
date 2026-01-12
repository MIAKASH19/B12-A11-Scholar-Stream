import React from 'react';
import { Link } from 'react-router';
import { Lock, ArrowLeft, Home, ShieldAlert } from 'lucide-react';

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19] flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full text-center">
        <div className="relative flex justify-center mb-8">
          <div className="absolute inset-0 bg-red-100 dark:bg-red-900 rounded-full blur-3xl opacity-50 scale-150"></div>
          <div className="relative bg-white dark:bg-[#1a1e2a] p-6 rounded-2xl shadow-xl border border-red-50 dark:border-red-800">
            <ShieldAlert size={80} className="text-red-500 animate-pulse" />
            <div className="absolute -top-2 -right-2">
              <Lock className="text-gray-800 dark:text-gray-200 bg-yellow-400 dark:bg-yellow-500 p-1.5 rounded-lg shadow-lg" size={32} />
            </div>
          </div>
        </div>

        <h1 className="text-6xl font-black text-gray-900 dark:text-gray-100 mb-2">403</h1>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Access Forbidden
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
          Sorry, Student! You don't have the valid permissions to access this page. 
          Please contact your administrator or go back to safety.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dashboard/my-applications"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-[#111622] border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-[#22283d] transition-all active:scale-95 shadow-sm"
          >
            <ArrowLeft size={18} />
            Go Back to Dashboard
          </Link>
          
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 dark:bg-indigo-700 text-white font-semibold rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-indigo-200 dark:shadow-indigo-900"
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
