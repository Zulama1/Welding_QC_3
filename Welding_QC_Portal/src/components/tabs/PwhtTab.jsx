import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import DataTable from '../common/DataTable';
import SearchBar from '../common/SearchBar';

export default function PwhtTab() {
  const { user } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const canEdit = user?.role === 2 || user?.role === 3;

  // Mocking the data source. In production, this will pull from your shared app state / database
  const [weldRecords, setWeldRecords] = useState([
    { joint_id: 'J2', welder_id: 'W-09', pwht_required: true, pwht_chart_number: '', pwht_date: '' },
    { joint_id: 'J1', welder_id: 'W-02', pwht_required: false, pwht_chart_number: '', pwht_date: '' }
  ]);

  const handleFieldChange = (jointId, field, value) => {
    setWeldRecords(prev => prev.map(row => 
      row.joint_id === jointId ? { ...row, [field]: value } : row
    ));
  };

  // Filter strategy: Surface ONLY the components that structurally require PWHT execution
  const activePwhtRecords = weldRecords.filter(row => 
    row.pwht_required && 
    (row.joint_id.toLowerCase().includes(searchQuery.toLowerCase()) || 
     row.welder_id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Define columns structure specifically tailored for the new tab layout
  const columns = [
    { 
      header: 'Joint ID', 
      accessor: 'joint_id', 
      render: (val) => <span className="font-mono font-bold text-blue-900">{val}</span> 
    },
    { 
      header: 'Welder ID', 
      accessor: 'welder_id', 
      render: (val) => <span className="font-mono text-slate-600">{val}</span> 
    },
    { 
      header: 'PWHT Chart Number', 
      accessor: 'pwht_chart_number',
      render: (val, row) => (
        <input 
          type="text" 
          value={val} 
          placeholder={canEdit ? "E.g., CH-001" : "Not Provided"}
          disabled={!canEdit}
          onChange={(e) => handleFieldChange(row.joint_id, 'pwht_chart_number', e.target.value)}
          className={`border rounded-lg px-3 py-1.5 text-xs font-mono w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-blue-600 ${
            !canEdit ? 'bg-slate-50 border-transparent text-slate-500' : 'bg-white border-slate-200'
          }`}
        />
      )
    },
    { 
      header: 'PWHT Date', 
      accessor: 'pwht_date',
      render: (val, row) => (
        <input 
          type="date" 
          value={val} 
          disabled={!canEdit}
          onChange={(e) => handleFieldChange(row.joint_id, 'pwht_date', e.target.value)}
          className={`border rounded-lg px-3 py-1.5 text-xs font-mono max-w-xs focus:outline-none focus:ring-1 focus:ring-blue-600 ${
            !canEdit ? 'bg-slate-50 border-transparent text-slate-500' : 'bg-white border-slate-200'
          }`}
        />
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Post-Weld Heat Treatment (PWHT) Registry</h1>
          <p className="text-sm text-slate-500">
            {canEdit ? "✓ Operational Clearance Active. Log your thermal stress-relief parameters below." : "🔒 Read-only Viewport. Thermal modification history restricted to Verifiers."}
          </p>
        </div>
        <div className="bg-amber-600 text-white font-mono px-3 py-1 rounded text-xs font-bold tracking-wider">
          TRACKING::PWHT
        </div>
      </div>

      <div className="space-y-4">
        {/* Isolated Tab Search Filtering Row Layout */}
        <div className="flex items-center bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Clean, Non-crowded Data Grid */}
        <DataTable columns={columns} data={activePwhtRecords} loading={false} />
      </div>
    </div>
  );
}