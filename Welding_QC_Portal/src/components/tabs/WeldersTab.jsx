import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import SearchBar from '../common/SearchBar';
import DataTable from '../common/DataTable';
import WelderForm from '../forms/WelderForm';

export default function WeldersTab() {
  const { user } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [welders, setWelders] = useState([
    { welder_id: 'W-01', welder_name: 'Rajesh Kumar', qualification: 'ASME Sec IX (6G)', employer: 'Apex Piping Ltd', contact_number: '+91 98765 43210', notes: 'Certified for high-pressure alloy lines.' },
    { welder_id: 'W-02', welder_name: 'Amit Modi', qualification: 'AWS D1.1 Structural', employer: 'Infrastruct Corp', contact_number: '+91 87654 32109', notes: 'Sleeper build build-out specialist.' },
    { welder_id: 'W-09', welder_name: 'Vikram Singh', qualification: 'ASME Sec IX (TIG/MIG)', employer: 'Apex Piping Ltd', contact_number: '+91 76543 21098', notes: 'Maintains perfect compliance index.' }
  ]);

  // Table columns schema definition layout
  const columns = [
    { 
      header: 'Welder ID', 
      accessor: 'welder_id', 
      render: (val) => <span className="font-mono font-bold text-blue-900">{val}</span> 
    },
    { 
      header: 'Full Name', 
      accessor: 'welder_name', 
      render: (val) => <span className="font-semibold text-slate-800">{val}</span> 
    },
    { 
      header: 'Qualifications', 
      accessor: 'qualification', 
      render: (val) => <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 font-medium px-2 py-1 rounded">{val || 'N/A'}</span> 
    },
    { header: 'Employer', accessor: 'employer' },
    { header: 'Contact', accessor: 'contact_number', render: (val) => <span className="font-mono text-slate-500">{val}</span> },
    { 
      header: 'Notes / Logs', 
      accessor: 'notes', 
      render: (val) => <p className="max-w-xs truncate text-xs text-slate-400 italic" title={val}>{val || 'No extra notes.'}</p> 
    }
  ];

  const handleAddNewWelder = (newWelder) => {
    // Unshift adds the new profile right at the top of the data engine array matrix
    setWelders(prev => [newWelder, ...prev]);
    setIsAdding(false);
  };

  // Client-side text-filtering matches inputs dynamically against Welder ID or Full Name strings
  const filteredWelders = welders.filter(w => 
    w.welder_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.welder_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Welder Resource Registry</h1>
          <p className="text-sm text-slate-500">
            {user.role === 1 
              ? "✓ Management permissions active. You can register new personnel profiles." 
              : "🔒 Read-only view. Profile modifications are restricted to Level 1 Supervisors."}
          </p>
        </div>
        {user.role === 1 && !isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-lg shadow-sm transition-colors self-start sm:self-auto"
          >
            + Register Welder
          </button>
        )}
      </div>

      {isAdding ? (
        <WelderForm onSubmit={handleAddNewWelder} onCancel={() => setIsAdding(false)} />
      ) : (
        <div className="space-y-4">
          {/* Filtering Node Area layout */}
          <div className="flex items-center bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Unified Clean Data Grid Panel Display */}
          <DataTable columns={columns} data={filteredWelders} loading={false} />
        </div>
      )}
    </div>
  );
}