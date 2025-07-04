
import React from 'react';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 min-h-screen relative overflow-hidden flex items-center justify-center bg-white/80 backdrop-blur-sm">
      {/* Animated Color Wave Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/40 via-purple-500/40 to-purple-700/40">
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-green-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{ animationDelay: '3s' }}></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Unlock Logo - More translucent and balanced */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img 
              src="/lovable-uploads/dd54b562-c219-4e53-90c7-fc20da7ef42e.png" 
              alt="Unlock Protocol" 
              className="h-20 w-auto opacity-60 filter drop-shadow-lg animate-pulse"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl font-serif italic text-gray-800 drop-shadow-sm">
            Unlock Protocol
          </h2>
          
          <p className="text-lg text-gray-600 font-light tracking-wide drop-shadow-sm">
            Loading DAO Governance...
          </p>
        </div>
        
        {/* Loading Animation */}
        <div className="flex justify-center space-x-3 mt-8">
          <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce drop-shadow-sm"></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce drop-shadow-sm" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce drop-shadow-sm" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};
