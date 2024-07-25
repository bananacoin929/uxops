'use server';

import { insertOrgProduct } from '@/app/api/db/org_products/server';

export const createOrgProduct = async (payload: {
  org_id: number;
  product_id: number;
}) => {
  const result = await insertOrgProduct(payload);
  return result;
};
