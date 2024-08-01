import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const insertOrgProductDepartment = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('org_product_departments')
    .insert(data);

  return result;
};
