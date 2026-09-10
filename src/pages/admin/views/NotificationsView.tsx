import React, { useEffect, useState } from 'react';

export const NotificationsView: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    targetGroup: 'all',
    type: 'announcement'
  });

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/notifications');
      if (res.ok) {
        const json = await res.json();
        setNotifications(json);
      }
    } catch (e) {
      console.error('Failed to fetch notifications:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowModal(false);
        setFormData({ title: '', message: '', targetGroup: 'all', type: 'announcement' });
        fetchNotifications();
      }
    } catch (e) {
      console.error('Error sending notification:', e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white">Broadcast Notifications</h1>
          <p className="text-slate-400 text-xs mt-0.5">Send targeted system announcements, tournament alerts, and learning reminders.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg transition"
        >
          + Send Broadcast
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/80 uppercase text-[10px] font-bold text-slate-400 tracking-wider border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Target Audience</th>
              <th className="px-6 py-4">Sent At</th>
              <th className="px-6 py-4">Sent By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-slate-500">Loading broadcast history...</td>
              </tr>
            ) : notifications.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-slate-500">No broadcast messages sent yet.</td>
              </tr>
            ) : (
              notifications.map((n) => (
                <tr key={n.id} className="hover:bg-slate-800/40 transition">
                  <td className="px-6 py-4">
                    <p className="font-bold text-white text-sm">{n.title}</p>
                    <p className="text-slate-400 text-[11px] line-clamp-1">{n.message}</p>
                  </td>
                  <td className="px-6 py-4 font-semibold uppercase text-indigo-400">{n.targetGroup}</td>
                  <td className="px-6 py-4 font-mono text-slate-400">{n.sentAt ? new Date(n.sentAt).toLocaleString() : 'Just now'}</td>
                  <td className="px-6 py-4 text-slate-300">{n.sentBy || 'Admin'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSendNotification} className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Send Broadcast Announcement</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Subnetting Tournament Live Now!"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Message Body</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter message content..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Target Group</label>
                  <select
                    value={formData.targetGroup}
                    onChange={(e) => setFormData({ ...formData, targetGroup: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-white focus:outline-none"
                  >
                    <option value="all">All Registered Learners</option>
                    <option value="active_today">Active Today</option>
                    <option value="inactive_3d">Inactive for 3+ Days</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Notification Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-white focus:outline-none"
                  >
                    <option value="announcement">Announcement</option>
                    <option value="tournament">Tournament Alert</option>
                    <option value="reward">Reward Alert</option>
                  </select>
                </div>
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
                Broadcast Now
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
