import { PostgrestSingleResponse, createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export const insertOrgLocation = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('org_locations')
    .insert(data)
    .select()
    .single();

  return result;
};
