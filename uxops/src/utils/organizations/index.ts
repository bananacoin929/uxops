'use server';

import {
  insertOrganization,
  getOrganizationById,
  updateOrganizationById,
} from '@/app/api/db/organizations/server';

export const createOrganization = async (payload: {
  user_id: string;
  name: string;
  industry_id: number | undefined;
  total_employees: number;
}) => {
  const result = await insertOrganization(payload);
  return result;
};

export const getOrganization = async (payload: { id: number }) => {
  const result = await getOrganizationById(payload);
  return result;
};

export const updateOrganization = async (payload: {
  id: number;
  name: string;
  industry_id: number | undefined;
  total_employees: number;
}) => {
  const result = await updateOrganizationById(payload);
  return result;
};
