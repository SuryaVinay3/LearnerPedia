import React, { useState } from 'react';
import { Lab } from '../../types';
import { Cloud, Server, Database, Shield, CheckCircle2, Cpu } from 'lucide-react';

interface CloudSimulationEngineProps {
  lab: Lab;
  onComplete: (score: number, xp: number, lp: number, feedback?: string) => void;
}

export const CloudSimulationEngine: React.FC<CloudSimulationEngineProps> = ({ lab, onComplete }) => {
  const [nodes, setNodes] = useState<string[]>(['Load Balancer', 'Web App Node', 'Primary SQL DB']);

  const addNode = (nodeType: string) => {
    setNodes(prev => [...prev, nodeType]);
  };

  const handleSubmit = () => {
    onComplete(100, lab.xpReward, lab.lpReward, 'Cloud architecture topology validated.');
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Cloud className="h-5 w-5 text-cyan-400" />
            Cloud Topology Canvas
          </h4>

          <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
          >
            <CheckCircle2 className="h-3.5 w-3.5" /> Submit Topology
          </button>
        </div>

        <div className="flex items-center gap-2">
          {['CDN Cache', 'Auto-Scaler', 'S3 Storage', 'Firewall'].map((node) => (
            <button
              key={node}
              onClick={() => addNode(node)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-cyan-300"
            >
              + {node}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-6 rounded-2xl bg-slate-950 border border-slate-800 min-h-[180px]">
          {nodes.map((n, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-center font-mono text-xs text-slate-200 font-bold">
              <Server className="h-5 w-5 text-cyan-400 mx-auto mb-1" />
              {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
