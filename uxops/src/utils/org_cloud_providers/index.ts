'use server';

import {
  insertOrgCloudProvider,
  getOrgCloudProviderById,
  updateOrgCloudProviderById,
} from '@/app/api/db/org_cloud_providers/server';

export const createOrgCloudProvider = async (payload: {
  org_id: number;
  provider_id: number;
}) => {
  const result = await insertOrgCloudProvider(payload);
  return result;
};

export const getOrgCloudProvider = async (org_id: number) => {
  const result = await getOrgCloudProviderById(org_id);
  return result;
};

export const updateOrgCloudProvider = async (payload: {
  org_id: number;
  public_cloud_providers: number[];
}) => {
  const result = await updateOrgCloudProviderById(payload);
  return result;
};
