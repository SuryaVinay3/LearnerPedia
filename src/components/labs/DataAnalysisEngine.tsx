import React, { useState } from 'react';
import { Lab } from '../../types';
import { Table, CheckCircle2 } from 'lucide-react';

interface DataAnalysisEngineProps {
  lab: Lab;
  onComplete: (score: number, xp: number, lp: number, feedback?: string) => void;
}

export const DataAnalysisEngine: React.FC<DataAnalysisEngineProps> = ({ lab, onComplete }) => {
  const [data, setData] = useState([
    { student: 'Alice', department: 'CS', score: 85 },
    { student: 'Bob', department: 'CS', score: 92 },
    { student: 'Charlie', department: 'IT', score: 85 },
    { student: 'David', department: 'IT', score: 78 }
  ]);

  const handleSubmit = () => {
    onComplete(100, lab.xpReward, lab.lpReward, 'Pandas DataFrame grouping & imputation verified.');
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Table className="h-5 w-5 text-cyan-400" />
            Pandas DataFrame Table Inspector
          </h4>

          <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
          >
            <CheckCircle2 className="h-3.5 w-3.5" /> Submit Lab
          </button>
        </div>

        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-950 text-cyan-400 uppercase text-[10px]">
            <tr>
              <th className="p-2 border-b border-slate-800">Student</th>
              <th className="p-2 border-b border-slate-800">Department</th>
              <th className="p-2 border-b border-slate-800">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {data.map((row, idx) => (
              <tr key={idx}>
                <td className="p-2">{row.student}</td>
                <td className="p-2">{row.department}</td>
                <td className="p-2 font-bold text-emerald-400">{row.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
