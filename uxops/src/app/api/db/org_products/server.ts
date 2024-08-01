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

export const updateOrgProductById = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('org_products')
    .update(data)
    .eq('id', data?.id)
    .select()
    .single();
  return result;
};
