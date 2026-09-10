import React, { useEffect, useState } from 'react';
import { QuizQuestion } from '../../../types';

export const QuestionsView: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkJson, setBulkJson] = useState('');

  const [formData, setFormData] = useState({
    lessonId: 'cn-sub-1',
    question: '',
    options: ['', '', '', ''],
    correctOption: 0,
    explanation: '',
    difficulty: 'medium'
  });

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/questions');
      if (res.ok) {
        const json = await res.json();
        setQuestions(json);
      }
    } catch (e) {
      console.error('Failed to fetch questions:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowModal(false);
        fetchQuestions();
      }
    } catch (e) {
      console.error('Error adding question:', e);
    }
  };

  const handleBulkImport = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(bulkJson);
      const res = await fetch('/api/admin/questions/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions: parsed })
      });
      if (res.ok) {
        setShowBulkModal(false);
        setBulkJson('');
        fetchQuestions();
      }
    } catch (e) {
      alert('Invalid JSON structure! Make sure it is an array of question objects.');
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    try {
      const res = await fetch(`/api/admin/questions/${id}`, { method: 'DELETE' });
      if (res.ok) fetchQuestions();
    } catch (e) {
      console.error('Error deleting question:', e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white">Central Question Bank</h1>
          <p className="text-slate-400 text-xs mt-0.5">Manage assessment items, options, explanations, and difficulty ratings.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowBulkModal(true)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition"
          >
            Bulk JSON Import
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg transition"
          >
            + Add Question
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/80 uppercase text-[10px] font-bold text-slate-400 tracking-wider border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Lesson ID</th>
              <th className="px-6 py-4">Question</th>
              <th className="px-6 py-4">Correct Option</th>
              <th className="px-6 py-4">Difficulty</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-slate-500">Loading question bank...</td>
              </tr>
            ) : questions.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-slate-500">No questions found. Add new questions or run bulk import.</td>
              </tr>
            ) : (
              questions.map((q) => (
                <tr key={q.id} className="hover:bg-slate-800/40 transition">
                  <td className="px-6 py-4 font-mono text-indigo-400 font-semibold">{q.lessonId || 'cn-sub-1'}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-white text-sm line-clamp-1">{q.question}</p>
                    <p className="text-slate-400 text-[11px] line-clamp-1">{q.explanation}</p>
                  </td>
                  <td className="px-6 py-4 font-semibold text-emerald-400">
                    Option #{q.correctOption + 1}: {q.options?.[q.correctOption]}
                  </td>
                  <td className="px-6 py-4 uppercase font-bold text-[10px]">
                    <span className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-full text-amber-400">
                      {q.difficulty || 'medium'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold rounded-lg border border-red-500/20 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Single Question Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSaveQuestion} className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white">Add New Assessment Question</h3>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Lesson ID</label>
                  <input
                    type="text"
                    required
                    value={formData.lessonId}
                    onChange={(e) => setFormData({ ...formData, lessonId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-white focus:outline-none"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Question Prompt</label>
                <textarea
                  rows={2}
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Options (4 choices)</label>
                <div className="space-y-2">
                  {formData.options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctOpt"
                        checked={formData.correctOption === idx}
                        onChange={() => setFormData({ ...formData, correctOption: idx })}
                      />
                      <input
                        type="text"
                        required
                        placeholder={`Option #${idx + 1}`}
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...formData.options];
                          newOpts[idx] = e.target.value;
                          setFormData({ ...formData, options: newOpts });
                        }}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Explanation</label>
                <textarea
                  rows={2}
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg"
              >
                Save Question
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleBulkImport} className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Bulk Question Import (JSON)</h3>
            <p className="text-xs text-slate-400">Paste a JSON array of question objects containing question, options, correctOption, explanation, and lessonId.</p>

            <textarea
              rows={8}
              required
              placeholder='[{"question": "What is /24 CIDR mask?", "options": ["255.255.255.0", "255.255.0.0"], "correctOption": 0, "lessonId": "cn-sub-4"}]'
              value={bulkJson}
              onChange={(e) => setBulkJson(e.target.value)}
              className="w-full bg-slate-950 font-mono text-xs border border-slate-800 rounded-xl p-3 text-emerald-400 focus:outline-none"
            />

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg"
              >
                Import Questions
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
