import { Lab } from '../types';

export const EXPERIENTIAL_LABS: Lab[] = [
  {
    id: 'lab-circuit-logic',
    title: 'Logic Gates & Boolean Algebra Lab',
    slug: 'circuit-logic-gates',
    category: 'PCB & Circuit Design Labs',
    description: 'Configure active input signals A and B, select logical gates (AND, OR, XOR, NAND), and observe real-time output states to construct truth tables.',
    type: 'CIRCUIT_LOGIC',
    difficulty: 'Beginner',
    objectives: [
      'Analyze logical truth tables for elementary gates',
      'Understand active-high and active-low input signals',
      'Trace boolean combinations in combinatorial logic circuits'
    ],
    instructions: 'Set Inputs A and B, select different logical gates (AND, OR, XOR, NAND) from the control panel, observe output state changes, and click "Verify Gate States" to complete the truth table.',
    hints: [
      'An AND gate outputs 1 only when both inputs are 1.',
      'An XOR gate outputs 1 only when inputs differ.',
      'A NAND gate outputs 0 only when both inputs are 1.'
    ],
    variables: {
      inputs: { A: 0, B: 0 },
      gates: ['AND', 'OR', 'XOR', 'NAND']
    },
    xpReward: 55,
    lpReward: 25,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-circuit-analog',
    title: 'DC Analog Circuit & Ohm\'s Law Lab',
    slug: 'analog-circuit-ohms-law',
    category: 'Electronics & Hardware Labs',
    description: 'Build a series analog circuit containing a DC battery power source, a current-limiting resistor, and an LED diode. Adjust values to verify V = I * R without blowing the diode.',
    type: 'CIRCUIT_ANALOG',
    difficulty: 'Beginner',
    objectives: [
      'Formulate current using Ohm\'s Law',
      'Identify current limits for standard LED diodes',
      'Calculate necessary current-limiting series resistance values'
    ],
    instructions: 'Adjust the Battery DC Voltage and series Resistor values. Aim to supply exactly 20mA (0.02A) of current to achieve maximum LED brightness safely. Avoid exceeding 30mA, or the LED will fail!',
    hints: [
      'Ohm\'s Law states that current (I) equals voltage (V) divided by resistance (R).',
      'At 5V, a 250Ω resistor limits the current to exactly 20mA.',
      'If you exceed 30mA, the LED glows red-hot and blows.'
    ],
    variables: {
      voltage: 5,
      resistance: 100,
      ledMaxCurrentMA: 30
    },
    xpReward: 60,
    lpReward: 25,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-pcb-layout',
    title: 'PCB Trace Routing & Clearance Lab',
    slug: 'pcb-trace-routing',
    category: 'PCB & Circuit Design Labs',
    description: 'Route high-speed differential signal traces on a multi-layer PCB, avoiding electromagnetic interference (EMI) boundaries and respecting trace clearance guidelines.',
    type: 'PCB_LAYOUT',
    difficulty: 'Intermediate',
    objectives: [
      'Apply standard spacing clearance rules to trace routing',
      'Optimize signal path lengths to minimize delay and capacitance',
      'Respect high-frequency coupling boundaries and guard rings'
    ],
    instructions: 'Adjust the routing route points to bypass the high-EMI inductor field. Maintain a minimum clearance of 8 mil from the ground copper pour and ensure trace length matches the target impedance tolerance.',
    hints: [
      'Routing straight through the inductor field causes critical signal noise.',
      'Maintain adequate spacing (clearance) between signals and copper pours to prevent coupling.'
    ],
    variables: {
      clearanceRequirementMil: 8,
      noiseFrequencyGhz: 2.4
    },
    xpReward: 70,
    lpReward: 30,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-microcontroller-esp32',
    title: 'Arduino ESP32 Blink & GPIO Controller',
    slug: 'arduino-esp32-blink',
    category: 'Embedded Systems & IoT Labs',
    description: 'Write, debug, and run standard C++ setup/loop microcontroller scripts to blink GPIO-connected LEDs and interpret analog sensor voltages.',
    type: 'MICROCONTROLLER',
    difficulty: 'Intermediate',
    objectives: [
      'Configure digital pin states using pinMode() and digitalWrite()',
      'Interpret sensor inputs using analogRead()',
      'Incorporate delay loops to regulate blinking frequencies'
    ],
    instructions: 'Write or load the GPIO control script, select the correct COM port, compile the source code, and monitor the simulated ESP32 board LEDs responding in real time.',
    hints: [
      'pinMode(13, OUTPUT) defines digital pin 13 as an output.',
      'digitalWrite(13, HIGH) drives the pin to 3.3V, turning the LED on.',
      'delay(500) pauses execution for 500 milliseconds.'
    ],
    variables: {
      mcuType: 'ESP32',
      onboardLED: 13,
      sensorPin: 34
    },
    xpReward: 65,
    lpReward: 30,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-computer-assembly',
    title: 'PC Workstation Assembly & Boot Diagnostics',
    slug: 'computer-assembly-diagnostics',
    category: 'Computer Hardware & Architecture Labs',
    description: 'Assemble a high-performance computer from individual modules, insert dual-channel RAM sticks in corresponding motherboard slots, and resolve POST beep code issues.',
    type: 'COMP_ASSEMBLY',
    difficulty: 'Beginner',
    objectives: [
      'Sequence structural PC assembly procedures correctly',
      'Position dual-channel RAM configurations in appropriate DIMM slots',
      'Interpret BIOS POST beep codes to isolate memory and GPU faults'
    ],
    instructions: 'Place CPU in the socket, apply thermal paste, slot RAM sticks in DIMM slots A2 and B2, mount the graphics card, connect the power supply cables, and perform a cold boot.',
    hints: [
      'Motherboards require dual-channel memory in slots 2 and 4 (A2 and B2) for optimal throughput.',
      'A continuous three-short-beeps code indicates a memory registration failure.'
    ],
    variables: {
      postBeepCodes: {
        '1 long, 2 short': 'Video Card Failure',
        '3 short': 'RAM Registration Failure',
        'Continuous': 'Power Supply Overload'
      }
    },
    xpReward: 50,
    lpReward: 20,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-cpu-simulation',
    title: '8-Bit RISC CPU Register & Instruction Lab',
    slug: 'cpu-register-instructions',
    category: 'Computer Hardware & Architecture Labs',
    description: 'Step through assembly instructions, trace arithmetic-logic unit (ALU) operations, and observe register file state transitions inside a simplified 8-bit computer architecture.',
    type: 'CPU_SIM',
    difficulty: 'Advanced',
    objectives: [
      'Trace basic machine code instructions like LOAD, ADD, and STORE',
      'Isolate register state transformations inside Registers A and B',
      'Monitor ALU condition flags including zero (Z) and carry (C)'
    ],
    instructions: 'Write assembly instructions to LOAD 15 into Reg A, ADD 25 into Reg B, and STORE the result in RAM location 0x4A. Execute instructions step-by-step.',
    hints: [
      'LOAD A, 15 loads the immediate value 15 directly into accumulator Register A.',
      'ADD A, B computes Reg A + Reg B and saves the result in Register A.'
    ],
    variables: {
      registers: { A: 0, B: 0, PC: 0, SP: 0xFF },
      memory: {}
    },
    xpReward: 75,
    lpReward: 35,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-network-router-cli',
    title: 'Cisco IOS Router & Switch CLI Sandbox',
    slug: 'cisco-ios-cli-sandbox',
    category: 'Network Hardware Labs',
    description: 'Access a direct virtual terminal console to execute Cisco IOS CLI configuration commands, define IP addressing schemes, and enable static IP routing rules.',
    type: 'NETWORK_ROUTER',
    difficulty: 'Intermediate',
    objectives: [
      'Access Privileged EXEC mode using enable',
      'Configure interface IP addresses and subnet masks via Global Config',
      'Incorporate default static routes to forward packets to upstream gateways'
    ],
    instructions: 'Log into the console, configure GigabitEthernet0/0 interface with IP address 192.168.1.1/24, enable the interface using "no shutdown", and write the configuration.',
    hints: [
      'Enter privileged mode with "enable", then configuration mode with "configure terminal".',
      'Interface GigabitEthernet0/0 is entered with "interface g0/0".',
      'Activate ports using the "no shutdown" command.'
    ],
    variables: {
      hostname: 'R1',
      interfaces: ['GigabitEthernet0/0', 'GigabitEthernet0/1']
    },
    xpReward: 70,
    lpReward: 30,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-network-topology',
    title: 'Star, Ring, & Mesh Topology Redundancy Lab',
    slug: 'network-topology-redundancy',
    category: 'Network Hardware Labs',
    description: 'Construct and test different physical topology configurations including Star, Ring, and Full Mesh. Cut active linkages to analyze packet rerouting and network convergence times.',
    type: 'NETWORK_TOPOLOGY',
    difficulty: 'Intermediate',
    objectives: [
      'Analyze physical cabling cost versus logical network reliability',
      'Measure network healing times under Spanning Tree Protocol (STP)',
      'Isolate single point of failure bottlenecks'
    ],
    instructions: 'Deploy 5 switches in Star, Ring, or Mesh configurations. Simulate a backbone fiber failure by severing link L2-L3, and observe how quickly STP converges to reroute packet flows.',
    hints: [
      'Star topologies depend entirely on the central hub switch.',
      'Ring topologies have redundant paths but require STP blocking to prevent broadcast storms.',
      'Full Mesh topologies offer zero downtime but incur extremely high cabling costs.'
    ],
    variables: {
      nodesCount: 5,
      stpConvergenceMs: 1500
    },
    xpReward: 65,
    lpReward: 25,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-iot-net',
    title: 'IoT MQTT Sensor Network & Broker Controller',
    slug: 'iot-mqtt-broker-controller',
    category: 'Embedded Systems & IoT Labs',
    description: 'Configure physical sensor nodes to establish connection with an MQTT Broker. Publish temperature/humidity telemetry and subscribe to command topics to trigger relays.',
    type: 'IOT_NET',
    difficulty: 'Advanced',
    objectives: [
      'Formulate MQTT topic hierarchies like home/livingroom/temp',
      'Configure publish/subscribe connections and Quality of Service (QoS) levels',
      'Serialize sensor data payloads in standard JSON formats'
    ],
    instructions: 'Define the broker address, set the MQTT client identifier, subscribe to "home/actuators/relay", and publish sensor readings to "home/sensors/climate" with a 500ms heartbeat.',
    hints: [
      'MQTT runs over TCP/IP and uses port 1883 for unencrypted transmissions.',
      'QoS 1 guarantees that a publish message is delivered to the receiver at least once.'
    ],
    variables: {
      brokerAddress: 'mqtt.learnerpedia.internal',
      brokerPort: 1883,
      qosLevel: 1
    },
    xpReward: 80,
    lpReward: 35,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-robotics-kinematics',
    title: '3-Axis Robotic Arm Kinematics & Path Planning',
    slug: 'robotic-arm-kinematics',
    category: 'Robotics Labs',
    description: 'Calculate and apply joint angle rotations (Base, Shoulder, Elbow) to guide a robotic arm end-effector to grab objects and deposit them on a moving conveyor belt.',
    type: 'ROBOTICS',
    difficulty: 'Advanced',
    objectives: [
      'Translate Cartesian coordinates into joint angles using inverse kinematics',
      'Avoid mechanical collision zones and extreme joint constraints',
      'Program smooth trapezoidal velocity profiles for servo actuators'
    ],
    instructions: 'Manipulate the Base, Shoulder, and Elbow angle sliders to align the gripper with the target payload coordinate. Activate the vacuum gripper to pick the package and place it on the conveyor.',
    hints: [
      'Pay close attention to joint limits to avoid mechanical stresses.',
      'Adjust joint angles sequentially: align the base angle first, then coordinate the shoulder and elbow.'
    ],
    variables: {
      baseAngleRange: [0, 180],
      shoulderAngleRange: [-45, 90],
      elbowAngleRange: [0, 135],
      targetCoordinates: { x: 120, y: 80, z: 45 }
    },
    xpReward: 75,
    lpReward: 35,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-chemistry-alkali',
    title: 'Alkali Metals & Water Reactivity Trends Lab',
    slug: 'alkali-metals-reactivity',
    category: 'Chemistry Labs',
    description: 'Conduct virtual thermodynamic reactions by dropping alkali group-1 elements (Lithium, Sodium, Potassium) into a water beaker. Measure exothermic heat release.',
    type: 'CHEM_LAB',
    difficulty: 'Beginner',
    objectives: [
      'Relate atomic radius to outer shell electron ionization energies',
      'Balance chemical reaction equations for group 1 metals with water',
      'Interpret exothermic energy curves and hydrogen gas liberation rates'
    ],
    instructions: 'Select Lithium, Sodium, or Potassium. Adjust the metal mass slider, drop the sample into the water beaker, monitor the temperature spikes, and record the reaction severity.',
    hints: [
      'Reactivity increases down the alkali metal group as outer valence electrons sit farther from the nucleus.',
      'The reaction produces alkaline metal hydroxides and flammable hydrogen gas.'
    ],
    variables: {
      metals: {
        Li: { atomicNumber: 3, heatMultiplier: 1.2 },
        Na: { atomicNumber: 11, heatMultiplier: 2.8 },
        K: { atomicNumber: 19, heatMultiplier: 6.5 }
      }
    },
    xpReward: 50,
    lpReward: 20,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-chemistry-ph',
    title: 'pH Scale, Indicators & Neutralization Lab',
    slug: 'ph-scale-indicators',
    category: 'Chemistry Labs',
    description: 'Measure the pH of everyday liquid compounds using digital pH probes and liquid indicators. Neutralize basic/acidic wastes using appropriate buffering agents.',
    type: 'CHEM_PH',
    difficulty: 'Beginner',
    objectives: [
      'Formulate hydronium ion concentrations from pH values using logarithmic scales',
      'Observe indicator color transformations across different pH thresholds',
      'Neutralize strong acids/bases to a neutral pH 7'
    ],
    instructions: 'Measure the pH of Lemon Juice, Soap, or Bleach. Add drops of hydrochloric acid (HCl) or sodium hydroxide (NaOH) to stabilize and neutralize the solution to a pH of exactly 7.0.',
    hints: [
      'pH is calculated as -log10[H3O+]. A change of 1 pH unit represents a 10x change in acidity.',
      'Soap is basic (pH ~9.0). To neutralize it, add drops of weak acid (HCl).'
    ],
    variables: {
      solutions: {
        'Lemon Juice': { initialPh: 2.2, color: '#eab308' },
        'Coffee': { initialPh: 5.0, color: '#78350f' },
        'Soap Water': { initialPh: 9.2, color: '#38bdf8' },
        'Bleach': { initialPh: 12.5, color: '#f1f5f9' }
      }
    },
    xpReward: 50,
    lpReward: 20,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-chemistry-titration',
    title: 'Volumetric Acid-Base Titration Lab',
    slug: 'acid-base-titration',
    category: 'Chemistry Labs',
    description: 'Analyze an unknown molarity hydrochloric acid (HCl) sample by drop-by-drop titration with 0.1M sodium hydroxide (NaOH) using phenolphthalein indicators.',
    type: 'CHEM_TITRATION',
    difficulty: 'Intermediate',
    objectives: [
      'Calibrate volumetric burettes to read meniscus liquid levels',
      'Identify the titration equivalence endpoint via indicator transitions',
      'Formulate unknown solution concentrations using standard stoichiometric equations'
    ],
    instructions: 'Open the burette valve to add 0.1M NaOH to the HCl beaker. Monitor the solution color closely. Stop the flow at the first sign of a faint, permanent pink tint, and calculate the molarity.',
    hints: [
      'Stoichiometry ratio of HCl to NaOH is 1:1. Use Ma * Va = Mb * Vb to calculate molarity.',
      'Phenolphthalein turns pink when the solution becomes slightly basic (pH > 8.2).'
    ],
    variables: {
      unknownHclVolumeML: 25.0,
      naohMolarity: 0.1,
      targetEndpointVolumeML: 18.5
    },
    xpReward: 65,
    lpReward: 25,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-chemistry-molecular',
    title: 'Lewis Dot Structures & VSEPR Molecular Geometry',
    slug: 'lewis-dot-vsepr-geometry',
    category: 'Chemistry Labs',
    description: 'Build covalent molecules in three dimensions by pairing valence electrons, accounting for steric repulsion forces, and predicting molecular geometries.',
    type: 'CHEM_MOLECULAR',
    difficulty: 'Intermediate',
    objectives: [
      'Construct Lewis dot structures representing outer shell valence electrons',
      'Formulate steric numbers using bonding pairs and non-bonding lone pairs',
      'Assign correct molecular geometries and bond angles according to VSEPR theory'
    ],
    instructions: 'Select H2O, CO2, or CH4. Distribute valence electrons, construct covalent chemical bonds, determine lone pairs, and select the correct 3D molecular geometry and bond angle.',
    hints: [
      'Water (H2O) has 2 single bonds and 2 lone pairs on the central oxygen atom (Steric Number 4, bent shape).',
      'Carbon dioxide (CO2) contains 2 double bonds and no lone pairs on carbon (Steric Number 2, linear shape).'
    ],
    variables: {
      compounds: ['H2O', 'CO2', 'CH4']
    },
    xpReward: 60,
    lpReward: 25,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-physics-mechanics',
    title: '2D Projectile Motion & Gravity Kinematics Lab',
    slug: 'projectile-motion-kinematics',
    category: 'Physics Labs',
    description: 'Launch projectiles under variable launch angles, initial muzzle velocities, and environmental gravitational fields (Earth, Moon, Mars). Trace kinematics motion arrays.',
    type: 'PHYS_MECHANICS',
    difficulty: 'Beginner',
    objectives: [
      'Deconstruct initial velocity vectors into horizontal and vertical components',
      'Formulate total horizontal travel range and peak flight altitudes',
      'Acknowledge gravitational drag effects on moving projectile trajectories'
    ],
    instructions: 'Adjust the Launch Angle and Initial Velocity sliders. Select gravity conditions, launch the cannonball, analyze the flight curve data grid, and hit the target target to complete the lab.',
    hints: [
      'Maximum horizontal range on flat ground occurs at a launch angle of exactly 45 degrees.',
      'The horizontal velocity component remains constant throughout the flight, while gravity accelerates the vertical velocity downward.'
    ],
    variables: {
      targetDistanceM: 120,
      gravityEnvironments: {
        Earth: 9.81,
        Moon: 1.62,
        Mars: 3.71
      }
    },
    xpReward: 55,
    lpReward: 25,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-physics-electrical',
    title: 'Coulomb\'s Law & Electrostatic Field Vector Lab',
    slug: 'coulombs-law-fields',
    category: 'Physics Labs',
    description: 'Arrange positive and negative point charges on a coordinate grid, model electrostatic force lines of flux, and calculate direct Coulomb attraction/repulsion forces.',
    type: 'PHYS_ELECTRICAL',
    difficulty: 'Intermediate',
    objectives: [
      'Verify Coulomb\'s inverse-square force relation',
      'Draw vector field overlays for arbitrary point charge configurations',
      'Locate field cancellation null points where net electrical forces equal zero'
    ],
    instructions: 'Place Charge 1 (+5 μC) and Charge 2 (-5 μC) on the grid. Adjust the spacing distance between them, observe the change in Coulomb forces, and locate the electrostatic field null points.',
    hints: [
      'Coulomb\'s Law states that force is directly proportional to the product of charges and inversely proportional to the square of distance.',
      'Like charges repel each other, while opposite charges experience an attractive force.'
    ],
    variables: {
      coulombConstantK: 8.99e9,
      chargesMicroCoulombs: [-10, -5, 5, 10]
    },
    xpReward: 65,
    lpReward: 25,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-physics-electromagnet',
    title: 'Faraday\'s Law of Electromagnetic Induction Lab',
    slug: 'faradays-law-induction',
    category: 'Physics Labs',
    description: 'Slide a permanent bar magnet through wire solenoid coils, analyze magnetic flux gradients, and generate electrical current output to light an incandescent bulb.',
    type: 'PHYS_ELECTROMAGNET',
    difficulty: 'Intermediate',
    objectives: [
      'Demonstrate Faraday\'s Law of Electromagnetic Induction',
      'Analyze how solenoid coil loop densities dictate voltage output levels',
      'Verify Lenz\'s Law showing that induced currents oppose parent magnetic fields'
    ],
    instructions: 'Select the loop density (2, 3, or 4 loops). Slide the bar magnet through the solenoid. Monitor the induced voltage spikes on the galvanometer and observe the bulb lighting up.',
    hints: [
      'Voltage is induced only while the magnetic flux through the coil is actively changing (i.e. the magnet is in motion).',
      'Moving the magnet faster induces higher voltages.'
    ],
    variables: {
      solenoidLoops: [2, 3, 4],
      maxGalvanometerVoltage: 10
    },
    xpReward: 65,
    lpReward: 25,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-physics-thermo',
    title: 'Ideal Gas Law & Piston Thermodynamics Lab',
    slug: 'ideal-gas-law-piston',
    category: 'Physics Labs',
    description: 'Regulate gas properties inside a piston chamber. Modify volume, add thermal heat energy, and observe relationships between pressure, volume, and temperature.',
    type: 'PHYS_THERMO',
    difficulty: 'Intermediate',
    objectives: [
      'Verify Boyles, Charles, and Gay-Lussac Ideal Gas Laws',
      'Acknowledge how volume reductions multiply boundary gas collision rates',
      'Formulate thermodynamic work using isothermal pressure-volume plots'
    ],
    instructions: 'Slide the piston to adjust Chamber Volume, add thermal heat using the burner, monitor the Pressure gauge, and verify that PV = nRT holds true.',
    hints: [
      'Reducing volume at a constant temperature doubles the pressure (Boyle\'s Law).',
      'Heating gas at a constant volume increases pressure (Gay-Lussac\'s Law).'
    ],
    variables: {
      idealGasConstantR: 8.314,
      gasMolesN: 0.5
    },
    xpReward: 70,
    lpReward: 30,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-mechanical-machines',
    title: 'Mechanical Advantage & Lever Systems Lab',
    slug: 'mechanical-advantage-levers',
    category: 'Mechanical Engineering Labs',
    description: 'Lift heavy loads using Class 1, 2, and 3 levers. Move the fulcrum position and calculate mechanical advantage and input effort forces.',
    type: 'MECH_MACHINES',
    difficulty: 'Beginner',
    objectives: [
      'Classify lever systems based on load, effort, and fulcrum layout',
      'Formulate mechanical advantage ratios from load and effort arm lengths',
      'Acknowledge torque balances where clockwise torque equals counter-clockwise torque'
    ],
    instructions: 'Select a Lever Class. Adjust the position of the fulcrum relative to the load. Apply input effort forces to lift the 100 kg weight, and maximize mechanical advantage.',
    hints: [
      'Class 1 levers position the fulcrum between the load and the effort (e.g. crowbar).',
      'Mechanical Advantage (MA) equals the distance from fulcrum to effort divided by distance from fulcrum to load.'
    ],
    variables: {
      weightKg: 100,
      leverClasses: [1, 2, 3]
    },
    xpReward: 50,
    lpReward: 20,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-control-systems',
    title: 'PID Closed-Loop Feedback Controller Lab',
    slug: 'pid-controller-feedback',
    category: 'Control Systems Labs',
    description: 'Tune Proportional (P), Integral (I), and Derivative (D) gains of a closed-loop feedback controller to stabilize a drone at a target hover altitude.',
    type: 'CONTROL_SYSTEM',
    difficulty: 'Advanced',
    objectives: [
      'Identify how proportional gains minimize rise times but cause overshoot',
      'Incorporate integral gains to eradicate steady-state error offsets',
      'Incorporate derivative gains to damp oscillations and stabilize transient systems'
    ],
    instructions: 'Adjust the P, I, and D slider values. Trigger a step-response altitude change command to 10m, monitor the drone\'s flight trace graph, and minimize overshoot and settling time.',
    hints: [
      'Too much P gain leads to excessive oscillation; add D gain to provide damping.',
      'Add a small I gain to eliminate remaining steady-state hover offsets.'
    ],
    variables: {
      targetAltitudeM: 10,
      tuningRanges: { P: [0, 5], I: [0, 2], D: [0, 3] }
    },
    xpReward: 80,
    lpReward: 35,
    status: 'PUBLISHED'
  }
];
