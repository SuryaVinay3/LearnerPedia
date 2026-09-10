import React, { useState } from 'react';
import { Lab } from '../../types';
import { Terminal, CheckCircle2, Play } from 'lucide-react';

interface DevOpsEngineProps {
  lab: Lab;
  onComplete: (score: number, xp: number, lp: number, feedback?: string) => void;
}

export const DevOpsEngine: React.FC<DevOpsEngineProps> = ({ lab, onComplete }) => {
  const [dockerfile, setDockerfile] = useState<string>(
    lab.starterCode || `FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]`
  );
  const [validationOutput, setValidationOutput] = useState<string>('');

  const handleValidate = () => {
    setValidationOutput("BUILD SUCCESSFUL: Multi-stage layer cached properly. Exposing Port 3000.");
  };

  const handleSubmit = () => {
    onComplete(100, lab.xpReward, lab.lpReward, 'Dockerfile layer optimization verified.');
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Terminal className="h-5 w-5 text-cyan-400" />
            Dockerfile Editor & Layer Validator
          </h4>

          <div className="flex items-center gap-2">
            <button
              onClick={handleValidate}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
            >
              <Play className="h-3.5 w-3.5 fill-slate-950" /> Validate Dockerfile
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              <CheckCircle2 className="h-3.5 w-3.5" /> Submit Lab
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3 font-mono text-xs">
          <textarea
            value={dockerfile}
            onChange={(e) => setDockerfile(e.target.value)}
            rows={8}
            className="w-full bg-transparent text-cyan-300 focus:outline-none resize-none"
          />
        </div>

        {validationOutput && (
          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-emerald-400 font-mono text-xs">
            {validationOutput}
          </div>
        )}
      </div>
    </div>
  );
};
