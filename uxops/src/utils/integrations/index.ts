'use server';

import {
  getIntegrationByUserId,
  insertIntegration,
  updateIntegrationById,
} from '@/app/api/db/integrations/server';

export const createIntegration = async (payload: {
  user_id: string;
  azure?: any;
}) => {
  const result = await insertIntegration(payload);
  return result;
};

export const getIntegration = async (payload: { user_id: string }) => {
  const result = await getIntegrationByUserId(payload);
  return result;
};

export const updateIntegration = async (payload: {
  id: number;
  azure?: any;
}) => {
  const result = await updateIntegrationById(payload);
  return result;
};
