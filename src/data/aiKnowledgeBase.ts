export interface KeyConcept {
  name: string;
  definition: string;
  explanation: string;
  synonyms?: string[];
}

export interface Formula {
  name: string;
  expression: string;
  description: string;
  derivation: string;
  examples: string[];
}

export interface CommonMistake {
  description: string;
  concept: string;
  symptom: string;
  correction: string;
}

export interface KBTopic {
  id: string;
  title: string;
  category: string;
  description: string;
  keyConcepts: KeyConcept[];
  formulas: Formula[];
  commonMistakes: CommonMistake[];
  practiceQuestions: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }[];
  troubleshooting?: {
    symptom: string;
    diagnosis: string;
    solution: string;
  }[];
}

export interface SynonymMap {
  [term: string]: string; // Maps input keyword to canonical concept/topic name
}

export interface QAMapping {
  questions: string[];
  answer: string;
  topicId: string;
  keywords: string[];
}

export interface AIKnowledgeBase {
  topics: KBTopic[];
  synonyms: SynonymMap;
  qas: QAMapping[];
}

export const AI_KNOWLEDGE_BASE: AIKnowledgeBase = {
  topics: [
    {
      id: "subnetting-vlsm",
      title: "Subnetting & Variable Length Subnet Masking (VLSM)",
      category: "Computer Networks",
      description: "IP address partitioning, VLSM subnetting strategies, CIDR prefix matching, block sizing, and gateway route matching.",
      keyConcepts: [
        {
          name: "Subnetting",
          definition: "Dividing a single physical IP network into multiple smaller, logically distinct subnets.",
          explanation: "Subnetting isolates broadcast traffic within specific physical domains, reducing network congestion and applying custom security Access Control Lists (ACLs) per subnet.",
          synonyms: ["subnet", "subnetworks", "ip partitioning"]
        },
        {
          name: "VLSM (Variable Length Subnet Masking)",
          definition: "The practice of allocating IP subnets of varying prefix sizes based on actual host requirements.",
          explanation: "Unlike fixed-length subnetting, VLSM optimizes address allocation by sorting requirements in descending order (largest first) and assigning custom masks (e.g., /25, /26, /27) to prevent IP waste.",
          synonyms: ["variable length subnetting", "vlsm calculation"]
        },
        {
          name: "Magic Number Method",
          definition: "An algorithm to quickly find subnet boundary steps by subtracting the interesting octet of a subnet mask from 256.",
          explanation: "For example, if the subnet mask is 255.255.255.192, the interesting octet is 192 in the 4th octet. The magic number is 256 - 192 = 64. The subnets will step by increments of 64: .0, .64, .128, .192.",
          synonyms: ["magic number", "block size", "subnet steps"]
        },
        {
          name: "CIDR Notation",
          definition: "Classless Inter-Domain Routing representation that uses a trailing slash (/N) to specify the number of network bits.",
          explanation: "In an IPv4 address, N bits represent the network prefix, and 32 - N represent host addresses. /24 means 24 network bits, leaving 8 bits for host addresses.",
          synonyms: ["cidr", "slash prefix", "prefix length"]
        }
      ],
      formulas: [
        {
          name: "Usable Hosts Formula",
          expression: "Usable Hosts = 2^(32 - Prefix) - 2",
          description: "Calculates the number of IP addresses that can be assigned to host devices inside a subnet.",
          derivation: "For h host bits, 2^h represents total IP combinations. Subtract 2 because the lowest address is reserved for the Network ID and the highest is reserved for the Broadcast ID.",
          examples: [
            "For /26 (6 host bits): 2^6 - 2 = 64 - 2 = 62 usable host addresses.",
            "For /27 (5 host bits): 2^5 - 2 = 32 - 2 = 30 usable host addresses."
          ]
        },
        {
          name: "Subnets Created Formula",
          expression: "Subnets = 2^s",
          description: "Calculates the number of subnets obtained when borrowing s bits from the host portion.",
          derivation: "Each borrowed bit doubles the number of possible subnets.",
          examples: [
            "Borrowing 3 bits from a Class C network creates 2^3 = 8 subnets."
          ]
        }
      ],
      commonMistakes: [
        {
          description: "Assigning reserved Network ID or Broadcast ID to a physical host device.",
          concept: "Reserved IP addresses",
          symptom: "Device returns invalid IP address configuration error when assigning .0 or .63 in a /26 subnet.",
          correction: "Verify the subnet boundary. In 192.168.1.0/26, 192.168.1.0 is the Network ID and 192.168.1.63 is the Broadcast ID. Assignable range is 192.168.1.1 to 192.168.1.62."
        },
        {
          description: "Arranging VLSM requirements in ascending order instead of descending order.",
          concept: "VLSM allocation order",
          symptom: "Overlapping subnet ranges and high address wastage.",
          correction: "Always sort host requirements in descending order (largest requirement first) before calculating the subnets to ensure boundary alignment without overlaps."
        }
      ],
      practiceQuestions: [
        {
          question: "How many usable host IP addresses are available in a /28 subnet?",
          options: ["16", "14", "30", "32"],
          answerIndex: 1,
          explanation: "Usable hosts = 2^(32 - 28) - 2 = 2^4 - 2 = 16 - 2 = 14 usable addresses."
        },
        {
          question: "For a network address of 192.168.10.0/26, what is the broadcast address of the first subnet?",
          options: ["192.168.10.255", "192.168.10.63", "192.168.10.64", "192.168.10.127"],
          answerIndex: 1,
          explanation: "A /26 subnet has 64 addresses. The first subnet ranges from 192.168.10.0 to 192.168.10.63. .0 is the network address, and .63 is the broadcast address."
        }
      ],
      troubleshooting: [
        {
          symptom: "PC cannot ping local Default Gateway.",
          diagnosis: "Default Gateway IP does not match the Router Interface IP address on that local subnet segment.",
          solution: "Check the configuration. If PC IP is 192.168.10.5/26, its subnet range is .0 to .63. The default gateway must reside in this range (e.g., 192.168.10.1) and exactly match the Router interface IP."
        },
        {
          symptom: "IP conflict or duplicate IP error in network simulation.",
          diagnosis: "Two devices are configured with the exact same IP address on the same network interface card or VLAN segment.",
          solution: "Check PC-A and Router interface configurations. Ensure they have unique, distinct IP addresses within the same subnet bounds."
        }
      ]
    },
    {
      id: "osi-model",
      title: "OSI 7-Layer Model & Protocol Suite",
      category: "Computer Networks",
      description: "ISO/OSI Reference model, encapsulation flow, layer responsibilities, protocols, and diagnostic networking layers.",
      keyConcepts: [
        {
          name: "OSI Model",
          definition: "A theoretical framework that standardizes network telecommunication systems into seven abstract layers.",
          explanation: "OSI stands for Open Systems Interconnection. It describes how data travels from a software application on one computer, through physical media, to an application on another computer.",
          synonyms: ["osi layers", "7 layers", "osi reference"]
        },
        {
          name: "Encapsulation",
          definition: "The process of wrapping data in protocol headers and trailers as it moves down the OSI layers.",
          explanation: "At the Application/Presentation/Session layers, data is just 'Data'. At the Transport layer, it becomes a 'Segment' (or Datagram). At the Network layer, it is wrapped with IP headers into a 'Packet'. At the Data Link layer, it adds MAC headers/trailers into a 'Frame'. Finally, at the Physical layer, it is transmitted as 'Bits'.",
          synonyms: ["data encapsulation", "pdu", "encapsulation process"]
        }
      ],
      formulas: [],
      commonMistakes: [
        {
          description: "Confusing TCP ports with IP routing or MAC framing.",
          concept: "Layer separation",
          symptom: "Learner states that a Router filters based on TCP port 80 during basic IP lookup routing.",
          correction: "TCP ports are layer 4 (Transport), IP addresses are layer 3 (Network), and MAC addresses are layer 2 (Data Link). Routers route packets primarily based on Layer 3 network addresses."
        }
      ],
      practiceQuestions: [
        {
          question: "Which OSI layer is responsible for routing packets across multiple logical networks?",
          options: ["Transport Layer (Layer 4)", "Data Link Layer (Layer 2)", "Network Layer (Layer 3)", "Physical Layer (Layer 1)"],
          answerIndex: 2,
          explanation: "The Network Layer (Layer 3) handles logical addressing (IP) and routing packets across different network segments."
        },
        {
          question: "What is the correct PDU (Protocol Data Unit) name for Layer 2?",
          options: ["Segment", "Packet", "Frame", "Bit"],
          answerIndex: 2,
          explanation: "Layer 2 (Data Link) wraps packets into Frames. Layer 3 is Packets, Layer 4 is Segments, and Layer 1 is Bits."
        }
      ],
      troubleshooting: [
        {
          symptom: "Physical link light is off on the switch interface.",
          diagnosis: "Physical Layer (Layer 1) connection failure, faulty cabling, or port disabled.",
          solution: "Check the physical Ethernet cable. Reseat both ends, swap with a known working cable, or verify that the interface is toggled 'on' (no shutdown) in terminal configs."
        }
      ]
    },
    {
      id: "data-structures",
      title: "Data Structures & Complexity (Big-O)",
      category: "Computer Science",
      description: "Linear and non-linear data structures, average/worst case Big-O complexities, memory storage models, and algorithmic operations.",
      keyConcepts: [
        {
          name: "Stack",
          definition: "A linear data structure following the Last-In, First-Out (LIFO) protocol.",
          explanation: "In a Stack, items can only be added (push) or removed (pop) from the top. Think of a stack of plates. It is used in function call stacks, recursion, backtracking algorithms, and undo operations.",
          synonyms: ["lifo", "stack structures", "push pop"]
        },
        {
          name: "Queue",
          definition: "A linear data structure following the First-In, First-Out (FIFO) protocol.",
          explanation: "In a Queue, items are added at the rear (enqueue) and removed from the front (dequeue). Think of a queue line in a grocery store. It is used in task scheduling, printer spoolers, and breadth-first search.",
          synonyms: ["fifo", "queue structures", "enqueue dequeue"]
        },
        {
          name: "Binary Search Tree (BST)",
          definition: "A hierarchical node-based tree data structure where left descendants are smaller than the node, and right descendants are larger.",
          explanation: "A BST allows rapid lookup, insertion, and deletion of keys. Balanced BSTs (like AVL or Red-Black Trees) guarantee logarithmic O(log N) operations, while unbalanced trees can degrade to linear O(N).",
          synonyms: ["bst", "binary tree", "search tree"]
        },
        {
          name: "Big-O Notation",
          definition: "A mathematical notation that describes the limiting behavior of a function when the argument tends towards infinity.",
          explanation: "In computer science, Big-O classifies algorithms by how their run time or space requirements grow as the input size N increases. Common growth rates include O(1) constant, O(log N) logarithmic, O(N) linear, and O(N log N) linearithmic.",
          synonyms: ["big o", "complexity", "time complexity"]
        }
      ],
      formulas: [
        {
          name: "Tree Height to Node Count Limit",
          expression: "Max Nodes = 2^(h + 1) - 1",
          description: "Calculates the maximum number of nodes in a complete binary tree of height h (0-indexed).",
          derivation: "Each level doubles the potential nodes, summing a geometric progression of powers of 2.",
          examples: [
            "For tree of height 3: Max Nodes = 2^4 - 1 = 15 nodes."
          ]
        }
      ],
      commonMistakes: [
        {
          description: "Assuming Hash Table lookup is always O(1).",
          concept: "Hash collisions",
          symptom: "Worst case analysis incorrectly stated as O(1) instead of O(N).",
          correction: "While average lookup in a Hash Table is O(1), the worst-case is O(N) if all elements collide into the same hash bucket, degrading to a linked list."
        },
        {
          description: "Confusing Stack and Queue operations.",
          concept: "LIFO vs FIFO",
          symptom: "Popping an item from a queue, or dequeuing from a stack, causing out-of-order element processing.",
          correction: "Remember: Stack is LIFO (last plate on pile is first plate off). Queue is FIFO (first person in line is first served)."
        }
      ],
      practiceQuestions: [
        {
          question: "What is the average time complexity of searching for an element in a balanced Binary Search Tree?",
          options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
          answerIndex: 1,
          explanation: "A balanced BST splits search domains in half each step, taking O(log N) time on average."
        },
        {
          question: "Which of the following data structures operates on a LIFO basis?",
          options: ["Queue", "Array", "Stack", "Linked List"],
          answerIndex: 2,
          explanation: "A Stack is a Last-In, First-Out (LIFO) data structure, whereas a Queue is First-In, First-Out (FIFO)."
        }
      ]
    },
    {
      id: "programming-basics",
      title: "Programming Basics & Debugging",
      category: "Computer Science",
      description: "Control flows, conditionals, nested loops, functional scope, recursion, and diagnostic debugging.",
      keyConcepts: [
        {
          name: "Recursion",
          definition: "A programming technique where a function calls itself, directly or indirectly, to solve a problem.",
          explanation: "A recursive function must always have a 'base case' (the termination condition to stop recursion) and a 'recursive step' (the self-call that moves towards the base case). Without a base case, recursion leads to a stack overflow.",
          synonyms: ["recursive call", "recursion base case"]
        },
        {
          name: "Scope",
          definition: "The region of a program where a variable is defined and can be accessed.",
          explanation: "Global variables are accessible throughout the entire script. Local variables (e.g., inside a function or loop block) are isolated and garbage-collected once execution exits that block.",
          synonyms: ["variable scope", "closure", "local block scope"]
        }
      ],
      formulas: [
        {
          name: "Recursive Complexity Recurrence (Master Theorem)",
          expression: "T(n) = a*T(n/b) + f(n)",
          description: "Formula used to analyze divide-and-conquer algorithms.",
          derivation: "Calculates the work done in dividing the problem into 'a' subproblems of size 'n/b', plus the merging overhead f(n).",
          examples: [
            "For Merge Sort: T(n) = 2T(n/2) + O(n), which resolves to O(n log n)."
          ]
        }
      ],
      commonMistakes: [
        {
          description: "Infinite loop or recursive stack overflow.",
          concept: "Loop/Recursion base cases",
          symptom: "Program hangs, page freezes, or prints 'Maximum call stack size exceeded'.",
          correction: "Check the termination condition. Ensure the loop index increment (i++) is inside the loop, or the recursive function reaches its base case."
        },
        {
          description: "Using single equals '=' for comparison instead of double/triple equals '==/==='.",
          concept: "Comparison vs Assignment",
          symptom: "Condition is always evaluated as true, overwriting variables inside an if block.",
          correction: "In JavaScript/Python, '=' assigns a value. Use '==' or '===' to compare values (e.g., if (x === 10) instead of if (x = 10))."
        }
      ],
      practiceQuestions: [
        {
          question: "What happens if a recursive function does not define or reach a base case?",
          options: ["It returns null", "It raises a syntax error", "It runs forever or causes a stack overflow", "It completes in O(1) time"],
          answerIndex: 2,
          explanation: "Without a base case, a recursive function calls itself indefinitely, eventually filling up the stack memory and crashing with a stack overflow."
        }
      ]
    }
  ],
  synonyms: {
    "vlsm": "subnetting-vlsm",
    "subnet": "subnetting-vlsm",
    "subnetting": "subnetting-vlsm",
    "cidr": "subnetting-vlsm",
    "magic number": "subnetting-vlsm",
    "ip address": "subnetting-vlsm",
    "mask": "subnetting-vlsm",
    "gateway": "subnetting-vlsm",
    "ping": "subnetting-vlsm",
    
    "osi": "osi-model",
    "7 layers": "osi-model",
    "encapsulation": "osi-model",
    "packet": "osi-model",
    "frame": "osi-model",
    "router": "osi-model",
    
    "stack": "data-structures",
    "queue": "data-structures",
    "big o": "data-structures",
    "complexity": "data-structures",
    "binary tree": "data-structures",
    "bst": "data-structures",
    "linked list": "data-structures",
    
    "recursion": "programming-basics",
    "scope": "programming-basics",
    "debugging": "programming-basics",
    "syntax error": "programming-basics",
    "infinite loop": "programming-basics"
  },
  qas: [
    {
      questions: ["who are you", "what is your name", "what is learnerpedia trainer"],
      answer: "I am the LearnerPedia AI Trainer—your dedicated local academic advisor. I can explain networking concepts (like subnetting, VLSM, or OSI), review data structures, help debug code, and analyze your diagnostic mistakes to provide learning recommendations! How can I help you study today?",
      topicId: "general",
      keywords: ["who", "what", "name", "trainer"]
    },
    {
      questions: ["how do i calculate subnets", "how to calculate host ranges", "tell me about subnetting"],
      answer: "To calculate subnets, follow the **Magic Number Method**:\n\n1. Look at the subnet mask (e.g., 255.255.255.192). Identify the 'interesting' octet (where bits are borrowed, here the 4th octet, value 192).\n2. Calculate the Magic Number: **256 - Mask Octet** (256 - 192 = 64). This is your subnet block size!\n3. Write down your subnets stepping by the Magic Number: .0, .64, .128, .192.\n4. Within each subnet block, the first IP is the **Network ID** (unassignable), the last IP is the **Broadcast ID** (unassignable), and everything in between are the **Usable IPs**.\n\nWould you like to solve a quick practice question on this?",
      topicId: "subnetting-vlsm",
      keywords: ["calculate", "subnets", "how", "method"]
    },
    {
      questions: ["what is the formula for usable hosts", "how many hosts in a subnet", "usable hosts formula"],
      answer: "The formula to calculate usable host IP addresses is:\n\n**Usable Hosts = 2^(32 - Prefix) - 2**\n\nWhere 'Prefix' is the CIDR slash value. \n\n*Why do we subtract 2?* \nIn every subnet, the first address is reserved for the **Network ID** (used to identify the network itself) and the last address is reserved for the **Broadcast ID** (used to send packets to all devices on that network). Neither address can be assigned to individual hosts.",
      topicId: "subnetting-vlsm",
      keywords: ["formula", "hosts", "usable", "subtract"]
    },
    {
      questions: ["why does my router ping fail", "ping fail diagnostic help", "how to fix PC gateway mismatch"],
      answer: "If your PC cannot ping its local router interface or gateway, double check the following:\n\n1. **IP Range Alignment**: Ensure the PC IP address and the Router Interface IP address are within the *exact same subnet block* (e.g., for /26, both must be in .0-.63, or .64-.127).\n2. **Gateway Configuration**: The Default Gateway IP configured on the PC must *exactly match* the IP address assigned to the router's local interface.\n3. **Interface Status**: Make sure the router's interface is physically active ('no shutdown' toggled).\n\nIf you are in a simulation, look at the troubleshooting console for specific mismatched parameters!",
      topicId: "subnetting-vlsm",
      keywords: ["ping", "fail", "gateway", "router", "diagnostic"]
    },
    {
      questions: ["what is the difference between stack and queue", "compare stack and queue", "explain stacks"],
      answer: "Here is a comparison between Stacks and Queues:\n\n* **Stack**: Follows **LIFO (Last-In, First-Out)**. Elements are added (push) and removed (pop) from the *same end* (the top). Examples: undo features, function call stacks, recursion management.\n* **Queue**: Follows **FIFO (First-In, First-Out)**. Elements are added (enqueue) at the *rear* and removed (dequeue) from the *front*. Examples: printer queues, task processors, router packet buffers.\n\nWould you like me to quiz you on this concept?",
      topicId: "data-structures",
      keywords: ["difference", "stack", "queue", "vs", "compare"]
    }
  ]
};
