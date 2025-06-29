import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 pt-8 bg-gray-900 -mx-4 px-4 py-8 rounded-t-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400">
        <div className="flex items-center gap-2">
          <span className="text-lg">🌿</span>
          <span className="text-sm">
            <span className="font-semibold text-white">EcoPrint AI</span> — Making AI usage more transparent and sustainable
          </span>
        </div>
        
        <a 
          href="/" 
          className="flex items-center gap-2 hover:text-green-400 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </a>
      </div>
    </footer>
  );
};