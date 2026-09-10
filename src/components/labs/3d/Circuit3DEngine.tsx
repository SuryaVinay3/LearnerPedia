import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Lab } from '../../../types';
import { 
  Zap, Award, Play, RotateCcw, Undo2, Redo2, HelpCircle, Sparkles, 
  CheckCircle2, AlertTriangle, ShieldCheck, Cpu, Sliders, Activity, Save, RefreshCw, Volume2, VolumeX, Eye
} from 'lucide-react';
import { apiRequest } from '../../../services/apiClient';

interface Circuit3DEngineProps {
  lab: Lab;
  onComplete: (score: number, xp: number, lp: number, feedback?: string) => void;
}

interface CircuitComponent {
  id: string;
  type: 'BATTERY' | 'BULB' | 'SWITCH' | 'RESISTOR' | 'LED' | 'MOTOR' | 'BUZZER' | 'MULTIMETER';
  name: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  properties: {
    voltage?: number;
    resistance?: number;
    state?: 'OPEN' | 'CLOSED';
    multimeterMode?: 'VOLTAGE' | 'CURRENT' | 'RESISTANCE' | 'CONTINUITY';
  };
  terminals: { id: string; name: string; polarity?: '+' | '-'; localPos: { x: number; y: number; z: number } }[];
}

interface WireConnection {
  id: string;
  fromCompId: string;
  fromTerminalId: string;
  toCompId: string;
  toTerminalId: string;
}

export const Circuit3DEngine: React.FC<Circuit3DEngineProps> = ({ lab, onComplete }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Simulation State
  const [components, setComponents] = useState<CircuitComponent[]>([
    {
      id: 'comp-battery-1',
      type: 'BATTERY',
      name: 'DC Battery (9V)',
      position: { x: -3, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      properties: { voltage: 9 },
      terminals: [
        { id: 'bat-pos', name: 'Positive (+)', polarity: '+', localPos: { x: 0.8, y: 0, z: 0 } },
        { id: 'bat-neg', name: 'Negative (-)', polarity: '-', localPos: { x: -0.8, y: 0, z: 0 } }
      ]
    },
    {
      id: 'comp-switch-1',
      type: 'SWITCH',
      name: 'SPST Switch',
      position: { x: 0, y: 0, z: 2 },
      rotation: { x: 0, y: 0, z: 0 },
      properties: { state: 'OPEN' },
      terminals: [
        { id: 'sw-in', name: 'Terminal A', localPos: { x: -0.6, y: 0, z: 0 } },
        { id: 'sw-out', name: 'Terminal B', localPos: { x: 0.6, y: 0, z: 0 } }
      ]
    },
    {
      id: 'comp-bulb-1',
      type: 'BULB',
      name: 'Incandescent Bulb',
      position: { x: 3, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      properties: { resistance: 100 },
      terminals: [
        { id: 'bulb-t1', name: 'Terminal 1', localPos: { x: -0.5, y: -0.5, z: 0 } },
        { id: 'bulb-t2', name: 'Terminal 2', localPos: { x: 0.5, y: -0.5, z: 0 } }
      ]
    }
  ]);

  const [wires, setWires] = useState<WireConnection[]>([
    { id: 'wire-1', fromCompId: 'comp-battery-1', fromTerminalId: 'bat-pos', toCompId: 'comp-switch-1', toTerminalId: 'sw-in' },
    { id: 'wire-2', fromCompId: 'comp-switch-1', fromTerminalId: 'sw-out', toCompId: 'comp-bulb-1', toTerminalId: 'bulb-t1' },
    { id: 'wire-3', fromCompId: 'comp-bulb-1', fromTerminalId: 'bulb-t2', toCompId: 'comp-battery-1', toTerminalId: 'bat-neg' }
  ]);

  const [selectedCompId, setSelectedCompId] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<{ compId: string; terminalId: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'workspace' | 'measurements' | 'ai' | 'objectives'>('workspace');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Electrical Simulation Metrics
  const [circuitStatus, setCircuitStatus] = useState<'POWER_FLOWING' | 'INCOMPLETE' | 'SHORT_CIRCUIT' | 'POWER_OFF'>('POWER_OFF');
  const [metrics, setMetrics] = useState({ voltage: 9, current: 0.09, resistance: 100, power: 0.81 });
  const [aiChat, setAiChat] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: 'Hello! I am your AI Lab Assistant. I am monitoring your circuit in real-time. Ask me anything about voltage, current, or troubleshooting!' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Three.js scene refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshesRef = useRef<Map<string, THREE.Group>>(new Map());
  const particlesRef = useRef<THREE.Points | null>(null);

  // Evaluate Circuit Topologies & Ohm's Law
  useEffect(() => {
    // Find battery
    const battery = components.find(c => c.type === 'BATTERY');
    const switchComp = components.find(c => c.type === 'SWITCH');
    const loadComp = components.find(c => c.type === 'BULB' || c.type === 'RESISTOR' || c.type === 'LED');

    const switchClosed = switchComp?.properties.state === 'CLOSED';
    const voltage = battery?.properties.voltage || 9;
    const resistance = (loadComp?.properties.resistance) || (loadComp?.type === 'BULB' ? 100 : 220);

    // Check path connectivity via graph traversal on wires
    const isConnected = checkCircuitContinuity(components, wires);

    if (!isConnected) {
      setCircuitStatus('INCOMPLETE');
      setMetrics({ voltage, current: 0, resistance, power: 0 });
    } else if (!switchClosed) {
      setCircuitStatus('POWER_OFF');
      setMetrics({ voltage, current: 0, resistance, power: 0 });
    } else {
      const current = parseFloat((voltage / resistance).toFixed(3));
      const power = parseFloat((voltage * current).toFixed(2));
      setCircuitStatus('POWER_FLOWING');
      setMetrics({ voltage, current, resistance, power });
    }
  }, [components, wires]);

  // Graph continuity check
  const checkCircuitContinuity = (comps: CircuitComponent[], currentWires: WireConnection[]): boolean => {
    if (currentWires.length < 2) return false;
    const battery = comps.find(c => c.type === 'BATTERY');
    const switchComp = comps.find(c => c.type === 'SWITCH');
    const load = comps.find(c => c.type === 'BULB' || c.type === 'RESISTOR' || c.type === 'LED');

    if (!battery || !switchComp || !load) return false;

    // Check if there is an unbroken chain: Battery(+) -> Switch -> Load -> Battery(-)
    const hasBatToSwitch = currentWires.some(w => 
      (w.fromCompId === battery.id && w.fromTerminalId === 'bat-pos' && w.toCompId === switchComp.id) ||
      (w.toCompId === battery.id && w.toTerminalId === 'bat-pos' && w.fromCompId === switchComp.id)
    );

    const hasSwitchToLoad = currentWires.some(w =>
      (w.fromCompId === switchComp.id && w.toCompId === load.id) ||
      (w.toCompId === switchComp.id && w.fromCompId === load.id)
    );

    const hasLoadToBat = currentWires.some(w =>
      (w.fromCompId === load.id && w.toCompId === battery.id && w.toTerminalId === 'bat-neg') ||
      (w.toCompId === load.id && w.fromCompId === battery.id && w.fromTerminalId === 'bat-neg')
    );

    return hasBatToSwitch && hasSwitchToLoad && hasLoadToBat;
  };

  // Three.js Initialization & Render Loop
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07090e);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 8, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 12, 7);
    scene.add(dirLight);

    const grid = new THREE.GridHelper(20, 20, 0x0ea5e9, 0x1e293b);
    grid.position.y = -0.5;
    scene.add(grid);

    // Build 3D Meshes for Components
    rebuildSceneObjects(scene);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Animate Bulb glow or particle current flow if active
      if (circuitStatus === 'POWER_FLOWING') {
        const bulbGroup = meshesRef.current.get('comp-bulb-1');
        if (bulbGroup) {
          const glass = bulbGroup.children.find(c => c.name === 'bulbGlass') as THREE.Mesh;
          if (glass && glass.material) {
            (glass.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5 + Math.sin(Date.now() * 0.01) * 0.2;
          }
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (rendererRef.current && rendererRef.current.domElement) {
        mountRef.current?.removeChild(rendererRef.current.domElement);
      }
    };
  }, [components, circuitStatus]);

  // Rebuild 3D objects when components state changes
  const rebuildSceneObjects = (scene: THREE.Scene) => {
    // Clear old meshes
    meshesRef.current.forEach((group) => {
      scene.remove(group);
    });
    meshesRef.current.clear();

    components.forEach((comp) => {
      const group = new THREE.Group();
      group.position.set(comp.position.x, comp.position.y, comp.position.z);

      if (comp.type === 'BATTERY') {
        // Battery block
        const geom = new THREE.BoxGeometry(1.6, 1.0, 1.0);
        const mat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.3, roughness: 0.4 });
        const mesh = new THREE.Mesh(geom, mat);
        group.add(mesh);

        // Terminals (+) and (-)
        const posTerm = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.3), new THREE.MeshStandardMaterial({ color: 0xef4444 }));
        posTerm.position.set(0.8, 0.5, 0);
        group.add(posTerm);

        const negTerm = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.3), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
        negTerm.position.set(-0.8, 0.5, 0);
        group.add(negTerm);
      } else if (comp.type === 'SWITCH') {
        // Switch base
        const geom = new THREE.BoxGeometry(1.2, 0.4, 0.8);
        const mat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.2 });
        const mesh = new THREE.Mesh(geom, mat);
        group.add(mesh);

        // Switch lever
        const isClosed = comp.properties.state === 'CLOSED';
        const leverGeom = new THREE.BoxGeometry(0.15, 0.8, 0.15);
        const leverMat = new THREE.MeshStandardMaterial({ color: isClosed ? 0x10b981 : 0xef4444 });
        const lever = new THREE.Mesh(leverGeom, leverMat);
        lever.rotation.z = isClosed ? 0 : 0.5;
        lever.position.set(0, 0.5, 0);
        group.add(lever);
      } else if (comp.type === 'BULB') {
        // Bulb socket
        const socket = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.4), new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 }));
        socket.position.y = -0.2;
        group.add(socket);

        // Bulb glass
        const isLit = circuitStatus === 'POWER_FLOWING';
        const glassMat = new THREE.MeshStandardMaterial({
          color: isLit ? 0xfef08a : 0x94a3b8,
          emissive: isLit ? 0xfacc15 : 0x000000,
          emissiveIntensity: isLit ? 0.8 : 0,
          transparent: true,
          opacity: 0.7
        });
        const glass = new THREE.Mesh(new THREE.SphereGeometry(0.6, 16, 16), glassMat);
        glass.name = 'bulbGlass';
        glass.position.y = 0.5;
        group.add(glass);
      }

      scene.add(group);
      meshesRef.current.set(comp.id, group);
    });
  };

  const toggleSwitch = () => {
    setComponents(prev => prev.map(c => {
      if (c.type === 'SWITCH') {
        const newState = c.properties.state === 'OPEN' ? 'CLOSED' : 'OPEN';
        return { ...c, properties: { ...c.properties, state: newState } };
      }
      return c;
    }));
  };

  const handleTerminalClick = (compId: string, terminalId: string) => {
    if (!connectingFrom) {
      setConnectingFrom({ compId, terminalId });
    } else {
      if (connectingFrom.compId === compId) {
        setConnectingFrom(null);
        return;
      }
      // Create new wire
      const newWire: WireConnection = {
        id: `wire-${Date.now()}`,
        fromCompId: connectingFrom.compId,
        fromTerminalId: connectingFrom.terminalId,
        toCompId: compId,
        toTerminalId: terminalId
      };
      setWires(prev => [...prev, newWire]);
      setConnectingFrom(null);
    }
  };

  const handleAskAi = async () => {
    if (!aiInput.trim()) return;
    const userQuery = aiInput.trim();
    setAiChat(prev => [...prev, { sender: 'user', text: userQuery }]);
    setAiInput('');
    setAiLoading(true);

    try {
      const res = await apiRequest('/api/ai/lab-help', {
        method: 'POST',
        body: JSON.stringify({
          lab_id: lab.id,
          components: components.map(c => ({ id: c.id, type: c.type, properties: c.properties })),
          connections: wires,
          circuit_status: circuitStatus,
          measurements: metrics,
          query: userQuery
        })
      });
      setAiChat(prev => [...prev, { sender: 'ai', text: res.reply || 'Check your switch state and battery connections to ensure a closed loop.' }]);
    } catch (e) {
      // Local fallback reasoning
      let fallbackReply = "Your circuit is currently incomplete.";
      if (circuitStatus === 'POWER_FLOWING') {
        fallbackReply = "Your circuit is fully working! The bulb is illuminated because the switch is CLOSED and current is flowing.";
      } else if (circuitStatus === 'POWER_OFF') {
        fallbackReply = "The circuit path is connected, but your switch is OPEN. Click the switch to close it and let current flow.";
      }
      setAiChat(prev => [...prev, { sender: 'ai', text: fallbackReply }]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleCompleteLab = () => {
    if (circuitStatus !== 'POWER_FLOWING') {
      alert("Circuit must be fully active (Power Flowing) before completing the experiment!");
      return;
    }
    onComplete(100, lab.xpReward, lab.lpReward, "Successfully assembled and tested the DC Circuit with active power flow!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[75vh] min-h-[600px] bg-slate-950/80 rounded-2xl border border-slate-800 p-4">
      {/* LEFT: Component Library & Palette */}
      <div className="lg:col-span-3 bg-slate-900/90 rounded-xl border border-slate-800 p-4 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Cpu className="h-4 w-4" /> Component Palette
            </h3>
            <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">3D Lab v1.0</span>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Power Sources</div>
            <div onClick={() => {
              const newComp: CircuitComponent = {
                id: `comp-bat-${Date.now()}`,
                type: 'BATTERY',
                name: 'DC Battery (9V)',
                position: { x: (Math.random() - 0.5) * 4, y: 0, z: (Math.random() - 0.5) * 4 },
                rotation: { x: 0, y: 0, z: 0 },
                properties: { voltage: 9 },
                terminals: [
                  { id: 'bat-pos', name: 'Positive (+)', polarity: '+', localPos: { x: 0.8, y: 0.5, z: 0 } },
                  { id: 'bat-neg', name: 'Negative (-)', polarity: '-', localPos: { x: -0.8, y: 0.5, z: 0 } }
                ]
              };
              setComponents(prev => [...prev, newComp]);
            }} className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 cursor-pointer flex items-center justify-between transition-colors">
              <span className="flex items-center gap-2">🔋 DC Battery (9V)</span>
              <span className="text-[10px] text-cyan-400 font-bold">+ Add</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Control & Switches</div>
            <div onClick={() => {
              const newComp: CircuitComponent = {
                id: `comp-sw-${Date.now()}`,
                type: 'SWITCH',
                name: 'SPST Switch',
                position: { x: (Math.random() - 0.5) * 4, y: 0, z: (Math.random() - 0.5) * 4 },
                rotation: { x: 0, y: 0, z: 0 },
                properties: { state: 'OPEN' },
                terminals: [
                  { id: 'sw-in', name: 'Terminal A', localPos: { x: -0.6, y: 0, z: 0 } },
                  { id: 'sw-out', name: 'Terminal B', localPos: { x: 0.6, y: 0, z: 0 } }
                ]
              };
              setComponents(prev => [...prev, newComp]);
            }} className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 cursor-pointer flex items-center justify-between transition-colors">
              <span className="flex items-center gap-2">🎚️ SPST Switch</span>
              <span className="text-[10px] text-cyan-400 font-bold">+ Add</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Outputs</div>
            <div onClick={() => {
              const newComp: CircuitComponent = {
                id: `comp-bulb-${Date.now()}`,
                type: 'BULB',
                name: 'Incandescent Bulb',
                position: { x: (Math.random() - 0.5) * 4, y: 0, z: (Math.random() - 0.5) * 4 },
                rotation: { x: 0, y: 0, z: 0 },
                properties: { resistance: 100 },
                terminals: [
                  { id: 'bulb-t1', name: 'Terminal 1', localPos: { x: -0.5, y: 0, z: 0 } },
                  { id: 'bulb-t2', name: 'Terminal 2', localPos: { x: 0.5, y: 0, z: 0 } }
                ]
              };
              setComponents(prev => [...prev, newComp]);
            }} className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 cursor-pointer flex items-center justify-between transition-colors">
              <span className="flex items-center gap-2">💡 Incandescent Bulb</span>
              <span className="text-[10px] text-cyan-400 font-bold">+ Add</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <button
              onClick={toggleSwitch}
              className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                components.find(c => c.type === 'SWITCH')?.properties.state === 'CLOSED'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Zap className="h-4 w-4" />
              Switch: {components.find(c => c.type === 'SWITCH')?.properties.state || 'OPEN'}
            </button>

            <button
              onClick={() => {
                setWires([]);
                setComponents([
                  {
                    id: 'comp-battery-1',
                    type: 'BATTERY',
                    name: 'DC Battery (9V)',
                    position: { x: -3, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    properties: { voltage: 9 },
                    terminals: [
                      { id: 'bat-pos', name: 'Positive (+)', polarity: '+', localPos: { x: 0.8, y: 0, z: 0 } },
                      { id: 'bat-neg', name: 'Negative (-)', polarity: '-', localPos: { x: -0.8, y: 0, z: 0 } }
                    ]
                  },
                  {
                    id: 'comp-switch-1',
                    type: 'SWITCH',
                    name: 'SPST Switch',
                    position: { x: 0, y: 0, z: 2 },
                    rotation: { x: 0, y: 0, z: 0 },
                    properties: { state: 'OPEN' },
                    terminals: [
                      { id: 'sw-in', name: 'Terminal A', localPos: { x: -0.6, y: 0, z: 0 } },
                      { id: 'sw-out', name: 'Terminal B', localPos: { x: 0.6, y: 0, z: 0 } }
                    ]
                  },
                  {
                    id: 'comp-bulb-1',
                    type: 'BULB',
                    name: 'Incandescent Bulb',
                    position: { x: 3, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    properties: { resistance: 100 },
                    terminals: [
                      { id: 'bulb-t1', name: 'Terminal 1', localPos: { x: -0.5, y: -0.5, z: 0 } },
                      { id: 'bulb-t2', name: 'Terminal 2', localPos: { x: 0.5, y: -0.5, z: 0 } }
                    ]
                  }
                ]);
              }}
              className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset Lab State
            </button>
          </div>
        </div>

        <div className="text-[10px] text-slate-500 text-center pt-2 border-t border-slate-800">
          LearnerPedia 3D Physics & Electronics Engine
        </div>
      </div>

      {/* CENTER: 3D Viewport & Terminal Connection Tool */}
      <div className="lg:col-span-6 flex flex-col bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden relative">
        {/* Top Status Header */}
        <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full animate-ping ${
              circuitStatus === 'POWER_FLOWING' ? 'bg-emerald-400' :
              circuitStatus === 'POWER_OFF' ? 'bg-amber-400' : 'bg-red-400'
            }`} />
            <span className="text-xs font-bold text-slate-200">
              Status: <span className={
                circuitStatus === 'POWER_FLOWING' ? 'text-emerald-400' :
                circuitStatus === 'POWER_OFF' ? 'text-amber-400' : 'text-red-400'
              }>{circuitStatus}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-slate-300">
            <span>⚡ {metrics.voltage}V</span>
            <span>🔌 {metrics.current}A</span>
            <span>💡 {metrics.power}W</span>
          </div>
        </div>

        {/* 3D Three.js Mount Container */}
        <div ref={mountRef} className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing">
          {/* Overlay instruction */}
          <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 p-2.5 rounded-xl text-[10px] text-slate-300 pointer-events-none">
            💡 <span className="font-bold text-cyan-400">Instructions:</span> Click component terminals to connect wires. Close switch to power the circuit.
          </div>
        </div>
      </div>

      {/* RIGHT: Tabs (Measurements, AI Assistant, Objectives) */}
      <div className="lg:col-span-3 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col overflow-hidden">
        {/* Tab Header */}
        <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-950/50 text-xs font-bold">
          <button
            onClick={() => setActiveTab('workspace')}
            className={`py-3 text-center border-b-2 transition-all ${activeTab === 'workspace' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            Terminals
          </button>
          <button
            onClick={() => setActiveTab('measurements')}
            className={`py-3 text-center border-b-2 transition-all ${activeTab === 'measurements' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            Meters
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`py-3 text-center border-b-2 transition-all ${activeTab === 'ai' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            AI Assistant
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {activeTab === 'workspace' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Terminal Connections</h4>
              
              <div className="space-y-2">
                {components.map(comp => (
                  <div key={comp.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{comp.name}</span>
                      <span className="text-[10px] text-cyan-400 font-mono">{comp.type}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {comp.terminals.map(term => (
                        <button
                          key={term.id}
                          onClick={() => handleTerminalClick(comp.id, term.id)}
                          className={`p-2 rounded-lg text-xs font-bold text-left border transition-all flex items-center justify-between ${
                            connectingFrom?.compId === comp.id && connectingFrom?.terminalId === term.id
                              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500/40'
                          }`}
                        >
                          <span className="truncate">{term.name}</span>
                          <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                <span className="text-[10px] text-slate-500 uppercase block font-sans">Active Wires ({wires.length})</span>
                {wires.map(w => (
                  <div key={w.id} className="flex items-center justify-between text-[11px] text-slate-300 bg-slate-900 p-1.5 rounded">
                    <span>{w.fromCompId} ⟷ {w.toCompId}</span>
                    <button
                      onClick={() => setWires(prev => prev.filter(item => item.id !== w.id))}
                      className="text-red-400 hover:text-red-300 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'measurements' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-400" /> Live Multimeter
              </h4>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono space-y-3">
                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Voltage (V):</span>
                  <span className="text-cyan-400 font-bold">{metrics.voltage.toFixed(2)} V</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Current (I):</span>
                  <span className="text-emerald-400 font-bold">{metrics.current.toFixed(3)} A</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Resistance (R):</span>
                  <span className="text-amber-400 font-bold">{metrics.resistance} Ω</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Power (P):</span>
                  <span className="text-purple-400 font-bold">{metrics.power.toFixed(2)} W</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 space-y-1">
                <span className="font-bold block">Ohm's Law Verification:</span>
                <p className="text-[11px] text-slate-300 font-mono">I = V / R = {metrics.voltage} / {metrics.resistance} = {metrics.current} A</p>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="flex flex-col h-full space-y-3">
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {aiChat.map((msg, idx) => (
                  <div key={idx} className={`p-2.5 rounded-xl text-xs ${msg.sender === 'user' ? 'bg-cyan-500/10 text-cyan-200 ml-4 border border-cyan-500/20' : 'bg-slate-950 text-slate-300 mr-4 border border-slate-800'}`}>
                    {msg.text}
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                  placeholder="Ask AI why bulb is OFF..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
                <button
                  onClick={handleAskAi}
                  disabled={aiLoading}
                  className="px-3 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Completion Action */}
        <div className="p-3 border-t border-slate-800 bg-slate-950">
          <button
            onClick={handleCompleteLab}
            className={`w-full py-3 rounded-xl font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all ${
              circuitStatus === 'POWER_FLOWING'
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 animate-pulse'
                : 'bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            Complete Experiment (+{lab.xpReward} XP)
          </button>
        </div>
      </div>
    </div>
  );
};
