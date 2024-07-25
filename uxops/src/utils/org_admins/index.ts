'use server';

import { insertOrgAdmin } from '@/app/api/db/org_admins/server';

export const createOrgAdmin = async (payload: {
  org_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}) => {
  const result = await insertOrgAdmin(payload);
  return result;
};
