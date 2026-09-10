import React, { useState } from 'react';
import { Course } from '../../types';
import { getCategoryIcon } from './CourseCard';
import { ChevronRight, ArrowRight, CheckCircle2, Clock, Eye, Sparkles } from 'lucide-react';

interface RoadmapViewProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

interface DomainRoadmap {
  domain: string;
  description: string;
  color: string;
  steps: string[]; // List of course titles or matching keywords in order
}

const ROADMAPS: DomainRoadmap[] = [
  {
    domain: 'Computer Networks',
    description: 'Master packet routing, IPv4/IPv6, subnetting, switching, and internet protocols step-by-step.',
    color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    steps: [
      'Computer Networks Fundamentals',
      'OSI Reference Model',
      'TCP/IP Networking',
      'IPv4 Addressing',
      'Subnetting and Supernetting',
      'CIDR and Network Addressing',
      'Routing Fundamentals',
      'Switching Fundamentals',
      'VLAN and Network Segmentation',
      'Advanced Network Routing — OSPF and BGP'
    ]
  },
  {
    domain: 'Cybersecurity',
    description: 'Build defenses, conduct vulnerability assessments, pentest web applications, and analyze threats.',
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    steps: [
      'Cybersecurity Fundamentals',
      'Linux Security Fundamentals',
      'Network Security',
      'Web Application Security',
      'OWASP Web Security',
      'Ethical Hacking Fundamentals',
      'Penetration Testing Fundamentals',
      'Security Operations Center — SOC',
      'Incident Response',
      'Digital Forensics Fundamentals'
    ]
  },
  {
    domain: 'Programming',
    description: 'Progress from low-level C memory concepts to object-oriented Java/C++ and modern Rust/Go.',
    color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400',
    steps: [
      'Programming Fundamentals',
      'C Programming Fundamentals',
      'C++ Programming Fundamentals',
      'Java Programming Fundamentals',
      'Python Programming Fundamentals',
      'JavaScript Fundamentals',
      'Go Programming',
      'Rust Programming',
      'Competitive Programming Fundamentals'
    ]
  },
  {
    domain: 'Web Development',
    description: 'Master HTML/CSS layout standards, modern JavaScript, React components, Node.js REST APIs, and full-stack architecture.',
    color: 'from-purple-500/20 to-violet-500/10 border-purple-500/30 text-purple-400',
    steps: [
      'HTML Fundamentals',
      'CSS Fundamentals',
      'Responsive Web Design',
      'JavaScript for Web Development',
      'React Fundamentals',
      'Node.js Fundamentals',
      'Express.js and Backend Development',
      'Full Stack Web Development'
    ]
  },
  {
    domain: 'Databases',
    description: 'Understand relational database theory, write SQL queries, optimize joins, and manage NoSQL stores.',
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
    steps: [
      'Database Management Systems',
      'SQL Fundamentals',
      'MySQL Database Development',
      'PostgreSQL Database Development',
      'Database Design',
      'Database Normalization',
      'NoSQL Databases',
      'MongoDB Fundamentals'
    ]
  },
  {
    domain: 'Cloud Computing',
    description: 'Learn IaaS fundamentals, AWS/Azure/GCP cloud architectures, serverless microservices, and security.',
    color: 'from-sky-500/20 to-cyan-500/10 border-sky-500/30 text-sky-400',
    steps: [
      'Cloud Computing Fundamentals',
      'AWS Fundamentals',
      'AWS Cloud Architecture',
      'Microsoft Azure Fundamentals',
      'Google Cloud Fundamentals',
      'Cloud Networking',
      'Serverless Computing',
      'Cloud Architecture and Design'
    ]
  },
  {
    domain: 'DevOps',
    description: 'Automate build pipelines with Git, Docker containers, Kubernetes orchestration, and Terraform IaC.',
    color: 'from-indigo-500/20 to-blue-500/10 border-indigo-500/30 text-indigo-400',
    steps: [
      'Git Fundamentals',
      'Linux System Administration',
      'Docker Fundamentals',
      'Kubernetes Fundamentals',
      'CI/CD Pipelines',
      'DevOps Fundamentals',
      'Infrastructure as Code',
      'Terraform Fundamentals'
    ]
  },
  {
    domain: 'AI / Machine Learning',
    description: 'From search trees and Python statistics to deep learning, neural networks, and Generative AI LLMs.',
    color: 'from-fuchsia-500/20 to-pink-500/10 border-fuchsia-500/30 text-fuchsia-400',
    steps: [
      'Artificial Intelligence Fundamentals',
      'Machine Learning Fundamentals',
      'Python for Machine Learning',
      'Supervised Learning',
      'Unsupervised Learning',
      'Deep Learning Fundamentals',
      'Neural Networks',
      'Generative AI Fundamentals'
    ]
  },
  {
    domain: 'Data Science',
    description: 'Wrangle data sets, perform statistical tests, visualize metrics with Seaborn/Matplotlib, and present business analytics.',
    color: 'from-rose-500/20 to-red-500/10 border-rose-500/30 text-rose-400',
    steps: [
      'Data Science Fundamentals',
      'Statistics for Data Science',
      'NumPy and Scientific Computing',
      'Pandas for Data Analysis',
      'Data Visualization',
      'Exploratory Data Analysis',
      'Business Data Analytics'
    ]
  }
];

export const RoadmapView: React.FC<RoadmapViewProps> = ({ courses, onSelectCourse }) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('Computer Networks');

  const activeRoadmap = ROADMAPS.find(r => r.domain === selectedDomain) || ROADMAPS[0];

  return (
    <div className="space-y-8">
      {/* Domain Roadmap Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {ROADMAPS.map((r) => (
          <button
            key={r.domain}
            onClick={() => setSelectedDomain(r.domain)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedDomain === r.domain
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 scale-105'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {getCategoryIcon(r.domain)}
            <span>{r.domain}</span>
          </button>
        ))}
      </div>

      {/* Domain Roadmap Header Card */}
      <div className={`p-6 rounded-2xl bg-gradient-to-r ${activeRoadmap.color} border`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
            {getCategoryIcon(activeRoadmap.domain)}
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-white uppercase tracking-tight">
              {activeRoadmap.domain} Learning Sequence
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              {activeRoadmap.description}
            </p>
          </div>
        </div>
      </div>

      {/* Sequential Learning Path Nodes */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-cyan-500/30 space-y-8 my-6">
        {activeRoadmap.steps.map((stepTitle, idx) => {
          // Find matching course object from catalog
          const matchedCourse = courses.find(
            (c) => c.title.toLowerCase() === stepTitle.toLowerCase() || c.title.toLowerCase().includes(stepTitle.toLowerCase())
          );

          const status = matchedCourse?.status || 'COMING_SOON';
          const isPublished = status.toUpperCase().includes('PUBLISH');

          return (
            <div key={stepTitle} className="relative group">
              {/* Node Marker Circle */}
              <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 font-mono text-xs font-bold transition-transform group-hover:scale-110 ${
                isPublished 
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20' 
                  : 'bg-slate-900 border-slate-700 text-slate-500'
              }`}>
                {idx + 1}
              </div>

              {/* Course Card Box */}
              <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 hover:border-cyan-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/50">
                      Step {idx + 1}
                    </span>
                    {isPublished ? (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                        Available Now
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
                        Coming Soon
                      </span>
                    )}
                    {matchedCourse?.difficulty && (
                      <span className="text-[10px] font-medium text-slate-400">
                        • {matchedCourse.difficulty}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {stepTitle}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1 max-w-2xl line-clamp-2">
                    {matchedCourse?.description || 'Foundational curriculum module in the ' + activeRoadmap.domain + ' learning path.'}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold text-slate-300">
                    {matchedCourse?.price === 0 || matchedCourse?.price === undefined ? 'FREE' : `${(matchedCourse.price || 10) * 5} SP`}
                  </span>

                  <button
                    onClick={() => matchedCourse && onSelectCourse(matchedCourse)}
                    className="flex items-center gap-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5 text-cyan-400" />
                    <span>View Node</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
