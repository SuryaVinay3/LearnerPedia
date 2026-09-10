import React, { useState } from 'react';
import { Lab } from '../../types';
import { Cpu, Play, CheckCircle2 } from 'lucide-react';

interface MlExperimentEngineProps {
  lab: Lab;
  onComplete: (score: number, xp: number, lp: number, feedback?: string) => void;
}

export const MlExperimentEngine: React.FC<MlExperimentEngineProps> = ({ lab, onComplete }) => {
  const [learningRate, setLearningRate] = useState<number>(0.01);
  const [kNeighbors, setKNeighbors] = useState<number>(5);
  const [metrics, setMetrics] = useState<{ accuracy: number; precision: number; recall: number } | null>(null);

  const handleTrain = () => {
    setMetrics({
      accuracy: 94.2,
      precision: 92.5,
      recall: 95.1
    });
  };

  const handleSubmit = () => {
    onComplete(100, lab.xpReward, lab.lpReward, 'Machine Learning model hyperparameters verified.');
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-indigo-400" />
            Supervised ML Classifier Experiment
          </h4>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTrain}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-500 text-white font-bold text-xs"
            >
              <Play className="h-3.5 w-3.5 fill-white" /> Train Model
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              <CheckCircle2 className="h-3.5 w-3.5" /> Submit Lab
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Learning Rate ({learningRate}):</label>
            <input
              type="range"
              min={0.001}
              max={0.1}
              step={0.005}
              value={learningRate}
              onChange={(e) => setLearningRate(Number(e.target.value))}
              className="w-full accent-indigo-400 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">K Neighbors ({kNeighbors}):</label>
            <input
              type="range"
              min={1}
              max={15}
              value={kNeighbors}
              onChange={(e) => setKNeighbors(Number(e.target.value))}
              className="w-full accent-indigo-400 cursor-pointer"
            />
          </div>
        </div>

        {metrics && (
          <div className="grid grid-cols-3 gap-3 pt-2 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase block">Accuracy</span>
              <span className="text-emerald-400 font-bold text-base">{metrics.accuracy}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase block">Precision</span>
              <span className="text-cyan-400 font-bold text-base">{metrics.precision}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase block">Recall</span>
              <span className="text-indigo-400 font-bold text-base">{metrics.recall}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
