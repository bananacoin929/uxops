'use server';

import { insertDepDetail } from '@/app/api/db/dep_details/server';

export const createDepDetail = async (payload: {
  org_dep_id: number;
  total_members: number;
}) => {
  const result = await insertDepDetail(payload);
  return result;
};
