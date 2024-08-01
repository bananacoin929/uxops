import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const insertIntegration = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin.from('integrations').insert(data);

  return result;
};

export const updateIntegrationById = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin.from('integrations').update(data);

  return result;
};

export const getIntegrationByUserId = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('integrations')
    .select('*')
    .eq('user_id', data.user_id)
    .single();

  return result;
};
