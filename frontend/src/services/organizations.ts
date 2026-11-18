// API endpoints for Organizations
import api from '../utils/api';

export interface Organization {
  id: number;
  name: string;
  slug: string;
  description?: string;
  website?: string;
  subscription_tier: string;
  owner: number;
  owner_username: string;
  member_count: number;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMember {
  id: number;
  organization: number;
  organization_name: string;
  user: number;
  user_details: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  role: 'owner' | 'admin' | 'finance' | 'marketing' | 'staff' | 'volunteer';
  is_active: boolean;
  invited_by?: number;
  invited_by_username?: string;
  joined_at: string;
}

export interface InviteMemberPayload {
  email: string;
  role: string;
}

// Get all organizations where user is a member
export const getMyOrganizations = async (): Promise<Organization[]> => {
  const response = await api.get('/organizations/my/');
  return response.data;
};

// Create a new organization
export const createOrganization = async (data: {
  name: string;
  description?: string;
  website?: string;
}): Promise<Organization> => {
  const response = await api.post('/organizations/create/', data);
  return response.data;
};

// Get organization details
export const getOrganization = async (orgId: number): Promise<Organization> => {
  const response = await api.get(`/organizations/${orgId}/`);
  return response.data;
};

// Get organization members
export const getOrganizationMembers = async (orgId: number): Promise<OrganizationMember[]> => {
  const response = await api.get(`/organizations/${orgId}/members/`);
  return response.data;
};

// Invite a member to organization
export const inviteMember = async (
  orgId: number,
  data: InviteMemberPayload
): Promise<OrganizationMember> => {
  const response = await api.post(`/organizations/${orgId}/invite/`, data);
  return response.data;
};

// Update member role
export const updateMemberRole = async (
  orgId: number,
  memberId: number,
  role: string
): Promise<OrganizationMember> => {
  const response = await api.patch(`/organizations/${orgId}/members/${memberId}/role/`, { role });
  return response.data;
};

// Remove member from organization
export const removeMember = async (orgId: number, memberId: number): Promise<void> => {
  await api.delete(`/organizations/${orgId}/members/${memberId}/remove/`);
};
