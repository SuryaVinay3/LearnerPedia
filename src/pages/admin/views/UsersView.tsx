import React, { useEffect, useState } from 'react';
import { UserProfile } from '../../../types';

export const UsersView: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const json = await res.json();
        setUsers(json);
      }
    } catch (e) {
      console.error('Failed to fetch users:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateUser = async (userId: string, updateData: any) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      if (res.ok) {
        await fetchUsers();
        if (selectedUser && selectedUser.profile.id === userId) {
          fetchUserDetails(userId);
        }
      }
    } catch (e) {
      console.error('Failed to update user:', e);
    } finally {
      setActionLoading(false);
    }
  };

  const fetchUserDetails = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`);
      if (res.ok) {
        const json = await res.json();
        setSelectedUser(json);
      }
    } catch (e) {
      console.error('Failed to load user details:', e);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(search.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || (u.accountStatus || 'active') === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white">User Accounts & Access Control</h1>
          <p className="text-slate-400 text-xs mt-0.5">Manage roles, suspend accounts, reset progress, and view student analytics.</p>
        </div>
        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition"
        >
          Refresh User List
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[220px] bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
        >
          <option value="all">All Roles</option>
          <option value="student">Student</option>
          <option value="trainer">Trainer</option>
          <option value="admin">Admin</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 uppercase text-[10px] font-bold text-slate-400 tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">XP / LP</th>
                <th className="px-6 py-4">Streak</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">Loading user accounts...</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">No users found matching query.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.uid} className="hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-white text-sm">{user.name || 'Learner'}</p>
                        <p className="text-slate-400 text-[11px]">{user.email}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          user.role === 'admin'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : user.role === 'trainer'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {user.role || 'student'}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          user.accountStatus === 'suspended'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {user.accountStatus || 'active'}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-mono font-semibold">
                      <div className="text-purple-300">{user.xp || 0} XP</div>
                      <div className="text-amber-400">{user.learningPoints || 0} LP</div>
                    </td>

                    <td className="px-6 py-4 font-mono text-orange-400 font-bold">
                      🔥 {user.streak || 0}d
                    </td>

                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => fetchUserDetails(user.uid)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition"
                      >
                        Details
                      </button>

                      <button
                        onClick={() =>
                          handleUpdateUser(user.uid, {
                            accountStatus: user.accountStatus === 'suspended' ? 'active' : 'suspended'
                          })
                        }
                        disabled={actionLoading}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition border ${
                          user.accountStatus === 'suspended'
                            ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/30'
                        }`}
                      >
                        {user.accountStatus === 'suspended' ? 'Activate' : 'Suspend'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedUser.profile.name}</h3>
                <p className="text-xs text-slate-400">{selectedUser.profile.email}</p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-slate-400 hover:text-white font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase">Role</p>
                <p className="text-xs font-bold text-indigo-400 capitalize">{selectedUser.profile.role}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase">XP</p>
                <p className="text-xs font-bold text-purple-400">{selectedUser.profile.xp} XP</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase">Learning Points</p>
                <p className="text-xs font-bold text-amber-400">{selectedUser.profile.learningPoints} LP</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase">Streak</p>
                <p className="text-xs font-bold text-orange-400">{selectedUser.profile.streak} Days</p>
              </div>
            </div>

            {/* Role Modifier */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Role & Access Level</h4>
              <div className="flex gap-2">
                {['student', 'trainer', 'admin'].map((r) => (
                  <button
                    key={r}
                    onClick={() => handleUpdateUser(selectedUser.profile.id, { role: r })}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg capitalize border transition ${
                      selectedUser.profile.role === r
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Learning Insights */}
            <div className="bg-indigo-950/30 border border-indigo-500/20 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">AI Telemetry Insights</h4>
              <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                {(selectedUser.aiInsights || []).map((ins: string, i: number) => (
                  <li key={i}>{ins}</li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset this student\'s progress and points?')) {
                    handleUpdateUser(selectedUser.profile.id, { resetProgress: true });
                  }
                }}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold rounded-xl transition"
              >
                Reset Progress & LP
              </button>

              <button
                onClick={() => setSelectedUser(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
