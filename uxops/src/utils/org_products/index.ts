'use server';

import {
  insertOrgProduct,
  updateOrgProductById,
} from '@/app/api/db/org_products/server';

export const createOrgProduct = async (payload: {
  org_id: number;
  product_id: number;
  status: boolean;
}) => {
  const result = await insertOrgProduct(payload);
  return result;
};

export const updateOrgProduct = async (payload: {
  id: number;
  org_id?: number;
  product_id?: number;
  status?: boolean;
  updated_at: Date;
}) => {
  const result = await updateOrgProductById(payload);
  return result;
};
