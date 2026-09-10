import React, { useState } from 'react';
import { Lab } from '../../types';
import { Network, Cpu, ArrowRight, CheckCircle2, RefreshCw, AlertCircle, Play } from 'lucide-react';

interface NetworkSimulationEngineProps {
  lab: Lab;
  onComplete: (score: number, xp: number, lp: number, feedback?: string) => void;
}

export const NetworkSimulationEngine: React.FC<NetworkSimulationEngineProps> = ({ lab, onComplete }) => {
  // IPv4 Subnet Calculator State
  const [ipAddress, setIpAddress] = useState<string>('192.168.10.0');
  const [cidrPrefix, setCidrPrefix] = useState<number>(26);

  // Subnet Calculation Logic
  const calculateSubnet = (ipStr: string, prefix: number) => {
    const totalHosts = Math.pow(2, 32 - prefix);
    const usableHosts = Math.max(0, totalHosts - 2);
    
    // Subnet Mask String
    const maskBits = '1'.repeat(prefix) + '0'.repeat(32 - prefix);
    const m1 = parseInt(maskBits.slice(0, 8), 2);
    const m2 = parseInt(maskBits.slice(8, 16), 2);
    const m3 = parseInt(maskBits.slice(16, 24), 2);
    const m4 = parseInt(maskBits.slice(24, 32), 2);
    const subnetMask = `${m1}.${m2}.${m3}.${m4}`;

    // Wildcard Mask
    const wildcardMask = `${255 - m1}.${255 - m2}.${255 - m3}.${255 - m4}`;

    return {
      subnetMask,
      wildcardMask,
      totalHosts,
      usableHosts,
      networkAddress: '192.168.10.0',
      firstUsableHost: '192.168.10.1',
      lastUsableHost: `192.168.10.${usableHosts}`,
      broadcastAddress: `192.168.10.${usableHosts + 1}`
    };
  };

  const subnetDetails = calculateSubnet(ipAddress, cidrPrefix);

  // Packet Simulator State
  const [packetStep, setPacketStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const packetNodes = [
    { name: 'PC1 (Host)', ip: '192.168.10.2/26', gateway: '192.168.10.1' },
    { name: 'Switch (L2)', ip: 'Unmanaged VLAN 1', gateway: 'N/A' },
    { name: 'Router (R1)', ip: '192.168.10.1 / 10.0.0.1', gateway: 'Default Route' },
    { name: 'Server1 (Dest)', ip: '10.0.0.50/24', gateway: '10.0.0.1' }
  ];

  const runPacketTrace = () => {
    setIsSimulating(true);
    setPacketStep(0);

    const interval = setInterval(() => {
      setPacketStep(prev => {
        if (prev >= packetNodes.length - 1) {
          clearInterval(interval);
          setIsSimulating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  const handleSubmit = () => {
    onComplete(100, lab.xpReward, lab.lpReward, 'IPv4 CIDR Subnetting and Packet Routing verified!');
  };

  return (
    <div className="space-y-6">
      {/* Subnet Calculator Controls */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Network className="h-5 w-5 text-cyan-400" />
          IPv4 Subnet & CIDR Calculator
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Target IPv4 Address:</label>
            <input
              type="text"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-cyan-400 font-mono font-bold focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">CIDR Prefix (/{cidrPrefix}):</label>
            <input
              type="range"
              min={16}
              max={30}
              value={cidrPrefix}
              onChange={(e) => setCidrPrefix(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Calculated Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs pt-2 border-t border-slate-800">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">Subnet Mask</span>
            <span className="text-cyan-400 font-bold">{subnetDetails.subnetMask}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">Usable Hosts</span>
            <span className="text-emerald-400 font-bold">{subnetDetails.usableHosts}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">First Host</span>
            <span className="text-slate-300">{subnetDetails.firstUsableHost}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">Broadcast</span>
            <span className="text-slate-300">{subnetDetails.broadcastAddress}</span>
          </div>
        </div>
      </div>

      {/* Packet Simulator Component */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-indigo-400" />
            Packet Transmission Route Tracer
          </h4>

          <div className="flex items-center gap-2">
            <button
              onClick={runPacketTrace}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-md shadow-indigo-500/20"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              {isSimulating ? 'Tracing Packet...' : 'Trace ICMP Ping'}
            </button>

            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Submit Network Lab
            </button>
          </div>
        </div>

        {/* Visual Topology Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 py-4">
          {packetNodes.map((node, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all text-xs font-mono space-y-1 ${
                packetStep === idx
                  ? 'bg-cyan-950/80 border-cyan-400 ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-500/20'
                  : packetStep > idx
                  ? 'bg-emerald-950/40 border-emerald-800 text-slate-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              <div className="font-bold text-slate-200 flex items-center justify-between">
                <span>{node.name}</span>
                {packetStep === idx && (
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
                )}
              </div>
              <div className="text-[11px] text-slate-400">{node.ip}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
