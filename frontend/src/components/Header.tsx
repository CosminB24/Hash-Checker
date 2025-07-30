import React from 'react';
import { Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative z-50 px-6 py-6">
      <nav className="max-w-7xl mx-auto">
        <div className="glass-morphism rounded-2xl px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75"></div>
                <div className="relative p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white tracking-tight">SecureCheck</span>
                <div className="text-xs text-gray-400 font-medium">Powered by VirusTotal</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-all duration-300 font-medium">
                Features
              </a>
              <a href="#security" className="text-gray-300 hover:text-white transition-all duration-300 font-medium">
                Security
              </a>
              <a href="#api" className="text-gray-300 hover:text-white transition-all duration-300 font-medium">
                API
              </a>
              <a href="#enterprise" className="text-gray-300 hover:text-white transition-all duration-300 font-medium">
                Enterprise
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="hidden md:block px-6 py-2.5 text-gray-300 hover:text-white transition-all duration-300 font-medium">
                Sign In
              </button>
              <button className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative px-8 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-300">
                  Get Started
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;