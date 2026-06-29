import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ConfirmationModal from '../common/ConfirmationModel'; // Points cleanly to your confirmation UI layout

export default function NdtTab({ type }) {
  const { user } = useApp();
  const canEditFields = user?.role === 2 || user?.role === 3;

  const fileConfig = {
    RT:   { accept: "image/*",   label: "X-Ray Rayograph Image" },
    PAUT: { accept: ".pdf",      label: "Phased Array Ultrasonic PDF Report" },
    MPI:  { accept: ".pdf",      label: "Magnetic Particle Inspection PDF Report" }
  };

  const [ndtRecords, setNdtRecords] = useState([
    { joint_id: 'J2', welder_id: 'W-09', date: '2026-06-16', inspection_turn: 1, result: 'Pending', defect_type: '', attached_file: null, isUploading: false },
    { joint_id: 'J1', welder_id: 'W-02', date: '2026-06-15', inspection_turn: 3, result: 'Pass', defect_type: 'None', attached_file: 'reports/J1_radiography.png', isUploading: false }
  ]);

  // Track independent modular scopes for the file deletion prompt vs the manual attempt increment prompt
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, targetIndex: null });
  const [incrementModal, setIncrementModal] = useState({ isOpen: false, targetIndex: null });

  const handleTextChange = (index, field, value) => {
    const updated = [...ndtRecords];
    updated[index][field] = value;
    setNdtRecords(updated);
  };

  // Typo Protection: Swapping calendar dates no longer automatically advances your critical metrics
  const handleDateAssignment = (index, newDate) => {
    const updated = [...ndtRecords];
    updated[index].date = newDate;
    setNdtRecords(updated);
  };

  const handleFileUpload = async (index, e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const updatedRecords = [...ndtRecords];
    updatedRecords[index].isUploading = true;
    setNdtRecords(updatedRecords);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const completedRecords = [...ndtRecords];
      completedRecords[index].attached_file = `uploads/${type.toLowerCase()}/${selectedFile.name}`;
      completedRecords[index].isUploading = false;
      setNdtRecords(completedRecords);
    } catch (err) {
      console.error(err);
    }
  };

  // Confirmed deliberate manual action loop invocation handler
  const confirmNewAttemptIncrement = () => {
    if (incrementModal.targetIndex !== null) {
      const updated = [...ndtRecords];
      updated[incrementModal.targetIndex].inspection_turn += 1;
      
      
      setNdtRecords(updated);
    }
    setIncrementModal({ isOpen: false, targetIndex: null });
  };

  const confirmFileDeletion = () => {
    if (deleteModal.targetIndex !== null) {
      const updated = [...ndtRecords];
      updated[deleteModal.targetIndex].attached_file = null;
      setNdtRecords(updated);
    }
    setDeleteModal({ isOpen: false, targetIndex: null });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{type} Diagnostics Center</h1>
          <p className="text-sm text-slate-500">
            {canEditFields ? `✓ Operational Clearance Granted. Field editing and verification metrics active.` : `🔒 Read-only parameters active for standard viewports.`}
          </p>
        </div>
        <div className="bg-blue-600 text-white font-mono px-3 py-1 rounded text-xs font-bold tracking-wider">
          SECTION::{type}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-semibold tracking-wide text-xs uppercase">
              <th className="px-6 py-4">Joint ID</th>
              <th className="px-6 py-4">Welder ID</th>
              <th className="px-6 py-4">Inspection Date & Manual Attempt Metric</th>
              <th className="px-6 py-4">Evaluation Status</th>
              <th className="px-6 py-4">Defect Classification</th>
              <th className="px-6 py-4">Quality Assurance Artifact ({type})</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {ndtRecords.map((row, index) => (
              <tr key={row.joint_id} className="hover:bg-blue-50/40 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-blue-900">{row.joint_id}</td>
                <td className="px-6 py-4 font-mono text-slate-600 text-xs">{row.welder_id}</td>
                
                {/* Manual Metric Action Layout Cluster */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="date" 
                      value={row.date}
                      disabled={!canEditFields}
                      onChange={(e) => handleDateAssignment(index, e.target.value)}
                      className={`border rounded-lg px-2.5 py-1.5 text-xs font-mono max-w-xs focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                        !canEditFields ? 'bg-slate-50 border-transparent text-slate-500' : 'bg-white border-slate-200'
                      }`}
                    />
                    
                    <div className="flex items-center space-x-1.5">
                      {/* Dynamic Theme Compliant Counter Badge Display */}
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border whitespace-nowrap ${
                        row.inspection_turn >= 3 ? 'bg-red-50 text-red-700 border-red-200' :
                        row.inspection_turn === 2 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-slate-50 text-slate-600 border-slate-200'
                      }`}>
                        {row.inspection_turn === 1 ? '1st Attempt' : `Attempt #${row.inspection_turn}`}
                      </span>

                      {/* Manual Increment Trigger Control Block (Level 2/3 Verifiers Only) */}
                      {canEditFields && (
                        <button
                          type="button"
                          onClick={() => setIncrementModal({ isOpen: true, targetIndex: index })}
                          title="Log new deliberate re-test attempt cycle"
                          className="h-6 w-6 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-500 hover:text-blue-600 rounded-md flex items-center justify-center font-bold text-xs transition-all shadow-sm"
                        >
                          +
                        </button>
                      )}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <select
                    disabled={!canEditFields} value={row.result}
                    onChange={(e) => handleTextChange(index, 'result', e.target.value)}
                    className={`border text-xs font-semibold rounded-lg p-1.5 outline-none ${
                      row.result === 'Pass' ? 'bg-green-50 text-green-700 border-green-200' :
                      row.result === 'Fail' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                    } ${!canEditFields ? 'appearance-none pointer-events-none' : 'cursor-pointer'}`}
                  >
                    <option value="Pending">Pending Evaluation</option>
                    <option value="Pass">Pass / Compliant</option>
                    <option value="Fail">Fail / Reject-Repair</option>
                  </select>
                </td>

                <td className="px-6 py-4">
                  <input
                    type="text" value={row.defect_type} placeholder={canEditFields ? "E.g., Porosity, Slag" : "None"}
                    disabled={!canEditFields} onChange={(e) => handleTextChange(index, 'defect_type', e.target.value)}
                    className={`border rounded-lg px-3 py-1.5 text-xs w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                      !canEditFields ? 'bg-slate-50 border-transparent text-slate-400' : 'bg-white border-slate-200'
                    }`}
                  />
                </td>

                <td className="px-6 py-4">
                  {row.attached_file ? (
                    <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 rounded-lg p-1.5 max-w-max">
                      <span className="text-xs font-semibold text-emerald-700">📄 View Artifact</span>
                      <button 
                        type="button"
                        onClick={() => setDeleteModal({ isOpen: true, targetIndex: index })}
                        className="text-slate-400 hover:text-red-600 font-bold px-1 text-sm rounded transition-colors"
                        title="Delete and re-upload"
                      >
                        &times;
                      </button>
                    </div>
                  ) : row.isUploading ? (
                    <div className="flex items-center space-x-2 text-xs font-medium text-blue-600">
                      <span className="inline-block h-2 w-2 rounded-full bg-blue-600 animate-ping" />
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    <label className="cursor-pointer bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-300 px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm transition-all inline-block">
                      <span>Upload File</span>
                      <input type="file" className="hidden" accept={fileConfig[type].accept} onChange={(e) => handleFileUpload(index, e)} />
                    </label>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL 1: Intentional Increment Confirmation Overlay */}
      <ConfirmationModal 
        isOpen={incrementModal.isOpen}
        title="Log Next Inspection Attempt Cycle?"
        message={`Confirming this action will advance the attempt metric registry counter to #${(ndtRecords[incrementModal.targetIndex || 0]?.inspection_turn || 0) + 1} for Joint ID: ${ndtRecords[incrementModal.targetIndex || 0]?.joint_id}. This resets the current compliance results to prepare for the subsequent test cycle inputs.`}
        onConfirm={confirmNewAttemptIncrement}
        onCancel={() => setIncrementModal({ isOpen: false, targetIndex: null })}
        confirmText="Increase" // Clean non-destructive text
        confirmButtonClass="bg-blue-600 hover:bg-blue-700" // Professional corporate blue
      />

      {/* MODAL 2: Secure File Erasure Overlay Window */}
      <ConfirmationModal 
        isOpen={deleteModal.isOpen}
        title="Delete Quality Assurance Artifact?"
        message={`This will permanently unlink and remove this ${type} verification documentation file from Joint ID: ${ndtRecords[deleteModal.targetIndex || 0]?.joint_id}. This action cannot be undone.`}
        onConfirm={confirmFileDeletion}
        onCancel={() => setDeleteModal({ isOpen: false, targetIndex: null })}
        confirmText="Delete Permanently" // Explicit destructive message text
        confirmButtonClass="bg-red-600 hover:bg-red-700" // Destructive warning red
      />
      
    </div>
  );
}