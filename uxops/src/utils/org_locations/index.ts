'use server';

import {
  insertOrgLocation,
  getOrgLocationById,
  updateOrgLocationById,
} from '@/app/api/db/org_locations/server';

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

export const getOrgLocation = async (org_id: number) => {
  const result = await getOrgLocationById(org_id);
  return result;
};

export const updateOrgLocation = async (payload: {
  org_id: number;
  locations: any[];
}) => {
  const result = await updateOrgLocationById(payload);
  return result;
};
