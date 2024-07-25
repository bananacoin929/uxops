'use server';

import { insertOrganization } from '@/app/api/db/organizations/server';

export const createOrganization = async (payload: {
  user_id: string;
  name: string;
  industry_id: number | undefined;
  total_employees: number;
}) => {
  const result = await insertOrganization(payload);
  return result;
};

// export const updateOrganization = async (payload: {
//     user_id: string;
//     name: string;
//     industry_id: number | undefined;
//     total_employees: number;
//     org_dep_ids: number[];
//   }) => {
//     const result = await updateOrganizationById(payload);
//     return result;
//   };
