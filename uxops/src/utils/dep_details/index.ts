'use server';

import {
  getDepDetailById,
  insertDepDetail,
  updateDepDetailById,
} from '@/app/api/db/dep_details/server';

export const createDepDetail = async (payload: {
  org_dep_id: number;
  total_members: number;
}) => {
  const result = await insertDepDetail(payload);
  return result;
};

export const getDepDetail = async (payload: { org_id: number }) => {
  const result = await getDepDetailById(payload);
  return result;
};

export const updateDepDetail = async (payload: {
  dep_ids: number[] | undefined;
  department_details: any[];
}) => {
  const result = await updateDepDetailById(payload);
  return result;
};
