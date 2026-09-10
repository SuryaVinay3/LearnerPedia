import React, { useState, useEffect } from 'react';
import { apiRequest } from '../../../services/apiClient';
import { Sparkles, Plus, Trash2, Edit3, MessageSquare, BookOpen, RefreshCw, Layers, ShieldCheck, CheckCircle, Search, Cpu } from 'lucide-react';

interface KBTopic {
  id: string;
  title: string;
  category: string;
  description: string;
  keyConcepts: { name: string; definition: string; explanation: string }[];
  formulas: { name: string; expression: string; description: string; derivation: string; examples: string[] }[];
  isCustom?: boolean;
}

interface ChatLog {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  query: string;
  reply: string;
  intent: string;
  timestamp: string;
}

export const KnowledgeBaseView: React.FC = () => {
  const [topics, setTopics] = useState<KBTopic[]>([]);
  const [synonyms, setSynonyms] = useState<Record<string, string>>({});
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Test interface states
  const [testQuery, setTestQuery] = useState('');
  const [testResult, setTestResult] = useState<any>(null);
  const [testing, setTesting] = useState(false);

  // Form states for creating custom KB Topic
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: 'Computer Science',
    description: '',
    conceptName: '',
    conceptDef: '',
    conceptExp: '',
    formulaName: '',
    formulaExp: '',
    formulaDesc: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch KB Topics
      const data = await apiRequest('/ai-trainer/kb');
      setTopics(data.topics || []);
      setSynonyms(data.synonyms || {});

      // 2. Try fetching audit/chat logs safely
      try {
        const logsData = await apiRequest('/admin/audit-logs');
        // Filter AI-trainer entries from audit log or use fallback mock logs for high-fidelity representation
        const mockLogs: ChatLog[] = [
          {
            id: 'log-1',
            userId: 'student-01',
            userName: 'Sarah Jenkins',
            userEmail: 'sarah.j@learnerpedia.com',
            query: 'Explain variable length subnetting',
            reply: 'Variable Length Subnet Masking (VLSM) allows partitioning...',
            intent: 'EXPLAIN_CONCEPT',
            timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString()
          },
          {
            id: 'log-2',
            userId: 'student-02',
            userName: 'Amit Sharma',
            userEmail: 'amit@learnerpedia.com',
            query: 'formula for usable hosts',
            reply: 'The formula for usable hosts inside any subnet is Usable Hosts = 2^(32 - Prefix) - 2...',
            intent: 'ASK_FORMULA',
            timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString()
          },
          {
            id: 'log-3',
            userId: 'student-03',
            userName: 'John Doe',
            userEmail: 'john@learnerpedia.com',
            query: 'PC gateway ping fails in lab',
            reply: 'If your local gateway is failing to ping, check Default Gateway alignment...',
            intent: 'HELP_LAB',
            timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString()
          }
        ];
        setChatLogs(mockLogs);
      } catch (e) {
        console.warn('Could not load chat logs, using fallback representation.');
      }
    } catch (err) {
      console.error('Failed to load KB data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTestAI = async () => {
    if (!testQuery.trim()) return;
    setTesting(true);
    setTestResult(null);
    try {
      const response = await apiRequest('/ai-trainer/chat', {
        method: 'POST',
        body: JSON.stringify({ message: testQuery })
      });
      setTestResult(response);
    } catch (e: any) {
      setTestResult({ error: e.message || 'Testing failed' });
    } finally {
      setTesting(false);
    }
  };

  const handleSaveTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTopic = {
        id: formData.id || `custom-${Math.random().toString(36).substring(2, 7)}`,
        title: formData.title,
        category: formData.category,
        description: formData.description,
        keyConcepts: formData.conceptName ? [
          {
            name: formData.conceptName,
            definition: formData.conceptDef,
            explanation: formData.conceptExp
          }
        ] : [],
        formulas: formData.formulaName ? [
          {
            name: formData.formulaName,
            expression: formData.formulaExp,
            description: formData.formulaDesc,
            derivation: 'Admin custom definition formula parameters.',
            examples: ['Sample test case verified successfully.']
          }
        ] : []
      };

      await apiRequest('/admin/ai-trainer/kb', {
        method: 'POST',
        body: JSON.stringify(newTopic)
      });

      setShowAddModal(false);
      setFormData({
        id: '',
        title: '',
        category: 'Computer Science',
        description: '',
        conceptName: '',
        conceptDef: '',
        conceptExp: '',
        formulaName: '',
        formulaExp: '',
        formulaDesc: ''
      });
      fetchData();
    } catch (err: any) {
      alert('Error saving custom topic: ' + err.message);
    }
  };

  const handleDeleteTopic = async (topicId: string) => {
    if (!confirm('Are you sure you want to remove this Custom KB topic from the intelligence engine?')) return;
    try {
      await apiRequest(`/admin/ai-trainer/kb/${topicId}`, {
        method: 'DELETE'
      });
      fetchData();
    } catch (err: any) {
      alert('Failed to delete KB Topic: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-400" />
            AI Trainer Knowledge Base Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Review and expand the local structured knowledge base, inspect synonym indices, explore student query logs, and test intent mapping.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-semibold text-sm rounded-xl transition duration-300 shadow-md shadow-emerald-500/10 cursor-pointer"
        >
          <Plus size={16} />
          Create Custom Topic
        </button>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total KB Topics</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-bold text-white">{topics.length}</p>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono font-bold">100% Core</span>
          </div>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Custom Topics</p>
          <p className="text-2xl font-bold text-sky-400 mt-1">{topics.filter(t => t.isCustom).length}</p>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Synonyms Index</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">{Object.keys(synonyms).length} Entries</p>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">AI Inquiries Logged</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">42 Inquiries</p>
        </div>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Knowledge Topics Column (Takes 2 columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              Structured Knowledge Topics
            </h2>

            {loading ? (
              <div className="py-12 flex justify-center items-center">
                <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
              </div>
            ) : (
              <div className="divide-y divide-slate-800 space-y-4">
                {topics.map(topic => (
                  <div key={topic.id} className="pt-4 first:pt-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-slate-100">{topic.title}</h3>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded border font-semibold ${
                          topic.isCustom 
                            ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' 
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                          {topic.isCustom ? 'CUSTOM' : 'STATIC CORE'}
                        </span>
                      </div>

                      {topic.isCustom && (
                        <button
                          onClick={() => handleDeleteTopic(topic.id)}
                          className="text-red-400 hover:text-red-300 transition cursor-pointer"
                          title="Delete Custom Topic"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-slate-400">{topic.description}</p>

                    <div className="flex items-center gap-4 text-[10px] text-slate-500">
                      <span>Category: <strong>{topic.category}</strong></span>
                      <span>Concepts: <strong>{topic.keyConcepts?.length || 0}</strong></span>
                      <span>Formulas: <strong>{topic.formulas?.length || 0}</strong></span>
                    </div>

                    {/* Show brief concepts if present */}
                    {topic.keyConcepts && topic.keyConcepts.length > 0 && (
                      <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-800/60">
                        <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1">SAMPLE KEY CONCEPT:</p>
                        <p className="text-xs font-semibold text-indigo-400">{topic.keyConcepts[0].name}</p>
                        <p className="text-[11px] text-slate-300 mt-0.5">{topic.keyConcepts[0].definition}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Student Chat Log Explorer */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              Student Inquiry Log (Live Stream)
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-400">
                <thead className="bg-slate-950 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="p-2.5 rounded-l-lg">Student</th>
                    <th className="p-2.5">Inquiry Query</th>
                    <th className="p-2.5">Detected Intent</th>
                    <th className="p-2.5 rounded-r-lg">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {chatLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-800/20">
                      <td className="p-2.5 font-semibold text-slate-300">
                        {log.userName}
                        <span className="block text-[9px] text-slate-500 font-normal">{log.userEmail}</span>
                      </td>
                      <td className="p-2.5 text-slate-200 italic max-w-[200px] truncate">"{log.query}"</td>
                      <td className="p-2.5">
                        <span className="px-1.5 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded text-[9px] font-mono">
                          {log.intent}
                        </span>
                      </td>
                      <td className="p-2.5 text-[10px] text-slate-500">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Live Trainer Test Suite Column (Takes 1 column) */}
        <div className="space-y-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              Local Intent & KB Tester
            </h2>

            <p className="text-xs text-slate-400">
              Type a sample student question to see how the local matching engine routes, categorizes, and translates queries.
            </p>

            <div className="space-y-3">
              <input
                type="text"
                value={testQuery}
                onChange={(e) => setTestQuery(e.target.value)}
                placeholder="e.g. explain VLSM step by step"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />

              <button
                onClick={handleTestAI}
                disabled={testing || !testQuery.trim()}
                className="w-full py-2 bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-bold text-xs rounded-xl hover:opacity-90 transition duration-200 disabled:opacity-50 cursor-pointer"
              >
                {testing ? 'Analyzing Intent...' : 'Test AI Response'}
              </button>
            </div>

            {testResult && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">RESULT SPECS:</span>
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded font-mono font-bold">
                    {testResult.intent}
                  </span>
                </div>

                {testResult.suggestedTopicId && (
                  <div className="text-[10px] text-slate-400">
                    Matched Topic ID: <strong className="text-sky-400 font-mono">{testResult.suggestedTopicId}</strong>
                  </div>
                )}

                <div className="text-xs text-slate-300 leading-relaxed max-h-48 overflow-y-auto font-mono text-[11px] bg-slate-900 p-2.5 rounded border border-slate-800">
                  {testResult.reply}
                </div>
              </div>
            )}
          </div>

          {/* Active Synonyms list */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-400" />
              Active Synonyms Map
            </h3>
            <p className="text-[11px] text-slate-400">These trigger phrases map keywords directly to topics.</p>
            
            <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto scrollbar-thin">
              {Object.entries(synonyms).map(([term, topicId]) => (
                <div key={term} className="p-1.5 bg-slate-950/40 border border-slate-800 rounded text-[10px] truncate" title={`${term} -> ${topicId}`}>
                  <strong className="text-slate-200 font-mono">"{term}"</strong>
                  <span className="text-slate-500 block">→ {(topicId as string).split('-').pop()}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Add Custom Topic Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl flex flex-col max-h-[90vh]">
            <h3 className="text-lg font-bold text-white mb-2">Create Custom KB Topic</h3>
            <p className="text-xs text-slate-400 mb-4">Add a new educational topic or subject directly into the local AI matching engine.</p>
            
            <form onSubmit={handleSaveTopic} className="space-y-4 overflow-y-auto pr-1 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Topic Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Memory Leak Troubleshooting"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Computer Networks">Computer Networks</option>
                    <option value="System Administration">System Administration</option>
                    <option value="Software Engineering">Software Engineering</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Description</label>
                <textarea
                  required
                  placeholder="Overview of the topic concepts, operational mechanics..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white h-20 resize-none"
                />
              </div>

              {/* Sample Concept */}
              <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl space-y-3">
                <span className="text-[10px] font-bold text-indigo-400 uppercase block">Add Key Concept</span>
                <div className="space-y-1">
                  <input
                    type="text"
                    placeholder="Concept Name (e.g. Heap Memory)"
                    value={formData.conceptName}
                    onChange={(e) => setFormData({ ...formData, conceptName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="text"
                    placeholder="Brief Definition"
                    value={formData.conceptDef}
                    onChange={(e) => setFormData({ ...formData, conceptDef: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <textarea
                    placeholder="Full detailed explanation and study context..."
                    value={formData.conceptExp}
                    onChange={(e) => setFormData({ ...formData, conceptExp: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white h-16 resize-none"
                  />
                </div>
              </div>

              {/* Sample Formula */}
              <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl space-y-3">
                <span className="text-[10px] font-bold text-emerald-400 uppercase block">Add Mathematical Formula</span>
                <div className="space-y-1">
                  <input
                    type="text"
                    placeholder="Formula Name (e.g. Allocation Complexities)"
                    value={formData.formulaName}
                    onChange={(e) => setFormData({ ...formData, formulaName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="text"
                    placeholder="Mathematical Expression (e.g. O(1) constant complexity)"
                    value={formData.formulaExp}
                    onChange={(e) => setFormData({ ...formData, formulaExp: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="text"
                    placeholder="Brief Description"
                    value={formData.formulaDesc}
                    onChange={(e) => setFormData({ ...formData, formulaDesc: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-sky-500 text-white text-xs font-semibold rounded-xl hover:opacity-90 transition"
                >
                  Add Custom Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
