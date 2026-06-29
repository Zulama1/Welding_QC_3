import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function WeldsTab() {
  const { user } = useApp();
  const canEdit = user?.role === 2 || user?.role === 3;

  // Mocking the unified data array reflecting your layout
  const [weldRecords, setWeldRecords] = useState([
    { joint_id: 'J2', area_system: 'A2', welder_id: 'W-09', electrode: 'E7018', wps_no: 'WPS-04', hardness: 'N/A', pwht_required: false, pwht_chart_number: '', pwht_date: '' },
    { joint_id: 'J1', area_system: 'A1', welder_id: 'W-02', electrode: 'E6010', wps_no: 'WPS-01', hardness: '185 HB', pwht_required: true, pwht_chart_number: 'CH-9921', pwht_date: '2026-06-16' }
  ]);

  const handleFieldChange = (index, field, value) => {
    const updated = [...weldRecords];
    updated[index][field] = value;
    setWeldRecords(updated);
  };

  // Filter out which joints have active PWHT requirements assigned to them
  const pwhtRequiredRecords = weldRecords.filter(row => row.pwht_required);

  return (
    <div className="space-y-8">
      {/* SECTION 1: Core Welding Specifications Grid */}
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Welding Parameter Specifications</h1>
          <p className="text-sm text-slate-500">
            {canEdit ? "✓ Editing permissions granted for Level 2/3 Verifier." : "🔒 System Viewport Locked. Modifications restricted to Verifiers."}
          </p>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-semibold tracking-wide text-xs uppercase">
                <th className="px-6 py-4">Joint ID</th>
                <th className="px-6 py-4">Area System (Inherited)</th>
                <th className="px-6 py-4">Electrode Specs</th>
                <th className="px-6 py-4">WPS Number</th>
                <th className="px-6 py-4">Hardness Check</th>
                <th className="px-6 py-4">PWHT Required?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {weldRecords.map((row, index) => (
                <tr key={row.joint_id} className="hover:bg-blue-50/40 odd:bg-white even:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-blue-900">{row.joint_id}</td>
                  <td className="px-6 py-4 text-slate-400 font-mono text-xs">{row.area_system} (Locked)</td>
                  <td className="px-6 py-4">
                    <input 
                      type="text" value={row.electrode} disabled={!canEdit}
                      onChange={(e) => handleFieldChange(index, 'electrode', e.target.value)}
                      className={`border rounded-lg px-3 py-1.5 text-xs font-mono w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-blue-600 ${!canEdit ? 'bg-slate-50 border-transparent text-slate-500' : 'bg-white border-slate-200'}`}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input 
                      type="text" value={row.wps_no} disabled={!canEdit}
                      onChange={(e) => handleFieldChange(index, 'wps_no', e.target.value)}
                      className={`border rounded-lg px-3 py-1.5 text-xs font-mono w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-blue-600 ${!canEdit ? 'bg-slate-50 border-transparent text-slate-500' : 'bg-white border-slate-200'}`}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input 
                      type="text" value={row.hardness} placeholder="N/A" disabled={!canEdit}
                      onChange={(e) => handleFieldChange(index, 'hardness', e.target.value)}
                      className={`border rounded-lg px-3 py-1.5 text-xs font-mono w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-blue-600 ${!canEdit ? 'bg-slate-50 border-transparent text-slate-500' : 'bg-white border-slate-200'}`}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <select
                      disabled={!canEdit}
                      value={row.pwht_required ? "Yes" : "No"}
                      onChange={(e) => handleFieldChange(index, 'pwht_required', e.target.value === "Yes")}
                      className={`text-xs font-semibold rounded-lg p-1.5 outline-none border transition-all ${
                        row.pwht_required 
                          ? 'bg-amber-50 border-amber-200 text-amber-700' 
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      } ${!canEdit ? 'appearance-none pointer-events-none' : 'cursor-pointer focus:ring-1 focus:ring-blue-600'}`}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}