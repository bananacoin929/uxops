'use server';

import { insertOrgDepartment } from '@/app/api/db/org_departments/server';

export const createOrgDepartment = async (payload: {
  org_id: number;
  name: string;
}) => {
  const result = await insertOrgDepartment(payload);
  return result;
};
