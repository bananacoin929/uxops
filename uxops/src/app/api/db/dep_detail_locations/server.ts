import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const insertDepDetailLocation = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('dep_detail_locations')
    .insert(data)
    .select()
    .single();

  return result;
};
