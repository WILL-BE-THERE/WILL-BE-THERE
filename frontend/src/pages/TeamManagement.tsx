import { useState, useEffect } from 'react';

import {
  Organization,
  OrganizationMember,
  getMyOrganizations,
  getOrganizationMembers,
  inviteMember,

  removeMember,
  createOrganization,
} from '../services/organizations';
import { FaUsers, FaPlus, FaUserPlus, FaCrown, FaShieldAlt, FaChartLine, FaBullhorn, FaUserTie, FaHandsHelping } from 'react-icons/fa';

const ROLE_ICONS = {
  owner: FaCrown,
  admin: FaShieldAlt,
  finance: FaChartLine,
  marketing: FaBullhorn,
  staff: FaUserTie,
  volunteer: FaHandsHelping,
};

const ROLE_COLORS = {
  owner: 'bg-purple-100 text-purple-800',
  admin: 'bg-blue-100 text-blue-800',
  finance: 'bg-green-100 text-green-800',
  marketing: 'bg-pink-100 text-pink-800',
  staff: 'bg-yellow-100 text-yellow-800',
  volunteer: 'bg-gray-100 text-gray-800',
};

export default function TeamManagement() {

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateOrgModal, setShowCreateOrgModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('staff');
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgDescription, setNewOrgDescription] = useState('');

  useEffect(() => {
    loadOrganizations();
  }, []);

  useEffect(() => {
    if (selectedOrg) {
      loadMembers();
    }
  }, [selectedOrg]);

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      const orgs = await getMyOrganizations();
      setOrganizations(orgs);
      if (orgs.length > 0 && !selectedOrg) {
        setSelectedOrg(orgs[0]);
      }
    } catch (error) {
      console.error('Failed to load organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMembers = async () => {
    if (!selectedOrg) return;
    try {
      const teamMembers = await getOrganizationMembers(selectedOrg.id);
      setMembers(teamMembers);
    } catch (error) {
      console.error('Failed to load members:', error);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrg) return;

    try {
      await inviteMember(selectedOrg.id, { email: inviteEmail, role: inviteRole });
      setShowInviteModal(false);
      setInviteEmail('');
      setInviteRole('staff');
      loadMembers();
      alert('Member invited successfully!');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to invite member');
    }
  };

  const handleCreateOrg = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOrganization({ name: newOrgName, description: newOrgDescription });
      setShowCreateOrgModal(false);
      setNewOrgName('');
      setNewOrgDescription('');
      loadOrganizations();
      alert('Organization created successfully!');
    } catch (error) {
      alert('Failed to create organization');
    }
  };

  const handleRemoveMember = async (memberId: number) => {
    if (!selectedOrg || !confirm('Are you sure you want to remove this member?')) return;

    try {
      await removeMember(selectedOrg.id, memberId);
      loadMembers();
      alert('Member removed successfully');
    } catch (error) {
      alert('Failed to remove member');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600 mt-1">Manage your organization members and roles</p>
        </div>
        <button
          onClick={() => setShowCreateOrgModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FaPlus /> Create Organization
        </button>
      </div>

      {/* Organization Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Organization</label>
        <select
          value={selectedOrg?.id || ''}
          onChange={(e) => {
            const org = organizations.find((o) => o.id === Number(e.target.value));
            setSelectedOrg(org || null);
          }}
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name} ({org.member_count} members)
            </option>
          ))}
        </select>
      </div>

      {selectedOrg && (
        <>
          {/* Organization Info */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 mb-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{selectedOrg.name}</h2>
                <p className="text-blue-100 mt-1">{selectedOrg.description || 'No description'}</p>
                <div className="flex gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <FaUsers />
                    <span>{selectedOrg.member_count} members</span>
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full">
                    {selectedOrg.subscription_tier}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowInviteModal(true)}
                className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition font-medium"
              >
                <FaUserPlus /> Invite Member
              </button>
            </div>
          </div>

          {/* Members List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {members.map((member) => {
                const RoleIcon = ROLE_ICONS[member.role];
                return (
                  <div key={member.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                        {member.user_details.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{member.user_details.username}</div>
                        <div className="text-sm text-gray-500">{member.user_details.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${ROLE_COLORS[member.role]}`}>
                        <RoleIcon className="text-sm" />
                        <span className="text-sm font-medium capitalize">{member.role}</span>
                      </div>
                      {member.role !== 'owner' && (
                        <button
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Invite Team Member</h3>
            <form onSubmit={handleInvite}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="admin">Admin</option>
                  <option value="finance">Finance</option>
                  <option value="marketing">Marketing</option>
                  <option value="staff">Staff</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Organization Modal */}
      {showCreateOrgModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Create Organization</h3>
            <form onSubmit={handleCreateOrg}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
                <input
                  type="text"
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                <textarea
                  value={newOrgDescription}
                  onChange={(e) => setNewOrgDescription(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateOrgModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
