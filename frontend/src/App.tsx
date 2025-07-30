import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium Mesh Background */}
      <div className="fixed inset-0 mesh-gradient opacity-20"></div>
      
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Large floating orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <Hero />
      </div>
    </div>
  );
}

export default App;