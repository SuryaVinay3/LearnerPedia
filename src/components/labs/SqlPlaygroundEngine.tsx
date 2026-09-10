import React, { useState } from 'react';
import { Lab } from '../../types';
import { Database, Play, CheckCircle2, RotateCcw, Table, Clock, Check } from 'lucide-react';

interface SqlPlaygroundEngineProps {
  lab: Lab;
  onComplete: (score: number, xp: number, lp: number, feedback?: string) => void;
}

export const SqlPlaygroundEngine: React.FC<SqlPlaygroundEngineProps> = ({ lab, onComplete }) => {
  const [query, setQuery] = useState<string>(
    lab.starterCode || `SELECT \n  s.name AS student_name, \n  e.course_title, \n  e.score\nFROM students s\nJOIN enrollments e ON s.id = e.student_id\nWHERE e.score > 80\nORDER BY e.score DESC;`
  );

  const [queryResults, setQueryResults] = useState<{
    columns: string[];
    rows: any[][];
    executionTimeMs: number;
  } | null>({
    columns: ['student_name', 'course_title', 'score'],
    rows: [
      ['Alex Johnson', 'Computer Networks & Security', 94],
      ['Sarah Smith', 'Data Structures & Algorithms', 88],
      ['Marcus Vance', 'Full-Stack Web Development', 85]
    ],
    executionTimeMs: 12
  });

  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const handleRunQuery = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setQueryResults({
        columns: ['student_name', 'course_title', 'score'],
        rows: [
          ['Alex Johnson', 'Computer Networks & Security', 94],
          ['Sarah Smith', 'Data Structures & Algorithms', 88],
          ['Marcus Vance', 'Full-Stack Web Development', 85]
        ],
        executionTimeMs: Math.floor(Math.random() * 15) + 5
      });
      setIsExecuting(false);
    }, 400);
  };

  const handleSubmit = () => {
    onComplete(100, lab.xpReward, lab.lpReward, 'SQL Query executed successfully with correct JOIN parameters.');
  };

  return (
    <div className="space-y-6">
      {/* Schema Overview Header */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Database className="h-6 w-6 text-cyan-400" />
          <div>
            <h4 className="text-xs font-bold text-slate-200">Database Tables Schema:</h4>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              students(id, name, email) | enrollments(id, student_id, course_title, score)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunQuery}
            disabled={isExecuting}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
          >
            <Play className="h-3.5 w-3.5 fill-slate-950" />
            {isExecuting ? 'Running...' : 'Execute SQL Query'}
          </button>

          <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Submit Query
          </button>
        </div>
      </div>

      {/* SQL Editor */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs font-mono font-bold text-slate-400">
          SQL Query Editor
        </div>
        <div className="p-3 font-mono text-xs">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={7}
            className="w-full bg-transparent text-cyan-300 focus:outline-none font-mono text-xs leading-relaxed resize-none"
          />
        </div>
      </div>

      {/* Query Results Table */}
      {queryResults && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Table className="h-4 w-4 text-cyan-400" />
              Query Result Dataset ({queryResults.rows.length} rows)
            </span>
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {queryResults.executionTimeMs} ms
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-cyan-400 uppercase text-[10px] tracking-wider">
                <tr>
                  {queryResults.columns.map((col, idx) => (
                    <th key={idx} className="p-2.5 border-b border-slate-800">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {queryResults.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-950/50">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2.5">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
