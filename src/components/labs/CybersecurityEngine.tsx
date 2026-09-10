import React, { useState } from 'react';
import { Lab } from '../../types';
import { ShieldAlert, Lock, CheckCircle2, Key, AlertTriangle } from 'lucide-react';

interface CybersecurityEngineProps {
  lab: Lab;
  onComplete: (score: number, xp: number, lp: number, feedback?: string) => void;
}

export const CybersecurityEngine: React.FC<CybersecurityEngineProps> = ({ lab, onComplete }) => {
  const [userInput, setUserInput] = useState<string>("' OR '1'='1");
  const [queryResult, setQueryResult] = useState<string>('');

  const handleTestExploit = () => {
    if (userInput.includes("OR") || userInput.includes("1=1") || userInput.includes("--")) {
      setQueryResult("EXPLOIT SUCCESSFUL: Authentication bypassed! Raw SQL evaluated to TRUE.");
    } else {
      setQueryResult("QUERY EXECUTED NORMAL: Invalid credentials supplied.");
    }
  };

  const handleSubmit = () => {
    onComplete(100, lab.xpReward, lab.lpReward, 'SQL Injection vulnerability mechanics & mitigation demonstrated.');
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-rose-400" />
            SQL Injection Educational Sandbox
          </h4>

          <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
          >
            <CheckCircle2 className="h-3.5 w-3.5" /> Submit Lab
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 block">Test Malicious Username Payload:</label>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-rose-400 font-bold focus:outline-none"
          />
        </div>

        <button
          onClick={handleTestExploit}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs"
        >
          <Key className="h-4 w-4" /> Test Vulnerable Logic
        </button>

        {queryResult && (
          <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/60 font-mono text-xs text-rose-300">
            {queryResult}
          </div>
        )}
      </div>
    </div>
  );
};
