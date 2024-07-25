'use server';

import { insertOrgLocation } from '@/app/api/db/org_locations/server';

export const createOrgLocation = async (payload: {
  org_id: number;
  type: string;
  address: string;
  name: string;
  country: string;
  state: string;
  city: string;
}) => {
  const result = await insertOrgLocation(payload);
  return result;
};
