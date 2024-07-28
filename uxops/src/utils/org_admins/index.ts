'use server';

import {
  getOrgAdminById,
  insertOrgAdmin,
  updateOrgAdminById,
} from '@/app/api/db/org_admins/server';

export const createOrgAdmin = async (payload: {
  org_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}) => {
  const result = await insertOrgAdmin(payload);
  return result;
};

export const getOrgAdmin = async (org_id: number) => {
  const result = await getOrgAdminById(org_id);
  return result;
};

export const updateOrgAdmin = async (payload: {
  id: number;
  org_id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  created_at?: Date;
  updated_at?: Date;
}) => {
  const result = await updateOrgAdminById(payload);
  return result;
};
