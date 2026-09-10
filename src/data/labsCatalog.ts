import { Lab } from '../types';
import { EXPERIENTIAL_LABS } from './experientialLabs';

const BASE_LABS_CATALOG: Lab[] = [
  // 1. PROGRAMMING LABS
  {
    id: 'lab-prog-python-prime',
    title: 'Python Prime Number Verification Lab',
    slug: 'python-prime-checker',
    category: 'Programming Labs',
    description: 'Write a Python program that reads an integer n and determines whether n is a prime number.',
    type: 'CODE_EXECUTION',
    difficulty: 'Beginner',
    language: 'python',
    objectives: [
      'Understand loops and divisibility logic',
      'Implement optimized bounds checking up to √n',
      'Handle edge cases like numbers ≤ 1'
    ],
    instructions: 'Write code to take integer input and print whether it is Prime or Not Prime. For input 17, stdout should contain "17 is Prime".',
    starterCode: `# Check Prime Number in Python
def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

num = int(input().strip())
if is_prime(num):
    print(f"{num} is Prime")
else:
    print(f"{num} is Not Prime")
`,
    testCases: [
      { id: 'tc-1', input: '17', expectedOutput: '17 is Prime' },
      { id: 'tc-2', input: '20', expectedOutput: '20 is Not Prime' },
      { id: 'tc-3', input: '2', expectedOutput: '2 is Prime' },
      { id: 'tc-4', input: '1', expectedOutput: '1 is Not Prime' }
    ],
    hints: [
      'Remember that prime numbers are greater than 1.',
      'Checking factors up to √n is much faster than checking up to n-1.',
      'Ensure output format matches "X is Prime" or "X is Not Prime".'
    ],
    xpReward: 50,
    lpReward: 20,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-prog-java-loops',
    title: 'Java For-Loop & Array Operations Lab',
    slug: 'java-loops-array',
    category: 'Programming Labs',
    description: 'Master Java control flow loops, array traversals, and aggregate calculations.',
    type: 'CODE_EXECUTION',
    difficulty: 'Beginner',
    language: 'java',
    objectives: [
      'Iterate over arrays using Java for-loops',
      'Calculate array sum and maximum value'
    ],
    instructions: 'Read space-separated integers, calculate total sum, and print the result as "Sum: <X>".',
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int sum = 0;
        while (scanner.hasNextInt()) {
            sum += scanner.nextInt();
        }
        System.out.println("Sum: " + sum);
    }
}
`,
    testCases: [
      { id: 'tc-1', input: '10 20 30 40', expectedOutput: 'Sum: 100' },
      { id: 'tc-2', input: '5 15 -5', expectedOutput: 'Sum: 15' }
    ],
    hints: [
      'Use Scanner.hasNextInt() to safely loop through inputs.',
      'Maintain an accumulator variable initialized to 0.'
    ],
    xpReward: 50,
    lpReward: 20,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-prog-cpp-pointers',
    title: 'C++ Dynamic Memory & Pointer Lab',
    slug: 'cpp-pointers-memory',
    category: 'Programming Labs',
    description: 'Explore memory addresses, pointers, and manual heap allocation in modern C++.',
    type: 'CODE_EXECUTION',
    difficulty: 'Intermediate',
    language: 'cpp',
    objectives: ['Pointer dereferencing', 'Dynamic memory allocation with new/delete'],
    instructions: 'Dynamically allocate an array of integers, compute the average, and free memory properly.',
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    int* arr = new int[n];
    long long sum = 0;
    for(int i=0; i<n; ++i) {
        cin >> arr[i];
        sum += arr[i];
    }
    cout << "Average: " << (sum / n) << endl;
    delete[] arr;
    return 0;
}
`,
    testCases: [
      { id: 'tc-1', input: '4\n10 20 30 40', expectedOutput: 'Average: 25' }
    ],
    hints: ['Always match new[] with delete[] to prevent memory leaks.'],
    xpReward: 60,
    lpReward: 25,
    status: 'PUBLISHED'
  },

  // 2. WEB DEVELOPMENT LABS
  {
    id: 'lab-web-responsive-nav',
    title: 'HTML/CSS Responsive Navbar Playground',
    slug: 'html-css-responsive-navbar',
    category: 'Web Development Labs',
    description: 'Build a modern flexbox navigation bar with interactive hover states and responsive preview.',
    type: 'WEB_PLAYGROUND',
    difficulty: 'Beginner',
    language: 'html',
    objectives: [
      'Structure navigation using semantic HTML5 <nav> and <ul> tags',
      'Apply CSS flexbox layout alignment and padding',
      'Add smooth CSS transition hover effects'
    ],
    instructions: 'Create a responsive navigation bar containing logo "LearnerPedia" and links for "Home", "Courses", "Labs", and "Profile".',
    starterCode: `<!-- HTML -->
<nav class="navbar">
  <div class="logo">LearnerPedia</div>
  <ul class="nav-links">
    <li><a href="#" class="active">Home</a></li>
    <li><a href="#">Courses</a></li>
    <li><a href="#">Labs</a></li>
    <li><a href="#">Profile</a></li>
  </ul>
</nav>

<!-- CSS -->
<style>
  body {
    margin: 0;
    font-family: 'Inter', system-ui, sans-serif;
    background: #090d16;
    color: #e2e8f0;
  }
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(56, 189, 248, 0.2);
  }
  .logo {
    font-size: 1.25rem;
    font-weight: 800;
    color: #38bdf8;
    letter-spacing: -0.02em;
  }
  .nav-links {
    display: flex;
    gap: 1.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .nav-links a {
    color: #94a3b8;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.875rem;
    transition: color 0.2s ease;
  }
  .nav-links a:hover, .nav-links a.active {
    color: #38bdf8;
  }
</style>
`,
    hints: [
      'Use display: flex and justify-content: space-between on .navbar.',
      'Use backdrop-filter: blur() for modern glassmorphism aesthetic.'
    ],
    xpReward: 40,
    lpReward: 15,
    status: 'PUBLISHED'
  },

  // 3. DATABASE LABS
  {
    id: 'lab-db-sql-join',
    title: 'SQL Relational JOINs & Aggregations Lab',
    slug: 'sql-relational-joins',
    category: 'Database Labs',
    description: 'Execute queries on students and enrollments tables using INNER JOIN, LEFT JOIN, and GROUP BY.',
    type: 'SQL_PLAYGROUND',
    difficulty: 'Intermediate',
    objectives: [
      'Understand relational foreign key linkages',
      'Combine data across multiple tables using INNER JOIN',
      'Compute aggregated metrics with COUNT and AVG'
    ],
    instructions: 'Write a SQL query to list student name, course title, and score for all students who scored above 80.',
    starterCode: `-- Schema pre-populated: students(id, name), enrollments(id, student_id, course_title, score)
SELECT 
  s.name AS student_name, 
  e.course_title, 
  e.score
FROM students s
JOIN enrollments e ON s.id = e.student_id
WHERE e.score > 80
ORDER BY e.score DESC;
`,
    hints: [
      'Join on s.id = e.student_id',
      'Filter with WHERE e.score > 80'
    ],
    xpReward: 55,
    lpReward: 25,
    status: 'PUBLISHED'
  },

  // 4. COMPUTER NETWORKS LABS
  {
    id: 'lab-net-subnetting-calculator',
    title: 'IPv4 Subnetting & CIDR Calculation Lab',
    slug: 'ipv4-subnetting-cidr',
    category: 'Computer Networks Labs',
    description: 'Divide IP ranges, calculate subnet masks, wildcard masks, usable host bounds, and broadcast addresses.',
    type: 'NETWORK_SIMULATION',
    difficulty: 'Intermediate',
    objectives: [
      'Master binary-to-decimal subnet mask conversions',
      'Calculate network ID and broadcast address for /24 to /30 prefixes',
      'Determine usable host ranges accurately'
    ],
    instructions: 'Given 192.168.10.0/26, determine the subnet mask, total usable hosts, first host, last host, and broadcast address.',
    variables: {
      ip: '192.168.10.0',
      prefix: 26,
      requiredSubnets: 4
    },
    hints: [
      'For /26, 6 bits are available for host IDs (2^6 - 2 = 62 usable hosts).',
      'Subnet mask for /26 is 255.255.255.192.'
    ],
    xpReward: 65,
    lpReward: 30,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-net-packet-tracer',
    title: 'Packet Routing & Gateway Simulation',
    slug: 'packet-routing-gateway',
    category: 'Computer Networks Labs',
    description: 'Configure IP addresses, default gateways, and router interfaces to achieve end-to-end ping connectivity.',
    type: 'NETWORK_SIMULATION',
    difficulty: 'Advanced',
    objectives: [
      'Understand default gateway routing decisions',
      'Trace packet hops across local switches and inter-network routers',
      'Diagnose ARP and ICMP packet drops'
    ],
    instructions: 'Connect PC1 (192.168.1.10/24) through Gateway Router to Server1 (10.0.0.5/24). Test packet transmission.',
    hints: [
      'Ensure PC1 default gateway points to Router Interface 1 (192.168.1.1).',
      'Ensure Server1 default gateway points to Router Interface 2 (10.0.0.1).'
    ],
    xpReward: 75,
    lpReward: 35,
    status: 'PUBLISHED'
  },

  // 5. CYBERSECURITY LABS
  {
    id: 'lab-sec-sql-injection',
    title: 'SQL Injection Vulnerability Sandbox',
    slug: 'sql-injection-sandbox',
    category: 'Cybersecurity Labs',
    description: 'Safely analyze authentication bypass vulnerabilities caused by unescaped SQL string concatenation.',
    type: 'CYBERSECURITY_SIMULATION',
    difficulty: 'Intermediate',
    objectives: [
      'Understand how user input gets interpolated into raw SQL statements',
      'Demonstrate OR 1=1 boolean logic exploitation safely',
      'Learn prepared statements and parameterized queries for mitigation'
    ],
    instructions: 'Test the vulnerable login prompt with input "\' OR 1=1 --" to observe query logic bypass, then convert it to a parameterized query.',
    starterCode: `-- Vulnerable query:
-- SELECT * FROM users WHERE username = 'USER_INPUT' AND password = 'PASSWORD_INPUT';
-- Input: ' OR '1'='1
`,
    hints: [
      "Inserting ' OR 1=1 -- comments out the remainder of the query.",
      'Remediation: Use parameterized queries like SELECT * FROM users WHERE username = ? AND password = ?'
    ],
    xpReward: 70,
    lpReward: 30,
    status: 'PUBLISHED'
  },
  {
    id: 'lab-sec-password-hashing',
    title: 'Cryptographic Hashing & Salt Analysis Lab',
    slug: 'password-hashing-salting',
    category: 'Cybersecurity Labs',
    description: 'Compare raw MD5, SHA-256, and bcrypt password hashing algorithms against rainbow table attacks.',
    type: 'CYBERSECURITY_SIMULATION',
    difficulty: 'Beginner',
    objectives: [
      'Differentiate between symmetric encryption and one-way cryptographic hashing',
      'Observe salt random bits preventing rainbow table match',
      'Calculate hash time complexity factors'
    ],
    instructions: 'Input passwords, generate SHA-256 vs bcrypt hashes with random salt, and analyze collision resistance.',
    hints: ['Salting ensures identical plaintexts generate unique hashes.'],
    xpReward: 50,
    lpReward: 20,
    status: 'PUBLISHED'
  },

  // 6. DATA STRUCTURE LABS
  {
    id: 'lab-ds-stack-queue',
    title: 'Stack & Queue Interactive Visualizer',
    slug: 'stack-queue-visualizer',
    category: 'Data Structures Labs',
    description: 'Visualize Last-In-First-Out (LIFO) stack operations and First-In-First-Out (FIFO) queue operations.',
    type: 'DATA_STRUCTURE_VISUALIZATION',
    difficulty: 'Beginner',
    objectives: [
      'Understand push, pop, peek stack pointer mechanics',
      'Understand enqueue, dequeue front/rear queue pointers',
      'Observe time complexity O(1) for core operations'
    ],
    instructions: 'Perform Push(10), Push(20), Push(30), Pop(), and observe the visual top pointer transition.',
    hints: ['Stack follows LIFO (Last In First Out); Queue follows FIFO (First In First Out).'],
    xpReward: 45,
    lpReward: 20,
    status: 'PUBLISHED'
  },

  // 7. ALGORITHM LABS
  {
    id: 'lab-algo-sorting-visualizer',
    title: 'Sorting Algorithms Execution & Comparison Lab',
    slug: 'sorting-visualizer-lab',
    category: 'Algorithm Labs',
    description: 'Step through Quick Sort, Merge Sort, and Bubble Sort to analyze comparisons, swaps, and time complexity.',
    type: 'ALGORITHM_VISUALIZATION',
    difficulty: 'Intermediate',
    objectives: [
      'Visualize divide-and-conquer partitioning in Quick Sort',
      'Track active comparisons and element swaps step-by-step',
      'Compare worst-case O(n^2) vs average O(n log n) performance'
    ],
    instructions: 'Load random array, select Quick Sort or Merge Sort, step through iterations, and observe swap counters.',
    hints: ['Notice how Quick Sort chooses a pivot element to divide smaller and larger subsets.'],
    xpReward: 60,
    lpReward: 25,
    status: 'PUBLISHED'
  },

  // 8. OPERATING SYSTEMS LABS
  {
    id: 'lab-os-cpu-scheduling',
    title: 'CPU Process Scheduling & Gantt Chart Lab',
    slug: 'cpu-scheduling-gantt',
    category: 'Operating Systems Labs',
    description: 'Simulate First-Come-First-Served (FCFS), Shortest Job First (SJF), and Round Robin CPU scheduling.',
    type: 'OS_SIMULATION',
    difficulty: 'Intermediate',
    objectives: [
      'Calculate process waiting time and turnaround time',
      'Render dynamic Gantt chart timeline for CPU burst allocations',
      'Compare preemption effects and time quantum selection'
    ],
    instructions: 'Configure 3 processes (P1: 5ms, P2: 3ms, P3: 8ms) with Round Robin (Quantum = 2ms). Observe average waiting time.',
    hints: ['Turnaround Time = Completion Time - Arrival Time. Waiting Time = Turnaround Time - Burst Time.'],
    xpReward: 65,
    lpReward: 30,
    status: 'PUBLISHED'
  },

  // 9. CLOUD COMPUTING LABS
  {
    id: 'lab-cloud-architecture',
    title: 'Scalable Cloud Architecture Topology Builder',
    slug: 'cloud-architecture-builder',
    category: 'Cloud Computing Labs',
    description: 'Design multi-tier cloud architectures with Load Balancers, Auto-Scaling Web Servers, and Managed Databases.',
    type: 'CLOUD_SIMULATION',
    difficulty: 'Advanced',
    objectives: [
      'Design high availability across multi-AZ regions',
      'Integrate CDN and object storage for static asset caching',
      'Evaluate fault tolerance and cost efficiency'
    ],
    instructions: 'Connect User -> CDN -> Load Balancer -> Web Servers -> Database Cluster. Run architecture validation.',
    hints: ['Place database replicas across secondary Availability Zones for disaster recovery.'],
    xpReward: 80,
    lpReward: 40,
    status: 'PUBLISHED'
  },

  // 10. DEVOPS LABS
  {
    id: 'lab-devops-dockerfile',
    title: 'Dockerfile & Containerization Lab',
    slug: 'dockerfile-containerization',
    category: 'DevOps Labs',
    description: 'Construct optimized multi-stage Dockerfiles for Node.js / Python microservices.',
    type: 'DEVOPS_SIMULATION',
    difficulty: 'Intermediate',
    objectives: [
      'Understand FROM, WORKDIR, COPY, RUN, EXPOSE, CMD directives',
      'Minimize container image layer size using alpine base images',
      'Enforce non-root security principles'
    ],
    instructions: 'Write a Dockerfile to copy package.json, run npm install, expose port 3000, and define start command.',
    starterCode: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
`,
    hints: ['Place package.json COPY before full source COPY to leverage Docker layer caching.'],
    xpReward: 60,
    lpReward: 25,
    status: 'PUBLISHED'
  },

  // 11. AI / MACHINE LEARNING LABS
  {
    id: 'lab-ml-regression-classifier',
    title: 'Linear Regression & KNN Classification Experiment',
    slug: 'ml-regression-knn',
    category: 'AI / Machine Learning Labs',
    description: 'Adjust decision boundaries, test split ratios, learning rate hyperparameters, and evaluate confusion matrix.',
    type: 'ML_EXPERIMENT',
    difficulty: 'Intermediate',
    objectives: [
      'Train supervised classification algorithms on sample datasets',
      'Evaluate Accuracy, Precision, Recall, and F1 score',
      'Visualize overfitting vs underfitting tradeoffs'
    ],
    instructions: 'Select dataset, adjust K-neighbors = 5, train model, and review evaluation matrix metrics.',
    hints: ['Higher K smooths decision boundaries but may cause underfitting.'],
    xpReward: 70,
    lpReward: 30,
    status: 'PUBLISHED'
  },

  // 12. DATA SCIENCE LABS
  {
    id: 'lab-ds-pandas-analysis',
    title: 'Pandas Data Cleaning & Analytics Lab',
    slug: 'pandas-data-analytics',
    category: 'Data Science Labs',
    description: 'Filter DataFrames, handle missing null values, aggregate group stats, and render exploratory plots.',
    type: 'DATA_ANALYSIS',
    difficulty: 'Beginner',
    objectives: [
      'Filter and clean tabular datasets using Pandas syntax',
      'Compute descriptive summary statistics',
      'Visualize correlation trends'
    ],
    instructions: 'Load student test score dataset, replace NaN values with column mean, and group by department.',
    starterCode: `import pandas as pd

# Load dataset
df = pd.DataFrame({
    'Student': ['Alice', 'Bob', 'Charlie', 'David'],
    'Department': ['CS', 'CS', 'IT', 'IT'],
    'Score': [85, 92, None, 78]
})

# Clean missing values
df['Score'] = df['Score'].fillna(df['Score'].mean())

# Group by department
result = df.groupby('Department')['Score'].mean()
print(result)
`,
    testCases: [
      { id: 'tc-1', input: '', expectedOutput: 'Department\nCS    88.5\nIT    81.5' }
    ],
    hints: ['Use df.fillna() to cleanly impute missing quantitative values.'],
    xpReward: 55,
    lpReward: 25,
    status: 'PUBLISHED'
  }
];

export const LABS_CATALOG: Lab[] = [...BASE_LABS_CATALOG, ...EXPERIENTIAL_LABS];
