import { PostgrestSingleResponse, createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export const insertOrganization = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('organizations')
    .insert({
      name: data.name,
      industry_id: data.industry_id,
      total_employees: data.total_employees,
    })
    .select()
    .single();
  if (!result.error) {
    const { error } = await supabaseAdmin
      .from('users')
      .update({ org_id: result.data.id })
      .eq('id', data.user_id);
    console.log(error, result.data);
  }

  return result;
};

export const getOrganizationById = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('organizations')
    .select('*')
    .eq('id', data?.id)
    .single();

  return result;
};

export const updateOrganizationById = async (
  data: any
): Promise<PostgrestSingleResponse<any>> => {
  const result = await supabaseAdmin
    .from('organizations')
    .update(data)
    .eq('id', data.id);

  return result;
};
