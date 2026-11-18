import { useState, useEffect } from 'react';
import { Organization, getMyOrganizations } from '../services/organizations';

interface OrganizationSelectorProps {
  onOrganizationChange: (orgId: number | null) => void;
  selectedOrgId?: number | null;
}

export default function OrganizationSelector({ 
  onOrganizationChange, 
  selectedOrgId 
}: OrganizationSelectorProps) {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      const orgs = await getMyOrganizations();
      setOrganizations(orgs);
      
      // Auto-select first org if none selected
      if (!selectedOrgId && orgs.length > 0) {
        onOrganizationChange(orgs[0].id);
      }
    } catch (err: unknown) {
      setError(err.message || 'Failed to load organizations');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
        <span className="text-sm text-gray-600">Loading organizations...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-600">
        Error: {error}
      </div>
    );
  }

  if (organizations.length === 0) {
    return (
      <div className="text-sm text-gray-600">
        No organizations found
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="org-selector" className="text-sm font-medium text-gray-700">
        Organization:
      </label>
      <select
        id="org-selector"
        value={selectedOrgId || ''}
        onChange={(e) => onOrganizationChange(e.target.value ? Number(e.target.value) : null)}
        className="block w-64 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Organizations</option>
        {organizations.map((org) => (
          <option key={org.id} value={org.id}>
            {org.name} ({org.member_count} members)
          </option>
        ))}
      </select>
    </div>
  );
}
