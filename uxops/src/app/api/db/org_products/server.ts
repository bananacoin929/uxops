import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const insertOrgProduct = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('org_products')
    .insert(data)
    .select()
    .single();

  return result;
};
