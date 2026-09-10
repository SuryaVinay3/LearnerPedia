import React from 'react';
import { Lab } from '../../types';
import { CodeExecutionEngine } from './CodeExecutionEngine';
import { WebPlaygroundEngine } from './WebPlaygroundEngine';
import { SqlPlaygroundEngine } from './SqlPlaygroundEngine';
import { NetworkSimulationEngine } from './NetworkSimulationEngine';
import { DataStructureEngine } from './DataStructureEngine';
import { AlgorithmEngine } from './AlgorithmEngine';
import { CybersecurityEngine } from './CybersecurityEngine';
import { CloudSimulationEngine } from './CloudSimulationEngine';
import { DevOpsEngine } from './DevOpsEngine';
import { MlExperimentEngine } from './MlExperimentEngine';
import { OsSimulationEngine } from './OsSimulationEngine';
import { DataAnalysisEngine } from './DataAnalysisEngine';
import { ExperientialLabEngine } from './ExperientialLabEngine';
import { Circuit3DEngine } from './3d/Circuit3DEngine';

interface LabEngineProps {
  lab: Lab;
  onComplete: (score: number, xp: number, lp: number, feedback?: string) => void;
}

export const LabEngine: React.FC<LabEngineProps> = ({ lab, onComplete }) => {
  switch (lab.type) {
    case 'CODE_EXECUTION':
      return <CodeExecutionEngine lab={lab} onComplete={onComplete} />;
    
    case 'WEB_PLAYGROUND':
      return <WebPlaygroundEngine lab={lab} onComplete={onComplete} />;

    case 'SQL_PLAYGROUND':
      return <SqlPlaygroundEngine lab={lab} onComplete={onComplete} />;

    case 'NETWORK_SIMULATION':
      return <NetworkSimulationEngine lab={lab} onComplete={onComplete} />;

    case 'DATA_STRUCTURE_VISUALIZATION':
      return <DataStructureEngine lab={lab} onComplete={onComplete} />;

    case 'ALGORITHM_VISUALIZATION':
      return <AlgorithmEngine lab={lab} onComplete={onComplete} />;

    case 'CYBERSECURITY_SIMULATION':
      return <CybersecurityEngine lab={lab} onComplete={onComplete} />;

    case 'CLOUD_SIMULATION':
      return <CloudSimulationEngine lab={lab} onComplete={onComplete} />;

    case 'DEVOPS_SIMULATION':
      return <DevOpsEngine lab={lab} onComplete={onComplete} />;

    case 'ML_EXPERIMENT':
      return <MlExperimentEngine lab={lab} onComplete={onComplete} />;

    case 'OS_SIMULATION':
      return <OsSimulationEngine lab={lab} onComplete={onComplete} />;

    case 'DATA_ANALYSIS':
      return <DataAnalysisEngine lab={lab} onComplete={onComplete} />;

    case 'CIRCUIT_LOGIC':
    case 'CIRCUIT_ANALOG':
    case 'PHYS_ELECTRICAL':
      return <Circuit3DEngine lab={lab} onComplete={onComplete} />;

    case 'PCB_LAYOUT':
    case 'MICROCONTROLLER':
    case 'COMP_ASSEMBLY':
    case 'CPU_SIM':
    case 'NETWORK_ROUTER':
    case 'NETWORK_TOPOLOGY':
    case 'IOT_NET':
    case 'ROBOTICS':
    case 'CHEM_LAB':
    case 'CHEM_PH':
    case 'CHEM_TITRATION':
    case 'CHEM_MOLECULAR':
    case 'PHYS_MECHANICS':
    case 'PHYS_ELECTROMAGNET':
    case 'PHYS_THERMO':
    case 'MECH_MACHINES':
    case 'CONTROL_SYSTEM':
      return <ExperientialLabEngine lab={lab} onComplete={onComplete} />;

    default:
      return <CodeExecutionEngine lab={lab} onComplete={onComplete} />;
  }
};
