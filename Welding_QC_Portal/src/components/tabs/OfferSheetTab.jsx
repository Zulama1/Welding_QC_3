import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import SearchBar from '../common/SearchBar';
import DataTable from '../common/DataTable';

export default function OfferSheetTab() {
  const { user } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock initial state representing reverse chronological data architecture
  const [records, setRecords] = useState([
    { joint_id: 'J2', area_system: 'A2', coil_no: 'C92', tube_no: 'T41', material_spec: 'A335 P11', weld_size: '2.5"', date: '2026-06-16', welder_id: 'W-09' },
    { joint_id: 'J1', area_system: 'A1', coil_no: 'C1', tube_no: 'T12', material_spec: 'A335 P22', weld_size: '2.0"', date: '2026-06-15', welder_id: 'W-02' }
  ]);

  // Defined Column Schema mapped directly into the reusable DataTable design
  const columns = [
    { 
      header: 'Joint ID', 
      accessor: 'joint_id', 
      render: (val) => <span className="font-mono font-bold text-blue-900">{val}</span> 
    },
    { header: 'Area System', accessor: 'area_system' },
    { header: 'Coil No', accessor: 'coil_no', render: (val) => <span className="font-mono">{val}</span> },
    { header: 'Tube No', accessor: 'tube_no', render: (val) => <span className="font-mono">{val}</span> },
    { 
      header: 'Material Spec', 
      accessor: 'material_spec', 
      render: (val) => <span className="text-xs font-semibold bg-slate-100 px-2 py-1 rounded text-slate-600">{val}</span> 
    },
    { header: 'Weld Size', accessor: 'weld_size' },
    { header: 'Date Registered', accessor: 'date', render: (val) => <span className="text-slate-500">{val}</span> },
    { header: 'Welder Assigned', accessor: 'welder_id', render: (val) => <span className="font-mono text-slate-600">{val}</span> }
  ];

  const handleAddNewRecord = (newRow) => {
    // Unshift forces newly appended datasets straight to the top index position
    setRecords(prev => [newRow, ...prev]);
    setIsAdding(false);
  };

  // Client-side text-filtering pipeline matching entries dynamically by Joint ID or Welder ID
  const filteredRecords = records.filter(row => 
    row.joint_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.welder_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Offer Sheet Registration</h1>
          <p className="text-sm text-slate-500">Master entry log for project physical joints.</p>
        </div>
        {user.role === 1 && !isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-lg shadow-sm transition-colors self-start sm:self-auto"
          >
            + Add New Data
          </button>
        )}
      </div>

      {isAdding ? (
        <OfferSheetForm onSubmit={handleAddNewRecord} onCancel={() => setIsAdding(false)} />
      ) : (
        <div className="space-y-4">
          {/* Global Filter Bar Layout Section */}
          <div className="flex items-center bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Unified Data Grid View Engine */}
          <DataTable columns={columns} data={filteredRecords} loading={false} />
        </div>
      )}
    </div>
  );
}

// Subform matches structural geometry shown in the wireframe step 3
function OfferSheetForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({ joint_id: '', area_system: '', coil_no: '', tube_no: '', material_spec: '', weld_size: '', welder_id: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="font-semibold text-slate-800">Register Structural Parameters</h3>
        <button onClick={onCancel} className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">← Back</button>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(formData).map((field) => (
          <div key={field} className="flex flex-col space-y-1">
            <label className="text-xs font-semibold capitalize text-slate-500">{field.replace('_', ' ')}</label>
            <input 
              type="text" required
              value={formData[field]} onChange={e => setFormData({...formData, [field]: e.target.value})}
              className="border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-all"
            />
          </div>
        ))}
        <div className="md:col-span-2 flex justify-end space-x-2 pt-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
          <button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Commit Record</button>
        </div>
      </form>
    </div>
  );
}