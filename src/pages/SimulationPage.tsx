import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { simulationService } from '../services/simulationService';
import { SimulationConfig } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const SimulationPage: React.FC = () => {
  const { refreshProfile } = useAuth();
  
  const [config, setConfig] = useState<SimulationConfig>({
    pca_ip: '192.168.10.138',
    pca_mask: '255.255.255.192',
    pca_gateway: '192.168.10.129',
    router_int1_ip: '192.168.10.129',
    router_int2_ip: '10.0.0.1',
    router_mask: '255.255.255.0',
    server_ip: '10.0.0.100',
    server_mask: '255.255.255.0',
    server_gateway: '10.0.0.1',
  });

  const [testing, setTesting] = useState(false);
  const [diagnostics, setDiagnostics] = useState<string[]>([]);
  const [result, setResult] = useState<{
    success: boolean;
    errors: string[];
    xpEarned: number;
    lpEarned: number;
  } | null>(null);

  const handleTest = async () => {
    setTesting(true);
    setResult(null);
    try {
      const res = await simulationService.testSimulation(config, 1, 0, 45);
      setDiagnostics(res.diagnostics);
      setResult({
        success: res.success,
        errors: res.errors,
        xpEarned: res.xpEarned,
        lpEarned: res.lpEarned,
      });

      if (res.success) {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#10b981', '#3b82f6'],
        });
        await refreshProfile();
      }
    } catch (err) {
      console.error('Simulation test error:', err);
    } finally {
      setTesting(false);
    }
  };

  const loadPreset = (presetName: string) => {
    setResult(null);
    setDiagnostics([]);
    if (presetName === 'correct') {
      setConfig({
        pca_ip: '192.168.10.138',
        pca_mask: '255.255.255.192',
        pca_gateway: '192.168.10.129',
        router_int1_ip: '192.168.10.129',
        router_int2_ip: '10.0.0.1',
        router_mask: '255.255.255.0',
        server_ip: '10.0.0.100',
        server_mask: '255.255.255.0',
        server_gateway: '10.0.0.1',
      });
    } else if (presetName === 'gateway_mismatch') {
      setConfig({
        pca_ip: '192.168.10.138',
        pca_mask: '255.255.255.192',
        pca_gateway: '192.168.10.1',
        router_int1_ip: '192.168.10.129',
        router_int2_ip: '10.0.0.1',
        router_mask: '255.255.255.0',
        server_ip: '10.0.0.100',
        server_mask: '255.255.255.0',
        server_gateway: '10.0.0.1',
      });
    } else if (presetName === 'ip_conflict') {
      setConfig({
        pca_ip: '192.168.10.129',
        pca_mask: '255.255.255.192',
        pca_gateway: '192.168.10.129',
        router_int1_ip: '192.168.10.129',
        router_int2_ip: '10.0.0.1',
        router_mask: '255.255.255.0',
        server_ip: '10.0.0.100',
        server_mask: '255.255.255.0',
        server_gateway: '10.0.0.1',
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Header & Guarantee Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-950 px-3.5 py-1 text-xs font-semibold text-cyan-300 border border-cyan-800/60 mb-2">
              <span>Interactive Packet Routing Simulator</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
              Subnetting & Gateway Routing Topology Lab
            </h1>
          </div>

          {/* Explicit Guarantee Notice */}
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-950/60 p-3.5 border border-emerald-800/50 text-emerald-300 text-xs font-bold">
            <span>Simulation access remains 100% free forever</span>
          </div>
        </div>

        {/* Interactive Topology Diagram Visualizer */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl relative">
          <h2 className="font-heading text-sm font-bold text-slate-300 uppercase tracking-wider mb-6">
            Live Network Topology Diagram
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-center">
            
            {/* PC-A */}
            <div className="rounded-2xl border border-cyan-500/40 bg-slate-950 p-4 shadow-lg">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400 font-bold border border-cyan-800 mb-2">
                PC
              </div>
              <div className="text-sm font-bold text-white">PC-A</div>
              <div className="text-[11px] font-mono text-cyan-300 mt-1">{config.pca_ip}</div>
              <div className="text-[10px] text-slate-400">Mask: {config.pca_mask}</div>
              <div className="text-[10px] text-slate-400">GW: {config.pca_gateway}</div>
            </div>

            {/* Switch */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-slate-300 font-bold border border-slate-800 mb-2">
                SW
              </div>
              <div className="text-sm font-bold text-white">Switch-1</div>
              <div className="text-[10px] text-slate-400 mt-1">Layer 2 Frame Passing</div>
            </div>

            {/* Router */}
            <div className="rounded-2xl border border-purple-500/40 bg-slate-950 p-4 shadow-lg">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950 text-purple-400 font-bold border border-purple-800 mb-2">
                RTR
              </div>
              <div className="text-sm font-bold text-white">Gateway Router</div>
              <div className="text-[10px] font-mono text-purple-300 mt-1">Int1: {config.router_int1_ip}</div>
              <div className="text-[10px] font-mono text-purple-300">Int2: {config.router_int2_ip}</div>
            </div>

            {/* Central Server */}
            <div className="rounded-2xl border border-emerald-500/40 bg-slate-950 p-4 shadow-lg">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950 text-emerald-400 font-bold border border-emerald-800 mb-2">
                SRV
              </div>
              <div className="text-sm font-bold text-white">Central Server</div>
              <div className="text-[11px] font-mono text-emerald-300 mt-1">{config.server_ip}</div>
              <div className="text-[10px] text-slate-400">GW: {config.server_gateway}</div>
            </div>

          </div>
        </div>

        {/* Configuration Forms & Presets */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Config Controls */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading text-lg font-bold text-white">
                Device Network Configurations
              </h3>

              {/* Quick Presets */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => loadPreset('correct')}
                  className="rounded-lg bg-cyan-950 px-2.5 py-1 text-[11px] font-bold text-cyan-300 border border-cyan-800 hover:bg-cyan-900"
                >
                  Correct Preset
                </button>
                <button
                  type="button"
                  onClick={() => loadPreset('gateway_mismatch')}
                  className="rounded-lg bg-rose-950 px-2.5 py-1 text-[11px] font-bold text-rose-300 border border-rose-800 hover:bg-rose-900"
                >
                  Gateway Error
                </button>
                <button
                  type="button"
                  onClick={() => loadPreset('ip_conflict')}
                  className="rounded-lg bg-amber-950 px-2.5 py-1 text-[11px] font-bold text-amber-300 border border-amber-800 hover:bg-amber-900"
                >
                  IP Conflict
                </button>
              </div>
            </div>

            {/* PC-A Settings */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                PC-A Subnet Settings (/26 Subnet)
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">IP Address</label>
                  <input
                    type="text"
                    value={config.pca_ip}
                    onChange={(e) => setConfig({ ...config, pca_ip: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Subnet Mask</label>
                  <input
                    type="text"
                    value={config.pca_mask}
                    onChange={(e) => setConfig({ ...config, pca_mask: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Default Gateway</label>
                  <input
                    type="text"
                    value={config.pca_gateway}
                    onChange={(e) => setConfig({ ...config, pca_gateway: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Router Settings */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                Router Interfaces
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Interface 1 (LAN A)</label>
                  <input
                    type="text"
                    value={config.router_int1_ip}
                    onChange={(e) => setConfig({ ...config, router_int1_ip: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Interface 2 (LAN B Server)</label>
                  <input
                    type="text"
                    value={config.router_int2_ip}
                    onChange={(e) => setConfig({ ...config, router_int2_ip: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Execute Button */}
            <button
              onClick={handleTest}
              disabled={testing}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50"
            >
              <span>{testing ? 'Simulating ICMP Packet Hop...' : 'Run ICMP Ping Packet Simulation'}</span>
            </button>

          </div>

          {/* Diagnostic Console Log */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl flex flex-col justify-between font-mono text-xs">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-slate-400 mb-4">
                <span className="font-bold text-slate-200">Hop Diagnostic Console</span>
              </div>

              {diagnostics.length === 0 ? (
                <div className="text-slate-500 py-10 text-center italic">
                  Press "Run ICMP Ping Packet Simulation" to execute layer 3 routing verification.
                </div>
              ) : (
                <div className="space-y-2">
                  {diagnostics.map((line, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border text-[11px] leading-relaxed ${
                        line.includes('PASSED') || line.includes('✅')
                          ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300'
                          : line.includes('FAILED') || line.includes('❌')
                          ? 'bg-rose-950/60 border-rose-800/80 text-rose-300'
                          : 'bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Results Pill */}
            {result && (
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Award:</span>
                <div className="flex items-center gap-2 font-bold">
                  <span className="text-purple-400">+{result.xpEarned} XP</span>
                  <span className="text-emerald-400">+{result.lpEarned} SP</span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
