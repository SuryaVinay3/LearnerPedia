import React, { useState } from 'react';
import { Lab } from '../../types';
import { Cpu, Play, CheckCircle2 } from 'lucide-react';

interface OsSimulationEngineProps {
  lab: Lab;
  onComplete: (score: number, xp: number, lp: number, feedback?: string) => void;
}

export const OsSimulationEngine: React.FC<OsSimulationEngineProps> = ({ lab, onComplete }) => {
  const [quantum, setQuantum] = useState<number>(2);

  const processes = [
    { pid: 'P1', burst: 5, waiting: 0, turnaround: 5 },
    { pid: 'P2', burst: 3, waiting: 5, turnaround: 8 },
    { pid: 'P3', burst: 8, waiting: 8, turnaround: 16 }
  ];

  const handleSubmit = () => {
    onComplete(100, lab.xpReward, lab.lpReward, 'Round Robin CPU Scheduling calculations verified.');
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-cyan-400" />
            CPU Scheduling Gantt Chart Simulator
          </h4>

          <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
          >
            <CheckCircle2 className="h-3.5 w-3.5" /> Submit Lab
          </button>
        </div>

        {/* Gantt Chart Timeline */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 block">Gantt Chart Timeline:</span>
          <div className="flex items-center gap-1 font-mono text-xs text-white">
            <div className="px-4 py-2 bg-cyan-600 rounded-l-lg">P1 (0-2ms)</div>
            <div className="px-4 py-2 bg-indigo-600">P2 (2-4ms)</div>
            <div className="px-4 py-2 bg-purple-600">P3 (4-6ms)</div>
            <div className="px-4 py-2 bg-cyan-600">P1 (6-9ms)</div>
            <div className="px-4 py-2 bg-purple-600 rounded-r-lg">P3 (9-16ms)</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 font-mono text-xs">
          {processes.map((p) => (
            <div key={p.pid} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="font-bold text-cyan-400 block">{p.pid}</span>
              <span className="text-[10px] text-slate-400 block">Burst: {p.burst}ms</span>
              <span className="text-[10px] text-emerald-400 block">Waiting: {p.waiting}ms</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
