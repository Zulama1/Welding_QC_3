import React from 'react';
import { useApp } from '../../context/AppContext';
// 1. Import your PNG file using Vite's asset handling syntax
import companyLogo from '../../assets/NTPC_logo.png'; // Make sure the filename matches your file!

export default function Sidebar() {
  const { activeTab, setActiveTab } = useApp();
  const menuItems = ['Offer Sheet', 'Welds', 'PWHT', 'RT', 'PAUT', 'MPI', 'Welders'];

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shadow-sm">
      <div>
        {/* 2. Brand Block containing the logo image asset */}
        <div className="p-5 border-b border-slate-100 flex items-center space-x-3">
          <img 
            src={companyLogo} 
            alt="Company Logo" 
            className="h-9 w-auto object-contain max-w-[180px]" 
          />
        </div>
        
        <nav className="p-4 space-y-1">
          {menuItems.map(item => {
            const isActive = activeTab === item;
            return (
              <button
                key={item} onClick={() => setActiveTab(item)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 pl-3' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item}
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="text-xs text-slate-400 font-mono">Status: Connected</div>
      </div>
    </div>
  );
}