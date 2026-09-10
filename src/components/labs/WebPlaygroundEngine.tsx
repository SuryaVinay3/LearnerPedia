import React, { useState, useEffect } from 'react';
import { Lab } from '../../types';
import { Play, RotateCcw, Monitor, Code, Eye, CheckCircle2 } from 'lucide-react';

interface WebPlaygroundEngineProps {
  lab: Lab;
  onComplete: (score: number, xp: number, lp: number, feedback?: string) => void;
}

export const WebPlaygroundEngine: React.FC<WebPlaygroundEngineProps> = ({ lab, onComplete }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [htmlCode, setHtmlCode] = useState<string>(
    lab.starterCode || `<nav class="navbar">\n  <div class="logo">LearnerPedia</div>\n  <ul class="nav-links">\n    <li><a href="#" class="active">Home</a></li>\n    <li><a href="#">Courses</a></li>\n    <li><a href="#">Labs</a></li>\n  </ul>\n</nav>`
  );
  const [cssCode, setCssCode] = useState<string>(
    `body {\n  margin: 0;\n  font-family: system-ui, sans-serif;\n  background: #090d16;\n  color: #e2e8f0;\n}\n.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 2rem;\n  background: rgba(15, 23, 42, 0.9);\n  border-bottom: 1px solid rgba(56, 189, 248, 0.2);\n}\n.logo {\n  font-size: 1.25rem;\n  font-weight: 800;\n  color: #38bdf8;\n}\n.nav-links {\n  display: flex;\n  gap: 1.5rem;\n  list-style: none;\n}\n.nav-links a {\n  color: #94a3b8;\n  text-decoration: none;\n  font-weight: 600;\n}`
  );
  const [jsCode, setJsCode] = useState<string>(`console.log("LearnerPedia Web Playground Active!");`);
  const [srcDoc, setSrcDoc] = useState<string>('');

  const updatePreview = () => {
    const combined = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
    `;
    setSrcDoc(combined);
  };

  useEffect(() => {
    updatePreview();
  }, []);

  const handleRun = () => {
    updatePreview();
  };

  const handleSubmit = () => {
    onComplete(100, lab.xpReward, lab.lpReward, 'Web Playground layout validated!');
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          {(['html', 'css', 'js'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                activeTab === tab
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
          >
            <Play className="h-3.5 w-3.5 fill-slate-950" />
            Update Preview
          </button>

          <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Submit Web Lab
          </button>
        </div>
      </div>

      {/* Editor & Live Preview Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Code Editor */}
        <div className="flex flex-col rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs font-mono font-bold text-slate-400">
            <span className="flex items-center gap-1.5">
              <Code className="h-4 w-4 text-cyan-400" />
              Editing {activeTab.toUpperCase()}
            </span>
          </div>
          <div className="p-3 font-mono text-xs leading-relaxed min-h-[380px]">
            {activeTab === 'html' && (
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="w-full h-96 bg-transparent text-slate-100 focus:outline-none resize-none font-mono text-xs"
              />
            )}
            {activeTab === 'css' && (
              <textarea
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                className="w-full h-96 bg-transparent text-slate-100 focus:outline-none resize-none font-mono text-xs"
              />
            )}
            {activeTab === 'js' && (
              <textarea
                value={jsCode}
                onChange={(e) => setJsCode(e.target.value)}
                className="w-full h-96 bg-transparent text-slate-100 focus:outline-none resize-none font-mono text-xs"
              />
            )}
          </div>
        </div>

        {/* Right: Live Preview Frame */}
        <div className="flex flex-col rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs font-mono font-bold text-slate-400">
            <span className="flex items-center gap-1.5">
              <Eye className="h-4 w-4 text-emerald-400" />
              Live Browser Rendering
            </span>
          </div>
          <iframe
            srcDoc={srcDoc}
            title="web-preview"
            sandbox="allow-scripts"
            className="w-full h-[400px] bg-slate-950 border-0"
          />
        </div>
      </div>
    </div>
  );
};
