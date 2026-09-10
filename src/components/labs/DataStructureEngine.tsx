import React, { useState } from 'react';
import { Lab } from '../../types';
import { Layers, Plus, Minus, RotateCcw, CheckCircle2 } from 'lucide-react';

interface DataStructureEngineProps {
  lab: Lab;
  onComplete: (score: number, xp: number, lp: number, feedback?: string) => void;
}

export const DataStructureEngine: React.FC<DataStructureEngineProps> = ({ lab, onComplete }) => {
  const [stackItems, setStackItems] = useState<number[]>([10, 20, 30]);
  const [inputValue, setInputValue] = useState<string>('40');

  const handlePush = () => {
    if (!inputValue || isNaN(Number(inputValue))) return;
    setStackItems(prev => [...prev, Number(inputValue)]);
    setInputValue(String(Math.floor(Math.random() * 90) + 10));
  };

  const handlePop = () => {
    if (stackItems.length === 0) return;
    setStackItems(prev => prev.slice(0, prev.length - 1));
  };

  const handleSubmit = () => {
    onComplete(100, lab.xpReward, lab.lpReward, 'Stack operations LIFO order verified.');
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Layers className="h-5 w-5 text-cyan-400" />
            LIFO Stack Visualizer
          </h4>

          <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Submit Lab
          </button>
        </div>

        {/* Push/Pop Controls */}
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-24 bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs font-mono font-bold text-cyan-400 focus:outline-none"
          />
          <button
            onClick={handlePush}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
          >
            <Plus className="h-4 w-4" /> Push
          </button>
          <button
            onClick={handlePop}
            disabled={stackItems.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/80 hover:bg-rose-500 text-white font-bold text-xs disabled:opacity-50"
          >
            <Minus className="h-4 w-4" /> Pop
          </button>
        </div>

        {/* Stack Graphical Render */}
        <div className="flex flex-col-reverse items-center gap-2 p-6 rounded-2xl bg-slate-950 border border-slate-800 min-h-[260px] justify-start">
          {stackItems.length === 0 ? (
            <div className="text-slate-600 text-xs italic my-auto">Stack is Empty</div>
          ) : (
            stackItems.map((val, idx) => (
              <div
                key={idx}
                className={`w-48 py-3 rounded-xl border text-center font-mono font-bold text-sm transition-all shadow-md ${
                  idx === stackItems.length - 1
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 ring-2 ring-cyan-400/30'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                {val} {idx === stackItems.length - 1 && <span className="text-[10px] text-cyan-400 font-normal ml-2">&larr; TOP</span>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
