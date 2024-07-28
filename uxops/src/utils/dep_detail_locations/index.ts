'use server';

import { insertDepDetailLocation } from '@/app/api/db/dep_detail_locations/server';

export const createDepDetailLocation = async (payload: {
  org_dep_id: number;
  dep_detail_id: number;
  location_id: number;
}) => {
  const result = await insertDepDetailLocation(payload);
  return result;
};
