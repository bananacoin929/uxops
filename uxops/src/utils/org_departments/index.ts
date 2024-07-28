'use server';

import {
  getOrgDepartmentById,
  insertOrgDepartment,
  updateOrgDepartmentById,
} from '@/app/api/db/org_departments/server';

export const createOrgDepartment = async (payload: {
  org_id: number;
  name: string;
}) => {
  const result = await insertOrgDepartment(payload);
  return result;
};

export const getOrgDepartment = async (payload: { org_id: number }) => {
  const result = await getOrgDepartmentById(payload);
  return result;
};

export const updateOrgDepartment = async (payload: {
  org_id: number;
  departments: any[];
}) => {
  const result = await updateOrgDepartmentById(payload);
  return result;
};
