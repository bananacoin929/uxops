'use server';

import { insertOrgProductDepartment } from '@/app/api/db/org_product_departments/server';

export const createOrgProductDepartment = async (payload: {
  org_product_id: number;
  org_dep_id: number;
}) => {
  const result = await insertOrgProductDepartment(payload);
  return result;
};
