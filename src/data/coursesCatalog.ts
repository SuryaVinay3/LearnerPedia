import { Course } from '../types';

export interface CourseCatalogEntry extends Course {
  subcategory?: string;
  lpReward: number;
  xpReward: number;
  instructor?: string;
  certificateEligible?: boolean;
}

export const COURSES_CATALOG: CourseCatalogEntry[] = [
  {
    "id": "course-001",
    "title": "Introduction to Computer Science",
    "slug": "introduction-to-computer-science",
    "category": "Computer Science",
    "domain": "Computer Science",
    "subcategory": "Foundations",
    "description": "Foundational principles of computation, binary representation, computer logic, algorithms, and computing hardware systems.",
    "difficulty": "Beginner",
    "duration": "6 Hours",
    "price": 0,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "Binary Logic",
      "Algorithms",
      "Hardware Systems",
      "Computation"
    ],
    "learningObjectives": [
      "Understand binary arithmetic and logic gates",
      "Grasp standard algorithmic problem solving",
      "Learn basic memory and CPU architectures"
    ],
    "prerequisites": [],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 8,
    "lpReward": 100,
    "xpReward": 150
  },
  {
    "id": "course-002",
    "title": "Programming Fundamentals",
    "slug": "programming-fundamentals",
    "category": "Computer Science",
    "domain": "Computer Science",
    "subcategory": "Programming",
    "description": "Core programming constructs including control flow, logic, functions, loops, variables, and procedural decomposition.",
    "difficulty": "Beginner",
    "duration": "8 Hours",
    "price": 29,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "Variables",
      "Conditionals",
      "Loops",
      "Functions",
      "Debugging"
    ],
    "learningObjectives": [
      "Master variables, conditionals, and loops",
      "Write reusable functions and modules",
      "Debug standard runtime syntax errors"
    ],
    "prerequisites": [
      "course-001"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 120,
    "xpReward": 180
  },
  {
    "id": "course-003",
    "title": "Data Structures",
    "slug": "data-structures",
    "category": "Computer Science",
    "domain": "Computer Science",
    "subcategory": "Data Structures",
    "description": "Comprehensive study of linear and non-linear data structures: Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, and Hash Tables.",
    "difficulty": "Intermediate",
    "duration": "12 Hours",
    "price": 49,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "Arrays",
      "Linked Lists",
      "Trees",
      "Graphs",
      "Hash Tables",
      "Big-O"
    ],
    "learningObjectives": [
      "Analyze Big-O time and space complexity",
      "Implement balanced binary search trees and graphs",
      "Optimize memory usage across collection types"
    ],
    "prerequisites": [
      "course-002"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 12,
    "lpReward": 180,
    "xpReward": 250
  },
  {
    "id": "course-004",
    "title": "Algorithms and Problem Solving",
    "slug": "algorithms-and-problem-solving",
    "category": "Computer Science",
    "domain": "Computer Science",
    "subcategory": "Algorithms",
    "description": "Algorithm design techniques including sorting, searching, greedy algorithms, dynamic programming, divide-and-conquer, and graph traversals.",
    "difficulty": "Intermediate",
    "duration": "14 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Dynamic Programming",
      "Dijkstra Algorithm",
      "Divide and Conquer",
      "Graph Traversal"
    ],
    "learningObjectives": [
      "Formulate dynamic programming recurrence relations",
      "Implement Dijkstra and A* pathfinding algorithms",
      "Prove computational bounds for NP-complete problems"
    ],
    "prerequisites": [
      "course-003"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 14,
    "lpReward": 200,
    "xpReward": 300
  },
  {
    "id": "course-005",
    "title": "Object-Oriented Programming",
    "slug": "object-oriented-programming",
    "category": "Computer Science",
    "domain": "Computer Science",
    "subcategory": "Software Design",
    "description": "Object-oriented paradigm featuring encapsulation, inheritance, polymorphism, abstraction, interfaces, and SOLID principles.",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Encapsulation",
      "Inheritance",
      "Polymorphism",
      "SOLID Principles",
      "Interfaces"
    ],
    "learningObjectives": [
      "Design modular software architectures",
      "Apply the 5 SOLID design principles",
      "Utilize polymorphism for extensible software design"
    ],
    "prerequisites": [
      "course-002"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 150,
    "xpReward": 220
  },
  {
    "id": "course-006",
    "title": "Operating Systems Fundamentals",
    "slug": "operating-systems-fundamentals",
    "category": "Computer Science",
    "domain": "Computer Science",
    "subcategory": "Systems",
    "description": "Process management, thread synchronization, memory allocation, virtual memory, paging, file systems, and kernel architecture.",
    "difficulty": "Intermediate",
    "duration": "12 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Process Scheduling",
      "Virtual Memory",
      "Semaphores",
      "Deadlocks",
      "File Systems"
    ],
    "learningObjectives": [
      "Analyze process scheduling algorithms",
      "Resolve deadlock conditions using Banker Algorithm",
      "Understand page replacement policies"
    ],
    "prerequisites": [
      "course-001"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 12,
    "lpReward": 190,
    "xpReward": 270
  },
  {
    "id": "course-007",
    "title": "Computer Organization and Architecture",
    "slug": "computer-organization-and-architecture",
    "category": "Computer Science",
    "domain": "Computer Science",
    "subcategory": "Hardware Architecture",
    "description": "CPU datapath, instruction set architecture (ISA), pipelining, cache memory hierarchy, bus interfaces, and I/O management.",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "MIPS Assembly",
      "Pipelining",
      "Cache Hierarchy",
      "ALU Design"
    ],
    "learningObjectives": [
      "Trace instruction execution cycles in CPU datapaths",
      "Calculate cache hit ratios and memory latency",
      "Identify pipeline hazards and branch prediction"
    ],
    "prerequisites": [
      "course-001"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 160,
    "xpReward": 240
  },
  {
    "id": "course-008",
    "title": "Theory of Computation",
    "slug": "theory-of-computation",
    "category": "Computer Science",
    "domain": "Computer Science",
    "subcategory": "Theoretical CS",
    "description": "Finite automata, regular expressions, context-free grammars, pushdown automata, Turing machines, and decidability.",
    "difficulty": "Advanced",
    "duration": "10 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "DFA / NFA",
      "Grammars",
      "Turing Machines",
      "Decidability",
      "Halting Problem"
    ],
    "learningObjectives": [
      "Construct deterministic and non-deterministic finite automata",
      "Convert context-free grammars into Chomsky Normal Form",
      "Prove undecidability using Halting Problem reduction"
    ],
    "prerequisites": [
      "course-004"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 210,
    "xpReward": 320
  },
  {
    "id": "course-009",
    "title": "Compiler Design",
    "slug": "compiler-design",
    "category": "Computer Science",
    "domain": "Computer Science",
    "subcategory": "Systems",
    "description": "Lexical analysis, syntax parsing, semantic analysis, intermediate representation (IR), code optimization, and assembly generation.",
    "difficulty": "Advanced",
    "duration": "14 Hours",
    "price": 149,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Lexing",
      "LL/LR Parsing",
      "Abstract Syntax Trees",
      "Intermediate Code",
      "Optimization"
    ],
    "learningObjectives": [
      "Build a lexer using regular expressions",
      "Implement LL(1) and LR(1) syntax parsers",
      "Generate optimized assembly instructions from ASTs"
    ],
    "prerequisites": [
      "course-008"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 14,
    "lpReward": 250,
    "xpReward": 380
  },
  {
    "id": "course-010",
    "title": "Distributed Systems",
    "slug": "distributed-systems",
    "category": "Computer Science",
    "domain": "Computer Science",
    "subcategory": "Systems",
    "description": "Consensus algorithms (Paxos, Raft), CAP theorem, distributed storage, RPC, vector clocks, and fault tolerance.",
    "difficulty": "Advanced",
    "duration": "16 Hours",
    "price": 149,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Raft Consensus",
      "CAP Theorem",
      "gRPC",
      "Distributed Databases",
      "Vector Clocks"
    ],
    "learningObjectives": [
      "Implement Raft leader election and log replication",
      "Architect fault-tolerant distributed storage systems",
      "Apply logical clocks to order concurrent events"
    ],
    "prerequisites": [
      "course-006"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 16,
    "lpReward": 280,
    "xpReward": 400
  },
  {
    "id": "course-011",
    "title": "Parallel Computing Fundamentals",
    "slug": "parallel-computing-fundamentals",
    "category": "Computer Science",
    "domain": "Computer Science",
    "subcategory": "Hardware Architecture",
    "description": "Multi-threading, OpenMP, MPI, GPU computing with CUDA, race conditions, and parallel speedup analysis (Amdahl Law).",
    "difficulty": "Advanced",
    "duration": "10 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "CUDA",
      "OpenMP",
      "MPI",
      "Amdahl Law",
      "Thread Safety"
    ],
    "learningObjectives": [
      "Write parallelized C/C++ programs with OpenMP",
      "Formulate GPU kernel execution models in CUDA",
      "Calculate theoretical speedup bounds using Amdahl Law"
    ],
    "prerequisites": [
      "course-006"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 220,
    "xpReward": 330
  },
  {
    "id": "course-012",
    "title": "Computer Science Problem Solving",
    "slug": "computer-science-problem-solving",
    "category": "Computer Science",
    "domain": "Computer Science",
    "subcategory": "Foundations",
    "description": "Methodologies for logical reasoning, decomposition, pseudocode design, mathematical logic, and systematic software troubleshooting.",
    "difficulty": "Beginner",
    "duration": "8 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Problem Decomposition",
      "Pseudocode",
      "Logic Proofs",
      "Debugging"
    ],
    "learningObjectives": [
      "Deconstruct complex engineering requirements into modules",
      "Construct test cases covering boundary conditions",
      "Formulate formal boolean logic proofs"
    ],
    "prerequisites": [],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 8,
    "lpReward": 110,
    "xpReward": 160
  },
  {
    "id": "course-013",
    "title": "C Programming Fundamentals",
    "slug": "c-programming-fundamentals",
    "category": "Programming",
    "domain": "Programming",
    "difficulty": "Beginner",
    "duration": "8 Hours",
    "price": 29,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "C Language",
      "Pointers",
      "Memory",
      "CLI"
    ],
    "learningObjectives": [
      "Master variables, pointers, and arrays in C",
      "Write clean command-line programs"
    ],
    "prerequisites": [],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 130,
    "xpReward": 190,
    "description": "Comprehensive curriculum module covering C Programming Fundamentals principles, real-world practical applications, and industry skills in Programming."
  },
  {
    "id": "course-014",
    "title": "Advanced C Programming",
    "slug": "advanced-c-programming",
    "category": "Programming",
    "domain": "Programming",
    "difficulty": "Advanced",
    "duration": "12 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Pointers",
      "POSIX Calls",
      "Memory Allocation",
      "Sockets"
    ],
    "learningObjectives": [
      "Implement custom dynamic memory allocators",
      "Build socket-based C network daemons"
    ],
    "prerequisites": [
      "course-013"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 12,
    "lpReward": 220,
    "xpReward": 310,
    "description": "Comprehensive curriculum module covering Advanced C Programming principles, real-world practical applications, and industry skills in Programming."
  },
  {
    "id": "course-015",
    "title": "C++ Programming Fundamentals",
    "slug": "cpp-programming-fundamentals",
    "category": "Programming",
    "domain": "Programming",
    "difficulty": "Beginner",
    "duration": "10 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "C++",
      "OOP",
      "STL",
      "Pointers"
    ],
    "learningObjectives": [
      "Grasp C++ syntax, classes, and references",
      "Use Standard Template Library collections"
    ],
    "prerequisites": [
      "course-013"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 140,
    "xpReward": 210,
    "description": "Comprehensive curriculum module covering C++ Programming Fundamentals principles, real-world practical applications, and industry skills in Programming."
  },
  {
    "id": "course-016",
    "title": "Advanced C++ Programming",
    "slug": "advanced-cpp-programming",
    "category": "Programming",
    "domain": "Programming",
    "difficulty": "Advanced",
    "duration": "14 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Smart Pointers",
      "RAII",
      "Templates",
      "C++20 Concurrency"
    ],
    "learningObjectives": [
      "Apply move semantics and smart pointers",
      "Implement template metaprogramming"
    ],
    "prerequisites": [
      "course-015"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 14,
    "lpReward": 240,
    "xpReward": 360,
    "description": "Comprehensive curriculum module covering Advanced C++ Programming principles, real-world practical applications, and industry skills in Programming."
  },
  {
    "id": "course-017",
    "title": "Java Programming Fundamentals",
    "slug": "java-programming-fundamentals",
    "category": "Programming",
    "domain": "Programming",
    "difficulty": "Beginner",
    "duration": "10 Hours",
    "price": 49,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "Java",
      "OOP",
      "JVM",
      "Collections"
    ],
    "learningObjectives": [
      "Understand Java syntax, objects, and packages",
      "Master the Java Collections Framework"
    ],
    "prerequisites": [],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 140,
    "xpReward": 200,
    "description": "Comprehensive curriculum module covering Java Programming Fundamentals principles, real-world practical applications, and industry skills in Programming."
  },
  {
    "id": "course-018",
    "title": "Advanced Java Programming",
    "slug": "advanced-java-programming",
    "category": "Programming",
    "domain": "Programming",
    "difficulty": "Advanced",
    "duration": "12 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Java Threads",
      "Generics",
      "Streams API",
      "JVM Tuning"
    ],
    "learningObjectives": [
      "Write concurrent Java programs with Executors",
      "Optimize JVM garbage collection policies"
    ],
    "prerequisites": [
      "course-017"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 12,
    "lpReward": 230,
    "xpReward": 340,
    "description": "Comprehensive curriculum module covering Advanced Java Programming principles, real-world practical applications, and industry skills in Programming."
  },
  {
    "id": "course-019",
    "title": "Python Programming Fundamentals",
    "slug": "python-programming-fundamentals",
    "category": "Programming",
    "domain": "Programming",
    "difficulty": "Beginner",
    "duration": "8 Hours",
    "price": 29,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "Python",
      "Functions",
      "Data Types",
      "File I/O"
    ],
    "learningObjectives": [
      "Write idiomatic Python scripts",
      "Handle file systems and string manipulation"
    ],
    "prerequisites": [],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 120,
    "xpReward": 180,
    "description": "Comprehensive curriculum module covering Python Programming Fundamentals principles, real-world practical applications, and industry skills in Programming."
  },
  {
    "id": "course-020",
    "title": "Advanced Python Programming",
    "slug": "advanced-python-programming",
    "category": "Programming",
    "domain": "Programming",
    "difficulty": "Intermediate",
    "duration": "12 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Decorators",
      "Generators",
      "Asyncio",
      "Metaclasses"
    ],
    "learningObjectives": [
      "Master Python decorators and generators",
      "Write asynchronous code with asyncio"
    ],
    "prerequisites": [
      "course-019"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 12,
    "lpReward": 200,
    "xpReward": 300,
    "description": "Comprehensive curriculum module covering Advanced Python Programming principles, real-world practical applications, and industry skills in Programming."
  },
  {
    "id": "course-021",
    "title": "JavaScript Fundamentals",
    "slug": "javascript-fundamentals",
    "category": "Programming",
    "domain": "Programming",
    "difficulty": "Beginner",
    "duration": "8 Hours",
    "price": 29,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "JavaScript",
      "ES6+",
      "Promises",
      "DOM"
    ],
    "learningObjectives": [
      "Master ES6 syntax, functions, and arrays",
      "Handle asynchronous promises and async/await"
    ],
    "prerequisites": [],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 120,
    "xpReward": 180,
    "description": "Comprehensive curriculum module covering JavaScript Fundamentals principles, real-world practical applications, and industry skills in Programming."
  },
  {
    "id": "course-022",
    "title": "Advanced JavaScript",
    "slug": "advanced-javascript",
    "category": "Programming",
    "domain": "Programming",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Closures",
      "Prototypes",
      "Event Loop",
      "V8 Engine"
    ],
    "learningObjectives": [
      "Master closures, scope chains, and prototypal inheritance",
      "Understand the JS event loop and microtask queue"
    ],
    "prerequisites": [
      "course-021"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 180,
    "xpReward": 270,
    "description": "Comprehensive curriculum module covering Advanced JavaScript principles, real-world practical applications, and industry skills in Programming."
  },
  {
    "id": "course-023",
    "title": "TypeScript Programming",
    "slug": "typescript-programming",
    "category": "Programming",
    "domain": "Programming",
    "difficulty": "Intermediate",
    "duration": "8 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "TypeScript",
      "Types",
      "Interfaces",
      "Generics"
    ],
    "learningObjectives": [
      "Utilize static typing for scale web applications",
      "Write generic reusable utility types"
    ],
    "prerequisites": [
      "course-021"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 8,
    "lpReward": 160,
    "xpReward": 240,
    "description": "Comprehensive curriculum module covering TypeScript Programming principles, real-world practical applications, and industry skills in Programming."
  },
  {
    "id": "course-024",
    "title": "Go Programming",
    "slug": "go-programming",
    "category": "Programming",
    "domain": "Programming",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Golang",
      "Goroutines",
      "Channels",
      "Microservices"
    ],
    "learningObjectives": [
      "Write concurrent Go programs using channels",
      "Build high-performance REST microservices"
    ],
    "prerequisites": [
      "course-002"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 190,
    "xpReward": 280,
    "description": "Comprehensive curriculum module covering Go Programming principles, real-world practical applications, and industry skills in Programming."
  },
  {
    "id": "course-025",
    "title": "Rust Programming",
    "slug": "rust-programming",
    "category": "Programming",
    "domain": "Programming",
    "difficulty": "Advanced",
    "duration": "12 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Rust",
      "Ownership",
      "Borrow Checker",
      "Lifetimes"
    ],
    "learningObjectives": [
      "Master memory safety without garbage collection",
      "Understand borrowing rules and lifetimes"
    ],
    "prerequisites": [
      "course-013"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 12,
    "lpReward": 250,
    "xpReward": 370,
    "description": "Comprehensive curriculum module covering Rust Programming principles, real-world practical applications, and industry skills in Programming."
  },
  {
    "id": "course-026",
    "title": "Kotlin Programming",
    "slug": "kotlin-programming",
    "category": "Programming",
    "domain": "Programming",
    "difficulty": "Intermediate",
    "duration": "8 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Kotlin",
      "Coroutines",
      "Null Safety",
      "Android Tech"
    ],
    "learningObjectives": [
      "Utilize null-safe operators and smart casts",
      "Write asynchronous code with Kotlin Coroutines"
    ],
    "prerequisites": [
      "course-017"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 8,
    "lpReward": 150,
    "xpReward": 220,
    "description": "Comprehensive curriculum module covering Kotlin Programming principles, real-world practical applications, and industry skills in Programming."
  },
  {
    "id": "course-027",
    "title": "PHP Programming",
    "slug": "php-programming",
    "category": "Programming",
    "domain": "Programming",
    "difficulty": "Beginner",
    "duration": "8 Hours",
    "price": 29,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "PHP 8",
      "Server Side",
      "Forms",
      "MySQL Connect"
    ],
    "learningObjectives": [
      "Build dynamic web scripts with PHP 8",
      "Process form submissions securely"
    ],
    "prerequisites": [],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 8,
    "lpReward": 110,
    "xpReward": 160,
    "description": "Comprehensive curriculum module covering PHP Programming principles, real-world practical applications, and industry skills in Programming."
  },
  {
    "id": "course-028",
    "title": "Ruby Programming",
    "slug": "ruby-programming",
    "category": "Programming",
    "domain": "Programming",
    "difficulty": "Beginner",
    "duration": "8 Hours",
    "price": 29,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Ruby",
      "Blocks",
      "Gems",
      "OOP"
    ],
    "learningObjectives": [
      "Grasp object-oriented principles in Ruby",
      "Utilize blocks, procs, and lambdas"
    ],
    "prerequisites": [],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 8,
    "lpReward": 110,
    "xpReward": 160,
    "description": "Comprehensive curriculum module covering Ruby Programming principles, real-world practical applications, and industry skills in Programming."
  },
  {
    "id": "course-029",
    "title": "Object-Oriented Design with Java",
    "slug": "object-oriented-design-with-java",
    "category": "Programming",
    "domain": "Programming",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Design Patterns",
      "UML",
      "Java",
      "Refactoring"
    ],
    "learningObjectives": [
      "Apply GoF design patterns in Java",
      "Draw and model UML class diagrams"
    ],
    "prerequisites": [
      "course-017"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 180,
    "xpReward": 260,
    "description": "Comprehensive curriculum module covering Object-Oriented Design with Java principles, real-world practical applications, and industry skills in Programming."
  },
  {
    "id": "course-030",
    "title": "Competitive Programming Fundamentals",
    "slug": "competitive-programming-fundamentals",
    "category": "Programming",
    "domain": "Programming",
    "difficulty": "Advanced",
    "duration": "14 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Algorithms",
      "Bit Manipulation",
      "Segment Trees",
      "Speed Coding"
    ],
    "learningObjectives": [
      "Solve speed-constrained contest challenges",
      "Implement advanced segment trees and fenwick trees"
    ],
    "prerequisites": [
      "course-003",
      "course-004"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 14,
    "lpReward": 260,
    "xpReward": 390,
    "description": "Comprehensive curriculum module covering Competitive Programming Fundamentals principles, real-world practical applications, and industry skills in Programming."
  },
  {
    "id": "course-031",
    "title": "HTML Fundamentals",
    "slug": "html-fundamentals",
    "category": "Web Development",
    "domain": "Web Development",
    "difficulty": "Beginner",
    "duration": "4 Hours",
    "price": 0,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "HTML5",
      "Markup",
      "Forms",
      "Accessibility"
    ],
    "learningObjectives": [
      "Structure web pages with clean semantic tags",
      "Create interactive forms and input fields"
    ],
    "prerequisites": [],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 6,
    "lpReward": 80,
    "xpReward": 120,
    "description": "Comprehensive curriculum module covering HTML Fundamentals principles, real-world practical applications, and industry skills in Web Development."
  },
  {
    "id": "course-032",
    "title": "Advanced HTML and Semantic Web",
    "slug": "advanced-html-and-semantic-web",
    "category": "Web Development",
    "domain": "Web Development",
    "difficulty": "Intermediate",
    "duration": "6 Hours",
    "price": 29,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "ARIA",
      "Semantic HTML",
      "SEO",
      "Web Components"
    ],
    "learningObjectives": [
      "Enforce WCAG accessibility standard ARIA tags",
      "Optimize web pages for SEO crawlers"
    ],
    "prerequisites": [
      "course-031"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 6,
    "lpReward": 100,
    "xpReward": 150,
    "description": "Comprehensive curriculum module covering Advanced HTML and Semantic Web principles, real-world practical applications, and industry skills in Web Development."
  },
  {
    "id": "course-033",
    "title": "CSS Fundamentals",
    "slug": "css-fundamentals",
    "category": "Web Development",
    "domain": "Web Development",
    "difficulty": "Beginner",
    "duration": "6 Hours",
    "price": 0,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "CSS3",
      "Flexbox",
      "Grid",
      "Selectors"
    ],
    "learningObjectives": [
      "Style HTML elements with CSS selectors",
      "Build flexible layouts using Flexbox and CSS Grid"
    ],
    "prerequisites": [
      "course-031"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 8,
    "lpReward": 90,
    "xpReward": 140,
    "description": "Comprehensive curriculum module covering CSS Fundamentals principles, real-world practical applications, and industry skills in Web Development."
  },
  {
    "id": "course-034",
    "title": "Responsive Web Design",
    "slug": "responsive-web-design",
    "category": "Web Development",
    "domain": "Web Development",
    "difficulty": "Intermediate",
    "duration": "8 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Media Queries",
      "Mobile-First",
      "Tailwind",
      "Viewport"
    ],
    "learningObjectives": [
      "Construct responsive mobile-first layouts",
      "Apply media query breakpoints and fluid design"
    ],
    "prerequisites": [
      "course-033"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 8,
    "lpReward": 130,
    "xpReward": 190,
    "description": "Comprehensive curriculum module covering Responsive Web Design principles, real-world practical applications, and industry skills in Web Development."
  },
  {
    "id": "course-035",
    "title": "JavaScript for Web Development",
    "slug": "javascript-for-web-development",
    "category": "Web Development",
    "domain": "Web Development",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "DOM Manipulation",
      "Event Listeners",
      "Fetch API",
      "XHR"
    ],
    "learningObjectives": [
      "Manipulate DOM nodes dynamically",
      "Perform HTTP fetch network calls to backend APIs"
    ],
    "prerequisites": [
      "course-021",
      "course-031"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 150,
    "xpReward": 220,
    "description": "Comprehensive curriculum module covering JavaScript for Web Development principles, real-world practical applications, and industry skills in Web Development."
  },
  {
    "id": "course-036",
    "title": "React Fundamentals",
    "slug": "react-fundamentals",
    "category": "Web Development",
    "domain": "Web Development",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 49,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "React 18",
      "Components",
      "Hooks",
      "State",
      "Props"
    ],
    "learningObjectives": [
      "Build component hierarchies with JSX",
      "Manage state and side-effects with useState and useEffect"
    ],
    "prerequisites": [
      "course-035"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 160,
    "xpReward": 240,
    "description": "Comprehensive curriculum module covering React Fundamentals principles, real-world practical applications, and industry skills in Web Development."
  },
  {
    "id": "course-037",
    "title": "Advanced React Development",
    "slug": "advanced-react-development",
    "category": "Web Development",
    "domain": "Web Development",
    "difficulty": "Advanced",
    "duration": "12 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Context API",
      "Redux Toolkit",
      "Custom Hooks",
      "Performance"
    ],
    "learningObjectives": [
      "Implement global state management with Context & Redux",
      "Optimize renders using useMemo and useCallback"
    ],
    "prerequisites": [
      "course-036"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 12,
    "lpReward": 220,
    "xpReward": 330,
    "description": "Comprehensive curriculum module covering Advanced React Development principles, real-world practical applications, and industry skills in Web Development."
  },
  {
    "id": "course-038",
    "title": "Node.js Fundamentals",
    "slug": "nodejs-fundamentals",
    "category": "Web Development",
    "domain": "Web Development",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Node.js",
      "V8",
      "Event Loop",
      "File System",
      "Streams"
    ],
    "learningObjectives": [
      "Run JavaScript on server environments",
      "Read and write asynchronous streams and files"
    ],
    "prerequisites": [
      "course-021"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 160,
    "xpReward": 240,
    "description": "Comprehensive curriculum module covering Node.js Fundamentals principles, real-world practical applications, and industry skills in Web Development."
  },
  {
    "id": "course-039",
    "title": "Express.js and Backend Development",
    "slug": "expressjs-and-backend-development",
    "category": "Web Development",
    "domain": "Web Development",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Express.js",
      "Middleware",
      "Routing",
      "REST",
      "CORS"
    ],
    "learningObjectives": [
      "Build modular Express backend servers",
      "Construct middleware pipelines for authentication"
    ],
    "prerequisites": [
      "course-038"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 180,
    "xpReward": 260,
    "description": "Comprehensive curriculum module covering Express.js and Backend Development principles, real-world practical applications, and industry skills in Web Development."
  },
  {
    "id": "course-040",
    "title": "REST API Development",
    "slug": "rest-api-development",
    "category": "Web Development",
    "domain": "Web Development",
    "difficulty": "Intermediate",
    "duration": "8 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "REST",
      "HTTP Verbs",
      "Swagger/OpenAPI",
      "JSON"
    ],
    "learningObjectives": [
      "Design standardized RESTful endpoints",
      "Document API schemas using OpenAPI"
    ],
    "prerequisites": [
      "course-039"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 8,
    "lpReward": 140,
    "xpReward": 210,
    "description": "Comprehensive curriculum module covering REST API Development principles, real-world practical applications, and industry skills in Web Development."
  },
  {
    "id": "course-041",
    "title": "Full Stack Web Development",
    "slug": "full-stack-web-development",
    "category": "Web Development",
    "domain": "Web Development",
    "difficulty": "Advanced",
    "duration": "18 Hours",
    "price": 149,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "MERN Stack",
      "Authentication",
      "Deployment",
      "WebSockets"
    ],
    "learningObjectives": [
      "Architect full-stack web applications",
      "Deploy full-stack apps to cloud container platforms"
    ],
    "prerequisites": [
      "course-036",
      "course-039"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 18,
    "lpReward": 300,
    "xpReward": 450,
    "description": "Comprehensive curriculum module covering Full Stack Web Development principles, real-world practical applications, and industry skills in Web Development."
  },
  {
    "id": "course-042",
    "title": "Modern Web Architecture",
    "slug": "modern-web-architecture",
    "category": "Web Development",
    "domain": "Web Development",
    "difficulty": "Advanced",
    "duration": "14 Hours",
    "price": 149,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "SSR",
      "Jamstack",
      "Micro-Frontends",
      "Edge Computing"
    ],
    "learningObjectives": [
      "Formulate Server-Side Rendering (SSR) strategies",
      "Integrate CDN edge compute layers"
    ],
    "prerequisites": [
      "course-041"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 14,
    "lpReward": 260,
    "xpReward": 390,
    "description": "Comprehensive curriculum module covering Modern Web Architecture principles, real-world practical applications, and industry skills in Web Development."
  },
  {
    "id": "course-043",
    "title": "Database Management Systems",
    "slug": "database-management-systems",
    "category": "Databases",
    "domain": "Databases",
    "difficulty": "Beginner",
    "duration": "10 Hours",
    "price": 49,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "DBMS",
      "Relational Model",
      "ACID",
      "Transactions"
    ],
    "learningObjectives": [
      "Grasp relational database theory and schemas",
      "Understand ACID transaction compliance"
    ],
    "prerequisites": [],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 140,
    "xpReward": 210,
    "description": "Comprehensive curriculum module covering Database Management Systems principles, real-world practical applications, and industry skills in Databases."
  },
  {
    "id": "course-044",
    "title": "SQL Fundamentals",
    "slug": "sql-fundamentals",
    "category": "Databases",
    "domain": "Databases",
    "difficulty": "Beginner",
    "duration": "6 Hours",
    "price": 0,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "SQL",
      "SELECT",
      "JOINs",
      "GROUP BY",
      "DDL/DML"
    ],
    "learningObjectives": [
      "Write SELECT, INSERT, UPDATE, and DELETE queries",
      "Perform INNER, LEFT, and RIGHT table JOINs"
    ],
    "prerequisites": [],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 8,
    "lpReward": 110,
    "xpReward": 170,
    "description": "Comprehensive curriculum module covering SQL Fundamentals principles, real-world practical applications, and industry skills in Databases."
  },
  {
    "id": "course-045",
    "title": "Advanced SQL",
    "slug": "advanced-sql",
    "category": "Databases",
    "domain": "Databases",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Window Functions",
      "CTEs",
      "Subqueries",
      "Indexing"
    ],
    "learningObjectives": [
      "Construct complex window analytical functions",
      "Optimize slow SQL query execution plans"
    ],
    "prerequisites": [
      "course-044"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 190,
    "xpReward": 280,
    "description": "Comprehensive curriculum module covering Advanced SQL principles, real-world practical applications, and industry skills in Databases."
  },
  {
    "id": "course-046",
    "title": "MySQL Database Development",
    "slug": "mysql-database-development",
    "category": "Databases",
    "domain": "Databases",
    "difficulty": "Intermediate",
    "duration": "8 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "MySQL",
      "InnoDB",
      "Indexes",
      "Stored Procedures"
    ],
    "learningObjectives": [
      "Build relational database schemas in MySQL",
      "Write stored procedures and triggers"
    ],
    "prerequisites": [
      "course-044"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 8,
    "lpReward": 150,
    "xpReward": 220,
    "description": "Comprehensive curriculum module covering MySQL Database Development principles, real-world practical applications, and industry skills in Databases."
  },
  {
    "id": "course-047",
    "title": "PostgreSQL Database Development",
    "slug": "postgresql-database-development",
    "category": "Databases",
    "domain": "Databases",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "PostgreSQL",
      "JSONB",
      "PL/pgSQL",
      "GIS"
    ],
    "learningObjectives": [
      "Utilize PostgreSQL JSONB binary document storage",
      "Write PL/pgSQL custom database functions"
    ],
    "prerequisites": [
      "course-044"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 180,
    "xpReward": 260,
    "description": "Comprehensive curriculum module covering PostgreSQL Database Development principles, real-world practical applications, and industry skills in Databases."
  },
  {
    "id": "course-048",
    "title": "Oracle Database Fundamentals",
    "slug": "oracle-database-fundamentals",
    "category": "Databases",
    "domain": "Databases",
    "difficulty": "Advanced",
    "duration": "12 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Oracle SQL",
      "PL/SQL",
      "Tablespaces",
      "RMAN"
    ],
    "learningObjectives": [
      "Write enterprise PL/SQL packages",
      "Manage tablespaces and memory structures"
    ],
    "prerequisites": [
      "course-044"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 12,
    "lpReward": 220,
    "xpReward": 330,
    "description": "Comprehensive curriculum module covering Oracle Database Fundamentals principles, real-world practical applications, and industry skills in Databases."
  },
  {
    "id": "course-049",
    "title": "Database Design",
    "slug": "database-design",
    "category": "Databases",
    "domain": "Databases",
    "difficulty": "Intermediate",
    "duration": "8 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "ER Diagrams",
      "Primary Keys",
      "Foreign Keys",
      "Modeling"
    ],
    "learningObjectives": [
      "Construct ER entity relationship diagrams",
      "Define primary and foreign key constraints"
    ],
    "prerequisites": [
      "course-043"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 8,
    "lpReward": 140,
    "xpReward": 210,
    "description": "Comprehensive curriculum module covering Database Design principles, real-world practical applications, and industry skills in Databases."
  },
  {
    "id": "course-050",
    "title": "Database Normalization",
    "slug": "database-normalization",
    "category": "Databases",
    "domain": "Databases",
    "difficulty": "Intermediate",
    "duration": "6 Hours",
    "price": 29,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "1NF",
      "2NF",
      "3NF",
      "BCNF",
      "Redundancy"
    ],
    "learningObjectives": [
      "Normalize unorganized tables into 1NF, 2NF, 3NF",
      "Eliminate insertion and deletion anomalies"
    ],
    "prerequisites": [
      "course-049"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 6,
    "lpReward": 120,
    "xpReward": 180,
    "description": "Comprehensive curriculum module covering Database Normalization principles, real-world practical applications, and industry skills in Databases."
  },
  {
    "id": "course-051",
    "title": "NoSQL Databases",
    "slug": "nosql-databases",
    "category": "Databases",
    "domain": "Databases",
    "difficulty": "Intermediate",
    "duration": "8 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "NoSQL",
      "Document Stores",
      "Key-Value",
      "Columnar"
    ],
    "learningObjectives": [
      "Evaluate Document, Key-Value, and Columnar stores",
      "Formulate denormalized data schemas"
    ],
    "prerequisites": [
      "course-043"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 8,
    "lpReward": 150,
    "xpReward": 220,
    "description": "Comprehensive curriculum module covering NoSQL Databases principles, real-world practical applications, and industry skills in Databases."
  },
  {
    "id": "course-052",
    "title": "MongoDB Fundamentals",
    "slug": "mongodb-fundamentals",
    "category": "Databases",
    "domain": "Databases",
    "difficulty": "Intermediate",
    "duration": "8 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "MongoDB",
      "BSON",
      "Aggregation",
      "Sharding"
    ],
    "learningObjectives": [
      "Perform MongoDB CRUD document operations",
      "Construct multi-stage aggregation pipelines"
    ],
    "prerequisites": [
      "course-051"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 8,
    "lpReward": 150,
    "xpReward": 220,
    "description": "Comprehensive curriculum module covering MongoDB Fundamentals principles, real-world practical applications, and industry skills in Databases."
  },
  {
    "id": "course-053",
    "title": "Database Administration",
    "slug": "database-administration",
    "category": "Databases",
    "domain": "Databases",
    "difficulty": "Advanced",
    "duration": "12 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "DBA",
      "Backups",
      "Replication",
      "Clustering"
    ],
    "learningObjectives": [
      "Configure database backup and point-in-time recovery",
      "Set up master-slave replication topologies"
    ],
    "prerequisites": [
      "course-046"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 12,
    "lpReward": 230,
    "xpReward": 340,
    "description": "Comprehensive curriculum module covering Database Administration principles, real-world practical applications, and industry skills in Databases."
  },
  {
    "id": "course-054",
    "title": "Database Security",
    "slug": "database-security",
    "category": "Databases",
    "domain": "Databases",
    "difficulty": "Advanced",
    "duration": "10 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "SQL Injection",
      "RBAC",
      "Encryption",
      "Auditing"
    ],
    "learningObjectives": [
      "Prevent SQL injection vulnerabilities",
      "Enforce role-based access control and data masking"
    ],
    "prerequisites": [
      "course-044"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 210,
    "xpReward": 310,
    "description": "Comprehensive curriculum module covering Database Security principles, real-world practical applications, and industry skills in Databases."
  },
  {
    "id": "course-055",
    "title": "Computer Networks Fundamentals",
    "slug": "computer-networks-fundamentals",
    "category": "Computer Networks",
    "domain": "Computer Networks",
    "difficulty": "Beginner",
    "duration": "8 Hours",
    "price": 0,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "Networking",
      "Topologies",
      "Packets",
      "LAN/WAN"
    ],
    "learningObjectives": [
      "Understand network topologies and media types",
      "Grasp packet switching vs circuit switching"
    ],
    "prerequisites": [],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 120,
    "xpReward": 180,
    "description": "Comprehensive curriculum module covering Computer Networks Fundamentals principles, real-world practical applications, and industry skills in Computer Networks."
  },
  {
    "id": "course-056",
    "title": "OSI Reference Model",
    "slug": "osi-reference-model",
    "category": "Computer Networks",
    "domain": "Computer Networks",
    "difficulty": "Beginner",
    "duration": "6 Hours",
    "price": 29,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "OSI 7 Layers",
      "Encapsulation",
      "Protocols",
      "PDU"
    ],
    "learningObjectives": [
      "Deconstruct the 7 layers of the OSI model",
      "Trace data encapsulation and decapsulation"
    ],
    "prerequisites": [
      "course-055"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 8,
    "lpReward": 110,
    "xpReward": 160,
    "description": "Comprehensive curriculum module covering OSI Reference Model principles, real-world practical applications, and industry skills in Computer Networks."
  },
  {
    "id": "course-057",
    "title": "TCP/IP Networking",
    "slug": "tcpip-networking",
    "category": "Computer Networks",
    "domain": "Computer Networks",
    "difficulty": "Intermediate",
    "duration": "8 Hours",
    "price": 49,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "TCP/IP Suite",
      "IP Headers",
      "Sockets",
      "Port Numbers"
    ],
    "learningObjectives": [
      "Compare TCP/IP layers to the OSI model",
      "Analyze TCP and IP packet header structures"
    ],
    "prerequisites": [
      "course-056"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 8,
    "lpReward": 140,
    "xpReward": 210,
    "description": "Comprehensive curriculum module covering TCP/IP Networking principles, real-world practical applications, and industry skills in Computer Networks."
  },
  {
    "id": "course-058",
    "title": "IPv4 Addressing",
    "slug": "ipv4-addressing",
    "category": "Computer Networks",
    "domain": "Computer Networks",
    "difficulty": "Intermediate",
    "duration": "8 Hours",
    "price": 49,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "IPv4",
      "Octets",
      "Subnet Mask",
      "Private/Public IP"
    ],
    "learningObjectives": [
      "Understand 32-bit dotted-decimal IPv4 formatting",
      "Identify Class A, B, C, and RFC 1918 private ranges"
    ],
    "prerequisites": [
      "course-057"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 8,
    "lpReward": 140,
    "xpReward": 210,
    "description": "Comprehensive curriculum module covering IPv4 Addressing principles, real-world practical applications, and industry skills in Computer Networks."
  },
  {
    "id": "course-059",
    "title": "IPv6 Networking",
    "slug": "ipv6-networking",
    "category": "Computer Networks",
    "domain": "Computer Networks",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "IPv6",
      "Hexadecimal",
      "SLAAC",
      "Neighbor Discovery"
    ],
    "learningObjectives": [
      "Format 128-bit hexadecimal IPv6 addresses",
      "Configure SLAAC dynamic address assignment"
    ],
    "prerequisites": [
      "course-058"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 180,
    "xpReward": 270,
    "description": "Comprehensive curriculum module covering IPv6 Networking principles, real-world practical applications, and industry skills in Computer Networks."
  },
  {
    "id": "course-060",
    "title": "Subnetting and Supernetting",
    "slug": "subnetting-and-supernetting",
    "category": "Computer Networks",
    "domain": "Computer Networks",
    "difficulty": "Intermediate",
    "duration": "8 Hours",
    "price": 49,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "IPv4",
      "Subnetting",
      "CIDR",
      "Network Addressing"
    ],
    "learningObjectives": [
      "Calculate network addresses and broadcast addresses",
      "Calculate usable host range and design subnets"
    ],
    "prerequisites": [
      "course-058"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 9,
    "lpReward": 150,
    "xpReward": 220,
    "description": "Comprehensive curriculum module covering Subnetting and Supernetting principles, real-world practical applications, and industry skills in Computer Networks."
  },
  {
    "id": "course-061",
    "title": "CIDR and Network Addressing",
    "slug": "cidr-and-network-addressing",
    "category": "Computer Networks",
    "domain": "Computer Networks",
    "difficulty": "Intermediate",
    "duration": "8 Hours",
    "price": 49,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "CIDR Notation",
      "Slash Prefixes",
      "VLSM",
      "Aggregation"
    ],
    "learningObjectives": [
      "Understand classless inter-domain routing prefixes",
      "Perform route summarization and aggregation"
    ],
    "prerequisites": [
      "course-060"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 8,
    "lpReward": 150,
    "xpReward": 220,
    "description": "Comprehensive curriculum module covering CIDR and Network Addressing principles, real-world practical applications, and industry skills in Computer Networks."
  },
  {
    "id": "course-062",
    "title": "Routing Fundamentals",
    "slug": "routing-fundamentals",
    "category": "Computer Networks",
    "domain": "Computer Networks",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Routing Tables",
      "Static Routes",
      "Gateway",
      "Hop Count"
    ],
    "learningObjectives": [
      "Configure static routes and default gateways",
      "Analyze routing table lookup decision logic"
    ],
    "prerequisites": [
      "course-060"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 180,
    "xpReward": 260,
    "description": "Comprehensive curriculum module covering Routing Fundamentals principles, real-world practical applications, and industry skills in Computer Networks."
  },
  {
    "id": "course-063",
    "title": "Switching Fundamentals",
    "slug": "switching-fundamentals",
    "category": "Computer Networks",
    "domain": "Computer Networks",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Ethernet",
      "MAC Tables",
      "Frame Forwarding",
      "Spanning Tree"
    ],
    "learningObjectives": [
      "Understand Layer 2 MAC address table learning",
      "Configure Spanning Tree Protocol (STP) loop prevention"
    ],
    "prerequisites": [
      "course-055"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 180,
    "xpReward": 260,
    "description": "Comprehensive curriculum module covering Switching Fundamentals principles, real-world practical applications, and industry skills in Computer Networks."
  },
  {
    "id": "course-064",
    "title": "VLAN and Network Segmentation",
    "slug": "vlan-and-network-segmentation",
    "category": "Computer Networks",
    "domain": "Computer Networks",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "VLANs",
      "802.1Q Trunking",
      "Inter-VLAN Routing",
      "Switchports"
    ],
    "learningObjectives": [
      "Configure 802.1Q VLAN trunking links",
      "Set up router-on-a-stick inter-VLAN routing"
    ],
    "prerequisites": [
      "course-063"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 190,
    "xpReward": 280,
    "description": "Comprehensive curriculum module covering VLAN and Network Segmentation principles, real-world practical applications, and industry skills in Computer Networks."
  },
  {
    "id": "course-065",
    "title": "DNS and DHCP",
    "slug": "dns-and-dhcp",
    "category": "Computer Networks",
    "domain": "Computer Networks",
    "difficulty": "Intermediate",
    "duration": "6 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "DNS Resolution",
      "DHCP DORA",
      "A Records",
      "Lease Time"
    ],
    "learningObjectives": [
      "Trace recursive DNS name resolution",
      "Understand the 4-step DHCP DORA process"
    ],
    "prerequisites": [
      "course-057"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 6,
    "lpReward": 120,
    "xpReward": 180,
    "description": "Comprehensive curriculum module covering DNS and DHCP principles, real-world practical applications, and industry skills in Computer Networks."
  },
  {
    "id": "course-066",
    "title": "TCP and UDP",
    "slug": "tcp-and-udp",
    "category": "Computer Networks",
    "domain": "Computer Networks",
    "difficulty": "Intermediate",
    "duration": "6 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Handshake",
      "Reliability",
      "Flow Control",
      "Datagrams"
    ],
    "learningObjectives": [
      "Trace TCP 3-way handshake and FIN tear-down",
      "Compare connection-oriented TCP vs connectionless UDP"
    ],
    "prerequisites": [
      "course-057"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 6,
    "lpReward": 130,
    "xpReward": 190,
    "description": "Comprehensive curriculum module covering TCP and UDP principles, real-world practical applications, and industry skills in Computer Networks."
  },
  {
    "id": "course-067",
    "title": "Network Troubleshooting",
    "slug": "network-troubleshooting",
    "category": "Computer Networks",
    "domain": "Computer Networks",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Ping",
      "Traceroute",
      "Wireshark",
      "Netstat",
      "TCPDump"
    ],
    "learningObjectives": [
      "Troubleshoot link failures using ping and traceroute",
      "Analyze packet captures in Wireshark"
    ],
    "prerequisites": [
      "course-057"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 190,
    "xpReward": 280,
    "description": "Comprehensive curriculum module covering Network Troubleshooting principles, real-world practical applications, and industry skills in Computer Networks."
  },
  {
    "id": "course-068",
    "title": "Wireless Networking",
    "slug": "wireless-networking",
    "category": "Computer Networks",
    "domain": "Computer Networks",
    "difficulty": "Intermediate",
    "duration": "8 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Wi-Fi",
      "802.11",
      "WPA3",
      "Access Points",
      "SSID"
    ],
    "learningObjectives": [
      "Understand 802.11 Wi-Fi frequencies and channels",
      "Configure WPA3 enterprise security"
    ],
    "prerequisites": [
      "course-055"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 8,
    "lpReward": 150,
    "xpReward": 220,
    "description": "Comprehensive curriculum module covering Wireless Networking principles, real-world practical applications, and industry skills in Computer Networks."
  },
  {
    "id": "course-069",
    "title": "Advanced Network Routing — OSPF and BGP",
    "slug": "advanced-network-routing-ospf-and-bgp",
    "category": "Computer Networks",
    "domain": "Computer Networks",
    "difficulty": "Advanced",
    "duration": "16 Hours",
    "price": 149,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "OSPF",
      "BGP",
      "Link State",
      "Autonomous Systems"
    ],
    "learningObjectives": [
      "Configure multi-area OSPF routing",
      "Establish BGP peering across Autonomous Systems"
    ],
    "prerequisites": [
      "course-062"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 16,
    "lpReward": 290,
    "xpReward": 420,
    "description": "Comprehensive curriculum module covering Advanced Network Routing — OSPF and BGP principles, real-world practical applications, and industry skills in Computer Networks."
  },
  {
    "id": "course-070",
    "title": "Cybersecurity Fundamentals",
    "slug": "cybersecurity-fundamentals",
    "category": "Cybersecurity",
    "domain": "Cybersecurity",
    "difficulty": "Beginner",
    "duration": "8 Hours",
    "price": 0,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "CIA Triad",
      "Threats",
      "Vulnerabilities",
      "Risk"
    ],
    "learningObjectives": [
      "Grasp Confidentiality, Integrity, and Availability",
      "Identify common malware vectors and social engineering"
    ],
    "prerequisites": [],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 120,
    "xpReward": 180,
    "description": "Comprehensive curriculum module covering Cybersecurity Fundamentals principles, real-world practical applications, and industry skills in Cybersecurity."
  },
  {
    "id": "course-071",
    "title": "Linux Security Fundamentals",
    "slug": "linux-security-fundamentals",
    "category": "Cybersecurity",
    "domain": "Cybersecurity",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 49,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "Linux Permissions",
      "Chmod/Chown",
      "SUDO",
      "SSH Hardening"
    ],
    "learningObjectives": [
      "Configure file permissions and ownership",
      "Harden Linux SSH servers against brute force"
    ],
    "prerequisites": [
      "course-070"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 160,
    "xpReward": 240,
    "description": "Comprehensive curriculum module covering Linux Security Fundamentals principles, real-world practical applications, and industry skills in Cybersecurity."
  },
  {
    "id": "course-072",
    "title": "Network Security",
    "slug": "network-security",
    "category": "Cybersecurity",
    "domain": "Cybersecurity",
    "difficulty": "Intermediate",
    "duration": "12 Hours",
    "price": 79,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "Firewalls",
      "IDS/IPS",
      "VPNs",
      "Nmap",
      "ACLs"
    ],
    "learningObjectives": [
      "Configure iptables and firewall access control lists",
      "Detect network scans using Intrusion Detection Systems"
    ],
    "prerequisites": [
      "course-057",
      "course-070"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 12,
    "lpReward": 200,
    "xpReward": 300,
    "description": "Comprehensive curriculum module covering Network Security principles, real-world practical applications, and industry skills in Cybersecurity."
  },
  {
    "id": "course-073",
    "title": "Ethical Hacking Fundamentals",
    "slug": "ethical-hacking-fundamentals",
    "category": "Cybersecurity",
    "domain": "Cybersecurity",
    "difficulty": "Intermediate",
    "duration": "14 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Reconnaissance",
      "Nmap",
      "Metasploit",
      "Payloads"
    ],
    "learningObjectives": [
      "Perform legal target reconnaissance and scanning",
      "Understand ethical exploitation methodologies"
    ],
    "prerequisites": [
      "course-072"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 14,
    "lpReward": 240,
    "xpReward": 360,
    "description": "Comprehensive curriculum module covering Ethical Hacking Fundamentals principles, real-world practical applications, and industry skills in Cybersecurity."
  },
  {
    "id": "course-074",
    "title": "Web Application Security",
    "slug": "web-application-security",
    "category": "Cybersecurity",
    "domain": "Cybersecurity",
    "difficulty": "Intermediate",
    "duration": "12 Hours",
    "price": 79,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "XSS",
      "SQLi",
      "CSRF",
      "Session Security",
      "Burp Suite"
    ],
    "learningObjectives": [
      "Identify and remediate Cross-Site Scripting (XSS)",
      "Audit web session tokens and cookie flags"
    ],
    "prerequisites": [
      "course-035",
      "course-070"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 12,
    "lpReward": 210,
    "xpReward": 310,
    "description": "Comprehensive curriculum module covering Web Application Security principles, real-world practical applications, and industry skills in Cybersecurity."
  },
  {
    "id": "course-075",
    "title": "OWASP Web Security",
    "slug": "owasp-web-security",
    "category": "Cybersecurity",
    "domain": "Cybersecurity",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "OWASP Top 10",
      "Broken Access Control",
      "SSRF",
      "Security Misconfig"
    ],
    "learningObjectives": [
      "Remediate the OWASP Top 10 critical security risks",
      "Audit access control and SSRF vulnerabilities"
    ],
    "prerequisites": [
      "course-074"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 190,
    "xpReward": 280,
    "description": "Comprehensive curriculum module covering OWASP Web Security principles, real-world practical applications, and industry skills in Cybersecurity."
  },
  {
    "id": "course-076",
    "title": "Penetration Testing Fundamentals",
    "slug": "penetration-testing-fundamentals",
    "category": "Cybersecurity",
    "domain": "Cybersecurity",
    "difficulty": "Advanced",
    "duration": "14 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "PenTesting",
      "Privilege Escalation",
      "Exploits",
      "Report Writing"
    ],
    "learningObjectives": [
      "Execute end-to-end penetration test engagements",
      "Write formal vulnerability findings reports"
    ],
    "prerequisites": [
      "course-073"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 14,
    "lpReward": 260,
    "xpReward": 390,
    "description": "Comprehensive curriculum module covering Penetration Testing Fundamentals principles, real-world practical applications, and industry skills in Cybersecurity."
  },
  {
    "id": "course-077",
    "title": "Vulnerability Assessment",
    "slug": "vulnerability-assessment",
    "category": "Cybersecurity",
    "domain": "Cybersecurity",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Nessus",
      "OpenVAS",
      "CVSS Scoring",
      "Patch Management"
    ],
    "learningObjectives": [
      "Run automated vulnerability scanners",
      "Calculate CVSS risk severity ratings"
    ],
    "prerequisites": [
      "course-070"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 180,
    "xpReward": 270,
    "description": "Comprehensive curriculum module covering Vulnerability Assessment principles, real-world practical applications, and industry skills in Cybersecurity."
  },
  {
    "id": "course-078",
    "title": "Security Operations Center — SOC",
    "slug": "security-operations-center-soc",
    "category": "Cybersecurity",
    "domain": "Cybersecurity",
    "difficulty": "Advanced",
    "duration": "16 Hours",
    "price": 149,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "SIEM",
      "Splunk",
      "Log Analysis",
      "Alert Triage"
    ],
    "learningObjectives": [
      "Triage security alerts in SIEM dashboard",
      "Write custom detection rules for log streams"
    ],
    "prerequisites": [
      "course-072"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 16,
    "lpReward": 280,
    "xpReward": 420,
    "description": "Comprehensive curriculum module covering Security Operations Center — SOC principles, real-world practical applications, and industry skills in Cybersecurity."
  },
  {
    "id": "course-079",
    "title": "Incident Response",
    "slug": "incident-response",
    "category": "Cybersecurity",
    "domain": "Cybersecurity",
    "difficulty": "Advanced",
    "duration": "12 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Containment",
      "Eradication",
      "Playbooks",
      "Root Cause"
    ],
    "learningObjectives": [
      "Execute NIST incident response lifecycle phases",
      "Contain active malware outbreaks on network endpoints"
    ],
    "prerequisites": [
      "course-078"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 12,
    "lpReward": 240,
    "xpReward": 360,
    "description": "Comprehensive curriculum module covering Incident Response principles, real-world practical applications, and industry skills in Cybersecurity."
  },
  {
    "id": "course-080",
    "title": "Digital Forensics Fundamentals",
    "slug": "digital-forensics-fundamentals",
    "category": "Cybersecurity",
    "domain": "Cybersecurity",
    "difficulty": "Advanced",
    "duration": "12 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Memory Forensics",
      "Disk Acquisition",
      "Volatility",
      "Chain of Custody"
    ],
    "learningObjectives": [
      "Acquire memory dumps and forensic disk images",
      "Extract volatile artifacts using Volatility framework"
    ],
    "prerequisites": [
      "course-071"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 12,
    "lpReward": 240,
    "xpReward": 360,
    "description": "Comprehensive curriculum module covering Digital Forensics Fundamentals principles, real-world practical applications, and industry skills in Cybersecurity."
  },
  {
    "id": "course-081",
    "title": "Cryptography Fundamentals",
    "slug": "cryptography-fundamentals",
    "category": "Cybersecurity",
    "domain": "Cybersecurity",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "AES",
      "RSA",
      "Hashing",
      "PKI",
      "TLS"
    ],
    "learningObjectives": [
      "Compare symmetric AES vs asymmetric RSA encryption",
      "Understand Public Key Infrastructure (PKI) certificates"
    ],
    "prerequisites": [
      "course-001"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 190,
    "xpReward": 280,
    "description": "Comprehensive curriculum module covering Cryptography Fundamentals principles, real-world practical applications, and industry skills in Cybersecurity."
  },
  {
    "id": "course-082",
    "title": "Malware Analysis Fundamentals",
    "slug": "malware-analysis-fundamentals",
    "category": "Cybersecurity",
    "domain": "Cybersecurity",
    "difficulty": "Advanced",
    "duration": "16 Hours",
    "price": 149,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Static Analysis",
      "Dynamic Analysis",
      "Ghidra",
      "Sandboxing"
    ],
    "learningObjectives": [
      "Disassemble PE executables in Ghidra",
      "Analyze malware behavioral indicators in sandboxes"
    ],
    "prerequisites": [
      "course-013",
      "course-080"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 16,
    "lpReward": 300,
    "xpReward": 450,
    "description": "Comprehensive curriculum module covering Malware Analysis Fundamentals principles, real-world practical applications, and industry skills in Cybersecurity."
  },
  {
    "id": "course-083",
    "title": "Threat Intelligence",
    "slug": "threat-intelligence",
    "category": "Cybersecurity",
    "domain": "Cybersecurity",
    "difficulty": "Intermediate",
    "duration": "12 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "IOCs",
      "STIX/TAXII",
      "MITRE ATT&CK",
      "Threat Feeds"
    ],
    "learningObjectives": [
      "Map adversary TTPs to the MITRE ATT&CK framework",
      "Ingest and evaluate Indicators of Compromise (IOCs)"
    ],
    "prerequisites": [
      "course-070"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 12,
    "lpReward": 220,
    "xpReward": 330,
    "description": "Comprehensive curriculum module covering Threat Intelligence principles, real-world practical applications, and industry skills in Cybersecurity."
  },
  {
    "id": "course-084",
    "title": "Identity and Access Management",
    "slug": "identity-and-access-management",
    "category": "Cybersecurity",
    "domain": "Cybersecurity",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "OAuth 2.0",
      "SAML",
      "SSO",
      "MFA",
      "Zero Trust"
    ],
    "learningObjectives": [
      "Configure OAuth 2.0 and SAML Single Sign-On",
      "Enforce Zero Trust least-privilege security controls"
    ],
    "prerequisites": [
      "course-070"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 180,
    "xpReward": 270,
    "description": "Comprehensive curriculum module covering Identity and Access Management principles, real-world practical applications, and industry skills in Cybersecurity."
  },
  {
    "id": "course-085",
    "title": "Cloud Security",
    "slug": "cloud-security",
    "category": "Cybersecurity",
    "domain": "Cybersecurity",
    "difficulty": "Advanced",
    "duration": "12 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "AWS IAM",
      "CloudTrail",
      "S3 Security",
      "GuardDuty"
    ],
    "learningObjectives": [
      "Audit cloud resource policies for misconfigurations",
      "Monitor cloud security alerts in AWS GuardDuty"
    ],
    "prerequisites": [
      "course-070",
      "course-088"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 12,
    "lpReward": 240,
    "xpReward": 360,
    "description": "Comprehensive curriculum module covering Cloud Security principles, real-world practical applications, and industry skills in Cybersecurity."
  },
  {
    "id": "course-086",
    "title": "API Security",
    "slug": "api-security",
    "category": "Cybersecurity",
    "domain": "Cybersecurity",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "BOLA/IDOR",
      "JWT Tokens",
      "Rate Limiting",
      "API Gateways"
    ],
    "learningObjectives": [
      "Remediate Broken Object Level Authorization (BOLA)",
      "Validate JWT cryptographic signatures"
    ],
    "prerequisites": [
      "course-040",
      "course-074"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 190,
    "xpReward": 280,
    "description": "Comprehensive curriculum module covering API Security principles, real-world practical applications, and industry skills in Cybersecurity."
  },
  {
    "id": "course-087",
    "title": "Secure Coding Practices",
    "slug": "secure-coding-practices",
    "category": "Cybersecurity",
    "domain": "Cybersecurity",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Input Validation",
      "SAST/DAST",
      "Secret Management",
      "Sanitization"
    ],
    "learningObjectives": [
      "Sanitize untrusted user inputs across applications",
      "Integrate SAST static analysis into CI/CD pipelines"
    ],
    "prerequisites": [
      "course-021",
      "course-070"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 190,
    "xpReward": 280,
    "description": "Comprehensive curriculum module covering Secure Coding Practices principles, real-world practical applications, and industry skills in Cybersecurity."
  },
  {
    "id": "course-088",
    "title": "Cloud Computing Fundamentals",
    "slug": "cloud-computing-fundamentals",
    "category": "Cloud Computing",
    "domain": "Cloud Computing",
    "difficulty": "Beginner",
    "duration": "8 Hours",
    "price": 0,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "IaaS",
      "PaaS",
      "SaaS",
      "Virtualization",
      "Cloud Models"
    ],
    "learningObjectives": [
      "Understand IaaS, PaaS, and SaaS cloud service models",
      "Evaluate public vs private vs hybrid cloud strategy"
    ],
    "prerequisites": [],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 120,
    "xpReward": 180,
    "description": "Comprehensive curriculum module covering Cloud Computing Fundamentals principles, real-world practical applications, and industry skills in Cloud Computing."
  },
  {
    "id": "course-089",
    "title": "AWS Fundamentals",
    "slug": "aws-fundamentals",
    "category": "Cloud Computing",
    "domain": "Cloud Computing",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 49,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "EC2",
      "S3",
      "VPC",
      "IAM",
      "AWS Console"
    ],
    "learningObjectives": [
      "Provision virtual EC2 compute instances",
      "Configure S3 buckets and IAM user permissions"
    ],
    "prerequisites": [
      "course-088"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 160,
    "xpReward": 240,
    "description": "Comprehensive curriculum module covering AWS Fundamentals principles, real-world practical applications, and industry skills in Cloud Computing."
  },
  {
    "id": "course-090",
    "title": "AWS Cloud Architecture",
    "slug": "aws-cloud-architecture",
    "category": "Cloud Computing",
    "domain": "Cloud Computing",
    "difficulty": "Advanced",
    "duration": "16 Hours",
    "price": 149,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Auto Scaling",
      "ELB",
      "Route 53",
      "Well-Architected Framework"
    ],
    "learningObjectives": [
      "Design high-availability multi-AZ architectures",
      "Set up Elastic Load Balancers and Auto Scaling groups"
    ],
    "prerequisites": [
      "course-089"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 16,
    "lpReward": 280,
    "xpReward": 420,
    "description": "Comprehensive curriculum module covering AWS Cloud Architecture principles, real-world practical applications, and industry skills in Cloud Computing."
  },
  {
    "id": "course-091",
    "title": "Microsoft Azure Fundamentals",
    "slug": "microsoft-azure-fundamentals",
    "category": "Cloud Computing",
    "domain": "Cloud Computing",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Azure VMs",
      "Entra ID",
      "Blob Storage",
      "Azure VNet"
    ],
    "learningObjectives": [
      "Provision Azure Virtual Machines and VNets",
      "Manage identities in Microsoft Entra ID"
    ],
    "prerequisites": [
      "course-088"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 160,
    "xpReward": 240,
    "description": "Comprehensive curriculum module covering Microsoft Azure Fundamentals principles, real-world practical applications, and industry skills in Cloud Computing."
  },
  {
    "id": "course-092",
    "title": "Google Cloud Fundamentals",
    "slug": "google-cloud-fundamentals",
    "category": "Cloud Computing",
    "domain": "Cloud Computing",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Compute Engine",
      "GCS",
      "Cloud IAM",
      "BigQuery"
    ],
    "learningObjectives": [
      "Deploy Google Compute Engine instances",
      "Query data sets in Google BigQuery"
    ],
    "prerequisites": [
      "course-088"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 160,
    "xpReward": 240,
    "description": "Comprehensive curriculum module covering Google Cloud Fundamentals principles, real-world practical applications, and industry skills in Cloud Computing."
  },
  {
    "id": "course-093",
    "title": "Cloud Networking",
    "slug": "cloud-networking",
    "category": "Cloud Computing",
    "domain": "Cloud Computing",
    "difficulty": "Intermediate",
    "duration": "12 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "VPC Peering",
      "VPN Gateway",
      "Direct Connect",
      "Transit Gateway"
    ],
    "learningObjectives": [
      "Establish cross-region VPC peering links",
      "Configure IPsec VPN tunnels to on-prem networks"
    ],
    "prerequisites": [
      "course-057",
      "course-088"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 12,
    "lpReward": 200,
    "xpReward": 300,
    "description": "Comprehensive curriculum module covering Cloud Networking principles, real-world practical applications, and industry skills in Cloud Computing."
  },
  {
    "id": "course-094",
    "title": "Cloud Storage and Databases",
    "slug": "cloud-storage-and-databases",
    "category": "Cloud Computing",
    "domain": "Cloud Computing",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "RDS",
      "DynamoDB",
      "EFS/EBS",
      "Cloud Spanner"
    ],
    "learningObjectives": [
      "Provision relational AWS RDS database instances",
      "Utilize DynamoDB global tables"
    ],
    "prerequisites": [
      "course-044",
      "course-088"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 180,
    "xpReward": 270,
    "description": "Comprehensive curriculum module covering Cloud Storage and Databases principles, real-world practical applications, and industry skills in Cloud Computing."
  },
  {
    "id": "course-095",
    "title": "Cloud Security",
    "slug": "cloud-security-basics",
    "category": "Cloud Computing",
    "domain": "Cloud Computing",
    "difficulty": "Advanced",
    "duration": "12 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Shared Responsibility",
      "KMS",
      "WAF",
      "Compliance"
    ],
    "learningObjectives": [
      "Understand the Cloud Shared Responsibility model",
      "Encrypt cloud data at rest using KMS customer keys"
    ],
    "prerequisites": [
      "course-088"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 12,
    "lpReward": 230,
    "xpReward": 340,
    "description": "Comprehensive curriculum module covering Cloud Security principles, real-world practical applications, and industry skills in Cloud Computing."
  },
  {
    "id": "course-096",
    "title": "Serverless Computing",
    "slug": "serverless-computing",
    "category": "Cloud Computing",
    "domain": "Cloud Computing",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "AWS Lambda",
      "API Gateway",
      "EventBridge",
      "Step Functions"
    ],
    "learningObjectives": [
      "Build event-driven microservices with AWS Lambda",
      "Configure REST triggers in API Gateway"
    ],
    "prerequisites": [
      "course-089"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 190,
    "xpReward": 280,
    "description": "Comprehensive curriculum module covering Serverless Computing principles, real-world practical applications, and industry skills in Cloud Computing."
  },
  {
    "id": "course-097",
    "title": "Cloud Architecture and Design",
    "slug": "cloud-architecture-and-design",
    "category": "Cloud Computing",
    "domain": "Cloud Computing",
    "difficulty": "Advanced",
    "duration": "16 Hours",
    "price": 149,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Disaster Recovery",
      "Cost Optimization",
      "Multi-Cloud",
      "Migration"
    ],
    "learningObjectives": [
      "Formulate cloud disaster recovery multi-region strategies",
      "Optimize cloud resource spending and reserved instances"
    ],
    "prerequisites": [
      "course-090"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 16,
    "lpReward": 290,
    "xpReward": 430,
    "description": "Comprehensive curriculum module covering Cloud Architecture and Design principles, real-world practical applications, and industry skills in Cloud Computing."
  },
  {
    "id": "course-098",
    "title": "Git Fundamentals",
    "slug": "git-fundamentals",
    "category": "DevOps",
    "domain": "DevOps",
    "difficulty": "Beginner",
    "duration": "6 Hours",
    "price": 0,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "Git",
      "Commits",
      "Branching",
      "Merging",
      "Rebase"
    ],
    "learningObjectives": [
      "Master git commits, branches, and merge strategies",
      "Resolve git merge conflicts cleanly"
    ],
    "prerequisites": [],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 8,
    "lpReward": 100,
    "xpReward": 150,
    "description": "Comprehensive curriculum module covering Git Fundamentals principles, real-world practical applications, and industry skills in DevOps."
  },
  {
    "id": "course-099",
    "title": "GitHub and Collaborative Development",
    "slug": "github-and-collaborative-development",
    "category": "DevOps",
    "domain": "DevOps",
    "difficulty": "Beginner",
    "duration": "6 Hours",
    "price": 29,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Pull Requests",
      "Code Reviews",
      "GitHub Actions",
      "Issues"
    ],
    "learningObjectives": [
      "Manage collaborative pull request code reviews",
      "Set up basic GitHub repository branch protection rules"
    ],
    "prerequisites": [
      "course-098"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 6,
    "lpReward": 110,
    "xpReward": 160,
    "description": "Comprehensive curriculum module covering GitHub and Collaborative Development principles, real-world practical applications, and industry skills in DevOps."
  },
  {
    "id": "course-100",
    "title": "Linux System Administration",
    "slug": "linux-system-administration",
    "category": "DevOps",
    "domain": "DevOps",
    "difficulty": "Intermediate",
    "duration": "12 Hours",
    "price": 49,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "Bash",
      "Systemd",
      "Cron",
      "Networking",
      "Package Managers"
    ],
    "learningObjectives": [
      "Manage systemd services and cron background jobs",
      "Troubleshoot Linux processes and storage mounts"
    ],
    "prerequisites": [],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 12,
    "lpReward": 180,
    "xpReward": 270,
    "description": "Comprehensive curriculum module covering Linux System Administration principles, real-world practical applications, and industry skills in DevOps."
  },
  {
    "id": "course-101",
    "title": "Docker Fundamentals",
    "slug": "docker-fundamentals",
    "category": "DevOps",
    "domain": "DevOps",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 49,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "Containers",
      "Dockerfile",
      "Images",
      "Docker Compose",
      "Volumes"
    ],
    "learningObjectives": [
      "Write multi-stage Dockerfiles for optimized builds",
      "Orchestrate multi-container environments with Docker Compose"
    ],
    "prerequisites": [
      "course-100"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 170,
    "xpReward": 250,
    "description": "Comprehensive curriculum module covering Docker Fundamentals principles, real-world practical applications, and industry skills in DevOps."
  },
  {
    "id": "course-102",
    "title": "Kubernetes Fundamentals",
    "slug": "kubernetes-fundamentals",
    "category": "DevOps",
    "domain": "DevOps",
    "difficulty": "Advanced",
    "duration": "16 Hours",
    "price": 149,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Pods",
      "Deployments",
      "Services",
      "Ingress",
      "kubectl"
    ],
    "learningObjectives": [
      "Deploy application pods and replica sets via kubectl",
      "Configure Ingress controllers and LoadBalancers"
    ],
    "prerequisites": [
      "course-101"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 16,
    "lpReward": 280,
    "xpReward": 420,
    "description": "Comprehensive curriculum module covering Kubernetes Fundamentals principles, real-world practical applications, and industry skills in DevOps."
  },
  {
    "id": "course-103",
    "title": "CI/CD Pipelines",
    "slug": "cicd-pipelines",
    "category": "DevOps",
    "domain": "DevOps",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "GitHub Actions",
      "Jenkins",
      "Build Automation",
      "Artifacts"
    ],
    "learningObjectives": [
      "Construct automated continuous integration testing pipelines",
      "Automate continuous deployment to Cloud Run/EC2"
    ],
    "prerequisites": [
      "course-099",
      "course-101"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 190,
    "xpReward": 280,
    "description": "Comprehensive curriculum module covering CI/CD Pipelines principles, real-world practical applications, and industry skills in DevOps."
  },
  {
    "id": "course-104",
    "title": "DevOps Fundamentals",
    "slug": "devops-fundamentals",
    "category": "DevOps",
    "domain": "DevOps",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "DevOps Culture",
      "Automation",
      "SRE",
      "Telemetry"
    ],
    "learningObjectives": [
      "Understand Site Reliability Engineering (SRE) principles",
      "Implement automated feedback loops and telemetry"
    ],
    "prerequisites": [
      "course-100"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 180,
    "xpReward": 270,
    "description": "Comprehensive curriculum module covering DevOps Fundamentals principles, real-world practical applications, and industry skills in DevOps."
  },
  {
    "id": "course-105",
    "title": "Infrastructure as Code",
    "slug": "infrastructure-as-code",
    "category": "DevOps",
    "domain": "DevOps",
    "difficulty": "Advanced",
    "duration": "12 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Declarative Infra",
      "Ansible",
      "Configuration Management",
      "State"
    ],
    "learningObjectives": [
      "Manage server configurations declaratively with Ansible",
      "Enforce immutable infrastructure paradigms"
    ],
    "prerequisites": [
      "course-100"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 12,
    "lpReward": 220,
    "xpReward": 330,
    "description": "Comprehensive curriculum module covering Infrastructure as Code principles, real-world practical applications, and industry skills in DevOps."
  },
  {
    "id": "course-106",
    "title": "Terraform Fundamentals",
    "slug": "terraform-fundamentals",
    "category": "DevOps",
    "domain": "DevOps",
    "difficulty": "Advanced",
    "duration": "12 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "HCL Syntax",
      "Terraform State",
      "Modules",
      "Cloud Provisioning"
    ],
    "learningObjectives": [
      "Write HCL files to provision cloud resources",
      "Manage remote terraform state locks securely"
    ],
    "prerequisites": [
      "course-105",
      "course-089"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 12,
    "lpReward": 240,
    "xpReward": 360,
    "description": "Comprehensive curriculum module covering Terraform Fundamentals principles, real-world practical applications, and industry skills in DevOps."
  },
  {
    "id": "course-107",
    "title": "Monitoring and Logging",
    "slug": "monitoring-and-logging",
    "category": "DevOps",
    "domain": "DevOps",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Prometheus",
      "Grafana",
      "ELK Stack",
      "SLO/SLA"
    ],
    "learningObjectives": [
      "Set up Prometheus metrics collection and Grafana dashboards",
      "Parse application logs using the ELK stack"
    ],
    "prerequisites": [
      "course-100"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 190,
    "xpReward": 280,
    "description": "Comprehensive curriculum module covering Monitoring and Logging principles, real-world practical applications, and industry skills in DevOps."
  },
  {
    "id": "course-108",
    "title": "Artificial Intelligence Fundamentals",
    "slug": "artificial-intelligence-fundamentals",
    "category": "AI / Machine Learning",
    "domain": "AI / Machine Learning",
    "difficulty": "Beginner",
    "duration": "8 Hours",
    "price": 0,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "AI History",
      "Search Trees",
      "Heuristics",
      "Expert Systems"
    ],
    "learningObjectives": [
      "Understand state space search trees and minimax",
      "Grasp foundational AI paradigm histories"
    ],
    "prerequisites": [],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 120,
    "xpReward": 180,
    "description": "Comprehensive curriculum module covering Artificial Intelligence Fundamentals principles, real-world practical applications, and industry skills in AI / Machine Learning."
  },
  {
    "id": "course-109",
    "title": "Machine Learning Fundamentals",
    "slug": "machine-learning-fundamentals",
    "category": "AI / Machine Learning",
    "domain": "AI / Machine Learning",
    "difficulty": "Intermediate",
    "duration": "12 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Supervised",
      "Unsupervised",
      "Train/Test Split",
      "Scikit-Learn"
    ],
    "learningObjectives": [
      "Understand training vs validation vs testing dataset splits",
      "Evaluate model accuracy, precision, and recall metrics"
    ],
    "prerequisites": [
      "course-019",
      "course-108"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 12,
    "lpReward": 200,
    "xpReward": 300,
    "description": "Comprehensive curriculum module covering Machine Learning Fundamentals principles, real-world practical applications, and industry skills in AI / Machine Learning."
  },
  {
    "id": "course-110",
    "title": "Python for Machine Learning",
    "slug": "python-for-machine-learning",
    "category": "AI / Machine Learning",
    "domain": "AI / Machine Learning",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Scikit-Learn",
      "SciPy",
      "Vectorization",
      "Pipeline"
    ],
    "learningObjectives": [
      "Build ML pipelines using Scikit-Learn",
      "Perform efficient matrix operations"
    ],
    "prerequisites": [
      "course-019"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 170,
    "xpReward": 250,
    "description": "Comprehensive curriculum module covering Python for Machine Learning principles, real-world practical applications, and industry skills in AI / Machine Learning."
  },
  {
    "id": "course-111",
    "title": "Data Preprocessing for Machine Learning",
    "slug": "data-preprocessing-for-machine-learning",
    "category": "AI / Machine Learning",
    "domain": "AI / Machine Learning",
    "difficulty": "Intermediate",
    "duration": "8 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "One-Hot Encoding",
      "Scaling",
      "Imputation",
      "Feature Engineering"
    ],
    "learningObjectives": [
      "Handle missing data values with mean/median imputation",
      "Scale numerical features using StandardScaler"
    ],
    "prerequisites": [
      "course-110"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 8,
    "lpReward": 150,
    "xpReward": 220,
    "description": "Comprehensive curriculum module covering Data Preprocessing for Machine Learning principles, real-world practical applications, and industry skills in AI / Machine Learning."
  },
  {
    "id": "course-112",
    "title": "Supervised Learning",
    "slug": "supervised-learning",
    "category": "AI / Machine Learning",
    "domain": "AI / Machine Learning",
    "difficulty": "Intermediate",
    "duration": "12 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Linear Regression",
      "Logistic Regression",
      "Decision Trees",
      "Random Forest"
    ],
    "learningObjectives": [
      "Train linear and logistic regression models",
      "Construct decision trees and ensemble Random Forests"
    ],
    "prerequisites": [
      "course-109"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 12,
    "lpReward": 210,
    "xpReward": 310,
    "description": "Comprehensive curriculum module covering Supervised Learning principles, real-world practical applications, and industry skills in AI / Machine Learning."
  },
  {
    "id": "course-113",
    "title": "Unsupervised Learning",
    "slug": "unsupervised-learning",
    "category": "AI / Machine Learning",
    "domain": "AI / Machine Learning",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "K-Means",
      "PCA",
      "Hierarchical Clustering",
      "Dimensionality Reduction"
    ],
    "learningObjectives": [
      "Cluster datasets using K-Means and DBSCAN",
      "Reduce feature dimensions using Principal Component Analysis (PCA)"
    ],
    "prerequisites": [
      "course-109"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 190,
    "xpReward": 280,
    "description": "Comprehensive curriculum module covering Unsupervised Learning principles, real-world practical applications, and industry skills in AI / Machine Learning."
  },
  {
    "id": "course-114",
    "title": "Deep Learning Fundamentals",
    "slug": "deep-learning-fundamentals",
    "category": "AI / Machine Learning",
    "domain": "AI / Machine Learning",
    "difficulty": "Advanced",
    "duration": "16 Hours",
    "price": 149,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "TensorFlow",
      "PyTorch",
      "Backpropagation",
      "Activation Functions"
    ],
    "learningObjectives": [
      "Understand gradient descent optimization algorithms",
      "Build neural networks in PyTorch / TensorFlow"
    ],
    "prerequisites": [
      "course-109"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 16,
    "lpReward": 280,
    "xpReward": 420,
    "description": "Comprehensive curriculum module covering Deep Learning Fundamentals principles, real-world practical applications, and industry skills in AI / Machine Learning."
  },
  {
    "id": "course-115",
    "title": "Neural Networks",
    "slug": "neural-networks",
    "category": "AI / Machine Learning",
    "domain": "AI / Machine Learning",
    "difficulty": "Advanced",
    "duration": "14 Hours",
    "price": 149,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "CNNs",
      "RNNs",
      "LSTM",
      "Pooling Layers"
    ],
    "learningObjectives": [
      "Construct Convolutional Neural Networks (CNN) for images",
      "Build Recurrent Neural Networks (RNN) for sequence data"
    ],
    "prerequisites": [
      "course-114"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 14,
    "lpReward": 270,
    "xpReward": 400,
    "description": "Comprehensive curriculum module covering Neural Networks principles, real-world practical applications, and industry skills in AI / Machine Learning."
  },
  {
    "id": "course-116",
    "title": "Natural Language Processing",
    "slug": "natural-language-processing",
    "category": "AI / Machine Learning",
    "domain": "AI / Machine Learning",
    "difficulty": "Advanced",
    "duration": "16 Hours",
    "price": 149,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Tokenization",
      "TF-IDF",
      "Word2Vec",
      "Transformers",
      "BERT"
    ],
    "learningObjectives": [
      "Perform text tokenization and stemming",
      "Train word embeddings and transformer models"
    ],
    "prerequisites": [
      "course-115"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 16,
    "lpReward": 290,
    "xpReward": 430,
    "description": "Comprehensive curriculum module covering Natural Language Processing principles, real-world practical applications, and industry skills in AI / Machine Learning."
  },
  {
    "id": "course-117",
    "title": "Generative AI Fundamentals",
    "slug": "generative-ai-fundamentals",
    "category": "AI / Machine Learning",
    "domain": "AI / Machine Learning",
    "difficulty": "Intermediate",
    "duration": "12 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "LLMs",
      "Prompt Engineering",
      "RAG",
      "Embeddings",
      "Gemini API"
    ],
    "learningObjectives": [
      "Understand Large Language Model transformer architectures",
      "Implement Retrieval-Augmented Generation (RAG) vector search"
    ],
    "prerequisites": [
      "course-108"
    ],
    "certificateAvailable": true,
    "simulationAvailable": true,
    "competitionAvailable": true,
    "totalLessons": 12,
    "lpReward": 230,
    "xpReward": 350,
    "description": "Comprehensive curriculum module covering Generative AI Fundamentals principles, real-world practical applications, and industry skills in AI / Machine Learning."
  },
  {
    "id": "course-118",
    "title": "Data Science Fundamentals",
    "slug": "data-science-fundamentals",
    "category": "Data Science",
    "domain": "Data Science",
    "difficulty": "Beginner",
    "duration": "8 Hours",
    "price": 0,
    "currency": "INR",
    "status": "PUBLISHED",
    "skills": [
      "Data Lifecycle",
      "Data Wrangling",
      "Analytics",
      "Hypothesis"
    ],
    "learningObjectives": [
      "Understand the data science lifecycle and methodology",
      "Formulate testable data hypothesis questions"
    ],
    "prerequisites": [],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 120,
    "xpReward": 180,
    "description": "Comprehensive curriculum module covering Data Science Fundamentals principles, real-world practical applications, and industry skills in Data Science."
  },
  {
    "id": "course-119",
    "title": "Statistics for Data Science",
    "slug": "statistics-for-data-science",
    "category": "Data Science",
    "domain": "Data Science",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Probability",
      "Distribution",
      "P-Value",
      "Confidence Intervals"
    ],
    "learningObjectives": [
      "Calculate mean, variance, and standard deviation",
      "Perform hypothesis testing and calculate p-values"
    ],
    "prerequisites": [
      "course-118"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 10,
    "lpReward": 160,
    "xpReward": 240,
    "description": "Comprehensive curriculum module covering Statistics for Data Science principles, real-world practical applications, and industry skills in Data Science."
  },
  {
    "id": "course-120",
    "title": "NumPy and Scientific Computing",
    "slug": "numpy-and-scientific-computing",
    "category": "Data Science",
    "domain": "Data Science",
    "difficulty": "Beginner",
    "duration": "6 Hours",
    "price": 29,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "NumPy Arrays",
      "Broadcasting",
      "Indexing",
      "Linear Algebra"
    ],
    "learningObjectives": [
      "Construct multi-dimensional NumPy ndarrays",
      "Perform vectorized element-wise arithmetic"
    ],
    "prerequisites": [
      "course-019"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 6,
    "lpReward": 110,
    "xpReward": 160,
    "description": "Comprehensive curriculum module covering NumPy and Scientific Computing principles, real-world practical applications, and industry skills in Data Science."
  },
  {
    "id": "course-121",
    "title": "Pandas for Data Analysis",
    "slug": "pandas-for-data-analysis",
    "category": "Data Science",
    "domain": "Data Science",
    "difficulty": "Intermediate",
    "duration": "8 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "DataFrames",
      "Series",
      "GroupBy",
      "Merging",
      "CSV/Excel"
    ],
    "learningObjectives": [
      "Manipulate Pandas DataFrames and Series",
      "Perform data cleaning and GroupBy aggregations"
    ],
    "prerequisites": [
      "course-120"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 8,
    "lpReward": 150,
    "xpReward": 220,
    "description": "Comprehensive curriculum module covering Pandas for Data Analysis principles, real-world practical applications, and industry skills in Data Science."
  },
  {
    "id": "course-122",
    "title": "Data Visualization",
    "slug": "data-visualization",
    "category": "Data Science",
    "domain": "Data Science",
    "difficulty": "Intermediate",
    "duration": "8 Hours",
    "price": 49,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Seaborn",
      "Charts",
      "Dashboards",
      "Color Theory"
    ],
    "learningObjectives": [
      "Create informative statistical plots with Seaborn",
      "Design visual data dashboards"
    ],
    "prerequisites": [
      "course-121"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 8,
    "lpReward": 150,
    "xpReward": 220,
    "description": "Comprehensive curriculum module covering Data Visualization principles, real-world practical applications, and industry skills in Data Science."
  },
  {
    "id": "course-123",
    "title": "Exploratory Data Analysis",
    "slug": "exploratory-data-analysis",
    "category": "Data Science",
    "domain": "Data Science",
    "difficulty": "Intermediate",
    "duration": "10 Hours",
    "price": 79,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "EDA",
      "Outlier Detection",
      "Correlation Heatmaps",
      "Profiling"
    ],
    "learningObjectives": [
      "Identify data distributions and missing values",
      "Detect statistical outliers and correlation heatmaps"
    ],
    "prerequisites": [
      "course-121",
      "course-122"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 10,
    "lpReward": 180,
    "xpReward": 270,
    "description": "Comprehensive curriculum module covering Exploratory Data Analysis principles, real-world practical applications, and industry skills in Data Science."
  },
  {
    "id": "course-124",
    "title": "Matplotlib and Data Visualization",
    "slug": "matplotlib-and-data-visualization",
    "category": "Data Science",
    "domain": "Data Science",
    "difficulty": "Beginner",
    "duration": "6 Hours",
    "price": 29,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Matplotlib",
      "Scatter Plots",
      "Histograms",
      "Subplots"
    ],
    "learningObjectives": [
      "Construct multi-panel figure subplots in Matplotlib",
      "Customize axis formatting and legends"
    ],
    "prerequisites": [
      "course-120"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": false,
    "totalLessons": 6,
    "lpReward": 110,
    "xpReward": 160,
    "description": "Comprehensive curriculum module covering Matplotlib and Data Visualization principles, real-world practical applications, and industry skills in Data Science."
  },
  {
    "id": "course-125",
    "title": "Business Data Analytics",
    "slug": "business-data-analytics",
    "category": "Data Science",
    "domain": "Data Science",
    "difficulty": "Advanced",
    "duration": "12 Hours",
    "price": 99,
    "currency": "INR",
    "status": "COMING_SOON",
    "skills": [
      "Cohort Analysis",
      "Churn Prediction",
      "KPI Metrics",
      "Reporting"
    ],
    "learningObjectives": [
      "Calculate customer lifetime value and churn rates",
      "Build business decision support reports"
    ],
    "prerequisites": [
      "course-123"
    ],
    "certificateAvailable": true,
    "simulationAvailable": false,
    "competitionAvailable": true,
    "totalLessons": 12,
    "lpReward": 220,
    "xpReward": 330,
    "description": "Comprehensive curriculum module covering Business Data Analytics principles, real-world practical applications, and industry skills in Data Science."
  }
];
