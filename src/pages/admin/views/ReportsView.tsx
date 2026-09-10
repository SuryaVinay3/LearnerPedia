import React, { useState } from 'react';

export const ReportsView: React.FC = () => {
  const [downloading, setDownloading] = useState(false);

  const handleExportCSV = async () => {
    setDownloading(true);
    try {
      const res = await fetch('/api/admin/reports');
      if (res.ok) {
        const json = await res.json();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `LearnerPedia_Platform_Report_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      }
    } catch (e) {
      console.error('Failed to export report:', e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white">Platform Reports & Data Export</h1>
          <p className="text-slate-400 text-xs mt-0.5">Generate compliance reports, user progress manifests, and financial LP ledgers.</p>
        </div>
        <button
          onClick={handleExportCSV}
          disabled={downloading}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg transition"
        >
          {downloading ? 'Generating Report...' : '📥 Export Master JSON/CSV Report'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-white">User Roster & Roles</h3>
          <p className="text-xs text-slate-400">Complete manifest of registered emails, roles, account statuses, XP, and streak counts.</p>
          <button
            onClick={handleExportCSV}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold rounded-xl border border-slate-700 transition"
          >
            Download User Export
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-white">Quiz & Assessment Analytics</h3>
          <p className="text-xs text-slate-400">Detailed assessment attempt logs, error distributions, and question level pass rates.</p>
          <button
            onClick={handleExportCSV}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold rounded-xl border border-slate-700 transition"
          >
            Download Quiz Analytics
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-white">LP Economy Ledger</h3>
          <p className="text-xs text-slate-400">Virtual economy transaction log, store item sales, cheat sheet unlocks, and redemptions.</p>
          <button
            onClick={handleExportCSV}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold rounded-xl border border-slate-700 transition"
          >
            Download Economy Ledger
          </button>
        </div>
      </div>
    </div>
  );
};
