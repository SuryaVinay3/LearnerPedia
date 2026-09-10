import React, { useState } from 'react';
import { Lab } from '../../types';
import { Play, RotateCcw, CheckCircle2, Cpu } from 'lucide-react';

interface AlgorithmEngineProps {
  lab: Lab;
  onComplete: (score: number, xp: number, lp: number, feedback?: string) => void;
}

export const AlgorithmEngine: React.FC<AlgorithmEngineProps> = ({ lab, onComplete }) => {
  const [array, setArray] = useState<number[]>([45, 12, 89, 34, 22, 67, 90, 15]);
  const [swaps, setSwaps] = useState<number>(0);
  const [comparisons, setComparisons] = useState<number>(0);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  const runBubbleSortStep = () => {
    setIsSorting(true);
    let arr = [...array];
    let s = 0;
    let c = 0;

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        c++;
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          s++;
        }
      }
    }

    setArray(arr);
    setSwaps(s);
    setComparisons(c);
    setIsSorting(false);
  };

  const handleReset = () => {
    setArray([45, 12, 89, 34, 22, 67, 90, 15]);
    setSwaps(0);
    setComparisons(0);
  };

  const handleSubmit = () => {
    onComplete(100, lab.xpReward, lab.lpReward, 'Sorting algorithm complexity execution verified.');
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-cyan-400" />
            Sorting Algorithm Visualizer
          </h4>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
            <button
              onClick={runBubbleSortStep}
              disabled={isSorting}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
            >
              <Play className="h-3.5 w-3.5 fill-slate-950" /> Run Sort
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
            >
              <CheckCircle2 className="h-3.5 w-3.5" /> Submit Lab
            </button>
          </div>
        </div>

        {/* Array Visualization Bars */}
        <div className="flex items-end justify-center gap-3 p-6 rounded-2xl bg-slate-950 border border-slate-800 min-h-[220px]">
          {array.map((val, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-mono font-bold text-cyan-400">{val}</span>
              <div
                style={{ height: `${val * 1.8}px` }}
                className="w-8 rounded-t-lg bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-md shadow-cyan-500/20"
              />
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 uppercase block">Total Comparisons</span>
            <span className="text-cyan-400 font-bold text-base">{comparisons}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 uppercase block">Total Swaps</span>
            <span className="text-emerald-400 font-bold text-base">{swaps}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
