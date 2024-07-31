import { PostgrestSingleResponse, createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

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
