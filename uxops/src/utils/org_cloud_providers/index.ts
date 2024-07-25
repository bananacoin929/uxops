'use server';

import { insertOrgCloudProvider } from '@/app/api/db/org_cloud_providers/server';

export const createOrgCloudProvider = async (payload: {
  org_id: number;
  provider_id: number;
}) => {
  const result = await insertOrgCloudProvider(payload);
  return result;
};
